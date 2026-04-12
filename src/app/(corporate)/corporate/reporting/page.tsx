"use client";

import React from "react";
import { 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Download, 
  ShieldCheck, 
  PieChart, 
  Activity, 
  Search,
  ArrowLeft,
  ChevronRight,
  Globe,
  Zap
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const REPORTS = [
  { id: 'rep-2026-term-2', title: 'Global Operational Audit (Term 2)', category: 'Operational', date: 'Just now', type: 'Systemic', color: 'text-lns-red', bg: 'bg-lns-red/10' },
  { id: 'rep-2026-finance', title: 'Institutional Financial Flux (Q1)', category: 'Financial', date: 'Yesterday', type: 'Fiscal', color: 'text-green-500', bg: 'bg-green-500/10' },
  { id: 'rep-2025-annual', title: 'Consolidated Annual Report (2025)', category: 'Annual', date: 'Jan 15', type: 'Governance', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'rep-2026-growth', title: 'Regional Node Expansion Strategy', category: 'Strategic', date: 'Mar 10', type: 'Planning', color: 'text-amber-500', bg: 'bg-amber-500/10' },
];

export default function CorporateReportingPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 pt-10 px-4 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/5">
         <div className="space-y-1">
            <Link href="/corporate/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Platform Core
            </Link>
            <h1 className="text-5xl font-[900] text-white tracking-tighter leading-tight uppercase italic flex items-center gap-6">
               <BarChart3 size={48} className="text-lns-red" />
               Institutional Reporting Ledger
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] italic tracking-tight">Consolidated High-Authority Governance Documentation</p>
         </div>

         <div className="flex items-center bg-white/5 p-2 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-xl">
            <Button variant="ghost" className="h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#4A5568] bg-white/5 hover:text-white">Scheduled Sync</Button>
            <Button className="h-12 px-8 rounded-xl bg-lns-red text-white hover:bg-black font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-red-600/20 active:scale-95 transition-all">Generate New Index</Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Report Cards Area (66%) */}
         <div className="lg:col-span-2 space-y-10">
            <div className="relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-lns-red transition-colors" size={24} />
               <input 
                 type="text" 
                 placeholder="Locate systemic report nodes..." 
                 className="w-full h-16 bg-[#1A1F37] rounded-[2rem] pl-16 pr-8 border border-white/5 shadow-2xl focus:ring-4 focus:ring-lns-red/5 font-bold text-sm text-white transition-all outline-none"
               />
            </div>

            <div className="grid grid-cols-1 gap-6">
               {REPORTS.map((report) => (
                 <Link key={report.id} href={`/corporate/reporting/${report.id}`}>
                    <Card className="p-10 bg-[#1A1F37] border-white/5 rounded-[3rem] group hover:translate-x-4 transition-all duration-500 relative overflow-hidden flex items-center justify-between border-l-8 border-transparent hover:border-lns-red">
                       <div className="flex items-center gap-10 relative z-10">
                          <div className={cn(
                            "w-20 h-20 rounded-[1.8rem] flex items-center justify-center text-4xl font-black shadow-2xl transition-transform group-hover:scale-110",
                            report.bg
                          )}>
                             <FileText size={32} className={report.color} />
                          </div>
                          <div className="space-y-2">
                             <div className="flex items-center gap-4">
                                <h4 className="text-2xl font-black text-white italic tracking-tight group-hover:text-lns-red transition-colors">{report.title}</h4>
                                <span className={cn("px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest", report.bg, report.color)}>{report.type}</span>
                             </div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic mt-1 leading-none">{report.category} • Deployed: {report.date} • SHA-Hashed</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-6 relative z-10">
                          <div className="text-right flex flex-col items-end">
                             <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 group-hover:text-white mb-2">
                                <Download size={24} />
                             </Button>
                             <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 italic">Download PDF</p>
                          </div>
                          <ChevronRight className="text-white/5 group-hover:text-white transition-all" />
                       </div>
                       <Activity className="absolute -bottom-10 -right-10 opacity-[0.03] text-white w-64 h-64 group-hover:opacity-10 transition-opacity" />
                    </Card>
                 </Link>
               ))}
            </div>
         </div>

         {/* Right Sidebar - Dynamic Intel (33%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border border-white/10 space-y-10 overflow-hidden relative group">
               <div className="relative z-10 space-y-8">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Financial Performance Pulse</p>
                     <h4 className="text-2xl font-black text-white italic uppercase leading-none">Net Platform Consensus</h4>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2 text-center">
                        <p className="text-5xl font-black tracking-tighter text-white italic">82.4%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Institutional Load Resonance</p>
                     </div>
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-lns-red w-[82.4%] shadow-[0_0_20px_rgba(214,43,43,0.8)]" />
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "Institutional reporting cycle is synchronized at 98.2% accuracy across the global lattice. Flux detected in Western Node."
                     </p>
                  </div>
               </div>
               <TrendingUp className="absolute -top-10 -left-10 text-white/5 w-80 h-80 pointer-events-none group-hover:scale-125 transition-transform" />
            </Card>

            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: "Directives", val: "14 Node", icon: Zap, color: "text-amber-500" },
                 { label: "Lattice Sync", val: "100.0s", icon: Globe, color: "text-blue-500" },
               ].map((mini, i) => (
                 <Card key={i} className="p-6 bg-[#1A1F37] border-white/5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 group hover:border-lns-red/20 transition-all cursor-default relative overflow-hidden">
                    <mini.icon size={20} className={cn("relative z-10 mb-1", mini.color)} />
                    <p className="relative z-10 text-[9px] font-black uppercase text-slate-500 leading-none">{mini.label}</p>
                    <p className="relative z-10 text-xl font-black italic text-white tracking-tight">{mini.val}</p>
                    <mini.icon size={60} className="absolute -bottom-4 -right-4 text-white/5 group-hover:scale-110 transition-transform opacity-30" />
                 </Card>
               ))}
            </div>

            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-6">
               <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#4A5568] italic">Report Node Meta</h3>
                  <ShieldCheck size={18} className="text-green-500" />
               </div>
               <div className="space-y-3">
                  {["Regional Financial Sync", "Operational Delta Index", "Annual Disclosure v1.4"].map((act, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-all">{act}</span>
                       <Download size={14} className="text-white/5 group-hover:text-lns-red transition-all" />
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
