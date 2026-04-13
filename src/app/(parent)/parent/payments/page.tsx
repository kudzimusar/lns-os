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
  CreditCard, 
  Wallet, 
  History, 
  ArrowRight, 
  Info, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Bus,
  School,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Zap,
  Filter
} from "lucide-react";

const outstandingPayments = [
  { 
    id: "trip-001", 
    type: "TRIP", 
    title: "Science Museum Trip", 
    student: "Amara Johnson", 
    amount: "£21.60", 
    deadline: "10 May 2026", 
    daysRemaining: 5,
    icon: Bus,
    color: "bg-lns-red/10 text-lns-red"
  },
  { 
    id: "fee-001", 
    type: "SCHOOL_FEE", 
    title: "Term 3 Tuition Fee", 
    student: "Amara Johnson", 
    amount: "£1,600.00", 
    deadline: "30 Apr 2026", 
    daysRemaining: -1,
    icon: School,
    color: "bg-amber-100 text-amber-600"
  },
  { 
    id: "shop-001", 
    type: "SHOP", 
    title: "Year 8 Mathematics Textbooks (3)", 
    student: "Amara Johnson", 
    amount: "£42.00", 
    deadline: "Open", 
    daysRemaining: null,
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600"
  }
];

const walletInfo = {
  student: "Amara Johnson",
  balance: "£14.20",
  threshold: "£10.00",
  autoTopUp: true
};

