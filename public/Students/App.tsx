import React, { useState } from "react";
import Header from "./components/Header";
import AttendanceManagement from "./components/AttendanceManagement";
import ShareNotifications from "./components/ShareNotifications";

import StudentProfileModal from "./components/StudentProfileModal"; // YOU must create this (same as your modal)
import LoginPage from "./components/LoginPage";
import { UserPlaceholderIcon, InfoIcon } from "./components/icons";

import type { TeacherProfile } from "./types";

type Tab = "attendance" | "notifications";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("attendance");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ⭐ STUDENT PROFILE MODAL + DATA
  const [isStudentProfileModalOpen, setStudentProfileModalOpen] =
    useState(false);
  const [studentData, setStudentData] = useState(null);

  // When login is done
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Save student profile update
  const saveStudentProfile = (newData) => {
    setStudentData((prev) => ({
      ...prev,
      ...newData,
      firstLogin: false,
    }));
    setStudentProfileModalOpen(false);
  };

  if (!isAuthenticated || !studentData) {
    return (
      <LoginPage
        onLoginSuccess={handleLogin}
        setStudentData={setStudentData}
        openStudentProfileModal={() => setStudentProfileModalOpen(true)}
      />
    );
  }

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

      {/* ⭐ STUDENT MODAL */}
      <StudentProfileModal
        isOpen={isStudentProfileModalOpen}
        onClose={() => setStudentProfileModalOpen(false)}
        profileData={studentData}
        onSave={saveStudentProfile}
      />
    </div>
  );
};

export default App;
