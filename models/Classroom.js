const mongoose = require("mongoose");

const ClassroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    uniqueCode: { type: String, required: true, unique: true },

    // NEW FIELD
    division: { type: String, required: true },
  },
  { timestamps: true }
);

// Auto-set division based on last capital letter in uniqueCode
ClassroomSchema.pre("validate", function (next) {
  if (this.uniqueCode) {
    // Extract last uppercase letter (A/B/C/D etc.)
    const match = this.uniqueCode.match(/[A-Z](?=[0-9]*$)/);

    if (!match) {
      return next(
        new Error(
          "Invalid unique code format. Division letter missing at expected position."
        )
      );
    }

    this.division = match[0];
  }

  next();
});

module.exports = mongoose.model("Classroom", ClassroomSchema);
