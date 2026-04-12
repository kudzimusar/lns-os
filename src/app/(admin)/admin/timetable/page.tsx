 "use client";

import React, { useState } from "react";
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Layout, 
  Clock, 
  Users, 
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  MoreVertical,
  Zap,
  CheckCircle2,
  RefreshCcw,
  Monitor
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

export default function TimetableBuilderPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-1">
          <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
             <Layout size={32} className="text-lns-red" />
             Institutional Chronos
          </h1>
          <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Global Timetable Persistence Lattice • Cycle 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-14 bg-white border-gray-100 rounded-2xl px-6 font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center gap-2">
             <RefreshCcw size={18} />
             Auto-Resolve Hub
          </Button>
          <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-2">
            <Plus size={18} />
            Deploy Time Node
          </Button>
        </div>
      </div>

      {/* View Switcher & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center bg-gray-50 border border-gray-100 p-1 rounded-2xl">
            <button 
              onClick={() => setView("grid")}
              className={cn("px-6 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", view === "grid" ? "bg-white text-lns-navy shadow-sm" : "text-slate-400 hover:text-lns-navy")}
            >
               Lattice View
            </button>
            <button 
              onClick={() => setView("list")}
              className={cn("px-6 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", view === "list" ? "bg-white text-lns-navy shadow-sm" : "text-slate-400 hover:text-lns-navy")}
            >
               List View
            </button>
         </div>
         <div className="flex items-center gap-3">
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input placeholder="Search Faculty / Cohort..." className="h-12 bg-white border border-gray-100 rounded-xl pl-10 pr-4 text-[10px] font-black uppercase tracking-widest text-lns-navy outline-none w-64 shadow-sm" />
            </div>
            <Button variant="outline" className="h-12 border-gray-100 rounded-xl px-4 text-[10px] uppercase font-black tracking-widest text-lns-mid-grey bg-white shadow-sm">
               <Filter size={16} />
            </Button>
         </div>
      </div>

      {/* Grid Container */}
      <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden p-1">
         <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
               <div className="grid grid-cols-[100px_repeat(5,1fr)] bg-gray-50/50 border-b border-gray-100">
                  <div className="p-6"></div>
                  {days.map(day => (
                    <div key={day} className="p-6 text-center text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey italic">{day}</div>
                  ))}
               </div>
               {times.map((time, timeIdx) => (
                  <div key={time} className="grid grid-cols-[100px_repeat(5,1fr)] border-b border-gray-50 last:border-0 h-32">
                     <div className="p-4 border-r border-gray-50 flex items-center justify-center">
                        <span className="text-xs font-black text-lns-navy italic">{time}</span>
                     </div>
                     {days.map((day, dayIdx) => {
                        const hasClass = (dayIdx + timeIdx) % 3 === 0;
                        return (
                          <div key={day} className="p-3 border-r border-gray-50 last:border-0 relative group">
                             {hasClass && (
                               <div className="h-full w-full bg-lns-navy hover:bg-lns-red text-white p-4 rounded-2xl shadow-lg transition-all cursor-pointer relative overflow-hidden group/item">
                                  <div className="relative z-10">
                                     <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">Grade 10A</p>
                                     <h4 className="text-xs font-black uppercase italic leading-tight mt-1">Advanced Calculus</h4>
                                     <p className="text-[9px] font-bold uppercase tracking-widest mt-4 flex items-center gap-1.5 opacity-80">
                                        <Monitor size={10} /> Hub-C4
                                     </p>
                                  </div>
                                  <ShieldCheck size={100} className="absolute -bottom-10 -right-10 text-white/5 pointer-events-none group-hover/item:scale-125 transition-transform" />
                               </div>
                             )}
                             {!hasClass && (
                               <button className="h-full w-full rounded-2xl hover:bg-gray-50/50 border-2 border-transparent hover:border-dashed hover:border-gray-200 transition-all flex items-center justify-center group/empty opacity-0 hover:opacity-100">
                                  <Plus size={24} className="text-gray-200 group-hover/empty:text-lns-navy transition-colors" />
                               </button>
                             )}
                          </div>
                        );
                     })}
                  </div>
               ))}
            </div>
         </div>
      </Card>

      {/* Footer Info */}
      <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
         <div className="flex items-center gap-8 text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">
            <div className="flex items-center gap-2 text-green-600"><CheckCircle2 size={14} /> Chronos Node Collision: 0 Errors</div>
            <div className="flex items-center gap-2"><Monitor size={14} /> Faculty Availability: Synchronized</div>
         </div>
         <div className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">LNS OS // Chronos-Lattice V4.2</div>
      </div>
    </div>
  );
}
