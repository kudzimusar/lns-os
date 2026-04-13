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
  ChevronRight, 
  ShieldCheck, 
  Save, 
  Search,
  Plus,
  TrendingUp,
  FileText,
  Filter
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ASSIGNMENTS = [
  { id: '1', title: "Modernist Poetry Analysis", category: "Communications", dueDate: "Tomorrow, 4 PM", submissions: 24, total: 32, marked: 12, avg: 82, high: 98, status: "Active" },
];

export default function TeacherAssignmentSubmissionsClient({ params }: { params: { id: string } }) {
  const assignment = ASSIGNMENTS.find(a => a.id === params.id) || ASSIGNMENTS[0];
  const progress = Math.round((assignment.submissions / assignment.total) * 100);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100">
         <div className="flex items-center gap-6">
            <Link href={`/teacher/assignments/${params.id}`}>
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-lns-navy h-12 w-12 border border-gray-100 bg-white shadow-sm">
                  <ArrowLeft size={24} />
               </Button>
            </Link>
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-lns-navy flex items-center justify-center text-white text-2xl font-black shadow-xl">
                  <Users size={32} />
               </div>
               <div className="space-y-1">
                  <h1 className="text-3xl font-[900] text-lns-navy tracking-tighter leading-none italic uppercase">Institutional Submission Registry</h1>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey italic">{assignment.title} • Term 2 Cycle</p>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <Button variant="ghost" className="h-14 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest text-lns-mid-grey bg-gray-50 hover:bg-white border border-gray-100 shadow-sm flex items-center gap-2">
               Download Matrix
            </Button>
            <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3">
               Release All Grades
               <ShieldCheck size={20} />
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Main List (75%) */}
         <div className="lg:col-span-3 space-y-8">
            <Card className="p-10 border-none shadow-2xl bg-white rounded-[3rem] space-y-10 relative overflow-hidden group">
               <div className="space-y-4">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-lns-navy italic">
                     <span>Deployment Progress</span>
                     <span className="text-lns-red">{assignment.submissions} / {assignment.total} Assets Synchronized</span>
                  </div>
                  <div className="h-3 w-full bg-gray-100/50 rounded-full overflow-hidden border border-gray-100/10">
                     <div 
                        className="h-full bg-lns-navy transition-all duration-1000 shadow-[0_0_20px_rgba(10,31,68,0.3)]" 
                        style={{ width: `${progress}%` }} 
                     />
                  </div>
               </div>

               <div className="flex items-center justify-between border-b border-gray-50 pb-6 pt-4">
                  <div className="flex items-center gap-10">
                     <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey hover:text-lns-navy transition-all cursor-pointer">
                        <Filter size={14} /> Filter: All Nodes
                     </div>
                     <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-300">
                        Sort: Academic Rank
                     </div>
                  </div>
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                     <input placeholder="Locate node..." className="h-10 w-48 bg-gray-50 rounded-xl px-10 text-[10px] font-black outline-none border border-transparent focus:border-lns-navy/20 transition-all shadow-inner" />
                  </div>
               </div>

               <div className="divide-y divide-gray-50">
                  {PLACEHOLDER_STUDENTS.slice(0, 15).map((student, idx) => {
                     const status = idx < 5 ? 'Marked' : idx < 12 ? 'Submitted' : 'Pending';
                     return (
                       <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-all group cursor-pointer border-l-4 border-transparent hover:border-lns-red">
                          <div className="flex items-center gap-6">
                             <div className="w-12 h-12 rounded-xl bg-lns-navy/5 text-lns-navy flex items-center justify-center text-lg font-black shadow-inner group-hover:bg-lns-navy group-hover:text-white transition-all">
                                {student.name.charAt(0)}
                             </div>
                             <div>
                                <h4 className="text-lg font-black text-lns-navy group-hover:text-lns-red transition-all italic leading-tight">{student.name}</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mt-1 leading-none">{student.idNumber} • Latency: 0.2%</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-10">
                             <div className="text-right">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Received Sync</p>
                                <p className="text-xs font-black text-lns-navy uppercase">10:24 AM</p>
                             </div>
                             <div className={cn(
                               "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest italic border",
                               status === 'Marked' ? "bg-green-50 text-green-600 border-green-100" :
                               status === 'Submitted' ? "bg-blue-50 text-blue-600 border-blue-100" :
                               "bg-red-50 text-lns-red border-red-100"
                             )}>
                                {status}
                             </div>
                             <Link href={`/teacher/assignments/${params.id}/submissions/${student.id}`}>
                                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all shadow-sm">
                                   <ChevronRight size={20} className="text-lns-navy" />
                                </Button>
                             </Link>
                          </div>
                       </div>
                     );
                  })}
               </div>
            </Card>
         </div>

         {/* Sidebar Intel (25%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Faculty Briefing</p>
                     <h4 className="text-2xl font-black italic uppercase leading-none tracking-tight">Deployment Pulse</h4>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2 text-center">
                        <p className="text-5xl font-black tracking-tighter text-white italic">{progress}%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Synchrony</p>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "12 assets remain uninitialized. Deployment latency expected in the final 24 cycles of the assessment timeline."
                     </p>
                  </div>
               </div>
               <TrendingUp className="absolute -top-10 -left-10 text-white/5 w-80 h-80 pointer-events-none group-hover:scale-125 transition-transform" />
            </Card>

            <div className="p-6 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200 space-y-2 text-center">
               <AlertCircle size={28} className="text-amber-500 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-amber-900 italic">Warning: Assessment submission window closes in 24 hours.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
