import { Schema, model } from "mongoose";
import { ICourse } from "../types/course.types";

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = model<ICourse>("Course", courseSchema);
