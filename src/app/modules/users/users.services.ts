import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './users.interface';
import { User } from './users.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './users.utils';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  // set role
  user.role = 'student';

  const academicsemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // generate student id
  let newUserAllData = null;

  const id = await generateStudentId(academicsemester);
  user.id = id;
  student.id = id;

  //array
  const newStudent = await Student.create(student);

  if (!newStudent) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }

  //set student -->  _id into user.student
  user.student = newStudent._id;

  const newUser = await User.create(user);

  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
  if (!newUser || !newStudent) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }

  newUserAllData = newUser;

  //user --> student ---> academicSemester, academicDepartment , academicFaculty

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

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_password as string;
  }
  // set role
  user.role = 'faculty';

  // generate faculty id
  let newUserAllData = null;

  const id = await generateFacultyId();
  user.id = id;
  faculty.id = id;

  const newFaculty = await Faculty.create(faculty);

  if (!newFaculty) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
  }

  user.faculty = newFaculty._id;

  const newUser = await User.create(user);

  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
  if (!newUser || !newFaculty) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
  }
  newUserAllData = newUser;

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
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

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_admin_password as string;
  }
  // set role
  user.role = 'admin';

  // generate faculty id
  let newUserAllData = null;

  const id = await generateAdminId();
  user.id = id;
  admin.id = id;

  const newAdmin = await Admin.create(admin);

  if (!newAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
  }

  user.admin = newAdmin._id;

  const newUser = await User.create(user);

  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
  }
  if (!newUser || !newAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
  }
  newUserAllData = newUser;

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
