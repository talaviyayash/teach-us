import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types/user.types";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    school: [
      {
        schoolId: {
          type: Schema.Types.ObjectId,
          ref: "School",
          required: true,
        },
        permission: {
          type: String,
          default: "",
        },
      },
    ],
    currentSchool: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: false,
    },
    currentBatch: {
      type: Schema.Types.ObjectId,
      ref: "Batch",
      required: false,
    },
    batchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Batch",
        required: true,
      },
    ],
    isGoogleLogin: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: true,
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
