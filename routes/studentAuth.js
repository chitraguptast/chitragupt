const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Otp = require("../models/Otp");

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
  let { username, password, email, rollNumber, securityQuestion, uniqueCode } =
    req.body;

  username = username.trim();
  password = password.trim();
  email = email.trim().toLowerCase();
  securityQuestion = securityQuestion.trim();
  uniqueCode = uniqueCode.trim();

  rollNumber = Number(rollNumber);
  if (!Number.isInteger(rollNumber) || rollNumber < 1 || rollNumber > 100) {
    return res.status(400).json({ message: "Invalid roll number" });
  }

  if (!username || !password || !email || !securityQuestion || !uniqueCode) {
    return res.status(400).json({ message: "All fields required" });
  }

  // 1️⃣ Find the classroom by code (division is inside classroom.division)
  const classroom = await Classroom.findOne({ uniqueCode });
  if (!classroom) {
    return res.status(400).json({ message: "Invalid division code" });
  }

  // 2️⃣ Duplicate roll check for this classroom
  const existingRoll = await Student.findOne({
    classroomId: classroom._id,
    rollNumber,
  });

  if (existingRoll) {
    return res.status(400).json({ message: "Roll number already assigned" });
  }

  // 3️⃣ Duplicate username
  const existingUsername = await Student.findOne({ username });
  if (existingUsername) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // 4️⃣ Duplicate email
  const existingEmail = await Student.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // 5️⃣ CREATE STUDENT — USING classroom.division (CORRECT)
  const student = new Student({
    username,
    password,
    email,
    rollNumber,
    securityQuestion,
    uniqueCode,
    classroomId: classroom._id,

    // ⭐ REAL FIX: correct division
    division: classroom.division,
  });

  await student.save();

  return res.status(200).json({ message: "Signup successful" });
});

router.post("/send-otp", async (req, res) => {
  try {
    const { username } = req.body;

    const user = await Student.findOne({ username });
    if (!user) return res.status(404).json({ message: "Username not found" });

    const email = user.email;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP with 5 min expiry
    await Otp.findOneAndUpdate(
      { username },
      {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000,
      },
      { upsert: true }
    );

    // Nodemailer
    const transporter = require("../utils/mailer");


    const resend = require("../utils/mailer");

    const brevoApi = require("../utils/mailer");

    await brevoApi.sendTransacEmail({
      sender: { email: process.env.EMAIL_USER },
      to: [{ email }],
      subject: "Your OTP Code",
      htmlContent: `

    <p>
      Valid for 5 minutes<br/>
      Hey user,<br/>
      It seems like you forgot your password.<br />
      Use this OTP for verification and remember not to share it with anyone 🤫
    </p>
  `,
    });



    res.json({ message: "OTP sent!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  username = username.trim();
  password = password.trim();

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
    student: {
      _id: student._id,

      username: student.username,
      email: student.email,
      name: student.name,
      phone: student.phone,
      college: student.college,
      firstLogin: student.firstLogin,
    },
  });
});

// routes/studentProfile.js

router.post("/update", async (req, res) => {
  try {
    const { studentId, name, phone, college, email } = req.body;

    // phone validation
    if (phone && phone !== "no number" && phone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits",
      });
    }

    // set defaults
    const updated = await Student.findByIdAndUpdate(
      studentId,
      {
        name: name || undefined, // frontend sets username fallback, don't overwrite
        phone: phone || "no number",
        college: college || "",
        email,
        firstLogin: false, // <-- KEY FIX
      },
      { new: true }
    );

    res.json({ success: true, student: updated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;

// RESET PASSWORD
router.post("/reset-password", async (req, res) => {
  try {
    const { username, otp, securityQuestion, newUsername, newPassword } =
      req.body;

    // 1. Must find user with OLD username
    const user = await Student.findOne({ username });
    if (!user) return res.status(404).json({ message: "Username not found" });

    let verified = false;

    // 2. OTP check (only if otp field is NOT empty)
    if (otp && otp.trim() !== "") {
      const record = await Otp.findOne({ username });
      if (!record)
        return res.status(400).json({ message: "OTP not generated" });

      if (record.expiresAt < Date.now())
        return res.status(400).json({ message: "OTP expired" });

      if (record.otp !== Number(otp))
        return res.status(400).json({ message: "Invalid OTP" });

      verified = true;
    }

    // 3. SECURITY QUESTION check (only if OTP was NOT used)
    if (!verified) {
      if (!securityQuestion || securityQuestion.trim() === "")
        return res.status(400).json({ message: "Security question required" });

      if (
        securityQuestion.trim().toLowerCase() !==
        user.securityQuestion.trim().toLowerCase()
      ) {
        return res.status(400).json({ message: "Security answer incorrect" });
      }

      verified = true;
    }

    // 4. If not verified at all:
    if (!verified)
      return res.status(400).json({ message: "Verification failed" });

    // 5. Username update
    // Username update
    if (
      newUsername &&
      newUsername.trim() !== "" &&
      newUsername.trim().toLowerCase() !== username.trim().toLowerCase()
    ) {
      const exists = await Student.findOne({
        username: newUsername.trim(),
      });
      if (exists)
        return res.status(400).json({ message: "New username taken" });

      user.username = newUsername.trim();
    }

    if (!newPassword || newPassword.trim() === "") {
      return res.status(400).json({ message: "New password required" });
    }

    // 6. Force password hashing
    // 6. Let schema handle hashing
    user.password = newPassword;

    await user.save();

    return res.json({ message: "Password reset successful!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET student dashboard data
router.get("/dashboard", async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ message: "Student ID required" });
    }

    const student = await Student.findById(id).select(
      "_id username email name rollNumber division phone college totalPresent totalLectures"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Total attendance
    const total = {
      present: student.totalPresent,
      lectures: student.totalLectures,
      percentage:
        student.totalLectures > 0
          ? Math.round((student.totalPresent / student.totalLectures) * 100)
          : 0,
    };

    // Fetch all attendance entries for this student
    const attendanceRecords = await Attendance.find({
      "students.studentId": id,
    }).select("subjectName students");

    // Group subject-wise attendance
    const subjectMap = {};

    attendanceRecords.forEach((rec) => {
      if (!subjectMap[rec.subjectName]) {
        subjectMap[rec.subjectName] = { attended: 0, total: 0 };
      }

      rec.students.forEach((s) => {
        if (String(s.studentId) === id) {
          subjectMap[rec.subjectName].total += 1;
          if (s.status === "present") {
            subjectMap[rec.subjectName].attended += 1;
          }
        }
      });
    });

    // Convert to list
    const subjects = Object.keys(subjectMap).map((name) => {
      const d = subjectMap[name];
      return {
        subjectName: name,
        attended: d.attended,
        total: d.total,
        percentage: d.total > 0 ? Math.round((d.attended / d.total) * 100) : 0,
      };
    });

    return res.json({
      student,
      totalAttendance: total,
      subjects,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
