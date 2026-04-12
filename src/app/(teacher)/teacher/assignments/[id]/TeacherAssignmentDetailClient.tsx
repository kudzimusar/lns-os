"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  FileText, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Clock, 
  ChevronRight, 
  MoreVertical,
  Activity,
  Plus,
  Edit2,
  Share2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ASSIGNMENTS = [
  { id: '1', title: "Modernist Poetry Analysis", category: "Communications", dueDate: "Tomorrow, 4 PM", submissions: 24, total: 32, marked: 12, avg: 82, high: 98, status: "Active" },
  { id: '2', title: "Creative Writing: Flash Fiction", category: "Writing", dueDate: "14 Apr", submissions: 32, total: 32, marked: 32, avg: 76, high: 94, status: "Closed" },
  { id: '3', title: "Grammar & Syntax Quiz", category: "Logic", dueDate: "In 3 days", submissions: 0, total: 32, marked: 0, avg: 0, high: 0, status: "Draft" },
  { id: '4', title: "IB MYP: Criterion A Project", category: "IB Core", dueDate: "20 Apr", submissions: 5, total: 32, marked: 0, avg: 0, high: 0, status: "Active" },
];

export default function TeacherAssignmentDetailClient({ params }: { params: { id: string } }) {
  const assignment = ASSIGNMENTS.find(a => a.id === params.id) || ASSIGNMENTS[0];

  const stats = [
    { label: "Submissions", val: `${assignment.submissions}/${assignment.total}`, icon: Users, color: "text-lns-navy" },
    { label: "Marked Delay", val: `${assignment.marked} Nodes`, icon: CheckCircle2, color: "text-green-500" },
    { label: "Avg Resonance", val: `${assignment.avg}%`, icon: TrendingUp, color: "text-blue-500" },
    { label: "High Master", val: `${assignment.high}%`, icon: Award, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
         <div className="flex items-center gap-6">
            <Link href="/teacher/assignments">
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-lns-navy h-12 w-12 border border-gray-100 bg-white">
                  <ArrowLeft size={24} />
               </Button>
            </Link>
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-lns-navy flex items-center justify-center text-white text-2xl font-black shadow-xl">
                  <FileText size={32} />
               </div>
               <div className="space-y-1">
                  <h1 className="text-3xl font-[900] text-lns-navy tracking-tighter leading-none italic uppercase">{assignment.title}</h1>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey italic">{assignment.category} • Due: {assignment.dueDate}</p>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <Button variant="outline" className="h-14 bg-white text-lns-navy border-gray-100 rounded-2xl px-6 font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center gap-2">
               <Edit2 size={18} />
               Modify Asset
            </Button>
            <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3">
               <Plus size={18} />
               Deploy Reminder
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
           <Card key={i} className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-4 hover:translate-y-[-4px] transition-transform">
              <div className="flex items-center justify-between">
                 <div className={cn("p-3 rounded-2xl bg-gray-50", stat.color)}>
                    <stat.icon size={22} />
                 </div>
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              </div>
              <p className="text-3xl font-[900] text-lns-navy tracking-tighter italic">{stat.val}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey mt-1">{stat.label}</p>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Submission List (66%) */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-4">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy italic">Asset Submissions</h3>
               <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black text-lns-mid-grey uppercase">Filter: All Nodes</span>
                  <Plus size={14} className="text-gray-300" />
               </div>
            </div>
            
            <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
               <div className="divide-y divide-gray-50">
                  {PLACEHOLDER_STUDENTS.slice(0, 10).map((student, idx) => {
                    const status = idx < 5 ? 'Marked' : idx < 8 ? 'Submitted' : 'Pending';
                    return (
                      <div key={idx} className="p-8 flex items-center justify-between hover:bg-gray-50 transition-all group cursor-pointer relative">
                         <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-xl bg-lns-navy/5 text-lns-navy flex items-center justify-center text-lg font-black shadow-inner group-hover:bg-lns-navy group-hover:text-white transition-all">
                               {student.name.charAt(0)}
                            </div>
                            <div>
                               <h4 className="text-lg font-black text-lns-navy group-hover:text-lns-red transition-all italic leading-tight">{student.name}</h4>
                               <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic mt-1 leading-none">{student.idNumber} • Latency: 0s</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-8">
                            <div className={cn(
                              "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic border",
                              status === 'Marked' ? "bg-green-50 text-green-600 border-green-100" :
                              status === 'Submitted' ? "bg-blue-50 text-blue-600 border-blue-100" :
                              "bg-red-50 text-lns-red border-red-100"
                            )}>
                               {status}
                            </div>
                            <Link href={`/teacher/assignments/${params.id}/marking?student=${student.id}`}>
                               <Button variant="ghost" className="h-11 px-6 bg-gray-50 hover:bg-lns-navy hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-sm">
                                  {status === 'Marked' ? 'Review Mark' : 'Execute Marking'}
                                  <ChevronRight size={14} className="ml-2" />
                                </Button>
                            </Link>
                         </div>
                      </div>
                    );
                  })}
               </div>
               <Button variant="ghost" className="w-full h-14 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey hover:bg-lns-navy hover:text-white transition-all rounded-none border-t border-gray-100">
                  Load Full Cohort Asset List
               </Button>
            </Card>
         </div>

         {/* Right Sidebar - Analytics */}
         <div className="space-y-8">
            <Card className="p-10 border-none shadow-2xl bg-lns-navy text-white rounded-[3rem] space-y-10 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Institutional Intel (AI)</p>
                     <h4 className="text-2xl font-black tracking-tight italic uppercase leading-none">Assignment Synthesis</h4>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                           <span>Submission Resonance</span>
                           <span>75%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-lns-red w-[75%] shadow-[0_0_10px_rgba(214,43,43,1)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "High resonance detected in creative modules. Suggest immediate deployment of feedback to late-submission nodes."
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Security Protocol</h3>
                  <ShieldCheck size={18} className="text-green-500" />
               </div>
               <p className="text-[10px] leading-relaxed italic text-lns-mid-grey">
                  Every marked asset is cryptographically sealed and synchronized with the high-authority grade ledger.
               </p>
               <Button variant="ghost" className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl text-[9px] font-black uppercase tracking-widest hover:text-lns-navy">
                  View Audit Vault
               </Button>
            </Card>

            <div className="p-6 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200 flex items-center gap-4">
               <AlertCircle size={24} className="text-amber-500" />
               <div className="space-y-0.5">
                  <p className="text-[10px] font-black text-amber-900 uppercase">Latency Risk</p>
                  <p className="text-[9px] font-bold text-amber-900/60 uppercase">8 nodes have not yet initialized their submission cycle.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
