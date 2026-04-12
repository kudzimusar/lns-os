export type UserRole = 'teacher' | 'student' | 'parent' | 'admin';

export interface AIContextPayload {
  user: {
    id: string;
    role: UserRole;
    name: string;
    language: string;
  };
  page: {
    route: string;
    title: string;
    description: string;
  };
  pageData: {
    students?: any[];
    grades?: any[];
    attendance?: any[];
    assignments?: any[];
    behaviour?: any[];
    selectedStudent?: any;
    selectedAssignment?: any;
  };
  school: {
    name: string;
    gradingSystem: any[];
    citizenshipScale: string[];
    currentTerm: string;
    currentWeek: number;
  };
  task: {
    type: 'insight' | 'draft' | 'flag' | 'chat' | 'schedule';
    instruction: string;
    outputFormat: 'text' | 'json' | 'markdown';
  };
}

export interface ApprovalQueueItem {
  id: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  studentId?: string;
  studentName?: string;
  teacherId?: string;
  generatedAt: string;
  status: 'DRAFT' | 'VIEWED' | 'EDITING' | 'EDITED' | 'APPROVED' | 'SENT' | 'REJECTED' | 'EXPIRED';
  content: string;
  contentType: 'alert' | 'message' | 'plan' | 'flag' | 'summary' | 'report' | 'report-comment' | 'newsletter';
  recipient: {
    name: string;
    role: string;
    id: string;
  };
  aiConfidence: 'LOW' | 'MEDIUM' | 'HIGH';
  expiresAt: string;
  sentAt?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
