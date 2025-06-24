import { Schema, model } from "mongoose";

const divisionSchema = new Schema(
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
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    sem: {
      type: Schema.Types.ObjectId,
      ref: "Sem",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Division = model("Division", divisionSchema);
