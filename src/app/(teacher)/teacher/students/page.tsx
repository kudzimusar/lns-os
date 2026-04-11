"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Mail, 
  Phone,
  FileText,
  ChevronRight,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const students = [
  { id: "001", name: "Abraham Lincoln", class: "10A", score: 88, status: "Active", attendance: "98%", avatar: "AL" },
  { id: "002", name: "Benjamin Franklin", class: "10A", score: 64, status: "At Risk", attendance: "85%", avatar: "BF" },
  { id: "003", name: "Catherine Great", class: "10B", score: 92, status: "Active", attendance: "99%", avatar: "CG" },
  { id: "004", name: "David Copperfield", class: "10A", score: 72, status: "Critical", attendance: "62%", avatar: "DC" },
  { id: "005", name: "Eleanor Roosevelt", class: "10C", score: 81, status: "Active", attendance: "94%", avatar: "ER" },
  { id: "006", name: "Florence Nightingale", class: "10B", score: 95, status: "Active", attendance: "100%", avatar: "FN" },
];

export default function StudentDirectory() {
  const router = useRouter();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Student Directory</h1>
          <p className="text-lns-mid-grey font-medium">Manage bios, contact info and performance history.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="bg-white">
            Export Data
          </Button>
          <Button size="sm">
            <UserPlus size={18} className="mr-2" />
            Enroll Student
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <div className="p-4 border-b border-lns-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center bg-lns-light-grey rounded-xl px-3 w-full max-w-sm">
            <Search className="text-lns-mid-grey" size={16} />
            <input type="text" placeholder="Search students..." className="bg-transparent border-none focus:ring-0 text-sm px-3 py-2 w-full" />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Filter size={14} className="mr-2" />
              Class: All
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Sort: Name
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead className="bg-lns-light-grey/50 border-b border-lns-border">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Student</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Class</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Power Score</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Attendance</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lns-border">
              {students.map((student) => (
                <tr 
                  key={student.id} 
                  className="hover:bg-lns-light-grey/30 transition-colors group cursor-pointer"
                  onClick={() => router.push(`/teacher/students/${student.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-lns-navy/5 flex items-center justify-center text-lns-navy font-black text-xs uppercase group-hover:bg-lns-red group-hover:text-white transition-colors">
                        {student.avatar}
                      </div>
                      <div>
                         <p className="text-sm font-bold text-lns-navy group-hover:text-lns-red transition-all">{student.name}</p>
                         <p className="text-[10px] text-lns-mid-grey font-bold uppercase tracking-tight">ID: #LNS-{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-lns-navy bg-lns-light-grey px-2 py-0.5 rounded uppercase">
                      Class {student.class}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                       <span className={cn(
                         "text-sm font-black",
                         student.score >= 80 ? "text-green-600" : student.score >= 70 ? "text-lns-navy" : "text-lns-red"
                       )}>{student.score}</span>
                       <Zap size={10} className={student.score >= 80 ? "text-green-500" : "text-lns-mid-grey"} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-xs font-bold text-lns-navy">
                    {student.attendance}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                        student.status === "Active" ? "bg-green-100 text-green-700" : 
                        student.status === "At Risk" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-lns-red"
                      )}>
                        {student.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-all" onClick={(e) => e.stopPropagation()}>
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-lns-mid-grey hover:text-lns-navy">
                         <Mail size={16} />
                       </Button>
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-lns-mid-grey hover:text-lns-navy">
                         <FileText size={16} />
                       </Button>
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-lns-mid-grey">
                         <MoreVertical size={16} />
                       </Button>
                    </div>
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
