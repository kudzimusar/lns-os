"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  UserPlus,
  Mail,
  Zap,
  GraduationCap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const students = [
  { id: "1024", name: "Abraham Lincoln", grade: "10-A", score: 88, status: "Active", attendance: "95%" },
  { id: "1025", name: "Eleanor Roosevelt", grade: "10-B", score: 92, status: "Active", attendance: "98%" },
  { id: "1026", name: "Winston Churchill", grade: "10-A", score: 75, status: "At Risk", attendance: "82%" },
  { id: "1027", name: "Rosa Parks", grade: "10-C", score: 85, status: "Active", attendance: "94%" },
  { id: "1028", name: "Nelson Mandela", grade: "10-B", score: 90, status: "Active", attendance: "96%" },
];

export default function StudentDirectory() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Student Directory</h1>
          <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Academic Year 2026 • Term 1</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="bg-white">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <UserPlus size={16} className="mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search Bar */}
        <div className="lg:col-span-4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-lns-mid-grey" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, ID, or grade..." 
            className="w-full h-14 bg-white rounded-2xl pl-12 pr-4 shadow-sm border-none focus:ring-2 focus:ring-lns-navy transition-all"
          />
        </div>

        {/* Stats */}
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="pt-6">
            <Users size={20} className="text-lns-navy mb-2" />
            <p className="text-2xl font-[900] text-lns-navy">1,240</p>
            <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">Total Students</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="pt-6">
            <Zap size={20} className="text-lns-red mb-2" />
            <p className="text-2xl font-[900] text-lns-navy">42</p>
            <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">At Risk Cohort</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="pt-6">
            <GraduationCap size={20} className="text-blue-600 mb-2" />
            <p className="text-2xl font-[900] text-lns-navy">94.5%</p>
            <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">Avg Grade</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="pt-6">
            <Mail size={20} className="text-amber-500 mb-2" />
            <p className="text-2xl font-[900] text-lns-navy">12</p>
            <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">Pending Reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Student Table */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-lns-light-grey/30 border-b border-lns-border">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Student Name</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Grade</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Power Score</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Attendance</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lns-border">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-lns-light-grey/20 transition-colors group">
                    <td className="px-6 py-4">
                      <Link href={`/teacher/students/${student.id}`} className="flex items-center space-x-3 cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-lns-navy text-white flex items-center justify-center text-[10px] font-bold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-lns-navy group-hover:text-lns-red transition-colors">{student.name}</p>
                          <p className="text-[10px] text-lns-mid-grey font-medium">ID: #LNS-{student.id}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-lns-navy">{student.grade}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-1.5 w-16 bg-lns-light-grey rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              student.score > 90 ? "bg-green-500" : student.score > 80 ? "bg-lns-navy" : "bg-lns-red"
                            )} 
                            style={{ width: `${student.score}%` }} 
                          />
                        </div>
                        <span className="text-xs font-black text-lns-navy">{student.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-lns-navy">{student.attendance}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        student.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-lns-red"
                      )}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-lns-mid-grey hover:text-lns-navy">
                        <MoreVertical size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
