import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './users.interface';

//user schema
const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    //for createdAt and updatedAt field
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

//connect user model and schema together here
export const User = model<IUser, UserModel>('User', userSchema);
