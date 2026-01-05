
export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  avatar: string;
  department?: string;
  grade?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  schedule: string;
  room: string;
  progress: number;
  status: 'on-track' | 'due-soon' | 'started' | 'archived';
  instructor?: string;
  studentsCount: number;
  capacity: number;
  icon?: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'grade' | 'announcement' | 'reminder' | 'system';
  timestamp: string;
  isUnread: boolean;
}

export interface Assessment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  icon: string;
}
