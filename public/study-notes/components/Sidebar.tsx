import React, { useState } from 'react';
import type { Subject, SubjectName } from '../types';
import { SubjectIcon, ChevronDownIcon } from './Icons';

interface SidebarProps {
    subjects: Subject[];
    selectedSubject: SubjectName | 'All Subjects';
    onSelectSubject: (subject: SubjectName | 'All Subjects') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ subjects, selectedSubject, onSelectSubject }) => {
    const totalNotes = subjects.reduce((sum, s) => sum + s.count, 0);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleSubjectSelect = (subject: SubjectName | 'All Subjects') => {
        onSelectSubject(subject);
        setIsCollapsed(true); // Auto-collapse on mobile after selection
    };

    return (
        <aside className="w-full lg:w-64 xl:w-72 bg-white p-6 border-b lg:border-b-0 lg:border-r border-gray-200 flex-shrink-0">
            {/* Mobile-only collapsible header */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full flex justify-between items-center lg:hidden"
                aria-expanded={!isCollapsed}
                aria-controls="subject-filter-list"
            >
                <h2 className="text-lg font-semibold">Filter by Subject</h2>
                <ChevronDownIcon className={`w-6 h-6 transition-transform duration-200 text-gray-500 ${isCollapsed ? '' : 'rotate-180'}`} />
            </button>
            
            {/* Desktop-only static header */}
            <div className="hidden lg:flex justify-between items-center">
                <h2 className="text-lg font-semibold">Filter by Subject</h2>
            </div>
            
            <ul id="subject-filter-list" className={`space-y-2 mt-4 ${isCollapsed ? 'hidden' : 'block'} lg:block`}>
                <li>
                    <button
                        onClick={() => handleSubjectSelect('All Subjects')}
                        className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-left text-sm font-medium transition-colors ${selectedSubject === 'All Subjects' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <span className="flex items-center gap-3 flex-1 min-w-0">
                            <SubjectIcon subject="All Subjects" />
                            <span className="truncate">All Subjects</span>
                        </span>
                        <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">{totalNotes}</span>
                    </button>
                </li>
                {subjects.map(subject => (
                    <li key={subject.name}>
                        <button
                            onClick={() => handleSubjectSelect(subject.name)}
                            className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-left text-sm font-medium transition-colors ${selectedSubject === subject.name ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <span className="flex items-center gap-3 flex-1 min-w-0">
                                <SubjectIcon subject={subject.name} />
                                <span className="truncate">{subject.name}</span>
                            </span>
                            <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">{subject.count}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;