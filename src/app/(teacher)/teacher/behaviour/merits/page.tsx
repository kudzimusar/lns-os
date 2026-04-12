"use client";

import React from "react";
import { 
  Award, 
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
  Star,
  Sparkles,
  Heart
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const merits = [
  { id: 'MRT-772', student: 'Amara Johnson', class: 'Grade 7A', reason: 'Institutional Synthesis Excellence', value: 100, category: 'Academic', status: 'Sealed', time: '2 hrs ago' },
  { id: 'MRT-771', student: 'Blake Nkosi', class: 'Grade 7A', reason: 'Collaborative Resonance', value: 50, category: 'Citizenship', status: 'Sealed', time: '4 hrs ago' },
  { id: 'MRT-770', student: 'Elena Petrov', class: 'Grade 8A', reason: 'Peer Mentorship Node', value: 75, category: 'Leadership', status: 'Sealed', time: 'Yesterday' },
];

export default function BehaviourMeritsPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-2">
           <Link href="/teacher/behaviour" className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey hover:text-lns-red flex items-center gap-2 transition-colors mb-4">
              <ArrowLeft size={14} /> Back to Behaviour Hub
           </Link>
           <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
              <Award size={32} className="text-amber-500" />
              Merit Recognition Hub
           </h1>
           <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Citizenship Resonance Engine • Excellence Protocol Registry</p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all flex items-center gap-2">
             <Plus size={18} />
             Award New Merit Node
           </Button>
        </div>
      </div>

      {/* Persistence Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Community Resonance", val: "94%", icon: Sparkles, color: "text-amber-500" },
           { label: "Total Merits Month", val: "1,242", icon: Star, color: "text-lns-navy" },
           { label: "Peer Validation", val: "Active", icon: Heart, color: "text-lns-red" },
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

      {/* Merits Table */}
      <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
         <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy italic font-black">Persistent Recognition Ledger</h3>
            <div className="flex items-center gap-3">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input placeholder="Search Excellence..." className="h-11 bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 text-[10px] font-black uppercase tracking-widest text-lns-navy outline-none w-64 shadow-inner" />
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
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Recognition Reason</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Protocol Points</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Auth Status</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-right">Verification</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {merits.map((merit) => (
                    <tr key={merit.id} className="hover:bg-gray-50/80 transition-all group cursor-pointer">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xs shadow-xl uppercase italic border border-amber-100">{merit.student.charAt(0)}</div>
                             <div>
                                <p className="text-sm font-black text-lns-navy italic leading-none">{merit.student}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{merit.class}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-sm font-black text-lns-navy uppercase italic">{merit.reason}</p>
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5">{merit.category} • {merit.time}</p>
                       </td>
                       <td className="px-8 py-6 text-center">
                          <span className="text-lg font-[900] text-amber-500 italic">+{merit.value}</span>
                          <p className="text-[8px] font-black text-slate-300 uppercase mt-1">Sovereign Points</p>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center justify-center">
                             <span className="px-3 py-1.5 rounded-xl bg-green-50 text-green-600 text-[9px] font-black uppercase tracking-widest italic flex items-center gap-2 border border-green-100">
                                <ShieldCheck size={12} />
                                {merit.status}
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

      {/* Footer System Meta */}
      <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
         <div className="flex items-center gap-8 text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">
            <div className="flex items-center gap-2 text-amber-500"><Sparkles size={14} /> Institutional Excellence Cap: 20,000 Pts</div>
            <div className="flex items-center gap-2 text-green-600"><ShieldCheck size={14} /> Merit Persistence Guaranteed</div>
         </div>
         <div className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">LNS OS // Excellence-Lattice V1.4</div>
      </div>
    </div>
  );
}
