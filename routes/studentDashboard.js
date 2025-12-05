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
    const mongoose = require("mongoose");

    // Convert to ObjectId
    const studentObjectId = new mongoose.Types.ObjectId(studentId);

    const attendanceRecords = await Attendance.find({
      "students.studentId": studentObjectId,
    }).lean();


    // 🔥 LOG ATTENDANCE COUNT
    console.log("🔥 Attendance records found:", attendanceRecords.length);

    let totalPresent = 0;
    let totalLectures = attendanceRecords.length;

    attendanceRecords.forEach((rec) => {
      const entry = rec.students.find(
        (s) => s.studentId && s.studentId.equals(studentObjectId)
      );


      if (entry && entry.status === "present") totalPresent++;
    });

    // SUBJECT MAP BUILD
    const subjectMap = {};
    attendanceRecords.forEach((rec) => {
      const subject = rec.subjectName || "Unknown";

      if (!subjectMap[subject]) {
        subjectMap[subject] = { attended: 0, total: 0 };
      }

      const s = rec.students.find(
        (x) => x.studentId && x.studentId.equals(studentObjectId)
      );


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

    console.log("🔥 Raw attendanceRecords sample:");
    console.log(attendanceRecords[0]);

    if (attendanceRecords[0]) {
      console.log("🔥 Students array inside first record:");
      console.log(attendanceRecords[0].students);

      console.log("🔥 Comparing stored studentIds to the requested one:");
      attendanceRecords[0].students.forEach((s) => {
        console.log(
          " -> stored:",
          s.studentId,
          " | matches? ",
          s.studentId.equals(studentObjectId)
        );
      });
    }


    // Build list of absent dates + lectures missed count
    const absentDetails = attendanceRecords
      .map((rec) => {
        const entry = rec.students.find(
          (s) => s.studentId && s.studentId.equals(studentObjectId)
        );

        if (!entry) return null;
        if (entry.status !== "absent") return null;

        return {
          date: rec.date,
          subject: rec.subjectName,
          lectureNumber: rec.lectureNumber,
        };
      })
      .filter(Boolean);

      console.log("🔥 Absent details generated:", absentDetails);



    // Count total absences
    const totalAbsentDays = absentDetails.length;

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
      absentDetails, // ⬅️ date + subject
      totalAbsentDays, // ⬅️ count
    });

  } catch (err) {
    console.error("🔥 DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
