"use client";

import React from "react";
import { 
  ShieldCheck, 
  Database, 
  Lock, 
  ChevronRight, 
  ArrowLeft,
  FileText,
  UserCheck,
  Zap,
  Activity,
  Download,
  Trash2,
  RefreshCcw,
  Search
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DataRightsPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-2">
           <Link href="/legal" className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey hover:text-lns-red flex items-center gap-2 transition-colors mb-4">
              <ArrowLeft size={14} /> Back to Legal Hub
           </Link>
           <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
              <ShieldCheck size={32} className="text-lns-red" />
              Sovereign Data Rights
           </h1>
           <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Institutional Privacy Protocol • LNS OS Data Rights Management</p>
        </div>
      </div>

      {/* Persistence Rights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="p-10 border-none shadow-2xl bg-white rounded-[3rem] hover:translate-y-[-4px] transition-all group border-b-8 border-transparent hover:border-lns-navy">
            <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-lns-navy mb-8 group-hover:bg-lns-navy group-hover:text-white transition-all shadow-inner">
               <Download size={32} />
            </div>
            <h3 className="text-2xl font-black text-lns-navy italic uppercase tracking-tight">Right to Portability</h3>
            <p className="text-xs text-lns-mid-grey font-medium leading-relaxed mt-4">
               Request a full institutional extract of your persistent data nodes in cryptographically signed JSON format.
            </p>
            <Button className="mt-8 h-12 bg-gray-50 text-lns-navy hover:bg-lns-navy hover:text-white rounded-xl px-8 font-black uppercase text-[9px] tracking-widest transition-all">
               Initialize Extract
            </Button>
         </Card>

         <Card className="p-10 border-none shadow-2xl bg-white rounded-[3rem] hover:translate-y-[-4px] transition-all group border-b-8 border-transparent hover:border-lns-red">
            <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-lns-red mb-8 group-hover:bg-lns-red group-hover:text-white transition-all shadow-inner">
               <Trash2 size={32} />
            </div>
            <h3 className="text-2xl font-black text-lns-navy italic uppercase tracking-tight">Right to Erasure</h3>
            <p className="text-xs text-lns-mid-grey font-medium leading-relaxed mt-4">
               Submit a protocol request to de-link your identity nodes from the institutional persistence lattice.
            </p>
            <Button className="mt-8 h-12 bg-gray-100 text-lns-red hover:bg-lns-red hover:text-white rounded-xl px-8 font-black uppercase text-[9px] tracking-widest transition-all">
               Request Erasure Node
            </Button>
         </Card>

         <Card className="p-10 border-none shadow-2xl bg-white rounded-[3rem] hover:translate-y-[-4px] transition-all group border-b-8 border-transparent hover:border-green-500">
            <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-green-600 mb-8 group-hover:bg-green-600 group-hover:text-white transition-all shadow-inner">
               <RefreshCcw size={32} />
            </div>
            <h3 className="text-2xl font-black text-lns-navy italic uppercase tracking-tight">Right to Correction</h3>
            <p className="text-xs text-lns-mid-grey font-medium leading-relaxed mt-4">
               Invoke the Correction Protocol to rectify discrepancies in your persistent educational ledger.
            </p>
            <Button className="mt-8 h-12 bg-gray-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl px-8 font-black uppercase text-[9px] tracking-widest transition-all">
               Correct Node
            </Button>
         </Card>

         <Card className="p-10 border-none shadow-2xl bg-white rounded-[3rem] hover:translate-y-[-4px] transition-all group border-b-8 border-transparent hover:border-amber-500">
            <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 flex items-center justify-center text-amber-500 mb-8 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-inner">
               <Search size={32} />
            </div>
            <h3 className="text-2xl font-black text-lns-navy italic uppercase tracking-tight">Right to Audit</h3>
            <p className="text-xs text-lns-mid-grey font-medium leading-relaxed mt-4">
               Full transparency into which nodes have accessed your metadata in the last 12 institutional cycles.
            </p>
            <Button className="mt-8 h-12 bg-gray-50 text-amber-600 hover:bg-amber-500 hover:text-white rounded-xl px-8 font-black uppercase text-[9px] tracking-widest transition-all">
               View Audit Trail
            </Button>
         </Card>
      </div>

      {/* Policy Footer */}
      <div className="p-12 bg-lns-navy rounded-[3.5rem] text-white space-y-8 relative overflow-hidden group border-none shadow-2xl mt-10">
         <div className="relative z-10 space-y-4">
            <h2 className="text-3xl font-[900] italic uppercase tracking-tight">Institutional Sovereignty Pledge</h2>
            <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-3xl">
               LNS OS operates on a zero-trust architecture. Your data is not merely "stored"; it is cryptographically woven into an institutional lattice that you control. We do not aggregate metadata for external extraction. Your identities are yours to deploy, audit, and withdraw.
            </p>
            <div className="flex items-center gap-6 pt-4">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><Zap size={14} className="text-lns-red" /> Edge-Encrypted</div>
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><Lock size={14} className="text-lns-red" /> Biometric-Auth Only</div>
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><ShieldCheck size={14} className="text-lns-red" /> GDPR v2.0 Compliant</div>
            </div>
         </div>
         <Database size={240} className="absolute -bottom-20 -right-20 text-white/5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000" />
      </div>
    </div>
  );
}
