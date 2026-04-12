import { Student, Teacher, Assignment, Subject, ParentChildren, MessageThread } from '@/types';

export const PLACEHOLDER_STUDENTS: Student[] = [
  { id: 'student-001', name: 'Amara Johnson', class: 'Grade 7A', idNumber: 'LNS-2026-001', citizenship: 'PLATINUM', powerScore: 94.2, attendance: '98%', status: 'Good', grade: 7, age: 13 },
  { id: 'student-002', name: 'Blake Nkosi', class: 'Grade 7A', idNumber: 'LNS-2026-002', citizenship: 'GOLD', powerScore: 88.5, attendance: '96%', status: 'Good', grade: 7, age: 13 },
  { id: 'student-003', name: 'Cara Mensah', class: 'Grade 7B', idNumber: 'LNS-2026-003', citizenship: 'SILVER', powerScore: 76.1, attendance: '92%', status: 'Caution', grade: 7, age: 13 },
  { id: 'student-004', name: 'David Moyo', class: 'Grade 8A', idNumber: 'LNS-2026-004', citizenship: 'BRONZE', powerScore: 65.4, attendance: '88%', status: 'At Risk', grade: 8, age: 14 },
  { id: 'student-005', name: 'Elena Petrov', class: 'Grade 8A', idNumber: 'LNS-2026-005', citizenship: 'GOLD', powerScore: 89.9, attendance: '97%', status: 'Good', grade: 8, age: 14 },
  { id: 'student-006', name: 'Fatima Al-Rashid', class: 'Grade 8B', idNumber: 'LNS-2026-006', citizenship: 'PLATINUM', powerScore: 92.3, attendance: '99%', status: 'Good', grade: 8, age: 14 },
];

export const PLACEHOLDER_TEACHERS: Teacher[] = [
  { id: 'teacher-001', name: 'Mr. James Okafor', subject: 'Mathematics' },
  { id: 'teacher-002', name: 'Ms. Sarah Chen', subject: 'Communications (English)' },
  { id: 'teacher-003', name: 'Mr. David Petrov', subject: 'Science' },
  { id: 'teacher-004', name: 'Ms. Amina Hassan', subject: 'Humanities' },
  { id: 'teacher-005', name: 'Mr. Luke Bennett', subject: 'Arts' },
];

export const SUBJECTS: Subject[] = [
  { name: 'Mathematics', weight: 25 },
  { name: 'Communications (English)', weight: 20 },
  { name: 'Science', weight: 20 },
  { name: 'Humanities', weight: 15 },
  { name: 'Arts', weight: 10 },
  { name: 'Physical Education', weight: 10 },
];

export const PARENT_CHILDREN: ParentChildren[] = [
  { parentId: 'parent-001', childrenIds: ['student-001', 'student-004'] } // Parent of Amara and David
];

export const ASSIGNMENTS: Assignment[] = [
  { 
    id: 'asg-001', 
    title: 'Modernist Poetry Analysis', 
    subject: 'Communications (English)', 
    teacher: 'Ms. Sarah Chen',
    dueDate: '2026-04-15T16:00:00', 
    status: 'In Progress', 
    urgency: 'critical', 
    description: "Analyze the use of imagery in T.S. Eliot's 'The Waste Land'. Focus on the themes of disillusionment and fragmentation.",
    questions: [
      { id: 'q1', text: 'How does the opening line "April is the cruelest month" set the tone for the poem?', type: 'essay' },
      { id: 'q2', text: 'Identify three specific images of decay used in the first section.', type: 'short_answer' }
    ]
  },
  { 
    id: 'asg-002', 
    title: 'Quantum Physics Fundamentals', 
    subject: 'Science', 
    teacher: 'Mr. David Petrov',
    dueDate: '2026-04-16T09:00:00', 
    status: 'Not Started', 
    urgency: 'high', 
    description: 'Complete the lab report on wave-particle duality. Ensure all equations are rendered correctly in LaTeX format.',
    questions: [
      { id: 'q1', text: 'Explain the double-slit experiment result.', type: 'essay' }
    ]
  },
];

export const MESSAGE_THREADS: MessageThread[] = [
  {
    id: 'thread-001',
    participant: { name: 'Ms. Sarah Chen', role: 'Teacher', avatar: '/avatars/teacher-002.jpg' },
    subject: 'Essay Feedback: The Waste Land',
    lastMessage: 'I have reviewed your draft. Great start on the imagery section.',
    timestamp: '2026-04-11T10:30:00',
    messages: [
      { id: 'm1', sender: 'teacher', text: 'Hi Amara, I have reviewed your draft. Great start on the imagery section.', timestamp: '2026-04-11T10:30:00' },
      { id: 'm2', sender: 'student', text: 'Thank you Ms. Chen! I followed your advice on the fragmentation theme.', timestamp: '2026-04-11T11:45:00' }
    ]
  }
];
