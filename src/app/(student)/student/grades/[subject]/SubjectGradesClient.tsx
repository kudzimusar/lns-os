"use client";

import React from "react";
import { SUBJECTS, PLACEHOLDER_TEACHERS } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Calendar,
  User,
  ShieldCheck,
  ChevronRight,
  Download
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Helper to get teacher for a subject
const getTeacher = (subjectName: string) => {
  return PLACEHOLDER_TEACHERS.find(t => t.subject.includes(subjectName)) || PLACEHOLDER_TEACHERS[0];
};

}

export default function SubjectGradesClient({ params }: { params: { subject: string } }) {
  // Find subject from params (handling slug)
  const subject = SUBJECTS.find(s => s.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === params.subject) || SUBJECTS[0];
  const teacher = getTeacher(subject.name);

  // Mock assessments for this subject
  const assessments = [
    { name: 'Unit 1 Assessment', date: '2026-03-15', score: 18, max: 20, pct: 90, myp: 7, comment: 'Exceptional synthesis of concepts.', trend: 'up' },
    { name: 'Mid-term Exam', date: '2026-04-02', score: 38, max: 45, pct: 84, myp: 6, comment: 'Strong performance, review technical vocabulary.', trend: 'down' },
    { name: 'Project Alpha', date: '2026-04-10', score: 24, max: 25, pct: 96, myp: 8, comment: 'Creative and thorough execution.', trend: 'up' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Breadcrumb / Back */}
      <Link href="/student/grades" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors">
         <ArrowLeft size={14} />
         Back to Academic Overview
      </Link>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div className="space-y-2">
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight">{subject.name}</h1>
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
               <div className="flex items-center gap-2">
                  <User size={14} />
                  {teacher.name}
               </div>
               <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  Term 2, 2026
               </div>
            </div>
         </div>

         <div className="flex gap-4">
            <Card className="bg-white border-none shadow-xl p-6 rounded-3xl flex flex-col items-center justify-center min-w-[120px]">
               <span className="text-3xl font-black text-lns-navy">88%</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Percentage</span>
            </Card>
            <Card className="bg-lns-navy border-none shadow-xl p-6 rounded-3xl flex flex-col items-center justify-center min-w-[120px] text-white">
               <span className="text-3xl font-black text-white">B+</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Grade</span>
            </Card>
            <Card className="bg-lns-red border-none shadow-xl p-6 rounded-3xl flex flex-col items-center justify-center min-w-[120px] text-white">
               <span className="text-3xl font-black text-white">6</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-red-200">MYP Band</span>
            </Card>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Detail Cards */}
         <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 border-none shadow-sm bg-white rounded-2xl space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy">Assessment Trajectory</h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-green-600">
                     <TrendingUp size={14} />
                     Positive Development
                  </div>
               </div>
               {/* Simple SVG Chart Placeholder */}
               <div className="h-48 w-full bg-gray-50 rounded-2xl flex items-end justify-around p-6 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                     <TrendingUp size={120} className="text-lns-navy" />
                  </div>
                  {[65, 82, 75, 88, 92].map((v, i) => (
                    <div key={i} className="w-8 bg-lns-navy/20 rounded-t-lg transition-all hover:bg-lns-red" style={{ height: `${v}%` }}>
                       <div className="w-full h-1 bg-lns-navy rounded-full mt-[-8px]" />
                    </div>
                  ))}
               </div>
            </Card>

            <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
               <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                  <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy">Individual Evaluations</h3>
               </div>
               <div className="divide-y divide-gray-50">
                  {assessments.map((asg, i) => (
                    <div key={i} className="p-6 hover:bg-gray-50 transition-all group">
                       <div className="flex items-start justify-between mb-2">
                          <div>
                             <h4 className="font-bold text-lns-navy group-hover:text-lns-red transition-colors">{asg.name}</h4>
                             <p className="text-[10px] font-medium text-lns-mid-grey uppercase tracking-widest">{new Date(asg.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                             <span className="text-lg font-black text-lns-navy">{asg.score}/{asg.max}</span>
                             <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-lns-mid-grey">
                                {asg.pct}% • MYP {asg.myp}
                                {asg.trend === 'up' ? <TrendingUp size={12} className="text-green-500" /> : <TrendingDown size={12} className="text-lns-red" />}
                             </div>
                          </div>
                       </div>
                       <p className="text-xs text-lns-mid-grey leading-relaxed italic pr-12">"{asg.comment}"</p>
                    </div>
                  ))}
               </div>
            </Card>
         </div>

         {/* Sidebar stats */}
         <div className="space-y-6">
            <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey">Institutional Standing</h3>
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-bold text-lns-navy">Citizenship</span>
                     <span className="px-3 py-1 rounded-full bg-green-500 text-white text-[10px] font-black uppercase tracking-widest">Platinum</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-bold text-lns-navy">Weighting</span>
                     <span className="text-sm font-black text-lns-navy">{subject.weight}%</span>
                  </div>
                  <p className="text-[10px] text-lns-mid-grey leading-relaxed">
                     This subject contributes {subject.weight}% toward your final graduation index.
                  </p>
               </div>

               <Button className="w-full bg-lns-navy text-white hover:bg-lns-red h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 mt-4">
                  <Download size={18} />
                  Export Subject Report
               </Button>
            </Card>

            <Card className="p-8 border-none shadow-sm bg-lns-light-grey/30 rounded-2xl space-y-4">
               <div className="flex items-center gap-3 text-lns-navy">
                  <ShieldCheck size={20} />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Integrity Check</h3>
               </div>
               <p className="text-[10px] leading-relaxed text-lns-mid-grey">
                  All grades for {subject.name} are cryptographically signed by {teacher.name} and verified on the LNS OS blockchain.
               </p>
            </Card>
         </div>
      </div>
    </div>
  );
}
