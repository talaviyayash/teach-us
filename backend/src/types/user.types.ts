import { Types } from "mongoose";

export interface ISchoolEntry {
  schoolId: Types.ObjectId;
  permission: string;
}

export type IRole = "student" | "admin" | "principal" | "teacher";
export interface IUser {
  _id?: Types.ObjectId;

  name: string;
  email: string;
  password: string;

  school: ISchoolEntry[];

  currentBatch?: Types.ObjectId;
  batchHistory: Types.ObjectId[];

  isGoogleLogin?: boolean;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
  currentSchool?: Types.ObjectId;
  isActive?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  role: "student" | "principal" | "admin" | "teacher";

  comparePassword(candidatePassword: string): Promise<boolean>;
}
