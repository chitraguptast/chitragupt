const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://Swapnil:swapnilst@chitragupt-databse.p0gguws.mongodb.net/?appName=chitragupt-databse";

async function deleteAllAttendance() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    const db = mongoose.connection.db;
    console.log("🔥 Connected!");

    // First, detect the correct collection name
    const collections = await db.listCollections().toArray();
    console.log(
      "📂 Collections:",
      collections.map((c) => c.name)
    );

    // Try deleting from all possible attendance collection names
    const possibleNames = [
      "attendance",
      "attendances",
      "Attendance",
      "AttendanceRecords",
    ];

    for (const name of possibleNames) {
      if (collections.find((c) => c.name === name)) {
        const result = await db.collection(name).deleteMany({});
        console.log(`🗑️ Deleted from '${name}':`, result.deletedCount);
      }
    }

    await mongoose.disconnect();
    console.log("✅ Done. All attendance documents deleted.");

    process.exit(0);
  } catch (err) {
    console.error("❌ ERROR:", err);
    process.exit(1);
  }
}

deleteAllAttendance();
