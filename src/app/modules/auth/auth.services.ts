import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../shared/jwtHelpers';
import { User } from '../users/users.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  //check user exists
  const user = new User();
  const isUserExists = await user.isUserExists(id);

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  //match password
  if (
    isUserExists.password &&
    !user.isPasswordMatched(password, isUserExists?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id: userId, role, needsPasswordChange } = isUserExists;
  // create access token(shortlife), refresh token(longlife)
  //access token

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in }
  );

  //refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    { expiresIn: config.jwt.refresh_expires_in }
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    //in verifiedToken, we get user id, role, timestamps
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }
  const { userId } = verifiedToken;
  //checking deleted user using refresh token
  //check user exists
  const user = new User();
  const isUserExists = await user.isUserExists(userId);
  //if user does not exists
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  //generate new token
  const accessToken = jwtHelpers.createToken(
    { id: isUserExists?.id, role: isUserExists?.role },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in }
  );

  return {
    accessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<string> => {
  const { oldPassword, newPassword } = payload;
  //check user exists
  const userData = new User();
  const isUserExists = await user?.isUserExists(user?.userId);

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  //check oldPassword
  if (
    isUserExists.password &&
    !userData.isPasswordMatched(oldPassword, isUserExists?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  //hash password
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const query = { id: user?.userId };
  const updatedData = {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  };

  //update password
  await User.findOneAndUpdate(query, updatedData);

  return 'Password changed successfully';
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
