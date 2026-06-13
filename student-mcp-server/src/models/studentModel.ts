import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model(
  "Student",
  studentSchema
);