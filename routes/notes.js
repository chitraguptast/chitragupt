// routes/notes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const supabase = require("../supabaseAdmin");
const Note = require("../models/Note");

// Multer temp storage
const upload = multer({ dest: "uploads/" });

// Bucket name (change if different)
const BUCKET = "notes";

// Upload endpoint
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { title, description, subject, pages, date } = req.body;

    // Build unique path: notes/<timestamp>_<originalname>
    const safeName = req.file.originalname.replace(/\s+/g, "_");
    const timestamp = Date.now();
    const destPath = `notes/${timestamp}_${safeName}`;

    // Upload file stream to Supabase Storage
    const fileStream = fs.createReadStream(req.file.path);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(destPath, fileStream, {
        contentType: req.file.mimetype,
        cacheControl: "3600",
        upsert: false,
      });

    // Cleanup local temp file ASAP
    try {
      fs.unlinkSync(req.file.path);
    } catch (e) {}

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return res.status(500).json({ error: "Failed to upload to storage" });
    }

    // Get public URL
    // Get public URL
    const { data: publicData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(destPath);
    const publicURL = publicData.publicUrl;

    if (!publicURL) {
      console.error("Failed to generate public URL");
      return res.status(500).json({ error: "Failed to generate public URL" });
    }

    // Save note metadata to MongoDB
    const newNote = await Note.create({
      title,
      description,
      subject,
      pages: Number(pages),
      date,
      filePath: destPath,
      fileLink: publicURL,
    });

    return res.json({ success: true, note: newNote });
  } catch (err) {
    console.error("Upload Error:", err);
    return res.status(500).json({ error: "Upload failed" });
  }
});

// List notes
router.get("/list", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error("Fetch Notes Error:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Delete note + delete object from Supabase
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    // Remove from storage (path stored in note.filePath)
    if (note.filePath) {
      const { error: removeErr } = await supabase.storage
        .from(BUCKET)
        .remove([note.filePath]);
      if (removeErr) {
        console.warn("Warning: failed to remove file from storage:", removeErr);
        // continue to delete DB record even if storage deletion fails
      }
    }

    await Note.findByIdAndDelete(req.params.id);

    res.json({ success: true });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
