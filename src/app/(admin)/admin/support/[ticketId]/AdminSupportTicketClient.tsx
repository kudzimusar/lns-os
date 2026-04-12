"use client";

import React from "react";
import { 
  ArrowLeft, 
  MessageSquare, 
  ShieldCheck, 
  Send, 
  User, 
  Clock, 
  Zap, 
  Activity,
  MoreVertical,
  Paperclip,
  CheckCircle2,
  Lock
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ticket = {
  id: 'TKT-882',
  subject: 'Node Sync Latency',
  requester: 'Mr. James Okafor',
  role: 'Faculty',
  priority: 'High',
  status: 'Open',
  created: '2 hrs ago',
  messages: [
    { id: 1, sender: 'James Okafor', role: 'Faculty', text: 'Institutional terminal at Gateway 4 is reporting a 120ms sync latency. This is affecting real-time attendance locks for Grade 10A.', timestamp: '2 hrs ago' },
    { id: 2, sender: 'Admin Hub', role: 'System', text: 'Topology check initiated. Routing through shard-02 seems stable. Please re-initialize the terminal node.', timestamp: '1 hr ago' },
  ]
};


export default function AdminSupportTicketClient({ params }: { params: { ticketId: string } }) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 p-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div className="space-y-2">
           <Link href="/admin/support" className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-mid-grey hover:text-lns-red flex items-center gap-2 transition-colors">
              <ArrowLeft size={14} /> Back to Support Lattice
           </Link>
           <h1 className="text-4xl font-[900] text-lns-navy tracking-tighter leading-tight uppercase italic flex items-center gap-4">
              Ticket {ticket.id}
           </h1>
           <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest italic tracking-tight">{ticket.subject} • Priority: {ticket.priority}</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="px-4 py-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              {ticket.status} Status
           </div>
           <Button variant="outline" className="h-10 w-10 p-0 border-gray-100 rounded-xl bg-white shadow-sm flex items-center justify-center">
              <MoreVertical size={18} />
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Main Thread (75%) */}
         <div className="lg:col-span-3 space-y-6">
            <div className="space-y-6">
               {ticket.messages.map((msg) => (
                 <div key={msg.id} className={cn(
                   "flex flex-col gap-2",
                   msg.role === 'Faculty' ? "items-start" : "items-end"
                 )}>
                    <div className={cn(
                      "max-w-[85%] p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden",
                      msg.role === 'Faculty' ? "bg-white text-lns-navy rounded-tl-none border border-gray-50" : "bg-lns-navy text-white rounded-tr-none"
                    )}>
                       <div className="flex items-center gap-3 mb-4 opacity-40">
                          <User size={14} />
                          <span className="text-[9px] font-black uppercase tracking-widest">{msg.sender} • {msg.role}</span>
                       </div>
                       <p className="text-sm font-medium italic leading-relaxed">{msg.text}</p>
                       <ShieldCheck size={120} className="absolute -bottom-10 -right-10 text-black/5 pointer-events-none" />
                    </div>
                    <span className="px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{msg.timestamp}</span>
                 </div>
               ))}
            </div>

            {/* Response Composer */}
            <Card className="p-8 border-none shadow-2xl bg-white rounded-[3rem] space-y-6 mt-10 border-t-8 border-lns-red">
               <textarea 
                 className="w-full h-32 bg-gray-50 border border-gray-100 rounded-[2rem] p-8 text-sm font-bold italic text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner resize-none" 
                 placeholder="Deploy response node to faculty..."
               />
               <div className="flex items-center justify-between">
                  <Button variant="ghost" className="h-12 w-12 rounded-2xl bg-gray-50 text-slate-400 hover:text-lns-navy p-0 flex items-center justify-center transition-all">
                     <Paperclip size={20} />
                  </Button>
                  <Button className="h-14 bg-lns-navy text-white hover:bg-lns-red rounded-2xl px-10 font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all flex items-center gap-3">
                     Synchronize Node
                     <Send size={18} />
                  </Button>
               </div>
            </Card>
         </div>

         {/* Sidebar Bio (25%) */}
         <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-4 italic">Node Integrity</h3>
            <Card className="p-8 bg-lns-navy rounded-[3rem] text-white border-none shadow-2xl space-y-8 relative overflow-hidden group">
               <div className="relative z-10 space-y-6 text-center">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-white text-lns-navy flex items-center justify-center text-3xl font-black shadow-2xl mx-auto group-hover:rotate-6 transition-transform">
                     {ticket.requester.charAt(0)}
                  </div>
                  <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase text-slate-400">Node Identification</p>
                     <h4 className="text-xl font-black italic uppercase tracking-tight">{ticket.requester}</h4>
                     <p className="text-[10px] font-black text-lns-red uppercase tracking-widest">{ticket.role}</p>
                  </div>
                  <div className="pt-4 border-t border-white/10 space-y-3">
                     <div className="flex justify-between text-[9px] font-black uppercase text-slate-500">
                        <span>Identity Lock</span>
                        <span className="text-white">Active</span>
                     </div>
                     <div className="flex justify-between text-[9px] font-black uppercase text-slate-500">
                        <span>Last Contact</span>
                        <span className="text-white">14m Ago</span>
                     </div>
                  </div>
               </div>
               <Activity className="absolute -bottom-20 -right-20 text-white/5 w-80 h-80 pointer-events-none" />
            </Card>

            <div className="p-6 bg-green-50 rounded-2xl border-2 border-dashed border-green-200 text-center space-y-3">
               <Zap size={28} className="text-green-600 mx-auto" />
               <p className="text-[9px] font-black uppercase tracking-widest text-green-700 leading-relaxed italic">
                  Critical resolution node is synchronized with the LNS Hub encryption lattice.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
