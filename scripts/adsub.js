const mongoose = require("mongoose");

// ⛔ PUT YOUR FULL MONGODB ATLAS CONNECTION STRING HERE:
const MONGO_URI =
  "mongodb+srv://Swapnil:swapnilst@chitragupt-databse.p0gguws.mongodb.net/?appName=chitragupt-databse";

async function clearDB() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    const db = mongoose.connection.db;
    console.log("🔥 Connected!");

    // Delete students
    const studentsDeleted = await db.collection("students").deleteMany({});
    console.log(`🗑️ Students deleted: ${studentsDeleted.deletedCount}`);

    // Delete attendance
    const attendanceDeleted = await db.collection("attendances").deleteMany({});
    console.log(`🗑️ Attendance deleted: ${attendanceDeleted.deletedCount}`);

    // Reset counters (if any students exist)
    const countersReset = await db
      .collection("students")
      .updateMany({}, { $set: { totalPresent: 0, totalLectures: 0 } });
    console.log("🔄 Counters reset:", countersReset.modifiedCount);

    await mongoose.disconnect();
    console.log("✅ Done. Database cleared.");

    process.exit(0);
  } catch (err) {
    console.error("❌ ERROR:", err);
    process.exit(1);
  }
}

clearDB();
