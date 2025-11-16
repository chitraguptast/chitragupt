const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const Classroom = require("../models/Classroom");

const router = express.Router();

// DEBUG
router.use((req, res, next) => {
  console.log("📥 Incoming student route:", req.method, req.url);
  console.log("📦 Body received:", req.body);
  next();
});

// SIGNUP
router.post("/signup", async (req, res) => {
  const { username, password, uniqueCode } = req.body;

  if (!username || !password || !uniqueCode)
    return res.status(400).json({ message: "All fields required" });

  const classroom = await Classroom.findOne({ uniqueCode });
  if (!classroom)
    return res.status(400).json({ message: "Invalid division code" });

  const existing = await Student.findOne({ username });
  if (existing) return res.status(400).json({ message: "User already exists" });

  try {
    const student = new Student({
      username,
      password,
      divisionCode: uniqueCode,
      classroomId: classroom._id,
    });

    await student.save();
    return res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    console.log("❌ Mongoose error:", err);
    return res.status(500).json({ message: "Database error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "All fields required" });

  const student = await Student.findOne({ username });
  if (!student) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, student.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: student._id, role: "student" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    message: "Login successful",
    token,
    studentId: student._id,
    divisionCode: student.divisionCode,
  });
});

// RESET PASSWORD
router.post("/reset-password", async (req, res) => {
  const { username, uniqueCode, newUsername, newPassword } = req.body;

  if (!username || !uniqueCode || !newUsername || !newPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const student = await Student.findOne({
    username,
    divisionCode: uniqueCode,
  });

  if (!student) {
    return res.status(400).json({ message: "Invalid username or code" });
  }
  // Check if newUsername is already taken (and not the current student's username)
  const isChangingUsername = newUsername !== student.username;

  if (isChangingUsername) {
    const existing = await Student.findOne({ username: newUsername });
    if (existing) {
      return res.status(400).json({ message: "Username already exists" });
    }
  }


  student.username = newUsername;
  student.password = newPassword;

  await student.save();

  res.json({ message: "Password reset successful" });
});



module.exports = router;
