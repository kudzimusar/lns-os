"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  ChevronDown, 
  Bell, 
  TrendingUp, 
  Calendar, 
  Award,
  ShieldCheck,
  Megaphone,
  User,
  Star,
  ChevronRight,
  ShieldAlert,
  Activity,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const children = [
  { id: 1, name: "Alex Lincoln", grade: "10A", powerScore: 88.2, attendance: "98%", status: "Good", citizenship: "Platinum" },
  { id: 2, name: "Mary Lincoln", grade: "8C", powerScore: 74.5, attendance: "94%", status: "At Risk", citizenship: "Gold" },
];

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(children[0]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Role Announcement Hub */}
      <Card className="border-none shadow-xl bg-[#FFFBF0] border border-amber-100 p-6 rounded-[2rem] overflow-hidden relative">
         <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
               <div className="bg-amber-500 p-4 rounded-2xl text-white shadow-lg shadow-amber-500/20">
                  <Megaphone size={20} />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">Official Advisory</p>
                  <p className="text-sm sm:text-lg font-bold text-amber-950">Term 1 Official Reports are now available for digital verification.</p>
               </div>
            </div>
            <Link href="/parent/reports">
               <Button variant="ghost" className="text-amber-700 font-black text-[10px] tracking-widest bg-amber-100 px-8 h-12 rounded-xl border border-amber-200">
                  Access Ledger <ChevronRight size={16} className="ml-1" />
               </Button>
            </Link>
         </div>
         <Activity className="absolute -bottom-10 -right-10 text-amber-500/5 w-64 h-64" />
      </Card>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-[900] text-lns-navy tracking-tight">Parent <span className="text-lns-red">Command</span></h1>
          <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Guardian Interface • Hub 02</p>
        </div>
        
        <div className="flex items-center bg-white border border-lns-border rounded-2xl p-1 shadow-sm">
           {children.map(child => (
             <button 
               key={child.id}
               onClick={() => setSelectedChild(child)}
               className={cn(
                 "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center space-x-2",
                 selectedChild.id === child.id ? "bg-lns-navy text-white shadow-xl" : "text-lns-mid-grey hover:bg-lns-light-grey"
               )}
             >
                <div className={cn("w-2 h-2 rounded-full", child.status === "Good" ? "bg-green-500" : "bg-lns-red")} />
                <span>{child.name.split(' ')[0]}</span>
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               <Card className="border-none shadow-sm bg-white p-6 relative overflow-hidden group">
                  <TrendingUp className="text-lns-navy mb-4 relative z-10" size={20} />
                  <p className="text-4xl font-[900] text-lns-navy relative z-10 tracking-tighter">{selectedChild.powerScore}</p>
                  <p className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest relative z-10">Academic Power</p>
                  <div className="absolute -bottom-4 -right-4 text-lns-light-grey/20 group-hover:scale-110 transition-transform">
                     <TrendingUp size={100} />
                  </div>
               </Card>
               <Card className="border-none shadow-sm bg-white p-6 relative overflow-hidden group">
                  <ShieldCheck className="text-green-600 mb-4 relative z-10" size={20} />
                  <p className="text-4xl font-[900] text-lns-navy relative z-10 tracking-tighter">{selectedChild.attendance}</p>
                  <p className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest relative z-10">Attendance Hash</p>
                  <div className="absolute -bottom-4 -right-4 text-green-500/5 group-hover:scale-110 transition-transform">
                     <ShieldCheck size={100} />
                  </div>
               </Card>
               <Card className={cn(
                 "border-none shadow-xl p-6 relative overflow-hidden group transition-all",
                 selectedChild.citizenship === "Platinum" ? "bg-gradient-to-br from-lns-navy to-slate-900 text-white" : "bg-gradient-to-br from-amber-400 to-amber-600 text-white"
               )}>
                  <Award className="mb-4 relative z-10" size={20} />
                  <p className="text-3xl font-black relative z-10 tracking-tight italic uppercase">{selectedChild.citizenship}</p>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest relative z-10">LNS Peer Rank</p>
                  <div className="absolute -bottom-4 -right-4 text-white/5 group-hover:scale-110 transition-transform">
                     <Award size={100} />
                  </div>
               </Card>
            </div>

            <Card className="border-none shadow-sm bg-white overflow-hidden rounded-[2.5rem]">
               <CardHeader className="border-b border-lns-border bg-lns-light-grey/20 px-8 py-5 flex flex-row items-center justify-between">
                  <CardTitle className="text-xs uppercase tracking-[0.2em] font-black text-lns-navy">Verified behavioral timeline</CardTitle>
                  <Link href="/parent/reports">
                     <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-lns-red h-8">Download PDF Report</Button>
                  </Link>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-lns-border">
                     {[
                       { type: "Merit", points: "+5", reason: "Excellence in Algebra Assessment", date: "Today, 11:20 AM", icon: Star, color: "text-amber-500" },
                       { type: "Notice", points: "-", reason: "Left Science book in Physics Lab", date: "Yesterday, 14:05", icon: Bell, color: "text-blue-500" },
                       { type: "Report", points: "Released", reason: "Term 1 Final Academic Report Hub", date: "Yesterday, 09:00", icon: FileText, color: "text-lns-red" },
                     ].map((item, idx) => (
                       <div key={idx} className="p-6 flex items-start justify-between group hover:bg-lns-light-grey/30 transition-all cursor-pointer">
                          <div className="flex items-start space-x-6">
                             <div className={cn("w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg shrink-0 ring-4 ring-lns-light-grey", item.color)}>
                                <item.icon size={20} />
                             </div>
                             <div>
                                <p className="text-sm font-black text-lns-navy group-hover:text-lns-red transition-all">{item.reason}</p>
                                <p className="text-[10px] text-lns-mid-grey font-black uppercase tracking-widest mt-1">{item.type} • {item.date}</p>
                             </div>
                          </div>
                          <span className={cn("text-lg font-black", item.points.startsWith('+') ? "text-green-600" : "text-lns-navy")}>{item.points}</span>
                       </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="space-y-8">
            <Card className="border-none shadow-xl bg-[#1A1F37] text-white p-10 rounded-[3.5rem] space-y-8 overflow-hidden relative">
               <div className="relative z-10 space-y-6">
                  <h3 className="text-xl font-black uppercase tracking-tight">Institutional Messenger</h3>
                  <div className="space-y-3">
                     {[
                       { name: "Sarah Jenkins", role: "Head of English", unread: true },
                       { name: "Academic Hub", role: "Automated", unread: false },
                     ].map(msg => (
                       <div key={msg.name} className="flex items-center justify-between p-4 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                          <div className="flex items-center space-x-4">
                             <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[11px] font-black group-hover:bg-lns-red transition-all">{msg.name[0]}</div>
                             <div>
                                <p className="text-xs font-bold text-white">{msg.name}</p>
                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{msg.role}</p>
                             </div>
                          </div>
                          {msg.unread && <div className="w-2 h-2 bg-lns-red rounded-full shadow-[0_0_10px_rgba(214,43,43,1)]" />}
                       </div>
                     ))}
                  </div>
                  <Button className="w-full bg-white text-lns-navy hover:bg-lns-red hover:text-white h-14 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl transition-all">New Encrypted Channel</Button>
               </div>
               <Activity className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64 pointer-events-none" />
            </Card>

            <Card className="border-none shadow-sm bg-white p-8 space-y-6 rounded-[2.5rem]">
               <div className="flex items-center space-x-3 text-lns-navy border-b border-lns-border pb-4">
                  <Calendar size={20} />
                  <h4 className="text-xs font-black uppercase tracking-widest">School Timeline</h4>
               </div>
               <div className="space-y-4">
                  {[
                    { event: "Parent-Teacher Council", date: "April 18", time: "18:00" },
                    { event: "Mid-Term Assessment Hub", date: "April 24", time: "09:00" },
                  ].map(e => (
                    <div key={e.event} className="group cursor-pointer">
                       <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest mb-1">{e.date} • {e.time}</p>
                       <p className="text-sm font-bold text-lns-navy group-hover:text-lns-red transition-all">{e.event}</p>
                    </div>
                  ))}
               </div>
               <Link href="/calendar" className="block">
                  <Button variant="ghost" className="w-full h-12 bg-lns-light-grey text-lns-mid-grey hover:text-lns-navy rounded-xl text-[10px] font-black uppercase tracking-widest">Full Institutional Calendar</Button>
               </Link>
            </Card>
         </div>
      </div>
    </div>
  );
}
