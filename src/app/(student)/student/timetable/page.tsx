"use client";

import React from "react";
import { 
  Clock, 
  MapPin, 
  ArrowLeft, 
  Calendar, 
  Monitor, 
  Zap, 
  ShieldCheck, 
  Users,
  ChevronRight,
  Activity,
  Globe
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SCHEDULE = [
  { time: "08:00 - 09:30", subject: "IB Math HL", room: "Block B, R202", teacher: "Mr. James Okafor", active: false },
  { time: "09:45 - 11:15", subject: "English Literature", room: "Block A, L104", teacher: "Ms. Sarah Chen", active: true },
  { time: "11:30 - 13:00", subject: "Digital Society", room: "Lab 7", teacher: "Dr. Elena Vance", active: false },
  { time: "14:00 - 15:30", subject: "Physical Education", room: "Arena III", teacher: "Coach Miller", active: false },
];

export default function StudentTimetablePage() {
  const [selectedDay, setSelectedDay] = React.useState("Monday");

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Command
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Calendar size={32} className="text-lns-red" />
               Institutional Cycle Timeline
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Active synchronization for Term 2 • Week 12</p>
         </div>

         <div className="flex items-center bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-inner">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <Button 
                key={day} 
                onClick={() => setSelectedDay(day)}
                variant="ghost" 
                className={cn(
                  "h-10 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                  selectedDay === day ? "bg-white text-lns-navy shadow-lg" : "text-lns-mid-grey"
                )}
              >
                {day.substring(0, 3)}
              </Button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Main Timetable (75%) */}
         <div className="lg:col-span-3 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic">Academic Block Schedule ({selectedDay})</h3>
            <div className="space-y-4">
               {SCHEDULE.map((block, i) => (
                 <Card key={i} className={cn(
                   "p-10 border-none shadow-2xl rounded-[3rem] transition-all group relative overflow-hidden",
                   block.active ? "bg-lns-navy text-white ring-4 ring-lns-red/20 scale-[1.02]" : "bg-white"
                 )}>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                       <div className="flex flex-col md:flex-row md:items-center gap-10">
                          <div className={cn(
                            "w-24 h-24 rounded-[2rem] flex flex-col items-center justify-center text-center shadow-inner",
                            block.active ? "bg-white/10" : "bg-gray-50"
                          )}>
                             <Clock size={24} className={block.active ? "text-lns-red" : "text-lns-navy"} />
                             <span className={cn("text-[9px] font-black uppercase leading-none mt-2", block.active ? "text-slate-400" : "text-lns-mid-grey")}>Arrival Node</span>
                             <span className="text-xs font-black mt-1 leading-none">{block.time.split(' - ')[0]}</span>
                          </div>
                          
                          <div className="space-y-2">
                             <div className="flex items-center gap-3">
                                <h4 className={cn("text-2xl font-[900] italic tracking-tight uppercase leading-none", block.active ? "text-white" : "text-lns-navy")}>{block.subject}</h4>
                                {block.active && (
                                  <div className="px-3 py-1 bg-lns-red rounded-lg text-white text-[9px] font-black uppercase tracking-widest animate-pulse border border-red-400">
                                    Live Session
                                  </div>
                                )}
                             </div>
                             <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest italic opacity-60">
                                <div className="flex items-center gap-2"><MapPin size={14} className={block.active ? "text-lns-red" : ""} /> {block.room}</div>
                                <div className="flex items-center gap-2"><Users size={14} /> {block.teacher}</div>
                             </div>
                          </div>
                       </div>

                       <div className="flex items-center gap-4">
                          {block.active ? (
                            <Link href="/student/scan">
                               <Button className="h-16 px-10 bg-white text-lns-navy hover:bg-lns-red hover:text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-navy-600/30 active:scale-95 transition-all flex items-center gap-3">
                                  <Monitor size={20} />
                                  Execute Scan
                               </Button>
                            </Link>
                          ) : (
                            <Button variant="ghost" className="h-14 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest text-lns-mid-grey border border-gray-100 hover:bg-gray-50 flex items-center gap-2">
                               Asset Resources
                               <ChevronRight size={14} />
                            </Button>
                          )}
                       </div>
                    </div>
                    {/* Background decorations */}
                    <div className="absolute -bottom-10 -right-10 opacity-[0.03]">
                       <Calendar size={180} />
                    </div>
                 </Card>
               ))}
            </div>
         </div>

         {/* Sidebar Intel (25%) */}
         <div className="space-y-8">
            <Card className="p-10 border-none shadow-2xl bg-lns-navy text-white rounded-[3.5rem] space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Institutional Synopsis</p>
                     <h4 className="text-2xl font-black tracking-tight italic uppercase leading-none">Weekly Resonance</h4>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                           <span>Cycle Progress</span>
                           <span>64%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-lns-red w-[64%] shadow-[0_0_15px_rgba(214,43,43,1)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "Institutional sync is nominal. Suggest prioritizing the Digital Society module for higher resonance in Term 3."
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <div className="p-6 bg-green-50 rounded-2xl border-2 border-dashed border-green-200 space-y-4">
               <div className="flex items-center gap-3 text-green-600">
                  <ShieldCheck size={20} />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Trust Status</h3>
               </div>
               <p className="text-[9px] font-black uppercase tracking-widest text-green-600/60 italic leading-snug">
                  Operational timetable is synchronized with the High Authority master clock. Delta: 0.00s.
               </p>
            </div>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-4">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Faculty Support</h3>
                  <Globe size={18} className="text-lns-red" />
               </div>
               <div className="space-y-3">
                  {[
                    "Request Session Swap",
                    "Download Cycle PDF",
                    "Initialize Tutor Sync"
                  ].map((act, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                       <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey hover:text-lns-navy transition-all">{act}</span>
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
