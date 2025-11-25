const mongoose = require("mongoose");
const Subject = require("../models/Subject"); // fix path if needed

async function resetSubjects() {
  try {
    // 1. CONNECT TO MONGODB
    await mongoose.connect(
      "mongodb+srv://Swapnil:swapnilst@chitragupt-databse.p0gguws.mongodb.net/?appName=chitragupt-databse",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB Connected");

    // CLASSROOM ID YOU PROVIDED
    const classA = "6924786cb972e73b1788bad9";

    // 2. DELETE OLD SUBJECTS
    await Subject.deleteMany({});
    console.log("Old subjects deleted");

    // 3. INSERT NEW SUBJECTS
    const subjects = [
      { subjectName: "math", uniqueCode: "MATH101A", classroomId: [classA] },
      {
        subjectName: "mechanics",
        uniqueCode: "MECH101A",
        classroomId: [classA],
      },
      {
        subjectName: "chemistry",
        uniqueCode: "CHEM101A",
        classroomId: [classA],
      },
      { subjectName: "FPL", uniqueCode: "FPL101A", classroomId: [classA] },
      {
        subjectName: "electronics",
        uniqueCode: "BXE101A",
        classroomId: [classA],
      },
    ];

    await Subject.insertMany(subjects);
    console.log("New subjects added");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

resetSubjects();
