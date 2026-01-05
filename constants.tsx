
import { Course, User, Notification, Assessment } from './types';

export const MOCK_ADMIN: User = {
  id: 'A-001',
  name: 'Admin',
  role: 'ADMIN',
  email: 'admin@edu.portal',
  avatar: 'https://picsum.photos/seed/admin/200/200',
};

export const MOCK_TEACHER: User = {
  id: 'T-8821',
  name: 'Prof. Sarah Jenkins',
  role: 'TEACHER',
  email: 'sarah.j@school.edu',
  avatar: 'https://picsum.photos/seed/sarah/200/200',
  department: 'Science Dept',
};

export const MOCK_STUDENT: User = {
  id: 'S-0042',
  name: 'Alex Johnson',
  role: 'STUDENT',
  email: 'alex.j@university.edu',
  avatar: 'https://picsum.photos/seed/alex/200/200',
  grade: 'Junior (Year 3)',
};

export const COURSES: Course[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    code: 'MAT-302',
    schedule: 'MWF 09:00 AM',
    room: 'Room 302',
    progress: 85,
    status: 'on-track',
    instructor: 'Prof. Miller',
    studentsCount: 32,
    capacity: 40,
    icon: 'functions',
  },
  {
    id: '2',
    name: 'Physics Fundamentals',
    code: 'PHYS-101',
    schedule: 'TTh 10:00 AM',
    room: 'Lab 4',
    progress: 75,
    status: 'on-track',
    instructor: 'Dr. Smith',
    studentsCount: 24,
    capacity: 30,
    icon: 'science',
  },
  {
    id: '3',
    name: 'History of Art',
    code: 'ART-204',
    schedule: 'TTh 01:00 PM',
    room: 'Studio A',
    progress: 40,
    status: 'due-soon',
    instructor: 'Ms. Davis',
    studentsCount: 18,
    capacity: 25,
    icon: 'history_edu',
  }
];

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Physics 101: Midterm Grades',
    description: 'Your midterm grades have been posted to the student portal. Tap to view your performance breakdown.',
    type: 'grade',
    timestamp: '2m ago',
    isUnread: true,
  },
  {
    id: 'n2',
    title: 'Campus Library Update',
    description: 'The main library will be closed for maintenance this Saturday from 8 AM to 12 PM.',
    type: 'announcement',
    timestamp: '1h ago',
    isUnread: true,
  }
];

export const ASSESSMENTS: Assessment[] = [
  {
    id: 'a1',
    title: 'Physics Lab Report',
    course: 'Physics 101',
    dueDate: 'Tomorrow',
    status: 'pending',
    icon: 'science'
  },
  {
    id: 'a2',
    title: 'Analysis Essay',
    course: 'English Lit',
    dueDate: 'Friday',
    status: 'submitted',
    icon: 'menu_book'
  }
];
