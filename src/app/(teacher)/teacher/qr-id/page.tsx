"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QrCode, Printer, Download, ShieldCheck, ArrowLeft, RefreshCw, Zap } from "lucide-react";
import Link from "next/link";

export default function TeacherQRPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 pt-6">
      <div className="flex items-center space-x-4 px-4 sm:px-0">
        <Link href="/teacher/dashboard">
          <Button variant="outline" className="h-12 w-12 rounded-xl p-0 bg-white">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-[900] text-lns-navy tracking-tighter uppercase">Teacher <span className="text-lns-red">Identity</span></h1>
          <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Sarah Jenkins • LNS-T101</p>
        </div>
      </div>

      <Card className="border-none shadow-2xl bg-white overflow-hidden rounded-[3rem]">
        <CardContent className="p-12 flex flex-col items-center space-y-10">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-black text-lns-navy uppercase tracking-tight">Biometric Session Token</h3>
            <p className="text-xs text-lns-mid-grey px-8">This QR displays your institutional presence. It is required to 'seal' class registers and authorize student marks.</p>
          </div>

          <div className="p-10 bg-lns-light-grey rounded-[3rem] border-4 border-white shadow-inner relative group cursor-pointer hover:scale-105 transition-all">
             <QrCode size={240} className="text-lns-navy" />
             <div className="absolute top-4 right-4 bg-lns-red text-white p-3 rounded-2xl shadow-xl">
                <ShieldCheck size={24} />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <Button variant="outline" className="h-16 border-lns-border rounded-2xl font-black uppercase text-[10px] tracking-widest text-lns-navy">
              <Printer className="mr-2" size={18} /> Print ID Card
            </Button>
            <Button className="h-16 bg-lns-navy text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-lns-navy/20">
              <RefreshCw className="mr-2" size={18} /> Rotate Cycle
            </Button>
          </div>

          <div className="w-full p-6 bg-blue-50 border border-blue-100 rounded-3xl flex items-center justify-between">
             <div className="flex items-center space-x-3">
                <Zap className="text-blue-600" size={20} />
                <span className="text-xs font-bold text-blue-800 uppercase tracking-tight">Active for Next: 42m</span>
             </div>
             <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded italic">AUTO-REFRESH</span>
          </div>
        </CardContent>
      </Card>
      
      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 text-center">Institutional ID Hashed to Chain</p>
    </div>
  );
}
