import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'

//user model
type UserModel = Model<IUser, object>

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
  }
)

//connect user model and schema together here
export const User = model<IUser, UserModel>('User', userSchema)
