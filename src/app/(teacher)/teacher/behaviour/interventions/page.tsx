"use client";

import React from "react";
import { 
  Activity, 
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
  Target,
  Layers,
  Heart
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const interventions = [
  { id: 'INT-552', student: 'David Moyo', class: 'Grade 8A', strategy: 'Proximity Control Protocol', focus: 'Engagement', progress: 65, status: 'Active', time: 'Started 2w ago' },
  { id: 'INT-551', student: 'Cara Mensah', class: 'Grade 7B', strategy: 'Visual Schedule Anchor', focus: 'Organization', progress: 40, status: 'Active', time: 'Started 1w ago' },
  { id: 'INT-550', student: 'Fatima Al-Rashid', class: 'Grade 8B', strategy: 'Peer Synthesis Support', focus: 'Collaboration', progress: 100, status: 'Resolved', time: 'Resolved Today' },
];

export default function BehaviourInterventionsPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-2">
           <Link href="/teacher/behaviour" className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey hover:text-lns-red flex items-center gap-2 transition-colors mb-4">
              <ArrowLeft size={14} /> Back to Behaviour Hub
           </Link>
           <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
              <Activity size={32} className="text-lns-navy" />
              Intervention Engine
           </h1>
           <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Support Strategy Ledger • Adaptive Learning Resonance Tracking</p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all flex items-center gap-2">
             <Plus size={18} />
             Initialize Support Node
           </Button>
        </div>
      </div>

      {/* Persistence Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Intervention Efficacy", val: "88%", icon: Target, color: "text-lns-navy" },
           { label: "Active Strategies", val: "24", icon: Layers, color: "text-lns-red" },
           { label: "Successful Resolutions", val: "142", icon: Heart, color: "text-green-600" },
         ].map((stat, i) => (
           <Card key={i} className="p-8 border-none shadow-xl bg-white rounded-[2rem] flex flex-col justify-between group cursor-default h-48">
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

      {/* Strategies Table */}
      <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
         <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy italic font-black">Active Strategy Ledger</h3>
            <div className="flex items-center gap-3">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input placeholder="Search Strategies..." className="h-11 bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 text-[10px] font-black uppercase tracking-widest text-lns-navy outline-none w-64 shadow-inner" />
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
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Strategy Node</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Efficacy Node</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Protocol Status</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-right">Verification</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {interventions.map((int) => (
                    <tr key={int.id} className="hover:bg-gray-50/80 transition-all group cursor-pointer">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-lns-navy text-white flex items-center justify-center font-black text-xs shadow-xl uppercase italic">{int.student.charAt(0)}</div>
                             <div>
                                <p className="text-sm font-black text-lns-navy italic leading-none">{int.student}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{int.class}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-sm font-black text-lns-navy uppercase italic">{int.strategy}</p>
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5">{int.focus} Focus • {int.time}</p>
                       </td>
                       <td className="px-8 py-6">
                          <div className="space-y-2 max-w-[120px] mx-auto">
                             <div className="flex justify-between items-center text-[8px] font-black uppercase text-slate-400 tracking-widest">
                                <span>Progress</span>
                                <span className="text-lns-navy">{int.progress}%</span>
                             </div>
                             <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                <div className={cn("h-full rounded-full transition-all duration-1000", int.progress === 100 ? "bg-green-500" : "bg-lns-navy")} style={{ width: `${int.progress}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-center">
                          <span className={cn(
                            "px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest italic border",
                            int.status === 'Resolved' ? "bg-green-50 text-green-600 border-green-100" : "bg-lns-navy/5 text-lns-navy border-lns-navy/10"
                          )}>
                             {int.status}
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

      {/* Footer System Meta */}
      <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
         <div className="flex items-center gap-8 text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">
            <div className="flex items-center gap-2 text-lns-navy"><Zap size={14} /> Intervention Latency: 4ms</div>
            <div className="flex items-center gap-2 text-green-600"><ShieldCheck size={14} /> Resolution Protocol Verified</div>
         </div>
         <div className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">LNS OS // Support-Lattice V1.2</div>
      </div>
    </div>
  );
}
