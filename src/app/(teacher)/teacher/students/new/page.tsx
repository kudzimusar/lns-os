"use client";

import React from "react";
import { 
  UserPlus, 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  User, 
  Layers,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function FacultyEnrollStudentPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-1">
          <Link href="/teacher/students" className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey hover:text-lns-red flex items-center gap-2 transition-colors mb-4">
             <ArrowLeft size={14} /> Student Registry
          </Link>
          <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
             <UserPlus size={32} className="text-lns-red" />
             Class Enrollment
          </h1>
          <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Faculty-Initiated Student Node Registration</p>
        </div>
      </div>

      <Card className="p-12 border-none shadow-2xl bg-white rounded-[3rem] space-y-10">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-4">Student Name</label>
               <input placeholder="Enter full legal name..." className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-black text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-4">Target Cohort</label>
               <select className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-black text-lns-navy outline-none">
                  <option>Grade 7A</option>
                  <option>Grade 7B</option>
                  <option>Grade 8A</option>
                  <option>Grade 8B</option>
               </select>
            </div>
         </div>

         <div className="p-8 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
            <ShieldCheck className="text-amber-500 shrink-0" size={20} />
            <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase tracking-wide">
               Faculty enrollment requires secondary administrative validation. Once submitted, the student node will be held in the "Awaiting Verification" vault until an admin seal is applied.
            </p>
         </div>

         <div className="flex justify-end">
            <Button className="h-16 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-12 font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all flex items-center gap-3">
               Submit for Validation
               <ChevronRight size={20} />
            </Button>
         </div>
      </Card>
    </div>
  );
}
