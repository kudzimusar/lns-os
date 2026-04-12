"use client";

import React from "react";
import { 
  History, 
  ArrowLeft, 
  ShieldCheck, 
  Activity, 
  Database, 
  Lock, 
  FileText, 
  ChevronRight,
  Zap,
  Globe,
  Cpu,
  MoreVertical,
  Layers,
  Archive
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const AUDIT_TRAIL = [
  { id: 'ev-9901', action: 'Grade Registry Signed', node: 'English 10A Node', date: 'Today, 10:24 AM', hash: '8f4c4...1e2f' },
  { id: 'ev-9902', action: 'Attendance Sync', node: 'Classroom Gateway 7', date: 'Today, 09:12 AM', hash: '5b7af...bee1' },
  { id: 'ev-9903', action: 'IEP Protocol Update', node: 'Support Node 2', date: 'Yesterday, 14:45 PM', hash: 'de359...bc49' },
  { id: 'ev-9904', action: 'Asset Repository Sync', node: 'Global Lattice', date: 'Apr 10, 2026', hash: 'f1aa0...1103' },
];

export default function SettingsDataTrailPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/settings" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-lns-navy transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Account Core
            </Link>
            <h1 className="text-5xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-6">
               <History size={48} className="text-lns-red" />
               Personal Data Trail
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] italic tracking-tight">Institutional Persistence Audit • Ledger Sync Status: 100%</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Audit Feed (66%) */}
         <div className="lg:col-span-2 space-y-10">
            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-8 italic flex items-center gap-4">
                  <Activity size={18} className="text-lns-red" />
                  Canonical Institutional Ledger
               </h3>
               
               <Card className="bg-white border-none shadow-[0_50px_100px_rgba(0,0,0,0.05)] rounded-[3.5rem] overflow-hidden border border-gray-100">
                  <div className="divide-y divide-gray-50">
                     {AUDIT_TRAIL.map((event) => (
                       <div key={event.id} className="p-8 flex items-center justify-between hover:bg-gray-50 transition-all group cursor-pointer relative overflow-hidden">
                          <div className="flex items-center gap-8 relative z-10">
                             <div className="w-14 h-14 rounded-2xl bg-lns-navy/5 text-lns-navy flex items-center justify-center group-hover:bg-lns-navy group-hover:text-white transition-all shadow-inner">
                                <Cpu size={24} />
                             </div>
                             <div>
                                <h4 className="text-xl font-black text-lns-navy italic tracking-tight leading-none group-hover:text-lns-red transition-colors">{event.action}</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mt-2 leading-none">{event.id} • {event.node}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-10 relative z-10">
                             <div className="text-right">
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">{event.date}</p>
                                <p className="text-xs font-mono font-bold text-lns-red mt-1 uppercase tracking-tighter bg-lns-red/5 px-2 py-0.5 rounded text-[8px]">{event.hash}</p>
                             </div>
                             <ChevronRight className="text-gray-100 group-hover:text-lns-navy transition-all" />
                          </div>
                       </div>
                     ))}
                  </div>
                  <Button className="w-full h-20 bg-gray-50/50 text-slate-400 hover:text-lns-navy hover:bg-white rounded-none border-t border-gray-100 font-black uppercase tracking-widest text-[11px] italic transition-all">
                     Synchronize Global Resource Chain History
                  </Button>
               </Card>
            </div>

            <div className="p-10 border-2 border-dashed border-gray-100 rounded-[3rem] flex items-center justify-center gap-8 group hover:border-lns-navy/20 transition-all cursor-pointer">
               <Archive size={40} className="text-slate-200 group-hover:text-lns-navy transition-all" />
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-lns-navy leading-none">Export Persistent Archive</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 leading-none">Deploy 2025-2026 Academic Dataset (ZIP)</p>
               </div>
            </div>
         </div>

         {/* Sidebar Intel (33%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-10 overflow-hidden relative group">
               <div className="relative z-10 space-y-8">
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Persistence Index</p>
                     <p className="text-6xl font-[900] tracking-tighter text-lns-red leading-none italic">1,244</p>
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Atomic Signed Events</p>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2 text-center overflow-hidden">
                        <div className="flex justify-between items-end mb-1">
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Ledger Fidelity</p>
                           <p className="text-[9px] font-black uppercase tracking-widest text-lns-red">100.0% Verified</p>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-lns-red w-full shadow-[0_0_20px_rgba(214,43,43,1)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "Institutional data trail is synchronized with the LNS OS global lattice. Your digital identity is held across 14 geographical persistence nodes."
                     </p>
                  </div>
               </div>
               <Globe className="absolute -top-20 -left-20 text-white/5 w-80 h-80 pointer-events-none group-hover:scale-125 transition-transform" />
            </Card>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Sovereignty Meta</h3>
                  <ShieldCheck size={18} className="text-green-500" />
               </div>
               <div className="space-y-4">
                  {[
                    "Encryption Version: v4.2.0",
                    "Ownership: User Canonical",
                    "Jurisdiction: Institutional Node"
                  ].map((act, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer transition-all">
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-lns-navy">{act}</span>
                       <Lock size={14} className="text-gray-100 group-hover:text-lns-red transition-all" />
                    </div>
                  ))}
               </div>
            </Card>

            <div className="p-6 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200 text-center space-y-3">
               <Globe size={28} className="text-blue-500 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-blue-500/60 leading-relaxed italic">
                  Data Persistence is guaranteed via the LNS Global Consensus Network.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
