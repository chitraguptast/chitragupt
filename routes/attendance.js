const express = require("express");
const Attendance = require("../models/Attendance");
const Holiday = require("../models/Holiday");
const Student = require("../models/Student");

const router = express.Router();

/* ============================================================
   CHECK HOLIDAY
============================================================ */
async function isHoliday(date) {
  const h = await Holiday.findOne({ date });
  return !!h;
}

/* ============================================================
   MARK / UNMARK HOLIDAY
============================================================ */
router.post("/mark-holiday", async (req, res) => {
  try {
    const { date, teacherId, pin, action } = req.body;

    if (!date || !teacherId || !pin)
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });

    if (pin !== "2005")
      return res
        .status(403)
        .json({ success: false, message: "Invalid holiday pin" });

    if (action === "mark") {
      const holiday = await Holiday.findOneAndUpdate(
        { date },
        { markedBy: teacherId },
        { upsert: true, new: true }
      );

      // remove all attendance for the entire day
      await Attendance.deleteMany({ date });

      return res.json({
        success: true,
        action: "mark",
        message: `${date} marked as holiday. Attendance cleared.`,
        holiday,
      });
    }

    if (action === "unmark") {
      await Holiday.deleteOne({ date });

      return res.json({
        success: true,
        action: "unmark",
        message: `${date} is no longer a holiday.`,
      });
    }

    res.status(400).json({ success: false, message: "Invalid action" });
  } catch (err) {
    console.error("Holiday error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ============================================================
   SAVE ATTENDANCE  (UNIQUE KEY = division + date + lecture)
============================================================ */
router.post("/save", async (req, res) => {
  try {
    const {
      division,
      date,
      lectureNumber,
      teacherId,
      subjectCode,
      subjectName,
      students,
    } = req.body;

    if (!division || !date || !lectureNumber || !teacherId)
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });

    if (!subjectCode || !subjectName)
      return res
        .status(400)
        .json({ success: false, message: "Missing subject fields" });

    if (await isHoliday(date))
      return res.status(400).json({
        success: false,
        message: "This date is marked as holiday. Attendance blocked.",
      });

    const doc = await Attendance.findOneAndUpdate(
      { division, date, lectureNumber },
      {
        division,
        date,
        lectureNumber,
        teacherId,
        subjectCode,
        subjectName,
        students,
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, attendance: doc });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


/* ============================================================
   FETCH ATTENDANCE FOR ONE LECTURE
============================================================ */
router.get("/fetch", async (req, res) => {
  try {
    const { division, date, lecture } = req.query;

    if (await isHoliday(date))
      return res.json({ holiday: true, attendance: null });

    const attendance = await Attendance.findOne({
      division,
      date,
      lectureNumber: Number(lecture),
    });

    res.json({
      holiday: false,
      attendance,
      subjectName: attendance?.subjectName,
      subjectCode: attendance?.subjectCode,
    });

  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/fetch-lecture", async (req, res) => {
  try {
    const { division, date, lecture } = req.query;

    if (!division || !date || !lecture)
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });

    const attendance = await Attendance.findOne({
      division,
      date,
      lectureNumber: Number(lecture),
    });

    if (!attendance) return res.json({ success: false, attendance: null });

    return res.json({ success: true, attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});


/* ============================================================
   DELETE ATTENDANCE FOR ONE LECTURE
============================================================ */
router.delete("/delete", async (req, res) => {
  try {
    const { division, date, lectureNumber } = req.body;

    if (await isHoliday(date))
      return res
        .status(400)
        .json({ success: false, message: "Cannot delete on a holiday" });

    await Attendance.deleteOne({ division, date, lectureNumber });

    res.json({ success: true, message: "Attendance deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ============================================================
   GET STUDENTS FOR A DIVISION
============================================================ */
router.get("/students", async (req, res) => {
  try {
    const { division } = req.query;

    const list = await Student.find({ division }).select(
      "name email username rollNumber"
    );

    res.json({ success: true, students: list });
  } catch (err) {
    console.error("Student fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ============================================================
   ATTENDANCE SUMMARY (per student)
   WORKS WITHOUT SUBJECT — now based on actual lecture attendance
============================================================ */
router.get("/summary", async (req, res) => {
  try {
    const { division } = req.query;

    if (!division)
      return res.json({ success: false, message: "Missing division" });

    const all = await Attendance.find({ division }).lean();

    if (!all.length)
      return res.json({
        success: true,
        totalLectures: 0,
        students: [],
      });

    const totalLectures = all.length;

    const attendedMap = {};

    all.forEach((record) => {
      record.students.forEach((st) => {
        if (!attendedMap[st.studentId]) attendedMap[st.studentId] = 0;
        if (st.status === "present") attendedMap[st.studentId]++;
      });
    });

    const studentsArr = Object.keys(attendedMap).map((id) => ({
      studentId: id,
      attended: attendedMap[id],
    }));

    res.json({
      success: true,
      totalLectures,
      students: studentsArr,
    });
  } catch (err) {
    console.error("Summary error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
