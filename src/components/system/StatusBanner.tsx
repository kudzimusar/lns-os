"use client";

import React, { useState, useEffect } from "react";
import { WifiOff, Download, RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusBanner() {
  const [isOffline, setIsOffline] = useState(false);
  const [showPwaPrompt, setShowPwaPrompt] = useState(false);
  const [syncQueue, setSyncQueue] = useState(0);

  useEffect(() => {
    // Simulate PWA prompt after 3rd "visit" (simulated by timeout)
    const timer = setTimeout(() => setShowPwaPrompt(true), 5000);
    
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => {
      setIsOffline(true);
      setSyncQueue(3); // Simulate pending hashes
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline && !showPwaPrompt) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-xl space-y-3">
      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-lns-navy text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center space-x-3">
             <div className="bg-lns-red p-2 rounded-xl">
                <WifiOff size={18} />
             </div>
             <div>
                <p className="text-xs font-black uppercase tracking-widest">Operating Offline</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{syncQueue} Action hashes in local queue</p>
             </div>
          </div>
          <div className="flex items-center space-x-3">
             <div className="w-1.5 h-1.5 bg-lns-red rounded-full animate-pulse" />
             <span className="text-[10px] font-black text-slate-500">Ready to Sync</span>
          </div>
        </div>
      )}

      {/* PWA Install Prompt */}
      {showPwaPrompt && !isOffline && (
        <div className="bg-white border-2 border-lns-navy p-5 rounded-3xl shadow-2xl flex items-center justify-between animate-in slide-in-from-top-12 duration-700">
           <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-lns-navy rounded-2xl flex items-center justify-center text-white text-xs font-black shadow-lg">LNS</div>
              <div>
                 <p className="text-sm font-black text-lns-navy uppercase tracking-tight">Add LNS OS to Home Screen</p>
                 <p className="text-xs text-lns-mid-grey">Install for offline access and native-speed biometric auth.</p>
              </div>
           </div>
           <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowPwaPrompt(false)}
                className="bg-lns-navy text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-lns-red transition-all"
              >
                 Install
              </button>
              <button 
                onClick={() => setShowPwaPrompt(false)}
                className="p-2 text-lns-mid-grey"
              >
                 <X size={20} />
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
