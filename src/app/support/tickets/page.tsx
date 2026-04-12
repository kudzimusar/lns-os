"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Tickets, 
  ArrowLeft, 
  Search, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  MessageSquare,
  LifeBuoy
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TICKETS = [
  { id: 't-001', subject: 'QR Scanner Variance', status: 'In Review', priority: 'High', date: '2026-04-11', lastActivity: '1 hour ago' },
  { id: 't-002', subject: 'Gradebook Sync Error', status: 'Resolved', priority: 'Medium', date: '2026-03-28', lastActivity: '2 weeks ago' },
  { id: 't-003', subject: 'Password Reset Authority', status: 'In Progress', priority: 'Low', date: '2026-04-12', lastActivity: '10 mins ago' },
];

export default function TicketsListPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div className="space-y-1">
            <Link href="/support" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-lns-mid-grey hover:text-lns-red transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Help Center
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-3">
               <Tickets size={32} className="text-lns-red" />
               Support Record Logs
            </h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic">All institutional variances and technical tickets.</p>
         </div>

         <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all">
            Deploy New Ticket
         </Button>
      </div>

      {/* Filter Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: "Active Nodes", count: 2, color: "text-amber-500" },
           { label: "Resolved", count: 24, color: "text-green-500" },
           { label: "High Priority", count: 1, color: "text-lns-red" },
           { label: "System Health", count: "99.8%", color: "text-lns-navy" },
         ].map((stat, i) => (
           <Card key={i} className="p-6 border-none shadow-sm bg-white rounded-2xl space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">{stat.label}</p>
              <p className={cn("text-2xl font-black", stat.color)}>{stat.count}</p>
           </Card>
         ))}
      </div>

      {/* Search/Filter Bar */}
      <Card className="p-4 border-none shadow-sm bg-white rounded-2xl flex items-center gap-4">
         <Search size={18} className="text-lns-mid-grey ml-2" />
         <input 
           placeholder="Search support logs by subject or record ID..." 
           className="bg-transparent border-none outline-none flex-1 text-xs font-bold text-lns-navy"
         />
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
         {TICKETS.map((ticket) => (
           <Link key={ticket.id} href={`/support/tickets/${ticket.id}`} className="block">
              <Card className="p-6 border-none shadow-xl bg-white rounded-[2rem] hover:translate-x-2 transition-transform group cursor-pointer border-l-8 border-transparent hover:border-lns-red">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-5">
                       <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-lns-navy group-hover:bg-lns-navy group-hover:text-white transition-all shadow-inner">
                          <MessageSquare size={24} />
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">{ticket.id} • {ticket.date}</p>
                          <h4 className="text-lg font-black text-lns-navy group-hover:text-lns-red transition-all">{ticket.subject}</h4>
                          <div className="flex flex-wrap gap-2 pt-1">
                             <span className={cn(
                               "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest italic",
                               ticket.status === 'Resolved' ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                             )}>
                                Status: {ticket.status}
                             </span>
                             <span className="px-2 py-0.5 rounded bg-gray-50 text-gray-400 text-[8px] font-black uppercase tracking-widest italic border border-gray-100">
                                Priority: {ticket.priority}
                             </span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                       <div className="flex flex-col items-end">
                          <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic">Last Response</p>
                          <p className="text-xs font-bold text-lns-navy">{ticket.lastActivity}</p>
                       </div>
                       <ChevronRight className="text-gray-200 group-hover:text-lns-navy" />
                    </div>
                 </div>
              </Card>
           </Link>
         ))}
      </div>

      <div className="p-10 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center gap-6 animate-in slide-in-from-bottom-2 duration-700">
         <LifeBuoy size={48} className="text-lns-navy/10" />
         <div className="space-y-1">
            <h4 className="text-sm font-black text-lns-navy uppercase">Institutional Integrity Standard</h4>
            <p className="text-xs text-lns-mid-grey max-w-sm italic">All support communications are encrypted end-to-end and stored within the institutional secure vault for audit purposes.</p>
         </div>
         <div className="flex items-center gap-2 text-[10px] font-black text-lns-navy bg-white shadow-xl shadow-navy-600/5 px-6 py-2 rounded-full border border-gray-50 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-green-500" />
            Blockchain Verified Thread Registry
         </div>
      </div>
    </div>
  );
}
