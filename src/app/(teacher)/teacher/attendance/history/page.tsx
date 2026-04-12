"use client";

import React from "react";
import { 
  History, 
  Search, 
  Filter, 
  Calendar, 
  Printer, 
  ChevronRight, 
  TrendingUp, 
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const history = [
  { id: 'att-991', date: 'Apr 11, 2026', class: 'English 10A', session: 'Period 2', present: 22, absent: 2, late: 0, status: 'Synced' },
  { id: 'att-990', date: 'Apr 11, 2026', class: 'English 10A', session: 'Period 1', present: 24, absent: 0, late: 0, status: 'Synced' },
  { id: 'att-989', date: 'Apr 10, 2026', class: 'English 10A', session: 'Period 4', present: 20, absent: 3, late: 1, status: 'Synced' },
  { id: 'att-988', date: 'Apr 10, 2026', class: 'English 10A', session: 'Period 2', present: 23, absent: 1, late: 0, status: 'Synced' },
];

export default function AttendanceHistoryPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-1">
          <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
             <History size={32} className="text-lns-red" />
             Attendance Ledger
          </h1>
          <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Institutional Attendance Chain History • Cycle 2026</p>
        </div>
        <Button variant="outline" className="h-14 bg-white border-gray-100 rounded-2xl px-8 font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center gap-2">
           <Printer size={18} />
           Export Ledger Archive
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Term Punctuality", val: "98.4%", icon: TrendingUp, color: "text-green-600" },
           { label: "Total Syncs", val: "1,240", icon: History, color: "text-lns-navy" },
           { label: "Audit Mismatches", val: "0", icon: ShieldCheck, color: "text-lns-red" },
         ].map((stat, i) => (
           <Card key={i} className="p-8 border-none shadow-xl bg-white rounded-[2rem] flex flex-col justify-between group cursor-default">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-all", stat.color, "bg-gray-50 group-hover:bg-lns-navy group-hover:text-white")}>
                 <stat.icon size={24} />
              </div>
              <div>
                 <p className="text-3xl font-[900] text-lns-navy tracking-tighter">{stat.val}</p>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey mt-1">{stat.label}</p>
              </div>
           </Card>
         ))}
      </div>

      {/* History Table */}
      <Card className="border-none shadow-2xl bg-white overflow-hidden rounded-[2.5rem]">
         <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy italic">Persistent Records</h3>
            <div className="flex items-center gap-3">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input placeholder="Search Date / Node..." className="h-11 bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 text-[10px] font-black uppercase tracking-widest text-lns-navy focus:bg-white outline-none w-64" />
               </div>
               <Button variant="outline" className="h-11 border-gray-100 rounded-xl px-4 text-[10px] uppercase font-black tracking-widest text-lns-mid-grey bg-white">
                  <Filter size={16} />
               </Button>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-gray-50/50">
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Session Node</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Institutional Date</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Persistence</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Auth Status</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-right">Verification</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {history.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50/80 transition-all group cursor-pointer">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-lns-navy/5 text-lns-navy flex items-center justify-center font-black text-xs shadow-inner uppercase italic">{record.class.charAt(0)}</div>
                             <div>
                                <p className="text-sm font-black text-lns-navy italic leading-none">{record.class}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{record.session}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-sm font-black text-lns-navy uppercase italic">{record.date}</td>
                       <td className="px-8 py-6">
                          <div className="flex items-center justify-center gap-4">
                             <div className="text-center">
                                <p className="text-xs font-black text-green-600 leading-none">{record.present}</p>
                                <p className="text-[8px] font-black text-slate-400 uppercase mt-1">Present</p>
                             </div>
                             <div className="text-center">
                                <p className="text-xs font-black text-lns-red leading-none">{record.absent}</p>
                                <p className="text-[8px] font-black text-slate-400 uppercase mt-1">Absent</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center justify-center">
                             <span className="px-3 py-1.5 rounded-xl bg-green-50 text-green-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 border border-green-100">
                                <CheckCircle2 size={12} />
                                {record.status}
                             </span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-200 group-hover:text-lns-red transition-all">
                             <ChevronRight size={20} />
                          </Button>
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
