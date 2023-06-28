import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateStudentId } from './users.utils';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }

  // set role
  user.role = 'student';

  // find academic semester to create ID
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  let newUserAllData = null;

  // start session
  const session = await mongoose.startSession();

  try {
    // transaction start

    session.startTransaction();
    // generate studentId
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    // create student
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student.');
    }

    // set student _id in User.student
    //the new student becomes an array at first index(0) while using it in a session
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user.');
    }

    newUserAllData = newUser[0];

    // commit the transaction and end session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create user and student.'
    );
  }

  // user --> student -----> academicSemester, academicFaculty, academicDepartment
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
};
