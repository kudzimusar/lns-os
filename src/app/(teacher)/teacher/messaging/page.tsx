"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  MessageSquare, 
  Search, 
  Send, 
  User, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  MoreVertical,
  Translate,
  Ghost
} from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";

export default function MessagingPage() {
  const [messages, setMessages] = useState<any[]>([]); // Simulation: No messages yet

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-6 animate-in fade-in duration-500 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">Direct Comms</h1>
          <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Encrypted Parent-Teacher Liaison Node</p>
        </div>
        <Button className="rounded-xl h-12 px-6 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-lns-navy/20">
           <Send size={18} className="mr-2" /> New Channel
        </Button>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden">
         {/* Inbox Sidebar */}
         <Card className="w-80 border-none shadow-sm bg-white shrink-0 overflow-y-auto hidden lg:flex flex-col">
            <div className="p-4 border-b border-lns-border">
               <div className="flex items-center bg-lns-light-grey rounded-xl px-4 py-2 border border-lns-border/20">
                  <Search size={14} className="text-lns-mid-grey mr-2" />
                  <input placeholder="Search channels..." className="bg-transparent border-none text-xs focus:ring-0" />
               </div>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
               <Ghost className="text-lns-light-grey" size={48} />
               <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">No active threads</p>
            </div>
         </Card>

         {/* Chat Canvas with Empty State */}
         <Card className="flex-1 border-none shadow-xl bg-white overflow-hidden flex flex-col rounded-[2.5rem]">
            <div className="flex-1 flex items-center justify-center p-12">
               <EmptyState 
                 icon={MessageSquare}
                 title="Clear Comms Channel"
                 description="You haven't initiated any secure communication protocols with parents or students yet."
                 actionLabel="Open New Channel"
                 onAction={() => {}}
               />
            </div>

            <div className="p-6 bg-lns-light-grey/30 border-t border-lns-border opacity-50 pointer-events-none">
               <div className="flex items-center space-x-3 bg-white p-4 rounded-3xl border border-lns-border shadow-inner">
                  <input placeholder="Establish connection node..." className="bg-transparent border-none text-sm w-full" disabled />
                  <Button size="icon" className="rounded-2xl h-12 w-12 bg-lns-navy opacity-50"><Send size={20}/></Button>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
}
