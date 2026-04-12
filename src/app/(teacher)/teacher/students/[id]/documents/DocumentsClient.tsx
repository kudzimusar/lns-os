"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  FileText, 
  Folder, 
  Search, 
  ChevronRight, 
  ShieldCheck, 
  Download, 
  TrendingUp, 
  Activity,
  Filter,
  Layers,
  Zap,
  Star,
  Globe,
  Plus,
  MoreVertical
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DocumentsClient({ params }: { params: { id: string } }) {
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.id) || PLACEHOLDER_STUDENTS[0];

  const DOCUMENTS = [
    { name: 'Mid-Term Essay - Hamlet', subject: 'English Lit', size: '2.4MB', date: 'Today', progress: 'In Review' },
    { name: 'Criterion A Data Project', subject: 'Science', size: '15.1MB', date: 'Yesterday', progress: 'Uploaded' },
    { name: 'Self-Reflection Log', subject: 'Humanities', size: '0.8MB', date: 'Last Week', progress: 'Reviewed' },
    { name: 'Creative Writing Draft', subject: 'English Lit', size: '1.2MB', date: 'Apr 05', progress: 'Draft' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href={`/teacher/students/${params.id}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Student Profile
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Layers size={32} className="text-lns-red" />
               Asset Persistent Repository
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">{student.name} • Institutional Vault Sync</p>
         </div>

         <div className="flex items-center space-x-3">
            <Button variant="outline" className="h-14 bg-white border-gray-100 rounded-2xl px-8 font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center gap-2">
               <Filter size={18} />
               Filter Vault
            </Button>
            <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3">
               <Download size={18} />
               Synchronize Assets
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Folder Explorer (75%) */}
         <div className="lg:col-span-3 space-y-8">
            <div className="relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-lns-mid-grey group-focus-within:text-lns-red transition-colors" size={24} />
               <input 
                 type="text" 
                 placeholder="Search student asset hashes, PDFs, or submission transcripts..." 
                 className="w-full h-16 bg-white rounded-[2rem] pl-16 pr-8 shadow-2xl border-none focus:ring-4 focus:ring-lns-red/5 font-bold text-sm text-lns-navy transition-all outline-none"
               />
            </div>

            <div className="grid grid-cols-1 gap-4">
               {DOCUMENTS.map((doc, i) => (
                 <Card key={i} className="p-8 border-none shadow-xl bg-white rounded-2xl group hover:translate-x-2 transition-transform cursor-pointer relative overflow-hidden border-l-4 border-transparent hover:border-lns-red">
                    <div className="flex items-center justify-between relative z-10">
                       <div className="flex items-center gap-8">
                          <div className="w-16 h-16 rounded-[1.2rem] bg-gray-50 flex items-center justify-center text-lns-navy group-hover:bg-lns-navy group-hover:text-white transition-all shadow-inner">
                             <FileText size={28} />
                          </div>
                          <div className="space-y-2">
                             <h4 className="text-xl font-black text-lns-navy group-hover:text-lns-red transition-all italic tracking-tight">{doc.name}</h4>
                             <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic mt-1 leading-none">{doc.subject} • {doc.size} • Uploaded {doc.date}</p>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-10">
                          <div className={cn(
                            "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest italic border",
                            doc.progress === 'Reviewed' ? "bg-green-50 text-green-600 border-green-100" : "bg-blue-50 text-blue-600 border-blue-100"
                          )}>
                             {doc.progress}
                          </div>
                          <div className="flex gap-2">
                             <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all shadow-sm">
                                <Download size={20} className="text-lns-navy" />
                             </Button>
                             <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all shadow-sm">
                                <MoreVertical size={20} className="text-slate-300" />
                             </Button>
                          </div>
                       </div>
                    </div>
                 </Card>
               ))}
            </div>

            <div className="p-12 border-2 border-dashed border-gray-100 rounded-[3rem] flex flex-col items-center justify-center text-center gap-4 animate-in slide-in-from-bottom-2 duration-700">
               <Activity size={48} className="text-lns-navy/5" />
               <p className="text-xs font-black uppercase tracking-widest text-lns-navy/30 italic">Registry historical persistence data fully synchronized.</p>
            </div>
         </div>

         {/* Sidebar Stats (25%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Volume Synopsis</p>
                     <h4 className="text-2xl font-black italic uppercase leading-none tracking-tight">Vault Capacity</h4>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                           <span>Resonance Level</span>
                           <span>24%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-lns-red w-[24%] shadow-[0_0_15px_rgba(214,43,43,0.8)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        Institutional asset node synchronization active. No anomalies detected in current persistent cycle.
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Quick Directive</h3>
                  <Zap size={18} className="text-amber-500 animate-pulse" />
               </div>
               <div className="space-y-3">
                  <Button className="w-full h-14 bg-gray-50 text-[10px] font-black uppercase tracking-widest hover:bg-lns-navy hover:text-white transition-all rounded-2xl flex items-center justify-center gap-2">
                    <Plus size={18} />
                    Deploy New Asset
                  </Button>
               </div>
            </Card>

            <div className="p-6 bg-blue-500/5 rounded-2xl border-2 border-dashed border-blue-500/20 text-center space-y-3">
               <ShieldCheck size={28} className="text-blue-500 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-blue-500/60 leading-relaxed italic">
                  Asset hashes are cryptographically verified and synchronized with the high-authority broadcast vault.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
