"use client";

import React from "react";
import { 
  Bell, 
  ArrowLeft, 
  ChevronRight, 
  Zap, 
  CheckCircle2, 
  Activity,
  Mail,
  Smartphone,
  MessageSquare,
  ShieldCheck,
  Globe,
  Monitor
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CHANNELS = [
  { id: 'push', label: 'Push Hub Notifications', icon: Monitor, status: true, desc: 'Real-time OS lattice alerts on desktop/mobile.' },
  { id: 'email', label: 'Institutional Email Node', icon: Mail, status: true, desc: 'Daily academic summaries and audit logs.' },
  { id: 'sms', label: 'SMS Security Bridge', icon: MessagesSquare, status: false, desc: 'Critical high-priority authorization alerts.' },
];

const PREFERENCES = [
  { label: 'Grade Release Alerts', channel: 'All', priority: 'High' },
  { label: 'Attendance Sync Conflicts', channel: 'Push', priority: 'Technical' },
  { label: 'Institutional Broadcasts', channel: 'Email', priority: 'Low' },
  { label: 'Security Handshake Alerts', channel: 'SMS', priority: 'Critical' },
];

export default function SettingsNotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/settings" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-lns-navy transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Account Core
            </Link>
            <h1 className="text-5xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-6">
               <Bell size={48} className="text-lns-red" />
               Communication Flow
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] italic tracking-tight">Institutional Broadcast Layer • Status: Hub Active</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Main content (75%) */}
         <div className="lg:col-span-3 space-y-12">
            
            {/* Delivery Channels */}
            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-8 italic flex items-center gap-4">
                  <Activity size={18} className="text-lns-red" />
                  Authorized Delivery Channels
               </h3>
               
               <div className="grid grid-cols-1 gap-4">
                  {CHANNELS.map((ch) => (
                    <Card key={ch.id} className="p-8 border-none shadow-xl bg-white rounded-[3rem] group hover:translate-x-2 transition-transform cursor-pointer relative overflow-hidden">
                       <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-6">
                             <div className={cn(
                               "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-all",
                               ch.status ? "bg-lns-navy text-white" : "bg-gray-100 text-slate-300"
                             )}>
                                <ch.icon size={24} />
                             </div>
                             <div>
                                <h4 className="text-lg font-black text-lns-navy italic tracking-tight">{ch.label}</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mt-1 leading-none">{ch.desc}</p>
                             </div>
                          </div>
                          <div className={cn(
                            "w-12 h-6 rounded-full relative transition-all cursor-pointer",
                            ch.status ? "bg-lns-red" : "bg-gray-200"
                          )}>
                             <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-all", ch.status ? "right-1" : "left-1")} />
                          </div>
                       </div>
                    </Card>
                  ))}
               </div>
            </div>

            {/* Granular Preferences */}
            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-8 italic flex items-center gap-4">
                  <ShieldCheck size={18} className="text-lns-red" />
                  Institutional Event Filtering
               </h3>
               
               <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
                  <div className="divide-y divide-gray-50">
                     {PREFERENCES.map((pref, i) => (
                       <div key={i} className="p-8 flex items-center justify-between hover:bg-gray-50 transition-all group cursor-pointer border-l-4 border-transparent hover:border-lns-red">
                          <div className="flex items-center gap-6">
                             <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lns-navy group-hover:bg-lns-navy group-hover:text-white transition-all shadow-inner font-black text-[10px] italic">
                                {pref.priority[0]}
                             </div>
                             <div>
                                <h4 className="text-sm font-black text-lns-navy italic tracking-tight uppercase leading-none">{pref.label}</h4>
                                <p className="text-[9px] font-black uppercase text-slate-400 mt-2">Target Node: {pref.channel} Hub</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-6">
                             <span className={cn(
                               "px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest italic",
                               pref.priority === 'Critical' ? "bg-red-50 text-lns-red" :
                               pref.priority === 'High' ? "bg-amber-50 text-amber-600" :
                               "bg-gray-50 text-slate-500"
                             )}>
                                {pref.priority}
                             </span>
                             <ChevronRight size={18} className="text-gray-100 group-hover:text-lns-navy transition-all" />
                          </div>
                       </div>
                     ))}
                  </div>
               </Card>
            </div>
         </div>

         {/* Sidebar Bio (25%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-10 overflow-hidden relative group">
               <div className="relative z-10 space-y-8 text-center">
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Broadcast Resonance</p>
                     <p className="text-4xl font-[900] tracking-tighter text-white leading-tight italic uppercase">Flow Synchrony</p>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2 text-center overflow-hidden">
                        <div className="flex justify-between items-end mb-1">
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Hub Active</p>
                           <p className="text-[9px] font-black uppercase tracking-widest text-lns-red">0ms Latency</p>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-lns-red w-full shadow-[0_0_20px_rgba(214,43,43,1)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "Your communication flow is synchronized with the institutional gateway. Real-time push protocols are active across all associated terminal nodes."
                     </p>
                  </div>
               </div>
               <Globe className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none group-hover:scale-125 transition-transform" />
            </Card>

            <div className="p-8 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200 flex flex-col items-center gap-4 text-center">
               <Zap size={32} className="text-amber-500 animate-pulse" />
               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-900 leading-relaxed italic pr-4 pl-4">
                  Note: SMS alerts are limited to Critical/Security nodes only.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
import { MessagesSquare } from "lucide-react";
