import { create } from 'zustand'

export interface RegisterEntry {
  studentId: string
  studentName: string
  avatar: string
  status: 'P' | 'A' | 'L' | 'PENDING'
  method: 'QR' | 'MANUAL' | 'PENDING'
  engagement: 'L1' | 'L2' | 'L3' | 'L4' | null
  comment: string
  timestamp: string | null
  aiFlag: 'at-risk' | 'draft-ready' | null
}

export type AttendanceEvent =
  | { type: 'STUDENT_SCANNED'; studentId: string; studentName: string;
      subject: string; teacher: string; timestamp: string; scanId: string }
  | { type: 'MANUAL_MARK'; studentId: string; studentName: string;
      status: 'P' | 'A' | 'L'; engagement: string; timestamp: string }
  | { type: 'REGISTER_LOCKED'; classId: string; subject: string;
      teacher: string; hash: string; powerScore: number;
      lockedAt: string; entries: RegisterEntry[] }
  | { type: 'AI_FLAG_TRIGGERED'; studentId: string; studentName: string;
      reason: string; severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' }
  | { type: 'REGISTER_RESET' }

interface AIQueueItem {
  studentId: string
  studentName: string
  reason: string
  draft: string
  approved: boolean
}

interface AttendanceState {
  isLocked: boolean
  sealHash: string | null
  sealTimestamp: string | null
  powerScore: number
  entries: RegisterEntry[]
  recentScans: { studentId: string; studentName: string; timestamp: string }[]
  aiQueue: AIQueueItem[]
  markStudent: (studentId: string, status: 'P' | 'A' | 'L', method: 'QR' | 'MANUAL') => void
  setEngagement: (studentId: string, level: 'L1' | 'L2' | 'L3' | 'L4') => void
  setComment: (studentId: string, comment: string) => void
  lockRegister: () => void
  addAIQueueItem: (item: AIQueueItem) => void
  approveAIItem: (studentId: string) => void
  resetRegister: () => void
  receiveEvent: (event: AttendanceEvent) => void
}

function calcPowerScore(entries: RegisterEntry[]): number {
  const total = entries.length
  if (total === 0) return 0
  const present = entries.filter(e => e.status === 'P' || e.status === 'L').length
  return Math.round((present / total) * 100)
}

export function generateHash(): string {
  const chars = 'abcdef0123456789'
  const part = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `${part(4)}...${part(4)}`
}

const INITIAL_ENTRIES: RegisterEntry[] = [
  { studentId: 'student-001', studentName: 'Amara Johnson',    avatar: 'AJ', status: 'PENDING', method: 'PENDING', engagement: null, comment: '', timestamp: null, aiFlag: null },
  { studentId: 'student-002', studentName: 'Blake Nkosi',      avatar: 'BN', status: 'PENDING', method: 'PENDING', engagement: null, comment: '', timestamp: null, aiFlag: null },
  { studentId: 'student-003', studentName: 'Cara Mensah',      avatar: 'CM', status: 'PENDING', method: 'PENDING', engagement: null, comment: '', timestamp: null, aiFlag: null },
  { studentId: 'student-004', studentName: 'David Moyo',       avatar: 'DM', status: 'PENDING', method: 'PENDING', engagement: null, comment: '', timestamp: null, aiFlag: 'at-risk' },
  { studentId: 'student-005', studentName: 'Elena Petrov',     avatar: 'EP', status: 'PENDING', method: 'PENDING', engagement: null, comment: '', timestamp: null, aiFlag: null },
  { studentId: 'student-006', studentName: 'Fatima Al-Rashid', avatar: 'FA', status: 'PENDING', method: 'PENDING', engagement: null, comment: '', timestamp: null, aiFlag: null },
]

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  isLocked: false,
  sealHash: null,
  sealTimestamp: null,
  powerScore: 0,
  entries: INITIAL_ENTRIES,
  recentScans: [],
  aiQueue: [],

  markStudent: (studentId, status, method) => {
    set(state => {
      const entries = state.entries.map(e =>
        e.studentId === studentId
          ? { ...e, status, method, timestamp: new Date().toLocaleTimeString() }
          : e
      )
      return { entries, powerScore: calcPowerScore(entries) }
    })
  },

  setEngagement: (studentId, level) => {
    set(state => ({
      entries: state.entries.map(e =>
        e.studentId === studentId ? { ...e, engagement: level } : e
      ),
    }))
  },

  setComment: (studentId, comment) => {
    set(state => ({
      entries: state.entries.map(e =>
        e.studentId === studentId ? { ...e, comment } : e
      ),
    }))
  },

  lockRegister: () => {
    const hash = generateHash()
    const timestamp = new Date().toISOString()
    set({ isLocked: true, sealHash: hash, sealTimestamp: timestamp })
  },

  addAIQueueItem: (item) => {
    set(state => ({ aiQueue: [...state.aiQueue, item] }))
  },

  approveAIItem: (studentId) => {
    set(state => ({
      aiQueue: state.aiQueue.map(i =>
        i.studentId === studentId ? { ...i, approved: true } : i
      ),
    }))
  },

  resetRegister: () => {
    set({
      isLocked: false,
      sealHash: null,
      sealTimestamp: null,
      powerScore: 0,
      entries: INITIAL_ENTRIES,
      recentScans: [],
      aiQueue: [],
    })
  },

  receiveEvent: (event: AttendanceEvent) => {
    const { markStudent, addAIQueueItem, resetRegister } = get()
    switch (event.type) {
      case 'STUDENT_SCANNED':
        markStudent(event.studentId, 'P', 'QR')
        set(state => ({
          recentScans: [
            { studentId: event.studentId, studentName: event.studentName, timestamp: event.timestamp },
            ...state.recentScans.slice(0, 9),
          ],
        }))
        break
      case 'MANUAL_MARK':
        markStudent(event.studentId, event.status, 'MANUAL')
        break
      case 'REGISTER_LOCKED':
        set({ isLocked: true, sealHash: event.hash, powerScore: event.powerScore })
        break
      case 'AI_FLAG_TRIGGERED':
        addAIQueueItem({
          studentId: event.studentId,
          studentName: event.studentName,
          reason: event.reason,
          draft: `Dear Parent, we are reaching out regarding ${event.studentName}'s attendance. ${event.reason}. Please contact us if you need support.`,
          approved: false,
        })
        break
      case 'REGISTER_RESET':
        resetRegister()
        break
    }
  },
}))
