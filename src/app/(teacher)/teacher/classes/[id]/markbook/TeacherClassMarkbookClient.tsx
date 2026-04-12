"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS, SUBJECTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  Download, 
  Save, 
  Search, 
  Settings, 
  ChevronRight, 
  ShieldCheck, 
  TrendingUp, 
  Activity,
  Plus,
  BookOpen,
  Filter
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const COHORTS = [
  { id: '10a-eng', name: 'Grade 10-A English Lit', count: 32, room: 'Room 4B', time: '09:00 - 10:30', days: 'Mon, Wed, Fri', performance: 84.5, attendance: 97.2 },
  { id: '10b-eng', name: 'Grade 10-B English Lit', count: 28, room: 'Room 2C', time: '11:00 - 12:30', days: 'Tue, Thu', performance: 78.1, attendance: 94.8 },
  { id: '11a-comm', name: 'Grade 11-A Communication', count: 24, room: 'Theatre II', time: '14:00 - 15:30', days: 'Mon, Wed', performance: 91.2, attendance: 98.4 },
];

}

export default function TeacherClassMarkbookClient({ params }: { params: { id: string } }) {
  const cohort = COHORTS.find(c => c.id === params.id) || COHORTS[0];
  const myStudents = PLACEHOLDER_STUDENTS.filter(s => s.class === cohort.id || cohort.id.includes(s.class.toLowerCase().replace(' ', ''))); 
  const [isSyncing, setIsSyncing] = React.useState(false);

  const assessments = [
    { name: "HW 1", category: "Comm", weight: "20%" },
    { name: "Quiz A", category: "Logic", weight: "25%" },
    { name: "Midterm", category: "Theor", weight: "30%" },
    { name: "Final", category: "App", weight: "25%" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4 min-h-screen bg-white">
      {/* Markbook Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100 sticky top-0 bg-white z-50">
         <div className="flex items-center gap-6">
            <Link href={`/teacher/classes/${params.id}`}>
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-lns-navy h-12 w-12 border border-gray-100 bg-white shadow-sm">
                  <ArrowLeft size={24} />
               </Button>
            </Link>
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-lns-navy flex items-center justify-center text-white text-2xl font-black shadow-xl">
                  <BookOpen size={32} />
               </div>
               <div className="space-y-1">
                  <h1 className="text-3xl font-[900] text-lns-navy tracking-tighter leading-none italic uppercase">Performance Markbook Ledger</h1>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey italic">{cohort.name} • {cohort.id} • Authority Mode Verified</p>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <Button variant="ghost" className="h-14 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest text-lns-mid-grey bg-gray-50 hover:bg-white border border-gray-100 shadow-sm flex items-center gap-2">
               <Download size={20} />
               Export Node
            </Button>
            <Button 
               onClick={() => setIsSyncing(true)}
               disabled={isSyncing}
               className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-12 font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3"
            >
               {isSyncing ? "Committing Ledger..." : "Submit to High Authority"}
               {!isSyncing && <Save size={22} />}
            </Button>
         </div>
      </div>

      {/* Grid Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
         {[
           { label: "Weight Stability", val: "100%", icon: ShieldCheck, color: "text-green-500" },
           { label: "Avg Resonance", val: "84.2%", icon: TrendingUp, color: "text-lns-navy" },
           { label: "Active Assessments", val: "4 Node", icon: Activity, color: "text-amber-500" },
           { label: "Registry Sync", val: "Live", icon: Settings, color: "text-blue-500" },
         ].map((stat, i) => (
           <div key={i} className="flex items-center justify-between p-6 bg-white rounded-3xl border border-gray-100 shadow-sm group hover:border-lns-red/20 transition-all cursor-default relative overflow-hidden">
              <div className="space-y-1 relative z-10">
                 <p className={cn("text-[8px] font-black uppercase tracking-widest leading-none", stat.color)}>{stat.label}</p>
                 <p className="text-xl font-black text-lns-navy italic">{stat.val}</p>
              </div>
              <div className={cn("p-2 rounded-xl group-hover:scale-110 transition-transform relative z-10", stat.color)}>
                 <stat.icon size={20} />
              </div>
           </div>
         ))}
      </div>

      {/* Main Table Area */}
      <Card className="border-none shadow-[0_30px_60px_rgba(0,0,0,0.06)] bg-white rounded-[3rem] overflow-hidden">
         <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
               <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy italic leading-none">Cohort Asset Matrix</h3>
            </div>
            <div className="flex items-center gap-3">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-lns-mid-grey group-focus-within:text-lns-red transition-colors" size={16} />
                  <input placeholder="Search node..." className="h-11 w-64 bg-gray-50 rounded-[1rem] border border-gray-100 pl-11 pr-4 text-[10px] font-black placeholder:text-gray-300 outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner" />
               </div>
               <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-gray-50 border border-gray-100 hover:text-lns-red">
                  <Plus size={20} />
               </Button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-white">
                     <th className="sticky left-0 z-10 bg-white/95 backdrop-blur-sm px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy border-r border-gray-50">Asset Node</th>
                     {assessments.map((a) => (
                        <th key={a.name} className="px-10 py-6 group/th cursor-pointer hover:bg-gray-50 transition-all border-r border-gray-50/50">
                           <div className="flex flex-col items-center gap-2">
                              <p className="text-xs font-black text-lns-navy tracking-tight">{a.name}</p>
                              <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-lns-mid-grey leading-none">
                                 {a.category} • <span className="text-lns-red">{a.weight}</span>
                              </div>
                           </div>
                        </th>
                     ))}
                     <th className="px-10 py-6 text-center bg-lns-navy/5 border-l-2 border-lns-navy/10 relative overflow-hidden">
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-lns-navy opacity-20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy">Final Grade</span>
                     </th>
                     <th className="px-10 py-6 text-center italic text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Verification</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {myStudents.map((student, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-all group">
                       <td className="sticky left-0 z-10 bg-white/95 backdrop-blur-sm group-hover:bg-gray-50/95 px-10 py-8 border-r border-gray-50 flex items-center gap-5">
                          <div className="w-10 h-10 rounded-xl bg-lns-navy text-white flex items-center justify-center text-xs font-black shadow-lg group-hover:bg-lns-red transition-all">
                             {student.name.charAt(0)}
                          </div>
                          <div>
                             <p className="text-sm font-black text-lns-navy group-hover:text-lns-red transition-all italic leading-tight">{student.name}</p>
                             <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey italic leading-none">{student.idNumber}</p>
                          </div>
                       </td>
                       {assessments.map((a, sIdx) => {
                         const score = 75 + Math.floor(Math.random() * 25);
                         return (
                           <td key={sIdx} className="px-10 py-8 text-center border-r border-gray-50/50">
                              <input 
                                defaultValue={score}
                                className={cn(
                                  "w-20 h-12 bg-gray-50 rounded-2xl text-center text-sm font-black text-lns-navy border border-gray-100 outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 focus:border-lns-red/10 transition-all shadow-inner",
                                  score >= 90 ? "text-green-600" : score >= 80 ? "text-lns-navy" : "text-amber-500"
                                )}
                              />
                           </td>
                         );
                       })}
                       <td className="px-10 py-8 text-center bg-lns-navy/5 border-l-2 border-lns-navy/10">
                          <div className="flex flex-col items-center gap-1">
                             <span className="text-2xl font-black text-lns-navy italic">A</span>
                             <span className="text-[8px] font-black uppercase text-blue-500 tracking-widest">Calculated</span>
                          </div>
                       </td>
                       <td className="px-10 py-8 text-center">
                          <div className="flex items-center justify-center gap-2 text-green-500 opacity-30 group-hover:opacity-100 transition-opacity">
                             <ShieldCheck size={20} />
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>

      {/* Footer Info */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-gray-100 px-6">
         <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
               <div className="w-3 h-3 bg-green-500 rounded-full" />
               <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic">High Performance Resonance</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-3 h-3 bg-amber-500 rounded-full" />
               <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic">Moderate Performance Delta</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-3 h-3 bg-lns-red rounded-full" />
               <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic">Critical Academic Priority</span>
            </div>
         </div>
         <p className="text-[10px] font-black text-slate-300 italic uppercase">LNS OS Grade Ledger v1.4.2 • Authority Session: sarah_jenkins_772</p>
      </div>
    </div>
  );
}
