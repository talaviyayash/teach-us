import { Document, Types } from "mongoose";

export interface ISchool extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
