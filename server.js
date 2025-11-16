require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

// Routes
const authRoutes = require("./routes/auth");
const attendanceRoutes = require("./routes/attendance");
const teacherRoutes = require("./routes/teacher");
const studentAuthRoutes = require("./routes/studentAuth");

const app = express();


app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/notes", require("./routes/notes"));


app.use((req, res, next) => {
  console.log("🔥 SERVER GOT REQUEST:", req.method, req.url);
  next();
});


/* === API ROUTES FIRST === */
// TEACHER AUTH ROUTES
app.use("/api/teacher/auth", authRoutes);

// STUDENT AUTH ROUTES
app.use("/api/student/auth", studentAuthRoutes);

// OTHER ROUTES
app.use("/api/attendance", attendanceRoutes);
app.use("/api/teacher", teacherRoutes);

/* === STATIC FILES NEXT === */
app.use(express.static(path.join(__dirname, "public")));
app.use("/dashboard", express.static(path.join(__dirname, "dashboard")));

/* === ENTRY PAGE === */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "main.html"));
});

const PORT = process.env.PORT || 3000;

async function start() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
start();
