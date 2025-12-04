const express = require("express");
const auth = require("../middleware/auth");

const Teacher = require("../models/Teacher");
const Subject = require("../models/Subject");
const Student = require("../models/Student");
const Classroom = require("../models/Classroom");

const router = express.Router();

/**
 * GET /api/teacher/subjects
 * returns all subjects assigned to this teacher
 */
router.get("/subjects", auth("teacher"), async (req, res) => {
  const teacherId = req.user.id;
  const subjects = await Subject.find({ teacherId }).lean();
  res.json({ subjects });
});

/**
 * GET /api/teacher/:subjectId/students
 * returns all students in the classroom of the subject
 */
router.get("/:subjectId/students", auth("teacher"), async (req, res) => {
  const teacherId = req.user.id;
  const { subjectId } = req.params;

  const subject = await Subject.findById(subjectId);
  if (!subject) return res.status(404).json({ error: "Subject not found" });
  if (!subject.teacherId || subject.teacherId.toString() !== teacherId) {
    return res.status(403).json({ error: "Not your subject" });
  }

  const students = await Student.find({ classroomId: subject.classroomId })
    .select("-password")
    .lean();
  res.json({ students });
});

module.exports = router;
