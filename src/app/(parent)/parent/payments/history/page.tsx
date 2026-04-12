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
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Bus, 
  School, 
  ShoppingBag, 
  Zap, 
  Calendar,
  Filter,
  Search
} from "lucide-react";

const paymentHistory = [
  { id: "LNS-2026-00847", date: "13 Apr 2026", title: "Science Museum Trip", amount: "£21.60", category: "TRIP", status: "CONFIRMED", student: "Amara Johnson", icon: Bus, blockchain: "a3f8...9c2d" },
  { id: "LNS-2026-00412", date: "15 Mar 2026", title: "Term 2 School Fee", amount: "£1,600.00", category: "SCHOOL_FEE", status: "CONFIRMED", student: "Amara Johnson", icon: School, blockchain: "f9b2...4e1a" },
  { id: "LNS-2026-00398", date: "12 Mar 2026", title: "School Shop — 3 Textbooks", amount: "£42.00", category: "SHOP", status: "CONFIRMED", student: "Amara Johnson", icon: ShoppingBag, blockchain: "d7a1...8c5f" },
  { id: "LNS-2026-00215", date: "04 Feb 2026", title: "Chess Club — Spring Term", amount: "£48.00", category: "CLUB", status: "CONFIRMED", student: "Amara Johnson", icon: Zap, blockchain: "b2e9...7d3a" },
  { id: "LNS-2025-00984", date: "05 Jan 2026", title: "Term 1 School Fee", amount: "£1,600.00", category: "SCHOOL_FEE", status: "CONFIRMED", student: "Amara Johnson", icon: School, blockchain: "c4f0...2a1b" },
  { id: "LNS-2025-00912", date: "20 Dec 2025", title: "Graduation Ticket × 2", amount: "£20.00", category: "EVENT", status: "CONFIRMED", student: "Amara Johnson", icon: ShoppingBag, blockchain: "e8d2...9f4c" },
];

export default function ParentPaymentHistoryPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-8 px-0">
      <div className="flex items-center space-x-2 px-1">
        <Link href="/parent/payments">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white">
            <ChevronLeft size={20} className="text-lns-navy" />
          </Button>
        </Link>
        <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Back to Payments</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">Payment History</h1>
          <p className="text-xs md:text-base text-lns-mid-grey font-medium">Verifiable records of all school transactions</p>
        </div>
        <Button className="flex-1 sm:flex-none h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl bg-lns-navy text-white px-8">
           <Download size={14} className="mr-2" />
           Annual Statement
        </Button>
      </div>

      <Card className="border-none shadow-sm bg-white p-4">
         <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lns-mid-grey" size={18} />
               <input 
                  type="text" 
                  placeholder="Search receipt ID or item name..."
                  className="w-full pl-10 pr-4 h-11 bg-lns-light-grey/50 border-none rounded-xl text-sm font-medium outline-none"
               />
            </div>
            <Button variant="outline" className="h-11 rounded-xl border-lns-border bg-white text-[10px] font-black uppercase tracking-widest">
               <Filter size={14} className="mr-2" />
               Category
            </Button>
            <Button variant="outline" className="h-11 rounded-xl border-lns-border bg-white text-[10px] font-black uppercase tracking-widest">
               <Calendar size={14} className="mr-2" />
               Academic Year
            </Button>
         </div>
      </Card>

      <div className="space-y-3">
         {paymentHistory.map((item) => (
           <Card key={item.id} className="border-none shadow-sm bg-white hover:shadow-md transition-all group overflow-hidden">
              <CardContent className="p-0">
                 <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center p-5 md:flex-1">
                       <div className="w-12 h-12 rounded-2xl bg-lns-light-grey flex items-center justify-center mr-5 text-lns-navy group-hover:bg-lns-navy group-hover:text-white transition-colors">
                          <item.icon size={22} />
                       </div>
                       <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey leading-none mb-1">{item.category} • {item.id}</p>
                          <h4 className="text-base font-[800] text-lns-navy">{item.title}</h4>
                          <p className="text-[11px] font-medium text-lns-mid-grey">Paid on {item.date} for {item.student}</p> 
                       </div>
                    </div>
                    
                    <div className="h-px w-full md:h-12 md:w-px bg-lns-light-grey md:mx-4"></div>

                    <div className="flex items-center justify-between p-5 md:w-auto md:min-w-[280px]">
                       <div className="text-left md:text-right md:mr-8">
                          <p className="text-xl font-[900] text-lns-navy tracking-tight">{item.amount}</p>
                          <div className="flex items-center md:justify-end text-[9px] font-black uppercase tracking-widest text-green-600">
                             <ShieldCheck size={10} className="mr-1" />
                             Blockchain Sealed
                          </div>
                       </div>
                       
                       <div className="flex items-center space-x-2">
                          <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-lns-border bg-white hover:bg-lns-light-grey">
                             <Download size={16} className="text-lns-navy" />
                          </Button>
                          <Link href={`/verify/receipt/${item.id}`}>
                             <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-lns-border bg-white hover:bg-lns-light-grey">
                                <ExternalLink size={16} className="text-lns-navy" />
                             </Button>
                          </Link>
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      <div className="pt-8 text-center flex flex-col items-center">
         <div className="p-4 bg-lns-navy/5 rounded-2xl border border-lns-navy/10 flex items-center space-x-4 max-w-lg">
            <ShieldCheck size={28} className="text-lns-navy opacity-50" />
            <div className="text-left">
               <p className="text-[10px] font-black uppercase tracking-widest text-lns-navy">Permanent Ledger Verification</p>
               <p className="text-[11px] text-lns-mid-grey leading-relaxed">Every transaction on LNS OS is cryptographically sealed to ensuring auditing integrity for the school and families.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
