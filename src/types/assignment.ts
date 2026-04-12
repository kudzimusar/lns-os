export interface Assignment {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  dueDate: string;
  status: string;
  urgency?: string;
  description?: string;
  questions?: any[];
  avg?: number;
  category?: string;
  feedback?: string;
  high?: number;
  marked?: number;
  maxScore?: number;
  score?: number | string;
  submissions?: number;
  total?: number;
}
