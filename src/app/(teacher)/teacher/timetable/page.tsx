"use client";

import React from "react";
import PageShell from "@/components/ui/PageShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Clock, 
  MapPin, 
  Users, 
  ChevronRight,
  ShieldCheck,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";

const timetable = [
  { time: "08:00 AM", subject: "Faculty Briefing", room: "Staff Lounge", type: "Admin" },
  { time: "09:00 AM", subject: "Math Advanced (A)", room: "Room 402", type: "Lecture" },
  { time: "10:30 AM", subject: "Calculus Deep Dive", room: "Room 402", type: "Seminar" },
  { time: "12:00 PM", subject: "Lunch Interval", room: "Dining Hall", type: "Break" },
  { time: "01:00 PM", subject: "Statistics 101", room: "Room 105", type: "Lecture" },
  { time: "02:30 PM", subject: "Peer Mentoring", room: "Library", type: "Workshop" }
];

export default function TeacherTimetablePage() {
  return (
    <PageShell 
      title="Staff Timetable" 
      description="Live synchronisation of instructional cycles and administrative duties."
    >
      <div className="space-y-8 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, i) => (
                 <button 
                   key={day}
                   className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 2 ? 'bg-[#0A1F44] text-white shadow-lg' : 'text-[#8C92A0] hover:text-[#0A1F44]'}`}
                 >
                    {day.slice(0, 3)}
                 </button>
              ))}
           </div>
           <Button className="bg-[#D62B2B] hover:bg-[#B82525] text-white rounded-xl h-12 px-8 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg shadow-[#D62B2B]/20 transition-all active:scale-95">
              <Calendar size={18} /> View Academic Term
           </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
           {timetable.map((slot, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-none shadow-sm hover:shadow-xl transition-all group overflow-hidden bg-white">
                   <CardContent className="p-0">
                      <div className="flex items-center">
                         <div className="w-32 p-8 bg-[#F4F5F7] text-center border-r border-gray-100 group-hover:bg-[#0A1F44] transition-all">
                            <Clock size={20} className="mx-auto mb-2 text-[#8C92A0] group-hover:text-white/50" />
                            <p className="text-xs font-black text-[#0A1F44] group-hover:text-white font-manrope">{slot.time}</p>
                         </div>
                         <div className="flex-1 p-8 flex items-center justify-between">
                            <div className="space-y-2">
                               <div className="flex items-center gap-3">
                                  <h4 className="text-lg font-black text-[#0A1F44] uppercase tracking-tight">{slot.subject}</h4>
                                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded ${slot.type === 'Admin' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
                                     {slot.type}
                                  </span>
                               </div>
                               <div className="flex items-center gap-6">
                                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#8C92A0] uppercase tracking-widest">
                                     <MapPin size={12} className="text-[#D62B2B]" /> {slot.room}
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#8C92A0] uppercase tracking-widest">
                                     <Users size={12} className="text-[#0A1F44]" /> 32 Students
                                  </div>
                               </div>
                            </div>
                            <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-gray-50 flex items-center justify-center">
                               <ChevronRight size={20} className="text-gray-200 group-hover:text-[#D62B2B] transition-all" />
                            </Button>
                         </div>
                      </div>
                   </CardContent>
                </Card>
              </motion.div>
           ))}
        </div>

        <div className="flex items-center justify-center p-8">
           <div className="flex items-center space-x-3 text-[#8C92A0]">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Schedule Sealed • Term 2 Cycle</span>
           </div>
        </div>
      </div>
    </PageShell>
  );
}
