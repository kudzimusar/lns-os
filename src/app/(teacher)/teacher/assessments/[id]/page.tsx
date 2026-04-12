"use client";

export function generateStaticParams() {
  return [{ id: '1' }];
}

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowLeft, GraduationCap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const criteria = [
  { id: "A", name: "Knowing and Understanding", currentBand: 6, descriptor: "The student provides substantial explanations of the uses of modernist techniques." },
  { id: "B", name: "Investigating Patterns", currentBand: 5, descriptor: "The student generally identifies and analyzes patterns in secondary sources." },
  { id: "C", name: "Communicating", currentBand: 7, descriptor: "The student communicates terminology and concepts clearly and effectively." },
  { id: "D", name: "Applying Real-world Context", currentBand: 5, descriptor: "The student applies concepts to new context with some success." },
];

export default function AssessmentDetailPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/teacher/assessments">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-[800] text-lns-navy tracking-tight">
            MYP Criterion Assessment: Unit 4
          </h1>
          <p className="text-lns-mid-grey font-medium text-sm">
            Assessment ID: {id} • IB MYP Communications • Rubric Grading
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-lns-navy mb-4">Student Selection</h4>
          {["Alice Thompson", "Benjamin Wright", "Chloe O'Brian", "Daniel Kim"].map((name, i) => (
            <div key={name} className={cn(
              "p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
              i === 0 ? "bg-lns-navy border-lns-navy text-white shadow-lg" : "bg-white border-lns-border text-lns-navy hover:border-lns-red"
            )}>
              <span className="text-xs font-bold">{name}</span>
              {i === 0 ? <CheckCircle2 size={14} /> : null}
            </div>
          ))}
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="bg-lns-light-grey p-4 border-b border-lns-border flex justify-between items-center">
              <h3 className="text-sm font-[800] text-lns-navy uppercase tracking-widest">Rubric: Alice Thompson</h3>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Final MYP Grade:</span>
                <span className="text-lg font-black text-lns-red">6</span>
              </div>
            </div>
            <CardContent className="p-0">
              {criteria.map((criterion) => (
                <div key={criterion.id} className="p-6 border-b border-lns-border last:border-0 hover:bg-lns-light-grey/20 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-lns-navy">Criterion {criterion.id}: {criterion.name}</h4>
                      <p className="text-xs text-lns-mid-grey leading-relaxed max-w-xl">{criterion.descriptor}</p>
                    </div>
                    <div className="flex items-center space-x-1 shrink-0">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((band) => (
                        <button
                          key={band}
                          className={cn(
                            "w-8 h-10 rounded-lg text-xs font-black transition-all",
                            criterion.currentBand === band 
                              ? "bg-lns-red text-white shadow-md scale-110" 
                              : "bg-lns-light-grey text-lns-mid-grey hover:bg-lns-navy hover:text-white"
                          )}
                        >
                          {band}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Save Draft</Button>
            <Button>Lock & Sync to Blockchain</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
