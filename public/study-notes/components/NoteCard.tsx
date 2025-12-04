import React from "react";
import type { Note } from "../types";
import { PdfIcon, PreviewIcon, DownloadIcon } from "./Icons";

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-4">
        <div className="bg-red-100 p-4 rounded-full">
          <PdfIcon className="h-8 w-8 text-red-500" />
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 text-center">
        {note.title}
      </h3>
      <p className="text-gray-600 text-sm mt-2 text-center flex-grow">
        {note.description}
      </p>

      <div className="flex justify-center items-center gap-4 text-xs text-gray-500 mt-4 border-t pt-4">
        <span>{note.subject}</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>{note.pages} pages</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>{note.date}</span>
      </div>

      <div className="flex gap-3 mt-6">
        <a
          href={note.fileLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex justify-center items-center gap-2 text-sm font-semibold border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <PreviewIcon className="h-4 w-4" />
          Preview
        </a>

        <a
          href={note.fileLink}
          download={`${note.title}.pdf`}
          className="flex-1 flex justify-center items-center gap-2 text-sm font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <DownloadIcon className="h-4 w-4" />
          Download
        </a>
      </div>
    </div>
  );
};

export default NoteCard;
