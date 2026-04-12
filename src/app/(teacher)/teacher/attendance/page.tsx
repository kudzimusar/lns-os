"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Check, 
  X, 
  Clock, 
  QrCode, 
  Printer, 
  Lock, 
  Search,
  Filter,
  ChevronDown,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AIFlag } from "@/components/ai/AIFlag";

const students = [
  { id: "1", name: "Abraham Lincoln", avatar: "AL", qrStatus: "scanned", status: "P", engagement: "L4", comment: "", aiFlag: { type: 'draft-ready' as const } },
  { id: "2", name: "Benjamin Franklin", avatar: "BF", qrStatus: "pending", status: "P", engagement: "L3", comment: "Came in active" },
  { id: "3", name: "Catherine Great", avatar: "CG", qrStatus: "scanned", status: "L", engagement: "L2", comment: "Late bus" },
  { id: "4", name: "David Copperfield", avatar: "DC", qrStatus: "pending", status: "A", engagement: "L1", comment: "", aiFlag: { type: 'at-risk' as const } },
  { id: "5", name: "Eleanor Roosevelt", avatar: "ER", qrStatus: "scanned", status: "P", engagement: "L4", comment: "" },
  { id: "6", name: "Franklin Roosevelt", avatar: "FR", qrStatus: "pending", status: "P", engagement: "L4", comment: "" },
  { id: "7", name: "George Washington", avatar: "GW", qrStatus: "scanned", status: "P", engagement: "L3", comment: "" },
];

import { useAITriggers } from "@/hooks/useAITriggers";

