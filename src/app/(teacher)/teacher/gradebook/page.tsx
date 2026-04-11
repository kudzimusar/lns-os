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
import { cn } from "@/lib/utils";

const students = [
  { name: "Abraham Lincoln", scores: [85, 76, 92, 88], final: "A", citizenship: "Gold" },
  { name: "Benjamin Franklin", scores: [62, 70, 58, 65], final: "C", citizenship: "Silver" },
  { name: "Catherine Great", scores: [45, 52, 48, 50], final: "D", citizenship: "Bronze" },
  { name: "David Copperfield", scores: [95, 98, 92, 94], final: "A+", citizenship: "Platinum" },
  { name: "Eleanor Roosevelt", scores: [78, 82, 75, 80], final: "B", citizenship: "Gold" },
];

const assessments = [
  { name: "HW 1", category: "Comm", weight: "20%" },
  { name: "Quiz A", category: "Logic", weight: "25%" },
  { name: "Midterm", category: "Theor", weight: "30%" },
  { name: "Final", category: "App", weight: "25%" },
];

export default function GradebookPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">
            Gradebook
          </h1>
          <p className="text-lns-mid-grey font-medium">
            English 10A • <span className="text-lns-navy font-bold">Term 2 Summary</span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download size={18} className="mr-2" />
            Export CSV
          </Button>
          <Button size="sm">
            Release Grades
          </Button>
        </div>
      </div>

      {/* Weights Indicator */}
      <div className="flex flex-wrap gap-3 p-4 bg-white border border-lns-border rounded-2xl shadow-sm">
        <div className="flex items-center space-x-2 mr-4">
          <Info size={16} className="text-lns-navy" />
          <span className="text-xs font-bold text-lns-navy uppercase tracking-wider">Weight Distribution:</span>
        </div>
        {assessments.map((a) => (
          <div key={a.name} className="flex items-center space-x-2 px-3 py-1 bg-lns-light-grey rounded-lg text-[10px] font-bold">
            <span className="text-lns-mid-grey uppercase">{a.category}</span>
            <span className="text-lns-navy">{a.weight}</span>
          </div>
        ))}
        <div className="ml-auto text-xs font-bold text-green-600 flex items-center">
          <ShieldCheck size={14} className="mr-1" />
          Validated (100%)
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-lns-border bg-lns-light-grey/30">
                <th className="sticky left-0 bg-lns-light-grey/30 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-lns-mid-grey border-r border-lns-border/50">Student Name</th>
                {assessments.map((a) => (
                  <th key={a.name} className="px-6 py-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-lns-navy">{a.name}</p>
                    <p className="text-[9px] font-medium text-lns-mid-grey uppercase tracking-tighter">{a.category}</p>
                  </th>
                ))}
                <th className="px-6 py-4 text-center border-l border-lns-border/50">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-lns-red">Final Grade</span>
                </th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-lns-mid-grey text-center">Citizenship</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lns-border">
              {students.map((student, idx) => (
                <tr key={idx} className="hover:bg-lns-light-grey/20 transition-colors">
                  <td className="sticky left-0 bg-white group-hover:bg-lns-light-grey/10 px-6 py-4 border-r border-lns-border/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-lns-navy/5 text-lns-navy text-[10px] font-bold flex items-center justify-center">
                        {student.name[0]}
                      </div>
                      <span className="text-sm font-bold text-lns-navy whitespace-nowrap">{student.name}</span>
                    </div>
                  </td>
                  {student.scores.map((score, sIdx) => {
                    const colorClass = score >= 75 ? "text-green-600 bg-green-50" : score >= 50 ? "text-amber-600 bg-amber-50" : "text-lns-red bg-red-50";
                    return (
                      <td key={sIdx} className="px-6 py-4 text-center">
                        <div className={cn("inline-block px-3 py-1 rounded-lg text-xs font-bold min-w-[50px] border border-transparent hover:border-lns-navy cursor-pointer transition-all", colorClass)}>
                          {score}%
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 text-center border-l border-lns-border/50">
                    <div className="inline-flex flex-col items-center">
                      <span className="text-lg font-[800] text-lns-navy">{student.final}</span>
                      <span className="text-[9px] font-bold text-lns-mid-grey uppercase">Term 2</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "text-[9px] font-[800] uppercase tracking-widest px-2 py-1 rounded-md",
                      student.citizenship === "Platinum" ? "bg-lns-navy text-white" : 
                      student.citizenship === "Gold" ? "bg-amber-100 text-amber-700" :
                      student.citizenship === "Silver" ? "bg-lns-light-grey text-lns-mid-grey" :
                      "bg-lns-red/10 text-lns-red"
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
