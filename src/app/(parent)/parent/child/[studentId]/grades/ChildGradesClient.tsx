"use client";

import React from "react";
import { SUBJECTS, PLACEHOLDER_STUDENTS, PLACEHOLDER_TEACHERS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  Download, 
  TrendingUp, 
  BookOpen, 
  User, 
  ChevronRight,
  ShieldCheck,
  Award
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Helper to get grade letter from percentage
const getGradeLetter = (pct: number) => {
  if (pct >= 95) return 'A+';
  if (pct >= 90) return 'A';
  if (pct >= 85) return 'B+';
  if (pct >= 80) return 'B';
  return 'C+';
};

export default function ChildGradesClient({ params }: { params: { studentId: string } }) {
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.studentId) || PLACEHOLDER_STUDENTS[0];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href={`/parent/child/${params.studentId}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Child Profile
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
               <TrendingUp size={32} className="text-lns-red" />
               Academic Gradebook Ledger
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic">{student.name} • Term 2 Cycle</p>
         </div>

         <div className="flex flex-col items-end">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey mb-2">Institutional index</div>
            <div className="bg-lns-navy text-white px-8 py-4 rounded-3xl flex items-center gap-4 shadow-xl shadow-navy-600/20 group cursor-default">
               <div className="text-4xl font-black text-white italic">{student.powerScore}%</div>
               <div className="h-8 w-px bg-white/20" />
               <div className="text-right">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Pos</p>
                  <p className="text-lg font-black text-white leading-none">Top 10%</p>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {SUBJECTS.map((sub, i) => {
           const pct = 75 + Math.floor(Math.random() * 20);
           const gradeLetter = getGradeLetter(pct);
           const mypBand = Math.floor(pct / 12.5);
           const teacher = PLACEHOLDER_TEACHERS.find(t => t.subject.includes(sub.name)) || PLACEHOLDER_TEACHERS[0];
           
           return (
             <Card key={sub.name} className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6 hover:translate-y-[-4px] transition-transform group cursor-pointer border-l-4 border-transparent hover:border-lns-red">
                <div className="flex items-center justify-between">
                   <div className="w-12 h-12 rounded-2xl bg-lns-navy/5 text-lns-navy flex items-center justify-center group-hover:bg-lns-navy group-hover:text-white transition-all">
                      <BookOpen size={24} />
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-2xl font-black text-lns-navy">{gradeLetter}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey">Refined Grade</span>
                   </div>
                </div>

                <div className="space-y-1">
                   <h4 className="text-lg font-black text-lns-navy group-hover:text-lns-red transition-all">{sub.name}</h4>
                   <div className="flex items-center gap-2 text-[10px] text-lns-mid-grey font-black uppercase tracking-widest">
                      <User size={12} />
                      {teacher.name}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">MYP Band</p>
                      <p className="text-lg font-black text-lns-navy">{mypBand}/8</p>
                   </div>
                   <div className="space-y-1 text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Percentage</p>
                      <p className="text-lg font-black text-lns-navy">{pct}%</p>
                   </div>
                </div>

                <Button variant="ghost" className="w-full h-10 bg-gray-50 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-between px-6 group-hover:bg-lns-navy group-hover:text-white transition-all">
                   Audit Assessments
                   <ChevronRight size={14} />
                </Button>
             </Card>
           );
         })}
      </div>

      {/* Report Card Actions */}
      <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-6">
         <Button className="w-full md:w-auto h-16 bg-lns-red text-white hover:bg-red-700 rounded-2xl px-12 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-red-600/20 active:scale-95 transition-all flex items-center justify-center gap-4">
            <Download size={20} />
            Secure Report Download (Term 2)
         </Button>
         <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
            <ShieldCheck size={18} className="text-green-500" />
            Blockchain Verified Index
         </div>
      </div>
    </div>
  );
}
