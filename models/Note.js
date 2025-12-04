// models/Note.js
const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  pages: { type: Number, required: true },
  date: { type: String, required: true },

  // For Supabase we store the path we uploaded as well as a public URL
  filePath: { type: String, required: true }, // e.g. notes/167123_filename.pdf
  fileLink: { type: String, required: true }, // public URL from Supabase

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", NoteSchema);
