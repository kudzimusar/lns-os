"use client";

import React from "react";
import Link from "next/link";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription 
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ChevronLeft, 
  AlertCircle, 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Camera, 
  ShieldAlert, 
  User, 
  Scale, 
  CheckCircle2, 
  MoreVertical,
  Mail,
  Zap,
  Info
} from "lucide-react";

const penalties = [
  { id: "PNL-102", family: "Petrov, K.", student: "Elena", issued: "10 Apr", amount: "£15.00", category: "LOST_BOOK", status: "OUTSTANDING", description: "Missing copy of 'Macbeth' Library #827" },
  { id: "PNL-098", family: "Nkosi, B.", student: "Blake", issued: "05 Apr", amount: "£45.00", category: "FACILITY_DAMAGE", status: "DISPUTED", description: "Damaged locker panel following incident report #412" },
  { id: "PNL-085", family: "Chen, W.", student: "Kai", issued: "28 Mar", amount: "£12.50", category: "DAMAGED_EQUIPMENT", status: "PAID", description: "Broken lab beaker during 8C Chemistry" },
];

export default function AdminFinancePenaltiesPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-8 px-0">
      <div className="flex items-center space-x-2 px-1">
        <Link href="/admin/finance">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white">
            <ChevronLeft size={20} className="text-lns-navy" />
          </Button>
        </Link>
        <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Back to Finance</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">Penalties & Fees</h1>
          <p className="text-xs md:text-base text-lns-mid-grey font-medium">Issue and manage fines for loss or damage</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none bg-white h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl">
            <Scale size={14} className="mr-2" />
            Fee Guidelines
          </Button>
          <Button className="flex-1 sm:flex-none h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl bg-lns-red text-white px-8">
            <Plus size={14} className="mr-2" />
            Issue Adjustment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* Issuance Form Preview / AI Recommender */}
         <Card className="lg:col-span-4 border-none shadow-sm bg-lns-navy text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-lns-red opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <CardHeader>
               <div className="flex items-center space-x-2 mb-1">
                  <Zap size={16} className="text-lns-red" />
                  <CardTitle className="text-white text-sm uppercase tracking-widest">AI Citation Draft</CardTitle>
               </div>
               <CardDescription className="text-white/60">Automated evidence-based fee generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 text-center">Scan Incident Report</p>
                  <div className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all">
                     <Camera size={24} className="text-white/20 mb-2" />
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Upload Photo Evidence</p>
                  </div>
               </div>
               
               <div className="space-y-3">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-lns-mid-grey">Standard Categories</h4>
                  <div className="grid grid-cols-1 gap-2">
                     {['Lost Library Book', 'Damaged IT Equipment', 'Lost Uniform', 'Facility Damage'].map(cat => (
                        <div key={cat} className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                           <span className="text-xs font-bold text-white/80">{cat}</span>
                           <Plus size={14} className="text-white/40 group-hover:text-white" />
                        </div>
                     ))}
                  </div>
               </div>

               <p className="text-[10px] text-white/50 text-center italic">Digital signature and evidence sealed to blockchain citation upon issue.</p>
            </CardContent>
         </Card>

         {/* Penalty List */}
         <Card className="lg:col-span-8 border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="py-4 border-b border-lns-light-grey flex flex-row items-center justify-between px-6">
               <CardTitle className="text-sm">Active Citations</CardTitle>
               <div className="flex space-x-2">
                  <div className="relative">
                     <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-lns-mid-grey" size={14} />
                     <input type="text" placeholder="Search..." className="pl-8 pr-4 py-1.5 bg-lns-light-grey rounded-lg text-xs outline-none w-48" />
                  </div>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg"><Filter size={14} /></Button>
               </div>
            </CardHeader>
            <CardContent className="px-0">
               <div className="overflow-x-auto">
                  <table className="w-full">
                     <thead>
                        <tr className="bg-lns-light-grey/30">
                           <th className="px-6 py-4 text-left text-[9px] font-black text-lns-mid-grey uppercase tracking-widest">Citation</th>
                           <th className="px-6 py-4 text-left text-[9px] font-black text-lns-mid-grey uppercase tracking-widest">Family / Student</th>
                           <th className="px-6 py-4 text-center text-[9px] font-black text-lns-mid-grey uppercase tracking-widest">Amount</th>
                           <th className="px-6 py-4 text-center text-[9px] font-black text-lns-mid-grey uppercase tracking-widest">Status</th>
                           <th className="px-6 py-4 text-right text-[9px] font-black text-lns-mid-grey uppercase tracking-widest">Command</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-lns-light-grey">
                        {penalties.map((p) => (
                           <tr key={p.id} className="hover:bg-lns-light-grey/10 transition-colors group">
                              <td className="px-6 py-4">
                                 <div>
                                    <p className="text-sm font-black text-lns-navy leading-none mb-1">{p.id}</p>
                                    <p className="text-[9px] font-black text-lns-mid-grey uppercase truncate max-w-[140px]">{p.description}</p>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="flex items-center">
                                    <div className="p-2 bg-lns-navy/5 rounded-xl mr-3 text-lns-navy"><User size={14} /></div>
                                    <div>
                                       <p className="text-xs font-bold text-lns-navy">{p.family}</p>
                                       <p className="text-[9px] font-black text-lns-mid-grey uppercase">{p.student}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                 <span className="text-sm font-black text-lns-navy">{p.amount}</span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                 <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                    p.status === "PAID" ? "bg-green-100 text-green-600" : 
                                    p.status === "DISPUTED" ? "bg-amber-100 text-amber-600" : 
                                    "bg-lns-red/10 text-lns-red"
                                 }`}>
                                    {p.status}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <div className="flex items-center justify-end space-x-1 opacity-40 group-hover:opacity-100 transition-all">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full"><Mail size={14} /></Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full"><MoreVertical size={14} /></Button>
                                    <Link href={`/admin/finance/penalties/${p.id}`}>
                                       <Button size="icon" variant="ghost" className="h-8 w-8 rounded-xl bg-lns-light-grey text-lns-navy hover:bg-lns-navy hover:text-white"><Zap size={14} /></Button>
                                    </Link>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </CardContent>
            <div className="p-6 bg-lns-light-grey/30 border-t border-lns-light-grey flex items-center justify-between">
               <div className="flex items-center space-x-2">
                  <Info size={14} className="text-lns-navy" />
                  <p className="text-[10px] font-bold text-lns-mid-grey uppercase">Policy: Citation appeals must be resolved within 14 days.</p>
               </div>
               <Button variant="outline" className="h-9 px-4 text-[9px] font-black uppercase tracking-widest rounded-lg bg-white border-lns-border">
                  Audit History
               </Button>
            </div>
         </Card>
      </div>

      <div className="flex flex-col items-center justify-center space-y-3 opacity-40 py-8">
         <ShieldAlert size={28} className="text-lns-navy" />
         <p className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic text-center">All citations and waivers are sealed to the LNS OS audit chain for permanent record integrity.</p>
      </div>
    </div>
  );
}
