import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "admin" | "principal" | "teacher";
  isGoogleLogin: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword?: (candidatePassword: string) => Promise<boolean>;
}
