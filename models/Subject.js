const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    uniqueCode: { type: String, required: true, unique: true, index: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }, // optional until assigned
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
