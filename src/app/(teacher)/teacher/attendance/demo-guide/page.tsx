'use client'

import React from 'react'
import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const STEPS = [
  {
    n: 1,
    title: 'Show the register',
    tab: 'Tab 1 — Teacher',
    quote: '"Here is the teacher\'s register for Mathematics Grade 8A. All students start as Pending. The Power Score is 0%."',
    actions: [],
  },
  {
    n: 2,
    title: 'Student scans in',
    tab: 'Tab 2 — Student',
    quote: '"On the student\'s device, Amara opens the scan page. She points at the classroom QR code."',
    actions: [
      '→ Click "Open Scanner" → wait 2.5 seconds → green flash appears',
      '→ Switch to Tab 1 → Amara\'s row is now green with QR badge ✓',
      '→ Power Score has updated',
    ],
  },
  {
    n: 3,
    title: 'Manual mark',
    tab: 'Tab 1 — Teacher',
    quote: '"One student can\'t scan. The teacher manually marks them."',
    actions: [
      '→ Click [P] on Blake Nkosi → row turns green',
      '→ Click [A] on David Moyo → row turns red',
    ],
  },
  {
    n: 4,
    title: 'Lock the register',
    tab: 'Tab 1 — Teacher',
    quote: '"The teacher locks the register. It\'s now sealed to the blockchain."',
    actions: [
      '→ Click "Lock Register"',
      '→ Gold toast: "Sealed: a3f8…9c2d"',
      '→ All rows show padlock icon',
      '→ 1.5 seconds later: AI flag appears for David Moyo',
    ],
  },
  {
    n: 5,
    title: 'AI drafts alert',
    tab: 'Tab 1 — Teacher',
    quote: '"The AI has noticed David\'s absence and drafted a parent alert. The teacher reviews, edits if needed, and approves."',
    actions: [
      '→ Show the AI Approval Queue panel',
      '→ Edit the draft if desired',
      '→ Click "Approve & Send"',
      '→ "Sent ✓" confirmation appears',
    ],
  },
  {
    n: 6,
    title: 'Parent sees it live',
    tab: 'Tab 3 — Parent',
    quote: '"Meanwhile, Amara\'s parent sees her status update in real time."',
    actions: [
      '→ Switch to Tab 3 → shows PRESENT with timestamp and hash',
      '→ The register lock notification is visible at the top',
    ],
  },
  {
    n: 7,
    title: 'Reset for next run',
    tab: 'Tab 1 — Teacher',
    quote: '',
    actions: [
      '→ Click "↺ Reset all tabs to start state"',
      '→ All three tabs return to Pending state',
    ],
  },
]

export default function DemoGuidePage() {
  return (
    <div className="max-w-2xl mx-auto py-8 space-y-10 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[900] text-lns-navy tracking-tighter uppercase">
            LNS OS — Investor Demo Guide
          </h1>
          <p className="text-sm text-lns-mid-grey mt-1">Attendance Feature · Estimated time: 3 minutes</p>
        </div>
        <Button
          variant="outline"
          className="shrink-0 h-11 rounded-xl text-[10px] font-black uppercase tracking-widest"
          onClick={() => window.print()}
        >
          <Printer size={15} className="mr-2" /> Print
        </Button>
      </div>

      {/* Setup */}
      <div className="p-6 bg-lns-navy text-white rounded-2xl space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Setup — Open these three tabs before starting</p>
        {[
          ['Tab 1 (Teacher)', '/teacher/attendance'],
          ['Tab 2 (Student)', '/student/scan'],
          ['Tab 3 (Parent)',  '/parent/child/student-001/attendance'],
        ].map(([label, path]) => (
          <div key={path} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-sm font-bold">{label}</span>
            <code className="text-[11px] font-mono text-white/50">{path}</code>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {STEPS.map(step => (
          <div key={step.n} className="flex gap-5">
            {/* Step number */}
            <div className="shrink-0 w-10 h-10 rounded-full bg-lns-red text-white flex items-center justify-center text-sm font-[900]">
              {step.n}
            </div>
            <div className="space-y-2 flex-1 pt-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="font-[900] text-lns-navy uppercase tracking-tight">{step.title}</h3>
                <span className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey bg-lns-light-grey px-2 py-0.5 rounded-full">
                  {step.tab}
                </span>
              </div>
              {step.quote && (
                <p className="text-sm text-lns-mid-grey italic border-l-2 border-lns-red/30 pl-3">
                  {step.quote}
                </p>
              )}
              {step.actions.length > 0 && (
                <ul className="space-y-1">
                  {step.actions.map((a, i) => (
                    <li key={i} className="text-xs text-lns-navy font-medium">{a}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { font-size: 12px; }
          button { display: none !important; }
        }
      `}</style>
    </div>
  )
}
