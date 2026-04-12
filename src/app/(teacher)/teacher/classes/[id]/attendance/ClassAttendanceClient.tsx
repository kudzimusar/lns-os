"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  Save, 
  Monitor,
  MoreVertical,
  Activity,
  Scan
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const COHORTS = [
  { id: '10a-eng', name: 'Grade 10-A English Lit', count: 32, room: 'Room 4B', time: '09:00 - 10:30', days: 'Mon, Wed, Fri', performance: 84.5, attendance: 97.2 },
  { id: '10b-eng', name: 'Grade 10-B English Lit', count: 28, room: 'Room 2C', time: '11:00 - 12:30', days: 'Tue, Thu', performance: 78.1, attendance: 94.8 },
  { id: '11a-comm', name: 'Grade 11-A Communication', count: 24, room: 'Theatre II', time: '14:00 - 15:30', days: 'Mon, Wed', performance: 91.2, attendance: 98.4 },
];

export default function ClassAttendanceClient({ params }: { params: { id: string } }) {
  const cohort = COHORTS.find(c => c.id === params.id) || COHORTS[0];
  const myStudents = PLACEHOLDER_STUDENTS.filter(s => s.class === cohort.id || cohort.id.includes(s.class.toLowerCase().replace(' ', ''))); 
  const [attendance, setAttendance] = React.useState<Record<string, 'present' | 'late' | 'absent'>>({});
  const [isSyncing, setIsSyncing] = React.useState(false);

  const toggleStatus = (id: string, status: 'present' | 'late' | 'absent') => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const presentCount = Object.values(attendance).filter(v => v === 'present').length;
  const lateCount = Object.values(attendance).filter(v => v === 'late').length;
  const absentCount = Object.values(attendance).filter(v => v === 'absent').length;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4 min-h-screen bg-gray-50/20">
      {/* Attendance Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
         <div className="flex items-center gap-6">
            <Link href={`/teacher/classes/${params.id}`}>
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-lns-navy h-12 w-12 border border-gray-100 bg-white">
                  <ArrowLeft size={24} />
               </Button>
            </Link>
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-lns-navy flex items-center justify-center text-white text-2xl font-black shadow-xl">
                  <Scan size={32} />
               </div>
               <div className="space-y-1">
                  <h1 className="text-3xl font-[900] text-lns-navy tracking-tighter leading-none italic uppercase">Institutional Register Execution</h1>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey italic">{cohort.name} • {cohort.id} • Terminal Scan Mode Active</p>
               </div>
            </div>
         </div>

         <div className="flex items-center bg-white p-2 rounded-2xl border border-gray-100 shadow-xl shadow-navy-600/5">
            <Button variant="ghost" className="h-10 px-6 rounded-xl text-[9px] font-black uppercase hover:bg-gray-50 text-lns-navy flex items-center gap-2">
               <Monitor size={16} />
               Overhead Projection
            </Button>
            <div className="h-6 w-px bg-gray-100 mx-2" />
            <Button variant="ghost" className="h-10 px-6 rounded-xl text-[9px] font-black uppercase bg-lns-navy text-white hover:bg-lns-red shadow-lg shadow-navy-600/10">
               Manual Node Override
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
         {/* Sidebar Summary (25%) */}
         <div className="space-y-8 order-2 lg:order-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic">Registry Real-time Pulse</h3>
            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Detected Present", val: presentCount, total: myStudents.length, color: "text-green-500", bg: "bg-green-50" },
                    { label: "Detected Late", val: lateCount, total: myStudents.length, color: "text-amber-500", bg: "bg-amber-50" },
                    { label: "Detected Absent", val: absentCount, total: myStudents.length, color: "text-lns-red", bg: "bg-red-50" },
                  ].map((stat, i) => (
                    <div key={i} className={cn("p-6 rounded-[1.5rem] flex items-center justify-between border border-transparent shadow-sm", stat.bg)}>
                       <div className="space-y-1">
                          <p className={cn("text-xs font-black uppercase tracking-widest leading-none", stat.color)}>{stat.label}</p>
                          <p className="text-2xl font-black text-lns-navy italic">{stat.val}<span className="text-sm opacity-30"> / {stat.total}</span></p>
                       </div>
                       <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]", stat.color === "text-green-500" ? "bg-green-500" : stat.color === "text-amber-500" ? "bg-amber-500" : "bg-lns-red")} />
                    </div>
                  ))}
               </div>
               
               <div className="pt-6 border-t border-gray-50 flex flex-col gap-4">
                  <Button 
                    onClick={() => setIsSyncing(true)}
                    disabled={isSyncing}
                    className="h-16 bg-lns-navy text-white hover:bg-lns-red rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-navy-600/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                     {isSyncing ? "Synchronizing Asset Ledger..." : "Commit Registry Asset"}
                     {!isSyncing && <Save size={22} />}
                  </Button>
                  <Button variant="ghost" className="h-12 w-full rounded-xl text-[9px] font-black uppercase tracking-widest text-lns-mid-grey hover:bg-gray-100 flex items-center justify-center gap-2">
                     <AlertCircle size={16} />
                     Flag Terminal Latency
                  </Button>
               </div>
            </Card>

            <div className="p-6 bg-lns-red/5 rounded-2xl border-2 border-dashed border-lns-red/20 flex flex-col items-center gap-4 text-center">
               <Activity size={32} className="text-lns-red" />
               <p className="text-[10px] font-black uppercase tracking-widest text-lns-red italic">Node integrity verification active. Every scan is hashed and stored within the institutional broadcast vault.</p>
            </div>
         </div>

         {/* Register Execution Area (75%) */}
         <div className="lg:col-span-3 space-y-8 order-1 lg:order-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic">Individual Student Identification</h3>
            <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
               <div className="divide-y divide-gray-50">
                  {myStudents.map((student) => {
                    const status = attendance[student.id] || null;
                    return (
                      <div key={student.id} className={cn(
                        "p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all group overflow-hidden relative",
                        status === 'present' ? "bg-green-50/30" : status === 'late' ? "bg-amber-50/30" : status === 'absent' ? "bg-red-50/30" : "hover:bg-gray-50"
                      )}>
                         <div className="flex items-center gap-6 relative z-10">
                            <div className={cn(
                              "w-16 h-16 rounded-[1.2rem] flex items-center justify-center text-2xl font-black shadow-xl transition-all",
                              status === 'present' ? "bg-green-500 text-white" : 
                              status === 'late' ? "bg-amber-500 text-white" : 
                              status === 'absent' ? "bg-lns-red text-white" : 
                              "bg-lns-navy text-white group-hover:bg-lns-red"
                            )}>
                               {student.name.charAt(0)}
                            </div>
                            <div className="space-y-1">
                               <h4 className="text-xl font-black text-lns-navy group-hover:text-lns-red transition-all italic tracking-tight">{student.name}</h4>
                               <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic tracking-tight leading-none uppercase">{student.idNumber} • Latency Avg: 0.2%</p>
                            </div>
                         </div>

                         {/* Status Toggles */}
                         <div className="grid grid-cols-3 gap-3 relative z-10 md:w-auto w-full">
                            <button
                              onClick={() => toggleStatus(student.id, 'present')}
                              className={cn(
                                "h-14 md:w-28 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-sm flex items-center justify-center gap-2",
                                status === 'present' ? "bg-green-500 text-white shadow-green-600/20" : "bg-gray-50 text-lns-mid-grey hover:bg-green-50 hover:text-green-600"
                              )}
                            >
                               <CheckCircle2 size={16} />
                               Present
                            </button>
                            <button
                              onClick={() => toggleStatus(student.id, 'late')}
                              className={cn(
                                "h-14 md:w-28 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-sm flex items-center justify-center gap-2",
                                status === 'late' ? "bg-amber-500 text-white shadow-amber-600/20" : "bg-gray-50 text-lns-mid-grey hover:bg-amber-50 hover:text-amber-500"
                              )}
                            >
                               <Clock size={16} />
                               Late
                            </button>
                            <button
                              onClick={() => toggleStatus(student.id, 'absent')}
                              className={cn(
                                "h-14 md:w-28 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-sm flex items-center justify-center gap-2",
                                status === 'absent' ? "bg-lns-red text-white shadow-red-600/20" : "bg-gray-50 text-lns-mid-grey hover:bg-red-50 hover:text-lns-red"
                              )}
                            >
                               <AlertCircle size={16} />
                               Absent
                            </button>
                         </div>
                         
                         {/* Authority Marker */}
                         <div className="absolute top-1/2 -translate-y-1/2 -right-4 h-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical size={20} className="text-gray-200" />
                         </div>
                      </div>
                    );
                  })}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
