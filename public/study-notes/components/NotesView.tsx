import React from "react";
import type { Note } from "../types";
import NoteCard from "./NoteCard";
import NoteListItem from "./NoteListItem";
import { GridIcon, ListIcon } from "./Icons";

interface NotesViewProps {
  notes: Note[];
  viewMode: "grid" | "list";
  onViewChange: (mode: "grid" | "list") => void;
}

const NotesView: React.FC<NotesViewProps> = ({
  notes,
  viewMode,
  onViewChange,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">{notes.length} notes found</p>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => onViewChange("grid")}
            className={`p-2 rounded-md ${
              viewMode === "grid"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            aria-label="Grid View"
          >
            <GridIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={`p-2 rounded-md ${
              viewMode === "list"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            aria-label="List View"
          >
            <ListIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteListItem key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesView;
