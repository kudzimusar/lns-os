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
  Wallet, 
  Zap, 
  AlertCircle, 
  Settings, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  TrendingUp,
  History,
  Check,
  Bell,
  Utensils
} from "lucide-react";

const walletTransactions = [
  { id: "TXN-882", date: "Today, 12:15", title: "Canteen: Special (Chicken/Rice)", amount: "-£4.50", balance: "£14.20", icon: Utensils },
  { id: "TXN-871", date: "Yesterday, 13:04", title: "Canteen: Fruit Pot & Water", amount: "-£2.00", balance: "£18.70", icon: Utensils },
  { id: "TOP-042", date: "10 Apr, 09:00", title: "Wallet Top Up (Card)", amount: "+£20.00", balance: "£20.70", icon: Zap },
];

export default function ParentWalletPage() {
  const [autoTopUp, setAutoTopUp] = useState(true);
  const [lowBalanceAlert, setLowBalanceAlert] = useState(true);

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
          <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">Student Wallet</h1>
          <p className="text-xs md:text-base text-lns-mid-grey font-medium">Digital currency management for Amara Johnson</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
           <Button variant="outline" className="flex-1 sm:flex-none bg-white h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl">
              <History size={14} className="mr-2" />
              Transactions
           </Button>
           <Button className="flex-1 sm:flex-none h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl bg-lns-navy text-white px-8">
              <Zap size={14} className="mr-2" />
              Top Up
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Card */}
         <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-xl bg-gradient-to-br from-lns-navy to-slate-900 text-white overflow-hidden relative min-h-[220px] flex flex-col justify-center px-8">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Wallet size={120} />
               </div>
               <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Available Balance</p>
                  <h2 className="text-6xl font-[900] tracking-tighter italic">£14.20</h2>
                  <div className="flex items-center mt-6 space-x-6">
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Daily Spend Limit</p>
                        <p className="text-sm font-bold">£10.00</p>
                     </div>
                     <div className="w-px h-8 bg-white/10"></div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Items Today</p>
                        <p className="text-sm font-bold">1 Purchase</p>
                     </div>
                  </div>
               </div>
               <div className="absolute bottom-6 right-8">
                  <div className="flex items-center space-x-2 text-green-400">
                     <ShieldCheck size={16} />
                     <span className="text-[9px] font-black uppercase tracking-widest">Secured by LNS Ledger</span>
                  </div>
               </div>
            </Card>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
               <CardHeader className="py-4 border-b border-lns-light-grey">
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-lns-navy">Governance & Automation</CardTitle>
               </CardHeader>
               <CardContent className="divide-y divide-lns-light-grey">
                  <div className="flex items-center justify-between py-6">
                     <div className="flex items-start space-x-4">
                        <div className="p-3 bg-lns-light-grey rounded-2xl text-lns-navy">
                           <Zap size={20} />
                        </div>
                        <div>
                           <h4 className="text-sm font-[800] text-lns-navy">Auto Top-Up</h4>
                           <p className="text-xs text-lns-mid-grey font-medium">Add £20.00 when balance drops below £10.00</p>
                        </div>
                     </div>
                     <div 
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${autoTopUp ? 'bg-lns-navy' : 'bg-lns-border'}`}
                        onClick={() => setAutoTopUp(!autoTopUp)}
                     >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${autoTopUp ? 'translate-x-6' : 'translate-x-0'}`}></div>
                     </div>
                  </div>

                  <div className="flex items-center justify-between py-6">
                     <div className="flex items-start space-x-4">
                        <div className="p-3 bg-lns-light-grey rounded-2xl text-lns-navy">
                           <Bell size={20} />
                        </div>
                        <div>
                           <h4 className="text-sm font-[800] text-lns-navy">Low Balance Alerts</h4>
                           <p className="text-xs text-lns-mid-grey font-medium">Notification when balance is below £5.00</p>
                        </div>
                     </div>
                     <div 
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${lowBalanceAlert ? 'bg-lns-navy' : 'bg-lns-border'}`}
                        onClick={() => setLowBalanceAlert(!lowBalanceAlert)}
                     >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${lowBalanceAlert ? 'translate-x-6' : 'translate-x-0'}`}></div>
                     </div>
                  </div>

                  <div className="flex items-center justify-between py-6">
                     <div className="flex items-start space-x-4">
                        <div className="p-3 bg-lns-light-grey rounded-2xl text-lns-navy">
                           <Settings size={20} />
                        </div>
                        <div>
                           <h4 className="text-sm font-[800] text-lns-navy">Configure Spend Limits</h4>
                           <p className="text-xs text-lns-mid-grey font-medium">Adjust maximum daily canteen allowance</p>
                        </div>
                     </div>
                     <Button variant="ghost" size="icon" className="text-lns-mid-grey">
                        <ArrowRight size={20} />
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Sidebar Transaction List */}
         <div className="space-y-6">
            <Card className="border-none shadow-sm bg-white overflow-hidden flex flex-col h-full">
               <CardHeader className="py-4 border-b border-lns-light-grey">
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-lns-navy">Live Activity</CardTitle>
               </CardHeader>
               <CardContent className="p-0 flex-1">
                  <div className="divide-y divide-lns-light-grey">
                     {walletTransactions.map((txn) => (
                        <div key={txn.id} className="p-5 flex items-center justify-between hover:bg-lns-light-grey/30 transition-colors group">
                           <div className="flex items-center">
                              <div className="w-10 h-10 bg-lns-light-grey rounded-xl flex items-center justify-center mr-4 group-hover:bg-lns-navy group-hover:text-white transition-colors">
                                 <txn.icon size={18} />
                              </div>
                              <div>
                                 <h5 className="text-xs font-[800] text-lns-navy">{txn.title}</h5>
                                 <p className="text-[10px] text-lns-mid-grey font-medium">{txn.date}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className={`text-sm font-[900] ${txn.amount.startsWith('+') ? 'text-green-600' : 'text-lns-navy'}`}>{txn.amount}</p>
                              <p className="text-[9px] font-bold text-lns-mid-grey uppercase">£{txn.balance}</p>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="p-6 bg-lns-light-grey/50 border-t border-lns-light-grey text-center">
                     <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey hover:text-lns-navy">
                        Download Statement (PDF)
                     </Button>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-amber-50 border border-amber-200">
               <CardContent className="p-5">
                  <div className="flex items-start space-x-3">
                     <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                     <div>
                        <p className="text-xs font-black uppercase tracking-tight text-amber-800 mb-1">Allergen Protection Active</p>
                        <p className="text-[11px] text-amber-700 leading-relaxed font-medium">Amara's NUT ALLERGY profile is linked to this wallet. Canteen POS will block incompatible purchases automatically.</p>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
