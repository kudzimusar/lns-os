"use client";

import React, { useState } from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus,
  MoreVertical, 
  Zap,
  GraduationCap,
  Mail,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Award,
  Clock,
  Download
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function StudentDirectory() {
  const [search, setSearch] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(PLACEHOLDER_STUDENTS[0].id);
  const isTablet = useMediaQuery("(min-width: 768px)");

  const filteredStudents = PLACEHOLDER_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.idNumber.toLowerCase().includes(search.toLowerCase())
  );

  const selectedStudent = PLACEHOLDER_STUDENTS.find(s => s.id === selectedStudentId) || PLACEHOLDER_STUDENTS[0];

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in duration-700 h-full pb-8">
      {/* Header Section - Tablet Optimized */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-lns-navy tracking-tight uppercase italic flex items-center gap-4">
             <Users size={32} className="text-lns-red" />
             Cohort Registry
          </h1>
          <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic opacity-60">Academic Cycle 2026 // Institutional Node</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="h-12 bg-white border-lns-border rounded-xl px-6 font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button className="h-12 bg-lns-navy text-white hover:bg-lns-red rounded-xl px-8 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-lns-navy/20 active:scale-95 transition-all flex items-center gap-2">
            <UserPlus size={16} />
            Enroll Asset
          </Button>
        </div>
      </div>

      {/* Main Split Panel - Section 12 Spec */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] bg-white rounded-2xl md:rounded-[2rem] border border-lns-border overflow-hidden shadow-sm">
        
        {/* Master Panel: Student List */}
        <aside className="border-r border-lns-border flex flex-col min-w-0 bg-gray-50/50">
          <div className="p-4 border-b border-lns-border bg-white">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lns-mid-grey group-focus-within:text-lns-red transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search Identity..." 
                className="w-full h-10 bg-gray-50 rounded-xl pl-10 pr-4 text-xs font-bold text-lns-navy outline-none focus:ring-2 focus:ring-lns-red/10 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
            {filteredStudents.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudentId(student.id)}
                className={cn(
                  "w-full px-4 py-4 flex items-center gap-4 transition-all border-l-4",
                  selectedStudentId === student.id 
                    ? "bg-white border-lns-red shadow-sm" 
                    : "border-transparent text-lns-mid-grey hover:bg-white/50"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-colors",
                  selectedStudentId === student.id ? "bg-lns-navy text-white" : "bg-white border border-lns-border"
                )}>
                  {student.name.charAt(0)}
                </div>
                <div className="text-left min-w-0 flex-1">
                  <p className={cn("text-[13px] font-black uppercase tracking-tight truncate", selectedStudentId === student.id ? "text-lns-navy" : "text-lns-mid-grey")}>
                    {student.name}
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">{student.idNumber}</p>
                </div>
                {selectedStudentId === student.id && <ChevronRight size={14} className="text-lns-red" />}
              </button>
            ))}
          </div>
        </aside>

        {/* Detail Panel: Student Record */}
        <section className="flex-1 overflow-y-auto bg-white p-6 md:p-10 scrollbar-hide">
          {selectedStudent && (
            <div className="max-w-3xl animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
              
              {/* Identity Header */}
              <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-[2rem] bg-lns-navy text-white flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-white">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black text-lns-navy uppercase tracking-tighter">{selectedStudent.name}</h2>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{selectedStudent.idNumber}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-lns-navy text-white px-3 py-1 rounded-full">{selectedStudent.class}</span>
                      <span className="flex items-center gap-2 text-[10px] font-black uppercase text-green-600 tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Live Node Sync
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                   <Button variant="outline" className="h-10 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 bg-white">
                      <Download size={14} /> Export File
                   </Button>
                   <Button className="h-10 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 bg-lns-navy text-white">
                      <Mail size={14} /> Message Asset
                   </Button>
                </div>
              </div>

              {/* Stats Row - Section 13 Spec */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Power Score", val: `${selectedStudent.powerScore}%`, icon: Zap, color: "text-lns-red" },
                  { label: "Arrival Delta", val: selectedStudent.attendance, icon: Clock, color: "text-green-500" },
                  { label: "Merits Earned", val: "450", icon: Award, color: "text-lns-navy" },
                  { label: "Auth Status", val: selectedStudent.status, icon: ShieldCheck, color: "text-blue-500" },
                ].map((stat, i) => (
                  <Card key={i} className="p-5 border-none shadow-sm bg-gray-50/50 rounded-2xl space-y-3 group hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <stat.icon size={18} className={stat.color} />
                      <span className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey">{stat.label}</span>
                    </div>
                    <p className="text-xl font-black text-lns-navy group-hover:text-lns-red transition-colors">{stat.val}</p>
                  </Card>
                ))}
              </div>

              {/* Detailed Breakdown Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy pb-2 border-b-2 border-lns-red/10 w-fit">Behavioral Insights</h3>
                    <p className="text-sm text-lns-mid-grey leading-relaxed italic uppercase font-bold tracking-tight">
                      Asset displays consistent resonance with institutional protocols. Strategic improvement in peer-to-peer synchronization noted in recent grading cycles. 
                    </p>
                    <div className="space-y-3">
                       {["Pioneer", "Resilient", "Collaborator"].map(trait => (
                         <div key={trait} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                           <span className="text-[11px] font-black uppercase tracking-widest text-lns-navy">{trait}</span>
                           <TrendingUp size={14} className="text-green-500" />
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy pb-2 border-b-2 border-lns-red/10 w-fit">Recent Identity Events</h3>
                    <div className="space-y-3">
                       {[
                         { event: 'Registry Scan', date: 'Today, 09:15', status: 'Success' },
                         { event: 'Audit Trail Up', date: 'Yesterday, 14:20', status: 'Stable' },
                         { event: 'Grade Hash Commit', date: '10 Apr, 11:30', status: 'Final' },
                       ].map((e, i) => (
                         <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-gray-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-lns-red" />
                            <div className="flex-1">
                               <p className="text-xs font-black uppercase text-lns-navy group-hover:text-lns-red transition-colors">{e.event}</p>
                               <p className="text-[9px] font-bold text-lns-mid-grey uppercase tracking-widest opacity-60">{e.date}</p>
                            </div>
                            <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-lg border border-green-100 uppercase tracking-widest">{e.status}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Footer System Meta */}
      <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-lns-mid-grey/40">
         <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em]">
            <TrendingUp size={14} /> Global Resonance Syncing
         </div>
         <div className="text-[9px] font-black uppercase tracking-[0.3em]">Institutional ID: LNS-COHORT-2026</div>
      </div>
    </div>
  );
}
