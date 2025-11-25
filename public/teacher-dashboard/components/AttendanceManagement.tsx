import React, { useEffect, useState, useRef } from "react";
import {
  CheckIcon,
  CrossIcon,
  InfoIcon,
  UserPlaceholderIcon,
  SaveReportIcon,
} from "./icons";

type StudentItem = {
  _id: string;
  name?: string;
  email?: string;
  username: string;
  rollNumber?: number;
  totalPresent?: number;
  totalLectures?: number;
  attendancePercentage?: number;
  status?: "present" | "absent";
};

type AttendanceRecord = {
  _id?: string;
  teacherId: string;
  division: string;
  date: string;
  lectureNumber: number;
  students: { studentId: string; status: "present" | "absent" }[];
};

const AttendanceManagement: React.FC<{ teacher: any }> = ({ teacher }) => {
  const [divisions, setDivisions] = useState<string[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string>("");

  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  const [lecture, setLecture] = useState<number>(1);
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [saving, setSaving] = useState(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const indeterminateRef = useRef<HTMLInputElement>(null);

  // INIT DIVISIONS
  useEffect(() => {
    if (!teacher) return;

    const divs = Array.isArray(teacher.divisions) ? teacher.divisions : [];
    setDivisions(divs);

    if (divs.length > 0) setSelectedDivision(divs[0]);
  }, [teacher]);

  // LOAD STUDENTS
  useEffect(() => {
    if (!selectedDivision) return;
    loadStudents(selectedDivision);
  }, [selectedDivision, date, lecture]);

  const loadStudents = async (division: string) => {
    setLoadingStudents(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `/api/attendance/students?division=${encodeURIComponent(division)}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );

      if (!res.ok) throw new Error("Failed to load students");

      const data = await res.json();

      const list: StudentItem[] = (data.students || []).map((s: any) => ({
        _id: s._id,
        name: s.name || "",
        email: s.email || "",
        username: s.username,
        rollNumber: s.rollNumber || 0,
        totalPresent: s.totalPresent || 0,
        totalLectures: s.totalLectures || 0,
        attendancePercentage:
          s.totalLectures > 0
            ? Math.round((s.totalPresent / s.totalLectures) * 100)
            : 0,
        status: "absent",
      }));

      list.sort((a, b) => (a.rollNumber || 0) - (b.rollNumber || 0));

      setStudents(list);
      setSelectedIds([]);

      // fetch attendance AFTER loading students
      fetchAttendance(division, date, lecture);
    } catch (err) {
      console.error(err);
      alert("Failed to load students.");
    } finally {
      setLoadingStudents(false);
    }
  };

  // FETCH ATTENDANCE
  const fetchAttendance = async (
    division: string,
    dateStr: string,
    lectureNum: number
  ) => {
    setLoadingAttendance(true);

    // reset to absent
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        status: "absent",
      }))
    );

    try {
      const res = await fetch(
        `/api/attendance/fetch?division=${encodeURIComponent(
          division
        )}&date=${encodeURIComponent(dateStr)}&lecture=${encodeURIComponent(
          String(lectureNum)
        )}&subjectCode=${encodeURIComponent(teacher.subjectCode)}`
      );

      if (!res.ok) {
        setLoadingAttendance(false);
        return;
      }

      const data = await res.json();
      if (!data.attendance) {
        setLoadingAttendance(false);
        return;
      }

      const attendance: AttendanceRecord = data.attendance;
      const statusMap = new Map();

      attendance.students.forEach((st) =>
        statusMap.set(String(st.studentId), st.status)
      );

      setStudents((prev) =>
        prev.map((s) => ({
          ...s,
          status: statusMap.get(s._id) || "absent",
        }))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to load attendance.");
    } finally {
      setLoadingAttendance(false);
    }
  };

  // SELECT / UNSELECT
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = (checked: boolean) => {
    if (checked) setSelectedIds(students.map((s) => s._id));
    else setSelectedIds([]);
  };

  useEffect(() => {
    const box = indeterminateRef.current;
    if (box) {
      box.indeterminate =
        selectedIds.length > 0 && selectedIds.length < students.length;
    }
  }, [selectedIds, students]);

  // MASS MARK
  const massMark = (status: "present" | "absent") => {
    setStudents((prev) =>
      prev.map((s) => (selectedIds.includes(s._id) ? { ...s, status } : s))
    );
  };

  // SAVE ATTENDANCE
  const handleSave = async () => {
    if (!teacher?.id) {
      alert("Teacher ID missing. Re-login.");
      return;
    }

    const payload = {
      teacherId: teacher.id,
      division: selectedDivision,
      date,
      lectureNumber: lecture,
      subjectCode: teacher.subjectCode,
      subjectName: teacher.subjectName,
      students: students.map((s) => ({
        studentId: s._id,
        status: s.status,
      })),
    };

    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/attendance/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to save attendance");
        return;
      }

      alert("Attendance saved.");
      fetchAttendance(selectedDivision, date, lecture);
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setSaving(false);
    }
  };

  // UI
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
      {/* Title + Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Attendance Management
        </h2>

        <div className="flex flex-wrap gap-4">
          {/* Division */}
          <div>
            <label className="text-sm text-gray-600">Division</label>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="border px-3 py-2 rounded w-40"
            >
              {divisions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-sm text-gray-600">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border px-3 py-2 rounded"
            />
          </div>

          {/* Lecture */}
          <div>
            <label className="text-sm text-gray-600">Lecture</label>
            <select
              value={lecture}
              onChange={(e) => setLecture(Number(e.target.value))}
              className="border px-3 py-2 rounded w-28"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mass Actions */}
      <div className="hidden md:flex p-4 border rounded-lg bg-gray-50 flex-wrap gap-3 items-center mb-6">
        {selectedIds.length > 0 ? (
          <div className="flex items-center space-x-2 text-blue-800 bg-blue-100 px-3 py-1.5 rounded-md">
            <InfoIcon className="w-5 h-5" />
            <span className="text-sm font-medium">
              {selectedIds.length} selected
            </span>
          </div>
        ) : (
          <div className="flex items-center text-gray-500 space-x-2">
            <InfoIcon className="w-5 h-5" />
            <span className="text-sm">
              Select students to update attendance.
            </span>
          </div>
        )}

        <button
          onClick={() => massMark("present")}
          disabled={selectedIds.length === 0}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm disabled:bg-gray-300"
        >
          <CheckIcon className="w-5 h-5" /> Mark Present
        </button>

        <button
          onClick={() => massMark("absent")}
          disabled={selectedIds.length === 0}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm disabled:bg-gray-300"
        >
          <CrossIcon className="w-5 h-5" /> Mark Absent
        </button>

        <button
          onClick={handleSave}
          disabled={saving}
          className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          <SaveReportIcon className="w-5 h-5" />
          {saving ? "Saving..." : "Save Attendance"}
        </button>
      </div>

      {/* Students List */}
      {loadingStudents || loadingAttendance ? (
        <p className="text-gray-500">Loading...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-500">No students found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-center w-12">
                    <input
                      type="checkbox"
                      ref={indeterminateRef}
                      checked={
                        selectedIds.length === students.length &&
                        students.length > 0
                      }
                      onChange={(e) => selectAll(e.target.checked)}
                      className="h-4 w-4"
                    />
                  </th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Roll No.</th>
                  <th className="px-4 py-3">Attendance</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr
                    key={s._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(s._id)}
                        onChange={() => toggleSelect(s._id)}
                        className="h-4 w-4"
                      />
                    </td>

                    <td className="px-4 py-3 flex items-center gap-3">
                      <UserPlaceholderIcon className="w-8 h-8 text-gray-500" />
                      <div>
                        <p className="font-medium">{s.name || s.username}</p>
                        <p className="text-gray-500 text-sm">
                          {s.email || "No email"}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-3">{s.rollNumber || "-"}</td>

                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">
                        {s.attendancePercentage}%
                      </p>
                      <p className="text-sm text-gray-500">
                        {s.totalPresent}/{s.totalLectures} classes attended
                      </p>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          s.status === "present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-3">
            <div className="space-y-2 mb-4">
              <button
                onClick={() => massMark("present")}
                disabled={selectedIds.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm disabled:bg-gray-300"
              >
                <CheckIcon className="w-5 h-5" /> Mark Selected Present
              </button>

              <button
                onClick={() => massMark("absent")}
                disabled={selectedIds.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm disabled:bg-gray-300"
              >
                <CrossIcon className="w-5 h-5" /> Mark Selected Absent
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                <SaveReportIcon className="w-5 h-5" />
                {saving ? "Saving..." : "Save Attendance"}
              </button>
            </div>

            {students.map((s) => (
              <div
                key={s._id}
                className={`p-4 border rounded-lg flex gap-3 items-start transition ${
                  selectedIds.includes(s._id)
                    ? "bg-blue-50 border-blue-400"
                    : "bg-white border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(s._id)}
                  onChange={() => toggleSelect(s._id)}
                  className="mt-1 h-5 w-5"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {s.name || s.username}
                      </p>
                      <p className="text-sm text-gray-500">{s.email}</p>
                    </div>

                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        s.status === "present"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    Roll No: {s.rollNumber || "-"}
                  </p>

                  <div className="mt-2">
                    <p className="font-semibold text-gray-800">
                      {s.attendancePercentage}%
                    </p>
                    <p className="text-xs text-gray-500">
                      {s.totalPresent}/{s.totalLectures} days
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceManagement;
