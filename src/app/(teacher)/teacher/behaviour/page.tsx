"use client";

import React from "react";
import { 
  ShieldCheck, 
  AlertCircle, 
  Award, 
  Activity, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight,
  TrendingUp,
  User,
  Zap,
  Clock,
  Heart,
  Scale
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Citizneship Avg", val: "B+", icon: Scale, color: "text-lns-navy" },
  { label: "Active IEPs", val: "14", icon: Heart, color: "text-lns-red" },
  { label: "Merits Today", val: "42", icon: Award, color: "text-amber-500" },
  { label: "Open Incidents", val: "3", icon: AlertCircle, color: "text-red-600" },
];

const categories = [
  { id: 'log', title: 'Incident Protocol Log', desc: 'Secure record of behavioural discrepancies and sanctions.', icon: AlertCircle, color: 'text-red-600', href: '/teacher/behaviour/log' },
  { id: 'merits', title: 'Merit Recognition Hub', desc: 'Acknowledge student excellence and citizenship resonance.', icon: Award, color: 'text-amber-500', href: '/teacher/behaviour/merits' },
  { id: 'interventions', title: 'Intervention Engine', desc: 'Manage and track focused student support strategies.', icon: Activity, color: 'text-lns-navy', href: '/teacher/behaviour/interventions' },
  { id: 'iep', title: 'IEP Persistence Registry', desc: 'Access and update Individual Educational Provision nodes.', icon: Heart, color: 'text-lns-red', href: '/teacher/behaviour/iep' },
];

export default function BehaviourHubPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-1">
          <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
             <ShieldCheck size={32} className="text-lns-red" />
             Behaviour & Sovereignty
          </h1>
          <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Institutional Conduct Ledger • Dynamic Citizenship Monitoring</p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all flex items-center gap-2">
             <Plus size={18} />
             Log New Conduct Entry
           </Button>
        </div>
      </div>

      {/* Persistence Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
            <Card key={i} className="p-8 border-none shadow-xl bg-white rounded-[2rem] flex flex-col justify-between group hover:shadow-2xl transition-all h-40">
               <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:bg-lns-navy group-hover:text-white", "bg-gray-50", stat.color)}>
                  <stat.icon size={20} />
               </div>
               <div>
                  <p className="text-3xl font-[900] text-lns-navy tracking-tighter">{stat.val}</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey mt-1">{stat.label}</p>
               </div>
            </Card>
         ))}
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {categories.map((cat) => (
            <Link key={cat.id} href={cat.href}>
               <Card className="p-10 border-none shadow-xl bg-white rounded-[3rem] hover:translate-x-2 transition-transform group cursor-pointer border-l-8 border-transparent hover:border-lns-red min-h-[180px] flex items-center justify-between">
                  <div className="flex items-center gap-8">
                     <div className={cn("w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-xl transition-all group-hover:scale-110", "bg-gray-50", cat.color)}>
                        <cat.icon size={36} />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-2xl font-black text-lns-navy italic tracking-tight uppercase group-hover:text-lns-red transition-colors">{cat.title}</h3>
                        <p className="text-xs text-lns-mid-grey font-medium leading-relaxed max-w-xs">{cat.desc}</p>
                     </div>
                  </div>
                  <ChevronRight size={32} className="text-gray-100 group-hover:text-lns-navy transition-colors" />
               </Card>
            </Link>
         ))}
      </div>

      {/* Recent Activity Ledger */}
      <div className="space-y-6">
         <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic flex items-center gap-4">
            <Clock size={18} className="text-lns-red" />
            Recent Protocol Events
         </h3>
         <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
            <div className="divide-y divide-gray-50">
               {[
                 { student: 'Amara Johnson', type: 'Merit', reason: 'Institutional Synthesis Excellence', time: '2 hours ago', icon: Award, color: 'text-amber-500' },
                 { student: 'David Moyo', type: 'Incident', reason: 'Node Sync Interruption', time: '4 hours ago', icon: AlertCircle, color: 'text-lns-red' },
                 { student: 'Elena Petrov', type: 'Merit', reason: 'Peer Collaborative Resonance', time: 'Yesterday', icon: Award, color: 'text-amber-500' },
               ].map((event, i) => (
                 <div key={i} className="p-8 flex items-center justify-between hover:bg-gray-50/80 transition-all group cursor-pointer">
                    <div className="flex items-center gap-6">
                       <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs shadow-inner", "bg-gray-100", event.color)}>
                          <event.icon size={22} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-lns-navy italic leading-none">{event.student}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{event.type} • {event.reason}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{event.time}</p>
                    </div>
                 </div>
               ))}
            </div>
         </Card>
      </div>

      {/* Footer System Meta */}
      <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
         <div className="flex items-center gap-8 text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">
            <div className="flex items-center gap-2"><TrendingUp size={14} /> Global Citizenship Mean: 94.2%</div>
            <div className="flex items-center gap-2"><ShieldCheck size={14} /> Encryption Layer: Poly-Sealed</div>
         </div>
         <div className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">LNS OS // Ethics-Lattice V1.2</div>
      </div>
    </div>
  );
}
