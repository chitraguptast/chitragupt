import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AttendanceManagement from "./components/AttendanceManagement";
import ShareNotifications from "./components/ShareNotifications";

import StudentProfileModal from "./components/StudentProfileModal";
import LoginPage from "./components/LoginPage";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("attendance");

  // NEW STATES
  const [studentData, setStudentData] = useState(null);
  const [loadingTeacherView, setLoadingTeacherView] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isStudentProfileModalOpen, setStudentProfileModalOpen] =
    useState(false);

  // 1️⃣ CHECK URL FOR ?studentId (teacher view mode)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromURL = params.get("studentId");

    if (!idFromURL) {
      // Not teacher view → load student login flow
      setLoadingTeacherView(false);
      return;
    }

    // Teacher view mode
    localStorage.setItem("studentId", idFromURL);

    // DIRECTLY FETCH student profile WITHOUT LOGIN
    fetch(`/api/student/dashboard?id=${idFromURL}`)
      .then((res) => res.json())
      .then((data) => {
        setStudentData(data.student);
        setIsAuthenticated(true); // FORCE authenticated
      })
      .catch((err) => console.error("Teacher view error:", err))
      .finally(() => setLoadingTeacherView(false));
  }, []);

  // 2️⃣ If teacher view is loading → show loader
  if (loadingTeacherView) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // 3️⃣ If no studentId in URL → fall back to student login mode
  if (!isAuthenticated || !studentData) {
    return (
      <LoginPage
        onLoginSuccess={() => setIsAuthenticated(true)}
        setStudentData={setStudentData}
        openStudentProfileModal={() => setStudentProfileModalOpen(true)}
      />
    );
  }

  // 4️⃣ Normal dashboard rendering
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header
          onLogout={() => setIsAuthenticated(false)}
          onProfileClick={() => setStudentProfileModalOpen(true)}
          studentName={studentData?.name || studentData?.username}
        />

        <main className="mt-8">
          {activeTab === "attendance" && <AttendanceManagement />}
          {activeTab === "notifications" && <ShareNotifications />}
        </main>
      </div>

      <StudentProfileModal
        isOpen={isStudentProfileModalOpen}
        onClose={() => setStudentProfileModalOpen(false)}
        profileData={studentData}
        onSave={(newData) => {
          setStudentData((prev) => ({ ...prev, ...newData }));
          setStudentProfileModalOpen(false);
        }}
      />
    </div>
  );
};

export default App;
