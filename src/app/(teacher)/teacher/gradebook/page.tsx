"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  FileDown, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal,
  Info,
  ShieldCheck,
  TrendingUp,
  Download
} from "lucide-react";
import { AIFlag } from "@/components/ai/AIFlag";

const students = [
  { name: "Abraham Lincoln", scores: [85, 76, 92, 88], final: "A", citizenship: "Gold" },
  { name: "Benjamin Franklin", scores: [62, 70, 42, 65], final: "C", citizenship: "Silver", aiFlag: { type: 'grade-drop' as const, label: 'Dropped 28%' } },
  { name: "Catherine Great", scores: [45, 52, 48, 50], final: "D", citizenship: "Bronze", aiFlag: { type: 'at-risk' as const } },
  { name: "David Copperfield", scores: [95, 98, 92, 94], final: "A+", citizenship: "Platinum" },
  { name: "Eleanor Roosevelt", scores: [78, 82, 75, 80], final: "B", citizenship: "Gold" },
];

const assessments = [
  { name: "HW 1", category: "Comm", weight: "20%" },
  { name: "Quiz A", category: "Logic", weight: "25%" },
  { name: "Midterm", category: "Theor", weight: "30%", aiFlag: { type: 'insight' as const, label: 'Avg < 60%' } },
  { name: "Final", category: "App", weight: "25%" },
];

export default function GradebookPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">
            Gradebook
          </h1>
          <p className="text-xs md:text-sm text-lns-mid-grey font-medium leading-relaxed">
            English 10A • <span className="text-lns-navy font-bold">Term 2 Consensus</span>
          </p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none h-11 md:h-12 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button className="flex-1 md:flex-none h-11 md:h-12 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform">
            Release Grades
          </Button>
        </div>
      </div>

      {/* Weights Indicator */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-5 bg-white border border-lns-border/10 shadow-sm rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
           <ShieldCheck size={100} />
        </div>
        <div className="flex items-center space-x-2 mr-2">
          <Info size={16} className="text-lns-red shrink-0" />
          <span className="text-[10px] font-black text-lns-navy uppercase tracking-widest">Weights:</span>
        </div>
        <div className="flex flex-wrap gap-2 flex-1">
          {assessments.map((a) => (
            <div key={a.name} className="flex items-center space-x-2 px-3 py-1.5 bg-lns-light-grey/50 rounded-lg text-[9px] font-black border border-lns-border/5">
              <span className="text-lns-mid-grey uppercase">{a.category}</span>
              <span className="text-lns-navy">{a.weight}</span>
            </div>
          ))}
        </div>
        <div className="text-[9px] font-black text-green-600 flex items-center bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
          <ShieldCheck size={14} className="mr-1.5" />
          PROTOCOL VALIDATED
        </div>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden space-y-4">
        {students.map((student, idx) => (
          <Card key={idx} className="border-none shadow-sm bg-white p-4 space-y-4 rounded-2xl">
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-lns-navy/5 text-lns-navy flex items-center justify-center text-xs font-black border border-lns-border/10">
                     {student.name[0]}
                  </div>
                  <div>
                     <h4 className="text-sm font-black text-lns-navy">{student.name}</h4>
                     <span className={cn(
                        "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                        student.citizenship === "Platinum" ? "bg-lns-navy text-white shadow-sm" : 
                        student.citizenship === "Gold" ? "bg-amber-100 text-amber-700" :
                        "bg-lns-light-grey text-lns-mid-grey"
                     )}>
                        {student.citizenship}
                     </span>
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-[8px] font-black text-lns-mid-grey uppercase tracking-widest">Final</p>
                  <p className="text-2xl font-black text-lns-navy tracking-tighter leading-none">{student.final}</p>
               </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-lns-border/5">
               {student.scores.map((score, sIdx) => (
                  <div key={sIdx} className="text-center">
                     <p className="text-[8px] font-black text-lns-mid-grey uppercase tracking-tighter">{assessments[sIdx].name}</p>
                     <div className={cn(
                        "mt-1 py-1 rounded-md text-[10px] font-black transition-all border",
                        score >= 75 ? "bg-green-50 border-green-100 text-green-700" :
                        score >= 50 ? "bg-amber-50 border-amber-100 text-amber-700" :
                        "bg-red-50 border-red-100 text-lns-red"
                     )}>
                        {score}%
                     </div>
                  </div>
               ))}
            </div>
          </Card>
        ))}
        <Button variant="ghost" className="w-full h-12 text-[9px] font-black uppercase tracking-widest text-lns-mid-grey italic border border-dashed border-lns-border/20 rounded-xl">
           Load Archival Persistence Nodes
        </Button>
      </div>

      {/* Desktop Table View */}
      <Card className="hidden md:block border-none shadow-sm overflow-hidden bg-white rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-lns-border bg-lns-light-grey/30 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
                <th className="sticky left-0 bg-gray-50 px-6 py-5 border-r border-lns-border/10">Node Identity</th>
                {assessments.map((a) => (
                  <th key={a.name} className="px-6 py-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-lns-navy">{a.name}</p>
                      <p className="text-[8px] font-medium text-lns-mid-grey opacity-50 tracking-tighter">{a.category}</p>
                      {a.aiFlag && <AIFlag type={a.aiFlag.type} entityId={a.name} label={a.aiFlag.label} />}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-5 text-center border-l border-lns-border/10">
                  <span className="text-lns-red">Final Output</span>
                </th>
                <th className="px-6 py-5 text-center">Citizenship</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lns-border/10">
              {students.map((student, idx) => (
                <tr key={idx} className="hover:bg-lns-light-grey/20 transition-colors group">
                  <td className="sticky left-0 bg-white group-hover:bg-gray-50 px-6 py-4 border-r border-lns-border/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-lns-navy/5 text-lns-navy text-[10px] font-black flex items-center justify-center border border-lns-navy/10 shrink-0">
                        {student.name[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-lns-navy whitespace-nowrap">{student.name}</span>
                        {(student as any).aiFlag && <AIFlag type={(student as any).aiFlag.type} entityId={student.name} label={(student as any).aiFlag.label} className="mt-1" />}
                      </div>
                    </div>
                  </td>
                  {student.scores.map((score, sIdx) => (
                    <td key={sIdx} className="px-6 py-4 text-center">
                      <div className={cn(
                        "inline-block px-3 py-1.5 rounded-xl text-xs font-black min-w-[55px] border transition-all active:scale-95 cursor-pointer",
                        score >= 75 ? "text-green-700 bg-green-50 border-green-100 shadow-sm" : 
                        score >= 50 ? "text-amber-700 bg-amber-50 border-amber-100 shadow-sm" : 
                        "text-lns-red bg-red-50 border-red-100 shadow-sm"
                      )}>
                        {score}%
                      </div>
                    </td>
                  ))}
                  <td className="px-6 py-4 text-center border-l border-lns-border/10 bg-gray-50/30">
                    <div className="inline-flex flex-col items-center">
                      <span className="text-xl font-black text-lns-navy tracking-tighter">{student.final}</span>
                      <span className="text-[8px] font-black text-lns-mid-grey uppercase opacity-50">Term 2</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                      student.citizenship === "Platinum" ? "bg-lns-navy text-white border-lns-navy shadow-md" : 
                      student.citizenship === "Gold" ? "bg-amber-100 text-amber-700 border-amber-200 shadow-sm" :
                      student.citizenship === "Silver" ? "bg-lns-light-grey text-lns-mid-grey border-lns-border/20" :
                      "bg-lns-red/5 text-lns-red border-lns-red/10"
                    )}>
                      {student.citizenship}
                    </span>
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
