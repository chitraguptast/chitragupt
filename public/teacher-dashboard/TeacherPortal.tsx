import React, { useState } from "react";
import Header from "./components/Header";
import AttendanceManagement from "./components/AttendanceManagement";
import ShareNotifications from "./components/ShareNotifications";
import LoginPage from "./components/LoginPage";
import ProfileModal from "./components/ProfileModal";
import { ShareIcon, UserGroupIcon } from "./components/icons";
import type { TeacherProfile } from "./types";

type Tab = "attendance" | "notifications";

const TeacherPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("attendance");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile | null>(
    null
  );

  React.useEffect(() => {
    const saved = localStorage.getItem("teacher");
    if (saved) {
      const parsed = JSON.parse(saved);
      setTeacherProfile(parsed);
      setIsAuthenticated(true);
    }
  }, []);

  const handleTeacherLogin = (teacherData: TeacherProfile) => {
    localStorage.setItem("teacher", JSON.stringify(teacherData));
    setTeacherProfile(teacherData);
    setIsAuthenticated(true);
    if (teacherData.firstLogin) {
      setIsProfileModalOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setTeacherProfile(null);
  };

  const handleSaveProfile = (updatedProfile: TeacherProfile) => {
    setTeacherProfile(updatedProfile);
    setIsProfileModalOpen(false);
  };

  if (!isAuthenticated || !teacherProfile) {
    return <LoginPage onLoginSuccess={handleTeacherLogin} />;
  }

  const getTeacherDisplayName = () =>
    [teacherProfile.prefix, teacherProfile.name || teacherProfile.username]
      .filter(Boolean)
      .join(" ");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header
          onLogout={handleLogout}
          onProfileClick={() => setIsProfileModalOpen(true)}
          teacherName={getTeacherDisplayName()}
        />

        <main className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap space-x-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("attendance")}
                className={`${
                  activeTab === "attendance"
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-gray-500"
                } whitespace-nowrap py-3 px-2 border-b-2 text-sm flex items-center`}
              >
                <UserGroupIcon className="w-5 h-5 mr-1.5" />
                Attendance Management
              </button>

              <button
                onClick={() => setActiveTab("notifications")}
                className={`${
                  activeTab === "notifications"
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-gray-500"
                } whitespace-nowrap py-3 px-2 border-b-2 text-sm flex items-center`}
              >
                <ShareIcon className="w-5 h-5 mr-1.5" />
                Share Notifications
              </button>
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === "attendance" && (
              <AttendanceManagement teacher={teacherProfile} />
            )}

            {activeTab === "notifications" && <ShareNotifications />}
          </div>
        </main>
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={handleSaveProfile}
        profileData={teacherProfile}
      />
    </div>
  );
};

export default TeacherPortal;
