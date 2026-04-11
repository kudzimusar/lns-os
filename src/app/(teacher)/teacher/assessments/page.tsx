"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, GraduationCap, ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const assessments = [
  { id: "A-101", title: "Unit 4: Modernist Analysis", subject: "Communications", criteria: "A, B, C", status: "Active" },
  { id: "A-102", title: "Global Context Project", subject: "Humanities", criteria: "C, D", status: "Draft" },
  { id: "A-103", title: "Mid-Term Rubric", subject: "Maths", criteria: "A, C", status: "Locked" },
];

export default function AssessmentsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">MYP Rubrics</h1>
          <p className="text-lns-mid-grey font-medium">Manage criteria-based grading and IB boundaries.</p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          New Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((item) => (
          <Card key={item.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-lns-light-grey flex items-center justify-center text-lns-navy">
                    <GraduationCap size={24} />
                  </div>
                  <span className={cn(
                    "px-2 py-1 rounded text-[9px] font-[800] uppercase tracking-tighter",
                    item.status === "Active" ? "bg-blue-100 text-blue-700" :
                    item.status === "Draft" ? "bg-amber-100 text-amber-700" :
                    "bg-green-100 text-green-700"
                  )}>
                    {item.status}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-lns-navy group-hover:text-lns-red transition-colors">{item.title}</h3>
                  <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest">{item.subject}</p>
                </div>

                <div className="pt-4 border-t border-lns-border flex items-center justify-between">
                  <div className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">
                    Criteria: {item.criteria}
                  </div>
                  <Link href={`/teacher/assessments/${item.id}`}>
                    <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase text-lns-navy group-hover:text-lns-red p-0">
                      Open Rubric
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
