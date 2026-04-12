"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Zap, 
  Calendar,
  Clock,
  ArrowLeft,
  FileText,
  TrendingUp,
  AlertCircle,
  PlusCircle
} from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const performanceData = [
  { month: "Jan", score: 82 },
  { month: "Feb", score: 85 },
  { month: "Mar", score: 88 },
  { month: "Apr", score: 84 },
];

export default function StudentProfileView({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch student data by ID. 
  // For the shell, we'll use mocked data for Abraham Lincoln.
  const student = {
    id: params.id || "1024",
    name: "Abraham Lincoln",
    grade: "10-A",
    age: 16,
    email: "a.lincoln@student.lns.edu",
    phone: "+27 82 123 4567",
    address: "No. 12 Gettysburg Road, Pretoria",
    parent: "Thomas Lincoln",
    powerScore: 88,
    attendance: "95%",
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/teacher/students">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Student Profile</h1>
          <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Academic Record: #LNS-{student.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Bio & Info */}
        <div className="space-y-6">
          <Card className="border-none shadow-xl overflow-hidden bg-white">
            <div className="h-32 bg-lns-navy relative">
              <div className="absolute -bottom-12 left-8 w-24 h-24 rounded-3xl bg-white p-1 shadow-lg">
                <div className="w-full h-full rounded-2xl bg-lns-light-grey flex items-center justify-center text-lns-navy text-2xl font-black">
                  AL
                </div>
              </div>
            </div>
            <CardContent className="pt-16 pb-8 px-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-[800] text-lns-navy">{student.name}</h2>
                  <p className="text-sm font-bold text-lns-mid-grey">Grade {student.grade} • {student.age} Years Old</p>
                </div>
                <div className="p-2 bg-amber-50 rounded-xl">
                   <Award className="text-amber-500" size={20} />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                 <div className="flex items-center space-x-3 text-sm font-medium text-lns-navy">
                    <Mail size={16} className="text-lns-mid-grey" />
                    <span>{student.email}</span>
                 </div>
                 <div className="flex items-center space-x-3 text-sm font-medium text-lns-navy">
                    <Phone size={16} className="text-lns-mid-grey" />
                    <span>{student.phone}</span>
                 </div>
                 <div className="flex items-center space-x-3 text-sm font-medium text-lns-navy">
                    <MapPin size={16} className="text-lns-mid-grey" />
                    <span>{student.address}</span>
                 </div>
              </div>

              <div className="mt-8 pt-8 border-t border-lns-border space-y-2">
                 <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Parent / Guardian</p>
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-lns-navy">{student.parent}</span>
                    <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-lns-border">
                      <Mail size={14} />
                    </Button>
                 </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
             <Card className="flex-1 border-none shadow-sm bg-lns-navy text-white p-6">
                <Zap className="text-lns-red mb-2" size={20} />
                <p className="text-2xl font-[900]">{student.powerScore}</p>
                <p className="text-[10px] uppercase font-bold text-lns-mid-grey">Power Score</p>
             </Card>
             <Card className="flex-1 border-none shadow-sm bg-white p-6">
                <Calendar className="text-blue-600 mb-2" size={20} />
                <p className="text-2xl font-[900] text-lns-navy">{student.attendance}</p>
                <p className="text-[10px] uppercase font-bold text-lns-mid-grey">Attendance</p>
             </Card>
          </div>
        </div>

        {/* Right Column: Analytics & Records */}
        <div className="lg:col-span-2 space-y-6">
           <Card className="border-none shadow-sm bg-white">
             <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Academic Progress Trend</CardTitle>
                <TrendingUp size={18} className="text-lns-mid-grey" />
             </CardHeader>
             <CardContent className="h-[250px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#8C92A0', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tick={{fill: '#8C92A0', fontSize: 12}} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#0A1F44" strokeWidth={4} dot={{fill: '#0A1F44', strokeWidth: 2, r: 4, stroke: '#fff'}} />
                   </LineChart>
                </ResponsiveContainer>
             </CardContent>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm bg-white">
                 <CardHeader>
                    <CardTitle className="text-sm">Latest Merits</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-100">
                       <div className="flex items-center space-x-3">
                          <PlusCircle className="text-green-600" size={18} />
                          <div>
                             <p className="text-xs font-bold text-lns-navy">Global Citizenship</p>
                             <p className="text-[9px] text-green-700 font-bold uppercase tracking-tighter">Verified on Chain</p>
                          </div>
                       </div>
                       <span className="text-sm font-black text-green-600">+5</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-100">
                       <div className="flex items-center space-x-3">
                          <PlusCircle className="text-green-600" size={18} />
                          <div>
                             <p className="text-xs font-bold text-lns-navy">Math Olympiad</p>
                             <p className="text-[9px] text-green-700 font-bold uppercase tracking-tighter">External Award</p>
                          </div>
                       </div>
                       <span className="text-sm font-black text-green-600">+10</span>
                    </div>
                 </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white">
                 <CardHeader>
                    <CardTitle className="text-sm">Health & Wellbeing</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                       <AlertCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                       <div>
                          <p className="text-xs font-bold text-lns-navy">Asthma Management Plan</p>
                          <p className="text-[10px] text-lns-mid-grey">Inhaler kept in Front Office #FO2</p>
                       </div>
                    </div>
                    <Button variant="outline" className="w-full h-10 text-[10px] font-black uppercase tracking-[0.2em] border-lns-border">
                       Add Log Entry
                    </Button>
                 </CardContent>
              </Card>
           </div>
           
           <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="bg-lns-light-grey/30 border-b border-lns-border">
                 <CardTitle className="text-sm">Recent File Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 <table className="w-full text-left">
                    <tbody className="divide-y divide-lns-border">
                       {["Term_1_Report.pdf", "Math_Project_Final.docx", "Absence_Note_Mar12.jpg"].map((file, i) => (
                          <tr key={i} className="hover:bg-lns-light-grey/20 transition-colors cursor-pointer">
                             <td className="px-6 py-4 flex items-center space-x-3">
                                <FileText size={16} className="text-lns-mid-grey" />
                                <span className="text-xs font-bold text-lns-navy">{file}</span>
                             </td>
                             <td className="px-6 py-4 text-[10px] font-bold text-lns-mid-grey uppercase">Hashed 12/04/2026</td>
                             <td className="px-6 py-4 text-right">
                                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                                   <Clock size={14} className="text-lns-mid-grey" />
                                </Button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
