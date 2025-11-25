const mongoose = require("mongoose");
const Classroom = require("../models/Classroom"); // adjust path if needed

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Swapnil:swapnilst@chitragupt-databse.p0gguws.mongodb.net/?"
    );

    const classrooms = await Classroom.insertMany([
      {
        name: "FE Division A",
        uniqueCode: "FEDA25",
      },
      {
        name: "FE Division B",
        uniqueCode: "FEDB25",
      },
      {
        name: "FE Division C",
        uniqueCode: "FEDC25",
      },
      {
        name: "FE Division D",
        uniqueCode: "FEDD25",
      },
    ]);

    console.log("Created classrooms:", classrooms);

    await mongoose.disconnect();
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
