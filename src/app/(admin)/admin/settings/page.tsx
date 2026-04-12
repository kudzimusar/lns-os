"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Building2, 
  Calendar, 
  Settings2, 
  GraduationCap, 
  BellRing,
  QrCode,
  ShieldCheck,
  ChevronRight,
  Database,
  Lock,
  Globe
} from "lucide-react";

const configGroups = [
  {
    title: "School Identity",
    icon: Building2,
    items: ["School Name & Logo", "Campus Locations", "Contact Directories"]
  },
  {
    title: "Academic Configuration",
    icon: GraduationCap,
    items: ["Term Dates & Holidays", "Grading Scales (MYP/IB)", "Subject Weightings"]
  },
  {
    title: "System & Protocol",
    icon: ShieldCheck,
    items: ["Blockchain Sync Frequency", "QR Protocol Management", "Notification Thresholds"]
  }
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 px-4 md:px-0">
      {/* Header Section - Tablet Optimized */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-lns-navy tracking-tight uppercase">School Configuration</h1>
          <p className="text-xs md:text-sm text-lns-mid-grey font-medium uppercase tracking-widest italic">Institutional standards, grading protocols and ledger settings.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="hidden md:flex h-12 rounded-xl font-black uppercase text-[10px] tracking-widest bg-white border-lns-border shadow-sm">
             Export Config
           </Button>
           <Button className="w-full md:w-auto h-12 rounded-xl font-black uppercase text-[10px] tracking-widest bg-lns-red text-white hover:bg-red-700 shadow-lg shadow-lns-red/20 active:scale-95 transition-transform">
             Commit Protocol Changes
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {configGroups.map((group) => (
           <Card key={group.title} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-white rounded-2xl group border-t-4 border-transparent hover:border-lns-red">
              <CardHeader className="bg-lns-light-grey/20 border-b border-lns-border/5 p-6">
                 <CardTitle className="flex items-center text-xs uppercase tracking-[0.2em] text-lns-navy font-black">
                    <group.icon size={18} className="mr-3 text-lns-red group-hover:scale-110 transition-transform" />
                    {group.title}
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y divide-lns-border/5">
                    {group.items.map((item) => (
                      <div key={item} className="p-6 flex items-center justify-between hover:bg-lns-light-grey/10 cursor-pointer transition-colors group/item active:bg-lns-light-grey/20 min-h-[64px]">
                         <span className="text-sm font-black text-lns-navy group-hover/item:text-lns-red transition-colors uppercase tracking-tight">{item}</span>
                         <ChevronRight size={18} className="text-lns-border group-hover/item:text-lns-navy group-hover/item:translate-x-1 transition-all" />
                      </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
         ))}

         {/* Specialized Security Card - Section 13/21 */}
         <Card className="border-none shadow-2xl bg-lns-navy text-white relative overflow-hidden flex flex-col p-8 rounded-2xl min-h-[240px] md:col-span-2 lg:col-span-1">
            <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
               <Database size={200} />
            </div>
            
            <div className="relative z-10 space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black tracking-tight uppercase italic flex items-center gap-3">
                    <Lock className="text-lns-red" size={20} />
                    Node Security
                  </h3>
                  <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                     <span className="text-[10px] font-black uppercase text-green-500 tracking-widest">Encrypted</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                        <span>Ledger Sync Latency</span>
                        <span className="text-white">0.4ms</span>
                     </div>
                     <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-lns-red h-full w-[94%] animate-in slide-in-from-left duration-1000" />
                     </div>
                  </div>
                  
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium uppercase tracking-wider">
                     Institutional blockchain nodes are currently synchronizing attendance hashes across the local network. 
                     Authorization required for manual override.
                  </p>
               </div>

               <Button className="w-full bg-white text-lns-navy hover:bg-slate-100 rounded-xl h-12 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all mt-auto shadow-xl shadow-black/20">
                  Manage Terminal Access
               </Button>
            </div>
         </Card>

         {/* Advanced Settings Hint */}
         <div className="md:col-span-2 lg:col-span-3 pt-6 border-t border-gray-100 mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-black text-lns-mid-grey uppercase tracking-widest italic opacity-50">
               <Globe size={16} /> Global System Protocol v4.0.1
            </div>
            <div className="flex items-center gap-6">
               <span className="text-[10px] font-black text-lns-navy/30 uppercase tracking-[0.3em]">Institutional ID: LNS-7742</span>
               <span className="text-[10px] font-black text-lns-navy/30 uppercase tracking-[0.3em]">Last Sync: Just Now</span>
            </div>
         </div>
      </div>
    </div>
  );
}
