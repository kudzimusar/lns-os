"use client";

import React from "react";
import { 
  FileText, 
  Folder, 
  Search, 
  ArrowLeft, 
  ChevronRight, 
  ShieldCheck, 
  Download, 
  TrendingUp, 
  Activity,
  Filter,
  Layers,
  Zap,
  Star,
  Globe
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SUBJECT_FOLDERS = [
  { id: 'math', name: 'Mathematics HL', assets: 24, lastSync: 'Today' },
  { id: 'eng', name: 'English Literature', assets: 18, lastSync: 'Yesterday' },
  { id: 'sci', name: 'Quantum Science', assets: 32, lastSync: '2d ago' },
  { id: 'comm', name: 'Communication Theory', assets: 15, lastSync: 'Apr 05' },
  { id: 'tech', name: 'Digital Society', assets: 40, lastSync: 'Apr 10' },
  { id: 'inst', name: 'LNS OS Manuals', assets: 8, lastSync: 'Today' },
];

export default function StudentResourcesPage() {
  const [search, setSearch] = React.useState("");

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Command
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Layers size={32} className="text-lns-red" />
               Institutional Asset Repository
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Synchronized educational modules and mission-critical resources.</p>
         </div>

         <div className="flex items-center space-x-3">
            <Button variant="outline" className="h-14 bg-white border-gray-100 rounded-2xl px-8 font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center gap-2">
               <Filter size={18} />
               Filter Nodes
            </Button>
            <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3">
               <Download size={18} />
               Bulk Synchronize
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
                 placeholder="Search institutional assets, PDFs, datasets, or lecture transcripts..." 
                 className="w-full h-16 bg-white rounded-[2rem] pl-16 pr-8 shadow-2xl border-none focus:ring-4 focus:ring-lns-red/5 font-bold text-sm text-lns-navy transition-all outline-none"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {SUBJECT_FOLDERS.map((folder) => (
                 <Link key={folder.id} href={`/student/resources/${folder.id}`}>
                    <Card className="p-10 border-none shadow-xl bg-white rounded-[3rem] group hover:translate-y-[-8px] transition-transform duration-500 relative overflow-hidden border-t border-gray-50">
                       <div className="relative z-10 space-y-8">
                          <div className={cn(
                            "w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-4xl font-black shadow-xl group-hover:scale-110 transition-transform",
                            folder.id === 'inst' ? "bg-lns-red text-white" : "bg-lns-navy text-white group-hover:bg-lns-red"
                          )}>
                             <Folder size={32} />
                          </div>
                          
                          <div className="space-y-4">
                             <h4 className="text-xl font-black text-lns-navy group-hover:text-lns-navy/80 transition-all italic leading-tight">{folder.name}</h4>
                             <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic leading-none">
                                <span className={cn(
                                   "px-3 py-1 rounded-lg text-white",
                                   folder.id === 'inst' ? "bg-lns-red" : "bg-lns-navy"
                                )}>{folder.assets} Nodes</span>
                                <span className="flex items-center gap-2"><Clock size={14} /> {folder.lastSync}</span>
                             </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                             <div className="flex items-center gap-3 text-lns-navy font-black text-[10px] uppercase tracking-widest italic group-hover:text-lns-red">
                                Enter Registry
                                <ChevronRight size={16} />
                             </div>
                             <ShieldCheck size={18} className="text-green-500" />
                          </div>
                       </div>
                       {/* Background accent */}
                       <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                          <FileText size={160} className="text-lns-navy" />
                       </div>
                    </Card>
                 </Link>
               ))}
            </div>

            {/* Recent Assets List */}
            <div className="space-y-6 pt-10">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic flex items-center gap-2">
                  <Activity size={16} />
                  Live Asset Synchronization Ledger
               </h3>
               <Card className="border-none shadow-2xl bg-white rounded-2xl overflow-hidden">
                  <div className="divide-y divide-gray-50">
                     {[
                       { name: 'Hamilton: Analysis Guide', type: 'PDF', size: '2.4MB', date: 'Yesterday', category: 'English HL' },
                       { name: 'Quantum Field Theory v3', type: 'DATASET', size: '15MB', date: '10:00 AM', category: 'Science 10' },
                       { name: 'Protocol Alpha-7 Brief', type: 'VOICE', size: '1.2MB', date: 'Just now', category: 'Institutional' },
                     ].map((asset, i) => (
                       <div key={i} className="p-8 flex items-center justify-between hover:bg-gray-50 transition-all group cursor-pointer border-l-4 border-transparent hover:border-lns-navy">
                          <div className="flex items-center gap-6">
                             <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-lns-navy group-hover:bg-lns-red group-hover:text-white transition-all shadow-inner">
                                <FileText size={20} />
                             </div>
                             <div>
                                <h4 className="text-lg font-black text-lns-navy group-hover:text-lns-red transition-all italic tracking-tight">{asset.name}</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic mt-1 leading-none">{asset.category} • {asset.type} • {asset.size}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-8">
                             <span className="text-[10px] font-black text-slate-400 italic uppercase">{asset.date}</span>
                             <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all shadow-sm">
                                <Download size={20} className="text-lns-navy" />
                             </Button>
                          </div>
                       </div>
                     ))}
                  </div>
               </Card>
            </div>
         </div>

         {/* Sidebar Stats (25%) */}
         <div className="space-y-8">
            <Card className="p-10 border-none shadow-2xl bg-lns-navy text-white rounded-[3.5rem] space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Storage Synopsis</p>
                     <h4 className="text-2xl font-black tracking-tight italic uppercase leading-none">Vault Resonance</h4>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                           <span>Resonance Level</span>
                           <span>88%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-lns-red w-[88%] shadow-[0_0_15px_rgba(214,43,43,1)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        Institutional synchrony is active. 14 new asset nodes have been successfully deployed to your repository in the last 24 cycles.
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Faculty Directives</h3>
                  <Zap size={18} className="text-amber-500 animate-pulse" />
               </div>
               <div className="space-y-4">
                  {[
                    { label: "New Math Asset", desc: "Differential calculus dataset available." },
                    { label: "High Authority Guide", desc: "Updated Term 2 signature protocol." },
                  ].map((act, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                       <p className="text-[9px] font-black text-lns-navy uppercase tracking-widest leading-none">{act.label}</p>
                       <p className="text-[9px] font-bold text-lns-mid-grey italic tracking-tight">{act.desc}</p>
                    </div>
                  ))}
               </div>
            </Card>

            <div className="p-6 bg-blue-500/5 rounded-2xl border-2 border-dashed border-blue-500/20 text-center space-y-3">
               <div className="flex items-center justify-center gap-3 text-blue-600">
                  <Globe size={20} />
                  <h3 className="text-[10px] font-black uppercase tracking-widest italic">Global Lattice</h3>
               </div>
               <p className="text-[9px] font-black uppercase tracking-widest text-blue-500/60 leading-relaxed italic pr-2 pl-2">
                  Resources are distributed across the LNS OS global lattice via peer-to-peer institutional synchronization.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
