"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  Search, 
  Plus, 
  Download, 
  Filter, 
  MoreVertical, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  ArrowLeft,
  Calendar,
  Layers,
  Monitor,
  Globe
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CLASSES = [
  { id: 'cls-7a', name: 'Grade 7A', lead: 'James Okafor', students: 32, performance: 82, status: 'Synced' },
  { id: 'cls-7b', name: 'Grade 7B', lead: 'Sarah Chen', students: 30, performance: 78, status: 'Synced' },
  { id: 'cls-8a', name: 'Grade 8A', lead: 'David Petrov', students: 28, performance: 85, status: 'Synced' },
  { id: 'cls-8b', name: 'Grade 8B', lead: 'Amina Hassan', students: 31, performance: 80, status: 'Locked' },
];

export default function AdminClassesPage() {
  const [search, setSearch] = React.useState("");

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to System Oversight
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Monitor size={32} className="text-lns-red" />
               Institutional Cohort Registry
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Canonical Academic Cohort Ledger • LNS OS Central Hub</p>
         </div>

         <div className="flex items-center space-x-3">
            <Button variant="outline" className="h-14 bg-white border-gray-100 rounded-2xl px-8 font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center gap-2">
               <Download size={18} />
               Export Schema
            </Button>
            <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3">
               <Plus size={18} />
               Initialize Cohort Node
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Main List (75%) */}
         <div className="lg:col-span-3 space-y-8">
            <div className="relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-lns-mid-grey group-focus-within:text-lns-red transition-colors" size={24} />
               <input 
                 type="text" 
                 placeholder="Search cohort hashes, lead faculty nodes, or grade classifications..." 
                 className="w-full h-16 bg-white rounded-[2rem] pl-16 pr-8 shadow-2xl border-none focus:ring-4 focus:ring-lns-red/5 font-bold text-sm text-lns-navy transition-all outline-none"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               {CLASSES.map((cls) => (
                 <Card key={cls.id} className="p-10 border-none shadow-xl bg-white rounded-[3.5rem] group hover:translate-y-[-8px] transition-transform duration-500 relative overflow-hidden border-t border-gray-50 flex flex-col justify-between">
                    <div className="relative z-10 space-y-10">
                       <div className="flex items-start justify-between">
                          <div className="w-16 h-16 rounded-[1.2rem] bg-lns-navy text-white flex items-center justify-center text-3xl font-black shadow-xl group-hover:bg-lns-red transition-all">
                             {cls.name.charAt(cls.name.length - 2)}
                          </div>
                          <div className={cn(
                             "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest italic border shadow-sm",
                             cls.status === 'Synced' ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-lns-red border-red-100"
                          )}>
                             {cls.status}
                          </div>
                       </div>
                       
                       <div className="space-y-3">
                          <h4 className="text-2xl font-black text-lns-navy group-hover:text-lns-navy/80 transition-all italic tracking-tighter uppercase leading-none">{cls.name}</h4>
                          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic leading-none">
                             <span className="text-lns-red">Lead: {cls.lead}</span>
                             <div className="w-1 h-1 bg-gray-200 rounded-full" />
                             <span>{cls.students} Nodes</span>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <div className="flex justify-between items-end">
                             <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Academic Resonance</p>
                             <p className="text-xl font-black italic text-lns-navy tracking-tight">{cls.performance}%</p>
                          </div>
                          <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                             <div 
                                className={cn("h-full transition-all duration-1000", cls.performance > 80 ? "bg-lns-navy" : "bg-lns-red")} 
                                style={{width: `${cls.performance}%`}} 
                             />
                          </div>
                       </div>
                    </div>

                    <div className="pt-10 flex items-center justify-between relative z-10 border-t border-gray-50 mt-10">
                       <Link href={`/admin/classes/${cls.id}`}>
                          <div className="flex items-center gap-3 text-lns-navy font-black text-[10px] uppercase tracking-widest italic hover:text-lns-red cursor-pointer">
                             Manage Cohort Registry
                             <ChevronRight size={16} />
                          </div>
                       </Link>
                       <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all shadow-sm">
                          <MoreVertical size={20} className="text-slate-300" />
                       </Button>
                    </div>
                    
                    <Globe size={180} className="absolute -top-10 -right-10 opacity-[0.03] text-lns-navy pointer-events-none group-hover:opacity-10 transition-opacity" />
                 </Card>
               ))}
            </div>
         </div>

         {/* Sidebar Stats (25%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Cohort Synopsis</p>
                     <h4 className="text-2xl font-black italic uppercase leading-none tracking-tight">Institutional Load</h4>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                           <span>Platform Resonance</span>
                           <span>84%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-lns-red w-[84%] shadow-[0_0_15px_rgba(214,43,43,0.8)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        Institutional cohort synchronization is active. {CLASSES.length} academic nodes identified and verified on the global lattice.
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Global Directives</h3>
                  <Zap size={18} className="text-lns-red animate-pulse" />
               </div>
               <div className="space-y-4">
                  {[
                    "Re-index Cohort Hashes",
                    "Bulk Timetable Synchrony",
                    "Add New Academic Unit"
                  ].map((act, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer transition-all">
                       <span className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey group-hover:text-lns-navy">{act}</span>
                       <ChevronRight size={14} className="text-gray-100 group-hover:text-lns-navy transition-all" />
                    </div>
                  ))}
               </div>
            </Card>

            <div className="p-6 bg-blue-500/5 rounded-2xl border-2 border-dashed border-blue-500/20 text-center space-y-3">
               <ShieldCheck size={28} className="text-blue-500 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-blue-500/60 leading-relaxed italic pr-2 pl-2">
                  Cohorts are institutional containers signed and verified via the LNS OS persistence layer.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
