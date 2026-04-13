"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ChevronRight,
  GraduationCap,
  Bell,
  Activity,
  User,
  TrendingUp,
  Megaphone,
  ShieldCheck,
  Award,
  ExternalLink,
  QrCode,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { SealedBadge } from "@/components/blockchain/SealedBadge";
import { generateMockHash } from "@/lib/blockchain";
import {
  TabletPage,
  TabletHeader,
  TabletSection
} from "@/components/tablet/TabletPage";
import { PLACEHOLDER_STUDENTS, PARENT_CHILDREN } from "@/lib/placeholder-data";
import { useAttendanceStore } from "@/store/attendanceStore";
import { useAttendanceBroadcast } from "@/hooks/useAttendanceBroadcast";

export default function ParentDashboard() {
  const childrenIds = PARENT_CHILDREN[0].childrenIds;
  const myChildren  = PLACEHOLDER_STUDENTS.filter(s => childrenIds.includes(s.id));

  const { entries, isLocked } = useAttendanceStore();
  useAttendanceBroadcast();
  const studentEntry = entries.find(e => e.studentId === 'student-001');
  const todayStatus  = studentEntry?.status ?? 'PENDING';

  return (
    <TabletPage className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 px-4 md:px-0">

      {/* Live Attendance Status Card */}
      <Card className="border-none shadow-sm bg-white p-6 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Amara Johnson · Today&apos;s Attendance</p>
            <div className="flex items-center gap-3">
              {todayStatus === 'PENDING' && (
                <span className="flex items-center gap-2 text-sm font-black text-lns-mid-grey">
                  <Clock size={18} className="text-amber-500" /> Pending ○
                </span>
              )}
              {todayStatus === 'P' && (
                <span className="flex items-center gap-2 text-sm font-black text-green-700">
                  <CheckCircle2 size={18} className="text-green-600" /> Present ✓
                </span>
              )}
              {todayStatus === 'A' && (
                <span className="flex items-center gap-2 text-sm font-black text-lns-red">
                  <XCircle size={18} className="text-lns-red" /> Absent ✗
                </span>
              )}
              {todayStatus === 'L' && (
                <span className="flex items-center gap-2 text-sm font-black text-amber-700">
                  <Clock size={18} className="text-amber-500" /> Late
                </span>
              )}
            </div>
            <p className="text-xs text-lns-mid-grey/60">Mathematics · Mr. Okafor</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              isLocked ? "bg-amber-500" : "bg-green-500"
            )} />
            <span className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey">
              Updates in real time
            </span>
          </div>
        </div>
      </Card>

      {/* Broadcast Banner - Section 13/21 Spec */}
      <Card className="border-none shadow-xl bg-[#FFFBF0] border border-amber-100 p-6 md:p-10 rounded-2xl md:rounded-3xl overflow-hidden relative group">
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
               <div className="bg-amber-500 p-4 md:p-5 rounded-2xl md:rounded-3xl text-white shadow-xl shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <Megaphone size={32} />
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-amber-700 italic">Institutional Advisory</p>
                  <p className="text-xl md:text-3xl font-black text-amber-950 leading-tight uppercase tracking-tight">Progress Reports Awaiting Signature</p>
               </div>
            </div>
            <Link href="/parent/announcements" className="w-full md:w-auto">
               <Button className="w-full md:w-auto bg-amber-950 text-white hover:bg-black font-black text-[10px] tracking-widest px-10 h-14 rounded-xl shadow-xl shadow-amber-950/20 active:scale-95 transition-all">
                  Access Portal Center <ChevronRight size={18} className="ml-2" />
               </Button>
            </Link>
         </div>
         <Activity className="absolute -bottom-20 -right-20 text-amber-500/5 w-96 h-96 pointer-events-none" />
      </Card>

      <TabletHeader 
        title="Family Command" 
        subtitle="Operational Overview for Guardian Nodes" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
         {/* Children Grid - Takes 3 sectors on lg */}
         <div className="lg:col-span-3 space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-lns-navy px-2 flex items-center gap-2">
               <User size={14} className="text-lns-red" /> Dependency Nodes
            </h3>
            <div className="grid grid-cols-1 gap-4">
               {myChildren.map((child) => (
                 <Link key={child.id} href={`/parent/child/${child.id}`}>
                    <Card className="p-6 md:p-8 border-none shadow-xl bg-white rounded-2xl hover:translate-x-2 transition-transform group cursor-pointer border-l-4 md:border-l-8 border-transparent hover:border-lns-red">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                             <div className="w-16 h-16 rounded-2xl bg-lns-navy text-white text-2xl font-black shadow-xl group-hover:bg-lns-red transition-all shrink-0 flex items-center justify-center">
                                {child.name.charAt(0)}
                             </div>
                             <div className="space-y-1 text-left">
                                <h4 className="text-xl font-black text-lns-navy uppercase tracking-tight italic">{child.name}</h4>
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic">
                                   <span className="bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">{child.class}</span>
                                   <span className="flex items-center gap-1"><TrendingUp size={12} className="text-lns-red"/> Score: {child.powerScore}%</span>
                                </div>
                             </div>
                          </div>
                          <ChevronRight className="text-gray-200 group-hover:text-lns-navy transition-colors shrink-0" size={24} />
                       </div>
                    </Card>
                 </Link>
               ))}
            </div>
         </div>

         {/* Messenger Quick Link - Takes 2 sectors on lg */}
         <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-lns-navy px-2 flex items-center gap-2">
               <Bell size={14} className="text-lns-red" /> Secure Comms
            </h3>
            <Card className="p-8 border-none shadow-2xl bg-lns-navy text-white rounded-2xl h-full flex flex-col justify-between overflow-hidden relative min-h-[400px]">
               <div className="relative z-10 space-y-8 flex-1">
                  <div className="space-y-2 text-center md:text-left">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Institutional Messaging</p>
                     <h4 className="text-2xl font-black tracking-tight italic uppercase">Coordinate with Faculty</h4>
                  </div>
                  <div className="space-y-4">
                     {[
                       { name: "Ms. Sarah Chen", role: "Head of English", unread: true },
                       { name: "Academic Registrar", role: "System Node", unread: false },
                     ].map((msg, i) => (
                       <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 group cursor-pointer active:bg-white/10 transition-colors">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black group-hover:bg-lns-red transition-all">{msg.name.charAt(0)}</div>
                             <div className="text-left">
                                <p className="text-sm font-black uppercase tracking-tight">{msg.name}</p>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic">{msg.role}</p>
                             </div>
                          </div>
                          {msg.unread && <div className="w-2 h-2 bg-lns-red rounded-full shadow-[0_0_10px_rgba(214,43,43,1)] animate-pulse" />}
                       </div>
                     ))}
                  </div>
               </div>
               <Link href="/parent/messages" className="relative z-10 pt-8 w-full">
                  <Button className="w-full bg-white text-lns-navy hover:bg-black hover:text-white h-16 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl active:scale-95">
                     Enter Comms Hub
                  </Button>
               </Link>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>
         </div>

         {/* Achievement Passport - Section 12/21 */}
         <div className="md:col-span-2 lg:col-span-5 space-y-6 mt-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-lns-navy px-2 flex items-center gap-2">
               <ShieldCheck size={14} className="text-lns-red" /> Achievement Passport
            </h3>
            <Card className="p-8 md:p-12 border-none shadow-2xl bg-gradient-to-br from-[#0A1F44] to-[#162e5a] text-white rounded-3xl overflow-hidden relative">
               <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                  <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-black/40 rotate-3 group-hover:rotate-0 transition-transform duration-500 shrink-0">
                     <QrCode size={120} className="text-lns-navy" />
                     <div className="mt-4 text-center">
                        <p className="text-[8px] font-black text-lns-mid-grey">SECURE ID: family-001</p>
                     </div>
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-6">
                     <div className="space-y-4">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-lns-red text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-lns-red/20">
                           <ShieldCheck size={14} /> Polygon Anchored Verification
                        </div>
                        <h4 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase leading-tight">Student Educational Identity Ledger</h4>
                        <p className="text-sm text-slate-400 font-medium max-w-2xl leading-relaxed uppercase tracking-tight">
                           A verified, portable, lifelong record of institutional achievements. Owned by the student node, verifiable by peer institutions, expiring never.
                        </p>
                     </div>
                     
                     <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <SealedBadge hash={generateMockHash()} className="bg-white/10 border-white/10 text-white" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                           <Award size={14} className="text-amber-400" /> 12 Active Credentials
                        </span>
                     </div>

                     <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <Link href={`/verify/passport/${generateMockHash()}`} className="w-full sm:w-auto">
                           <Button className="w-full sm:w-auto bg-white text-lns-navy hover:bg-lns-red hover:text-white h-14 px-10 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 shadow-2xl shadow-black/20">
                              View Passport <ExternalLink size={16} className="ml-3" />
                           </Button>
                        </Link>
                        <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5 font-black uppercase text-[10px] tracking-widest px-8">
                           Download PDF Archive
                        </Button>
                     </div>
                  </div>
               </div>
               <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <ShieldCheck size={300} />
               </div>
            </Card>
         </div>
      </div>
    </TabletPage>
  );
}
