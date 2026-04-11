"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  LifeBuoy, 
  MessageSquare, 
  Plus, 
  Search, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  X,
  Send,
  Upload,
  Paperclip
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tickets = [
  { id: "TK-7742", subject: "Grade Ledger Sync Error", priority: "Critical", status: "In Progress", date: "Today, 10:15", category: "Technical" },
  { id: "TK-6621", subject: "Renewal Invoice Query", priority: "Medium", status: "Resolved", date: "2 Days ago", category: "Billing" },
  { id: "TK-5510", subject: "Feature Request: Export to JSON", priority: "Low", status: "Open", date: "Last Week", category: "Feature" },
];

export default function SupportTickets() {
  const [showNew, setShowNew] = useState(false);
  const [viewingTicket, setViewingTicket] = useState<any>(null);

  return (
    <main className="min-h-screen bg-lns-light-grey pb-20">
      <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-10 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
           <div className="flex items-center space-x-4">
              <Link href="/support">
                 <Button variant="outline" className="h-12 w-12 rounded-xl border-lns-border p-0">
                    <ChevronLeft size={20} />
                 </Button>
              </Link>
              <div>
                 <h1 className="text-3xl font-[900] text-lns-navy tracking-tight">Institutional Support Flow</h1>
                 <p className="text-lns-mid-grey font-medium uppercase tracking-widest text-[10px]">Secure Support Node • Session Active</p>
              </div>
           </div>
           <Button onClick={() => setShowNew(true)} className="h-14 px-8 bg-lns-navy text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-lns-navy/20">
              <Plus size={18} className="mr-2" /> Submit New Ticket
           </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Sidebar Stats */}
           <div className="space-y-6">
              <Card className="border-none shadow-sm bg-lns-navy text-white p-8 space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Response SLA</p>
                 <h3 className="text-4xl font-black">2.4h</h3>
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[95%]" />
                 </div>
                 <p className="text-[9px] font-bold text-slate-500 italic">95% Achievement Rate</p>
              </Card>
              
              <div className="space-y-2">
                 {["Open", "In Progress", "Resolved"].map(status => (
                    <div key={status} className="p-4 bg-white rounded-2xl flex items-center justify-between border border-lns-border/30">
                       <span className="text-xs font-bold text-lns-navy">{status}</span>
                       <span className="text-[10px] font-black text-lns-mid-grey">
                          {status === "Open" ? "1" : status === "In Progress" ? "1" : "142"}
                       </span>
                    </div>
                 ))}
              </div>
           </div>

           {/* Tickets List */}
           <div className="lg:col-span-3">
              <Card className="border-none shadow-sm bg-white overflow-hidden">
                 <div className="p-4 border-b border-lns-border flex items-center px-6">
                    <Search className="text-lns-mid-grey mr-3" size={16} />
                    <input placeholder="Search your ticket history..." className="bg-transparent border-none text-sm focus:ring-0 w-full" />
                 </div>
                 <div className="divide-y divide-lns-border">
                    {tickets.map(tk => (
                       <div key={tk.id} onClick={() => setViewingTicket(tk)} className="p-6 flex items-center justify-between hover:bg-lns-light-grey/30 cursor-pointer transition-all group">
                          <div className="flex items-start space-x-6">
                             <div className={cn(
                               "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner",
                               tk.priority === "Critical" ? "bg-red-50 text-lns-red" : "bg-lns-light-grey text-lns-navy"
                             )}>
                                <MessageSquare size={20} />
                             </div>
                             <div>
                                <h4 className="text-sm font-black text-lns-navy group-hover:text-lns-red transition-all">{tk.subject}</h4>
                                <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest mt-1">
                                   {tk.id} • {tk.category} • {tk.date}
                                </p>
                             </div>
                          </div>
                          <div className="flex items-center space-x-6">
                             <div className={cn(
                               "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border",
                               tk.status === "In Progress" ? "bg-blue-50 text-blue-600 border-blue-100 italic" :
                               tk.status === "Resolved" ? "bg-green-50 text-green-600 border-green-100" :
                               "bg-amber-50 text-amber-600 border-amber-100"
                             )}>
                                {tk.status}
                             </div>
                             <ChevronRight size={18} className="text-lns-border group-hover:text-lns-navy" />
                          </div>
                       </div>
                    ))}
                 </div>
              </Card>
           </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNew && (
         <div className="fixed inset-0 z-50 bg-lns-navy/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
            <Card className="w-full max-w-2xl border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
               <div className="p-8 border-b border-lns-border flex items-center justify-between">
                  <h3 className="text-xl font-black text-lns-navy uppercase tracking-tight">Initiate Support Node</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowNew(false)} className="rounded-full"><X size={20} /></Button>
               </div>
               <CardContent className="p-10 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest">Category</label>
                        <select className="w-full h-12 bg-lns-light-grey rounded-xl border-none px-4 text-sm font-bold text-lns-navy">
                           <option>Technical Issue</option>
                           <option>Billing / Subscription</option>
                           <option>Feature Request</option>
                           <option>SLA/Compliance Query</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest">Priority Node</label>
                        <select className="w-full h-12 bg-lns-light-grey rounded-xl border-none px-4 text-sm font-bold text-lns-navy">
                           <option>Low</option>
                           <option>Medium</option>
                           <option>High</option>
                           <option className="text-lns-red font-black">CRITICAL</option>
                        </select>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest">Subject</label>
                     <input placeholder="Short descriptive summary..." className="w-full h-12 bg-lns-light-grey rounded-xl border-none px-4 text-sm font-bold text-lns-navy" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest">Full Description</label>
                     <textarea rows={4} className="w-full bg-lns-light-grey rounded-3xl border-none p-6 text-sm font-medium italic" placeholder="Provide as much technical detail as possible..." />
                  </div>
                  <div className="p-6 border-2 border-dashed border-lns-border rounded-3xl flex items-center justify-center text-lns-mid-grey hover:border-lns-red transition-all cursor-pointer">
                     <Paperclip size={18} className="mr-3" />
                     <span className="text-xs font-black uppercase tracking-widest">Attach Visual Assets / Logs</span>
                  </div>
                  <Button className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl">
                     Submit to LNS Support Core
                  </Button>
               </CardContent>
            </Card>
         </div>
      )}

      {/* Ticket View Thread */}
      {viewingTicket && (
         <div className="fixed inset-0 z-50 bg-lns-navy/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
             <Card className="w-full max-w-3xl h-[80vh] border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden flex flex-col">
                <div className="p-8 border-b border-lns-border flex items-center justify-between shrink-0">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lns-red">{viewingTicket.id}</p>
                      <h3 className="text-xl font-black text-lns-navy uppercase tracking-tight">{viewingTicket.subject}</h3>
                   </div>
                   <Button variant="ghost" size="icon" onClick={() => setViewingTicket(null)} className="rounded-full"><X size={20} /></Button>
                </div>
                <div className="flex-1 overflow-y-auto p-10 space-y-10">
                   {/* User side */}
                   <div className="flex flex-col items-end space-y-2">
                      <div className="max-w-[80%] bg-lns-light-grey p-6 rounded-[2rem] rounded-tr-none text-sm font-medium leading-relaxed italic">
                         "We are seeing a 'Sync Failed' toast when attempting to commit the Term 1 Grade Ledger for Grade 10A. Is this related to the current blockchain maintenance window?"
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-lns-mid-grey">You • 10:15 AM</span>
                   </div>
                   
                   {/* Support side */}
                   <div className="flex flex-col items-start space-y-2">
                      <div className="flex items-center space-x-3 mb-2">
                         <div className="w-8 h-8 rounded-lg bg-lns-red flex items-center justify-center text-white"><LifeBuoy size={16} /></div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-lns-navy">LNS Support Agent (Core)</span>
                      </div>
                      <div className="max-w-[80%] bg-lns-navy text-white p-6 rounded-[2rem] rounded-tl-none text-sm font-medium leading-relaxed">
                         "Hello Sarah. Correct. We are currently performing a scheduled cryptographic upgrade on Node-04. Please hold sync operations for another 15 minutes. We will signal you once the ledger is ready for commit."
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Alex (Support) • 10:42 AM</span>
                   </div>
                </div>
                <div className="p-6 bg-lns-light-grey/50 border-t border-lns-border shrink-0">
                   <div className="flex items-center bg-white border border-lns-border rounded-2xl px-6 py-3 shadow-sm">
                      <input placeholder="Type your reply to the support core..." className="bg-transparent border-none text-sm focus:ring-0 w-full" />
                      <Button size="icon" className="h-10 w-10 p-0 rounded-xl bg-lns-navy text-white shadow-lg"><Send size={18} /></Button>
                   </div>
                </div>
             </Card>
         </div>
      )}
    </main>
  );
}

function ChevronLeft({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
}
