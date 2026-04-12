"use client";

import React from "react";
import { ASSIGNMENTS } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { 
  ArrowLeft, 
  MessageCircle, 
  CheckCircle2, 
  TrendingUp,
  Download,
  Calendar,
  User,
  Star
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return ASSIGNMENTS.filter(a => a.status === 'Completed').map((asg) => ({
    id: asg.id,
  }));
}

export default function AssignmentFeedbackPage({ params }: { params: { id: string } }) {
  const assignment = ASSIGNMENTS.find(a => a.id === params.id && a.status === 'Completed');

  if (!assignment) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-6">
       <p className="text-xl font-bold text-lns-navy">Feedback Pending</p>
       <p className="text-lns-mid-grey">This assignment has not been marked yet. Please check back later.</p>
       <Link href="/student/assignments">
          <Button className="bg-lns-navy text-white rounded-xl h-12 px-8 font-black uppercase tracking-widest text-[10px]">Return to Hub</Button>
       </Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/student/assignments" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Assignments
            </Link>
            <h1 className="text-3xl font-black text-lns-navy tracking-tighter leading-tight">{assignment.title}</h1>
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
               <div className="flex items-center gap-2">
                  <User size={14} />
                  {assignment.teacher}
               </div>
               <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  Completed April 2026
               </div>
            </div>
         </div>

         <div className="flex flex-col items-end">
            <div className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey mb-2">Refined Appraisal</div>
            <div className="flex items-center gap-4 bg-white shadow-xl shadow-green-600/10 p-4 rounded-3xl border border-green-50">
               <div className="flex flex-col">
                  <span className="text-4xl font-black text-green-600 leading-none">{assignment.score}</span>
                  <span className="text-[10px] font-black text-green-600/50 uppercase tracking-widest">/ {assignment.maxScore}</span>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/20">
                  <Star size={24} fill="white" />
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {/* Main Feedback Card */}
         <Card className="md:col-span-2 p-8 border-none shadow-xl bg-white rounded-2xl space-y-8">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-lns-navy/5 text-lns-navy">
                     <MessageCircle size={24} />
                  </div>
                  <h3 className="text-lg font-black text-lns-navy tracking-tight">Institutional Commentary</h3>
               </div>
               <p className="text-lns-navy/70 leading-relaxed text-sm italic border-l-4 border-lns-red/20 pl-6">
                  "{assignment.feedback}"
               </p>
            </div>

            <div className="space-y-4 pt-8 border-t border-gray-50">
               <h3 className="text-sm font-black text-lns-navy tracking-tight">Sub-module Performance</h3>
               <div className="space-y-3">
                  {[
                    { label: "Originality & Synthesis", score: "9/10", bar: 90 },
                    { label: "Technical Precision", score: "9/10", bar: 90 },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex items-center justify-between text-[10px] font-black uppercase text-lns-mid-grey">
                          <span>{stat.label}</span>
                          <span className="text-lns-navy">{stat.score}</span>
                       </div>
                       <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                          <div className="h-full bg-lns-navy rounded-full" style={{ width: `${stat.bar}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <Button className="w-full bg-gray-50 text-lns-navy hover:bg-gray-100 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 mt-8">
               <Download size={18} />
               Secure Full Report Export
            </Button>
         </Card>

         {/* Stats Column */}
         <div className="space-y-6">
            <Card className="p-6 border-none shadow-sm bg-lns-navy text-white rounded-[2rem] space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Class Positioning</p>
               <div className="flex items-end gap-2">
                  <span className="text-4xl font-black leading-none">Top 5%</span>
                  <TrendingUp size={24} className="text-green-400 mb-1" />
               </div>
               <p className="text-xs text-slate-400/80 leading-relaxed">
                  You outperformed 95% of your peer nodes in this module.
               </p>
            </Card>

            <Card className="p-6 border-none shadow-sm bg-white rounded-[2rem] space-y-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Refined Traits</p>
               <div className="flex flex-wrap gap-2">
                  {["Analytical", "Precise", "Eloquent"].map((trait, i) => (
                     <span key={i} className="px-3 py-1 rounded-full bg-gray-50 text-lns-navy text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-green-500" />
                        {trait}
                     </span>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
}
