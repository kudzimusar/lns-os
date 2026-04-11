"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QrCode, Search, Filter, Printer, RefreshCw, Smartphone, Monitor, User } from "lucide-react";
import { cn } from "@/lib/utils";

const entities = [
  { id: "LNS-S001", name: "Abraham Lincoln", type: "Student", status: "Active" },
  { id: "LNS-T101", name: "Sarah Jenkins", type: "Teacher", status: "Active" },
  { id: "LNS-P501", name: "Thomas Lincoln", type: "Parent", status: "Active" },
  { id: "SUB-M10A", name: "Grade 10A Mathematics", type: "Subject", status: "Active" },
  { id: "LNS-ST88", name: "John Smith", type: "Staff", status: "Active" },
];

export default function QRManagement() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">QR Identity Ledger</h1>
          <p className="text-lns-mid-grey font-medium">Manage and generate unique LNS biometric QR tokens.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-white">
            <Printer size={18} className="mr-2" />
            Batch Print Cards
          </Button>
          <Button>
            <RefreshCw size={18} className="mr-2" />
            Rotate All Keys
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <Card className="md:col-span-1 border-none shadow-sm bg-white p-6 h-fit pt-8">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey mb-6">QR Categories</h4>
            <div className="space-y-2">
               {[
                 { label: "Students", icon: User, count: 1240 },
                 { label: "Staff/Teachers", icon: Smartphone, count: 90 },
                 { label: "Subjects", icon: Monitor, count: 42 },
                 { label: "Parents", icon: UsersIcon, count: 1800 },
               ].map((cat) => (
                 <div key={cat.label} className="flex items-center justify-between p-3 rounded-xl border border-lns-border hover:bg-lns-light-grey/50 cursor-pointer transition-all">
                    <div className="flex items-center space-x-3">
                       <cat.icon size={16} className="text-lns-navy" />
                       <span className="text-xs font-bold text-lns-navy">{cat.label}</span>
                    </div>
                    <span className="text-[10px] font-black text-lns-mid-grey">{cat.count}</span>
                 </div>
               ))}
            </div>
         </Card>

         <Card className="md:col-span-3 border-none shadow-sm bg-white overflow-hidden">
            <div className="p-4 border-b border-lns-border flex items-center bg-lns-light-grey/30 px-3 mx-4 my-4 rounded-xl">
               <Search className="text-lns-mid-grey" size={16} />
               <input type="text" placeholder="Search by Entity ID or Name..." className="bg-transparent border-none focus:ring-0 text-sm px-3 py-2 w-full" />
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-lns-border bg-lns-light-grey/50">
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Entity</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">Type</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">LNS ID</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey text-center">QR Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-lns-border">
                     {entities.map((ent) => (
                       <tr key={ent.id} className="hover:bg-lns-light-grey/20 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-lns-navy flex items-center justify-center text-white text-[10px] font-black">
                                   {ent.name[0]}
                                </div>
                                <span className="text-sm font-bold text-lns-navy">{ent.name}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                             <span className="text-[9px] font-black uppercase tracking-widest bg-lns-light-grey px-2 py-1 rounded text-lns-mid-grey">{ent.type}</span>
                          </td>
                          <td className="px-6 py-4 text-xs font-mono font-bold text-lns-navy">{ent.id}</td>
                          <td className="px-6 py-4 text-center">
                             <div className="flex items-center justify-center space-x-2">
                                <Button size="sm" variant="outline" className="h-8 rounded-lg border-lns-border text-lns-navy font-bold text-[10px]">
                                   <Printer size={12} className="mr-2" />
                                   Print
                                </Button>
                                <Button size="sm" variant="outline" className="h-8 rounded-lg border-lns-border text-lns-navy font-bold text-[10px]">
                                   <QrCode size={12} className="mr-2" />
                                   View
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

function UsersIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
