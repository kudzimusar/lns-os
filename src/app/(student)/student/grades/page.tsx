"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  GraduationCap, 
  TrendingUp, 
  Award, 
  ArrowUpRight,
  BookOpen,
  PieChart,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SUBJECTS, PLACEHOLDER_TEACHERS } from "@/lib/placeholder-data";
import Link from "next/link";

// Helper to get grade letter from percentage
const getGradeLetter = (pct: number) => {
  if (pct >= 95) return 'A+';
  if (pct >= 90) return 'A';
  if (pct >= 85) return 'B+';
  if (pct >= 80) return 'B';
  return 'C+';
};

export default function StudentGradesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 p-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight">Academic Mission Progress</h1>
          <p className="text-lns-mid-grey font-medium text-sm">Verified institutional grade reporting and MYP criteria bands.</p>
        </div>
        <Button className="bg-lns-red text-white hover:bg-red-700 h-14 rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-red-600/20 active:scale-95 transition-all flex items-center gap-3">
          <Award size={18} />
          Export Terminal Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Global GPA Card */}
        <Card className="border-none shadow-2xl bg-lns-navy text-white p-10 space-y-6 rounded-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-lns-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
           <div className="relative z-10 space-y-6">
              <div className="flex items-center space-x-4">
                 <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/5 animate-pulse">
                    <GraduationCap className="text-lns-red" size={32} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Institutional GPA</p>
                    <h2 className="text-5xl font-[900] tracking-tighter">3.82</h2>
                 </div>
              </div>
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                 <span className="text-xs font-bold text-slate-400">Honors Society Eligible</span>
                 <div className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/20 text-[10px] font-black rounded uppercase tracking-widest">Active</div>
              </div>
           </div>
           <PieChart className="absolute -bottom-10 -right-10 text-white/5 w-48 h-48 group-hover:scale-110 transition-transform duration-700" />
        </Card>

        {/* Citizenship Card */}
        <Card className="md:col-span-2 border-none shadow-xl bg-white overflow-hidden rounded-2xl flex flex-col sm:flex-row group">
           <div className="p-10 space-y-6 flex-1 bg-white">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy/40">Citizenship Pulse</h4>
              <div className="flex items-center space-x-6">
                 <div className="w-20 h-20 rounded-3xl bg-lns-light-grey flex items-center justify-center text-lns-navy font-black text-3xl shadow-inner group-hover:bg-lns-red group-hover:text-white transition-all duration-500">
                    A
                 </div>
                 <div className="space-y-1">
                    <p className="text-2xl font-black text-lns-navy leading-none">Exceptional Standing</p>
                    <p className="text-xs font-bold text-lns-mid-grey">Zero behavioural variance detected this term.</p>
                 </div>
              </div>
           </div>
           <div className="p-10 bg-lns-light-grey/20 border-l border-lns-border flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey">Merit Aggregator</p>
                 <div className="flex items-baseline space-x-3">
                    <span className="text-5xl font-[900] text-lns-navy">450</span>
                    <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-lg">+12 Units</span>
                 </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-lns-navy/40 mt-4">
                 <ShieldCheck size={14} className="text-green-500" />
                 Blockchain Verified Index
              </div>
           </div>
        </Card>
      </div>

      {/* Grade Ledger */}
      <Card className="border-none shadow-xl overflow-hidden bg-white rounded-2xl">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
           <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy">Academic Asset Ledger</h3>
           <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Term 2 • 2026 Cycle</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Subject Mission</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Target Grade</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Refinement %</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Trajectory</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lns-border">
              {SUBJECTS.map((item) => {
                const pct = 80 + Math.floor(Math.random() * 18);
                const grade = getGradeLetter(pct);
                const slug = item.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
                const teacher = PLACEHOLDER_TEACHERS.find(t => t.subject.includes(item.name)) || PLACEHOLDER_TEACHERS[0];
                
                return (
                  <tr key={item.name} className="hover:bg-gray-50 transition-all group cursor-pointer">
                    <td className="px-8 py-6">
                      <Link href={`/student/grades/${slug}`} className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-lns-navy/5 text-lns-navy flex items-center justify-center group-hover:bg-lns-navy group-hover:text-white transition-all">
                           <BookOpen size={20} />
                        </div>
                        <div>
                           <span className="text-sm font-black text-lns-navy block leading-none mb-1 group-hover:text-lns-red transition-all">{item.name}</span>
                           <span className="text-[10px] font-bold text-lns-mid-grey uppercase">{teacher.name}</span>
                        </div>
                      </Link>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xl font-black text-lns-navy">{grade}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-2">
                         <div className="w-32 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-lns-red rounded-full" 
                              style={{ width: `${pct}%` }}
                            />
                         </div>
                         <span className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">{pct} Units</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                         <div className="p-1.5 rounded-lg bg-green-50 text-green-600">
                            <TrendingUp size={16} />
                         </div>
                         <span className="text-[10px] font-black uppercase text-green-600 tracking-widest">+1.2%</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link href={`/student/grades/${slug}`}>
                         <Button variant="ghost" size="icon" className="h-10 w-10 text-lns-mid-grey group-hover:text-white group-hover:bg-lns-navy rounded-xl transition-all shadow-xl shadow-transparent group-hover:shadow-navy-600/20">
                            <ChevronRight size={18} />
                         </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
