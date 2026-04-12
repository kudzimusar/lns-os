"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  MoreVertical,
  Activity,
  Scan,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    id: s.id,
  }));
}

export default function TeacherStudentAttendancePage({ params }: { params: { id: string } }) {
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.id) || PLACEHOLDER_STUDENTS[0];
  const [viewedMonth, setViewedMonth] = React.useState("April 2026");

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href={`/teacher/students/${params.id}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Student Profile
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Calendar size={32} className="text-lns-red" />
               Attendance Timeline Sync
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">{student.name} • Registry Audit v1.4.2</p>
         </div>

         <div className="flex items-center bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-inner">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-lns-navy hover:bg-white rounded-xl">
               <ChevronLeft size={18} />
            </Button>
            <span className="px-6 text-[10px] font-black uppercase tracking-widest text-lns-navy">{viewedMonth}</span>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-lns-navy hover:bg-white rounded-xl">
               <ChevronRight size={18} />
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Calendar Grid (75%) */}
         <div className="lg:col-span-3 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic">Registry Synchronization Matrix</h3>
            <Card className="p-8 border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
               <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                    <div key={d} className="bg-gray-50 p-4 text-center text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">{d}</div>
                  ))}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const isLate = [5, 18].includes(day);
                    const isAbsent = [10].includes(day);
                    const isPresent = day < 22 && !isLate && !isAbsent && day !== 6 && day !== 7 && day !== 13 && day !== 14 && day !== 20 && day !== 21;
                    
                    return (
                      <div key={i} className={cn(
                        "bg-white aspect-square p-2 border-b border-r border-gray-50 group hover:bg-gray-50 transition-all cursor-pointer relative",
                        isPresent ? "bg-green-50/20" : isLate ? "bg-amber-50/20" : isAbsent ? "bg-red-50/20" : ""
                      )}>
                        <span className={cn(
                          "text-[10px] font-black p-1 block text-right",
                          isPresent ? "text-green-600" : isLate ? "text-amber-500" : isAbsent ? "text-lns-red" : "text-slate-300"
                        )}>{day}</span>
                        {(isPresent || isLate || isAbsent) && (
                          <div className={cn(
                            "absolute inset-x-2 bottom-2 h-1 rounded-full",
                            isPresent ? "bg-green-500" : isLate ? "bg-amber-500" : "bg-lns-red"
                          )} />
                        )}
                      </div>
                    );
                  })}
               </div>
            </Card>

            <Card className="p-10 border-none shadow-lg bg-gray-50/50 rounded-2xl flex flex-wrap items-center justify-around gap-8">
               {[
                 { label: "Authorized Presence", val: "94%", color: "text-green-600", icon: CheckCircle2 },
                 { label: "Session Latency", val: "2 Days", color: "text-amber-500", icon: Clock },
                 { label: "Registry Conflict", val: "1 Day", color: "text-lns-red", icon: AlertCircle },
               ].map((stat, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <stat.icon size={24} className={stat.color} />
                    <div>
                       <p className="text-xl font-black text-lns-navy italic tracking-tight">{stat.val}</p>
                       <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey">{stat.label}</p>
                    </div>
                 </div>
               ))}
            </Card>
         </div>

         {/* Sidebar Tools (25%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Audit Synopsis</p>
                     <h4 className="text-2xl font-black italic uppercase leading-none tracking-tight">Timeline Fidelity</h4>
                  </div>
                  <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                    "Node {student.name.split(' ')[0]} exhibits 94.2% resonance. Latency detected at cycle 18 due to transportation lag."
                  </p>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy border-b border-gray-50 pb-4 italic">Registry Actions</h3>
               <div className="space-y-3">
                  <Button className="w-full h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 active:scale-95 transition-all">
                     <Scan size={18} />
                     Manual Overwrite
                  </Button>
                  <Button variant="outline" className="w-full h-14 border-gray-100 rounded-2xl font-black uppercase tracking-widest text-[10px] text-lns-mid-grey hover:bg-gray-50 flex items-center justify-center gap-2">
                     <ShieldCheck size={18} />
                     Commit To Audit
                  </Button>
               </div>
            </Card>

            <div className="p-6 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200 text-center space-y-2">
               <AlertCircle size={28} className="text-amber-500 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-amber-900 italic">Warning: Manual overrides are permanent and cryptographically signed.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
