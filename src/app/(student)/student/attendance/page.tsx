"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  QrCode,
  Calendar,
  Zap,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAttendanceStore } from "@/store/attendanceStore";
import { useAttendanceBroadcast } from "@/hooks/useAttendanceBroadcast";

const attendanceSummary = [
  { label: "On Time", value: "92%", icon: CheckCircle2, color: "text-green-600" },
  { label: "Late", value: "3", icon: Clock, color: "text-amber-500" },
  { label: "Absent", value: "1", icon: AlertCircle, color: "text-lns-red" },
  { label: "Power Score", value: "95", icon: Zap, color: "text-lns-navy" },
];

export default function StudentAttendance() {
  const { entries } = useAttendanceStore();
  useAttendanceBroadcast();
  const myEntry     = entries.find(e => e.studentId === 'student-001');
  const todayStatus = myEntry?.status ?? 'PENDING';
  const todayTime   = myEntry?.timestamp ?? null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div>
        <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Attendance &amp; QR</h1>
        <p className="text-lns-mid-grey font-medium">Scan your code at the door to mark presence.</p>
      </div>

      {/* Live today status */}
      <div className={cn(
        "flex items-center gap-3 p-4 rounded-2xl border",
        todayStatus === 'P' ? "bg-green-50 border-green-100" :
        todayStatus === 'A' ? "bg-red-50 border-red-100" :
        todayStatus === 'L' ? "bg-amber-50 border-amber-100" :
        "bg-lns-light-grey border-lns-border/10"
      )}>
        {todayStatus === 'P'       && <CheckCircle2 size={22} className="text-green-600 shrink-0" />}
        {todayStatus === 'A'       && <XCircle      size={22} className="text-lns-red shrink-0" />}
        {todayStatus === 'L'       && <Clock        size={22} className="text-amber-500 shrink-0" />}
        {todayStatus === 'PENDING' && <Clock        size={22} className="text-lns-mid-grey shrink-0" />}
        <div>
          <p className={cn("text-sm font-black",
            todayStatus === 'P' ? "text-green-700" :
            todayStatus === 'A' ? "text-lns-red" :
            todayStatus === 'L' ? "text-amber-700" : "text-lns-mid-grey"
          )}>
            {todayStatus === 'P' ? `Present${todayTime ? ` · ${todayTime}` : ''}` :
             todayStatus === 'A' ? 'Absent' :
             todayStatus === 'L' ? `Late${todayTime ? ` · ${todayTime}` : ''}` :
             'Awaiting today\'s scan'}
          </p>
          <p className="text-[10px] text-lns-mid-grey">Mathematics · Mr. Okafor · Today</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Code Section */}
        <Card className="lg:col-span-1 border-none shadow-xl bg-white flex flex-col items-center justify-center p-8 text-center">
          <div className="p-6 bg-lns-light-grey rounded-3xl border-2 border-lns-navy/5 mb-6">
            <QrCode size={180} className="text-lns-navy" />
          </div>
          <h3 className="text-xl font-black text-lns-navy uppercase tracking-tighter">Alex Wong</h3>
          <p className="text-xs font-bold text-lns-mid-grey tracking-widest uppercase mt-1">Student ID: #LNS-2024-089</p>
          <div className="mt-8 pt-8 border-t border-lns-border w-full">
            <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-[0.2em] mb-4">Official Identification</p>
            <div className="flex items-center justify-center space-x-2 text-lns-navy">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold">Active Portal Record</span>
            </div>
          </div>
        </Card>

        {/* Stats & Calendar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {attendanceSummary.map((stat, idx) => (
              <Card key={idx} className="border-none shadow-sm bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-[900] text-lns-navy">{stat.value}</p>
                      <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-wider">{stat.label}</p>
                    </div>
                    <stat.icon className={stat.color} size={24} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-lns-border">
              <CardTitle className="text-sm">Attendance History (Current Term)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-7 gap-px bg-lns-border">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="bg-white aspect-square flex flex-col items-center justify-center p-1 group hover:bg-lns-light-grey transition-colors cursor-pointer">
                    <span className="text-[10px] font-bold text-lns-mid-grey mb-1">{((i % 31) + 1)}</span>
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      i < 5 ? "bg-green-500" : 
                      i === 5 ? "bg-amber-500" :
                      i === 12 ? "bg-lns-red" :
                      i < 15 ? "bg-green-500" : "bg-lns-light-grey"
                    )} />
                  </div>
                ))}
              </div>
              <div className="p-4 flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-widest">Present</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-widest">Late</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-lns-red rounded-full" />
                  <span className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-widest">Absent</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
