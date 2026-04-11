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

const students = [
  { id: "1", name: "Abraham Lincoln", avatar: "AL", qrStatus: "scanned", status: "P", engagement: "L4", comment: "" },
  { id: "2", name: "Benjamin Franklin", avatar: "BF", qrStatus: "pending", status: "P", engagement: "L3", comment: "Came in active" },
  { id: "3", name: "Catherine Great", avatar: "CG", qrStatus: "scanned", status: "L", engagement: "L2", comment: "Late bus" },
  { id: "4", name: "David Copperfield", avatar: "DC", qrStatus: "pending", status: "A", engagement: "L1", comment: "" },
  { id: "5", name: "Eleanor Roosevelt", avatar: "ER", qrStatus: "scanned", status: "P", engagement: "L4", comment: "" },
  { id: "6", name: "Franklin Roosevelt", avatar: "FR", qrStatus: "pending", status: "P", engagement: "L4", comment: "" },
  { id: "7", name: "George Washington", avatar: "GW", qrStatus: "scanned", status: "P", engagement: "L3", comment: "" },
];

export default function AttendancePage() {
  const [locked, setLocked] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">
            Attendance Register
          </h1>
          <p className="text-lns-mid-grey font-medium">
            Period 2: English 10A • <span className="text-lns-navy font-bold">Today, 11 Apr</span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Printer size={18} className="mr-2" />
            Export PDF
          </Button>
          <Button size="sm" variant={locked ? "secondary" : "primary"} onClick={() => setLocked(!locked)}>
            <Lock size={18} className="mr-2" />
            {locked ? "Locked to Chain" : "Lock & Sync"}
          </Button>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="bg-white">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="bg-white">
            Class: 10A
            <ChevronDown size={16} className="ml-2" />
          </Button>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          <div className="flex items-center space-x-2 bg-lns-navy/5 px-3 py-1.5 rounded-xl border border-lns-navy/10">
            <Zap size={16} className="text-lns-navy" />
            <span className="text-xs font-[800] text-lns-navy uppercase tracking-wider">Power Score: 92%</span>
          </div>
          <Button size="sm" variant="outline" className="text-lns-navy font-bold hover:bg-lns-navy hover:text-white transition-all">
            Mark All Present
          </Button>
        </div>
      </div>

      {/* Attendance Table */}
      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-lns-border bg-lns-light-grey/50">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-lns-mid-grey">Student Name</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-lns-mid-grey">QR Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-lns-mid-grey text-center">Mark</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-lns-mid-grey">Engagement</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-lns-mid-grey">Comment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lns-border">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-lns-light-grey/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-9 h-9 rounded-lg bg-lns-light-grey flex items-center justify-center text-lns-navy text-xs font-bold shrink-0">
                        {student.avatar}
                      </div>
                      <span className="text-sm font-bold text-lns-navy whitespace-nowrap">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {student.qrStatus === "scanned" ? (
                        <div className="flex items-center text-green-600 bg-green-50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                          <Check size={12} className="mr-1" />
                          Auto-marked
                        </div>
                      ) : (
                        <div className="flex items-center text-lns-mid-grey bg-lns-light-grey px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                          <Clock size={12} className="mr-1" />
                          Pending
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-1">
                      {["P", "A", "L"].map((m) => (
                        <button
                          key={m}
                          className={cn(
                            "w-8 h-8 rounded-lg text-xs font-bold transition-all border",
                            student.status === m
                              ? m === "P" ? "bg-green-600 border-green-600 text-white shadow-sm" : 
                                m === "A" ? "bg-lns-red border-lns-red text-white shadow-sm" : 
                                "bg-amber-500 border-amber-500 text-white shadow-sm"
                              : "bg-white border-lns-border text-lns-mid-grey hover:border-lns-navy hover:text-lns-navy"
                          )}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select className="bg-lns-light-grey/50 border-none rounded-lg text-xs font-bold px-3 py-1.5 focus:ring-1 focus:ring-lns-navy outline-none">
                      <option value="L1">Level 1</option>
                      <option value="L2">Level 2</option>
                      <option value="L3">Level 3</option>
                      <option value="L4" selected={student.engagement === "L4"}>Level 4</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <input 
                      type="text" 
                      placeholder="Add insight..." 
                      defaultValue={student.comment}
                      className="w-full bg-transparent text-sm border-b border-transparent focus:border-lns-navy outline-none placeholder:text-lns-mid-grey/50 placeholder:italic transition-all" 
                    />
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
