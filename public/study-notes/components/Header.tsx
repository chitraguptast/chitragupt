
import React from 'react';
import { SearchIcon, UploadIcon } from './Icons';

interface HeaderProps {
    searchTerm: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onUploadClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, onUploadClick }) => {
    return (
        <header className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Study Notes</h1>
                    <p className="text-gray-500 mt-1">Access PDF notes for all subjects</p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-auto">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchTerm}
                            onChange={onSearchChange}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                        />
                    </div>
                    <button 
                        onClick={onUploadClick}
                        className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                        <UploadIcon className="h-5 w-5" />
                        Upload Notes
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;