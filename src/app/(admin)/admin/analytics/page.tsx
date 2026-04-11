"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  Download,
  Filter,
  Brain
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from "recharts";

const scoreData = [
  { name: "Week 1", score: 72 },
  { name: "Week 2", score: 75 },
  { name: "Week 3", score: 82 },
  { name: "Week 4", score: 80 },
  { name: "Week 5", score: 88 },
];

const subjectData = [
  { subject: "Maths", avg: 74 },
  { subject: "English", avg: 82 },
  { subject: "Science", avg: 68 },
  { subject: "History", avg: 91 },
  { subject: "Art", avg: 88 },
];

const citizenshipData = [
  { name: "Outstanding", value: 25 },
  { name: "Good", value: 45 },
  { name: "Satisfactory", value: 20 },
  { name: "Concern", value: 10 },
];

const COLORS = ["#0A1F44", "#D62B2B", "#8C92A0", "#F4F5F7"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Data Insights</h1>
          <p className="text-lns-mid-grey font-medium">Lennon Nash global performance metrics and at-risk cohorts.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-white">
            <Filter size={18} className="mr-2" />
            Filter View
          </Button>
          <Button>
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 text-lns-red" size={20} />
              School Power Score Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8C92A0', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#8C92A0', fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#D62B2B" strokeWidth={4} dot={{fill: '#D62B2B', strokeWidth: 2, r: 6, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Citizenship Split</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={citizenshipData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {citizenshipData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4 w-full px-4">
              {citizenshipData.map((item, i) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}} />
                  <span className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Subject Performance Heatmap</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f1f1" />
                <XAxis type="number" axisLine={false} tickLine={false} hide />
                <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{fill: '#0A1F44', fontWeight: 800, fontSize: 12}} width={80} />
                <Tooltip />
                <Bar dataKey="avg" fill="#0A1F44" radius={[0, 8, 8, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-gradient-to-br from-lns-navy to-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Brain size={120} />
          </div>
          <CardContent className="p-8 space-y-6 flex flex-col justify-center h-full">
            <div className="space-y-2">
              <h2 className="text-2xl font-[800] tracking-tight">AI Executive Summary</h2>
              <div className="w-12 h-1 bg-lns-red rounded-full" />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              "Lennon Nash High is currently operating at a **84% Power Score**, up 4% from last month. Grade 10-A is leading in Humanities, while Grade 9-C shows a decline in late-afternoon attendance. Recommendation: Deploy additional literacy resources to 9-C and celebrate 10-A achievement in next assembly."
            </p>
            <Button className="bg-lns-red hover:bg-red-700 text-white border-none w-fit">
              Deep Dive Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
