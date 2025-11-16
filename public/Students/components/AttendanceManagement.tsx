import React, { useState, useEffect } from "react";

const AttendanceManagement: React.FC = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/dashboard/index.html";
      return;
    }

    fetch("/api/teacher/subjects", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.subjects) {
          setSubjects(data.subjects);
        } else {
          alert("Failed to load subjects");
        }
      });
  }, []);

  const loadStudents = (subjectId: string) => {
    const token = localStorage.getItem("token");

    setSelectedSubject(subjectId);

    fetch(`/api/teacher/${subjectId}/students`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.students || []);
      });
  };

  const mark = (studentId: string, status: "present" | "absent") => {
    const token = localStorage.getItem("token");

    if (!date) {
      alert("Please select a date first.");
      return;
    }

    fetch("/api/attendance/mark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        studentId,
        subjectId: selectedSubject,
        date,
        status,
      }),
    }).then(() => {
      alert("Saved");
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Attendance Management</h2>

      {/* Subject Dropdown */}
      <select
        className="border p-2 rounded mb-4"
        onChange={(e) => loadStudents(e.target.value)}
      >
        <option>Select Subject</option>
        {subjects.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* Date Selector */}
      <input
        type="date"
        className="border p-2 rounded ml-4 mb-4"
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Students */}
      <div>
        {students.length === 0 && (
          <p className="text-gray-500 mt-4">No students found.</p>
        )}

        {students.map((stu) => (
          <div
            key={stu._id}
            className="flex justify-between p-3 bg-gray-100 rounded mb-2"
          >
            <span>{stu.username}</span>

            <div className="space-x-2">
              <button
                onClick={() => mark(stu._id, "present")}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Present
              </button>

              <button
                onClick={() => mark(stu._id, "absent")}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceManagement;
