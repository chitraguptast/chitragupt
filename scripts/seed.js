require("dotenv").config();
const mongoose = require("mongoose");

const Classroom = require("../models/Classroom");
const Subject = require("../models/Subject");

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to database\n");

  // 1. Define classrooms to create
  const classroomsData = [
    { name: "Class 10A", uniqueCode: "CLASS10A" },
    { name: "Class 10B", uniqueCode: "CLASS10B" },
  ];

  // 2. Insert classrooms (clean insert)
  await Classroom.deleteMany({});
  const classrooms = await Classroom.insertMany(classroomsData);
  console.log("Classrooms created:", classrooms);

  // Map classroom names to their IDs for easy reference
  const classMap = {};
  classrooms.forEach((c) => (classMap[c.name] = c._id));

  // 3. Define subjects for each classroom
  const subjectsData = [
    { name: "Math", uniqueCode: "MATH101A", classroomName: "Class 10A" },
    { name: "Physics", uniqueCode: "PHY101A", classroomName: "Class 10A" },
    { name: "Chemistry", uniqueCode: "CHEM101A", classroomName: "Class 10A" },

    { name: "Math", uniqueCode: "MATH101B", classroomName: "Class 10B" },
    { name: "Biology", uniqueCode: "BIO101B", classroomName: "Class 10B" },
  ];

  // 4. Insert subjects
  await Subject.deleteMany({});
  const subjectsToInsert = subjectsData.map((sub) => ({
    name: sub.name,
    uniqueCode: sub.uniqueCode,
    classroomId: classMap[sub.classroomName],
  }));

  const subjects = await Subject.insertMany(subjectsToInsert);
  console.log("Subjects created:", subjects);

  console.log("\n✔ SEEDING COMPLETE");
  mongoose.connection.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
