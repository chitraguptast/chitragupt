require("dotenv").config();
const mongoose = require("mongoose");

const Subject = require("../models/Subject");
const Classroom = require("../models/Classroom");


async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("DB connected.");

  // DELETE OLD SUBJECTS
  await Subject.deleteMany({});
  console.log("Cleared Subjects.");

  // LOAD ALL CLASSROOMS
  const classrooms = await Classroom.find({});
  if (classrooms.length === 0) {
    console.error("No classrooms found.");
    process.exit(1);
  }

  // Map division letter -> classroomId
  // FE DIV-A 2025 → uniqueCode = FEDA25 → divisionLetter = A
  const divisionMap = {};
  classrooms.forEach((c) => {
    // Extract division letter from classroom uniqueCode
    const unique = c.uniqueCode; // e.g. "FEDA25"
    const divLetter = unique[3]; // 4th character = division (A/B/C/D)
    divisionMap[divLetter] = c._id;
  });

  // SUBJECT DATA YOU WANT
  const subjects = [
    { name: "Math", uniqueCode: "MATH101A" },
    { name: "Math", uniqueCode: "MATH101B" },
    { name: "Math", uniqueCode: "MATH101AB" },
    { name: "Physics", uniqueCode: "PHY202AC" },
    { name: "Chemistry", uniqueCode: "CHEM303D" },
  ];

  const insertList = [];

  for (const s of subjects) {
    const code = s.uniqueCode;
    const divisionLetters = code.replace(/[^A-Z]/g, ""); // extract letters

    // GET ONLY THE DIVISION PART (the tail)
    // Math101AB → AB
    const divPart = divisionLetters.slice(-2).match(/[A-D]+/)[0];

    const classIds = [];

    for (const letter of divPart) {
      const room = divisionMap[letter];
      if (!room) throw new Error(`No classroom found for division ${letter}`);
      classIds.push(room);
    }

    insertList.push({
      name: s.name,
      uniqueCode: s.uniqueCode,
      classroomId: classIds,
    });
  }

  // INSERT NEW SUBJECTS
  await Subject.insertMany(insertList);
  console.log("Subjects seeded.");

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