export default function ParentPaymentsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-8 px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">Payments & Shop</h1>
          <p className="text-xs md:text-base text-lns-mid-grey font-medium">Manage tuition, trips, and student resources</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Link href="/parent/payments/history" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full bg-white h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl">
              <History size={14} className="mr-2" />
              History
            </Button>
          </Link>
          <Link href="/parent/wallet" className="flex-1 sm:flex-none">
            <Button className="w-full h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl">
              <Wallet size={14} className="mr-2" />
              Wallet
            </Button>
          </Link>
        </div>
      </div>

      {/* Balance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm bg-lns-navy text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle size={18} className="text-lns-red" />
              <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Outstanding Balance</p>
            </div>
            <p className="text-4xl font-[900] text-white tracking-tighter">£1,663.60</p>
            <p className="text-xs text-white/50 mt-1 font-medium italic">3 individual items requiring attention</p>
            <div className="mt-8 flex items-center space-x-3">
               <Link href="/parent/checkout/all" className="flex-1">
                 <Button className="w-full bg-white text-lns-navy hover:bg-white/90 font-black uppercase tracking-widest text-[10px] h-12 rounded-xl">
                    Pay All Items
                 </Button>
               </Link>
               <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-widest text-[10px] h-12 rounded-xl px-4">
                  Request Plan
               </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden relative border border-lns-light-grey">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <Wallet size={18} className="text-lns-navy" />
                <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Canteen Wallet</p>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-green-100 text-green-600 rounded-full">Active</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-[900] text-lns-navy tracking-tighter">{walletInfo.balance}</p>
                <p className="text-xs text-lns-mid-grey mt-1 font-medium">{walletInfo.student}'s current balance</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-[10px] font-bold text-lns-mid-grey mb-1">
                  <Zap size={10} className="text-lns-red" />
                  <span>Auto Top-up ON</span>
                </div>
                <p className="text-[9px] text-lns-mid-grey uppercase font-black">Trigger: £10.00</p>
              </div>
            </div>
            <div className="mt-8 flex items-center space-x-3">
               <Link href="/parent/wallet/topup" className="flex-1">
                 <Button className="w-full bg-lns-navy text-white hover:bg-lns-navy/90 font-black uppercase tracking-widest text-[10px] h-12 rounded-xl">
                    Top Up Now
                 </Button>
               </Link>
               <Link href="/student/dashboard" className="px-4 h-12 flex items-center justify-center border border-lns-border rounded-xl hover:bg-lns-light-grey transition-colors">
                  <ShieldCheck size={20} className="text-lns-navy" />
               </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Outstanding Payment List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Outstanding Tasks</p>
            <div className="flex items-center space-x-2">
              <Filter size={14} className="text-lns-mid-grey" />
              <span className="text-[10px] font-bold text-lns-mid-grey">Filter Categories</span>
            </div>
          </div>

          <div className="space-y-3">
            {outstandingPayments.map((item) => (
              <Card key={item.id} className="border-none shadow-sm bg-white hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center">
                      <div className={`p-3 rounded-2xl ${item.color} mr-4`}>
                        <item.icon size={24} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey mb-1 leading-none">{item.type.replace('_', ' ')}</p>
                        <h4 className="text-base font-[800] text-lns-navy leading-tight">{item.title}</h4>
                        <div className="flex items-center mt-1 space-x-3">
                           <div className="flex items-center text-[10px] text-lns-mid-grey font-bold">
                             <Clock size={10} className="mr-1" />
                             {item.deadline}
                           </div>
                           <div className="flex items-center text-[10px] text-lns-mid-grey font-bold">
                             <Info size={10} className="mr-1" />
                             {item.student}
                           </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                      <div className="text-left sm:text-right">
                        <p className="text-xl font-[900] text-lns-navy">{item.amount}</p>
                        {item.daysRemaining !== null && (
                          <p className={`text-[9px] font-black uppercase tracking-wider ${item.daysRemaining < 0 ? 'text-lns-red' : 'text-amber-600'}`}>
                            {item.daysRemaining < 0 ? 'Overdue' : `${item.daysRemaining} Days Left`}
                          </p>
                        )}
                      </div>
                      <Link href={`/parent/checkout/${item.id}`}>
                        <Button className="h-10 px-4 bg-lns-navy text-white hover:bg-lns-navy/80 rounded-xl group-hover:px-6 transition-all duration-300">
                          <ArrowRight size={18} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Sidebar & History */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-gradient-to-br from-lns-navy to-slate-900 text-white overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Zap size={16} className="text-lns-red" />
                <CardTitle className="text-sm text-white uppercase tracking-widest font-[800]">AI Financial Assistant</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-white/70 leading-relaxed italic border-l-2 border-lns-red pl-3 bg-white/5 py-3 rounded-r-xl">
                "Hi, I've noticed Term 3 Tuition is overdue. I've prepared a 3-month payment plan starting at £534/month. Would you like to review this option?"
              </p>
              <div className="mt-4 grid grid-cols-1 gap-2">
                <Button className="bg-white text-lns-navy hover:bg-white/90 text-[10px] font-black uppercase tracking-widest h-11 rounded-lg">
                  Review Plan
                </Button>
                <Button variant="ghost" className="text-white hover:bg-white/10 text-[10px] font-black uppercase tracking-widest h-11 rounded-lg">
                  Ask me anything
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-lns-navy font-bold">System Announcements</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
               <div className="space-y-4 px-4">
                  <div className="flex space-x-3">
                     <div className="mt-1">
                        <CheckCircle2 size={14} className="text-green-500" />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-lns-navy uppercase tracking-widest leading-none mb-1 text-[10px]">Blockchain Verified</p>
                        <p className="text-[11px] text-lns-mid-grey">Your donation to the 'Science Lab Fund' has been sealed. Hash: a3f8...9c2d</p>
                        <Link href="/verify" className="inline-flex items-center text-[9px] text-lns-navy font-black uppercase tracking-widest mt-1 hover:underline">
                           Verify Record <ExternalLink size={8} className="ml-1" />
                        </Link>
                     </div>
                  </div>
                  <div className="flex space-x-3">
                     <div className="mt-1">
                        <ShoppingBag size={14} className="text-blue-500" />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-lns-navy uppercase tracking-widest leading-none mb-1 text-[10px]">Order Ready</p>
                        <p className="text-[11px] text-lns-mid-grey">Science goggles are ready for collection at the school office.</p>
                     </div>
                  </div>
               </div>
               <div className="mt-6 border-t border-lns-light-grey pt-4 text-center">
                  <Link href="/parent/payments/history" className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey hover:text-lns-navy transition-colors">
                     View All Activity History
                  </Link>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
