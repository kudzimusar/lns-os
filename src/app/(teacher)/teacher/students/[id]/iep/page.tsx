"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  ShieldAlert, 
  HandHeart, 
  FileText, 
  ShieldCheck, 
  MoreVertical,
  Activity,
  Plus,
  Trash2,
  Edit2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    id: s.id,
  }));
}

export default function TeacherStudentIEPPage({ params }: { params: { id: string } }) {
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.id) || PLACEHOLDER_STUDENTS[0];

  const NEEDS = [
    { label: "Specific Learning Node", status: "Active Support", type: "Dyslexia", support: "Extended Node Time (+25%)" },
    { label: "Sensory Processing Delta", status: "Monitored", type: "Visual", support: "High-Contrast Asset Delivery" },
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
               <HandHeart size={32} className="text-lns-red" />
               Individual Educational Provision (IEP)
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">{student.name} • Special Educational Resource Access</p>
         </div>

         <div className="flex items-center gap-3">
            <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-2">
               <Plus size={18} />
               Deploy New Provision
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Provision Details (75%) */}
         <div className="lg:col-span-3 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {NEEDS.map((need, i) => (
                 <Card key={i} className="p-10 border-none shadow-2xl bg-white rounded-[3rem] group hover:translate-y-[-4px] transition-transform duration-500 relative overflow-hidden">
                    <div className="relative z-10 space-y-6">
                       <div className="flex items-start justify-between">
                          <div className="w-16 h-16 rounded-[1.2rem] bg-blue-50 text-blue-600 flex items-center justify-center text-3xl font-black shadow-inner">
                             <ShieldAlert size={28} />
                          </div>
                          <span className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[9px] font-black uppercase tracking-widest italic leading-none">{need.status}</span>
                       </div>
                       
                       <div className="space-y-4">
                          <h4 className="text-xl font-black text-lns-navy italic tracking-tight uppercase leading-none">{need.label}</h4>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic font-mono">{need.type} Classification</p>
                       </div>

                       <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                          <p className="text-[9px] font-black text-lns-navy uppercase tracking-widest italic leading-none">Support Protocol</p>
                          <p className="text-sm font-bold text-lns-navy/80 italic">{need.support}</p>
                       </div>

                       <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-lns-red"><Edit2 size={16}/></Button>
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-lns-red"><Trash2 size={16}/></Button>
                       </div>
                    </div>
                 </Card>
               ))}
            </div>

            <div className="space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic flex items-center gap-2">
                  <FileText size={16} />
                  Institutional Support Synthesis
               </h3>
               <Card className="p-10 border-none shadow-2xl bg-white rounded-[3rem] space-y-6 italic text-sm font-medium leading-relaxed text-lns-navy opacity-80 border-t-8 border-lns-red">
                  "Facilitate high-resonance educational assets for {student.name.split(' ')[0]}. Sensory delta in unit 2 identified high fatigue markers; suggest node expansion cycles be limited during peak-latency assessment windows."
                  <div className="pt-6 border-t border-gray-50 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
                    Deployed by: Head of Support Node • Oct 24, 2025
                  </div>
               </Card>
            </div>
         </div>

         {/* Right Sidebar (25%) */}
         <div className="space-y-8">
            <Card className="p-10 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-8 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Faculty Briefing</p>
                     <h4 className="text-2xl font-black italic uppercase leading-none tracking-tight">Support Node Sync</h4>
                  </div>
                  <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                    "Institutional IEP synchronization active. Access support protocols for all curriculum nodes via the global registry."
                  </p>
               </div>
               <HandHeart className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <div className="p-6 bg-red-500/5 rounded-2xl border-2 border-dashed border-red-500/20 text-center space-y-3">
               <AlertCircle size={28} className="text-lns-red mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-lns-red/60 leading-relaxed italic pr-2 pl-2">
                  Provisions are high-priority institutional mandates. Failure to synchronize will result in audit latency.
               </p>
            </div>

            <div className="p-6 bg-blue-500/5 rounded-2xl border-2 border-dashed border-blue-500/20 text-center space-y-3">
               <ShieldCheck size={28} className="text-blue-500 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-blue-500/60 leading-relaxed italic pr-2 pl-2">
                  IEP data is cryptographically sealed for student privacy and faculty access only.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
