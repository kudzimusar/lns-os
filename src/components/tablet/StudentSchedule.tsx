"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Clock, MapPin } from "lucide-react";

interface Period {
  id: number;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  isCurrent?: boolean;
}

const periods: Period[] = [
  { id: 1, subject: "Mathematics", teacher: "Mr. Johnson", room: "Room 4B", startTime: "08:30", endTime: "09:20" },
  { id: 2, subject: "English Lit", teacher: "Ms. Sarah", room: "Room 2A", startTime: "09:25", endTime: "10:15" },
  { id: 3, subject: "Physics", teacher: "Dr. Smith", room: "Lab 1", startTime: "10:35", endTime: "11:25", isCurrent: true },
  { id: 4, subject: "History", teacher: "Mr. Davis", room: "Room 3C", startTime: "11:30", endTime: "12:20" },
  { id: 5, subject: "Lunch", teacher: "-", room: "Dining Hall", startTime: "12:20", endTime: "13:10" },
  { id: 6, subject: "Chemistry", teacher: "Dr. Brown", room: "Lab 2", startTime: "13:15", endTime: "14:05" },
  { id: 7, subject: "Art", teacher: "Ms. Miller", room: "Studio 1", startTime: "14:10", endTime: "15:00" },
  { id: 8, subject: "PE", teacher: "Coach Hill", room: "Gym", startTime: "15:05", endTime: "15:55" },
];

export function StudentSchedule() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-black uppercase tracking-widest text-lns-mid-grey">Today's Schedule</h3>
        <div className="text-xs font-bold text-lns-red animate-pulse">Period 3 ends in 12m</div>
      </div>
      
      <div className="space-y-3">
        {periods.map((p) => (
          <div 
            key={p.id}
            className={cn(
              "flex items-center p-4 rounded-2xl transition-all",
              p.isCurrent 
                ? "bg-lns-navy text-white border-l-8 border-lns-red shadow-xl" 
                : "bg-white border border-gray-100 text-lns-navy"
            )}
          >
            <div className="w-20 shrink-0">
              <p className={cn("text-xs font-black", p.isCurrent ? "text-slate-400" : "text-lns-mid-grey")}>
                {p.startTime}
              </p>
              <p className={cn("text-[10px] font-bold", p.isCurrent ? "text-slate-500" : "text-slate-300")}>
                {p.endTime}
              </p>
            </div>
            
            <div className="flex-1">
              <h4 className="font-bold text-sm">{p.subject}</h4>
              <p className={cn("text-[10px] font-medium opacity-70")}>{p.teacher}</p>
            </div>
            
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold">
              <MapPin size={12} />
              {p.room}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
