"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StatCard, GradeCard } from "@/components/tablet/Cards";
import { StudentSchedule } from "@/components/tablet/StudentSchedule";
import { 
  Megaphone,
  Activity,
  QrCode,
  ChevronRight,
} from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8 px-4 md:px-0">
      {/* Top Banner - Section 9/13 Spec */}
      <Card className="border-none shadow-xl bg-lns-navy text-white overflow-hidden relative p-8 rounded-2xl md:rounded-[2rem]">
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
               <div className="bg-lns-red p-4 rounded-2xl shadow-lg shadow-lns-red/20 animate-pulse shrink-0">
                  <Megaphone size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Institutional Broadcast</p>
                  <p className="text-lg md:text-xl font-black uppercase tracking-tight">End of Term Assessment Schedule has been published.</p>
               </div>
            </div>
            <Link href="/student/messages" className="shrink-0 w-full md:w-auto">
              <Button className="w-full md:w-auto bg-white/10 hover:bg-white text-white hover:text-lns-navy text-[10px] font-black uppercase tracking-widest px-8 h-12 rounded-xl border border-white/20 transition-all">
                 Read Protocol
              </Button>
            </Link>
         </div>
         <Activity className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64 pointer-events-none" />
      </Card>

      {/* Main Grid: 2-columns on tablet as per Section 8 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Left Column (60%) - Schedule */}
        <div className="md:col-span-3">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey mb-4 ml-1">Daily Sequence</h3>
          <StudentSchedule />
        </div>

        {/* Right Column (40%) - Sidebar Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Quick Scan Button - Section 8 Spec */}
          <Link href="/student/scan" className="block">
            <Button className="h-16 w-full rounded-2xl bg-lns-red hover:bg-red-700 text-white shadow-xl shadow-red-600/20 group text-[11px] font-black uppercase tracking-[0.2em]">
              <QrCode className="mr-4" size={24} />
              Quick Scan Entry
              <ChevronRight className="ml-auto group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          {/* Stats Sub-grid - Section 7 Rule */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              label="Power Score" 
              value="88.2" 
              trend="+4.1%" 
              trendType="up" 
            />
            <StatCard 
              label="Merit Hub" 
              value="450" 
              trend="25 to reward" 
              trendType="neutral" 
            />
          </div>

          {/* Recent Grade Card - Section 13 Spec */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey ml-1">Performance Ledger</h3>
            <GradeCard 
              subject="IB English Literature"
              teacher="Ms. Sarah Jenkins"
              grade="A*"
              percentage={94}
              citizenship="PLATINUM"
            />
          </div>

          {/* Upcoming Assignments Quick List */}
          <Card className="border-none shadow-sm bg-white p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey">Active Missions</h3>
               <span className="text-[9px] bg-red-50 text-lns-red px-2 py-0.5 rounded-full font-black uppercase">2 Critical</span>
            </div>
            <div className="space-y-4">
              {[
                { title: "Quantum Physics Lab", due: "Today, 16:00", color: "bg-lns-red" },
                { title: "Historical Context Essay", due: "Tomorrow, 09:00", color: "bg-amber-500" },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
                  <div className={cn("w-1 h-10 rounded-full", task.color)} />
                  <div className="flex-1">
                    <p className="text-sm font-black text-lns-navy uppercase tracking-tight">{task.title}</p>
                    <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest mt-1 opacity-60 italic">{task.due}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-lns-red transition-colors" />
                </div>
              ))}
            </div>
            <Link href="/student/assignments" className="block pt-2">
              <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-lns-navy/40 hover:text-lns-red transition-colors">
                Decrypt All Assignments
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Quick Access Grid - Tablet Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
         {[
            { label: "My Profile", href: "/student/profile", icon: "👤" },
            { label: "Documents", href: "/student/documents", icon: "📄" },
            { label: "Timetable", href: "/student/timetable", icon: "📅" },
            { label: "Help Hub", href: "/student/support", icon: "❓" },
         ].map((item) => (
            <Link key={item.label} href={item.href}>
               <Card className="p-4 border-none shadow-sm hover:shadow-md transition-all flex items-center gap-4 rounded-2xl group">
                  <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-lns-navy">{item.label}</span>
               </Card>
            </Link>
         ))}
      </div>
    </div>
  );
}
