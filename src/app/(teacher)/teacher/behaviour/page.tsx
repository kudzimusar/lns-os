"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Plus, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  Award,
  TrendingUp,
  History,
  ShieldCheck,
  Search,
  Users,
  MessageSquare,
  FileText,
  BadgeAlert,
  Calendar,
  X,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

const behaviorLogs = [
  { id: 1, student: "Abraham Lincoln", type: "Positive", points: "+5", reason: "Leadership in Humanities", timestamp: "Today, 09:15" },
  { id: 2, student: "Benjamin Franklin", type: "Concern", points: "-2", reason: "Disruptive in Lab", timestamp: "Today, 11:20" },
  { id: 3, student: "Catherine Great", type: "Positive", points: "+10", reason: "Community Service Hub", timestamp: "Yesterday" },
];

export default function BehaviourPage() {
  const [tab, setTab] = useState<"logs" | "merits" | "iep" | "interventions">("logs");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Behaviour & Wellbeing</h1>
          <p className="text-lns-mid-grey font-medium">Capture citizenship metrics and wellbeing events on-ledger.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-lns-border">
          {["logs", "merits", "iep", "interventions"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                tab === t ? "bg-lns-navy text-white shadow-lg" : "text-lns-mid-grey hover:text-lns-navy"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "logs" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in duration-300">
          <Card className="md:col-span-1 border-none shadow-xl bg-lns-navy text-white p-8 flex flex-col justify-center space-y-4">
             <Award className="text-lns-red" size={40} />
             <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey">Global Merits</p>
                <h2 className="text-4xl font-[900]">14.2k</h2>
             </div>
             <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">Week-over-week</span>
                <span className="text-green-500 text-xs font-black">+12%</span>
             </div>
          </Card>

          <Card className="md:col-span-3 border-none shadow-sm bg-white overflow-hidden">
             <CardHeader className="bg-lns-light-grey/20 border-b border-lns-border flex flex-row items-center justify-between">
                <CardTitle className="text-xs uppercase tracking-[0.2em] text-lns-navy">Live Behaviour Log</CardTitle>
                <Button size="sm" className="h-8 rounded-lg bg-lns-red hover:bg-red-700">Add Log</Button>
             </CardHeader>
             <CardContent className="p-0">
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="border-b border-lns-border bg-lns-light-grey/10">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Student</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Event Type</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Impact</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Reason</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-right">Time</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-lns-border">
                         {behaviorLogs.map((log) => (
                           <tr key={log.id} className="hover:bg-lns-light-grey/20 transition-colors group cursor-pointer">
                              <td className="px-6 py-4">
                                 <span className="text-sm font-bold text-lns-navy group-hover:text-lns-red transition-all">{log.student}</span>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex justify-center">
                                    <span className={cn(
                                      "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter",
                                      log.type === "Positive" ? "bg-green-100 text-green-700" :
                                      log.type === "Concern" ? "bg-amber-100 text-amber-700" :
                                      "bg-red-100 text-red-600"
                                    )}>
                                       {log.type}
                                    </span>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <span className={cn(
                                   "text-sm font-black",
                                   log.points.startsWith('+') ? "text-green-600" : "text-lns-red"
                                 )}>{log.points}</span>
                              </td>
                              <td className="px-6 py-4">
                                 <p className="text-xs text-lns-mid-grey font-medium max-w-[200px] truncate">{log.reason}</p>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase">{log.timestamp}</span>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </CardContent>
          </Card>
        </div>
      )}

      {tab === "merits" && (
        <div className="space-y-6 animate-in fade-in duration-300">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Eagle House", "Lion House", "Phoenix House"].map((house, i) => (
                <Card key={house} className="border-none shadow-sm bg-white p-6 overflow-hidden relative">
                   <div className="relative z-10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">{house}</p>
                      <h3 className="text-3xl font-[900] text-lns-navy mt-1">
                        {i === 0 ? "4,221" : i === 1 ? "3,890" : "4,015"}
                      </h3>
                      <div className="w-full bg-lns-light-grey h-2 rounded-full mt-4 overflow-hidden">
                         <div className={cn("h-full", i === 0 ? "bg-amber-400 w-[80%]" : i === 1 ? "bg-lns-red w-[70%]" : "bg-lns-navy w-[75%]")} />
                      </div>
                   </div>
                   <Star className="absolute -bottom-4 -right-4 text-lns-light-grey/50" size={80} />
                </Card>
              ))}
           </div>
           
           <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader>
                 <CardTitle className="text-sm">Global Badge Leaderboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 {[
                   { badge: "Digital Citizen", icon: ShieldCheck, color: "text-blue-600", holders: 450 },
                   { badge: "Elite Researcher", icon: FileText, color: "text-purple-600", holders: 85 },
                   { badge: "Code of Honour", icon: Award, color: "text-amber-500", holders: 1205 },
                 ].map((badge) => (
                   <div key={badge.badge} className="flex items-center justify-between p-4 rounded-2xl bg-lns-light-grey/50 border border-lns-border/30">
                      <div className="flex items-center space-x-4">
                         <div className={cn("w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm", badge.color)}>
                            <badge.icon size={24} />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-lns-navy">{badge.badge}</p>
                            <p className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-widest">{badge.holders} Holders</p>
                         </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs font-black uppercase tracking-widest text-lns-navy">View All</Button>
                   </div>
                 ))}
              </CardContent>
           </Card>
        </div>
      )}

      {tab === "iep" && (
        <div className="space-y-6 animate-in fade-in duration-300">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-lns-navy">Special Educational Needs (SEN)</h3>
              <Button size="sm"><Plus size={16} className="mr-2" /> New IEP Profile</Button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Jordan V.", need: "Dysgraphia", focus: "Typing assistance for exams", file: "IEP_JORDAN_2026.pdf" },
                { name: "Maya S.", need: "ADHD (Combined)", focus: "Frequent movement breaks", file: "MAYA_STRATEGIES.pdf" },
              ].map((student) => (
                <Card key={student.name} className="border-none shadow-xl bg-white overflow-hidden border-l-4 border-lns-red">
                   <CardContent className="p-8 space-y-4">
                      <div className="flex justify-between items-start">
                         <div>
                            <h4 className="text-xl font-[900] text-lns-navy">{student.name}</h4>
                            <span className="text-[9px] font-black uppercase tracking-widest bg-lns-red/10 text-lns-red px-2 py-0.5 rounded italic">{student.need}</span>
                         </div>
                         <Button variant="ghost" size="icon" className="h-10 w-10"><MoreVertical size={20} /></Button>
                      </div>
                      <div className="p-4 bg-lns-light-grey/50 rounded-2xl space-y-2">
                         <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Primary Instruction</p>
                         <p className="text-sm font-medium text-lns-navy">{student.focus}</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-lns-border">
                         <div className="flex items-center space-x-2 text-xs font-bold text-lns-mid-grey">
                            <FileText size={16} />
                            <span>{student.file}</span>
                         </div>
                         <Button size="sm" variant="outline" className="text-[10px] font-black uppercase tracking-widest">Update Plan</Button>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>
      )}

      {tab === "interventions" && (
        <div className="space-y-6 animate-in fade-in duration-300">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-lns-navy">Intervention Tracker</h3>
              <Button size="sm"><Plus size={16} className="mr-2" /> Log Meeting</Button>
           </div>
           <div className="space-y-4">
              {[
                { student: "David Copperfield", agenda: "Late arrival patterns", notes: "Agreed on new morning transit route. Parent to verify departure.", date: "10 Apr, 2026", nextReview: "24 Apr, 2026", status: "Open" },
                { student: "John Smith", agenda: "Engagement drop in Period 5", notes: "Discussed peer conflicts. Moving seating position.", date: "08 Apr, 2026", nextReview: "21 Apr, 2026", status: "Resolved" },
              ].map((int) => (
                <Card key={int.student} className="border-none shadow-sm bg-white overflow-hidden">
                   <CardContent className="p-0 flex flex-col md:flex-row">
                      <div className={cn("p-8 w-full md:w-64 border-r border-lns-border bg-lns-light-grey/20", int.status === "Resolved" ? "opacity-50" : "")}>
                         <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Student Node</p>
                         <h4 className="text-lg font-bold text-lns-navy">{int.student}</h4>
                         <p className="text-xs font-bold text-lns-red uppercase mt-4">Next Review:</p>
                         <p className="text-xs font-medium text-lns-mid-grey">{int.nextReview}</p>
                      </div>
                      <div className="p-8 flex-1 space-y-4">
                         <div className="flex justify-between">
                            <h5 className="font-bold text-lns-navy">{int.agenda}</h5>
                            <span className="text-[10px] font-black text-slate-400 uppercase">{int.date}</span>
                         </div>
                         <p className="text-sm text-lns-mid-grey leading-relaxed bg-white p-4 rounded-2xl border border-lns-border shadow-inner italic">
                            "{int.notes}"
                         </p>
                         <div className="flex justify-end space-x-2">
                            <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-lns-navy">Edit Notes</Button>
                            <Button className="h-9 px-6 bg-lns-navy text-white rounded-lg text-[10px] font-black uppercase">Approve & Close</Button>
                         </div>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>
      )}
    </div>
  );
}
