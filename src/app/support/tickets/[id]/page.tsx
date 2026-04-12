"use client";

import React from "react";
import { 
  ArrowLeft, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  User, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Paperclip,
  Activity,
  Zap,
  Globe
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TICKET_DATA = {
  id: "TK-77421",
  subject: "Institutional Access Sync Latency",
  status: "Synchronizing",
  priority: "High",
  created: "2 hours ago",
  messages: [
    { sender: "Sarah Jenkins", role: "User", content: "I'm experiencing a 400ms latency when attempting to synchronize the Grade 10 English Lit ledger. The biometric handshake is completing, but the node persistence is hanging.", time: "2 hours ago" },
    { sender: "System Support Node", role: "Faculty Admin", content: "Protocol acknowledged. We are re-routing your identity node through the London Hub. Please re-initialize the scanner in 5 minutes.", time: "45 mins ago" },
  ]
};

export async function generateStaticParams() {
  return [
    { id: "TK-77421" },
    { id: "TK-77422" },
  ];
}

export default function SupportTicketDetailPage({ params }: { params: { id: string } }) {
  const [reply, setReply] = React.useState("");

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 pt-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100">
         <div className="space-y-1">
            <Link href="/support/tickets" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-lns-navy transition-colors mb-4">
               <ArrowLeft size={14} />
               Back to Active Requests
            </Link>
            <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-6">
               <MessageSquare size={36} className="text-lns-red" />
               Support Thread {TICKET_DATA.id}
            </h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest italic tracking-tight">{TICKET_DATA.subject} • Priority: {TICKET_DATA.priority}</p>
         </div>

         <div className={cn(
           "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest italic border shadow-sm",
           TICKET_DATA.status === "Synchronizing" ? "bg-amber-50 text-amber-600 border-amber-100 animate-pulse" : "bg-green-50 text-green-600 border-green-100"
         )}>
            {TICKET_DATA.status}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Messages Thread (75%) */}
         <div className="lg:col-span-3 space-y-8">
            <div className="space-y-6">
               {TICKET_DATA.messages.map((msg, i) => (
                 <div key={i} className={cn(
                   "flex flex-col gap-3",
                   msg.role === "User" ? "items-end" : "items-start"
                 )}>
                   <div className={cn(
                     "max-w-[85%] p-8 rounded-2xl shadow-xl relative overflow-hidden",
                     msg.role === "User" ? "bg-lns-navy text-white rounded-tr-none" : "bg-white text-lns-navy rounded-tl-none border border-gray-100"
                   )}>
                      <div className="flex items-center gap-3 mb-4 opacity-40">
                         <User size={14} />
                         <span className="text-[10px] font-black uppercase tracking-widest">{msg.sender} • {msg.role}</span>
                         <div className="w-1 h-1 bg-current rounded-full" />
                         <span className="text-[10px] font-black uppercase tracking-widest">{msg.time}</span>
                      </div>
                      <p className="text-sm font-medium italic leading-relaxed">{msg.content}</p>
                      {msg.role !== "User" && <ShieldCheck size={120} className="absolute -bottom-10 -right-10 text-lns-navy/5 pointer-events-none" />}
                   </div>
                 </div>
               ))}
            </div>

            {/* Reply Area */}
            <Card className="p-8 border-none shadow-2xl bg-white rounded-[3rem] space-y-6 mt-12 border-t-8 border-lns-red">
               <textarea 
                 className="w-full h-32 bg-gray-50 border border-gray-100 rounded-[2rem] p-8 text-sm font-bold italic text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner resize-none"
                 placeholder="Synchronize your response with the support node..."
                 value={reply}
                 onChange={(e) => setReply(e.target.value)}
               />
               <div className="flex items-center justify-between">
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-gray-50 text-slate-400 hover:bg-white hover:shadow-xl transition-all">
                     <Paperclip size={20} />
                  </Button>
                  <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-navy-600/20 active:scale-95 transition-all flex items-center gap-3">
                     Broadcast Message
                     <Send size={18} />
                  </Button>
               </div>
            </Card>
         </div>

         {/* Sidebar Stats (25%) */}
         <div className="space-y-8">
            <Card className="p-8 bg-lns-navy rounded-[3.5rem] border-none shadow-2xl text-white space-y-10 overflow-hidden relative group">
               <div className="relative z-10 space-y-6">
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Faculty Resolution</p>
                     <p className="text-2xl font-black italic tracking-tighter uppercase leading-none">Standard SLA Active</p>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2 text-center overflow-hidden">
                        <div className="flex justify-between items-end mb-1">
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Resolution Progress</p>
                           <p className="text-[9px] font-black uppercase tracking-widest text-lns-red">42% Latency</p>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-lns-red w-[42%] shadow-[0_0_20px_rgba(214,43,43,1)]" />
                        </div>
                     </div>
                     <p className="text-sm font-medium italic opacity-80 leading-relaxed text-slate-300">
                        "Your request is being processed by the Technical Oversight Node. Current queue position: #4."
                     </p>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none group-hover:scale-125 transition-transform" />
            </Card>

            <div className="p-6 bg-blue-500/5 rounded-2xl border-2 border-dashed border-blue-500/20 space-y-3 text-center">
               <ShieldCheck size={28} className="text-blue-500 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-blue-500/60 leading-relaxed italic">
                  Thread Persistence: Encrypted & On-Chain Verified.
               </p>
            </div>

            <Button variant="outline" className="w-full h-14 border-gray-100 rounded-2xl font-black uppercase tracking-widest text-[9px] text-slate-400 hover:bg-red-50 hover:text-lns-red hover:border-lns-red transition-all flex items-center justify-center gap-2">
               Initialize Ticket Deletion
            </Button>
         </div>
      </div>
    </div>
  );
}
