'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import QRCode from 'qrcode'
import { ArrowLeft, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAttendanceStore } from '@/store/attendanceStore'
import { useAttendanceBroadcast } from '@/hooks/useAttendanceBroadcast'

const QR_PAYLOAD = JSON.stringify({
  type: 'ATTENDANCE_QR',
  classId: 'class-8a',
  subject: 'Mathematics',
  teacher: 'Mr. Okafor',
  sessionId: 'session-demo-8a',
  period: 2,
})

export default function ProjectorQRView() {
  const { entries, powerScore } = useAttendanceStore()
  useAttendanceBroadcast() // receive STUDENT_SCANNED events from other tabs

  const [qrDataUrl, setQrDataUrl] = useState('')
  const [liveTime, setLiveTime] = useState('')

  const presentCount = entries.filter(e => e.status === 'P' || e.status === 'L').length
  const totalCount   = entries.length
  const progress     = totalCount > 0 ? (presentCount / totalCount) * 100 : 0

  useEffect(() => {
    QRCode.toDataURL(QR_PAYLOAD, {
      width: 280,
      margin: 2,
      color: { dark: '#0A1F44', light: '#FFFFFF' },
    }).then(setQrDataUrl)
  }, [])

  useEffect(() => {
    const tick = () =>
      setLiveTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="fixed inset-0 bg-lns-navy flex flex-col items-center justify-center p-8 z-[100] animate-in fade-in duration-1000">

      {/* Top bar */}
      <div className="absolute top-6 left-8 right-8 flex items-center justify-between">
        <p className="text-[11px] font-black uppercase tracking-widest text-white/30">
          LNS OS · Mathematics — Grade 8A · Mr. Okafor · {liveTime}
        </p>
        <Link href="/teacher/attendance">
          <Button variant="ghost" className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest">
            <ArrowLeft size={16} className="mr-2" /> Back to Register
          </Button>
        </Link>
      </div>

      {/* Centre content */}
      <div className="flex flex-col items-center space-y-8">
        <div className="bg-white p-8 rounded-[3rem] shadow-[0_0_80px_rgba(255,255,255,0.08)]">
          {qrDataUrl
            ? <img src={qrDataUrl} alt="Attendance QR Code" className="w-64 h-64 md:w-80 md:h-80" />
            : <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-100 rounded-2xl animate-pulse" />
          }
        </div>

        <div className="text-center space-y-1">
          <p className="text-white font-black uppercase tracking-[0.2em] text-sm">Scan to Mark Attendance</p>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
            Mathematics · Grade 8A · Period 2
          </p>
        </div>

        <div className="flex items-center gap-3 text-white">
          <Users size={18} className="text-white/40" />
          <span className="text-3xl font-[900]">{presentCount}</span>
          <span className="text-white/40 text-lg">of</span>
          <span className="text-3xl font-[900]">{totalCount}</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">students scanned</span>
        </div>

        {/* Progress bar */}
        <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom hash */}
      <div className="absolute bottom-6 text-[9px] font-mono text-white/20 tracking-widest">
        ⛓ Power Score: {powerScore}% · session-demo-8a
      </div>
    </main>
  )
}
