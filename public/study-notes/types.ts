export type SubjectName =
  | "Engineering Mathematics - 1"
  | "Engineering Physics"
  | "Engineering Chemistry"
  | "Basic Electronics Engineering"
  | "Basic Electrical Engineering"
  | "Engineering Graphics"
  | "Engineering Mechanics"
  | "Fundamentals of Programming Language"
  | "PCS"
  | "PYQs";

export const ALL_SUBJECTS: SubjectName[] = [
  "Engineering Mathematics - 1",
  "Engineering Physics",
  "Engineering Chemistry",
  "Basic Electronics Engineering",
  "Basic Electrical Engineering",
  "Engineering Graphics",
  "Engineering Mechanics",
  "Fundamentals of Programming Language",
  "PCS",
  "PYQs",
];

// FIXED Note type for backend use
export interface Note {
  _id: string; // MongoDB ID
  title: string;
  description: string;
  subject: SubjectName;
  pages: number;
  date: string;
  fileLink: string; // from backend
}

export interface Subject {
  name: SubjectName;
  count: number;
}
