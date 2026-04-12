"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Filter, 
  Calendar,
  Users,
  Award,
  BookOpen,
  PieChart as PieIcon,
  BarChart as BarIcon,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie
} from "recharts";

const performanceHistory = [
  { month: "Jan", score: 78, attendance: 92 },
  { month: "Feb", score: 82, attendance: 94 },
  { month: "Mar", score: 80, attendance: 91 },
  { month: "Apr", score: 85, attendance: 95 },
  { month: "May", score: 87, attendance: 96 },
  { month: "Jun", score: 84, attendance: 93 },
];

const gradeDistribution = [
  { grade: "Grade 8", students: 120, avg: 75 },
  { grade: "Grade 9", students: 115, avg: 78 },
  { grade: "Grade 10", students: 110, avg: 82 },
  { grade: "Grade 11", students: 105, avg: 88 },
  { grade: "Grade 12", students: 100, avg: 85 },
];

const subjectPerformance = [
  { name: "Mathematics", value: 72 },
  { name: "English", value: 85 },
  { name: "Science", value: 78 },
  { name: "History", value: 82 },
  { name: "Arts", value: 90 },
];

const COLORS = ["#0A1F44", "#D62B2B", "#8C92A0", "#2E3A4E", "#F4F5F7"];

export default function AdminAnalytics() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Data Intelligence</h1>
          <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Real-time School KPI Insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="bg-white">
            <Filter size={16} className="mr-2" />
            Segment
          </Button>
          <Button size="sm">
            <Download size={16} className="mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <Card className="border-none shadow-sm bg-white">
            <CardContent className="pt-6">
               <div className="flex justify-between items-start mb-2">
                  <Users size={20} className="text-lns-navy" />
                  <span className="flex items-center text-[10px] font-black text-green-600">
                    <ArrowUpRight size={12} className="mr-0.5" /> +2.4%
                  </span>
               </div>
               <p className="text-2xl font-[900] text-lns-navy">1,240</p>
               <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">Student Retention</p>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm bg-white">
            <CardContent className="pt-6">
               <div className="flex justify-between items-start mb-2">
                  <Award size={20} className="text-lns-red" />
                  <span className="flex items-center text-[10px] font-black text-green-600">
                    <ArrowUpRight size={12} className="mr-0.5" /> +5.1%
                  </span>
               </div>
               <p className="text-2xl font-[900] text-lns-navy">85.4</p>
               <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">Avg Power Score</p>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm bg-white">
            <CardContent className="pt-6">
               <div className="flex justify-between items-start mb-2">
                  <Calendar size={20} className="text-blue-600" />
                  <span className="flex items-center text-[10px] font-black text-red-600">
                    <ArrowDownRight size={12} className="mr-0.5" /> -0.8%
                  </span>
               </div>
               <p className="text-2xl font-[900] text-lns-navy">94.2%</p>
               <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">Avg Attendance</p>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm bg-lns-navy text-white">
            <CardContent className="pt-6">
               <div className="flex justify-between items-start mb-2">
                  <BookOpen size={20} className="text-lns-red" />
               </div>
               <p className="text-2xl font-[900]">Term 1</p>
               <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">Current Cycle</p>
            </CardContent>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Performance Chart */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>School-Wide Performance Trend</CardTitle>
            <div className="flex items-center space-x-2">
               <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-lns-navy" />
                  <span className="text-[10px] font-bold text-lns-mid-grey uppercase">Grades</span>
               </div>
               <div className="flex items-center space-x-1 pl-2">
                  <div className="w-2 h-2 rounded-full bg-lns-red" />
                  <span className="text-[10px] font-bold text-lns-mid-grey uppercase">Attendance</span>
               </div>
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={performanceHistory}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A1F44" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0A1F44" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D62B2B" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#D62B2B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F5F7" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#8C92A0', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#8C92A0', fontSize: 12}} domain={[0, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#0A1F44" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                <Area type="monotone" dataKey="attendance" stroke="#D62B2B" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorAttendance)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className="border-none shadow-sm bg-white">
           <CardHeader>
              <CardTitle>Cohort Performance Distribution</CardTitle>
           </CardHeader>
           <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={gradeDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F4F5F7" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="grade" type="category" axisLine={false} tickLine={false} tick={{fill: '#0A1F44', fontWeight: 'bold', fontSize: 12}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="avg" radius={[0, 10, 10, 0]} barSize={20}>
                       {gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.avg > 80 ? "#0A1F44" : "#D62B2B"} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Subject Area Analytics */}
         <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
               <CardTitle>Subject Performance (Heatmap)</CardTitle>
               <PieIcon size={18} className="text-lns-mid-grey" />
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={subjectPerformance}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {subjectPerformance.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
               <div className="space-y-2 pr-8">
                  {subjectPerformance.map((entry, index) => (
                     <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}} />
                        <span className="text-[10px] font-bold text-lns-navy uppercase tracking-tighter">{entry.name}</span>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Intervention Required */}
         <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-lns-red/5 border-b border-lns-red/10">
               <div className="flex items-center justify-between">
                  <CardTitle className="text-lns-red">Priority Interventions</CardTitle>
                  <TrendingDown size={18} className="text-lns-red" />
               </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-lns-border">
                  {[
                     { name: "Grade 10-A Math", issue: "15% Drop in Term 1 Finals", priority: "High" },
                     { name: "Grade 8 English", issue: "At-Risk Cohort Increase (+5)", priority: "Medium" },
                     { name: "Grade 12 Physics", issue: "Attendance Below Threshold", priority: "High" },
                  ].map((item, i) => (
                     <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-lns-light-grey/20 transition-colors cursor-pointer group">
                        <div>
                           <p className="text-sm font-bold text-lns-navy">{item.name}</p>
                           <p className="text-[10px] text-lns-mid-grey font-bold uppercase">{item.issue}</p>
                        </div>
                        <span className={cn(
                           "text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full",
                           item.priority === "High" ? "bg-red-100 text-lns-red" : "bg-blue-100 text-blue-700"
                        )}>
                           {item.priority}
                        </span>
                     </div>
                  ))}
               </div>
               <div className="p-4 bg-lns-light-grey/30">
                  <Button variant="outline" className="w-full text-[10px] font-black uppercase tracking-widest border-lns-border h-10">
                     Generate Full Audit Report
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
