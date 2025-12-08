console.log("🔥 studentAuth.js LOADED");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const StudentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },

    rollNumber: { type: Number, required: true, min: 1, max: 100 },

    securityQuestion: { type: String, required: true },

    uniqueCode: { type: String, required: true },
    division: { type: String, required: true },
    phone: { type: String, default: "" },
    college: { type: String, default: "" },
    name: { type: String, default: "" },
    firstLogin: {
      type: Boolean,
      default: true,
    },
    
  },
  { timestamps: true }
);

StudentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Student", StudentSchema);