export default function AttendancePage() {
  const [locked, setLocked] = useState(false);
  
  // Activate Layer 3: Trigger Engine
  useAITriggers(students, 'Attendance');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">
            Attendance Register
          </h1>
          <p className="text-xs md:text-base text-lns-mid-grey font-medium leading-relaxed">
            Period 2: English 10A • <span className="text-lns-navy font-bold">Today, 11 Apr</span>
          </p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl text-[10px] uppercase font-black tracking-widest bg-white">
            <Printer size={16} className="mr-2" />
            Export PDF
          </Button>
          <Button 
            className="flex-1 md:flex-none h-12 rounded-xl text-[10px] uppercase font-black tracking-widest active:scale-95 transition-transform" 
            variant={locked ? "secondary" : "primary"} 
            onClick={() => setLocked(!locked)}
          >
            <Lock size={16} className="mr-2" />
            {locked ? "Locked to Chain" : "Lock & Sync"}
          </Button>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="h-10 text-[10px] font-black uppercase tracking-widest bg-white rounded-xl">
            <Filter size={14} className="mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="h-10 text-[10px] font-black uppercase tracking-widest bg-white rounded-xl">
            Class: 10A
            <ChevronDown size={14} className="ml-2" />
          </Button>
        </div>
        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          <AIFlag type="insight" entityId="class-10a" label="Class Insight Ready" />
          <div className="flex items-center space-x-2 bg-lns-navy/5 px-4 py-2 rounded-full border border-lns-navy/10 flex-shrink-0">
            <Zap size={14} className="text-lns-navy" />
            <span className="text-[9px] font-black text-lns-navy uppercase tracking-wider">Score: 92%</span>
          </div>
          <Button className="h-10 text-[10px] font-black uppercase tracking-widest border-lns-navy text-lns-navy font-bold hover:bg-lns-navy hover:text-white transition-all rounded-xl active:scale-95">
            Mark All Present
          </Button>
        </div>
      </div>

      {/* Mobile Card List (Section 11) */}
      <div className="md:hidden space-y-4">
        {students.map((student) => (
          <Card key={student.id} className="border-none shadow-sm bg-white p-4 space-y-4 rounded-2xl">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-lns-light-grey flex items-center justify-center text-lns-navy text-xs font-black border border-lns-border/10">
                  {student.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[13px] font-bold text-lns-navy">{student.name}</h4>
                    {student.aiFlag && <AIFlag type={student.aiFlag.type} entityId={student.id} />}
                  </div>
                  <div className="mt-1">
                    {student.qrStatus === "scanned" ? (
                      <span className="text-[8px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                        Auto-Marked
                      </span>
                    ) : (
                      <span className="text-[8px] font-black uppercase tracking-widest text-lns-mid-grey bg-lns-light-grey px-2.5 py-1 rounded-full">
                        Manual Entry
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center bg-lns-light-grey/30 rounded-xl p-1 gap-1">
                {["P", "A", "L"].map((m) => (
                  <button
                    key={m}
                    className={cn(
                      "w-11 h-11 rounded-lg text-xs font-black transition-all border",
                      student.status === m
                        ? m === "P" ? "bg-green-600 border-green-600 text-white shadow-md scale-105" : 
                          m === "A" ? "bg-lns-red border-lns-red text-white shadow-md scale-105" : 
                          "bg-amber-500 border-amber-500 text-white shadow-md scale-105"
                        : "bg-white border-lns-border/20 text-lns-mid-grey"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-lns-border/5">
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-lns-mid-grey px-1">Engagement</label>
                <select className="w-full bg-lns-light-grey/50 border-none rounded-xl text-[10px] font-bold h-12 px-3 appearance-none">
                  <option value="L1">Level 1</option>
                  <option value="L2">Level 2</option>
                  <option value="L3">Level 3</option>
                  <option value="L4" selected={student.engagement === "L4"}>Level 4</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-lns-mid-grey px-1">Insight</label>
                <input 
                  type="text" 
                  placeholder="Note..." 
                  defaultValue={student.comment}
                  className="w-full bg-lns-light-grey/50 border-none rounded-xl text-[10px] font-bold h-12 px-3 focus:ring-1 focus:ring-lns-navy outline-none" 
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop Table View (Hidden on Mobile) */}
      <Card className="hidden md:block border-none shadow-sm overflow-hidden bg-white rounded-[2rem]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-lns-border bg-lns-light-grey/50">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Student Name</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Verification Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Protocol Mark</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Engagement Node</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Insight Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lns-border">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-lns-light-grey/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-lns-navy/5 text-lns-navy flex items-center justify-center text-xs font-black shrink-0 border border-lns-navy/10">
                        {student.avatar}
                      </div>
                      <div className="flex flex-col">
                        <Link href={`/teacher/students/${student.id}`} className="text-sm font-bold text-lns-navy whitespace-nowrap hover:text-lns-red transition-colors">
                          {student.name}
                        </Link>
                        {student.aiFlag && <AIFlag type={student.aiFlag.type} entityId={student.id} className="mt-1 w-fit" />}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {student.qrStatus === "scanned" ? (
                        <div className="flex items-center text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tight shadow-sm border border-green-100">
                          <Check size={12} className="mr-1.5" />
                          Authenticated
                        </div>
                      ) : (
                        <div className="flex items-center text-lns-mid-grey bg-lns-light-grey px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tight border border-lns-border/20">
                          <Clock size={12} className="mr-1.5" />
                          Awaiting Sync
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center space-x-1.5 p-1 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                      {["P", "A", "L"].map((m) => (
                        <button
                          key={m}
                          className={cn(
                            "w-9 h-9 rounded-lg text-xs font-black transition-all border",
                            student.status === m
                              ? m === "P" ? "bg-green-600 border-green-600 text-white shadow-md" : 
                                m === "A" ? "bg-lns-red border-lns-red text-white shadow-md" : 
                                "bg-amber-500 border-amber-500 text-white shadow-md"
                              : "bg-white border-lns-border/30 text-lns-mid-grey hover:border-lns-navy hover:text-lns-navy"
                          )}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select className="bg-lns-light-grey/50 border border-lns-border/10 rounded-xl text-xs font-bold px-4 py-2 focus:ring-1 focus:ring-lns-navy outline-none">
                      <option value="L1">Level 1</option>
                      <option value="L2">Level 2</option>
                      <option value="L3">Level 3</option>
                      <option value="L4" selected={student.engagement === "L4"}>Level 4</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="relative group/input">
                      <input 
                        type="text" 
                        placeholder="Add insight..." 
                        defaultValue={student.comment}
                        className="w-full bg-transparent text-sm border-b border-lns-border/20 focus:border-lns-navy outline-none placeholder:text-lns-mid-grey/30 placeholder:italic transition-all p-1 pr-8" 
                      />
                      <button className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/input:opacity-100 transition-opacity text-slate-400 hover:text-red-600">
                        <Sparkles size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
