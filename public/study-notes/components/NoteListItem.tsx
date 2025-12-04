import React from "react";
import type { Note } from "../types";
import { PdfIcon, PreviewIcon, DownloadIcon } from "./Icons";

interface NoteListItemProps {
  note: Note;
}

const NoteListItem: React.FC<NoteListItemProps> = ({ note }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className="bg-red-100 p-3 rounded-lg flex-shrink-0">
        <PdfIcon className="h-6 w-6 text-red-500" />
      </div>

      <div className="flex-grow">
        <h3 className="text-md font-bold text-gray-900">{note.title}</h3>
        <p className="text-gray-600 text-sm mt-1 truncate max-w-md">
          {note.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
          <span>{note.subject}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>{note.pages} pages</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>{note.date}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={note.fileLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Preview"
        >
          <PreviewIcon className="h-5 w-5" />
        </a>

        <a
          href={note.fileLink}
          download={`${note.title}.pdf`}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Download"
        >
          <DownloadIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};

export default NoteListItem;
