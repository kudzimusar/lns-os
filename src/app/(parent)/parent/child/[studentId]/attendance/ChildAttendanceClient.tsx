'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, XCircle, Clock, Zap, Lock, ShieldCheck } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { SealedBadge } from '@/components/blockchain/SealedBadge'
import { cn } from '@/lib/utils'
import { useAttendanceStore } from '@/store/attendanceStore'
import { useAttendanceBroadcast } from '@/hooks/useAttendanceBroadcast'

// Previous weeks hardcoded for demo — today (day 13) comes from live store
const HISTORY: Record<number, 'P' | 'A' | 'L'> = {
  1:'P', 2:'P', 3:'P', 4:'P', 5:'P',
  7:'P', 8:'P', 9:'L', 10:'P', 11:'P',
  14:'P', 15:'P', 16:'A', 17:'P', 18:'P',
}

export default function ChildAttendanceClient({ params }: { params: { studentId: string } }) {
  const { entries, isLocked, sealHash, sealTimestamp } = useAttendanceStore()
  useAttendanceBroadcast()

  const studentEntry = entries.find(e => e.studentId === 'student-001')
  const todayStatus  = studentEntry?.status ?? 'PENDING'
  const todayTime    = studentEntry?.timestamp ?? null

  const presentCount = Object.values(HISTORY).filter(v => v === 'P').length
  const lateCount    = Object.values(HISTORY).filter(v => v === 'L').length
  const absentCount  = Object.values(HISTORY).filter(v => v === 'A').length
  const termScore    = Math.round(((presentCount + lateCount) / (presentCount + lateCount + absentCount)) * 100)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/parent/child/${params.studentId}`}
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors">
          <ArrowLeft size={14} /> Back
        </Link>
        <div>
          <h1 className="text-2xl font-[900] text-lns-navy tracking-tighter uppercase">
            Amara Johnson — Attendance
          </h1>
          <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest">
            Grade 8A · Spring Term 2026
          </p>
        </div>
      </div>

      {/* Blockchain seal banner */}
      {isLocked && sealHash && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <Lock size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-800">
              Today&apos;s register has been sealed to the blockchain.
            </p>
            <p className="text-[10px] text-amber-700 mt-0.5">
              Attendance is now permanent and cannot be altered. Hash: {sealHash}
            </p>
          </div>
          <SealedBadge hash={sealHash} timestamp={sealTimestamp ?? undefined} className="shrink-0" />
        </div>
      )}

      {/* Live Status Card */}
      <Card className="border-none shadow-sm bg-white p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Today</p>
          <div className="flex items-center gap-1.5">
            <div className={cn('w-1.5 h-1.5 rounded-full animate-pulse',
              isLocked ? 'bg-amber-500' : 'bg-green-500'
            )} />
            <span className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey">
              {isLocked ? 'Sealed' : 'Live'}
            </span>
          </div>
        </div>

        {todayStatus === 'PENDING' && (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-4 border-gray-300" />
            </div>
            <div>
              <p className="text-lg font-black text-lns-mid-grey">Awaiting check-in</p>
              <p className="text-xs text-lns-mid-grey/60">Mathematics · Mr. Okafor</p>
            </div>
          </div>
        )}
        {todayStatus === 'P' && (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={28} className="text-green-600" />
            </div>
            <div>
              <p className="text-lg font-black text-green-700">Present</p>
              <p className="text-xs text-lns-mid-grey">Mathematics · Mr. Okafor{todayTime && ` · ${todayTime}`}</p>
            </div>
          </div>
        )}
        {todayStatus === 'A' && (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle size={28} className="text-lns-red" />
            </div>
            <div>
              <p className="text-lg font-black text-lns-red">Absent</p>
              <p className="text-xs text-lns-mid-grey">Mathematics · Mr. Okafor</p>
            </div>
          </div>
        )}
        {todayStatus === 'L' && (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock size={28} className="text-amber-600" />
            </div>
            <div>
              <p className="text-lg font-black text-amber-700">Late Arrival</p>
              <p className="text-xs text-lns-mid-grey">Mathematics · Mr. Okafor{todayTime && ` · ${todayTime}`}</p>
            </div>
          </div>
        )}
      </Card>

      {/* Power Score */}
      <Card className="border-none shadow-sm bg-white p-6 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Power Score This Term</p>
          <Zap size={16} className="text-lns-navy" />
        </div>
        <p className="text-3xl font-[900] text-lns-navy">{termScore}%</p>
        <div className="h-2 bg-lns-light-grey rounded-full overflow-hidden">
          <div className="h-full bg-lns-navy rounded-full transition-all duration-700" style={{ width: `${termScore}%` }} />
        </div>
        <div className="flex gap-4 text-[10px] font-bold text-lns-mid-grey">
          <span>Present: {presentCount}</span>
          <span>Late: {lateCount}</span>
          <span>Absent: {absentCount}</span>
        </div>
      </Card>

      {/* Monthly Calendar */}
      <Card className="border-none shadow-sm bg-white p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">April 2026</p>
          <ShieldCheck size={14} className="text-green-500" />
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['M','T','W','T','F','S','S'].map((d, i) => (
            <div key={i} className="text-center text-[9px] font-black text-lns-mid-grey/40 uppercase pb-2">{d}</div>
          ))}
          {Array.from({ length: 30 }, (_, i) => {
            const day    = i + 1
            const isToday = day === 13
            const status  = isToday
              ? (todayStatus === 'PENDING' ? null : todayStatus)
              : (HISTORY[day] ?? null)
            return (
              <div key={day} className={cn(
                'aspect-square flex flex-col items-center justify-center rounded-xl text-[10px] font-bold border-2',
                isToday ? 'border-lns-navy bg-lns-navy/5' : 'border-transparent bg-gray-50/60'
              )}>
                <span className="text-lns-navy">{day}</span>
                <div className={cn('w-1.5 h-1.5 rounded-full mt-0.5',
                  status === 'P' ? 'bg-green-500' :
                  status === 'L' ? 'bg-amber-500' :
                  status === 'A' ? 'bg-lns-red'   : 'bg-gray-200'
                )} />
              </div>
            )
          })}
        </div>
        <div className="flex gap-4 text-[10px] font-bold text-lns-mid-grey pt-2 border-t border-gray-50">
          {[['bg-green-500','Present'],['bg-amber-500','Late'],['bg-lns-red','Absent'],['bg-gray-200','Pending']].map(([c,l]) => (
            <span key={l} className="flex items-center gap-1">
              <span className={cn('w-2 h-2 rounded-full', c)} />{l}
            </span>
          ))}
        </div>
      </Card>
    </div>
  )
}
