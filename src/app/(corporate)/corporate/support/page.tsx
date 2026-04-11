"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Inbox, 
  MessageSquare, 
  Search, 
  Filter, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  MoreVertical,
  Flag,
  User,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

const tickets = [
  { id: "TK-7742", school: "Lennon Nash High", subject: "Grade Ledger Sync Error", priority: "Critical", status: "Open", age: "24m", agent: "Alex" },
  { id: "TK-8810", school: "St. Patrick's Academy", subject: "SLA Request Q3", priority: "High", status: "In Progress", age: "2h", agent: "Unassigned" },
  { id: "TK-9904", school: "Cape Leadership Hub", subject: "Forgot Security Key", priority: "Medium", status: "Open", age: "4h", agent: "Sarah" },
];

export default function CorporateSupportInbox() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">Global <span className="text-lns-red">Inbox</span></h1>
          <p className="text-[#4A5568] font-bold uppercase tracking-widest text-[10px] mt-1">SLA Achievement: 98.4% • Critical Tickets: 01</p>
        </div>
        <div className="flex bg-[#1A1F37] p-1 rounded-2xl border border-white/5">
           <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-white bg-white/5 px-6">Active (12)</Button>
           <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-[#4A5568] px-6">Resolved (850)</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="space-y-6">
            <Card className="bg-[#1A1F37] border-none shadow-2xl p-8 space-y-6">
               <h3 className="text-xs uppercase tracking-[0.3em] font-black text-white">SLA Sentinel</h3>
               <div className="space-y-4">
                  {[
                    { priority: "Critical", sla: "2h", achievement: 100 },
                    { priority: "High", sla: "24h", achievement: 98 },
                    { priority: "Medium", sla: "72h", achievement: 96 },
                  ].map(item => (
                    <div key={item.priority} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className={item.priority === "Critical" ? "text-lns-red" : "text-white"}>{item.priority}</span>
                          <span className="text-[#4A5568]">{item.achievement}%</span>
                       </div>
                       <div className="h-1 bg-black/50 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", item.priority === "Critical" ? "bg-lns-red" : "bg-blue-500")} style={{width: `${item.achievement}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </Card>

            <Card className="bg-[#1A1F37] border-none shadow-2xl p-8 text-center space-y-4">
               <MessageSquare size={32} className="mx-auto text-lns-red" />
               <p className="text-xs font-black text-white uppercase tracking-widest">Auto-Assign Enabled</p>
               <div className="w-12 h-6 bg-green-500/20 rounded-full relative mx-auto">
                  <div className="w-4 h-4 bg-green-500 rounded-full absolute top-1 right-1" />
               </div>
            </Card>
         </div>

         <Card className="lg:col-span-3 bg-[#1A1F37] border-none shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div className="flex items-center bg-black/20 rounded-xl px-4 w-full max-w-sm border border-white/5">
                  <Search className="text-[#4A5568]" size={16} />
                  <input type="text" placeholder="Filter by school, user or key..." className="bg-transparent border-none focus:ring-0 text-xs px-3 py-3 w-full text-white" />
               </div>
               <div className="flex items-center space-x-2">
                  <Button variant="ghost" className="text-[10px] font-black uppercase text-[#4A5568] hover:text-white">
                     <Filter size={16} className="mr-2" />
                     Priority: High+
                  </Button>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-white/5 bg-black/10">
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#4A5568]">Issue Hub</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#4A5568] text-center">Priority</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#4A5568] text-center">Age</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#4A5568] text-center">Status</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#4A5568] text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                     {tickets.map(tk => (
                        <tr key={tk.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                           <td className="px-8 py-6">
                              <div className="flex items-start space-x-4">
                                 <div className={cn(
                                   "w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center text-white border border-white/10",
                                   tk.priority === "Critical" ? "border-lns-red/50 text-lns-red" : ""
                                 )}>
                                    <MessageSquare size={16} />
                                 </div>
                                 <div className="max-w-[180px] sm:max-w-xs">
                                    <p className="text-sm font-black text-white group-hover:text-lns-red transition-all truncate uppercase tracking-tight">{tk.subject}</p>
                                    <p className="text-[10px] text-[#4A5568] font-black tracking-widest uppercase mt-0.5">{tk.school} • {tk.id}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <span className={cn(
                                 "text-[9px] font-black uppercase tracking-widest italic",
                                 tk.priority === "Critical" ? "text-lns-red" : tk.priority === "High" ? "text-amber-500" : "text-[#4A5568]"
                              )}>{tk.priority}</span>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <div className="flex items-center justify-center space-x-1.5 text-[10px] font-black text-white">
                                 <Clock size={12} className="text-[#4A5568]" />
                                 <span>{tk.age}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <div className="flex justify-center">
                                 <span className={cn(
                                   "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
                                   tk.status === "Open" ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                 )}>
                                    {tk.status}
                                 </span>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                 <Button size="icon" variant="ghost" className="h-9 w-9 text-[#4A5568] hover:text-white">
                                    <Flag size={18} />
                                 </Button>
                                 <Button size="icon" variant="ghost" className="h-9 w-9 text-[#4A5568] hover:text-white">
                                    <ExternalLink size={18} />
                                 </Button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Card>
      </div>
    </div>
  );
}
