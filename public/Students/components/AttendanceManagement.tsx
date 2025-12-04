import React, { useEffect, useState, useMemo } from "react";
import { UserPlaceholderIcon, InfoIcon } from "./icons";

// ----------------------
// Types
// ----------------------
interface SubjectAttendance {
  subjectName: string;
  attended: number;
  total: number;
  percentage: number;
}

interface TotalAttendance {
  present: number;
  lectures: number;
  percentage: number;
}

interface Student {
  _id: string;
  username: string;
  email: string;
  name: string;
  rollNumber: number;
  division: string;
  phone: string;
  college: string;
}

// ----------------------
// Helpers
// ----------------------

// x >= (target * total – present) / (1 – target)
const calculateLecturesNeeded = (
  attended: number,
  total: number,
  targetPercentage = 75
): number => {
  const target = targetPercentage / 100;
  if (total === 0) return 0;

  const current = attended / total;
  if (current >= target) return 0;

  const x = (target * total - attended) / (1 - target);
  return Math.max(0, Math.ceil(x));
};

// Pie Chart Component
const AttendancePieChart: React.FC<{ percentage: number; size?: number }> = ({
  percentage,
  size = 100,
}) => {
  const isLow = percentage < 75;
  const color = isLow ? "#ef4444" : "#16a34a"; // red / green
  const trackColor = "#f3f4f6";
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="-rotate-90"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={trackColor}
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`text-xl font-bold ${
            isLow ? "text-red-600" : "text-gray-800"
          }`}
        >
          {percentage}%
        </span>
      </div>
    </div>
  );
};

// ----------------------
// Main Component
// ----------------------
const AttendanceManagement: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [totalAttendance, setTotalAttendance] =
    useState<TotalAttendance | null>(null);
  const [subjects, setSubjects] = useState<SubjectAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [absentDates, setAbsentDates] = useState<string[]>([]);


  // Fetch dashboard data
  useEffect(() => {
    const id = localStorage.getItem("studentId");
    console.log("📌 Student ID from localStorage:", id);

    if (!id) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const res = await fetch(`/api/student/dashboard?id=${id}`);
        const data = await res.json();

        console.log("📌 Dashboard Response:", data);
        console.log("📌 Student:", data.student);
        console.log("📌 Total Attendance:", data.totalAttendance);
        console.log("📌 Subjects:", data.subjects);

        setStudent(data.student);
        setTotalAttendance(data.totalAttendance);
        setSubjects(data.subjects);
        setAbsentDates(data.absentDates || []);

      } catch (err) {
        console.error("❌ Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);


  if (loading || !student || !totalAttendance)
    return <p className="text-gray-500 text-center">Loading attendance...</p>;

  const overallLecturesNeeded = calculateLecturesNeeded(
    totalAttendance.present,
    totalAttendance.lectures
  );

  const isOverallLow = totalAttendance.percentage < 75;

  const username = student.email.split("@")[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Profile</h2>
          <p className="text-gray-500 text-sm mt-1">
            Viewing detailed record for {student.name || student.username}
          </p>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
        {/* Top */}
        <div className="p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            {/* Left: Profile */}
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start w-full">
              <div className="flex-shrink-0">
                <div className="w-28 h-28 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 border-4 border-white shadow-sm ring-1 ring-blue-100">
                  <UserPlaceholderIcon className="w-14 h-14" />
                </div>
              </div>

              <div className="text-center md:text-left flex-grow">
                <h3 className="text-2xl font-bold text-gray-900">
                  {student.name || student.username}
                </h3>
                <div className="text-gray-500 font-medium mb-4">
                  @{username}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 text-sm text-gray-600">
                  <div className="flex justify-between sm:justify-start sm:gap-4">
                    <span className="font-semibold text-gray-400 uppercase text-xs tracking-wider">
                      Roll No
                    </span>
                    <span className="text-gray-900">{student.rollNumber}</span>
                  </div>

                  <div className="flex justify-between sm:justify-start sm:gap-4">
                    <span className="font-semibold text-gray-400 uppercase text-xs tracking-wider">
                      Class
                    </span>
                    <span className="text-gray-900">
                      FE - {student.division}
                    </span>
                  </div>

                  <div className="flex justify-between sm:justify-start sm:gap-4">
                    <span className="font-semibold text-gray-400 uppercase text-xs tracking-wider">
                      Phone
                    </span>
                    <span className="text-gray-900">
                      {student.phone || "Not set"}
                    </span>
                  </div>

                  <div className="flex justify-between sm:justify-start sm:gap-4">
                    <span className="font-semibold text-gray-400 uppercase text-xs tracking-wider">
                      Email
                    </span>
                    <span className="text-gray-900">{student.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Pie Chart */}
            <div className="flex flex-col items-center flex-shrink-0 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Total Attendance
              </span>
              <AttendancePieChart
                percentage={totalAttendance.percentage}
                size={100}
              />
              <div className="mt-2 text-xs text-gray-500">
                {totalAttendance.present} / {totalAttendance.lectures} Days
              </div>
            </div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="p-8 bg-gray-50">
          {/* Warning Box */}
          {isOverallLow ? (
            <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-4">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <InfoIcon className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-red-800">
                  Low Attendance Warning
                </h4>
                <p className="text-red-700 mt-1">
                  Attendance is <strong>{totalAttendance.percentage}%</strong>,
                  below the required 75%. Student must attend the next{" "}
                  <strong className="text-white bg-red-600 px-2 py-0.5 rounded text-sm">
                    {overallLecturesNeeded}
                  </strong>{" "}
                  consecutive lectures to recover.
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-5 flex items-start gap-4">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <div className="w-6 h-6 text-green-500 flex items-center justify-center font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-green-800">
                  Good Standing
                </h4>
                <p className="text-green-700 mt-1">
                  Attendance is above the required 75%. Keep it up!
                </p>
              </div>
            </div>
          )}

          {/* Subject Breakdown */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 flex items-center">
              Subject-wise Breakdown
              <span className="ml-4 h-px bg-gray-200 flex-grow"></span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((sub) => {
                const needs = calculateLecturesNeeded(sub.attended, sub.total);
                const isLow = sub.percentage < 75;

                return (
                  <div
                    key={sub.subjectName}
                    className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h5 className="font-semibold text-gray-900">
                        {sub.subjectName}
                      </h5>
                      <span
                        className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                          isLow
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {sub.percentage}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          isLow ? "bg-red-500" : "bg-green-500"
                        }`}
                        style={{ width: `${sub.percentage}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-end text-sm">
                      <div className="text-gray-500">
                        <span className="block text-xs uppercase text-gray-400 font-semibold">
                          Attended
                        </span>
                        <span className="font-medium text-gray-900">
                          {sub.attended}
                        </span>
                        <span className="text-gray-400"> / {sub.total}</span>
                      </div>

                      {isLow && (
                        <div className="text-right">
                          <span className="block text-xs text-red-500 font-semibold uppercase">
                            Needs
                          </span>
                          <span className="font-bold text-red-600">
                            +{needs} classes
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Absent Dates */}
          <div className="mt-10">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
              Absent Dates
              <span className="ml-4 h-px bg-gray-200 flex-grow"></span>
            </h4>

            {absentDates.length === 0 ? (
              <p className="text-gray-500 text-sm">No absent records found.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {absentDates.map((date) => (
                  <div
                    key={date}
                    className="px-3 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm text-center"
                  >
                    {date}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;
