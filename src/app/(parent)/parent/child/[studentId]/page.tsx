"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Award, 
  Clock, 
  MessageCircle,
  FileText,
  ChevronRight,
  Activity,
  Zap,
  Star
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return PLACEHOLDER_STUDENTS.map((s) => ({
    studentId: s.id,
  }));
}

export default function ParentChildProfilePage({ params }: { params: { studentId: string } }) {
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === params.studentId) || PLACEHOLDER_STUDENTS[0];

  const stats = [
    { label: "Grade Index", value: `${student.powerScore}%`, icon: Zap, color: "text-lns-navy" },
    { label: "Attendance", value: "98.4%", icon: Clock, color: "text-green-500" },
    { label: "Merits Earned", value: "450", icon: Award, color: "text-lns-red" },
    { label: "Citizenship", value: student.citizenship, icon: ShieldCheck, color: "text-green-600" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
         <div className="flex items-center gap-4">
            <Link href="/parent/dashboard">
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-lns-navy h-12 w-12 border border-gray-100">
                  <ArrowLeft size={24} />
               </Button>
            </Link>
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 rounded-[1.5rem] bg-lns-navy flex items-center justify-center text-white text-3xl font-black shadow-xl">
                  {student.name.charAt(0)}
               </div>
               <div className="space-y-1">
                  <h1 className="text-3xl font-[900] text-lns-navy tracking-tight leading-none">{student.name}</h1>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey italic uppercase">{student.class} • {student.idNumber}</p>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <span className={cn(
               "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
               student.status === 'Good' ? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-lns-red border-red-200"
            )}>
               Status: {student.status}
            </span>
            <Link href={`/parent/messages/new?to=${student.id}`}>
               <Button className="h-12 bg-white text-lns-navy hover:bg-lns-navy hover:text-white border border-lns-navy/10 rounded-2xl px-6 font-black uppercase tracking-widest text-[9px] transition-all shadow-sm">
                  Message Principal
               </Button>
            </Link>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
           <Card key={i} className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-4 hover:translate-y-[-4px] transition-transform group">
              <div className="flex items-center justify-between">
                 <div className={cn("p-3 rounded-2xl bg-gray-50 transition-all", stat.color)}>
                    <stat.icon size={20} />
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic">Global Stat</div>
              </div>
              <div>
                 <p className="text-3xl font-[900] text-lns-navy tracking-tighter">{stat.value}</p>
                 <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Sections (Quick Action Cards) */}
         <div className="lg:col-span-2 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 flex items-center gap-2 italic">
               <Activity size={16} />
               Institutional Access Hub
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 { label: "Gradebook Ledger", sub: "Deep-dive subject analysis", href: "grades", icon: TrendingUp, color: "text-lns-navy" },
                 { label: "Attendance Protocol", sub: "Verify classroom presence", href: "attendance", icon: Clock, color: "text-green-500" },
                 { label: "Behaviour Variance", sub: "Log merits & incidents", href: "behaviour", icon: Star, color: "text-amber-500" },
                 { label: "Final Annual Report", sub: "Download academic decree", href: "report", icon: FileText, color: "text-lns-red" },
               ].map((act, i) => (
                 <Link key={i} href={`/parent/child/${params.studentId}/${act.href}`}>
                    <Card className="p-6 border-none shadow-sm hover:shadow-xl bg-white rounded-[2rem] flex items-center justify-between group transition-all">
                       <div className="flex items-center gap-4">
                          <div className={cn("w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center transition-all group-hover:bg-lns-navy group-hover:text-white", act.color)}>
                             <act.icon size={24} />
                          </div>
                          <div className="space-y-1">
                             <h4 className="text-sm font-black text-lns-navy group-hover:text-lns-red transition-all">{act.label}</h4>
                             <p className="text-[10px] font-medium text-lns-mid-grey italic">{act.sub}</p>
                          </div>
                       </div>
                       <ChevronRight className="text-gray-200 group-hover:text-lns-navy transition-colors" />
                    </Card>
                 </Link>
               ))}
            </div>

            <Card className="p-10 border-none shadow-xl bg-lns-navy text-white rounded-[3rem] overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Institutional Synopsis (AI)</p>
                     <p className="text-lg font-black italic tracking-tight leading-relaxed">
                        "{student.name} maintains a high academic trajectory with notable performance in STEM sub-modules. Attendance variance is minimal. Suggest prioritizing linguistic refinement in Term 3."
                     </p>
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                     <div className="w-10 h-10 rounded-full border-2 border-green-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-green-500 animate-pulse" />
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Verified by LNS OS High Command</span>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80" />
            </Card>
         </div>

         {/* Sidebar / Messenger */}
         <div className="space-y-6">
            <TabletSection title="Faculty Channels">
               <Card className="p-8 border-none shadow-xl bg-white rounded-2xl space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Active Threads</p>
                  <div className="space-y-3">
                     {[
                       { name: "Ms. Sarah Chen", role: "Math Lead", date: "10m ago" },
                       { name: "Registrar Hub", role: "Automated", date: "2d ago" },
                     ].map((msg, i) => (
                       <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg hover:border-blue-100 border border-transparent transition-all cursor-pointer group">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-lns-navy flex items-center justify-center text-white text-xs font-black">{msg.name.charAt(0)}</div>
                             <div>
                                <p className="text-xs font-black text-lns-navy group-hover:text-lns-red">{msg.name}</p>
                                <p className="text-[9px] font-bold text-lns-mid-grey uppercase">{msg.role}</p>
                             </div>
                          </div>
                          <span className="text-[8px] font-black text-lns-mid-grey uppercase">{msg.date}</span>
                       </div>
                     ))}
                  </div>
                  <Button className="w-full h-12 bg-gray-50 text-lns-navy hover:bg-lns-red hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest border border-gray-100 transition-all">
                     View All Exchanges
                  </Button>
               </Card>
            </TabletSection>

            <Card className="p-8 border-none shadow-sm bg-lns-light-grey/30 rounded-2xl space-y-4">
               <div className="flex items-center gap-3 text-lns-navy">
                  <ShieldCheck size={20} className="text-lns-red" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Integrity Log</h3>
               </div>
               <p className="text-[10px] leading-relaxed text-lns-mid-grey italic uppercase tracking-wider">
                  Every data node displayed for {student.name} is cryptographically hashed and verified against the student's personal digital identity chain.
               </p>
            </Card>
         </div>
      </div>
    </div>
  );
}

function TabletSection({ title, children }: { title: string, children: React.ReactNode }) {
   return (
      <div className="space-y-4">
         <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4">{title}</h3>
         {children}
      </div>
   );
}
