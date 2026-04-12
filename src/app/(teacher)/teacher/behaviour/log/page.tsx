"use client";

import React from "react";
import { 
  AlertCircle, 
  Search, 
  Filter, 
  Plus, 
  ChevronRight, 
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  Clock,
  User,
  Zap,
  MoreVertical,
  Activity
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const logs = [
  { id: 'LOG-992', student: 'David Moyo', class: 'Grade 8A', incident: 'Classroom Protocol Disruption', severity: 'Medium', status: 'Resolution Logged', time: '10:30 AM' },
  { id: 'LOG-991', student: 'Cara Mensah', class: 'Grade 7B', incident: 'Institutional Uniform Node Breach', severity: 'Low', status: 'Verbal Correction', time: '09:15 AM' },
  { id: 'LOG-990', student: 'Fatima Al-Rashid', class: 'Grade 8B', incident: 'Secure Device Misuse', severity: 'High', status: 'Pending Review', time: 'Yesterday' },
];

export default function BehaviourLogPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-2">
           <Link href="/teacher/behaviour" className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey hover:text-lns-red flex items-center gap-2 transition-colors mb-4">
              <ArrowLeft size={14} /> Back to Behaviour Hub
           </Link>
           <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
              <AlertCircle size={32} className="text-lns-red" />
              Incident Protocol Log
           </h1>
           <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Active Discrepancy Registry • Sovereign Persistence Tracking</p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all flex items-center gap-2">
             <Plus size={18} />
             Initialize New Log
           </Button>
        </div>
      </div>

      {/* Persistence Ledger */}
      <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
         <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy italic">Historical Node Ledger</h3>
            <div className="flex items-center gap-3">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input placeholder="Search Logs..." className="h-11 bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 text-[10px] font-black uppercase tracking-widest text-lns-navy outline-none w-64 shadow-inner" />
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
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Identification</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Protocol Breach</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Severity</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Resolution</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-right">Verification</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/80 transition-all group cursor-pointer">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-lns-navy text-white flex items-center justify-center font-black text-xs shadow-xl uppercase italic">{log.student.charAt(0)}</div>
                             <div>
                                <p className="text-sm font-black text-lns-navy italic leading-none">{log.student}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{log.class}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-sm font-black text-lns-navy uppercase italic">{log.incident}</p>
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5">{log.time}</p>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center justify-center">
                             <span className={cn(
                               "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest italic",
                               log.severity === 'High' ? "bg-red-50 text-lns-red border border-red-100" : 
                               log.severity === 'Medium' ? "bg-amber-50 text-amber-600 border border-amber-100" : 
                               "bg-gray-50 text-slate-500 border border-gray-100"
                             )}>
                                {log.severity} Node
                             </span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-center">
                          <span className="text-[10px] font-black text-lns-navy uppercase tracking-widest opacity-60 italic">{log.status}</span>
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

      {/* Footer System Meta */}
      <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
         <div className="flex items-center gap-8 text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">
            <div className="flex items-center gap-2"><Zap size={14} /> Registry Throughput: 12ms</div>
            <div className="flex items-center gap-2 text-red-600"><AlertCircle size={14} /> High-Severity Resonance Identified</div>
         </div>
         <div className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">LNS OS // Discrepancy-Ledger V3.1</div>
      </div>
    </div>
  );
}
