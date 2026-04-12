"use client";

import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  History, 
  UserCheck, 
  AlertTriangle, 
  FileLock, 
  Globe, 
  Cpu,
  ArrowLeft,
  ChevronRight,
  Download,
  Activity,
  Zap
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const AUDIT_LOGS = [
  { id: 'aud-001', type: 'Access', node: 'Admin Node #102', action: 'Registry Sync', date: 'Today, 11:24 AM', status: 'Success' },
  { id: 'aud-002', type: 'Security', node: 'Gateway #7', action: 'Encryption Cycle', date: 'Today, 09:12 AM', status: 'Success' },
  { id: 'aud-003', type: 'Database', node: 'Global Lattice', action: 'Data Integrity Scan', date: 'Yesterday, 23:45 PM', status: 'Success' },
  { id: 'aud-004', type: 'System', node: 'Regional Proxy B', action: 'Version Upgrade (v1.4.2)', date: 'Apr 11, 2026', status: 'Success' },
];

export default function CorporateCompliancePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/5">
         <div className="space-y-1">
            <Link href="/corporate/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Platform Core
            </Link>
            <h1 className="text-5xl font-[900] text-white tracking-tighter leading-tight uppercase italic flex items-center gap-6">
               <ShieldCheck size={48} className="text-lns-red" />
               Institutional Compliance Vault
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] italic tracking-tight">Global Protocol Enforcement • Data Integrity Index: 99.9%</p>
         </div>

         <div className="flex items-center bg-white/5 p-2 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-xl">
            <Button variant="ghost" className="h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#4A5568] bg-white/5 hover:text-white">Full Platform Audit</Button>
            <Button className="h-12 px-8 rounded-xl bg-lns-red text-white hover:bg-black font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-red-600/20 active:scale-95 transition-all">Download Certificate</Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Compliance Metrics (Bottom Stat Bar logic) */}
         { [
           { label: "GDPR Sync", val: "Compliant", icon: Globe, color: "text-green-500" },
           { label: "Data Hashing", val: "SHA-256", icon: Cpu, color: "text-blue-500" },
           { label: "Access Control", val: "Node Validated", icon: Lock, color: "text-lns-red" },
           { label: "Audit Frequency", val: "Daily Cycle", icon: History, color: "text-amber-500" },
         ].map((stat, i) => (
           <Card key={i} className="p-8 bg-[#1A1F37] border-white/5 rounded-2xl group hover:border-lns-red/30 transition-all overflow-hidden relative">
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                 <div className={cn("p-4 bg-white/5 rounded-2xl transition-all group-hover:bg-white/10", stat.color)}>
                    <stat.icon size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                    <p className="text-lg font-black text-white italic transition-colors group-hover:text-lns-red">{stat.val}</p>
                 </div>
              </div>
              <stat.icon size={120} className="absolute -bottom-10 -right-10 text-white/5 group-hover:scale-110 transition-transform" />
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Live Audit Log (66%) */}
         <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white px-8 flex items-center gap-4 italic">
               <Activity size={18} className="text-lns-red" />
               Real-time Institutional Traceability Ledger
            </h3>
            
            <Card className="bg-[#1A1F37] border-none shadow-[0_50px_100px_rgba(0,0,0,0.3)] rounded-[3rem] overflow-hidden border border-white/5">
               <div className="divide-y divide-white/5">
                  {AUDIT_LOGS.map((log) => (
                    <div key={log.id} className="p-8 flex items-center justify-between hover:bg-white/[0.02] transition-all group cursor-pointer relative overflow-hidden">
                       <div className="flex items-center gap-6 relative z-10">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 text-slate-400 flex items-center justify-center group-hover:bg-lns-red group-hover:text-white transition-all">
                             <FileLock size={20} />
                          </div>
                          <div>
                             <h4 className="text-lg font-black text-white italic tracking-tight">{log.action}</h4>
                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic mt-1 leading-none">{log.id} • {log.node}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-10 relative z-10">
                          <div className="text-right">
                             <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">{log.date}</p>
                             <p className="text-xs font-bold text-green-500 uppercase italic mt-1">{log.status}</p>
                          </div>
                          <ChevronRight className="text-white/10 group-hover:text-white transition-all" />
                       </div>
                    </div>
                  ))}
               </div>
               <Button className="w-full h-16 bg-white/[0.03] text-slate-500 hover:text-white rounded-none border-t border-white/5 font-black uppercase tracking-widest text-[10px] italic">
                  Access Complete Historical Persistence Records
               </Button>
            </Card>
         </div>

         {/* Right Sidebar - System Integrity (33%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3rem] border border-white/10 space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Security Synopsis</p>
                     <h4 className="text-2xl font-black text-white italic uppercase leading-none">Integrity Analysis</h4>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                           <span>Chain Consensus</span>
                           <span>100% Verified</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-green-500 w-full shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "LNS OS v1.4.2 encryption lattice is synchronized across all regional proxies. Consensus threshold maintained at absolute level."
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <Card className="p-8 bg-white/5 border border-white/5 rounded-2xl space-y-6">
               <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#4A5568] italic">Privacy Standard Nodes</h3>
                  <Zap size={18} className="text-blue-500" />
               </div>
               <div className="space-y-3">
                  {["Regional Data Shield", "Institutional Privacy v2", "Cryptographic Anonymizer"].map((act, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-all">{act}</span>
                       <UserCheck size={14} className="text-white/5 group-hover:text-green-500 transition-all" />
                    </div>
                  ))}
               </div>
            </Card>

            <div className="p-4 bg-lns-red/5 rounded-2xl border-2 border-dashed border-lns-red/20 flex items-center gap-4">
               <AlertTriangle size={24} className="text-lns-red" />
               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 leading-tight">
                  ANY UNAUTHORIZED DATA VARIANCE WILL TRIGGER AN IMMEDIATE GLOBAL NODE LOCK.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
