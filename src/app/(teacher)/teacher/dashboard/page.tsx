"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  Zap, 
  TrendingUp, 
  AlertCircle,
  QrCode,
  ArrowRight,
  ChevronRight,
  Plus,
  Monitor,
  Layout
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

export default function TeacherDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-12">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full rounded-3xl" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
          <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">System Node: <span className="text-lns-red">Sarah Jenkins</span></h1>
          <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Head of English • Trust Access Level 4</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/teacher/attendance/projector">
            <Button variant="outline" className="bg-white border-lns-navy text-lns-navy hover:bg-lns-navy hover:text-white transition-all rounded-xl h-12 px-6 font-black uppercase tracking-widest text-[10px]">
              <Monitor size={18} className="mr-2" />
              Overhead QR
            </Button>
          </Link>
          <Button className="rounded-xl h-12 px-6 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-lns-navy/20">
             <Plus size={18} className="mr-2" /> Class Cycle
          </Button>
        </div>
      </div>

      {/* Hero Quick Pulse */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Active Cohort", val: "32", icon: Users, color: "text-blue-600" },
          { label: "Daily Attendance", val: "97%", icon: Zap, color: "text-amber-500" },
          { label: "Average Power", val: "74.4", icon: TrendingUp, color: "text-green-600" },
          { label: "Pending Hashes", val: "8", icon: LockIcon, color: "text-lns-red" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm bg-white p-6 hover:shadow-xl transition-all cursor-pointer group">
            <stat.icon className={cn("mb-2 group-hover:scale-110 transition-transform", stat.color)} size={24} />
            <p className="text-3xl font-[900] text-lns-navy">{stat.val}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Next Session High-Fidelity Block */}
        <Card className="border-none shadow-xl bg-lns-navy text-white overflow-hidden relative">
          <CardHeader className="border-b border-white/5 bg-white/5 px-8 py-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-sm uppercase tracking-widest">Ongoing Session</CardTitle>
              <div className="flex items-center space-x-2 text-lns-red animate-pulse">
                <div className="w-2 h-2 bg-lns-red rounded-full" />
                <span className="text-[10px] font-black uppercase">Live on Ledger</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 space-y-8">
            <div className="space-y-2">
              <h3 className="text-4xl font-[900] tracking-tighter">IB English Lit 10A</h3>
              <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-2"><Clock size={16} /> 09:00 — 10:30</span>
                <span className="flex items-center gap-2"><Users size={16} /> Mathematics Lab 4</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Link href="/teacher/attendance" className="flex-1">
                <Button className="w-full h-14 bg-white text-lns-navy hover:bg-lns-red hover:text-white transition-all font-black uppercase tracking-widest text-[10px] rounded-2xl">
                   Open Register
                </Button>
              </Link>
              <Link href="/teacher/ai-insights" className="flex-1">
                <Button variant="outline" className="w-full h-14 border-white/10 text-white hover:bg-white/5 font-black uppercase tracking-widest text-[10px] rounded-2xl">
                   Session AI
                </Button>
              </Link>
            </div>
          </CardContent>
          <Layout className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64" />
        </Card>

        {/* Empty State Demonstration: Insights or Tasks */}
        <Card className="border-none shadow-sm bg-white overflow-hidden flex flex-col">
           <CardHeader className="border-b border-lns-border">
              <CardTitle className="text-sm">Strategic Priority Stack</CardTitle>
           </CardHeader>
           <CardContent className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
              <div className="w-20 h-20 rounded-[2.5rem] bg-lns-light-grey flex items-center justify-center text-lns-mid-grey/30">
                 <AlertCircle size={40} />
              </div>
              <div className="space-y-2">
                 <h4 className="text-lg font-bold text-lns-navy uppercase tracking-tight">No Urgent Interventions</h4>
                 <p className="text-xs text-lns-mid-grey px-8 leading-relaxed">
                    AI engine has not detected any critical behavioral risks or academic drops requiring immediate action today.
                 </p>
              </div>
              <Button variant="outline" className="h-10 px-8 border-lns-border rounded-xl font-black uppercase tracking-widest text-[9px] text-lns-mid-grey">
                 Refresh Analysis
              </Button>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LockIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
       <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
