"use client";

import React from "react";
import { 
  Heart, 
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
  Lock,
  FileText,
  Activity
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ieps = [
  { id: 'IEP-001', student: 'Amara Johnson', class: 'Grade 7A', disability: 'Dyslexia Node', support: 'Laptop + Extra Time', status: 'Verified', review: 'June 2026' },
  { id: 'IEP-002', student: 'David Moyo', class: 'Grade 8A', disability: 'ADHD Anchor', support: 'Break Protocol', status: 'Verified', review: 'May 2026' },
  { id: 'IEP-003', student: 'Cara Mensah', class: 'Grade 7B', disability: 'Visual Processing', support: 'Large Font Meta', status: 'Review Required', review: 'IMMEDIATE' },
];

export default function BehaviourIEPPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-2">
           <Link href="/teacher/behaviour" className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey hover:text-lns-red flex items-center gap-2 transition-colors mb-4">
              <ArrowLeft size={14} /> Back to Behaviour Hub
           </Link>
           <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
              <Heart size={32} className="text-lns-red" />
              IEP Persistence Registry
           </h1>
           <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Individual Educational Provision Nodes • Secure Institutional Records</p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all flex items-center gap-2">
             <FileText size={18} />
             Upload Provision Document
           </Button>
        </div>
      </div>

      {/* IEP Table */}
      <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
         <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy italic font-black">Provision Lattice</h3>
            <div className="flex items-center gap-3">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input placeholder="Search IEP Nodes..." className="h-11 bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 text-[10px] font-black uppercase tracking-widest text-lns-navy outline-none w-64 shadow-inner" />
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
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Primary Support Node</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Institutional Provision</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Auth Status</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-right">Verification</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {ieps.map((iep) => (
                    <tr key={iep.id} className="hover:bg-gray-50/80 transition-all group cursor-pointer">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-lns-red text-white flex items-center justify-center font-black text-xs shadow-xl uppercase italic">{iep.student.charAt(0)}</div>
                             <div>
                                <p className="text-sm font-black text-lns-navy italic leading-none">{iep.student}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{iep.class}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-sm font-black text-lns-navy uppercase italic">{iep.disability}</p>
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5">Review: {iep.review}</p>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-xs font-black text-lns-navy uppercase italic">{iep.support}</p>
                       </td>
                       <td className="px-8 py-6 text-center">
                          <span className={cn(
                            "px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic border",
                            iep.status === 'Verified' ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-lns-red border-red-100 animate-pulse"
                          )}>
                             {iep.status}
                          </span>
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

      {/* Security Alert */}
      <div className="p-10 bg-lns-navy rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10 border-none shadow-2xl relative overflow-hidden group">
         <div className="w-20 h-20 rounded-[2rem] bg-lns-red flex items-center justify-center shadow-xl z-10 shrink-0">
            <Lock size={36} />
         </div>
         <div className="space-y-2 z-10">
            <h3 className="text-2xl font-black italic uppercase tracking-tight">Persistence Encryption Active</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xl">
               All IEP records are poly-sealed with institutional keys. Access is restricted to authorized faculty and administrative nodes only. Compliance with data sovereignty protocols is enforced at all times.
            </p>
         </div>
         <ShieldCheck size={180} className="absolute -bottom-10 -right-10 text-white/5 pointer-events-none group-hover:scale-110 transition-transform" />
      </div>

      {/* Footer System Meta */}
      <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
         <div className="flex items-center gap-8 text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">
            <div className="flex items-center gap-2"><Lock size={14} /> Data Sovereignty: Enforced</div>
            <div className="flex items-center gap-2 text-green-600"><ShieldCheck size={14} /> HIPAA/GDPR Mesh Synchronized</div>
         </div>
         <div className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">LNS OS // Privacy-Lattice V4.0</div>
      </div>
    </div>
  );
}
