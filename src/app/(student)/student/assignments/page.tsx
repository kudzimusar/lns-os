"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

const assignments = [
  { id: 1, title: "Modernist Poetry Analysis", subject: "Math", dueDate: "Today, 4 PM", status: "In Progress", urgency: "critical" },
  { id: 2, title: "WWII Essay: Causes", subject: "History", dueDate: "Tomorrow", status: "Not Started", urgency: "medium" },
  { id: 3, title: "Algebra Quiz 3", subject: "Math", dueDate: "Completed", status: "Marked", urgency: "low" },
  { id: 4, title: "Global Water Crisis", subject: "Science", dueDate: "15 Apr", status: "Not Started", urgency: "medium" },
];

export default function StudentAssignmentsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Active Assignments</h1>
          <p className="text-lns-mid-grey font-medium">Your current workload and submission history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {assignments.map((item) => (
          <Card key={item.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <CardContent className="p-0">
               <div className="flex flex-col md:flex-row md:items-center">
                  <div className={cn(
                    "w-full md:w-2 h-2 md:h-auto shrink-0",
                    item.urgency === "critical" ? "bg-lns-red" : 
                    item.status === "Marked" ? "bg-green-500" : "bg-lns-navy/30"
                  )} />
                  
                  <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-lns-light-grey flex items-center justify-center text-lns-navy">
                         <FileText size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-lns-navy group-hover:text-lns-red transition-colors">{item.title}</h3>
                        <div className="flex items-center space-x-3 text-xs font-bold text-lns-mid-grey uppercase tracking-tighter">
                          <span>{item.subject}</span>
                          <span className="w-1 h-1 bg-lns-border rounded-full" />
                          <span className={cn(item.urgency === "critical" ? "text-lns-red" : "")}>
                            Due {item.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                       <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Status</p>
                          <p className={cn(
                            "text-sm font-black",
                            item.status === "Marked" ? "text-green-600" : "text-lns-navy"
                          )}>{item.status}</p>
                       </div>
                       <Button size="sm" className="bg-lns-navy hover:bg-lns-red group/btn">
                          {item.status === "Marked" ? "View Feedback" : "Open Workspace"}
                          <ChevronRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                       </Button>
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
