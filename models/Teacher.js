const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    securityQuestion: { type: String, required: true },

    divisions: { type: [String], required: true },

    // SAME NAMING AS STUDENT FOR CONSISTENCY
    phone: { type: String, default: "" },
    college: { type: String, default: "" },
    name: { type: String, default: "" },
    prefix: { type: String, default: "" },
    firstLogin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
