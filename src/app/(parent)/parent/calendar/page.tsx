"use client";

import React from "react";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Users, 
  ArrowLeft,
  Bell,
  Globe,
  Monitor,
  Activity
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const EVENTS = [
  { date: "15 Apr", day: "Tuesday", title: "Mid-Term Exhibition", time: "09:00 - 14:00", type: "Academy Wide", color: "border-lns-navy bg-lns-navy/5 text-lns-navy" },
  { date: "18 Apr", day: "Friday", title: "Faculty Training Node", time: "All Day", type: "Holiday", color: "border-lns-red bg-lns-red/5 text-lns-red" },
  { date: "22 Apr", day: "Tuesday", title: "Parent-Teacher Sync", time: "16:00 - 19:00", type: "Mandatory", color: "border-amber-500 bg-amber-50 text-amber-600" },
  { date: "30 Apr", day: "Wednesday", title: "Term 2 Evaluation Release", time: "12:00", type: "System Event", color: "border-green-500 bg-green-50 text-green-600" },
];

export default function ParentCalendarPage() {
  const [viewedMonth, setViewedMonth] = React.useState("April 2026");

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/parent/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Family Hub
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Calendar size={32} className="text-lns-red" />
               Institutional Calendar
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Term Cycle Timeline • {viewedMonth}</p>
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
         {/* Grid View (75%) */}
         <div className="lg:col-span-3 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic">Session Node Matrix</h3>
            <Card className="p-8 border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
               <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                    <div key={d} className="bg-gray-50 p-4 text-center text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">{d}</div>
                  ))}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const hasEvent = [15, 18, 22, 30].includes(day);
                    return (
                      <div key={i} className={cn(
                        "bg-white aspect-square p-2 border-b border-r border-gray-50 group hover:bg-gray-50 transition-all cursor-pointer relative",
                        day === 12 ? "ring-2 ring-lns-red ring-inset" : ""
                      )}>
                        <span className={cn(
                          "text-[10px] font-black p-1 block text-right",
                          day === 12 ? "text-lns-red" : "text-slate-300"
                        )}>{day}</span>
                        {hasEvent && (
                          <div className="absolute inset-x-2 bottom-2 h-1 bg-lns-red rounded-full shadow-[0_0_10px_rgba(214,43,43,0.5)]" />
                        )}
                      </div>
                    );
                  })}
               </div>
            </Card>

            {/* Upcoming Detailed List */}
            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic flex items-center gap-2">
                  <Monitor size={16} />
                  Detailed Event Briefings
               </h3>
               <div className="grid grid-cols-1 gap-4">
                  {EVENTS.map((event, i) => (
                    <Card key={i} className={cn(
                      "p-8 border-none shadow-xl rounded-2xl flex items-center justify-between group hover:translate-x-2 transition-transform",
                      event.color
                    )}>
                       <div className="flex items-center gap-8">
                          <div className="text-center w-20">
                             <p className="text-[10px] font-black uppercase tracking-widest opacity-60 leading-none mb-1">{event.day}</p>
                             <p className="text-3xl font-black italic tracking-tighter leading-none">{event.date.split(' ')[0]}</p>
                             <p className="text-[10px] font-black tracking-widest leading-none mt-1 opacity-60 uppercase">{event.date.split(' ')[1]}</p>
                          </div>
                          <div className="h-12 w-px bg-current opacity-10" />
                          <div className="space-y-1">
                             <h4 className="text-xl font-black italic tracking-tight uppercase leading-none">{event.title}</h4>
                             <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest italic opacity-60">
                                <div className="flex items-center gap-2"><Clock size={14} /> {event.time}</div>
                                <div className="flex items-center gap-2"><Globe size={14} /> {event.type}</div>
                             </div>
                          </div>
                       </div>
                       <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white/10 group-hover:bg-white text-current transition-all">
                          <ChevronRight size={24} />
                       </Button>
                    </Card>
                  ))}
               </div>
            </div>
         </div>

         {/* Sidebar Intel (25%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Term Analysis</p>
                     <h4 className="text-2xl font-black italic uppercase leading-none tracking-tight">Academic Pulse</h4>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                           <span>Term 2 Progress</span>
                           <span>64%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-lns-red w-[64%] shadow-[0_0_15px_rgba(214,43,43,0.8)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "Institutional cycle is currently in Peak Assessment mode. No vacations detected in the next 14 cycles."
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <div className="p-6 bg-green-50 rounded-2xl border-2 border-dashed border-green-200 space-y-3">
               <div className="flex items-center gap-3 text-green-600">
                  <ShieldCheck size={20} />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Clock Verified</h3>
               </div>
               <p className="text-[9px] font-black uppercase tracking-widest text-green-600/60 leading-relaxed italic">
                  Institutional timeline synchronized with the High Authority master clock.
               </p>
            </div>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Quick Reminders</h3>
                  <Bell size={18} className="text-lns-red animate-bounce" />
               </div>
               <div className="space-y-4">
                  {[
                    "Confirm Attendance for PT Sync",
                    "Download Mid-Term PDF",
                    "Sync to Google/iCal"
                  ].map((act, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer transition-all">
                       <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey group-hover:text-lns-navy">{act}</span>
                       <ChevronRight size={14} className="text-gray-100 group-hover:text-lns-navy transition-all" />
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
