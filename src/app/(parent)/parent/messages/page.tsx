"use client";

import React from "react";
import PageShell from "@/components/ui/PageShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  MessageSquare, 
  Search, 
  Plus, 
  ArrowRight,
  User,
  Shield,
  Circle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

const threads = [
  {
    id: "thread_1",
    name: "Mr. James Okafor",
    role: "Mathematics Lead",
    lastMsg: "Amara's recent test result was exceptional. Let's discuss...",
    time: "10:24 AM",
    unread: true,
    tag: "Academic"
  },
  {
    id: "thread_2",
    name: "School Administration",
    role: "Official Channel",
    lastMsg: "Term 2 fee invoices have been sealed and released to your portal.",
    time: "Yesterday",
    unread: false,
    tag: "Finance"
  },
  {
    id: "thread_3",
    name: "Mrs. Amina Hassan",
    role: "Humanities Teacher",
    lastMsg: "The upcoming field trip to the National Museum is now open...",
    time: "2 days ago",
    unread: false,
    tag: "Events"
  }
];

export default function ParentMessagesPage() {
  return (
    <PageShell 
      title="Messaging Centre" 
      description="Quantum-encrypted communication gateway between home and school."
    >
      <div className="space-y-8 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C92A0]" size={16} />
              <input 
                type="text" 
                placeholder="Search secure threads..."
                className="w-full h-12 pl-12 pr-4 bg-white rounded-xl border border-gray-100 text-xs font-bold text-[#0A1F44] focus:ring-2 focus:ring-[#D62B2B] transition-all"
              />
           </div>
           <Button className="bg-[#0A1F44] hover:bg-[#152C53] text-white rounded-xl h-12 px-8 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg shadow-[#0A1F44]/20 active:scale-95 transition-all">
              <Plus size={18} /> Compose New
           </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
           {threads.map((thread, i) => (
             <motion.div
               key={thread.id}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
             >
               <Card className={cn(
                 "border-none shadow-sm hover:shadow-xl transition-all group cursor-pointer overflow-hidden",
                 thread.unread ? "bg-white ring-1 ring-[#D62B2B]/20" : "bg-white"
               )}>
                 <CardContent className="p-0">
                    <div className="flex items-center p-6 gap-6">
                       <div className="relative">
                          <div className="w-14 h-14 rounded-full bg-[#0A1F44]/5 flex items-center justify-center text-[#0A1F44]">
                             <User size={28} />
                          </div>
                          {thread.unread && (
                            <div className="absolute top-0 right-0 w-4 h-4 bg-[#D62B2B] border-4 border-white rounded-full animate-pulse" />
                          )}
                       </div>
                       
                       <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <h4 className={cn(
                                   "text-sm font-black uppercase tracking-tight",
                                   thread.unread ? "text-[#0A1F44]" : "text-[#0A1F44]/70"
                                )}>{thread.name}</h4>
                                <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-[#F4F5F7] text-[#8C92A0] tracking-widest">{thread.tag}</span>
                             </div>
                             <span className="text-[10px] font-bold text-[#8C92A0] uppercase">{thread.time}</span>
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#D62B2B]/80">{thread.role}</p>
                          <p className={cn(
                             "text-xs truncate",
                             thread.unread ? "text-[#0A1F44] font-bold" : "text-[#8C92A0] font-medium"
                          )}>{thread.lastMsg}</p>
                       </div>
                       
                       <div className="flex items-center gap-4">
                          <div className="hidden lg:flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                             <Shield size={12} className="text-green-600" />
                             <span className="text-[9px] font-black text-green-700 uppercase tracking-widest">Verified Edge</span>
                          </div>
                          <ArrowRight size={20} className="text-gray-200 group-hover:text-[#D62B2B] transition-all translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                       </div>
                    </div>
                 </CardContent>
               </Card>
             </motion.div>
           ))}
        </div>

        {/* Security Info */}
        <div className="bg-[#F4F5F7] p-8 rounded-[2rem] border border-dashed border-gray-200 flex flex-col items-center text-center space-y-4">
           <div className="flex items-center space-x-2 text-[#0A1F44]">
              <Circle size={8} className="fill-green-500 text-green-500" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Encryption Matrix Active</h4>
           </div>
           <p className="text-xs font-dm-sans font-bold text-[#8C92A0] max-w-md leading-relaxed">
              All messages are routed through the LNS Secure Node. Transcripts are cryptographically sealed and accessible only to authorized institutional participants.
           </p>
        </div>
      </div>
    </PageShell>
  );
}
