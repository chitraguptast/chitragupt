import React, { useState, useMemo, useEffect } from "react";
import type { Note, SubjectName } from "./types";
import { ALL_SUBJECTS } from "./types";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NotesView from "./components/NotesView";
import UploadModal from "./components/UploadModal";
import { useSearchParams } from "react-router-dom";

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<
    SubjectName | "All Subjects"
  >("All Subjects");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [searchParams] = useSearchParams();

  // AUTO-OPEN MODAL ON PAGE LOAD IF PARAM PRESENT
  useEffect(() => {
    if (searchParams.get("openUpload") === "true") {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  // ================================
  // LOAD NOTES FROM BACKEND
  // ================================
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const res = await fetch("/api/notes/list");
        const data = await res.json();

        if (Array.isArray(data)) {
          setNotes(data);
        }
      } catch (err) {
        console.error("Failed to load notes", err);
      }
    };

    loadNotes();
  }, []);

  // ================================
  // ADD NOTE (after upload)
  // ================================
  const handleAddNote = (note: Note) => {
    setNotes((prev) => [note, ...prev]);
  };

  // ================================
  // DELETE NOTE
  // ================================
  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  // ================================
  // SUBJECT COUNTS
  // ================================
  const subjects = useMemo(() => {
    const counts: Record<SubjectName, number> = {} as any;

    ALL_SUBJECTS.forEach((sub) => (counts[sub] = 0));
    notes.forEach((note) => counts[note.subject]++);

    return ALL_SUBJECTS.map((name) => ({ name, count: counts[name] }));
  }, [notes]);

  // ================================
  // FILTER + SEARCH NOTES
  // ================================
  const filteredNotes = useMemo(() => {
    return notes
      .filter(
        (note) =>
          selectedSubject === "All Subjects" || note.subject === selectedSubject
      )
      .filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [notes, selectedSubject, searchTerm]);

  // ================================
  // RENDER UI
  // ================================
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 text-gray-800">
      <Sidebar
        subjects={subjects}
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Header
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onUploadClick={() => setIsModalOpen(true)}
        />

        <NotesView
          notes={filteredNotes}
          viewMode={viewMode}
          onViewChange={setViewMode}
        />
      </main>

      {isModalOpen && (
        <UploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddNote={handleAddNote}
          notes={notes}
          onDeleteNote={handleDeleteNote}
        />
      )}
    </div>
  );
};

export default App;
