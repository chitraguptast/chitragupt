import React from 'react';
import { UserCircleIcon, HomeIcon, LogoutIcon } from './icons';

interface HeaderProps {
  onLogout: () => void;

  onProfileClick: () => void;
  teacherName: string;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onProfileClick, teacherName  }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="flex items-center space-x-4">
        <button
          onClick={onProfileClick}
          className="bg-blue-600 text-white rounded-full p-2 flex-shrink-0 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          aria-label="Open Profile"
        >
          <UserCircleIcon className="w-10 h-10" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Teacher Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Welcome back, {teacherName}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-4 w-full justify-end md:mt-0 md:w-auto">
        <button
          onClick={() => (window.location.href = "/")}
          className="hidden sm:flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <HomeIcon className="w-5 h-5 text-gray-500" />
          <span>Home</span>
        </button>

        <button
          onClick={onLogout}
          className="flex flex-1 sm:flex-none items-center justify-center space-x-2 bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700 transition-colors"
        >
          <LogoutIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;