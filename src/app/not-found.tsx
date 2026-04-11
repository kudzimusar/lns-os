"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-lns-navy flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="relative inline-block">
           <div className="w-32 h-32 rounded-full bg-lns-red/10 border-4 border-lns-red/20 flex items-center justify-center mx-auto">
              <span className="text-6xl font-[900] text-lns-red">404</span>
           </div>
           <div className="absolute -bottom-2 -right-2 bg-lns-navy p-2">
              <AlertTriangle className="text-lns-red" size={24} />
           </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-[900] text-white tracking-widest uppercase">Node Not <span className="text-lns-red">Found</span></h1>
          <p className="text-slate-400 text-sm leading-relaxed px-6">
            The resource you are looking for has either been relocated, deleted, or you lack the required biometric clearance to view it.
          </p>
        </div>

        <div className="flex bg-white/5 p-4 rounded-2xl border border-white/10 items-center">
           <Search size={18} className="text-slate-500 mr-3" />
           <input placeholder="Search for valid OS routes..." className="bg-transparent border-none text-white text-sm focus:ring-0 w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <Link href="/">
              <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white hover:text-lns-navy h-12 rounded-xl text-[10px] font-black uppercase tracking-widest">
                <Home size={16} className="mr-2" />
                Root Portal
              </Button>
           </Link>
           <Button 
             variant="outline" 
             onClick={() => window.history.back()}
             className="w-full border-white/10 text-white hover:bg-white hover:text-lns-navy h-12 rounded-xl text-[10px] font-black uppercase tracking-widest"
           >
             <ArrowLeft size={16} className="mr-2" />
             Go Back
           </Button>
        </div>

        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600">Lennon Nash register system v2.0</p>
      </div>
    </main>
  );
}
