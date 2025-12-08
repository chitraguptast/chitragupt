const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Teacher = require("../models/Teacher");
const Subject = require("../models/Subject");
const nodemailer = require("nodemailer");
const Otp = require("../models/Otp"); // SAME OTP model used for students
const Student = require("../models/Student");


const router = express.Router();

function signToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function generateSubjectName(subjectCode) {
  const match = subjectCode.match(/^[A-Za-z]+/);
  if (!match) return "Unknown";

  const raw = match[0];
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}



/**
 * Teacher signup
 */
router.post("/signup", async (req, res) => {
  try {
    let { username, password, subjectCode, email, securityQuestion } = req.body;

    username = username.trim();
    password = password.trim();
    subjectCode = subjectCode.trim();
    email = email.trim();
    securityQuestion = securityQuestion.trim();

    if (!username || !password || !subjectCode || !email || !securityQuestion) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // 1️⃣ Find subject
    const subject = await Subject.findOne({ uniqueCode: subjectCode }).populate(
      "classroomId"
    );
    if (!subject) {
      return res.status(400).json({ message: "Invalid subject code" });
    }

    // 2️⃣ username already used?
    const existing = await Teacher.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username taken" });
    }

    // 3️⃣ subject code can only be assigned once
    const duplicateCode = await Teacher.findOne({ subjectCode });
    if (duplicateCode) {
      return res.status(400).json({ message: "Code already assigned" });
    }

    // 4️⃣ Hash password + security answer
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedQuestion = await bcrypt.hash(securityQuestion, 10);

    // 5️⃣ Extract ALL divisions from classrooms
    const divisions = (subject.classroomId || [])
      .map((cls) => cls.division)
      .filter(Boolean);

    if (divisions.length === 0) {
      return res
        .status(400)
        .json({ message: "No classrooms linked to subject" });
    }

    // 6️⃣ Create teacher
    // 6️⃣ Create teacher
    const teacher = await Teacher.create({
      username,
      password: hashedPassword,
      subjectCode,
      subjectName: subject.subjectName, // 🔥 CORRECT
      email,
      securityQuestion: hashedQuestion,
      divisions,
    });

    res.json({
      message: "Teacher created",
      teacher: {
        id: teacher._id,
        username: teacher.username,
        email: teacher.email,
        subjectCode: teacher.subjectCode,
        subjectName: teacher.subjectName,
        divisions: teacher.divisions,
        firstLogin: teacher.firstLogin,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
  
});


/**
 * Teacher login
 */
router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  username = username.trim();
  password = password.trim();

  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });

  const teacher = await Teacher.findOne({ username });
  if (!teacher) return res.status(400).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, teacher.password);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  const token = signToken(teacher._id, "teacher");

  res.json({
    token,
    teacher: {
      id: teacher._id,
      username: teacher.username,
      email: teacher.email,
      name: teacher.name,
      prefix: teacher.prefix,
      phone: teacher.phone,
      college: teacher.college,
      divisions: teacher.divisions,
      subjectCode: teacher.subjectCode,
      subjectName: teacher.subjectName, // 🔥 ADD THIS
      firstLogin: teacher.firstLogin,
    },
  });

});

/**
 * Teacher reset password
 */
router.post("/send-otp", async (req, res) => {
  try {
    const { username } = req.body;

    const teacher = await Teacher.findOne({ username });
    if (!teacher)
      return res.status(404).json({ message: "Username not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);

    await Otp.findOneAndUpdate(
      { username, role: "teacher" },
      {
        otp,
        role: "teacher",
        expiresAt: Date.now() + 5 * 60 * 1000,
      },
      { upsert: true, new: true }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = `
      <h2>Your OTP Code</h2>
      <h1>${otp}</h1>
      <p>Valid for 5 minutes</p>
      <p>Do not share this OTP.</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: teacher.email,
      subject: "Teacher OTP for Password Reset",
      html,
    });

    res.json({ message: "OTP sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { username, otp, securityQuestion, newUsername, newPassword } =
      req.body;

    console.log("Received OTP:", otp);
    console.log("Payload:", {
      username,
      otp,
      securityQuestion,
      newUsername,
      newPassword: !!newPassword,
    });

    // 1) find teacher by old username
    const teacher = await Teacher.findOne({ username });
    if (!teacher)
      return res.status(404).json({ message: "Username not found" });

    let verified = false;

    // 2) OTP verification (if provided)
    if (otp && otp.trim() !== "") {
      const otpRecord = await Otp.findOne({ username, role: "teacher" });
      if (!otpRecord) return res.status(400).json({ message: "OTP not found" });

      console.log("Stored OTP:", otpRecord.otp);

      if (otpRecord.expiresAt < Date.now())
        return res.status(400).json({ message: "OTP expired" });

      if (String(otpRecord.otp) !== String(otp))
        return res.status(400).json({ message: "Invalid OTP" });

      verified = true;
      await Otp.deleteOne({ _id: otpRecord._id });
    }

    // 3) Security-question verification (only if OTP not used)
    if (!verified) {
      if (!securityQuestion || securityQuestion.trim() === "") {
        return res.status(400).json({ message: "Security question required" });
      }
      const match = await bcrypt.compare(
        securityQuestion,
        teacher.securityQuestion
      );
      if (!match)
        return res.status(400).json({ message: "Security Question incorrect" });
      verified = true;
    }

    if (!verified)
      return res.status(400).json({ message: "Verification failed" });

    // 4) Handle newUsername: if provided and different, validate uniqueness and update
    let finalUsername = teacher.username;
    if (
      newUsername &&
      newUsername.trim() !== "" &&
      newUsername.trim() !== username
    ) {
      const exists = await Teacher.findOne({ username: newUsername.trim() });
      if (exists)
        return res.status(400).json({ message: "New username already taken" });
      teacher.username = newUsername.trim();
      finalUsername = newUsername.trim();
    }

    // 5) Force-hash password every time
    if (!newPassword || newPassword.trim() === "") {
      return res.status(400).json({ message: "New password required" });
    }
    teacher.password = await bcrypt.hash(newPassword, 10);

    await teacher.save();

    return res.json({
      message: "Password reset successful",
      newUsername: finalUsername,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * Teacher Profile Update
 */
router.post("/update-profile", async (req, res) => {
  try {
    const {
      id,
      name,
      prefix,
      phone,
      college,
      email,
    } = req.body;

    // Validation
    if (phone && phone !== "" && phone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits",
      });
    }

    // Update teacher
    const updated = await Teacher.findByIdAndUpdate(
      id,
      {
        name: name || "",
        prefix: prefix || "",
        phone: phone || "",
        college: college || "",
        email: email || "",
        firstLogin: false, // IMPORTANT
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }

    return res.json({
      success: true,
      teacher: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// GET students by division






module.exports = router;
