const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    subjectName: { type: String, required: true },

    uniqueCode: { type: String, required: true, unique: true, index: true },

    classroomId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classroom",
        required: true,
      },
    ],

  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
