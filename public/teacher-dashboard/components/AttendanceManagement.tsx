// AttendanceManagement.tsx
import React, { useEffect, useState, useRef } from "react";
import type { TeacherProfile } from "../types";
import {
  CheckIcon,
  CrossIcon,
  InfoIcon,
  UserPlaceholderIcon,
  SaveReportIcon,
} from "./icons";

import Datepicker from "react-tailwindcss-datepicker";




/**
 * This file is identical in UI/behavior to your previous file, with one focused fix:
 * - all uses of the incoming `teacher` prop are replaced with a stable `teacherData`
 *   produced by useMemo(..., [teacher]) so runtime/closure issues and inconsistent
 *   values (teacher vs teacherData) are gone.
 *
 * No UI changes, no extra logging, no other dependencies changed.
 */

type StudentItem = {
  _id: string;
  name?: string;
  email?: string;
  username: string;
  rollNumber?: number;
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

type Props = {
  teacher: TeacherProfile;
};


const GlassModal: React.FC<{
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  children?: React.ReactNode;
  showActions?: boolean;
}> = ({
  isOpen,
  title,
  onClose,
  onConfirm,
  confirmLabel = "Confirm",
  children,
  showActions = true,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={ref}
        className="relative w-full max-w-lg mx-auto rounded-2xl p-6 border border-white/20 shadow-lg"
        style={{
          background:
            "linear-gradient(180deg, rgba(235,245,255,0.65) 0%, rgba(220,235,255,0.30) 100%)",
          backdropFilter: "blur(8px) saturate(120%)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 p-1 rounded"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-700">{children}</div>

        {showActions && (
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-white/60 hover:bg-white text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm"
            >
              {confirmLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const AttendanceManagement: React.FC<Props> = ({ teacher }) => {
  // stable teacherData — depends on `teacher` so it updates when prop changes,
  // but avoids accidental closure/old-value bugs when used inside effects/callbacks.
  const teacherData = React.useMemo(() => teacher, [teacher]);

  const [divisions, setDivisions] = useState<string[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string>("");

  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  // Sync Flowbite datepicker → React state
  

  const [lecture, setLecture] = useState<number>(1);
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [saving, setSaving] = useState(false);

  const [rollInput, setRollInput] = useState("");

  const handleRollInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;

    // keep only digits, commas, spaces
    v = v.replace(/[^0-9,\s]/g, "");

    // Detect: user typed space after a number token (e.g. "4 ")
    if (v.match(/(^|\s|,)\d+\s$/)) {
      // replace the last "number+space" with "number, "
      v = v.replace(/(\d+)\s$/, "$1, ");
    }

    setRollInput(v);
  };

  const parseRolls = () => {
    return rollInput
      .split(",")
      .map((x) => Number(x.trim()))
      .filter((x) => !isNaN(x) && x > 0);
  };

  const massMarkByRoll = (status: "present" | "absent") => {
    const rolls = parseRolls();
    if (rolls.length === 0) return alert("Enter valid roll numbers");

    setStudents((prev) =>
      prev.map((s) =>
        rolls.includes(Number(s.rollNumber)) ? { ...s, status } : s
      )
    );
  };

  const ModernDropdown = ({
    label,
    value,
    options,
    onChange,
    width = "w-40",
  }: {
    label: string;
    value: string | number;
    options: (string | number)[];
    onChange: (v: any) => void;
    width?: string;
  }) => {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handle = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handle);
      return () => document.removeEventListener("mousedown", handle);
    }, []);

    return (
      <div className="flex flex-col" ref={ref}>
        <label className="text-sm text-gray-600 mb-1">{label}</label>

        <div
          className={`relative ${width} bg-white border border-gray-300 rounded-md shadow-sm 
          py-2 px-3 cursor-pointer flex items-center justify-between 
          focus-within:ring-2 focus-within:ring-blue-500 transition-all`}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="text-gray-900">{value}</span>

          <svg
            className={`w-4 h-4 text-gray-600 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>

          {open && (
            <div
              className="absolute z-20 mt-1 left-0 right-0 bg-white border border-gray-300 
            rounded-md shadow-lg max-h-48 overflow-auto"
            >
              {options.map((opt) => (
                <div
                  key={String(opt)}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const ModernDatePicker = ({
    label,
    value,
    onChange,
    width = "w-40",
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    width?: string;
  }) => {
    return (
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">{label}</label>

        <div
          className={`relative ${width} bg-white border border-gray-300 rounded-md shadow-sm 
        flex items-center px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all`}
        >
          <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 text-gray-900 cursor-pointer"
          />

          <svg
            className="w-5 h-5 text-gray-500 absolute right-3 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-8H3v8a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    );
  };

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const indeterminateRef = useRef<HTMLInputElement>(null);

  const [isHoliday, setIsHoliday] = useState<boolean>(false);
  const [holidayInfo, setHolidayInfo] = useState<any>(null);
  const [markedSubject, setMarkedSubject] = useState<string | null>(null);

  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [duplicateLecture, setDuplicateLecture] = useState<number>(1);
  const viewStudent = (studentId: string) => {
    window.location.href = `/students-dashboard/index.html?studentId=${studentId}`;
  };

  const [holidayModalOpen, setHolidayModalOpen] = useState(false);
  const [holidayPin, setHolidayPin] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [summaryTotalLectures, setSummaryTotalLectures] = useState<number>(0);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, number>>(
    {}
  );

  // init divisions from teacherData
  useEffect(() => {
    if (!teacherData) return;
    const divs = Array.isArray(teacherData.divisions)
      ? teacherData.divisions
      : [];
    setDivisions(divs);
    if (divs.length > 0) setSelectedDivision(divs[0]);
  }, [teacherData]);

  // load students when division/date/lecture change
  useEffect(() => {
    if (!selectedDivision) return;
    loadStudents(selectedDivision);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDivision, date, lecture]);

  // --- API calls ---

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
        attendancePercentage: 0,
        status: "absent",
      }));
      list.sort((a, b) => (a.rollNumber || 0) - (b.rollNumber || 0));
      setStudents(list);
      setSelectedIds([]);

      // fetch attendance + summary after students load
      await Promise.all([
        fetchAttendance(division, date, lecture),
        fetchSummary(division, teacherData?.subjectCode || ""),
      ]);
    } catch (err) {
      console.error("Failed to load students.", err);
      alert("Failed to load students.");
    } finally {
      setLoadingStudents(false);
    }
  };

  const fetchAttendance = async (
    divisionParam: string,
    dateStr: string,
    lectureNum: number
  ) => {
    setLoadingAttendance(true);
    setIsHoliday(false);
    setHolidayInfo(null);

    // reset statuses
    setStudents((prev) => prev.map((s) => ({ ...s, status: "absent" })));

    try {
      const res = await fetch(
        `/api/attendance/fetch?division=${encodeURIComponent(
          divisionParam
        )}&date=${encodeURIComponent(dateStr)}&lecture=${encodeURIComponent(
          String(lectureNum)
        )}&subjectCode=${encodeURIComponent(teacherData?.subjectCode || "")}`
      );

      if (!res.ok) {
        console.warn("fetchAttendance non-ok response");
        setLoadingAttendance(false);
        return;
      }

      const data = await res.json();

      if (data.holiday) {
        setIsHoliday(true);
        setHolidayInfo(data.holidayInfo || null);
        setLoadingAttendance(false);
        return;
      }

      const attendance: AttendanceRecord | null = data.attendance || null;
      if (!attendance) {
        setMarkedSubject(null);
        setLoadingAttendance(false);
        return;
      }
      setMarkedSubject(data.subjectName || null);

      const statusMap = new Map<string, "present" | "absent">();
      attendance.students.forEach((st) =>
        statusMap.set(String(st.studentId), st.status)
      );

      setStudents((prev) =>
        prev.map((s) => ({ ...s, status: statusMap.get(s._id) || "absent" }))
      );
    } catch (err) {
      console.error("Failed to load attendance.", err);
      alert("Failed to load attendance.");
    } finally {
      setLoadingAttendance(false);
    }
  };

  const fetchSummary = async (divisionParam: string, subjectCode: string) => {
    try {
      const token = localStorage.getItem("token");
      const url = `/api/attendance/summary?division=${encodeURIComponent(
        divisionParam
      )}&subjectCode=${encodeURIComponent(subjectCode)}`;
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) {
        setSummaryTotalLectures(0);
        setAttendanceMap({});
        return;
      }
      const data = await res.json();
      if (!data.success) {
        setSummaryTotalLectures(0);
        setAttendanceMap({});
        return;
      }
      const total = Number(data.totalLectures || 0);
      const map: Record<string, number> = {};
      (data.students || []).forEach((rec: any) => {
        map[String(rec.studentId)] = Number(rec.attended || 0);
      });
      setSummaryTotalLectures(total);
      setAttendanceMap(map);

      setStudents((prev) =>
        prev.map((s) => {
          const attended = map[s._id] || 0;
          const pct = total > 0 ? Math.round((attended / total) * 100) : 0;
          return { ...s, attendancePercentage: pct };
        })
      );
    } catch (err) {
      console.error("Failed to fetch summary:", err);
      setSummaryTotalLectures(0);
      setAttendanceMap({});
    }
  };

  const handleDuplicate = async () => {
    try {
      const res = await fetch(
        `/api/attendance/fetch-lecture?division=${encodeURIComponent(
          selectedDivision
        )}&date=${encodeURIComponent(date)}&lecture=${encodeURIComponent(
          duplicateLecture
        )}`
      );

      const data = await res.json();

      if (!data.success || !data.attendance) {
        alert("No attendance found for that lecture.");
        return;
      }

      const statusMap = new Map<string, "present" | "absent">();
      data.attendance.students.forEach((st) =>
        statusMap.set(String(st.studentId), st.status)
      );

      setStudents((prev) =>
        prev.map((s) => ({
          ...s,
          status: statusMap.get(s._id) || "absent",
        }))
      );

      alert(`Attendance copied from lecture ${duplicateLecture}`);
      setDuplicateModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to duplicate attendance.");
    }
  };

  const handleSave = async () => {
    if (!teacherData?.id) {
      alert("Teacher ID missing. Re-login.");
      return;
    }

    if (isHoliday) {
      alert("This date is marked as holiday. Save blocked.");
      return;
    }

    const payload = {
      teacherId: teacherData.id,
      division: selectedDivision,
      date,
      lectureNumber: lecture,
      subjectCode: teacherData.subjectCode,
      subjectName: teacherData.subjectName || "",
      students: students.map((s) => ({ studentId: s._id, status: s.status })),
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
      await Promise.all([
        fetchAttendance(selectedDivision, date, lecture),
        fetchSummary(selectedDivision, teacherData?.subjectCode || ""),
      ]);
    } catch (err) {
      console.error("Save error:", err);
      alert("Server error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLecture = async () => {
    if (!teacherData?.id) {
      alert("Teacher ID missing. Re-login.");
      setDeleteModalOpen(false);
      return;
    }

    if (isHoliday) {
      alert("Cannot delete: date is marked as holiday.");
      setDeleteModalOpen(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/attendance/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          division: selectedDivision,
          date,
          lectureNumber: lecture,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.message || "Failed to delete attendance");
        return;
      }

      alert("Attendance deleted for this lecture.");
      await Promise.all([
        fetchAttendance(selectedDivision, date, lecture),
        fetchSummary(selectedDivision, teacherData?.subjectCode || ""),
      ]);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Server error");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const handleHolidayAction = async (action: "mark" | "unmark") => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/attendance/mark-holiday", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          date,
          teacherId: teacherData.id,
          pin: holidayPin.trim(),
          action,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed");
        return;
      }

      alert(data.message);

      if (action === "mark") {
        setIsHoliday(true);
        setStudents((prev) => prev.map((s) => ({ ...s, status: "absent" })));
      } else {
        setIsHoliday(false);
        fetchAttendance(selectedDivision, date, lecture);
      }

      setHolidayModalOpen(false);
      setHolidayPin("");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

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

  const massMark = (status: "present" | "absent") => {
    setStudents((prev) =>
      prev.map((s) => (selectedIds.includes(s._id) ? { ...s, status } : s))
    );
  };

  const renderAttendanceCell = (s: StudentItem) => {
    const total = summaryTotalLectures;
    const attended = attendanceMap[s._id] || 0;
    const pct = total > 0 ? Math.round((attended / total) * 100) : 0;
    return (
      <div className="text-sm">
        <div className="font-semibold text-gray-900">{pct}%</div>
        <div className="text-xs text-gray-400 mt-1">
          {attended} / {total}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
      {/* top header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Attendance Management
        </h2>

        <div className="flex flex-wrap gap-4">
          {/* Division */}
          <ModernDropdown
            label="Division"
            value={selectedDivision}
            options={divisions}
            onChange={(v) => setSelectedDivision(v)}
            width="w-40"
          />

          <div className="flex flex-col w-52">
            <label className="text-sm text-gray-600 mb-1">Date</label>

            <div className="datepicker-container relative w-52 mb-10">
              <Datepicker
                value={{ startDate: date, endDate: date }}
                onChange={(v) => {
                  if (!v?.startDate) return;

                  const d = new Date(v.startDate);
                  const iso = d.toISOString().slice(0, 10); // YYYY-MM-DD

                  setDate(iso);
                }}
                primaryColor="blue"
                displayFormat="DD/MM/YYYY"
                asSingle={true}
                useRange={false}
                popoverDirection="down"
                inputClassName="w-full bg-white border border-gray-300 text-gray-900 px-3 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Lecture */}
          <ModernDropdown
            label="Lecture"
            value={lecture}
            options={[1, 2, 3, 4, 5, 6]}
            onChange={(v) => setLecture(Number(v))}
            width="w-28"
          />
        </div>
      </div>

      {isHoliday && (
        <div className="mb-4 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <InfoIcon className="w-5 h-5 text-blue-700" />
            <div>
              <div className="font-medium">This date is marked as Holiday</div>
              <div className="text-sm text-blue-700">
                Attendance is blocked and all records for this day were cleared.
              </div>
            </div>
          </div>
          <div className="text-sm text-blue-700">
            Only PIN holders can unmark
          </div>
        </div>
      )}
      {!isHoliday && markedSubject && (
        <div className="mb-4 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 flex items-center gap-3">
          <InfoIcon className="w-5 h-5 text-green-700" />
          <div>
            <div className="font-medium">Attendance already marked</div>
            <div className="text-sm text-green-700">
              This lecture was marked for: <strong>{markedSubject}</strong>
            </div>
          </div>
        </div>
      )}

      {!isHoliday && !markedSubject && (
        <div className="mb-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 flex items-center gap-3">
          <InfoIcon className="w-5 h-5 text-yellow-700" />
          <div>
            <div className="font-medium">Attendance not marked</div>
            <div className="text-sm text-yellow-700">
              This lecture has not been marked yet.
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={() => setDuplicateModalOpen(true)}
          className="px-3 py-2 rounded-md bg-purple-600 text-white text-sm hover:bg-purple-700"
        >
          Duplicate Attendance from Another Lecture
        </button>
      </div>

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
          disabled={selectedIds.length === 0 || isHoliday}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm disabled:bg-gray-300"
          title={isHoliday ? "Cannot mark: date is holiday" : ""}
        >
          <CheckIcon className="w-5 h-5" /> Mark Present
        </button>

        <button
          onClick={() => massMark("absent")}
          disabled={selectedIds.length === 0 || isHoliday}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm disabled:bg-gray-300"
        >
          <CrossIcon className="w-5 h-5" /> Mark Absent
        </button>

        <button
          onClick={handleSave}
          disabled={saving || isHoliday}
          className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          title={isHoliday ? "Cannot save: date is holiday" : ""}
        >
          <SaveReportIcon className="w-5 h-5" />
          {saving ? "Saving..." : "Save Attendance"}
        </button>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={() => setHolidayModalOpen(true)}
          className="px-3 py-2 rounded-md border border-gray-200 bg-white text-sm hover:shadow"
        >
          Mark Day as Holiday
        </button>

        <button
          onClick={() => setDeleteModalOpen(true)}
          disabled={isHoliday}
          className="px-3 py-2 rounded-md border border-gray-200 bg-white text-sm hover:shadow disabled:opacity-60"
        >
          Delete attendance for this lecture
        </button>
      </div>

      {/* Total Present / Total Students */}
      <div className="mb-4 p-3 rounded-lg bg-gray-100 border text-gray-800 font-medium">
        Total Present: {students.filter((s) => s.status === "present").length} /{" "}
        {students.length}
      </div>

      {/* Roll Number Quick Marking */}
      <div className="mb-4 p-3 rounded-lg bg-gray-50 border text-gray-800">
        <label className="block text-sm text-gray-600 mb-1">
          Mark by Roll Numbers
        </label>

        <input
          value={rollInput}
          onChange={handleRollInputChange}
          placeholder="Type: 1⎵ 4⎵ 7⎵ → becomes 1, 4, 7,"
          className="w-full border px-3 py-2 rounded mb-2"
        />

        <div className="flex gap-2">
          <button
            onClick={() => massMarkByRoll("present")}
            disabled={isHoliday}
            className="px-3 py-2 rounded bg-green-500 text-white text-sm"
          >
            Mark Present
          </button>

          <button
            onClick={() => massMarkByRoll("absent")}
            disabled={isHoliday}
            className="px-3 py-2 rounded bg-red-500 text-white text-sm"
          >
            Mark Absent
          </button>
        </div>
      </div>

      {loadingStudents || loadingAttendance ? (
        <p className="text-gray-500">Loading...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-500">No students found.</p>
      ) : (
        <>
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
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                  <th className="px-4 py-3 text-center">View</th>
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

                    <td className="px-4 py-3">{s.rollNumber ?? "-"}</td>

                    <td className="px-4 py-3">{renderAttendanceCell(s)}</td>

                    <td className="px-4 py-3">
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

                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            setStudents((prev) =>
                              prev.map((x) =>
                                x._id === s._id
                                  ? { ...x, status: "present" }
                                  : x
                              )
                            )
                          }
                          className="px-2 py-1 rounded bg-green-50 text-green-700 text-xs"
                          aria-label={`Mark ${s.name} present`}
                          disabled={isHoliday}
                        >
                          Present
                        </button>
                        <button
                          onClick={() =>
                            setStudents((prev) =>
                              prev.map((x) =>
                                x._id === s._id ? { ...x, status: "absent" } : x
                              )
                            )
                          }
                          className="px-2 py-1 rounded bg-red-50 text-red-700 text-xs"
                          aria-label={`Mark ${s.name} absent`}
                          disabled={isHoliday}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => viewStudent(s._id)}
                        className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-xs hover:bg-blue-200"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-3">
            <div className="space-y-2 mb-4">
              <button
                onClick={() => massMark("present")}
                disabled={selectedIds.length === 0 || isHoliday}
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm disabled:bg-gray-300"
              >
                <CheckIcon className="w-5 h-5" /> Mark Selected Present
              </button>

              <button
                onClick={() => massMark("absent")}
                disabled={selectedIds.length === 0 || isHoliday}
                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm disabled:bg-gray-300"
              >
                <CrossIcon className="w-5 h-5" /> Mark Selected Absent
              </button>

              <button
                onClick={handleSave}
                disabled={saving || isHoliday}
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
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {s.name || s.username}
                      </p>
                      <p className="text-sm text-gray-500">{s.email}</p>
                      <span
                        className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          s.status === "present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {s.status}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {s.attendancePercentage}%
                      </div>
                      <div className="text-xs text-gray-400">
                        {attendanceMap[s._id] || 0} / {summaryTotalLectures}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    Roll No: {s.rollNumber ?? "-"}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() =>
                        setStudents((prev) =>
                          prev.map((x) =>
                            x._id === s._id ? { ...x, status: "present" } : x
                          )
                        )
                      }
                      disabled={isHoliday}
                      className="px-3 py-1 rounded bg-green-50 text-green-700 text-sm"
                    >
                      Present
                    </button>

                    <button
                      onClick={() =>
                        setStudents((prev) =>
                          prev.map((x) =>
                            x._id === s._id ? { ...x, status: "absent" } : x
                          )
                        )
                      }
                      disabled={isHoliday}
                      className="px-3 py-1 rounded bg-red-50 text-red-700 text-sm"
                    >
                      Absent
                    </button>
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => viewStudent(s._id)}
                      className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-sm w-full"
                    >
                      View Student
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <GlassModal
        isOpen={holidayModalOpen}
        title="Manage Holiday"
        onClose={() => setHolidayModalOpen(false)}
        onConfirm={async () => {
          if (!holidayPin.trim()) {
            alert("Enter PIN");
            return;
          }
          await handleHolidayAction(isHoliday ? "unmark" : "mark");
        }}
        confirmLabel={isHoliday ? "Unmark Holiday" : "Mark as Holiday"}
      >
        <div className="space-y-3">
          <p>
            {isHoliday
              ? `This day is currently marked as holiday. Enter PIN to unmark it.`
              : `Enter PIN to mark ${date} as holiday. This will CLEAR all attendance for this date.`}
          </p>

          <div>
            <label className="block text-sm text-gray-600 mb-1">PIN</label>
            <input
              type="password"
              value={holidayPin}
              onChange={(e) => setHolidayPin(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
        </div>
      </GlassModal>

      <GlassModal
        isOpen={deleteModalOpen}
        title="Delete attendance for this lecture"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteLecture}
        confirmLabel="Delete"
      >
        <p>
          Are you sure you want to delete attendance for <strong>{date}</strong>{" "}
          lecture <strong>{lecture}</strong> (division:{" "}
          <strong>{selectedDivision}</strong>)? This cannot be undone.
        </p>
      </GlassModal>

      <GlassModal
        isOpen={duplicateModalOpen}
        title="Duplicate Attendance"
        onClose={() => setDuplicateModalOpen(false)}
        onConfirm={handleDuplicate}
        confirmLabel="Duplicate"
      >
        <p className="mb-3">
          Choose which lecture's attendance you want to copy into
          <strong> lecture {lecture}</strong>.
        </p>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Lecture Number
          </label>
          <select
            value={duplicateLecture}
            onChange={(e) => setDuplicateLecture(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded-md"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </GlassModal>
    </div>
  );
};

export default AttendanceManagement;
