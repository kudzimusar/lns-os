"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Star,
  Users,
  Zap,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const events = [
  { day: 12, month: "APR", title: "Term 1 Final Assessments", type: "Academic", time: "All Day", color: "bg-lns-navy" },
  { day: 18, month: "APR", title: "Parent-Teacher Synthesis Council", type: "Hub", time: "18:00 - 20:30", color: "bg-lns-red" },
  { day: 24, month: "APR", title: "Digital Citizenship Workshop", type: "Training", time: "14:00 - 15:30", color: "bg-amber-500" },
];

export default function InstitutionalCalendar() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 pt-6 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
           <Link href="/">
              <Button variant="outline" className="h-12 w-12 rounded-xl border-lns-border bg-white">
                 <ArrowLeft size={18} />
              </Button>
           </Link>
           <div>
              <h1 className="text-3xl font-[900] text-lns-navy tracking-tighter uppercase italic">Academic <span className="text-lns-red">Timeline</span></h1>
              <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Verified Period Schedule Node</p>
           </div>
        </div>
        <div className="flex items-center space-x-2 bg-white p-1 border border-lns-border rounded-xl shadow-sm">
           <Button variant="ghost" className="text-[10px] font-black uppercase text-lns-navy px-6 bg-lns-light-grey rounded-lg">Month</Button>
           <Button variant="ghost" className="text-[10px] font-black uppercase text-lns-mid-grey px-6">Term Arc</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Calendar Grid Simulation */}
         <Card className="lg:col-span-2 border-none shadow-xl bg-white rounded-[3rem] p-10 space-y-8">
            <div className="flex items-center justify-between border-b border-lns-border pb-6">
               <h3 className="text-xl font-black text-lns-navy uppercase tracking-tight">April 2026</h3>
               <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" className="h-10 w-10 border-lns-border rounded-xl"><ChevronLeft size={18}/></Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 border-lns-border rounded-xl"><ChevronRight size={18}/></Button>
               </div>
            </div>
            
            <div className="grid grid-cols-7 gap-4 text-center">
               {["M", "T", "W", "T", "F", "S", "S"].map(d => (
                 <span key={d} className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest py-2">{d}</span>
               ))}
               {Array.from({ length: 30 }).map((_, i) => (
                 <div key={i} className={cn(
                   "aspect-square rounded-2xl flex items-center justify-center text-sm font-bold transition-all cursor-pointer relative",
                   i + 1 === 12 ? "bg-lns-navy text-white shadow-xl" : "bg-lns-light-grey/30 text-lns-navy hover:bg-lns-light-grey"
                 )}>
                    {i + 1}
                    {events.some(e => e.day === i + 1) && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-lns-red rounded-full" />
                    )}
                 </div>
               ))}
            </div>
         </Card>

         {/* Upcoming Node Feed */}
         <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey pl-2">Active Protocol Events</h3>
            <div className="space-y-4">
               {events.map((e, idx) => (
                 <Card key={idx} className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-xl transition-all cursor-pointer">
                    <div className="flex">
                       <div className={cn("w-20 shrink-0 flex flex-col items-center justify-center p-4 text-white", e.color)}>
                          <p className="text-[10px] font-black tracking-widest opacity-80">{e.month}</p>
                          <p className="text-2xl font-[900] leading-none mt-1">{e.day}</p>
                       </div>
                       <div className="p-6 flex-1">
                          <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey">{e.type}</p>
                          <h4 className="text-sm font-black text-lns-navy mt-1 group-hover:text-lns-red transition-all">{e.title}</h4>
                          <div className="flex items-center space-x-3 mt-4 text-[10px] font-bold text-lns-mid-grey uppercase">
                             <Clock size={12} />
                             <span>{e.time}</span>
                          </div>
                       </div>
                    </div>
                 </Card>
               ))}
            </div>
            
            <Card className="border-none shadow-2xl bg-lns-navy text-white p-8 rounded-[2.5rem] relative overflow-hidden">
               <div className="relative z-10 space-y-4">
                  <h4 className="text-lg font-black uppercase tracking-tight">Sync to Device</h4>
                  <p className="text-xs text-slate-400 font-bold leading-relaxed">Add the institutional timeline to your local iCal or Google Calendar node.</p>
                  <Button className="w-full bg-white text-lns-navy rounded-xl h-12 font-black uppercase tracking-widest text-[9px] shadow-2xl">Initialize Calendar Sync</Button>
               </div>
               <CalendarIcon size={120} className="absolute -bottom-10 -right-10 text-white/5" />
            </Card>
         </div>
      </div>
    </div>
  );
}
