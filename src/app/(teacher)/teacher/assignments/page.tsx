"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Calendar,
  Layers,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

const assignments = [
  { id: 1, title: "Modernist Poetry Analysis", category: "Communications", dueDate: "Tomorrow, 4 PM", submissions: "24/32", marked: "12", status: "Active" },
  { id: 2, title: "Creative Writing: Flash Fiction", category: "Writing", dueDate: "14 Apr", submissions: "32/32", marked: "32", status: "Closed" },
  { id: 3, title: "Grammar & Syntax Quiz", category: "Logic", dueDate: "In 3 days", submissions: "0/32", marked: "0", status: "Draft" },
  { id: 4, title: "IB MYP: Criterion A Project", category: "IB Core", dueDate: "20 Apr", submissions: "5/32", marked: "0", status: "Active" },
];

export default function AssignmentsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">
            Assignments
          </h1>
          <p className="text-lns-mid-grey font-medium">
            Manage coursework, quizzes, and MYP assessments.
          </p>
        </div>
        <Button size="sm">
          <Plus size={18} className="mr-2" />
          Create New
        </Button>
      </div>

      <div className="flex items-center space-x-6 border-b border-lns-border pb-px">
        {["Active", "Draft", "Closed"].map((tab) => (
          <button
            key={tab}
            className={cn(
              "pb-4 text-xs font-[800] uppercase tracking-widest transition-all relative",
              tab === "Active" ? "text-lns-navy" : "text-lns-mid-grey hover:text-lns-navy"
            )}
          >
            {tab} Assignments
            {tab === "Active" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-lns-red rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className={cn(
                  "w-full md:w-2 h-2 md:h-auto shrink-0",
                  assignment.status === "Active" ? "bg-lns-navy" : 
                  assignment.status === "Draft" ? "bg-lns-mid-grey/30" : "bg-green-600"
                )} />
                
                <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-lns-light-grey flex items-center justify-center text-lns-navy shrink-0">
                      <FileText size={24} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Link href={`/teacher/assignments/${assignment.id}`}>
                          <h3 className="text-lg font-bold text-lns-navy group-hover:text-lns-red transition-colors cursor-pointer">{assignment.title}</h3>
                        </Link>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-[800] uppercase tracking-tighter",
                          assignment.status === "Active" ? "bg-blue-100 text-blue-700" : 
                          assignment.status === "Draft" ? "bg-lns-light-grey text-lns-mid-grey" : "bg-green-100 text-green-700"
                        )}>
                          {assignment.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs font-semibold text-lns-mid-grey">
                        <span className="flex items-center">
                          <Layers size={14} className="mr-1.5" />
                          {assignment.category}
                        </span>
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1.5" />
                          Due {assignment.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-lns-mid-grey">Submissions</p>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-lg font-[800] text-lns-navy">{assignment.submissions.split('/')[0]}</span>
                        <span className="text-xs text-lns-mid-grey">/ {assignment.submissions.split('/')[1]}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-lns-mid-grey">Marked</p>
                      <span className="text-lg font-[800] text-lns-navy">{assignment.marked}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/teacher/assignments/${assignment.id}`}>
                        <Button variant="outline" size="sm" className="hidden sm:flex text-[10px] font-black uppercase">
                          View & Mark
                        </Button>
                      </Link>
                      <Button size="icon" variant="ghost" className="text-lns-mid-grey">
                        <MoreVertical size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
