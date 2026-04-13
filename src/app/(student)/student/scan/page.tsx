'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import QRCode from 'qrcode'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAttendanceBroadcast } from '@/hooks/useAttendanceBroadcast'

type ScanState = 'idle' | 'scanning' | 'success'

export default function StudentScanPage() {
  const { broadcast } = useAttendanceBroadcast()
  const router = useRouter()

  const [scanState, setScanState] = useState<ScanState>('idle')
  const [studentQr, setStudentQr] = useState('')

  useEffect(() => {
    QRCode.toDataURL(
      JSON.stringify({ type: 'STUDENT_IDENTITY', studentId: 'student-001', studentName: 'Amara Johnson', grade: '8A' }),
      { width: 200, margin: 2, color: { dark: '#0A1F44', light: '#FFFFFF' } }
    ).then(setStudentQr)
  }, [])

  function handleOpenScanner() {
    setScanState('scanning')
    // 2.5s simulation — convincing enough for a live demo
    setTimeout(() => {
      broadcast({
        type: 'STUDENT_SCANNED',
        studentId: 'student-001',
        studentName: 'Amara Johnson',
        subject: 'Mathematics',
        teacher: 'Mr. Okafor',
        timestamp: new Date().toLocaleTimeString(),
        scanId: 'scan-001',
      })
      setScanState('success')
      setTimeout(() => router.push('/student/scan/confirm/scan-001'), 600)
    }, 2500)
  }

  // Full-screen green flash on success
  if (scanState === 'success') {
    return (
      <div className="min-h-screen -m-4 md:-m-6 lg:-m-8 bg-green-500 flex items-center justify-center animate-in fade-in duration-200">
        <ShieldCheck size={96} className="text-white" />
      </div>
    )
  }

  // Scanning — fake camera viewfinder
  if (scanState === 'scanning') {
    return (
      <div className="min-h-screen -m-4 md:-m-6 lg:-m-8 bg-slate-900 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <p className="text-white text-center font-black uppercase tracking-widest text-sm animate-pulse">
            Scanning for classroom QR code...
          </p>
          <div className="relative aspect-square w-full bg-black rounded-3xl overflow-hidden border-2 border-white/10">
            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-lns-red rounded-tl-xl z-10" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-lns-red rounded-tr-xl z-10" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-lns-red rounded-bl-xl z-10" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-lns-red rounded-br-xl z-10" />
            {/* Animated scan line */}
            <div
              className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-lns-red to-transparent z-20"
              style={{ animation: 'scanDown 2s linear infinite', boxShadow: '0 0 12px rgba(230,57,70,0.9)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <div className="w-32 h-32 border-4 border-white rounded-2xl" />
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl h-12 text-[10px] font-black uppercase tracking-widest"
            onClick={() => setScanState('idle')}
          >Cancel</Button>
        </div>
        <style>{`
          @keyframes scanDown {
            0%   { top: 0%; }
            50%  { top: 100%; }
            100% { top: 0%; }
          }
        `}</style>
      </div>
    )
  }

  // Idle
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/student/dashboard">
          <Button variant="ghost" className="h-10 w-10 rounded-xl p-0">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-black text-lns-navy uppercase tracking-tight">Scan Attendance</h1>
          <p className="text-xs text-lns-mid-grey font-medium">Amara Johnson · student-001 · Grade 8A</p>
        </div>
      </div>

      {/* Student identity QR */}
      <div className="flex flex-col items-center space-y-4 py-10 bg-white rounded-3xl shadow-sm border border-lns-border/10">
        <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Your Identity</p>
        {studentQr
          ? <img src={studentQr} alt="Student QR Code" className="w-48 h-48 rounded-2xl" />
          : <div className="w-48 h-48 bg-lns-light-grey rounded-2xl animate-pulse" />
        }
        <p className="text-sm font-bold text-lns-navy">Amara Johnson · student-001</p>
        <p className="text-[10px] text-lns-mid-grey uppercase tracking-widest">Grade 8A</p>
      </div>

      {/* Scan CTA */}
      <div className="border-t border-lns-border/10 pt-8 space-y-4 text-center">
        <p className="text-sm font-bold text-lns-navy">Scan Classroom Code</p>
        <p className="text-xs text-lns-mid-grey max-w-xs mx-auto">
          Point your camera at the QR code displayed at the front of the room.
        </p>
        <Button
          onClick={handleOpenScanner}
          className="w-full bg-lns-red text-white h-14 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all shadow-xl shadow-lns-red/30"
        >
          📷 Open Scanner
        </Button>
      </div>
    </div>
  )
}
