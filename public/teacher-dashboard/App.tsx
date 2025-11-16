import React, { useState } from 'react';
import Header from './components/Header';
import AttendanceManagement from './components/AttendanceManagement';
import ShareNotifications from './components/ShareNotifications';
import LoginPage from './components/LoginPage';
import { ShareIcon, UserGroupIcon } from './components/icons';

type Tab = 'attendance' | 'notifications';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('attendance');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header onLogout={handleLogout} />
        
        <main className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-wrap space-x-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('attendance')}
                className={`
                  ${activeTab === 'attendance' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  whitespace-nowrap py-3 px-2 border-b-2 font-medium text-xs sm:text-sm flex items-center transition-colors duration-200
                `}
              >
                <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" />
                Attendance Management
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`
                  ${activeTab === 'notifications' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  whitespace-nowrap py-3 px-2 border-b-2 font-medium text-xs sm:text-sm flex items-center transition-colors duration-200
                `}
              >
                 <ShareIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" />
                Share Notifications
              </button>
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'attendance' && <AttendanceManagement />}
            {activeTab === 'notifications' && <ShareNotifications />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;