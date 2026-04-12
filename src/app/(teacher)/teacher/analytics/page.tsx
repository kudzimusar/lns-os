"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  Target,
  ArrowUpRight,
  ChevronDown,
  Download
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

const classData = [
  { week: "W1", performance: 65, attendance: 98 },
  { week: "W2", performance: 72, attendance: 95 },
  { week: "W3", performance: 68, attendance: 97 },
  { week: "W4", performance: 80, attendance: 99 },
];

const subjectBreakdown = [
  { subject: "Algebra", score: 85 },
  { subject: "Geometry", score: 62 },
  { subject: "Trig", score: 78 },
  { subject: "Calculus", score: 45 },
];

export default function TeacherAnalytics() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Class Intelligence</h1>
          <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Mathematics 10A • Cohort Performance Node</p>
        </div>
        <div className="flex items-center space-x-3">
           <Button variant="outline" className="bg-white">
              <Download size={18} className="mr-2" />
              Detailed Export
           </Button>
           <Button className="bg-lns-navy text-white">
              <BarChart3 size={18} className="mr-2" />
              Subject Reports
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: "Class Power Score", val: "74.2", trend: "+4%", icon: Zap, color: "text-lns-navy" },
           { label: "Avg Attendance", val: "97.5%", trend: "0%", icon: Users, color: "text-blue-600" },
           { label: "Engagement Hub", val: "Gold", trend: "+12%", icon: Target, color: "text-green-600" },
           { label: "At Risk Nodes", val: "3", trend: "-1", icon: BarChart3, color: "text-lns-red" },
         ].map((stat) => (
           <Card key={stat.label} className="border-none shadow-sm bg-white p-6">
              <div className="flex justify-between items-start mb-4">
                 <div className={cn("p-2 rounded-xl bg-lns-light-grey", stat.color)}>
                    <stat.icon size={20} />
                 </div>
                 <div className={cn("flex items-center text-[10px] font-black", stat.trend.startsWith('+') ? "text-green-600" : stat.trend === "0%" ? "text-slate-400" : "text-lns-red")}>
                    {stat.trend} <ArrowUpRight size={10} className="ml-1" />
                 </div>
              </div>
              <p className="text-2xl font-[900] text-lns-navy">{stat.val}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey mt-1">{stat.label}</p>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
               <CardTitle className="text-sm">4-Week Performance Arc</CardTitle>
               <Button variant="ghost" size="sm" className="text-xs font-bold">Month <ChevronDown size={14} className="ml-1" /></Button>
            </CardHeader>
            <CardContent className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={classData}>
                     <defs>
                        <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#0A1F44" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#0A1F44" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F5F7" />
                     <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#8C92A0', fontSize: 10}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#8C92A0', fontSize: 10}} />
                     <Tooltip />
                     <Area type="monotone" dataKey="performance" stroke="#0A1F44" strokeWidth={3} fillOpacity={1} fill="url(#colorPerf)" />
                  </AreaChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>

         <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
               <CardTitle className="text-sm">Unit Mastery Breakdown</CardTitle>
               <Button variant="ghost" size="sm" className="text-xs font-bold">Filter <ChevronDown size={14} className="ml-1" /></Button>
            </CardHeader>
            <CardContent className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectBreakdown}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F5F7" />
                     <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#8C92A0', fontSize: 10}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#8C92A0', fontSize: 10}} />
                     <Tooltip />
                     <Bar dataKey="score" fill="#D62B2B" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>
      </div>

      <Card className="border-none shadow-2xl bg-lns-navy text-white p-10 overflow-hidden relative">
         <div className="relative z-10 space-y-4">
            <h3 className="text-2xl font-black uppercase tracking-tight">AI Optimisation Path</h3>
            <p className="max-w-xl text-slate-400 text-sm leading-relaxed">
               Based on unit mastery, Geometry scores for 35% of the class are below baseline. The AI recommendation engine suggests a **3-hour Geometry Sprint** in Week 5 to prevent aggregate cohort decline.
            </p>
            <Button className="bg-lns-red hover:bg-red-700 text-white border-none rounded-xl h-12 px-8 font-black uppercase tracking-widest text-[10px]">
               Generate Lesson Plan for Geometry
            </Button>
         </div>
         <TrendingUp className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64" />
      </Card>
    </div>
  );
}
