const express = require("express");
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const router = express.Router();

/**
 * GET STUDENTS FOR A DIVISION
 */
router.get("/students", async (req, res) => {
  try {
    const { division, month, year } = req.query;

    if (!division) {
      return res.status(400).json({ message: "Division required" });
    }

    // Default to current month
    const now = new Date();
    const m = month ? Number(month) : now.getMonth(); // 0–11
    const y = year ? Number(year) : now.getFullYear();

    // Get students
    const students = await Student.find({ division }).select(
      "_id name username email rollNumber totalPresent"
    );

    // Month window
    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 0);
    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);

    // Attendance for this month only
    const attendance = await Attendance.find({
      division,
      date: { $gte: startStr, $lte: endStr },
    });

    // Extract all dates attendance was taken
    const markedDates = new Set(attendance.map((a) => a.date));

    // Count Mon–Fri weekdays for month
    const weekdays = [];
    const daysInMonth = end.getDate();

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(y, m, d);
      const dow = date.getDay(); // 1 = Monday ... 5 = Friday

      if (dow >= 1 && dow <= 5) {
        weekdays.push(date.toISOString().slice(0, 10));
      }
    }

    // Auto holidays = weekdays with no attendance
    const autoHolidays = weekdays.filter((d) => !markedDates.has(d)).length;

    // Working days = weekdays − auto holidays
    const workingDays = weekdays.length - autoHolidays;

    // Total possible lectures = working days × 6
    const totalPossibleLectures = workingDays * 6;

    // Build student results
    const results = students.map((s) => {
      const present = s.totalPresent;

      const percentage =
        totalPossibleLectures > 0
          ? Math.round((present / totalPossibleLectures) * 100)
          : 0;

      return {
        _id: s._id,
        name: s.name,
        username: s.username,
        email: s.email,
        rollNumber: s.rollNumber,
        totalPresent: present,
        totalLectures: totalPossibleLectures,
        attendancePercentage: percentage,
      };
    });

    res.json({ students: results });
  } catch (err) {
    console.error("GET /attendance/students error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



/**
 * GET ATTENDANCE FOR A SPECIFIC LECTURE
 */
router.get("/fetch", async (req, res) => {
  try {
    const { division, date, lecture, subjectCode } = req.query;

    if (!division || !date || !lecture || !subjectCode) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const record = await Attendance.findOne({
      division,
      date,
      lectureNumber: Number(lecture),
    });



    res.json({ attendance: record || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * SAVE ATTENDANCE (UPSERT)
 */
router.post("/save", async (req, res) => {
  try {
    const { teacherId, division, date, lectureNumber, students } = req.body;

    if (!teacherId || !division || !date || !lectureNumber || !students) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(400).json({ message: "Teacher not found" });

    // 1️⃣ Check if attendance record already exists
    const existing = await Attendance.findOne({
      division,
      date,
      lectureNumber,
      
    });

    // ----------------------------------------
    // CASE A: UPDATE (Attendance already exists)
    // ----------------------------------------
    if (existing) {
      const oldMap = new Map();
      existing.students.forEach((s) =>
        oldMap.set(String(s.studentId), s.status)
      );

      // Update each student totals based on diff
      for (const entry of students) {
        const id = String(entry.studentId);
        const newStatus = entry.status;
        const oldStatus = oldMap.get(id) || "absent";

        if (oldStatus === "present" && newStatus === "absent") {
          await Student.findByIdAndUpdate(id, { $inc: { totalPresent: -1 } });
        }

        if (oldStatus === "absent" && newStatus === "present") {
          await Student.findByIdAndUpdate(id, { $inc: { totalPresent: +1 } });
        }
      }

      existing.students = students;
      existing.teacherId = teacherId;
      existing.subjectCode = teacher.subjectCode;
      existing.subjectName = teacher.subjectName;

      await existing.save();
      return res.json({ success: true, attendance: existing });
    }

    // ----------------------------------------
    // CASE B: CREATE NEW ATTENDANCE RECORD
    // ----------------------------------------

    // New lecture = affects totalLectures
    for (const entry of students) {
      const incPresent = entry.status === "present" ? 1 : 0;

      await Student.findByIdAndUpdate(entry.studentId, {
        $inc: {
          totalPresent: incPresent,
        },
      });
    }

    const newRecord = await Attendance.create({
      teacherId,
      division,
      date,
      lectureNumber,
      
      subjectName: teacher.subjectName,
      students,
    });

    res.json({ success: true, attendance: newRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
