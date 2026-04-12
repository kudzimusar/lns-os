"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  FileText, 
  Download, 
  ChevronRight, 
  ArrowLeft, 
  Eye, 
  CheckCircle2, 
  Sparkles,
  Zap,
  BarChart3,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const reports = [
  { id: "REP-2026-T1", title: "Term 1 Final Report", date: "April 10, 2026", status: "Verified", child: "Alex Lincoln" },
  { id: "REP-2025-T3", title: "Term 3 Performance Arch", date: "Dec 15, 2025", status: "Archived", child: "Alex Lincoln" },
];

export default function parentReports() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 pt-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
           <Link href="/parent/dashboard">
              <Button variant="outline" className="h-12 w-12 rounded-xl p-0 bg-white border-lns-border">
                 <ArrowLeft size={18} />
              </Button>
           </Link>
           <div>
              <h1 className="text-3xl font-[900] text-lns-navy tracking-tighter uppercase">Academic <span className="text-lns-red">Ledger</span></h1>
              <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Verified PDF Documentation Hub</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-4">
            {reports.map((rep) => (
              <Card key={rep.id} className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-xl transition-all cursor-pointer">
                 <div className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-start space-x-6">
                       <div className="w-16 h-16 rounded-[1.5rem] bg-lns-light-grey flex items-center justify-center text-lns-navy group-hover:bg-lns-navy group-hover:text-white transition-all shadow-inner">
                          <FileText size={28} />
                       </div>
                       <div>
                          <h4 className="text-xl font-black text-lns-navy group-hover:text-lns-red transition-all">{rep.title}</h4>
                          <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest mt-1">{rep.child} • Published: {rep.date}</p>
                          <div className="flex items-center space-x-2 mt-4">
                             <span className="text-[9px] font-black bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100 flex items-center italic">
                               <CheckCircle2 size={10} className="mr-1.5" /> SECURE HASH VERIFIED
                             </span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center space-x-3">
                       <Button variant="outline" className="h-12 border-lns-border text-lns-navy font-black uppercase tracking-widest text-[10px] rounded-xl px-6">
                          <Eye size={16} className="mr-2" /> Preview
                       </Button>
                       <Button className="h-12 bg-lns-navy text-white font-black uppercase tracking-widest text-[10px] rounded-xl px-6 shadow-lg shadow-lns-navy/20">
                          <Download size={16} className="mr-2" /> Download
                       </Button>
                    </div>
                 </div>
              </Card>
            ))}
         </div>

         <div className="space-y-6">
            <Card className="border-none shadow-xl bg-gradient-to-br from-lns-navy to-slate-950 text-white p-10 rounded-[3rem] relative overflow-hidden">
               <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-lns-red/20 px-3 py-1 rounded-full border border-lns-red/30">
                     <Sparkles size={12} className="text-lns-red" />
                     <span className="text-[9px] font-black uppercase text-lns-red">AI Summary Available</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">Year-over-Year Academic Arc</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-bold">
                     Our Synthesis Engine has generated a performance trend report for Alex across the last 3 Academic Years.
                  </p>
                  <Button className="w-full h-14 bg-white text-lns-navy hover:bg-lns-red hover:text-white transition-all rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl">
                     Execute Arc Synthesis
                  </Button>
               </div>
               <BarChart3 size={180} className="absolute -bottom-10 -right-10 text-white/5" />
            </Card>

            <div className="p-8 bg-lns-light-grey rounded-2xl border border-lns-border/30 space-y-4">
                <div className="flex items-center space-x-3 text-lns-navy">
                   <BookOpen size={20} />
                   <h4 className="text-sm font-black uppercase">MYP Grading Hub</h4>
                </div>
                <p className="text-xs text-lns-mid-grey leading-relaxed">
                   Looking for a breakdown of individual assessment criteria? Access the live gradebook to see MYP Rubric feedback.
                </p>
                <Button variant="ghost" className="w-full text-lns-red font-black uppercase text-[10px] tracking-widest text-left justify-start px-0 underline">
                   View Live Gradebook Flow
                </Button>
            </div>
         </div>
      </div>
    </div>
  );
}
