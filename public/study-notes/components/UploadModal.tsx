import React, { useState, FormEvent, useMemo, useEffect } from "react";
import type { Note, SubjectName } from "../types";
import { ALL_SUBJECTS } from "../types";
import { CloseIcon, UploadIcon } from "./Icons";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (note: Note) => void;
  notes: Note[];
  onDeleteNote: (id: string) => void;
}

const ADMIN_CODE = "2005";

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAddNote,
  notes,
  onDeleteNote,
}) => {
  const [modalMode, setModalMode] = useState<"upload" | "delete">("upload");

  // Upload state
  const [adminCode, setAdminCode] = useState("");
  const [subject, setSubject] = useState<SubjectName>(ALL_SUBJECTS[0]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");

  // Delete state
  const [deleteAdminCode, setDeleteAdminCode] = useState("");
  const [deleteSubject, setDeleteSubject] = useState<SubjectName>(
    ALL_SUBJECTS[0]
  );
  const [selectedNoteIdToDelete, setSelectedNoteIdToDelete] =
    useState<string>("");
  const [deleteError, setDeleteError] = useState("");

  const notesForSelectedSubject = useMemo(() => {
    return notes.filter((note) => note.subject === deleteSubject);
  }, [notes, deleteSubject]);

  useEffect(() => {
    setSelectedNoteIdToDelete("");
  }, [deleteSubject]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Upload
  const handleUploadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploadError("");

    if (
      !adminCode ||
      !subject ||
      !title ||
      !description ||
      !pages ||
      !date ||
      !file
    ) {
      setUploadError("Please fill all fields.");
      return;
    }

    if (adminCode.trim() !== ADMIN_CODE) {
      setUploadError("Invalid Admin Code.");
      return;
    }

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("title", title);
      form.append("description", description);
      form.append("subject", subject);
      form.append("pages", pages);
      form.append("date", date);

      const res = await fetch("/api/notes/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "Upload failed.");
        return;
      }

      onAddNote(data.note);
      onClose();
    } catch (err) {
      console.error(err);
      setUploadError("Upload error.");
    }
  };

  // Delete
  const handleDeleteSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (deleteAdminCode !== ADMIN_CODE) {
      setDeleteError("Invalid Admin Code.");
      return;
    }

    if (!selectedNoteIdToDelete) {
      setDeleteError("Select a note to delete.");
      return;
    }

    try {
      const res = await fetch(`/api/notes/${selectedNoteIdToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        setDeleteError("Delete failed.");
        return;
      }

      onDeleteNote(selectedNoteIdToDelete);
      onClose();
    } catch (err) {
      console.error(err);
      setDeleteError("Delete failed.");
    }
  };

  // Upload UI
  const renderUploadForm = () => (
    <form onSubmit={handleUploadSubmit} className="modal-form">
      <div className="modal-field">
        <label>Admin Code</label>
        <input
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
        />
      </div>

      <div className="modal-field">
        <label>Subject</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value as SubjectName)}
        >
          {ALL_SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="modal-field">
        <label>Topic</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="modal-field">
        <label>Description</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="modal-field">
        <label>PDF File</label>

        <label className="upload-box">
          <UploadIcon className="upload-icon" />
          <span>{file ? file.name : "Click to upload PDF"}</span>
          <input
            type="file"
            onChange={handleFileChange}
            accept="application/pdf"
          />
        </label>
      </div>

      <div className="modal-row">
        <div className="modal-field">
          <label>Pages</label>
          <input
            type="number"
            min={1}
            value={pages}
            onChange={(e) => setPages(e.target.value)}
          />
        </div>

        <div className="modal-field">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {uploadError && <p className="error-text">{uploadError}</p>}

      <div className="modal-actions">
        <button type="button" className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Upload
        </button>
      </div>
    </form>
  );

  const renderDeleteForm = () => (
    <form onSubmit={handleDeleteSubmit} className="modal-form">
      <div className="modal-field">
        <label>Admin Code</label>
        <input
          type="password"
          value={deleteAdminCode}
          onChange={(e) => setDeleteAdminCode(e.target.value)}
        />
      </div>

      <div className="modal-field">
        <label>Subject</label>
        <select
          value={deleteSubject}
          onChange={(e) => setDeleteSubject(e.target.value as SubjectName)}
        >
          {ALL_SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="modal-field">
        <label>Select Note</label>
        <select
          value={selectedNoteIdToDelete}
          onChange={(e) => setSelectedNoteIdToDelete(e.target.value)}
        >
          <option value="">
            {notesForSelectedSubject.length ? "Select a note" : "No notes"}
          </option>

          {notesForSelectedSubject.map((n) => (
            <option key={n._id} value={n._id}>
              {n.title}
            </option>
          ))}
        </select>
      </div>

      {deleteError && <p className="error-text">{deleteError}</p>}

      <div className="modal-actions">
        <button type="button" className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn-danger">
          Delete
        </button>
      </div>
    </form>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>{modalMode === "upload" ? "Upload Note" : "Delete Note"}</h2>

          <button className="close-btn" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="modal-tabs">
          <button
            className={modalMode === "upload" ? "active" : ""}
            onClick={() => setModalMode("upload")}
          >
            Upload
          </button>

          <button
            className={modalMode === "delete" ? "active" : ""}
            onClick={() => setModalMode("delete")}
          >
            Delete
          </button>
        </div>

        <div className="modal-body">
          {modalMode === "upload" ? renderUploadForm() : renderDeleteForm()}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
