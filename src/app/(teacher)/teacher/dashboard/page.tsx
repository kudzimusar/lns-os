"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Clock, 
  MapPin, 
  Plus, 
  Monitor, 
  Layout, 
  ChevronRight, 
  AlertCircle, 
  Star, 
  Zap, 
  Megaphone, 
  ArrowRight 
} from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { 
  TabletPage, 
  TabletHeader, 
  TabletSection 
} from "@/components/tablet/TabletPage";
import { StatCard } from "@/components/tablet/Cards";

export default function TeacherDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <TabletPage className="space-y-8">
        <Skeleton className="h-12 w-64 rounded-xl" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Skeleton className="md:col-span-2 lg:col-span-2 h-[450px] w-full rounded-2xl" />
          <Skeleton className="h-[450px] w-full rounded-2xl" />
        </div>
      </TabletPage>
    );
  }

  return (
    <TabletPage className="space-y-8 pb-12">
      <TabletHeader 
        title="Institutional Node: Sarah Jenkins"
        subtitle="Head of English • Trust Access Level 4"
        actions={
          <div className="flex gap-3">
            <Link href="/teacher/attendance/projector">
              <Button variant="outline" className="h-12 px-6 rounded-xl font-black uppercase tracking-widest text-[10px]">
                <Monitor size={18} className="mr-2" />
                Overhead Node
              </Button>
            </Link>
            <Button className="h-12 px-6 rounded-xl bg-lns-navy text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-lns-navy/20">
               <Plus size={18} className="mr-2" /> Class Cycle
            </Button>
          </div>
        }
      />

      {/* Hero Stats Sub-Grid - Standardized 2/4 cols */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Active Cohort" value="32" trend="Full Room" trendType="neutral" />
        <StatCard label="Daily Attendance" value="97%" trend="+2.4% vs Avg" trendType="up" />
        <StatCard label="Average Power" value="74.4" trend="-1.2% this week" trendType="down" />
        <StatCard label="Pending Hashes" value="8" trend="Requires Sync" trendType="neutral" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left Column (Approx 60% on Tablet landscape) */}
        <div className="md:col-span-3 space-y-8">
          {/* Ongoing Session High-Fidelity Block */}
          <Card className="border-none shadow-xl bg-lns-navy text-white overflow-hidden relative rounded-2xl md:rounded-3xl transition-all">
            <CardHeader className="border-b border-white/5 bg-white/5 px-8 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Current Session Active</h3>
                <div className="flex items-center space-x-2 text-lns-red animate-pulse">
                  <div className="w-2 h-2 bg-lns-red rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Registry</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-tight">IB English Lit 10A</h2>
                <div className="flex flex-wrap gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><Clock size={16} /> 09:00 — 10:30</span>
                  <span className="flex items-center gap-2"><MapPin size={16} /> Room B4</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/teacher/attendance" className="flex-1">
                  <Button className="w-full h-16 bg-white text-lns-navy hover:bg-lns-red hover:text-white transition-all font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-2xl active:scale-95">
                     Execute Register
                  </Button>
                </Link>
                <Link href="/teacher/ai-insights" className="flex-1">
                  <Button variant="outline" className="w-full h-16 border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl active:scale-95">
                     Session AI
                  </Button>
                </Link>
              </div>
            </CardContent>
            <Layout className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64 pointer-events-none" />
          </Card>

          <TabletSection title="Automated Grading Queue">
            <Card className="border-none shadow-sm bg-white overflow-hidden rounded-2xl">
              <CardContent className="p-0 divide-y divide-gray-50 text-left">
                {[
                  { name: "Terminal Essay: Hamlet", students: 12, due: "Today", urgency: "high" },
                  { name: "Creative Response #3", students: 28, due: "Tomorrow", urgency: "medium" },
                ].map((task, i) => (
                  <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group active:bg-gray-100">
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all",
                        task.urgency === "high" ? "bg-red-50 text-red-600 ring-2 ring-red-100" : "bg-blue-50 text-blue-600 ring-2 ring-blue-100"
                      )}>
                        {task.students}
                      </div>
                      <div>
                        <p className="text-[15px] font-black uppercase tracking-tight text-lns-navy group-hover:text-lns-red transition-colors">{task.name}</p>
                        <p className="text-[10px] text-lns-mid-grey font-black uppercase tracking-widest italic opacity-60">Pending Evaluation • Due {task.due}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-lns-navy transition-all" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabletSection>
        </div>

        {/* Right Column (Approx 40% on Tablet landscape) */}
        <div className="md:col-span-2 space-y-8">
          <TabletSection title="Strategic Priorities">
            <Card className="border-none shadow-sm bg-white overflow-hidden flex flex-col rounded-2xl border-t-4 border-lns-navy">
               <CardContent className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl bg-lns-light-grey flex items-center justify-center text-lns-mid-grey/30 shadow-inner">
                     <AlertCircle size={40} />
                  </div>
                  <div className="space-y-3">
                     <h4 className="text-lg font-black text-lns-navy uppercase tracking-tighter leading-tight italic">No Urgent Alerts</h4>
                     <p className="text-[13px] text-lns-mid-grey px-4 leading-relaxed font-medium uppercase tracking-tight">
                        AI engine has not detected any critical behavioral risks or academic drops in your current cohort nodes.
                     </p>
                  </div>
                  <Button variant="ghost" className="h-12 px-8 bg-gray-50 rounded-xl font-black uppercase tracking-widest text-[10px] text-lns-mid-grey hover:text-lns-navy transition-all active:scale-95">
                     Refresh Pulse
                  </Button>
               </CardContent>
            </Card>
          </TabletSection>

          <TabletSection title="Tactical Operations">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
              {[
                { label: "New Bulk Merit", icon: Star, color: "text-amber-500" },
                { label: "Start Live Quiz", icon: Zap, color: "text-blue-500" },
                { label: "Broadcast Alert", icon: Megaphone, color: "text-red-500" },
              ].map((tool, i) => (
                <Button 
                  key={i}
                  variant="outline" 
                  className="h-16 w-full justify-start px-6 bg-white border border-lns-border shadow-sm hover:shadow-xl hover:border-lns-navy/20 transition-all group rounded-2xl active:scale-[0.98]"
                >
                  <tool.icon className={cn("mr-4 transition-transform group-hover:rotate-12", tool.color)} size={20} />
                  <span className="text-sm font-black text-lns-navy uppercase tracking-widest">{tool.label}</span>
                  <ArrowRight size={16} className="ml-auto text-gray-300 group-hover:text-lns-navy group-hover:translate-x-1 transition-all" />
                </Button>
              ))}
            </div>
          </TabletSection>
        </div>
      </div>
    </TabletPage>
  );
}
