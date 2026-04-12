"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  FileText, 
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
  Monitor,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TERMS = ["Term 1 (Autumn)", "Term 2 (Spring)", "Term 3 (Summer)"];

export default function TeacherReportGeneratorPage() {
  const [selectedTerm, setSelectedTerm] = React.useState(TERMS[1]);
  const [search, setSearch] = React.useState("");

  const filteredStudents = PLACEHOLDER_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/teacher/reports" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Reporting Hub
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <Monitor size={32} className="text-lns-red" />
               Institutional Synthesis Engine
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Report Cycle: {selectedTerm} • AI-Draft Ready</p>
         </div>

         <div className="flex items-center bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-inner">
            {TERMS.map((term) => (
              <Button
                key={term}
                onClick={() => setSelectedTerm(term)}
                variant="ghost" 
                className={cn(
                  "h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  selectedTerm === term ? "bg-white text-lns-navy shadow-sm" : "hover:text-lns-navy text-slate-400"
                )}
              >
                {term.split(' ')[0]}
              </Button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Student Selection (75%) */}
         <div className="lg:col-span-3 space-y-8">
            <div className="relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-lns-mid-grey group-focus-within:text-lns-red transition-colors" size={24} />
               <input 
                 type="text" 
                 placeholder="Locate student nodes for report initialization..." 
                 className="w-full h-16 bg-white rounded-[2rem] pl-16 pr-8 shadow-2xl border-none focus:ring-4 focus:ring-lns-red/5 font-bold text-sm text-lns-navy transition-all outline-none"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
            </div>

            <div className="grid grid-cols-1 gap-4">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredStudents.map((student) => (
                    <Link key={student.id} href={`/teacher/students/${student.id}/report`}>
                       <Card className="p-8 border-none shadow-xl bg-white rounded-2xl group hover:translate-y-[-4px] transition-transform duration-500 relative overflow-hidden border-t border-gray-50 flex flex-col items-center text-center">
                          <div className="relative z-10 space-y-6 flex flex-col items-center">
                             <div className="w-20 h-20 rounded-[1.5rem] bg-lns-navy text-white flex items-center justify-center text-3xl font-black shadow-xl group-hover:bg-lns-red group-hover:scale-110 transition-all">
                                {student.name.charAt(0)}
                             </div>
                             
                             <div className="space-y-1">
                                <h4 className="text-xl font-black text-lns-navy group-hover:text-lns-navy/80 transition-all italic leading-tight">{student.name}</h4>
                                <div className="flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-widest text-lns-mid-grey italic leading-none">
                                   <span>{student.grade}</span>
                                   <div className="w-1 h-1 bg-gray-200 rounded-full" />
                                   <span>#NODE_{student.id.toUpperCase()}</span>
                                </div>
                             </div>

                             <div className="pt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button className="h-10 bg-lns-navy text-white hover:bg-lns-red rounded-xl px-6 font-black uppercase tracking-widest text-[9px] shadow-lg shadow-navy-600/10 active:scale-95 transition-all">
                                   Synthesize
                                </Button>
                                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-lns-navy hover:bg-white hover:shadow-xl transition-all">
                                   <Zap size={18} />
                                </div>
                             </div>
                          </div>
                          <Activity size={120} className="absolute -bottom-10 -right-10 opacity-[0.03] text-lns-navy pointer-events-none group-hover:opacity-10 transition-opacity" />
                       </Card>
                    </Link>
                  ))}
               </div>
            </div>
         </div>

         {/* Sidebar Controls (25%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Report Cycle Synopsis</p>
                     <h4 className="text-2xl font-black italic uppercase leading-none tracking-tight">Active Synthesis</h4>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2 text-center overflow-hidden">
                        <div className="flex justify-between items-end mb-1">
                           <p className="text-4xl font-black italic text-lns-red tracking-tighter">18/32</p>
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Nodes Synchronized</p>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-lns-red w-[56%] shadow-[0_0_20px_rgba(214,43,43,1)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "Term 2 synthesis engine is active. AI draft generators are primed for all student nodes with 100% data fidelity."
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Global Directives</h3>
                  <Zap size={18} className="text-amber-500 animate-pulse" />
               </div>
               <div className="space-y-4">
                  <Button className="w-full h-14 bg-lns-red text-white hover:bg-black rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-red-600/20 active:scale-95 transition-all flex items-center justify-center gap-3">
                     Bulk AI Synthesis
                  </Button>
                  <Button variant="outline" className="w-full h-14 border-gray-100 rounded-2xl font-black uppercase tracking-widest text-[10px] text-lns-mid-grey hover:bg-gray-50 flex items-center justify-center gap-2">
                     Export All Drafts
                  </Button>
               </div>
            </Card>

            <div className="p-6 bg-blue-500/5 rounded-2xl border-2 border-dashed border-blue-500/20 text-center space-y-3">
               <ShieldCheck size={28} className="text-blue-500 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-blue-500/60 leading-relaxed italic pr-2 pl-2">
                  All reports are cryptographically signed and stored in the high-authority institutional vault.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
