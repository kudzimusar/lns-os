"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  BarChart3,
  Users,
  UserPlus,
  Megaphone,
  FileText,
  ShieldAlert,
  TrendingUp,
  Activity,
  Zap,
  Clock
} from "lucide-react";
import { useAttendanceStore } from "@/store/attendanceStore";
import { useAttendanceBroadcast } from "@/hooks/useAttendanceBroadcast";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const performanceHistory = [
  { month: "Jan", score: 78 },
  { month: "Feb", score: 82 },
  { month: "Mar", score: 80 },
  { month: "Apr", score: 85 },
];

export default function AdminDashboard() {
  const { powerScore, entries } = useAttendanceStore();
  useAttendanceBroadcast();
  const presentCount = entries.filter(e => e.status === 'P' || e.status === 'L').length;
  const liveScore    = entries.some(e => e.status !== 'PENDING') ? powerScore : 85;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-8 px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">System Oversight</h1>
          <p className="text-xs md:text-base text-lns-mid-grey font-medium">Lennon Nash High School Administrative Node</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none bg-white h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl">
            System Status
          </Button>
          <Button className="flex-1 sm:flex-none h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl">
            Configuration
          </Button>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={20} className="text-lns-navy" />
              <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-green-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" /> Live
              </span>
            </div>
            <p className="text-2xl font-[900] text-lns-navy">{liveScore}%</p>
            <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">Avg Power Score</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="pt-6">
            <Users size={20} className="text-blue-600 mb-2" />
            <p className="text-2xl font-[900] text-lns-navy">1,240</p>
            <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">Total Enrollment</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="pt-6">
            <Activity size={20} className="text-lns-red mb-2" />
            <p className="text-2xl font-[900] text-lns-navy">42</p>
            <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">At-Risk Cohort</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="pt-6">
            <ShieldAlert size={20} className="text-green-600 mb-2" />
            <p className="text-2xl font-[900] text-lns-navy">Verified</p>
            <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">Chain Integrity</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>School-Wide Performance Trend</CardTitle>
            <TrendingUp size={18} className="text-lns-mid-grey" />
          </CardHeader>
          <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceHistory}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A1F44" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0A1F44" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F5F7" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#8C92A0', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#8C92A0', fontSize: 12}} domain={[0, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#0A1F44" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Admin Actions */}
        <Card className="border-none shadow-sm bg-lns-navy text-white">
          <CardHeader>
            <CardTitle className="text-white">Admin Commands</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/users">
              <Button className="w-full justify-start bg-white/5 border border-white/10 hover:bg-white/10 h-14">
                <UserPlus size={20} className="mr-3 text-lns-red" />
                <div className="text-left">
                  <p className="text-sm font-bold">Enroll New Student</p>
                  <p className="text-[10px] text-lns-mid-grey">Auto-generate QR & Bio</p>
                </div>
              </Button>
            </Link>
            <Link href="/admin/announcements">
              <Button className="w-full justify-start bg-white/5 border border-white/10 hover:bg-white/10 h-14">
                <Megaphone size={20} className="mr-3 text-lns-mid-grey" />
                <div className="text-left">
                  <p className="text-sm font-bold">Post Announcement</p>
                  <p className="text-[10px] text-lns-mid-grey">Push to all user modes</p>
                </div>
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button className="w-full justify-start bg-white/5 border border-white/10 hover:bg-white/10 h-14">
                <FileText size={20} className="mr-3 text-lns-mid-grey" />
                <div className="text-left">
                  <p className="text-sm font-bold">Resource Reports</p>
                  <p className="text-[10px] text-lns-mid-grey">Export full school data</p>
                </div>
              </Button>
            </Link>
            
            <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
                 <span>Active Teachers</span>
                 <span className="text-white">88/90</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-lns-red w-[98%] rounded-full" />
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
