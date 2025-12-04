export interface Student {
  id: number;
  name: string;
  email: string;
  class: string;
  rollNo: string;
  contact: string;
  attendancePercentage: number;
  attendanceDays: number;
  totalDays: number;
}

export interface TeacherProfile {
  id: string;
  username: string;
  prefix: string;
  name: string;
  phone: string;
  college: string;
  email: string;
  divisions: string[];
  subjectCode: string;
  subjectName: string;
  firstLogin: boolean;
}

