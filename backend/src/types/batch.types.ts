import { Types } from "mongoose";

export interface IBatch {
  _id?: Types.ObjectId; // optional for creation
  name: string;
  description?: string;
  school: Types.ObjectId;
  course: Types.ObjectId;
  sem: Types.ObjectId;
  division: Types.ObjectId;
  student: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
