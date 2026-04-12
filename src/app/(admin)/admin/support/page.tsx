"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Plus, 
  ChevronRight, 
  TrendingUp, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  Zap,
  Activity,
  Monitor
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tickets = [
  { id: 'TKT-882', subject: 'Node Sync Latency', requester: 'Mr. James Okafor', role: 'Faculty', priority: 'High', status: 'Open', created: '2 hrs ago' },
  { id: 'TKT-881', subject: 'Enrollment Hash Mismatch', requester: 'Admin Hub 4', role: 'System', priority: 'Critical', status: 'In Progress', created: '4 hrs ago' },
  { id: 'TKT-880', subject: 'Parent Access Bridge', requester: 'Elena Petrov', role: 'Parent', priority: 'Medium', status: 'Pending', created: 'Yesterday' },
  { id: 'TKT-879', subject: 'QR Printer Calibration', requester: 'Reception Node', role: 'Staff', priority: 'Low', status: 'Resolved', created: '2 days ago' },
];

export default function AdminSupportInbox() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-1">
          <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
             <MessageSquare size={32} className="text-lns-red" />
             Support Lattice
          </h1>
          <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">Institutional Response Hub • Critical Resolution Center</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-14 bg-white border-gray-100 rounded-2xl px-8 font-black uppercase tracking-widest text-[10px] shadow-sm flex items-center gap-2">
             <Activity size={18} />
             System Health
          </Button>
        </div>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: "Active Tickets", val: "14", color: "text-lns-navy" },
           { label: "Critical Priority", val: "2", color: "text-lns-red" },
           { label: "Resolved Today", val: "42", color: "text-green-600" },
           { label: "MTTR (Avg)", val: "2.4h", color: "text-amber-500" },
         ].map((stat, i) => (
            <Card key={i} className="p-8 border-none shadow-xl bg-white rounded-[2rem] flex flex-col justify-between hover:shadow-2xl transition-all cursor-default group border-b-4 border-transparent hover:border-lns-red">
               <p className="text-3xl font-[900] text-lns-navy tracking-tighter group-hover:text-lns-red transition-colors">{stat.val}</p>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey mt-1">{stat.label}</p>
            </Card>
         ))}
      </div>

      {/* Inbox Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-lns-red transition-colors" size={20} />
            <input placeholder="Search Tickets by ID, Requester, or Subject Node..." className="w-full h-16 bg-white rounded-[2rem] pl-16 pr-8 shadow-xl border border-gray-100 font-bold text-sm text-lns-navy outline-none focus:ring-4 focus:ring-lns-red/5 transition-all" />
         </div>
         <div className="flex items-center gap-3">
            {["All", "Open", "Critical", "Resolved"].map(f => (
               <button 
                 key={f}
                 onClick={() => setFilter(f.toLowerCase())}
                 className={cn("px-6 h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all", filter === f.toLowerCase() ? "bg-lns-navy text-white shadow-xl" : "bg-white text-slate-400 hover:bg-gray-50")}
               >
                  {f}
               </button>
            ))}
         </div>
      </div>

      {/* Tickets Feed */}
      <div className="space-y-4">
         {tickets.map((ticket) => (
            <Link key={ticket.id} href={`/admin/support/${ticket.id}`} className="block">
               <Card className="p-8 border-none shadow-xl bg-white rounded-[2.5rem] hover:translate-x-2 transition-transform group cursor-pointer border-l-8 border-transparent hover:border-lns-red flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                     <div className={cn(
                       "w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-xs shadow-xl transition-all group-hover:scale-110",
                       ticket.priority === 'Critical' ? "bg-lns-red text-white" : "bg-lns-navy text-white"
                     )}>
                        {ticket.priority === 'Critical' ? <AlertCircle size={28} /> : <MessageSquare size={28} />}
                     </div>
                     <div className="space-y-1">
                        <div className="flex items-center gap-3">
                           <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{ticket.id}</span>
                           <span className={cn(
                             "px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest italic",
                             ticket.priority === 'Critical' ? "bg-red-50 text-lns-red" : "bg-gray-50 text-slate-500"
                           )}>
                              {ticket.priority} Priority
                           </span>
                        </div>
                        <h4 className="text-xl font-black text-lns-navy italic tracking-tight">{ticket.subject}</h4>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-lns-mid-grey italic uppercase tracking-widest">
                           <User size={12} /> {ticket.requester} • {ticket.role}
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-10">
                     <div className="text-right">
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">{ticket.created}</p>
                        <div className="flex items-center justify-end gap-2 mt-1">
                           <div className={cn("w-2 h-2 rounded-full", ticket.status === 'Resolved' ? "bg-green-500" : "bg-amber-500 animate-pulse")} />
                           <span className="text-[10px] font-black uppercase tracking-widest text-lns-navy">{ticket.status}</span>
                        </div>
                     </div>
                     <ChevronRight className="text-gray-200 group-hover:text-lns-navy transition-colors" size={32} />
                  </div>
               </Card>
            </Link>
         ))}
      </div>

      {/* Empty State Logic (Section 8) */}
      {tickets.length === 0 && (
         <Card className="p-20 border-none shadow-2xl bg-white rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-200 shadow-inner">
               <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
               <h3 className="text-2xl font-black text-lns-navy uppercase tracking-widest italic">Hub Status: Quiescent</h3>
               <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">All institutional resolution nodes are fulfilled.</p>
            </div>
         </Card>
      )}

      {/* Footer System Meta */}
      <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
         <div className="flex items-center gap-8 text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">
            <div className="flex items-center gap-2"><Zap size={14} /> Resolution Latency: 42ms</div>
            <div className="flex items-center gap-2 text-green-600"><ShieldCheck size={14} /> Global Compliance Synchronized</div>
         </div>
         <div className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">LNS OS // Support-Lattice V2.4</div>
      </div>
    </div>
  );
}
