"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  Search, 
  ChevronRight, 
  Clock, 
  MapPin, 
  MoreVertical,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Layout,
  Plus
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const COHORTS = [
  { id: '10a-eng', name: 'Grade 10-A English Lit', count: 32, room: 'Room 4B', time: '09:00 - 10:30', days: 'Mon, Wed, Fri', performance: 84.5, attendance: 97.2 },
  { id: '10b-eng', name: 'Grade 10-B English Lit', count: 28, room: 'Room 2C', time: '11:00 - 12:30', days: 'Tue, Thu', performance: 78.1, attendance: 94.8 },
  { id: '11a-comm', name: 'Grade 11-A Communication', count: 24, room: 'Theatre II', time: '14:00 - 15:30', days: 'Mon, Wed', performance: 91.2, attendance: 98.4 },
];

export default function TeacherClassesListPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Users size={32} className="text-lns-red" />
               Cohort Management Hub
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Active Academic Assignments • Term 2 2026</p>
         </div>
         <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-2">
            <Plus size={18} />
            Initialize New Cohort
         </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Active Nodes", val: "3", icon: Layout, color: "text-lns-navy" },
           { label: "Total Asset Load", val: "84 Students", icon: Users, color: "text-lns-red" },
           { label: "Avg Resonance", val: "84.6%", icon: TrendingUp, color: "text-green-500" },
         ].map((stat, i) => (
           <Card key={i} className="p-8 border-none shadow-sm bg-white rounded-2xl space-y-2 group hover:shadow-xl transition-all border-b-4 border-transparent hover:border-lns-red">
              <div className="flex items-center justify-between mb-2">
                 <div className={cn("p-3 rounded-2xl bg-gray-50 group-hover:bg-lns-navy group-hover:text-white transition-all", stat.color)}>
                    <stat.icon size={22} />
                 </div>
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              </div>
              <p className="text-3xl font-black text-lns-navy tracking-tighter">{stat.val}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">{stat.label}</p>
           </Card>
         ))}
      </div>

      {/* Cohort Grid */}
      <div className="space-y-6">
         <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic">Academic Assignments</h3>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {COHORTS.map((cohort) => (
              <Link key={cohort.id} href={`/teacher/classes/${cohort.id}`}>
                 <Card className="p-10 border-none shadow-xl bg-white rounded-[3rem] group hover:translate-y-[-8px] transition-transform duration-500 relative overflow-hidden border-t border-gray-50">
                    <div className="relative z-10 space-y-8">
                       <div className="flex items-start justify-between">
                          <div className="space-y-2">
                             <div className="flex items-center gap-3">
                                <h4 className="text-2xl font-[900] text-lns-navy group-hover:text-lns-red transition-all italic tracking-tight">{cohort.name}</h4>
                                <span className="px-3 py-1 bg-lns-navy/5 text-lns-navy text-[9px] font-black rounded-lg uppercase tracking-widest">{cohort.count} Assets</span>
                             </div>
                             <div className="flex items-center gap-6 text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">
                                <div className="flex items-center gap-2"><MapPin size={14} className="text-lns-red" /> {cohort.room}</div>
                                <div className="flex items-center gap-2"><Clock size={14} /> {cohort.time}</div>
                             </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-200 group-hover:text-lns-navy">
                             <MoreVertical size={20} />
                          </Button>
                       </div>

                       <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                          <div className="space-y-4">
                             <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey italic">Academic Resonance</p>
                             <div className="flex items-end gap-3">
                                <span className={cn(
                                  "text-3xl font-black italic tracking-tighter",
                                  cohort.performance > 80 ? "text-green-600" : "text-lns-navy"
                                )}>{cohort.performance}%</span>
                                <TrendingUp size={20} className="text-green-500 mb-1" />
                             </div>
                          </div>
                          <div className="space-y-4">
                             <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey italic">Node Attendance</p>
                             <div className="flex items-end gap-3">
                                <span className="text-3xl font-black italic tracking-tighter text-lns-navy">{cohort.attendance}%</span>
                                <ShieldCheck size={20} className="text-blue-500 mb-1" />
                             </div>
                          </div>
                       </div>

                       <div className="flex items-center justify-between pt-4">
                          <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest font-mono">{cohort.days}</p>
                          <div className="flex items-center gap-2 text-lns-navy font-black text-[10px] uppercase tracking-widest group-hover:text-lns-red transition-all">
                             Enter Node
                             <ChevronRight size={16} />
                          </div>
                       </div>
                    </div>
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                       <Users size={160} className="text-lns-navy" />
                    </div>
                 </Card>
              </Link>
            ))}
         </div>
      </div>
    </div>
  );
}
