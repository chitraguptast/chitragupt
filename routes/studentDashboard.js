const express = require("express");
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const studentId = req.query.id;

    // 🔥 LOGS YOU MUST ADD
    console.log("🔥 Incoming studentId:", studentId);

    if (!studentId)
      return res.status(400).json({ message: "Student ID required" });

    const student = await Student.findById(studentId).lean();

    // 🔥 LOG IF STUDENT FOUND OR NOT
    console.log("🔥 Loaded student:", student);

    if (!student) return res.status(404).json({ message: "Student not found" });

    // 🔥 FIND ATTENDANCE RECORDS
    const attendanceRecords = await Attendance.find({
      "students.studentId": studentId,
    }).lean();

    // 🔥 LOG ATTENDANCE COUNT
    console.log("🔥 Attendance records found:", attendanceRecords.length);

    let totalPresent = 0;
    let totalLectures = attendanceRecords.length;

    attendanceRecords.forEach((rec) => {
      const entry = rec.students.find((s) => String(s.studentId) === studentId);
      if (entry && entry.status === "present") totalPresent++;
    });

    // SUBJECT MAP BUILD
    const subjectMap = {};
    attendanceRecords.forEach((rec) => {
      const subject = rec.subjectName || "Unknown";

      if (!subjectMap[subject]) {
        subjectMap[subject] = { attended: 0, total: 0 };
      }

      const s = rec.students.find((x) => String(x.studentId) === studentId);

      subjectMap[subject].total++;
      if (s?.status === "present") subjectMap[subject].attended++;
    });

    const subjects = Object.keys(subjectMap).map((sub) => {
      const { attended, total } = subjectMap[sub];
      return {
        subjectName: sub,
        attended,
        total,
        percentage: total > 0 ? Math.round((attended / total) * 100) : 0,
      };
    });

    const absentDates = attendanceRecords
      .filter((rec) => {
        const entry = rec.students.find(
          (s) => String(s.studentId) === studentId
        );
        return entry && entry.status === "absent";
      })
      .map((rec) => rec.date);


    res.json({
      student,
      totalAttendance: {
        present: totalPresent,
        lectures: totalLectures,
        percentage:
          totalLectures > 0
            ? Math.round((totalPresent / totalLectures) * 100)
            : 0,
      },
      subjects,
      absentDates,
    });
  } catch (err) {
    console.error("🔥 DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
