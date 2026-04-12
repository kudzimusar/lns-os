"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS, SUBJECTS, PLACEHOLDER_TEACHERS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  TrendingUp, 
  Settings, 
  Save, 
  ChevronRight, 
  ShieldCheck, 
  BookOpen, 
  Plus, 
  Download,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GradesClient({ params }: { params: { id: string } }) {
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.id) || PLACEHOLDER_STUDENTS[0];
  const [isSaving, setIsSaving] = React.useState(false);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href={`/teacher/students/${params.id}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Student Profile
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <TrendingUp size={32} className="text-lns-red" />
               Gradebook Authority Index
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">{student.name} • Term 2 Academic Cycle</p>
         </div>

         <div className="flex flex-col items-end">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey mb-2 italic">Institutional Standing</div>
            <div className="bg-lns-navy text-white px-8 py-4 rounded-3xl flex items-center gap-4 shadow-xl shadow-navy-600/20 group cursor-default relative overflow-hidden">
               <div className="absolute inset-0 bg-lns-red/10 blur-[20px] group-hover:bg-lns-red/20 transition-all" />
               <div className="relative z-10 text-4xl font-black text-white italic">{student.powerScore}%</div>
               <div className="relative z-10 h-8 w-px bg-white/20" />
               <div className="relative z-10 text-right">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</p>
                  <p className="text-lg font-black text-green-500 leading-none">Elite</p>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Main Grade Matrix */}
         <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between px-4">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy italic">Official Subject Ledger</h3>
               <Button variant="ghost" className="h-8 px-4 rounded-xl text-[9px] font-black uppercase text-lns-red hover:bg-lns-red/5">
                  <Plus size={14} className="mr-2" />
                  Add Assessment Record
               </Button>
            </div>
            
            <div className="space-y-4">
               {SUBJECTS.map((sub, i) => {
                 const pct = 75 + Math.floor(Math.random() * 20);
                 const band = Math.floor(pct / 12.5);
                 return (
                   <Card key={sub.name} className="p-8 border-none shadow-xl bg-white rounded-2xl hover:translate-x-2 transition-transform group cursor-pointer overflow-hidden relative border-l-8 border-transparent hover:border-lns-red">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-lns-navy/5 text-lns-navy flex items-center justify-center group-hover:bg-lns-navy group-hover:text-white transition-all">
                               <BookOpen size={28} />
                            </div>
                            <div className="space-y-1">
                               <h4 className="text-xl font-black text-lns-navy group-hover:text-lns-red transition-all italic tracking-tight">{sub.name}</h4>
                               <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">{PLACEHOLDER_TEACHERS[i % 5].name} • Weight: {sub.weight}%</p>
                            </div>
                         </div>

                         <div className="flex items-center gap-12">
                            <div className="space-y-1">
                               <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic leading-none">MYP Band</p>
                               <div className="flex items-center gap-3">
                                  <span className="text-2xl font-black text-lns-navy">{band}</span>
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                               </div>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic leading-none">Authority %</p>
                               <input 
                                 type="text" 
                                 defaultValue={pct} 
                                 className="w-20 h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-black text-lns-navy outline-none focus:bg-white focus:border-lns-red/20 text-center shadow-inner"
                               />
                            </div>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-200 group-hover:text-lns-navy bg-gray-50 group-hover:bg-white rounded-xl shadow-inner group-hover:shadow-xl transition-all">
                               <ChevronRight size={18} />
                            </Button>
                         </div>
                      </div>
                   </Card>
                 );
               })}
            </div>
         </div>

         {/* Strategic Action Sidebar */}
         <div className="space-y-6">
            <Card className="p-10 border-none shadow-2xl bg-lns-navy text-white rounded-[3rem] space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">High Authority Controls</p>
                     <h4 className="text-2xl font-black tracking-tight italic uppercase leading-none">Record Deployment</h4>
                  </div>
                  <p className="text-sm font-medium italic opacity-80 leading-relaxed">
                     Update the institutional grade ledger for {student.name}. This will synchronize performance data across student and guardian portals.
                  </p>
                  <Button 
                    onClick={() => setIsSaving(true)}
                    className="w-full h-16 bg-white text-lns-navy hover:bg-lns-red hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-white/5"
                  >
                     {isSaving ? "Syncing Ledger..." : "Commit Ledger Changes"}
                     {!isSaving && <Save size={18} className="ml-3" />}
                  </Button>
               </div>
               <TrendingUp className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <Card className="p-8 border-none shadow-xl bg-[#FFFBF0] rounded-2xl space-y-4 border border-amber-100">
               <div className="flex items-center gap-3 text-amber-900 border-b border-amber-200 pb-4">
                  <AlertCircle size={20} className="text-amber-500" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Grading Standards</h3>
               </div>
               <p className="text-[10px] leading-relaxed text-amber-900/60 font-medium italic uppercase tracking-wider">
                  All grades must adhere to the LNS OS v1.4 MYP Criteria Bands. Review institutional guidelines before commiting variances.
               </p>
               <Button variant="ghost" className="w-full h-10 bg-amber-500/10 text-amber-900 rounded-xl text-[9px] font-black uppercase tracking-widest border border-amber-200">
                  Access Grading Policy
               </Button>
            </Card>

            <div className="p-6 bg-green-500/5 rounded-2xl border-2 border-dashed border-green-500/20 text-center space-y-2">
               <div className="flex items-center justify-center gap-2 text-green-600">
                  <ShieldCheck size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest italic">Immutable Traceability</span>
               </div>
               <p className="text-[9px] font-bold text-green-500/60 italic leading-tight">
                  Every grade modification is crytpographically hashed and attributed to your user identity node.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
