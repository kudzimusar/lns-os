"use client";

import React from "react";
import { 
  Settings, 
  ArrowLeft, 
  Layers, 
  ShieldCheck, 
  Save, 
  Activity, 
  Zap, 
  Globe, 
  ChevronRight,
  Plus,
  Trash2,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SUBJECT_WEIGHTS = [
  { subject: 'Mathematics', weight: 25 },
  { subject: 'Communications (English)', weight: 20 },
  { subject: 'Science', weight: 20 },
  { subject: 'Humanities', weight: 15 },
  { subject: 'Arts', weight: 10 },
  { subject: 'Physical Education', weight: 10 },
];

const BAND_BOUNDARIES = [
  { level: 7, percentage: 90 },
  { level: 6, percentage: 80 },
  { level: 5, percentage: 70 },
  { level: 4, percentage: 60 },
  { level: 3, percentage: 50 },
  { level: 2, percentage: 40 },
  { level: 1, percentage: 0 },
];

export default function AdminGradingSettingsPage() {
  const [weights, setWeights] = React.useState(SUBJECT_WEIGHTS);
  const totalWeight = weights.reduce((a, b) => a + b.weight, 0);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/admin/settings" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Institutional Config
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Layers size={32} className="text-lns-red" />
               Institutional Grading Protocol
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Systemic Score Mapping • MYP Consensus Configuration</p>
         </div>

         <div className="flex items-center gap-3">
            <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3">
               Commit Protocol
               <Save size={18} />
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Configuration Details (75%) */}
         <div className="lg:col-span-3 space-y-12">
            
            {/* Subject Weights Section */}
            <div className="space-y-6">
               <div className="flex justify-between items-end px-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy italic flex items-center gap-2">
                     <Activity size={16} />
                     Subject Resonance Weights
                  </h3>
                  <p className={cn(
                    "text-[10px] font-black uppercase tracking-widest italic px-4 py-2 rounded-xl",
                    totalWeight === 100 ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-lns-red border border-red-100"
                  )}>
                     Total Synchrony: {totalWeight}%
                  </p>
               </div>
               
               <Card className="p-10 border-none shadow-2xl bg-white rounded-[3rem] space-y-8">
                  <div className="grid grid-cols-1 gap-6">
                     {weights.map((item, idx) => (
                       <div key={idx} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl group hover:bg-white hover:shadow-xl transition-all border border-gray-100/50">
                          <div className="flex flex-col">
                             <h4 className="text-lg font-black text-lns-navy italic tracking-tight uppercase leading-none">{item.subject}</h4>
                             <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-2">Curriculum Node</p>
                          </div>
                          <div className="flex items-center gap-8">
                             <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-gray-100 shadow-inner">
                                <input 
                                  value={item.weight} 
                                  onChange={(e) => {
                                    const newW = [...weights];
                                    newW[idx].weight = parseInt(e.target.value) || 0;
                                    setWeights(newW);
                                  }}
                                  className="w-16 bg-transparent text-center text-xl font-black text-lns-red outline-none" 
                                />
                                <span className="text-[10px] font-black uppercase text-slate-300 pr-2">%</span>
                             </div>
                             <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-200 hover:text-lns-red opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={16} />
                             </Button>
                          </div>
                       </div>
                     ))}
                  </div>
                  <Button variant="outline" className="w-full h-14 border-gray-100/50 border-2 border-dashed bg-gray-50/30 rounded-2xl font-black uppercase tracking-widest text-[10px] text-slate-300 hover:text-lns-navy hover:bg-white transition-all flex items-center justify-center gap-2">
                     <Plus size={18} />
                     Deploy New Subject Node
                  </Button>
               </Card>
            </div>

            {/* MYP Boundaries Section */}
            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic flex items-center gap-2">
                  <ShieldCheck size={16} />
                  MYP Performance Band Boundaries
               </h3>
               <Card className="p-8 border-none shadow-xl bg-lns-navy rounded-[3rem] overflow-hidden relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                     {BAND_BOUNDARIES.map((band) => (
                       <div key={band.level} className="p-6 bg-white rounded-3xl group hover:translate-y-[-4px] transition-transform space-y-4 shadow-xl">
                          <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                             <span className="text-[10px] font-black uppercase text-slate-400">Level</span>
                             <span className="text-3xl font-[900] text-lns-navy italic tracking-tighter">{band.level}</span>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[9px] font-black text-slate-300 uppercase leading-none">Min Threshold</p>
                             <div className="flex items-center gap-2">
                                <span className="text-xl font-black text-lns-red">{band.percentage}%</span>
                                <Zap size={14} className="text-amber-500" />
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
                  <Globe size={400} className="absolute -top-40 -right-40 text-white/5 pointer-events-none" />
               </Card>
            </div>
         </div>

         {/* Sidebar Intel (25%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Audit Synopsis</p>
                     <h4 className="text-2xl font-black italic uppercase leading-none tracking-tight">Consensus Health</h4>
                  </div>
                  <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                    "Institutional grading matrices are synchronized across the global consensus node. Total synchrony must maintain 100% balance for audit success."
                  </p>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <div className="p-6 bg-red-500/5 rounded-2xl border-2 border-dashed border-red-500/20 text-center space-y-3">
               <AlertCircle size={28} className="text-lns-red mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-lns-red/60 leading-relaxed italic pr-2 pl-2">
                  DANGER: Modification of grading protocol in-cycle will trigger a global recalculation event.
               </p>
            </div>

            <div className="p-6 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200 text-center space-y-3">
               <ShieldCheck size={28} className="text-amber-500 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-amber-900 leading-relaxed italic pr-2 pl-2">
                  All grading changes are cryptographically hashed and recorded to the immutable ledger.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
