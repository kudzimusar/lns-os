'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check, Clock, Lock, Printer, Sparkles, Zap, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AIFlag } from '@/components/ai/AIFlag'
import { SealedBadge } from '@/components/blockchain/SealedBadge'
import { BlockchainSealToast } from '@/components/blockchain/BlockchainSealToast'
import { useAttendanceStore, generateHash } from '@/store/attendanceStore'
import { useAttendanceBroadcast } from '@/hooks/useAttendanceBroadcast'

export default function AttendancePage() {
  const {
    entries, isLocked, sealHash, sealTimestamp, powerScore,
    aiQueue, setEngagement, setComment, approveAIItem,
  } = useAttendanceStore()
  const { broadcast } = useAttendanceBroadcast()

  const [showSealToast, setShowSealToast] = useState(false)
  const [draftTexts, setDraftTexts] = useState<Record<string, string>>({})
  const [sentItems, setSentItems] = useState<Set<string>>(new Set())
  const [today, setToday] = useState('')

  useEffect(() => {
    setToday(new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }))
  }, [])

  // Sync draft texts when new AI queue items arrive
  useEffect(() => {
    setDraftTexts(prev => {
      const next = { ...prev }
      aiQueue.forEach(item => {
        if (!(item.studentId in next)) next[item.studentId] = item.draft
      })
      return next
    })
  }, [aiQueue])

  const presentCount = entries.filter(e => e.status === 'P').length
  const absentCount  = entries.filter(e => e.status === 'A').length
  const lateCount    = entries.filter(e => e.status === 'L').length
  const pendingCount = entries.filter(e => e.status === 'PENDING').length

  function handleLock() {
    if (isLocked) return
    const hash = generateHash()
    const timestamp = new Date().toISOString()
    const currentEntries = useAttendanceStore.getState().entries
    const currentPowerScore = useAttendanceStore.getState().powerScore

    broadcast({
      type: 'REGISTER_LOCKED',
      classId: 'class-8a',
      subject: 'Mathematics',
      teacher: 'Mr. Okafor',
      hash,
      powerScore: currentPowerScore,
      lockedAt: timestamp,
      entries: currentEntries,
    })
    setShowSealToast(true)

    // 1.5s delay feels natural — fires after the lock animation settles
    const david = currentEntries.find(e => e.studentId === 'student-004')
    if (david && david.status === 'A') {
      setTimeout(() => {
        broadcast({
          type: 'AI_FLAG_TRIGGERED',
          studentId: 'student-004',
          studentName: 'David Moyo',
          reason: 'David has been absent for 3 consecutive sessions this week.',
          severity: 'HIGH',
        })
      }, 1500)
    }
  }

  function handleMark(studentId: string, studentName: string, status: 'P' | 'A' | 'L') {
    if (isLocked) return
    broadcast({
      type: 'MANUAL_MARK',
      studentId,
      studentName,
      status,
      engagement: '',
      timestamp: new Date().toLocaleTimeString(),
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">

      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">
              Attendance Register
            </h1>
            {isLocked && sealHash && (
              <SealedBadge hash={sealHash} timestamp={sealTimestamp ?? undefined} showVerify />
            )}
          </div>
          <p className="text-xs md:text-base text-lns-mid-grey font-medium leading-relaxed">
            Period 2: Mathematics 8A ·{' '}
            <span className="text-lns-navy font-bold">{today}</span>
          </p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl text-[10px] uppercase font-black tracking-widest bg-white">
            <Printer size={16} className="mr-2" /> Export PDF
          </Button>
          <Button
            className={cn(
              'flex-1 md:flex-none h-12 rounded-xl text-[10px] uppercase font-black tracking-widest active:scale-95 transition-transform'
            )}
            variant={isLocked ? 'secondary' : 'primary'}
            onClick={handleLock}
            disabled={isLocked}
          >
            <Lock size={16} className="mr-2" />
            {isLocked ? 'Locked to Chain' : 'Lock Register'}
          </Button>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Power Score', value: `${powerScore}%`, Icon: Zap,   color: 'text-lns-navy' },
          { label: 'Present',     value: presentCount,     Icon: Check,  color: 'text-green-600' },
          { label: 'Absent',      value: absentCount,      Icon: X,      color: 'text-lns-red' },
          { label: 'Pending',     value: pendingCount,     Icon: Clock,  color: 'text-amber-500' },
        ].map(s => (
          <Card key={s.label} className="border-none shadow-sm bg-white">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-[900] text-lns-navy">{s.value}</p>
                  <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">{s.label}</p>
                </div>
                <s.Icon size={22} className={s.color} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-4">
        {entries.map(student => (
          <Card key={student.studentId} className="border-none shadow-sm bg-white p-4 space-y-4 rounded-2xl">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-lns-light-grey flex items-center justify-center text-lns-navy text-xs font-black">
                  {student.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[13px] font-bold text-lns-navy">{student.studentName}</h4>
                    {student.aiFlag && <AIFlag type={student.aiFlag} entityId={student.studentId} />}
                  </div>
                  <MethodBadge method={student.method} />
                </div>
              </div>
              <div className="flex items-center bg-lns-light-grey/30 rounded-xl p-1 gap-1">
                {(['P', 'A', 'L'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => handleMark(student.studentId, student.studentName, m)}
                    disabled={isLocked}
                    className={cn(
                      'w-11 h-11 rounded-lg text-xs font-black transition-all border',
                      student.status === m
                        ? m === 'P' ? 'bg-green-600 border-green-600 text-white shadow-md scale-105'
                          : m === 'A' ? 'bg-lns-red border-lns-red text-white shadow-md scale-105'
                          : 'bg-amber-500 border-amber-500 text-white shadow-md scale-105'
                        : 'bg-white border-lns-border/20 text-lns-mid-grey',
                      isLocked && 'opacity-40 cursor-not-allowed'
                    )}
                  >{m}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-lns-border/5">
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-lns-mid-grey px-1">Engagement</label>
                <select
                  value={student.engagement ?? ''}
                  onChange={e => setEngagement(student.studentId, e.target.value as 'L1'|'L2'|'L3'|'L4')}
                  disabled={isLocked}
                  className="w-full bg-lns-light-grey/50 border-none rounded-xl text-[10px] font-bold h-12 px-3 appearance-none"
                >
                  <option value="">—</option>
                  {['L1','L2','L3','L4'].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-lns-mid-grey px-1">Insight</label>
                <input
                  type="text" placeholder="Note..." value={student.comment}
                  onChange={e => setComment(student.studentId, e.target.value)}
                  disabled={isLocked}
                  className="w-full bg-lns-light-grey/50 border-none rounded-xl text-[10px] font-bold h-12 px-3 focus:ring-1 focus:ring-lns-navy outline-none"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop Table */}
      <Card className="hidden md:block border-none shadow-sm overflow-hidden bg-white rounded-[2rem]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-lns-border bg-lns-light-grey/50">
                {['Student','Verification','Mark','Engagement','Insight'].map(h => (
                  <th key={h} className={cn(
                    'px-6 py-5 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey',
                    h === 'Mark' && 'text-center'
                  )}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-lns-border">
              {entries.map(student => (
                <tr key={student.studentId} className="hover:bg-lns-light-grey/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-lns-navy/5 text-lns-navy flex items-center justify-center text-xs font-black shrink-0 border border-lns-navy/10">
                        {student.avatar}
                      </div>
                      <div className="flex flex-col">
                        <Link href={`/teacher/students/${student.studentId}`} className="text-sm font-bold text-lns-navy hover:text-lns-red transition-colors whitespace-nowrap">
                          {student.studentName}
                        </Link>
                        {student.aiFlag && <AIFlag type={student.aiFlag} entityId={student.studentId} className="mt-1 w-fit" />}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><MethodBadge method={student.method} /></td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex flex-col items-center gap-1.5">
                      <div className="inline-flex items-center space-x-1.5 p-1 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                        {(['P', 'A', 'L'] as const).map(m => (
                          <button
                            key={m}
                            onClick={() => handleMark(student.studentId, student.studentName, m)}
                            disabled={isLocked}
                            className={cn(
                              'w-9 h-9 rounded-lg text-xs font-black transition-all border',
                              student.status === m
                                ? m === 'P' ? 'bg-green-600 border-green-600 text-white shadow-md'
                                  : m === 'A' ? 'bg-lns-red border-lns-red text-white shadow-md'
                                  : 'bg-amber-500 border-amber-500 text-white shadow-md'
                                : 'bg-white border-lns-border/30 text-lns-mid-grey hover:border-lns-navy hover:text-lns-navy',
                              isLocked && 'opacity-40 cursor-not-allowed'
                            )}
                          >{m}</button>
                        ))}
                      </div>
                      {isLocked && <Lock size={10} className="text-amber-500" />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={student.engagement ?? ''}
                      onChange={e => setEngagement(student.studentId, e.target.value as 'L1'|'L2'|'L3'|'L4')}
                      disabled={isLocked}
                      className="bg-lns-light-grey/50 border border-lns-border/10 rounded-xl text-xs font-bold px-4 py-2 focus:ring-1 focus:ring-lns-navy outline-none"
                    >
                      <option value="">—</option>
                      {['L1','L2','L3','L4'].map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="relative group/input">
                      <input
                        type="text" placeholder="Add insight..." value={student.comment}
                        onChange={e => setComment(student.studentId, e.target.value)}
                        disabled={isLocked}
                        className="w-full bg-transparent text-sm border-b border-lns-border/20 focus:border-lns-navy outline-none placeholder:text-lns-mid-grey/30 placeholder:italic transition-all p-1 pr-8"
                      />
                      {!isLocked && (
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/input:opacity-100 transition-opacity text-slate-400 hover:text-red-600">
                          <Sparkles size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Approval Queue */}
      {aiQueue.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy flex items-center gap-2">
            <Zap size={14} className="text-lns-red animate-pulse" /> AI Approval Queue
          </h3>
          {aiQueue.map(item => (
            <Card key={item.studentId} className="border-none shadow-sm bg-white p-6 space-y-4 rounded-2xl border-l-4 border-amber-400">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">⚡ AI Draft Ready — {item.studentName} Absence Alert</p>
                  <p className="text-xs text-lns-mid-grey mt-1">{item.reason}</p>
                </div>
                {item.approved && sentItems.has(item.studentId) && (
                  <span className="shrink-0 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                    <Check size={10} /> Sent ✓
                  </span>
                )}
              </div>
              <textarea
                value={draftTexts[item.studentId] ?? item.draft}
                onChange={e => setDraftTexts(prev => ({ ...prev, [item.studentId]: e.target.value }))}
                disabled={item.approved && sentItems.has(item.studentId)}
                rows={4}
                className="w-full text-sm border border-lns-border/20 rounded-xl p-4 focus:ring-1 focus:ring-lns-navy outline-none resize-none bg-lns-light-grey/20"
              />
              {!(item.approved && sentItems.has(item.studentId)) && (
                <div className="flex gap-3 flex-wrap">
                  <Button
                    variant="outline"
                    className="text-[10px] font-black uppercase tracking-widest rounded-xl h-10"
                    onClick={() => setDraftTexts(prev => ({ ...prev, [item.studentId]: item.draft }))}
                  >↺ Regenerate</Button>
                  <Button
                    variant="outline"
                    className="text-[10px] font-black uppercase tracking-widest rounded-xl h-10 text-lns-red border-lns-red hover:bg-red-50"
                    onClick={() => {/* reject */}}
                  >✕ Reject</Button>
                  <Button
                    className="text-[10px] font-black uppercase tracking-widest rounded-xl h-10 bg-lns-navy text-white"
                    onClick={() => {
                      approveAIItem(item.studentId)
                      setSentItems(prev => { const s = new Set(prev); s.add(item.studentId); return s })
                    }}
                  >✓ Approve &amp; Send</Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Demo Reset */}
      <div className="pt-8 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400 mb-2">Demo controls — for presentation use only</p>
        <button
          onClick={() => {
            setSentItems(new Set())
            setDraftTexts({})
            broadcast({ type: 'REGISTER_RESET' })
          }}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >↺ Reset all tabs to start state</button>
      </div>

      {/* Blockchain Seal Toast */}
      {showSealToast && sealHash && (
        <BlockchainSealToast
          message="Register Sealed to Blockchain"
          hash={sealHash}
          timestamp={sealTimestamp ?? new Date().toISOString()}
          onClose={() => setShowSealToast(false)}
        />
      )}
    </div>
  )
}

function MethodBadge({ method }: { method: 'QR' | 'MANUAL' | 'PENDING' }) {
  if (method === 'QR') return (
    <div className="inline-flex items-center text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tight shadow-sm border border-green-100">
      <Check size={12} className="mr-1.5" /> QR ✓
    </div>
  )
  if (method === 'MANUAL') return (
    <div className="inline-flex items-center text-lns-mid-grey bg-lns-light-grey px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tight border border-lns-border/20">
      Manual
    </div>
  )
  return (
    <div className="inline-flex items-center text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tight border border-amber-100">
      <Clock size={12} className="mr-1.5" /> Pending
    </div>
  )
}
