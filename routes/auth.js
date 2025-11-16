const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Teacher = require("../models/Teacher");
const Subject = require("../models/Subject");

const router = express.Router();

function signToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Teacher signup
 */
router.post("/signup", async (req, res) => {
  const { username, password, subjectCode } = req.body;

  if (!username || !password || !subjectCode)
    return res.status(400).json({ message: "Missing fields" });

  const subject = await Subject.findOne({ uniqueCode: subjectCode });
  if (!subject)
    return res.status(400).json({ message: "Invalid subject code" });

  const existing = await Teacher.findOne({ username });
  if (existing) return res.status(400).json({ message: "Username taken" });

  const hashed = await bcrypt.hash(password, 10);

  const teacher = await Teacher.create({
    username,
    password: hashed,
    subjectCode,
  });

  res.json({ message: "Teacher created", teacher });
});

/**
 * Teacher login
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });

  const teacher = await Teacher.findOne({ username });
  if (!teacher) return res.status(400).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, teacher.password);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  const token = signToken(teacher._id, "teacher");

  res.json({ token, teacherId: teacher._id });
});

/**
 * Teacher reset password
 */
router.post("/reset-password", async (req, res) => {
  const { username, uniqueCode, newUsername, newPassword } = req.body;

  if (!username || !uniqueCode || !newUsername || !newPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const teacher = await Teacher.findOne({
    username,
    subjectCode: uniqueCode,
  });

  if (!teacher) {
    return res.status(400).json({ message: "Invalid username or code" });
  }
  const isChangingUsername = newUsername == Teacher.username;

  if (isChangingUsername) {
    const existing = await Teacher.findOne({ username: newUsername });
    if (existing) {
      return res.status(400).json({ message: "Username already exists" });
    }
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  teacher.username = newUsername;
  teacher.password = hashed;

  await teacher.save();

  res.json({ message: "Password reset successful" });
});

module.exports = router;
