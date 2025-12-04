const mongoose = require("mongoose");
const fs = require("fs");
const { Parser } = require("json2csv");

const MONGO_URI =
  "mongodb+srv://Swapnil:swapnilst@chitragupt-databse.p0gguws.mongodb.net/?appName=chitragupt-databse";

async function exportStudentsCSV() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    const db = mongoose.connection.db;
    console.log("🔥 Connected!");

    const students = await db.collection("students").find({}).toArray();

    if (students.length === 0) {
      console.log("⚠️ No students found.");
      process.exit(0);
    }

    // Convert to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(students);

    fs.writeFileSync("students.csv", csv);

    console.log("✅ Export completed → students.csv");

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ ERROR:", err);
    process.exit(1);
  }
}

exportStudentsCSV();
