"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  TrendingUp,
  ShieldCheck,
  Download
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ChildAttendanceClient({ params }: { params: { studentId: string } }) {
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.studentId) || PLACEHOLDER_STUDENTS[0];

  const summary = [
    { label: "On Time", value: "94.2%", icon: CheckCircle2, color: "text-green-500" },
    { label: "Lateness", value: "3 Units", icon: Clock, color: "text-amber-500" },
    { label: "Absences", value: "1 Unit", icon: AlertCircle, color: "text-lns-red" },
    { label: "Power Score", value: student.powerScore, icon: Zap, color: "text-lns-navy" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href={`/parent/child/${params.studentId}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Child Profile
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <ShieldCheck size={32} className="text-green-500" />
               Attendance Verification Ledger
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic">{student.name} • Term 2 Cycle</p>
         </div>

         <div className="flex flex-col items-end">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey mb-2">Registry Health</div>
            <div className="bg-white border-2 border-green-500 p-4 rounded-3xl flex items-center gap-4 shadow-xl shadow-green-600/10 group cursor-default">
               <div className="text-3xl font-black text-green-600 italic">98.4%</div>
               <div className="h-8 w-px bg-green-100" />
               <div className="text-right">
                  <p className="text-[8px] font-black text-green-600 uppercase tracking-widest leading-none">Status</p>
                  <p className="text-lg font-black text-lns-navy leading-none uppercase italic">Stable</p>
               </div>
            </div>
         </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {summary.map((stat, i) => (
           <Card key={i} className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-4 hover:translate-y-[-4px] transition-transform">
              <div className="flex items-center justify-between">
                 <div className={cn("p-3 rounded-2xl bg-gray-50", stat.color)}>
                    <stat.icon size={20} />
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic">Real-time Node</div>
              </div>
              <div>
                 <p className="text-3xl font-[900] text-lns-navy tracking-tighter">{stat.value}</p>
                 <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Monthly Calendar View */}
         <Card className="lg:col-span-2 p-8 border-none shadow-xl bg-white rounded-[3rem] space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-gray-50">
               <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy">Monthly Attendance Record</h3>
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
                  <div className="flex items-center gap-2">
                     <Calendar size={14} />
                     April 2026
                  </div>
                  <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                  <div className="flex items-center gap-1">
                     <TrendingUp size={14} className="text-green-500" />
                     +1.2% Improvement
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-7 gap-4">
               {["M", "T", "W", "T", "F", "S", "S"].map(day => (
                 <div key={day} className="text-center text-[10px] font-black text-lns-navy/30 uppercase tracking-[0.3em] pb-4">{day}</div>
               ))}
               {Array.from({ length: 30 }).map((_, i) => {
                 const day = i + 1;
                 const type = day < 6 ? 'present' : day === 6 ? 'late' : day === 15 ? 'absent' : day > 18 ? 'pending' : 'present';
                 return (
                   <div key={i} className="aspect-square flex flex-col items-center justify-center rounded-2xl border-2 border-gray-50 bg-gray-50/20 group hover:border-lns-navy/10 transition-all cursor-pointer relative overflow-hidden">
                      {/* Day Label */}
                      <span className="text-xs font-bold text-lns-navy z-10">{day}</span>
                      {/* Status Dot */}
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-1.5 z-10",
                        type === 'present' ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" :
                        type === 'late' ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" :
                        type === 'absent' ? "bg-lns-red shadow-[0_0_10px_rgba(214,43,43,0.5)]" :
                        "bg-gray-200"
                      )} />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-lns-navy opacity-0 group-hover:opacity-5 transition-opacity" />
                   </div>
                 );
               })}
            </div>
         </Card>

         {/* Right Sidebar */}
         <div className="space-y-6">
            <Card className="p-8 border-none shadow-xl bg-lns-navy text-white rounded-2xl space-y-6">
               <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Institutional Duty</p>
                  <h4 className="text-lg font-black tracking-tight italic uppercase">Marked Present</h4>
               </div>
               <div className="space-y-4">
                  {[
                    { node: "Block B, R202", time: "09:15 AM", subject: "Math 7A" },
                    { node: "Block A, L104", time: "11:20 AM", subject: "English 7A" },
                    { node: "Arena III", time: "14:05 PM", subject: "Sport Sci" },
                  ].map((node, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group cursor-default">
                       <div className="space-y-0.5">
                          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">{node.time} • {node.node}</p>
                          <p className="text-xs font-bold">{node.subject}</p>
                       </div>
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-white/20 group-hover:text-green-500">
                          <ShieldCheck size={16} />
                       </Button>
                    </div>
                  ))}
               </div>
               <Link href={`/parent/messages/new?subject=Attendance Variance: ${student.name}`} className="block">
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl h-12 text-[10px] font-black uppercase tracking-widest border border-white/10">
                    Query Attendance Variance
                  </Button>
               </Link>
            </Card>

            <Card className="p-8 border-none shadow-sm bg-gray-50/50 rounded-2xl space-y-4">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase text-lns-navy/40 italic">
                  <Download size={14} className="text-lns-red" />
                  Institutional Export
               </div>
               <p className="text-[10px] leading-relaxed text-lns-mid-grey">
                  Export the full attendance matrix and terminal scan logs for government and legal compliance.
               </p>
               <Button variant="ghost" className="w-full h-10 bg-white border border-gray-100 rounded-xl text-[9px] font-black uppercase tracking-widest">Generate Terminal PDF</Button>
            </Card>
         </div>
      </div>
    </div>
  );
}
