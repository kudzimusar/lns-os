'use client'

import React from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAttendanceStore } from '@/store/attendanceStore'
import { useAttendanceBroadcast } from '@/hooks/useAttendanceBroadcast'

export default function ScanConfirmationClient({ params }: { params: { scanId: string } }) {
  const { entries, sealHash } = useAttendanceStore()
  useAttendanceBroadcast() // receive REGISTER_LOCKED so hash appears live

  const entry = entries.find(e => e.studentId === 'student-001')
  const time  = entry?.timestamp ??
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="h-screen -m-4 md:-m-6 lg:-m-8 bg-lns-navy flex flex-col items-center justify-center p-8 space-y-10 animate-in fade-in zoom-in-95 duration-500">

      {/* Check icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-green-500/20 blur-[60px] rounded-full" />
        <div className="relative w-28 h-28 rounded-full bg-green-500 flex items-center justify-center shadow-2xl shadow-green-600/30">
          <CheckCircle2 size={64} className="text-white animate-in slide-in-from-bottom-4 duration-500" />
        </div>
      </div>

      {/* Status */}
      <div className="text-center space-y-2">
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-green-400">Marked Present</p>
        <h1 className="text-4xl font-[900] text-white tracking-tighter">Amara Johnson</h1>
        <p className="text-white/60 font-medium">Mathematics · Grade 8A</p>
        <p className="text-white/60">Mr. James Okafor</p>
      </div>

      {/* Timestamp + seal */}
      <div className="text-center space-y-1.5">
        <p className="text-white font-bold">{time} · Today</p>
        {sealHash
          ? <p className="text-[10px] font-mono text-green-400">⛓ Blockchain sealed: {sealHash}</p>
          : <p className="text-[10px] text-white/30 animate-pulse">⛓ Awaiting register seal...</p>
        }
      </div>

      <Link href="/student/dashboard">
        <Button className="bg-white text-lns-navy hover:bg-green-50 h-14 px-10 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center gap-3">
          Return to Dashboard <ArrowRight size={18} />
        </Button>
      </Link>
    </div>
  )
}
