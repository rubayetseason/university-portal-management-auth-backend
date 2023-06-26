import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateFacultyId } from './users.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //incremental id

  // const sem = {
  //   code: '01',
  //   year: '2025',
  // }
  const id = await generateFacultyId();
  user.id = id;
  //default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user.');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
