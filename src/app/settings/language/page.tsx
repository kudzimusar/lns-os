"use client";

import React from "react";
import { 
  Globe, 
  ArrowLeft, 
  ChevronRight, 
  Zap, 
  CheckCircle2, 
  Activity,
  Languages,
  Monitor,
  Layout,
  Type
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: 'en', name: 'English (UK)', status: 'Active Node', native: 'English' },
  { code: 'fr', name: 'French (FR)', status: 'On-Chain Sync Ready', native: 'Français' },
  { code: 'es', name: 'Spanish (ES)', status: 'On-Chain Sync Ready', native: 'Español' },
  { code: 'zh', name: 'Mandarin (CN)', status: 'Beta Node', native: '普通话' },
];

export default function SettingsLanguagePage() {
  const [selected, setSelected] = React.useState('en');

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
               <Languages size={48} className="text-lns-red" />
               Linguistic Protocol
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] italic tracking-tight">Institutional localization layer • Status: Synchronized</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Main content (75%) */}
         <div className="lg:col-span-3 space-y-10">
            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-8 italic flex items-center gap-4">
                  <Globe size={18} className="text-lns-red" />
                  Select Institutional Dialect
               </h3>
               
               <div className="grid grid-cols-1 gap-4">
                  {LANGUAGES.map((lang) => (
                    <Card 
                      key={lang.code} 
                      onClick={() => setSelected(lang.code)}
                      className={cn(
                        "p-8 border-none shadow-xl rounded-2xl group hover:translate-x-2 transition-transform cursor-pointer relative overflow-hidden border-2",
                        selected === lang.code ? "bg-white border-lns-navy" : "bg-white border-transparent"
                      )}
                    >
                       <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-6">
                             <div className={cn(
                               "w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-all",
                               selected === lang.code ? "bg-lns-navy text-white" : "bg-gray-50 text-slate-300"
                             )}>
                                <span className="font-black text-xs uppercase">{lang.code}</span>
                             </div>
                             <div>
                                <h4 className="text-lg font-black text-lns-navy italic tracking-tight">{lang.name}</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mt-1 leading-none">{lang.native} • {lang.status}</p>
                             </div>
                          </div>
                          {selected === lang.code && (
                            <div className="bg-green-50 text-green-600 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm">
                               ACTIVE NODE
                            </div>
                          )}
                       </div>
                    </Card>
                  ))}
               </div>
            </div>

            <div className="pt-10 space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-8 italic">Typography & Semantics</h3>
               <Card className="p-10 border-none shadow-2xl bg-white rounded-[3rem] space-y-8 border-t-8 border-lns-navy">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                        <div className="flex items-center gap-4 mb-4">
                           <Monitor size={20} className="text-lns-red"/>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unit System</p>
                        </div>
                        <select className="w-full h-12 bg-white rounded-xl px-4 text-xs font-bold text-lns-navy border-none outline-none shadow-sm">
                           <option>Metric Node (Standard)</option>
                           <option>Imperial Node</option>
                        </select>
                     </div>
                     <div className="space-y-4 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                        <div className="flex items-center gap-4 mb-4">
                           <Type size={20} className="text-lns-red"/>
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Accessibility Height</p>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                           {['A', 'A+', 'A++'].map(sz => (
                             <button key={sz} className="flex-1 h-12 bg-white rounded-xl font-black text-xs text-lns-navy shadow-sm hover:bg-lns-navy hover:text-white transition-all">{sz}</button>
                           ))}
                        </div>
                     </div>
                  </div>
                  <Button className="h-16 w-full bg-lns-navy text-white hover:bg-lns-red rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-navy-600/20 active:scale-95 transition-all">
                     Deploy Localization Payload
                  </Button>
               </Card>
            </div>
         </div>

         {/* Sidebar Bio (25%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-10 overflow-hidden relative group">
               <div className="relative z-10 space-y-8">
                  <div className="space-y-4 text-center">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Global Resonance</p>
                     <p className="text-3xl font-[900] tracking-tighter text-white leading-tight italic uppercase">Institutional Localization</p>
                     <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">v4.2-LST</p>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2 text-center overflow-hidden">
                        <div className="flex justify-between items-end mb-1">
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Sync Status</p>
                           <p className="text-[9px] font-black uppercase tracking-widest text-lns-red">100% Verified</p>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-lns-red w-full shadow-[0_0_20px_rgba(214,43,43,1)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "Institutional linguistic nodes are synchronized with the LNS OS global lattice. All academic transcripts will be synthesized in the target dialect."
                     </p>
                  </div>
               </div>
               <Globe className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none group-hover:scale-125 transition-transform" />
            </Card>

            <div className="p-8 bg-blue-50 rounded-2xl border-2 border-dashed border-blue-200 flex flex-col items-center gap-6 text-center">
               <Layout size={32} className="text-blue-500 animate-pulse" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-900 leading-relaxed italic pr-4 pl-4">
                  Note: Interface layout will dynamically re-orient for R-to-L linguistic patterns.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
