const express = require("express");
const auth = require("../middleware/auth");

const Attendance = require("../models/Attendance");
const Subject = require("../models/Subject");
const Student = require("../models/Student");

const router = express.Router();

/**
 * POST /api/attendance/mark
 * body: { subjectId, studentId, date, status }
 * - teacher-only
 * - date in 'YYYY-MM-DD'
 * - will upsert (create or update)
 */
router.post("/mark", auth("teacher"), async (req, res) => {
  const teacherId = req.user.id;
  const { subjectId, studentId, date, status } = req.body;

  if (!subjectId || !studentId || !date || !status)
    return res.status(400).json({ error: "Missing fields" });
  if (!["present", "absent"].includes(status))
    return res.status(400).json({ error: "Invalid status" });

  const subject = await Subject.findById(subjectId);
  if (!subject) return res.status(404).json({ error: "Subject not found" });
  if (!subject.teacherId || subject.teacherId.toString() !== teacherId)
    return res.status(403).json({ error: "Not your subject" });

  // ensure student belongs to that classroom
  const student = await Student.findById(studentId);
  if (!student) return res.status(404).json({ error: "Student not found" });
  if (student.classroomId.toString() !== subject.classroomId.toString()) {
    return res.status(400).json({ error: "Student not in subject classroom" });
  }

  // upsert attendance
  const filter = { studentId, subjectId, date };
  const update = { status };
  const opts = { upsert: true, new: true, setDefaultsOnInsert: true };

  const updated = await Attendance.findOneAndUpdate(filter, update, opts);
  res.json({ attendance: updated });
});

/**
 * GET /api/attendance/subject/:subjectId/date/:date
 * teacher-only: get attendance records for a subject on given date
 */
router.get(
  "/subject/:subjectId/date/:date",
  auth("teacher"),
  async (req, res) => {
    const teacherId = req.user.id;
    const { subjectId, date } = req.params;

    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ error: "Subject not found" });
    if (!subject.teacherId || subject.teacherId.toString() !== teacherId)
      return res.status(403).json({ error: "Not your subject" });

    const records = await Attendance.find({ subjectId, date })
      .populate("studentId", "username")
      .lean();
    res.json({ records });
  }
);

/**
 * GET /api/attendance/student/:studentId/subject/:subjectId
 * student or teacher (teacher checks subject ownership) can request attendance history
 */
router.get(
  "/student/:studentId/subject/:subjectId",
  auth(),
  async (req, res) => {
    const requester = req.user;
    const { studentId, subjectId } = req.params;

    // if requester is teacher, ensure they own the subject
    if (requester.role === "teacher") {
      const subject = await Subject.findById(subjectId);
      if (!subject) return res.status(404).json({ error: "Subject not found" });
      if (!subject.teacherId || subject.teacherId.toString() !== requester.id) {
        return res.status(403).json({ error: "Not your subject" });
      }
    }

    // if requester is student, ensure they are requesting their own record
    if (requester.role === "student" && requester.id !== studentId) {
      return res
        .status(403)
        .json({ error: "Students can only fetch their own records" });
    }

    const records = await Attendance.find({ studentId, subjectId })
      .sort({ date: 1 })
      .lean();
    res.json({ records });
  }
);

module.exports = router;
