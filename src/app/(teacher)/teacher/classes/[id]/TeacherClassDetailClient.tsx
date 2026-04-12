"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  AlertCircle,
  ChevronRight,
  MoreVertical,
  Calendar,
  Zap,
  Layout,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const COHORTS = [
  { id: '10a-eng', name: 'Grade 10-A English Lit', count: 32, room: 'Room 4B', time: '09:00 - 10:30', days: 'Mon, Wed, Fri', performance: 84.5, attendance: 97.2 },
  { id: '10b-eng', name: 'Grade 10-B English Lit', count: 28, room: 'Room 2C', time: '11:00 - 12:30', days: 'Tue, Thu', performance: 78.1, attendance: 94.8 },
  { id: '11a-comm', name: 'Grade 11-A Communication', count: 24, room: 'Theatre II', time: '14:00 - 15:30', days: 'Mon, Wed', performance: 91.2, attendance: 98.4 },
];

}

export default function TeacherClassDetailClient({ params }: { params: { id: string } }) {
  const cohort = COHORTS.find(c => c.id === params.id) || COHORTS[0];
  const myStudents = PLACEHOLDER_STUDENTS.filter(s => s.class === cohort.id || cohort.id.includes(s.class.toLowerCase().replace(' ', ''))); 

  const stats = [
     { label: "Avg Resonance", val: `${cohort.performance}%`, icon: TrendingUp, color: "text-green-500" },
     { label: "Registry Health", val: `${cohort.attendance}%`, icon: ShieldCheck, color: "text-blue-500" },
     { label: "Merits Issued", val: "142", icon: Award, color: "text-amber-500" },
     { label: "Active Latency", val: "2 Alerts", icon: AlertCircle, color: "text-lns-red" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="flex items-center gap-6">
            <Link href="/teacher/classes">
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-lns-navy h-12 w-12 border border-gray-100">
                  <ArrowLeft size={24} />
               </Button>
            </Link>
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 rounded-[1.5rem] bg-lns-navy flex items-center justify-center text-white text-3xl font-black shadow-xl">
                  {cohort.id.split('-')[0].toUpperCase()}
               </div>
               <div className="space-y-1">
                  <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-none italic uppercase">{cohort.name}</h1>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey italic">{cohort.room} • {cohort.time} • {cohort.count} Assets Synchronized</p>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <Link href={`/teacher/classes/${params.id}/attendance`}>
               <Button variant="outline" className="h-14 bg-white text-lns-navy hover:bg-gray-50 border-gray-100 rounded-2xl px-8 font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center gap-2">
                  <Layout size={18} />
                  Execute Register
               </Button>
            </Link>
            <Link href={`/teacher/classes/${params.id}/markbook`}>
               <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-2">
                  <BookOpen size={18} />
                  Access Markbook
               </Button>
            </Link>
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
              <div>
                 <p className="text-3xl font-[900] text-lns-navy tracking-tighter italic">{stat.val}</p>
                 <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-widest mt-1 tracking-tight">{stat.label}</p>
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Student Registry (66%) */}
         <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic">Synchronized Student Nodes ({myStudents.length})</h3>
            <Card className="border-none shadow-2xl bg-white rounded-2xl overflow-hidden">
               <div className="divide-y divide-gray-50">
                  {myStudents.map((student) => (
                    <Link key={student.id} href={`/teacher/students/${student.id}`} className="block">
                       <div className="p-8 flex items-center justify-between hover:bg-gray-50 transition-all group cursor-pointer relative">
                          <div className="flex items-center gap-6">
                             <div className="w-12 h-12 rounded-2xl bg-lns-navy/5 text-lns-navy flex items-center justify-center text-lg font-black shadow-inner group-hover:bg-lns-navy group-hover:text-white transition-all">
                                {student.name.charAt(0)}
                             </div>
                             <div>
                                <h4 className="text-lg font-black text-lns-navy group-hover:text-lns-red transition-all italic leading-tight">{student.name}</h4>
                                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-lns-mid-grey italic mt-1">
                                   Power Score: {student.powerScore}% • Merit Standing: {student.citizenship}
                                </div>
                             </div>
                          </div>
                          <div className="flex items-center gap-8">
                             <div className="text-right">
                                <p className="text-xs font-black text-lns-navy">{student.attendance}</p>
                                <p className="text-[8px] font-black uppercase tracking-widest text-lns-mid-grey leading-none">Arrival</p>
                             </div>
                             <div className={cn(
                               "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic border",
                               student.status === "Good" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-lns-red border-red-100"
                             )}>
                                {student.status}
                             </div>
                             <ChevronRight className="text-gray-200 group-hover:text-lns-navy transition-all" />
                          </div>
                       </div>
                    </Link>
                  ))}
               </div>
            </Card>
         </div>

         {/* Right Sidebar (33%) */}
         <div className="space-y-8">
            <Card className="p-10 border-none shadow-2xl bg-lns-navy text-white rounded-[3rem] space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Institutional Intel (AI)</p>
                     <h4 className="text-2xl font-black tracking-tight italic uppercase leading-none">Cohort Synthesis</h4>
                  </div>
                  <p className="text-sm font-medium italic opacity-80 leading-relaxed">
                     Performance is up 12% following the Unit 3 Assessment cycle. Two student nodes [Abraham L, Rose P] exhibit minor attendance latency.
                  </p>
                  <Button variant="ghost" className="w-full h-14 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                    Deploy AI Feedback
                  </Button>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy">Upcoming Session</h3>
                  <Calendar size={18} className="text-lns-red" />
               </div>
               <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 group cursor-pointer hover:border-lns-red/20 transition-all">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Tomorrow, 09:00 AM</p>
                     <h4 className="text-sm font-black text-lns-navy group-hover:text-lns-red transition-all">Shakespearean Contexts II</h4>
                     <p className="text-[10px] font-bold text-lns-mid-grey italic uppercase">Room 4B • Live Terminal Quiz</p>
                  </div>
                  <Button variant="outline" className="w-full h-11 border-gray-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-lns-mid-grey hover:bg-gray-50">
                    View Complete Timetable
                  </Button>
               </div>
            </Card>

            <div className="p-4 bg-green-500/5 rounded-2xl border-2 border-dashed border-green-500/20 flex items-center justify-center gap-3 text-green-600">
               <ShieldCheck size={20} />
               <p className="text-[9px] font-black uppercase tracking-widest italic opacity-80">Full Registry Transparency Enabled</p>
            </div>
         </div>
      </div>
    </div>
  );
}
