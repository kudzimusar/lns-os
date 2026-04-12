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
  Settings, 
  CreditCard, 
  ShieldCheck, 
  Globe, 
  Briefcase, 
  Calculator, 
  Bell, 
  Zap, 
  Database,
  ArrowRight
} from "lucide-react";

export default function AdminFinanceSettingsPage() {
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
          <h1 className="text-xl md:text-3xl font-[800] text-lns-navy tracking-tight uppercase">Financial Configuration</h1>
          <p className="text-xs md:text-base text-lns-mid-grey font-medium">Global payment gateways, fee schedules, and audit parameters</p>
        </div>
        <Button className="flex-1 sm:flex-none h-11 md:h-12 text-[10px] font-black uppercase tracking-widest rounded-xl bg-lns-navy text-white px-8">
           Save Global Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Payment Gateways */}
         <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-lns-navy/5 border-b border-lns-light-grey">
               <div className="flex items-center space-x-3">
                  <CreditCard size={18} className="text-lns-navy" />
                  <CardTitle className="text-sm">Provider Integration</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div className="flex items-center justify-between p-4 bg-lns-light-grey/30 rounded-2xl border border-lns-border/50">
                  <div className="flex items-center space-x-3">
                     <span className="text-xs font-black italic tracking-tighter">Stripe</span>
                     <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[8px] font-black rounded-md">LIVE</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase">Configure</Button>
               </div>
               <div className="flex items-center justify-between p-4 bg-lns-light-grey/30 rounded-2xl border border-lns-border/50">
                  <div className="flex items-center space-x-3">
                     <span className="text-xs font-black tracking-tighter">PayPal</span>
                     <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[8px] font-black rounded-md">LIVE</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase">Configure</Button>
               </div>
               <div className="flex items-center justify-between p-4 bg-lns-light-grey/30 rounded-2xl border border-lns-border/50 opacity-50">
                  <div className="flex items-center space-x-3">
                     <span className="text-xs font-black tracking-tighter">GoCardless</span>
                     <span className="px-2 py-0.5 bg-lns-light-grey text-lns-mid-grey text-[8px] font-black rounded-md">SANDBOX</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase">Connect</Button>
               </div>
            </CardContent>
         </Card>

         {/* Fee Structures */}
         <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-lns-navy/5 border-b border-lns-light-grey">
               <div className="flex items-center space-x-3">
                  <Calculator size={18} className="text-lns-navy" />
                  <CardTitle className="text-sm">Fee Parameters</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
               <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Monthly Tuition Factor</p>
                  <input type="text" className="w-full bg-lns-light-grey/50 border-none rounded-xl h-11 px-4 text-sm font-bold" defaultValue="£1,600.00" />
               </div>
               <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Platform Service Fee (%)</p>
                  <input type="text" className="w-full bg-lns-light-grey/50 border-none rounded-xl h-11 px-4 text-sm font-bold" defaultValue="2.15" />
               </div>
               <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start space-x-3">
                  <Bell size={16} className="text-amber-600 mt-0.5" />
                  <p className="text-[10px] text-amber-800 font-medium leading-relaxed">Changes to tuition factors will trigger automated notifications to all parents via the LNS AI node.</p>
               </div>
            </CardContent>
         </Card>

         {/* Compliance & Audit */}
         <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-lns-navy/5 border-b border-lns-light-grey">
               <div className="flex items-center space-x-3">
                  <ShieldCheck size={18} className="text-lns-navy" />
                  <CardTitle className="text-sm">Governance & Compliance</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-xs font-[800] text-lns-navy">Blockchain Ledger Sync</p>
                     <p className="text-[10px] text-lns-mid-grey">Real-time sealing of all records</p>
                  </div>
                  <div className="w-10 h-5 bg-lns-navy rounded-full p-1 relative">
                     <div className="w-3 h-3 bg-white rounded-full absolute right-1"></div>
                  </div>
               </div>
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-xs font-[800] text-lns-navy">AI-First Auditing</p>
                     <p className="text-[10px] text-lns-mid-grey">Automated anomaly detection</p>
                  </div>
                  <div className="w-10 h-5 bg-lns-navy rounded-full p-1 relative">
                     <div className="w-3 h-3 bg-white rounded-full absolute right-1"></div>
                  </div>
               </div>
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-xs font-[800] text-lns-navy">PCI DSS Verification</p>
                     <p className="text-[10px] text-lns-mid-grey">Bi-annual certificate check</p>
                  </div>
                  <div className="w-10 h-5 bg-lns-navy rounded-full p-1 relative">
                     <div className="w-3 h-3 bg-white rounded-full absolute right-1"></div>
                  </div>
               </div>
               <Button className="w-full mt-4 h-11 bg-lns-light-grey text-lns-navy hover:bg-lns-navy hover:text-white transition-all text-[10px] font-black uppercase tracking-widest rounded-xl">
                  Inspect Audit Logs
                  <ArrowRight size={14} className="ml-2" />
               </Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
