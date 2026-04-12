"use client";

import React from "react";
import { 
  ArrowLeft, 
  MessageSquare, 
  ShieldCheck, 
  Send, 
  FileText, 
  Paperclip,
  Activity,
  Zap,
  Globe,
  Plus
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Technical/System", "Academic/Curriculum", "Security/Auth", "Financial/Sync"];

export default function SupportNewTicketPage() {
  const [category, setCategory] = React.useState(CATEGORIES[0]);

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/support" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-lns-navy transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Resource Hub
            </Link>
            <h1 className="text-5xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-6">
               <Plus size={48} className="text-lns-red" />
               New Request Node
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] italic tracking-tight">Institutional Support Deployment • SLA: 2-4 Cycles</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Form Hub (66%) */}
         <div className="lg:col-span-2 space-y-12">
            <Card className="p-12 border-none shadow-[0_50px_100px_rgba(0,0,0,0.06)] bg-white rounded-[3.5rem] space-y-10 relative overflow-hidden group">
               <div className="space-y-8 relative z-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Request Identification</label>
                     <input placeholder="Summarize your institutional challenge..." className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl px-8 font-black text-lg text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Subject Node Classification</label>
                        <div className="flex flex-wrap gap-2">
                           {CATEGORIES.map(cat => (
                             <button
                               key={cat}
                               onClick={() => setCategory(cat)}
                               className={cn(
                                 "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                                 category === cat ? "bg-lns-navy text-white shadow-lg" : "bg-gray-50 text-slate-400 hover:bg-gray-100"
                               )}
                             >
                               {cat}
                             </button>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Asset Upload (Optional)</label>
                        <Button variant="outline" className="w-full h-12 border-dashed border-2 border-gray-100 rounded-xl text-[9px] font-black text-slate-300 hover:text-lns-navy hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                           <Paperclip size={14} />
                           Attach Metadata Node
                        </Button>
                     </div>
                  </div>

                  <div className="space-y-4 pt-4">
                     <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Explanatory Synthesis</label>
                     <textarea className="w-full h-48 bg-gray-50 border border-gray-100 rounded-[2rem] p-8 text-sm font-bold italic text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner resize-none" placeholder="Provide technical narrative of the challenge..." />
                  </div>

                  <Button className="h-20 w-full bg-lns-navy text-white hover:bg-lns-red rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-navy-600/20 active:scale-95 transition-all flex items-center justify-center gap-4">
                     Broadcasting Support Node
                     <Send size={24} />
                  </Button>
               </div>
               <MessageSquare size={300} className="absolute -bottom-20 -right-20 text-black/5 pointer-events-none rotate-12" />
            </Card>
         </div>

         {/* Sidebar Intel (33%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-10 overflow-hidden relative group">
               <div className="relative z-10 space-y-8">
                  <div className="space-y-2 text-center">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Faculty Response Node</p>
                     <p className="text-4xl font-black italic tracking-tighter text-white">4 HOUR SLA</p>
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Atomic Precision Commitment</p>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                           <span>System Congestion</span>
                           <span>Low</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-green-500 w-[15%] shadow-[0_0_15px_rgba(34,197,94,1)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "Broadcasted nodes are analyzed by the Technical Oversight lattice within 240 minutes. Prioritize classification for faster routing."
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <div className="p-6 bg-blue-500/5 rounded-2xl border-2 border-dashed border-blue-500/20 text-center space-y-3">
               <ShieldCheck size={28} className="text-blue-500 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-blue-500/60 leading-relaxed italic pr-2 pl-2">
                  Requests are cryptographically signed and prioritized by User Faculty Status.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
