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
  Globe,
  Monitor,
  Printer,
  MoreVertical
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SHARED_DOCS = [
  { id: 'shared-001', name: 'School Handbook 2026', type: 'PDF', size: '4.2MB', date: 'Jan 15', category: 'General' },
  { id: 'shared-002', name: 'Uniform Policy v1.4', type: 'PDF', size: '1.8MB', date: 'Feb 10', category: 'Policy' },
  { id: 'shared-003', name: 'Academic Calendar Term 2', type: 'PDF', size: '0.8MB', date: 'Mar 20', category: 'Schedule' },
];

const PRIVATE_DOCS = [
  { id: 'p-001', name: 'Assessment Invoice - Apr', type: 'PDF', size: '1.1MB', date: 'Today', category: 'Finance' },
  { id: 'p-002', name: 'Medical Clearance Form', type: 'IMAGE', size: '2.5MB', date: '2d ago', category: 'Welfare' },
  { id: 'p-003', name: 'Enrollment Agreement Signed', type: 'PDF', size: '5.6MB', date: 'Last Year', category: 'Legal' },
];

export default function ParentDocumentsPage() {
  const [search, setSearch] = React.useState("");

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/parent/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Family Hub
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Layers size={32} className="text-lns-red" />
               Institutional Asset Hub
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Synchronized school policies and personal family documentation.</p>
         </div>

         <div className="flex items-center space-x-3">
            <Button variant="outline" className="h-14 bg-white border-gray-100 rounded-2xl px-6 font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center gap-2">
               <Printer size={18} />
               Print Selection
            </Button>
            <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3">
               <Download size={18} />
               Sync All Repositories
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Folder Explorer (75%) */}
         <div className="lg:col-span-3 space-y-12">
            <div className="relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-lns-mid-grey group-focus-within:text-lns-red transition-colors" size={24} />
               <input 
                 type="text" 
                 placeholder="Search institutional assets, PDFs, datasets, or policy transcripts..." 
                 className="w-full h-16 bg-white rounded-[2rem] pl-16 pr-8 shadow-2xl border-none focus:ring-4 focus:ring-lns-red/5 font-bold text-sm text-lns-navy transition-all outline-none"
               />
            </div>

            {/* Shared School Documents */}
            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic flex items-center gap-2">
                  <Globe size={16} className="text-lns-red" />
                  Shared Institutional Assets
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SHARED_DOCS.map((doc) => (
                    <Card key={doc.id} className="p-8 border-none shadow-xl bg-white rounded-2xl group hover:translate-y-[-4px] transition-transform duration-500 relative overflow-hidden border-t border-gray-50">
                       <div className="relative z-10 space-y-6">
                          <div className="w-16 h-16 rounded-2xl bg-lns-navy/5 text-lns-navy flex items-center justify-center text-4xl font-black shadow-inner group-hover:bg-lns-navy group-hover:text-white transition-all">
                             <FileText size={28} />
                          </div>
                          <div className="space-y-2">
                             <h4 className="text-lg font-black text-lns-navy group-hover:text-lns-red transition-all italic leading-tight">{doc.name}</h4>
                             <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-lns-mid-grey italic leading-none">
                                <span>{doc.type}</span>
                                <span>{doc.size}</span>
                             </div>
                          </div>
                          <div className="flex items-center justify-between pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Button variant="ghost" size="icon" className="h-10 w-10 text-lns-navy"><Download size={20}/></Button>
                             <ShieldCheck size={18} className="text-green-500" />
                          </div>
                       </div>
                    </Card>
                  ))}
               </div>
            </div>

            {/* Private Family Ledger */}
            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic flex items-center gap-2">
                  <ShieldCheck size={16} />
                  Private Family Persistence Records
               </h3>
               <Card className="border-none shadow-2xl bg-white rounded-2xl overflow-hidden">
                  <div className="divide-y divide-gray-50">
                     {PRIVATE_DOCS.map((doc) => (
                       <div key={doc.id} className="p-8 flex items-center justify-between hover:bg-gray-50 transition-all group cursor-pointer border-l-4 border-transparent hover:border-lns-navy">
                          <div className="flex items-center gap-6">
                             <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-lns-navy group-hover:bg-lns-red group-hover:text-white transition-all shadow-inner">
                                <FileText size={20} />
                             </div>
                             <div>
                                <h4 className="text-lg font-black text-lns-navy group-hover:text-lns-red transition-all italic tracking-tight">{doc.name}</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic mt-1 leading-none">{doc.category} • {doc.type} • {doc.size}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-8">
                             <span className="text-[10px] font-black text-slate-400 italic uppercase">{doc.date}</span>
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
                     ))}
                  </div>
               </Card>
            </div>
         </div>

         {/* Sidebar Stats (25%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Storage Synopsis</p>
                     <h4 className="text-2xl font-black italic uppercase leading-none tracking-tight">Vault Capacity</h4>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                           <span>Resonance Level</span>
                           <span>44%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-lns-red w-[44%] shadow-[0_0_15px_rgba(214,43,43,0.8)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "Family persistence records are fully encrypted and synchronized with the high-authority broadcast vault."
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Faculty Releases</h3>
                  <Zap size={18} className="text-amber-500 animate-pulse" />
               </div>
               <div className="space-y-4">
                  {[
                    { label: "Fee Schedule 2026", desc: "Updated financial roadmap assets." },
                    { label: "New Welfare Manual", desc: "Guardian health synchronization update." },
                  ].map((act, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1 group cursor-pointer hover:border-lns-red/20 transition-all">
                       <p className="text-[9px] font-black text-lns-navy uppercase tracking-widest leading-none flex items-center justify-between">
                          {act.label}
                          <Download size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                       </p>
                       <p className="text-[9px] font-bold text-lns-mid-grey italic tracking-tight">{act.desc}</p>
                    </div>
                  ))}
               </div>
            </Card>

            <div className="p-4 bg-green-500/5 rounded-2xl border-2 border-dashed border-green-500/20 flex flex-col items-center justify-center gap-3 text-center text-green-600">
               <ShieldCheck size={20} />
               <p className="text-[9px] font-black uppercase tracking-widest italic opacity-80 leading-snug">Full Asset Transparency Mode Active</p>
            </div>
         </div>
      </div>
    </div>
  );
}
