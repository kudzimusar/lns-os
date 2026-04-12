"use client";

export function generateStaticParams() {
  return [{ id: '1' }];
}

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { 
  ArrowLeft, 
  FileText, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Download,
  Share2,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const students = [
  { id: "S001", name: "Alice Thompson", submitted: true, date: "2 hours ago", score: "88", status: "Marked" },
  { id: "S002", name: "Benjamin Wright", submitted: true, date: "Yesterday", score: "-", status: "Pending" },
  { id: "S003", name: "Chloe O'Brian", submitted: false, date: "-", score: "-", status: "Missing" },
  { id: "S004", name: "Daniel Kim", submitted: true, date: "3 hours ago", score: "92", status: "Marked" },
  { id: "S005", name: "Elena Rodriguez", submitted: true, date: "Today, 10 AM", score: "-", status: "Pending" },
];

export default function AssignmentDetailPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/teacher/assignments">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-[800] text-lns-navy tracking-tight">
            Modernist Poetry Analysis
          </h1>
          <p className="text-lns-mid-grey font-medium text-sm">
            Assignment ID: {id} • Communications • Due Tomorrow, 4 PM
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-none shadow-sm bg-blue-50">
              <CardContent className="p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Submissions</p>
                <div className="flex items-end space-x-2">
                  <h3 className="text-2xl font-[900] text-lns-navy">24</h3>
                  <p className="text-xs font-bold text-lns-mid-grey mb-1">/ 32 Students</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-green-50">
              <CardContent className="p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-1">Marked</p>
                <div className="flex items-end space-x-2">
                  <h3 className="text-2xl font-[900] text-lns-navy">12</h3>
                  <p className="text-xs font-bold text-lns-mid-grey mb-1">/ 24 Received</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-red-50">
              <CardContent className="p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Avg Score</p>
                <div className="flex items-end space-x-2">
                  <h3 className="text-2xl font-[900] text-lns-navy">84%</h3>
                  <p className="text-xs font-bold text-lns-mid-grey mb-1">Class Avg</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-lns-border bg-lns-light-grey/50">
                      <th className="px-6 py-4 text-xs font-[800] uppercase tracking-widest text-lns-navy">Student</th>
                      <th className="px-6 py-4 text-xs font-[800] uppercase tracking-widest text-lns-navy">Submitted</th>
                      <th className="px-6 py-4 text-xs font-[800] uppercase tracking-widest text-lns-navy">Score</th>
                      <th className="px-6 py-4 text-xs font-[800] uppercase tracking-widest text-lns-navy">Status</th>
                      <th className="px-6 py-4 text-xs font-[800] uppercase tracking-widest text-lns-navy">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-lns-border hover:bg-lns-light-grey/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-lns-navy/10 flex items-center justify-center text-lns-navy font-bold text-[10px]">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-lns-navy">{student.name}</p>
                              <p className="text-[10px] text-lns-mid-grey font-medium">{student.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-lns-mid-grey">{student.date}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "text-sm font-black",
                            student.score !== "-" ? "text-lns-navy" : "text-lns-mid-grey"
                          )}>
                            {student.score}{student.score !== "-" ? "%" : ""}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-[9px] font-[800] uppercase tracking-tighter",
                            student.status === "Marked" ? "bg-green-100 text-green-700" :
                            student.status === "Pending" ? "bg-blue-100 text-blue-700" :
                            "bg-red-100 text-red-700"
                          )}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase">Mark</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h4 className="text-sm font-black uppercase tracking-widest text-lns-navy">Assignment Controls</h4>
              <div className="space-y-2">
                <Button className="w-full justify-start h-12 rounded-xl border-lns-border/10" variant="outline">
                  <Download size={18} className="mr-3" />
                  Download Submissions
                </Button>
                <Button className="w-full justify-start h-12 rounded-xl border-lns-border/10" variant="outline">
                  <Share2 size={18} className="mr-3" />
                  Release All Grades
                </Button>
                <Button className="w-full justify-start h-12 rounded-xl border-lns-border/10" variant="outline">
                  <Calendar size={18} className="mr-3" />
                  Extend Deadline
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm overflow-hidden">
            <div className="bg-lns-navy p-4 text-white">
              <h4 className="text-xs font-black uppercase tracking-widest">AI Audit Trail</h4>
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-lns-red flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle size={12} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-lns-navy">At-Risk Students Detected</p>
                  <p className="text-[10px] text-lns-mid-grey">3 students have not started yet.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-lns-navy">Draft Comment Ready</p>
                  <p className="text-[10px] text-lns-mid-grey">AI has drafted marks for Elena R.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
