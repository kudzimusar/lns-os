"use client";

import React, { useState } from "react";
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
  Search, 
  Filter, 
  Download, 
  Mail, 
  MoreVertical, 
  AlertCircle,
  Clock,
  User,
  Zap,
  CheckCircle2,
  Phone,
  ArrowRight
} from "lucide-react";

const outstandingRecords = [
  { id: 1, family: "Johnson, P.", student: "Amara", grade: "8A", items: 2, total: 1221.60, lastContact: "12 Apr", risk: "Low", status: "PENDING" },
  { id: 2, family: "Nkosi, B.", student: "Blake", grade: "10C", items: 1, total: 240.00, lastContact: "8 Apr", risk: "Low", status: "OVERDUE" },
  { id: 3, family: "Petrov, K.", student: "Elena", grade: "9B", items: 5, total: 2440.00, lastContact: "Never", risk: "High", status: "CRITICAL" },
  { id: 4, family: "Smith, J.", student: "Leo", grade: "7D", items: 3, total: 850.00, lastContact: "10 Apr", risk: "Medium", status: "OVERDUE" },
  { id: 5, family: "Garcia, M.", student: "Sofia", grade: "11A", items: 1, total: 15.00, lastContact: "14 Apr", risk: "Low", status: "PENDING" },
  { id: 6, family: "Chen, W.", student: "Kai", grade: "8C", items: 2, total: 48.00, lastContact: "11 Apr", risk: "Low", status: "PENDING" },
];

export default function AdminFinanceOutstandingPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-8 px-0">
      <div className="flex items-center space-x-2 px-1">
        <Link href="/admin/finance">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white">
            <ChevronLeft size={20} className="text-lns-navy" />
          </Button>
        </Link>
        <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Back to Finance Overview</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">Outstanding Accounts</h1>
          <p className="text-xs md:text-base text-lns-mid-grey font-medium">Real-time recovery management for school receivables</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none bg-white h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl">
            <Download size={14} className="mr-2" />
            Export CSV
          </Button>
          <Button className="flex-1 sm:flex-none h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl bg-lns-navy text-white">
            <Mail size={14} className="mr-2" />
            Batch Outreach
          </Button>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <Card className="border-none shadow-sm bg-white p-4">
         <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lns-mid-grey" size={18} />
               <input 
                  type="text" 
                  placeholder="Search family name, student or ID..."
                  className="w-full pl-10 pr-4 h-12 bg-lns-light-grey/50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-lns-navy/10 transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="flex items-center gap-2">
               <Button variant="outline" className="h-12 rounded-2xl border-lns-border bg-white text-[10px] font-black uppercase tracking-widest">
                  <Filter size={14} className="mr-2" />
                  Status: All
               </Button>
               <Button variant="outline" className="h-12 rounded-2xl border-lns-border bg-white text-[10px] font-black uppercase tracking-widest">
                  Risk Level
               </Button>
               <Button variant="outline" className="h-12 rounded-2xl border-lns-border bg-white text-[10px] font-black uppercase tracking-widest">
                  Sort: Balance
               </Button>
            </div>
         </div>
      </Card>

      {/* AI Intervention Card */}
      <Card className="border-none shadow-sm bg-gradient-to-r from-lns-navy to-slate-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-lns-red opacity-10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>
         <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start space-x-4 max-w-2xl">
               <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
                  <Zap size={24} className="text-lns-red" />
               </div>
               <div>
                  <h4 className="text-lg font-black uppercase tracking-tight mb-2">AI Intervention Advisor</h4>
                  <p className="text-sm text-white/70 leading-relaxed italic">
                    "I've identified 3 accounts where payment plans are likely to be accepted based on past communication history. 
                    Dispatching automated 'Soft Reconnect' offers could recover £3,490 within 14 days."
                  </p>
               </div>
            </div>
            <div className="flex space-x-3 w-full md:w-auto">
               <Button className="flex-1 md:flex-none h-12 bg-white text-lns-navy hover:bg-white/90 px-8 rounded-xl font-black uppercase tracking-widest text-[10px]">
                  Authorize Outreach
               </Button>
               <Button variant="outline" className="flex-1 md:flex-none h-12 border-white/20 text-white hover:bg-white/10 px-8 rounded-xl font-black uppercase tracking-widest text-[10px]">
                  View Strategy
               </Button>
            </div>
         </CardContent>
      </Card>

      {/* Main Ledger Table */}
      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
             <table className="w-full">
                <thead>
                   <tr className="bg-lns-light-grey/50">
                      <th className="px-6 py-5 text-left text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Family Account</th>
                      <th className="px-6 py-5 text-left text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Primary Student</th>
                      <th className="px-6 py-5 text-center text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Items</th>
                      <th className="px-6 py-5 text-center text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Exposure</th>
                      <th className="px-6 py-5 text-center text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Last Action</th>
                      <th className="px-6 py-5 text-center text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Status</th>
                      <th className="px-6 py-5 text-right text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Command</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-lns-light-grey">
                   {outstandingRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-lns-light-grey/30 transition-all duration-300 group">
                         <td className="px-6 py-5">
                            <div className="flex items-center">
                               <div className="w-10 h-10 bg-lns-navy/5 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-lns-navy group-hover:text-white transition-colors">
                                  <User size={18} />
                               </div>
                               <div>
                                  <p className="text-sm font-[800] text-lns-navy">{record.family}</p>
                                  <p className="text-[10px] font-bold text-lns-mid-grey">ACC: #F-{1000 + record.id}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-5">
                            <div>
                               <p className="text-sm font-bold text-lns-navy">{record.student}</p>
                               <p className="text-[10px] font-semibold text-lns-mid-grey uppercase">Grade {record.grade}</p>
                            </div>
                         </td>
                         <td className="px-6 py-5 text-center px-6">
                            <div className="inline-flex items-center justify-center px-2 py-1 bg-lns-light-grey rounded-lg text-[10px] font-black text-lns-navy">
                               {record.items}
                            </div>
                         </td>
                         <td className="px-6 py-5 text-center">
                            <span className="text-base font-[900] text-lns-navy tracking-tight">£{record.total.toLocaleString()}</span>
                         </td>
                         <td className="px-6 py-5 text-center">
                            <div className="flex items-center justify-center text-xs font-semibold text-lns-mid-grey">
                               <Clock size={12} className="mr-1.5" />
                               {record.lastContact}
                            </div>
                         </td>
                         <td className="px-6 py-5 text-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                               record.status === "CRITICAL" ? "bg-lns-red/10 text-lns-red" : 
                               record.status === "OVERDUE" ? "bg-amber-100 text-amber-600" : 
                               "bg-blue-100 text-blue-600"
                            }`}>
                               {record.status}
                            </span>
                         </td>
                         <td className="px-6 py-5 text-right">
                           <div className="flex items-center justify-end space-x-2">
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full opacity-40 group-hover:opacity-100 transition-all">
                                 <Phone size={14} className="text-lns-mid-grey" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full opacity-40 group-hover:opacity-100 transition-all">
                                 <Mail size={14} className="text-lns-mid-grey" />
                              </Button>
                              <Link href={`/admin/finance/acc/${record.id}`}>
                                 <Button size="icon" className="h-9 w-9 rounded-xl bg-lns-light-grey text-lns-navy hover:bg-lns-navy hover:text-white transition-all">
                                    <ArrowRight size={14} />
                                 </Button>
                              </Link>
                           </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-center space-x-3 opacity-40 py-4">
         <ShieldCheck size={20} className="text-lns-navy" />
         <p className="text-[10px] font-black uppercase tracking-widest text-lns-navy italic">Blockchain Integrity Seal Verified for All Ledgers</p>
      </div>
    </div>
  );
}
