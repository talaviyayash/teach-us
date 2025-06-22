import { Schema, model } from "mongoose";
import { ISchool } from "../types/school.types";

const schoolSchema = new Schema<ISchool>(
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const School = model<ISchool>("School", schoolSchema);
