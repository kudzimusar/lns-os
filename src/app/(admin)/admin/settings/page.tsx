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
  Database
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">School Configuration</h1>
          <p className="text-lns-mid-grey font-medium">Define global standards, grading protocols and ledger settings.</p>
        </div>
        <Button>
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {configGroups.map((group) => (
           <Card key={group.title} className="border-none shadow-sm hover:shadow-md transition-all overflow-hidden bg-white">
              <CardHeader className="bg-lns-light-grey/20 border-b border-lns-border pb-4">
                 <CardTitle className="flex items-center text-sm uppercase tracking-widest text-lns-navy">
                    <group.icon size={18} className="mr-3 text-lns-red" />
                    {group.title}
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y divide-lns-border">
                    {group.items.map((item) => (
                      <div key={item} className="p-5 flex items-center justify-between hover:bg-lns-light-grey/10 cursor-pointer transition-colors group">
                         <span className="text-sm font-bold text-lns-navy group-hover:text-lns-red transition-colors">{item}</span>
                         <ChevronRight size={16} className="text-lns-border group-hover:text-lns-navy" />
                      </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
         ))}

         <Card className="border-none shadow-xl bg-lns-navy text-white relative overflow-hidden flex flex-col justify-center p-8">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
               <Database size={120} />
            </div>
            <div className="relative z-10 space-y-4">
               <h3 className="text-xl font-[900] tracking-tight">Ledger Status</h3>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
                     <span>Chain Sync</span>
                     <span className="text-green-500">Active</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full">
                     <div className="bg-lns-red h-full w-full animate-pulse" />
                  </div>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Every grade entry and attendance event is being hashed and pushed to the LNS Blockchain Layer.
               </p>
               <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white hover:text-lns-navy rounded-xl h-12 text-[10px] font-black uppercase tracking-widest">
                  View Raw Stats
               </Button>
            </div>
         </Card>
      </div>
    </div>
  );
}
