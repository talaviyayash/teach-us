import { Types } from "mongoose";

export interface ICourse {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  school: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
