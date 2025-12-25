import mongoose from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  password?: string;
  email: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
