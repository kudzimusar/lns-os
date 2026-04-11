"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  UserPlus, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  MoreVertical,
  UserX,
  ShieldCheck,
  Zap,
  RefreshCw,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TimetablePage() {
  const [showAbsentModal, setShowAbsentModal] = useState(false);
  const [absentStep, setAbsentStep] = useState(1); // 1: Select Date, 2: Assign Subs, 3: Success

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Institutional Timetable</h1>
          <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Academic Year 2026/27 • Live Schedule Node</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setShowAbsentModal(true)} className="border-lns-red text-lns-red hover:bg-red-50 h-12 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest">
            <UserX size={18} className="mr-2" /> Report Absence
          </Button>
          <Button className="bg-lns-navy text-white h-12 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-lns-navy/20">
            <Zap size={18} className="mr-2" /> Live Snapshot
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Weekly Header Simulation */}
        {["MON", "TUE", "WED", "THU", "FRI"].map((day, idx) => (
          <div key={day} className="space-y-4">
            <div className={cn(
              "p-4 rounded-2xl text-center border-b-4",
              idx === 0 ? "bg-lns-navy text-white border-lns-red shadow-lg" : "bg-white text-lns-navy border-lns-border"
            )}>
              <p className="text-[10px] font-black tracking-[0.2em]">{day}</p>
              <p className="text-lg font-black">{12 + idx}</p>
            </div>
            
            <div className="space-y-3">
               {[
                 { time: "09:00", subject: "IB Lit", room: "4B", sub: false },
                 { time: "11:00", subject: "Maths 10A", room: "Lab 2", sub: true },
                 { time: "14:00", subject: "Faculty Hub", room: "Room 1", sub: false },
               ].map((session, i) => (
                 <Card key={i} className={cn(
                   "border-none shadow-sm p-4 relative group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all overflow-hidden",
                   session.sub ? "bg-amber-50 border-l-4 border-amber-500" : "bg-white"
                 )}>
                   {session.sub && (
                     <div className="absolute top-2 right-2 flex items-center bg-amber-500 text-white px-2 py-0.5 rounded-full text-[8px] font-black uppercase italic">
                        <UserPlus size={10} className="mr-1" /> SUB
                     </div>
                   )}
                   <p className="text-[9px] font-black text-lns-mid-grey tracking-widest">{session.time}</p>
                   <p className="text-sm font-bold text-lns-navy mt-1">{session.subject}</p>
                   <div className="flex items-center space-x-2 mt-2 text-[10px] font-bold text-lns-mid-grey uppercase">
                      <MapPin size={10} />
                      <span>{session.room}</span>
                   </div>
                 </Card>
               ))}
            </div>
          </div>
        ))}
      </div>

      {/* Absence & Substitute Assignment Wizard */}
      {showAbsentModal && (
         <div className="fixed inset-0 z-50 bg-lns-navy/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
            <Card className="w-full max-w-2xl border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
               <div className="p-8 border-b border-lns-border flex items-center justify-between">
                  <h3 className="text-xl font-black text-lns-navy uppercase tracking-tight">Report Staff Absence</h3>
                  <Button variant="ghost" size="icon" onClick={() => { setShowAbsentModal(false); setAbsentStep(1); }} className="rounded-full"><X size={20} /></Button>
               </div>
               <CardContent className="p-10 space-y-8">
                  {absentStep === 1 && (
                     <div className="space-y-6">
                        <div className="text-center space-y-2">
                           <h4 className="text-lg font-bold text-lns-navy">Duration & Reasoning</h4>
                           <p className="text-xs text-lns-mid-grey font-medium">Flag academic nodes affected by this absence event.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-lns-mid-grey">Start Date</label>
                              <input type="date" className="w-full h-12 border-none bg-lns-light-grey rounded-xl px-4 text-sm font-bold text-lns-navy" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-lns-mid-grey">Category</label>
                              <select className="w-full h-12 border-none bg-lns-light-grey rounded-xl px-4 text-sm font-bold text-lns-navy">
                                 <option>Sick Leave</option>
                                 <option>Personal Hub</option>
                                 <option>Training / CPD</option>
                              </select>
                           </div>
                        </div>
                        <div className="p-6 bg-red-50 border border-red-100 rounded-[2rem] flex items-center justify-between">
                           <div className="flex items-center space-x-4">
                              <AlertTriangle className="text-lns-red" size={24} />
                              <p className="text-xs font-bold text-lns-red uppercase italic">3 Impacted Sessions Identified</p>
                           </div>
                           <Button onClick={() => setAbsentStep(2)} className="h-12 bg-lns-red text-white rounded-xl px-6 font-black uppercase text-[10px]">Analyze Fixes</Button>
                        </div>
                     </div>
                  )}

                  {absentStep === 2 && (
                     <div className="space-y-6">
                        <div className="text-center space-y-2">
                           <h4 className="text-lg font-bold text-lns-navy">Assign Substitute Hubs</h4>
                           <p className="text-xs text-lns-mid-grey font-medium">Select verified staff to cover the following sessions.</p>
                        </div>
                        <div className="space-y-3">
                           {[
                             { session: "English Lit 10A", time: "09:00", sub: "Searching..." },
                             { session: "Grade 8 Tutorial", time: "11:20", sub: "Searching..." },
                           ].map((item, idx) => (
                              <div key={idx} className="p-4 bg-lns-light-grey/30 border border-lns-border/30 rounded-2xl flex items-center justify-between">
                                 <div>
                                    <p className="text-sm font-bold text-lns-navy">{item.session}</p>
                                    <p className="text-[10px] font-black text-lns-mid-grey uppercase">{item.time}</p>
                                 </div>
                                 <select className="bg-white border-lns-border rounded-xl px-4 py-2 text-xs font-bold text-lns-navy focus:ring-1 focus:ring-lns-navy">
                                    <option>Select Sub...</option>
                                    <option>Sarah Jenkins (Available)</option>
                                    <option>Michael Faraday (Available)</option>
                                 </select>
                              </div>
                           ))}
                        </div>
                        <Button onClick={() => setAbsentStep(3)} className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black uppercase shadow-xl mt-4">Confirm Assignments & Sync</Button>
                     </div>
                  )}

                  {absentStep === 3 && (
                     <div className="text-center space-y-8 animate-in zoom-in duration-500 py-10">
                        <div className="relative inline-block">
                           <div className="w-24 h-24 bg-green-500 rounded-[2rem] shadow-xl flex items-center justify-center text-white mx-auto">
                              <ShieldCheck size={48} />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-2xl font-black text-lns-navy uppercase tracking-tight">Sync Complete</h4>
                           <p className="text-sm text-lns-mid-grey px-12 leading-relaxed">Schedule nodes updated across all platforms. Substitutes have been notified via secure direct line.</p>
                        </div>
                        <Button onClick={() => { setShowAbsentModal(false); setAbsentStep(1); }} className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">Return to Live Calendar</Button>
                     </div>
                  )}
               </CardContent>
            </Card>
         </div>
      )}
    </div>
  );
}
