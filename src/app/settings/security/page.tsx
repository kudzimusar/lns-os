"use client";

import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  Fingerprint, 
  ArrowLeft,
  ChevronRight,
  Zap,
  Activity,
  AlertTriangle,
  Monitor,
  RefreshCcw,
  CheckCircle2
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SettingsSecurityPage() {
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
               <ShieldCheck size={48} className="text-lns-red" />
               Encryption & Auth Layer
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] italic tracking-tight">Institutional Protocol Security • Status: Active Sovereignty</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Security Controls (66%) */}
         <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between p-8 bg-green-50 rounded-2xl border border-green-100 shadow-sm relative overflow-hidden group">
               <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shadow-inner group-hover:scale-110 transition-transform">
                     <Smartphone size={32} />
                  </div>
                  <div>
                     <p className="text-xl font-black text-green-800 leading-none">Biometric Auth Active</p>
                     <p className="text-[10px] text-green-600 font-black uppercase tracking-widest mt-2 flex items-center gap-2">
                        <CheckCircle2 size={12}/> Verified Device: iPhone 15 Pro Node
                     </p>
                  </div>
               </div>
               <Button variant="ghost" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest text-green-800 bg-green-200/50 hover:bg-green-200 transition-all relative z-10">Revoke Token</Button>
               <Fingerprint size={120} className="absolute -bottom-10 -right-10 text-green-500/5 pointer-events-none group-hover:scale-125 transition-transform" />
            </div>

            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-8 italic flex items-center gap-4">
                  <Lock size={18} className="text-lns-red" />
                  Access Control Matrix
               </h3>
               
               <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Two-Factor Authentication (2FA)", icon: Lock, status: "Configured", active: true, desc: "Time-based OTP token sync active." },
                    { label: "Recovery Persistence Code", icon: RefreshCcw, status: "Verified", active: true, desc: "Entropy-hardened recovery string generated." },
                    { label: "Hardware Security Hub", icon: Monitor, status: "Inactive", active: false, desc: "LNS OS YubiKey lattice not detected." },
                  ].map((s, i) => (
                    <Card key={i} className="p-8 border-none shadow-xl bg-white rounded-[3rem] group hover:translate-x-2 transition-transform cursor-pointer relative overflow-hidden">
                       <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-6">
                             <div className={cn(
                               "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-all",
                               s.active ? "bg-lns-navy text-white" : "bg-gray-100 text-slate-300"
                             )}>
                                <s.icon size={24} />
                             </div>
                             <div>
                                <h4 className="text-lg font-black text-lns-navy italic tracking-tight">{s.label}</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mt-1 leading-none">{s.desc}</p>
                             </div>
                          </div>
                          <div className={cn(
                            "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest",
                            s.active ? "bg-green-50 text-green-600" : "bg-red-50 text-lns-red"
                          )}>
                             {s.status}
                          </div>
                       </div>
                    </Card>
                  ))}
               </div>
            </div>

            <div className="pt-10 space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-8 italic">Password Synthesis</h3>
               <Card className="p-10 border-none shadow-2xl bg-white rounded-[3rem] space-y-8 border-t-8 border-lns-navy">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Current Entropy Node</label>
                        <input type="password" placeholder="••••••••••••" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-black text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Target Entropy Node</label>
                        <input type="password" placeholder="••••••••••••" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-black text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner" />
                     </div>
                  </div>
                  <Button className="h-16 w-full bg-lns-navy text-white hover:bg-lns-red rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-navy-600/20 active:scale-95 transition-all">
                     Synchronize New Password Cipher
                  </Button>
               </Card>
            </div>
         </div>

         {/* Sidebar Intel (33%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-10 overflow-hidden relative group">
               <div className="relative z-10 space-y-8">
                  <div className="space-y-2 text-center">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Security Integrity Score</p>
                     <p className="text-6xl font-black italic tracking-tighter text-green-500">98%</p>
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Atomic Shield Status</p>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                           <span>Chain Consensus</span>
                           <span>Active</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-green-500 w-[98%] shadow-[0_0_15px_rgba(34,197,94,1)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "Your institutional profile is protected by multi-signature encryption. 14 security nodes are currently heartbeating for this account."
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <div className="p-8 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200 flex flex-col items-center gap-6 text-center">
               <AlertTriangle size={32} className="text-amber-500 animate-pulse" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-900 leading-relaxed italic pr-4 pl-4">
                  WARNING: SESSION LATENCY DETECTED ON UNKNOWN DEVICE IN LONDON. INITIALIZING PRE-EMPTIVE LOCK?
               </p>
               <Button variant="ghost" className="text-[10px] font-black uppercase text-amber-600 hover:text-white hover:bg-amber-600 h-10 px-6 rounded-xl transition-all">Ignore Alert</Button>
            </div>
         </div>
      </div>
    </div>
  );
}
