"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS, MESSAGE_THREADS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Award, 
  Clock, 
  MessageCircle,
  FileText,
  ChevronRight,
  Activity,
  Zap,
  Star,
  AlertCircle,
  MoreVertical,
  History,
  Mail
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function StudentProfileClient({ params }: { params: { id: string } }) {
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.id) || PLACEHOLDER_STUDENTS[0];

  const stats = [
    { label: "Grade Index", value: `${student.powerScore}%`, icon: Zap, color: "text-lns-navy" },
    { label: "Attendance", value: "98.4%", icon: Clock, color: "text-green-500" },
    { label: "Merits Earned", value: "450", icon: Award, color: "text-lns-red" },
    { label: "Citizenship", value: student.citizenship, icon: ShieldCheck, color: "text-green-600" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="flex items-center gap-6">
            <Link href="/teacher/students">
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-lns-navy h-12 w-12 border border-gray-100">
                  <ArrowLeft size={24} />
               </Button>
            </Link>
            <div className="flex items-center gap-6">
               <div className="w-24 h-24 rounded-[2rem] bg-lns-navy flex items-center justify-center text-white text-4xl font-black shadow-2xl relative group">
                  {student.name.charAt(0)}
                  <div className="absolute inset-0 bg-lns-red opacity-0 group-hover:opacity-20 rounded-[2rem] transition-opacity cursor-pointer" />
               </div>
               <div className="space-y-1">
                  <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-none">{student.name}</h1>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey italic">{student.class} • {student.idNumber} • Institutional Record</p>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <Link href={`/teacher/messages/new?to=${student.id}`}>
               <Button variant="outline" className="h-14 bg-white text-lns-navy hover:bg-gray-50 border-gray-100 rounded-2xl px-8 font-black uppercase tracking-widest text-[10px] transition-all shadow-sm flex items-center gap-2">
                  <Mail size={18} />
                  Contact Guardian
               </Button>
            </Link>
            <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-2">
               <Star size={18} />
               Submit Merit
            </Button>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
           <Card key={i} className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-4 hover:translate-y-[-4px] transition-transform group">
              <div className="flex items-center justify-between">
                 <div className={cn("p-3 rounded-2xl bg-gray-50 transition-all", stat.color)}>
                    <stat.icon size={20} />
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic">Global Delta</div>
              </div>
              <div>
                 <p className="text-3xl font-[900] text-lns-navy tracking-tighter">{stat.value}</p>
                 <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Content Column */}
         <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 border-none shadow-sm bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy">Refinement Trajectory</h3>
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
                     <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp size={14} />
                        +4.2% Growth
                     </div>
                  </div>
               </div>
               {/* Simple Graph Placeholder */}
               <div className="h-48 w-full bg-gray-50 rounded-[2rem] flex items-end justify-around p-8 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                     <TrendingUp size={120} className="text-lns-navy" />
                  </div>
                  {[60, 45, 78, 82, 94].map((v, i) => (
                    <div key={i} className="w-10 bg-lns-navy/10 rounded-t-xl transition-all hover:bg-lns-red" style={{ height: `${v}%` }}>
                       <div className="w-full h-1 bg-lns-navy rounded-full mt-[-4px]" />
                    </div>
                  ))}
               </div>
            </Card>

            {/* Assessment History */}
            <div className="space-y-4">
               <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy px-4 flex items-center gap-2 italic">
                  <Activity size={16} />
                  Academic Assessment Cycle
               </h3>
               <Card className="border-none shadow-xl bg-white rounded-2xl overflow-hidden">
                  <div className="divide-y divide-gray-50">
                     {[
                       { name: 'Unit 1 Assessment', subject: 'Math 10A', score: '92/100', status: 'Graded', date: 'Apr 10', icon: Zap, color: 'text-lns-navy' },
                       { name: 'Hamlet Essay Draft', subject: 'English 10A', score: 'Pending', status: 'In Review', date: 'Apr 08', icon: FileText, color: 'text-lns-red' },
                       { name: 'Quantum Project', subject: 'Science 10B', score: '88/100', status: 'Graded', date: 'Mar 25', icon: Award, color: 'text-green-600' },
                     ].map((asg, i) => (
                       <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-all group cursor-pointer">
                          <div className="flex items-center gap-5">
                             <div className={cn("w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center transition-all group-hover:bg-lns-navy group-hover:text-white", asg.color)}>
                                <asg.icon size={20} />
                             </div>
                             <div>
                                <h4 className="text-sm font-black text-lns-navy group-hover:text-lns-red transition-all">{asg.name}</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic">{asg.subject} • {asg.date}</p>
                             </div>
                          </div>
                          <div className="text-right flex items-center gap-6">
                             <div>
                                <p className="text-sm font-black text-lns-navy">{asg.score}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey italic">{asg.status}</p>
                             </div>
                             <ChevronRight className="text-gray-200 group-hover:text-lns-navy transition-all" />
                          </div>
                       </div>
                     ))}
                  </div>
                  <Button variant="ghost" className="w-full h-14 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey hover:text-lns-navy rounded-none border-t border-gray-100 italic">
                     View Complete Academic Ledger
                  </Button>
               </Card>
            </div>
         </div>

         {/* Sidebar / AI Insight */}
         <div className="space-y-6">
            <Card className="p-8 border-none shadow-2xl bg-lns-navy text-white rounded-2xl space-y-6 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Faculty Insight Engine (AI)</p>
                     <p className="text-lg font-black italic tracking-tight leading-relaxed">
                        "{student.name} is showing high resonance in analytical modules but minor latency in collaborative group nodes. Power Score is top 5% of cohort."
                     </p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-green-500 italic uppercase">
                     <ShieldCheck size={18} />
                     Verified Institutional Record
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <Card className="p-8 border-none shadow-sm bg-white rounded-2xl space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy">Tactical Quick Actions</h3>
               <div className="space-y-3">
                  {[
                    { label: "Issue Official Sanction", icon: AlertCircle, color: "text-lns-red" },
                    { label: "Request Guardian Meeting", icon: History, color: "text-amber-500" },
                    { label: "Update Registry Data", icon: Star, color: "text-green-600" },
                  ].map((act, i) => (
                    <Button key={i} variant="outline" className="w-full h-12 justify-start px-6 bg-gray-50 border-gray-100 rounded-xl text-[9px] font-black uppercase tracking-widest group">
                       <act.icon size={16} className={cn("mr-3", act.color)} />
                       {act.label}
                       <ChevronRight size={14} className="ml-auto text-gray-200 group-hover:text-lns-navy transition-all" />
                    </Button>
                  ))}
               </div>
            </Card>

            <div className="p-4 bg-lns-red/5 rounded-2xl border-2 border-dashed border-lns-red/20 text-center">
               <p className="text-[9px] font-black uppercase tracking-widest text-lns-red italic">
                  Warning: All profile interactions are logged for institutional audit.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
