"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  GraduationCap, 
  TrendingUp, 
  Award, 
  ArrowUpRight,
  BookOpen,
  PieChart
} from "lucide-react";
import { cn } from "@/lib/utils";

const subjects = [
  { name: "Mathematics", grade: "A", percentage: 88, trend: "up", credits: 4 },
  { name: "English Literature", grade: "A-", percentage: 82, trend: "stable", credits: 3 },
  { name: "Science (Biology)", grade: "B+", percentage: 78, trend: "down", credits: 4 },
  { name: "History", grade: "A+", percentage: 95, trend: "up", credits: 3 },
  { name: "Global Citizenship", grade: "O", percentage: 100, trend: "stable", credits: 2 },
];

export default function StudentGradesPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Academic Progress</h1>
          <p className="text-lns-mid-grey font-medium">Verified grade reporting and MYP criteria bands.</p>
        </div>
        <Button variant="outline" className="bg-white">
          <Award size={18} className="mr-2 text-lns-red" />
          View Report Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-xl bg-lns-navy text-white p-8 space-y-4">
           <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                 <GraduationCap className="text-lns-red" size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey">Global GPA</p>
                 <h2 className="text-3xl font-[900]">3.8</h2>
              </div>
           </div>
           <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400">Honors Society Eligible</span>
              <div className="px-2 py-0.5 bg-green-500 text-[10px] font-black rounded uppercase">Active</div>
           </div>
        </Card>

        <Card className="md:col-span-2 border-none shadow-sm bg-white overflow-hidden">
           <div className="h-full flex flex-col sm:flex-row">
              <div className="p-8 space-y-4 flex-1">
                 <h4 className="text-xs font-black uppercase tracking-widest text-lns-navy">Citizenship Status</h4>
                 <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-3xl bg-lns-light-grey flex items-center justify-center text-lns-navy font-black text-2xl">
                       A
                    </div>
                    <div>
                       <p className="text-lg font-black text-lns-navy">Outstanding</p>
                       <p className="text-xs font-bold text-lns-mid-grey">No behavioural flags this term.</p>
                    </div>
                 </div>
              </div>
              <div className="p-8 bg-lns-light-grey/30 border-l border-lns-border flex-1">
                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Merit Tally</p>
                    <div className="flex items-baseline space-x-2">
                       <span className="text-4xl font-[900] text-lns-navy">42</span>
                       <span className="text-green-600 font-bold text-sm">+8 this week</span>
                    </div>
                 </div>
              </div>
           </div>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-lns-border bg-lns-light-grey/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Subject</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Final Grade</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Percentage</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Trend</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lns-border">
              {subjects.map((item) => (
                <tr key={item.name} className="hover:bg-lns-light-grey/20 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                       <BookOpen size={16} className="text-lns-mid-grey" />
                       <span className="text-sm font-bold text-lns-navy">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-black text-lns-navy">{item.grade}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32 bg-lns-light-grey h-2 rounded-full mt-2 relative overflow-hidden">
                       <div 
                         className="absolute inset-0 bg-lns-navy rounded-full" 
                         style={{ width: `${item.percentage}%` }}
                       />
                    </div>
                    <span className="text-[10px] font-black text-lns-mid-grey mt-1 inline-block">{item.percentage}%</span>
                  </td>
                  <td className="px-6 py-4">
                    {item.trend === "up" ? (
                      <TrendingUp className="text-green-500" size={18} />
                    ) : item.trend === "down" ? (
                      <TrendingUp className="text-lns-red rotate-180" size={18} />
                    ) : (
                      <div className="w-4 h-1 bg-lns-mid-grey rounded-full" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-lns-mid-grey group-hover:text-lns-red transition-all">
                       <ArrowUpRight size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
