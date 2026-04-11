"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Building2, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Timer, 
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const schools = [
  { id: "LNS-UK-001", name: "Lennon Nash High School", status: "Active", plan: "Premium", users: "1.2k", lastActive: "2m ago" },
  { id: "LNS-US-042", name: "St. Patrick's Academy", status: "Active", plan: "Standard", users: "850", lastActive: "14m ago" },
  { id: "LNS-ZA-088", name: "Cape Leadership Hub", status: "Trial", plan: "Trial", users: "120", lastActive: "1h ago" },
  { id: "LNS-FR-012", name: "Lyon Education Node", status: "Pending", plan: "Standard", users: "0", lastActive: "N/A" },
  { id: "LNS-DE-055", name: "Berlin Tech Global", status: "Suspended", plan: "Premium", users: "2.1k", lastActive: "4d ago" },
];

export default function SchoolsManagement() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-widest uppercase italic">Institutional <span className="text-lns-red">Fleet</span></h1>
          <p className="text-[#4A5568] font-bold uppercase tracking-widest text-[10px] mt-1">Sovereign School Nodes Managed: 142</p>
        </div>
        <div className="flex items-center space-x-3">
           <Button className="bg-lns-red hover:bg-red-700 text-white h-12 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-[0_0_20px_rgba(214,43,43,0.2)]">
              Approve Pending Nodes
           </Button>
        </div>
      </div>

      <Card className="bg-[#1A1F37] border-none shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center bg-black/20 rounded-xl px-4 w-full max-w-sm border border-white/5">
              <Search className="text-[#4A5568]" size={16} />
              <input type="text" placeholder="Search by Node ID or Institution Name..." className="bg-transparent border-none focus:ring-0 text-xs px-3 py-3 w-full text-white" />
           </div>
           <div className="flex items-center space-x-2">
              <Button variant="ghost" className="text-[10px] font-black uppercase text-[#4A5568] hover:text-white">
                 <Filter size={16} className="mr-2" />
                 Status: All
              </Button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-black/10">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#4A5568]">Institution Node</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#4A5568] text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#4A5568] text-center">Subscription</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#4A5568] text-center">Active Nodes</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#4A5568] text-right">Audit Trail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {schools.map((school) => (
                <tr key={school.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-[1.25rem] bg-black/30 flex items-center justify-center text-white border border-white/10 shadow-lg group-hover:border-lns-red transition-all">
                         <Building2 size={20} className="text-[#4A5568] group-hover:text-lns-red" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white group-hover:text-lns-red transition-color tracking-tight">{school.name}</p>
                        <p className="text-[10px] text-[#4A5568] font-black tracking-widest uppercase mt-0.5">{school.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                       <div className={cn(
                         "flex items-center space-x-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic border",
                         school.status === "Active" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                         school.status === "Pending" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                         school.status === "Suspended" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                         "bg-blue-500/10 text-blue-500 border-blue-500/20"
                       )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full", 
                            school.status === "Active" ? "bg-green-500 animate-pulse" : 
                            school.status === "Pending" ? "bg-amber-500" :
                            school.status === "Suspended" ? "bg-red-500" : "bg-blue-500"
                          )} />
                          <span>{school.status}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-black text-white text-center uppercase tracking-widest">{school.plan}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center space-x-2">
                       <Users size={14} className="text-[#4A5568]" />
                       <span className="text-xs font-black text-white">{school.users}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <Button size="icon" variant="ghost" className="h-9 w-9 text-[#4A5568] hover:text-white">
                          <ShieldCheck size={18} />
                       </Button>
                       <Button size="icon" variant="ghost" className="h-9 w-9 text-[#4A5568] hover:text-white">
                          <ChevronRight size={18} />
                       </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <div className="flex justify-center">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#4A5568] py-8 border-t border-white/5 w-full text-center">
            Global Institutional Authorization Protocol Active
         </p>
      </div>
    </div>
  );
}
