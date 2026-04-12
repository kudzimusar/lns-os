"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  User, 
  Shield, 
  Bell, 
  Smartphone, 
  Fingerprint, 
  Database, 
  History,
  Lock,
  ChevronRight,
  LogOut,
  ArrowLeft,
  ChevronDown,
  Monitor,
  Calendar,
  Zap,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  RefreshCcw,
  X
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [tab, setTab] = useState<"account" | "privacy" | "data-trail" | "notifications">("account");
  const [show2FA, setShow2FA] = useState(false);
  const [faStep, setFaStep] = useState(1);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 pt-6 px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
           <Link href="/">
              <Button variant="outline" className="h-12 w-12 rounded-xl p-0 bg-white">
                 <ArrowLeft size={18} />
              </Button>
           </Link>
           <div>
              <h1 className="text-3xl font-[900] text-lns-navy tracking-tighter uppercase">Account <span className="text-lns-red">Intelligence</span></h1>
              <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Secure Institutional Profile Management</p>
           </div>
        </div>
        <Button variant="outline" className="h-12 border-lns-red text-lns-red hover:bg-red-50 font-black uppercase tracking-widest text-[10px] rounded-2xl px-8">
           <LogOut size={16} className="mr-2" /> Sign Out
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
         <aside className="lg:w-72 space-y-2">
            {[
              { id: "account", label: "Profile Identity", icon: User },
              { id: "privacy", label: "Security & Auth", icon: Shield },
              { id: "data-trail", label: "Personal Data Trail", icon: History },
              { id: "notifications", label: "Communication Flow", icon: Bell },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id as any)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                  tab === item.id ? "bg-lns-navy text-white shadow-xl" : "bg-white text-lns-mid-grey hover:bg-lns-light-grey"
                )}
              >
                 <div className="flex items-center space-x-3">
                    <item.icon size={20} className={cn(tab === item.id ? "text-lns-red" : "text-lns-border ")} />
                    <span className="text-sm font-bold">{item.label}</span>
                 </div>
                 <ChevronRight size={16} className={cn(tab === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
              </button>
            ))}
         </aside>

         <main className="flex-1 space-y-6">
            {tab === "account" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                   <Card className="border-none shadow-sm bg-white overflow-hidden">
                      <CardHeader className="bg-lns-light-grey/20 border-b border-lns-border">
                         <CardTitle className="text-xs uppercase tracking-[0.2em] font-black text-lns-navy">Identity Snapshot</CardTitle>
                      </CardHeader>
                      <CardContent className="p-10 flex flex-col items-center sm:flex-row sm:items-start gap-10">
                         <div className="relative">
                            <div className="w-32 h-32 rounded-2xl bg-lns-navy flex items-center justify-center text-white text-4xl font-black shadow-2xl">SJ</div>
                            <Button className="absolute -bottom-2 -right-2 h-10 w-10 p-0 rounded-2xl bg-lns-red shadow-xl border-4 border-white">
                               <RefreshCcw size={16} />
                            </Button>
                         </div>
                         <div className="flex-1 space-y-6 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase text-lns-mid-grey">Institutional Name</label>
                                  <input defaultValue="Sarah Jenkins" className="w-full h-12 bg-lns-light-grey/50 border border-lns-border rounded-xl px-4 text-sm font-bold text-lns-navy" />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase text-lns-mid-grey">Hub Email</label>
                                  <input defaultValue="s.jenkins@lns.edu" className="w-full h-12 bg-lns-light-grey/50 border border-lns-border rounded-xl px-4 text-sm font-bold text-lns-navy" />
                               </div>
                            </div>
                            <Button className="bg-lns-navy text-white h-12 rounded-xl px-8 font-black uppercase tracking-widest text-[10px]">Update Profile Node</Button>
                         </div>
                      </CardContent>
                   </Card>
                </div>
            )}

            {tab === "privacy" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                   <Card className="border-none shadow-sm bg-white">
                      <CardHeader className="border-b border-lns-border">
                         <CardTitle className="text-xs uppercase tracking-[0.2em] font-black text-lns-navy">Encryption & Sovereignty</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-8 p-10">
                         <div className="flex items-center justify-between p-8 bg-green-50 rounded-2xl border border-green-100">
                            <div className="flex items-center space-x-6">
                               <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shadow-sm"><Smartphone size={28} /></div>
                               <div>
                                  <p className="text-lg font-black text-green-800 leading-none">Biometric Auth Active</p>
                                  <p className="text-xs text-green-600 font-bold uppercase tracking-widest mt-1">Verified Device: iPhone 15 Pro</p>
                               </div>
                            </div>
                            <Button variant="ghost" className="text-[10px] font-black uppercase text-green-800 tracking-widest bg-green-200/50 px-6 h-10 rounded-xl">Revoke Access</Button>
                         </div>
                         
                         <div className="grid grid-cols-1 gap-4">
                            {[
                              { label: "Two-Factor Authentication (2FA)", icon: Lock, status: false, action: () => setShow2FA(true) },
                              { label: "Real-time Login Alerts", icon: Bell, status: true },
                              { label: "Hardware Security Key", icon: Monitor, status: true },
                            ].map((s) => (
                               <div key={s.label} className="flex items-center justify-between p-6 bg-lns-light-grey/30 rounded-[2rem] border border-lns-border/50">
                                  <div className="flex items-center space-x-4">
                                     <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lns-navy shadow-sm"><s.icon size={18} /></div>
                                     <div>
                                        <p className="text-sm font-black text-lns-navy">{s.label}</p>
                                        <p className="text-[10px] text-lns-mid-grey font-bold uppercase tracking-widest mt-0.5">{s.status ? "Operational" : "Action Required"}</p>
                                     </div>
                                  </div>
                                  {s.label.includes("2FA") && !s.status ? (
                                    <Button onClick={s.action} className="bg-lns-red text-white h-10 px-6 rounded-xl font-black uppercase text-[9px] tracking-widest shadow-lg shadow-lns-red/20">Enable Now</Button>
                                  ) : (
                                    <div className={cn("w-12 h-6 rounded-full relative transition-all cursor-pointer", s.status ? "bg-lns-navy" : "bg-lns-border")}>
                                      <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-all", s.status ? "right-1" : "left-1")} />
                                    </div>
                                  )}
                               </div>
                            ))}
                         </div>
                      </CardContent>
                   </Card>
                </div>
            )}

            {tab === "data-trail" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                   <Card className="border-none shadow-xl bg-lns-navy text-white p-12 overflow-hidden relative rounded-[3rem]">
                      <div className="relative z-10 space-y-4">
                         <div className="inline-flex items-center space-x-2 px-3 py-1 bg-lns-red/20 rounded-full border border-lns-red/30 mb-2">
                           <div className="w-1.5 h-1.5 bg-lns-red rounded-full animate-pulse" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-lns-red">Secure Ledger Live</span>
                         </div>
                         <h3 className="text-3xl font-[900] tracking-tight leading-tight max-w-lg">Your Personal Academic Chain</h3>
                         <p className="text-slate-400 text-sm leading-relaxed max-w-sm">Every grade entry, attendance scan, and behavioral hash linked to your identity is stored in an immutable institutional ledger.</p>
                         <div className="pt-6">
                            <Button className="bg-white text-lns-navy hover:bg-lns-red hover:text-white px-10 h-14 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl transition-all">Request Full Cryptographic Export</Button>
                         </div>
                      </div>
                      <Database size={240} className="absolute -bottom-10 -right-10 text-white/5 pointer-events-none" />
                   </Card>
                </div>
            )}
         </main>
      </div>

      {/* 2FA Setup Modal Flow */}
      {show2FA && (
         <div className="fixed inset-0 z-50 bg-lns-navy/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
            <Card className="w-full max-w-md border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
               <div className="p-8 border-b border-lns-border flex items-center justify-between">
                  <h3 className="text-xl font-black text-lns-navy uppercase tracking-tight">Setup 2FA Hub</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShow2FA(false)} className="rounded-full"><X size={20} /></Button>
               </div>
               <CardContent className="p-10 text-center">
                  {faStep === 1 ? (
                    <div className="space-y-8">
                       <div className="space-y-2">
                          <h4 className="text-lg font-bold text-lns-navy">Scan Verification Token</h4>
                          <p className="text-xs text-lns-mid-grey px-8">Point your authenticator app (Google/Authy) at the token below.</p>
                       </div>
                       <div className="p-8 bg-lns-light-grey rounded-[2rem] inline-block border-2 border-lns-border/30 relative group cursor-pointer">
                          <QrCode size={160} className="text-lns-navy" />
                          <div className="absolute -top-3 -right-3 bg-lns-red text-white p-2 rounded-xl shadow-lg animate-bounce">
                             <ShieldCheck size={20} />
                          </div>
                       </div>
                       <div className="space-y-4">
                          <input placeholder="ENTER 6-DIGIT CODE" className="w-full h-14 bg-lns-light-grey rounded-2xl border-none text-center text-xl font-black tracking-[0.5em] text-lns-navy focus:ring-1 focus:ring-lns-navy" maxLength={6} />
                          <Button onClick={() => setFaStep(2)} className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">Activate Identity Lock</Button>
                       </div>
                    </div>
                  ) : (
                    <div className="space-y-8 animate-in zoom-in duration-500">
                       <CheckCircle2 size={64} className="text-green-500 mx-auto" />
                       <div className="space-y-2">
                          <h4 className="text-2xl font-black text-lns-navy uppercase tracking-tight">Security Hardened</h4>
                          <p className="text-sm text-lns-mid-grey">Your LNS Profile is now protected by two-factor authentication.</p>
                       </div>
                       <div className="p-6 bg-lns-light-grey/50 rounded-3xl space-y-2 border border-lns-border/30">
                          <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Backup Recovery Key</p>
                          <p className="text-sm font-mono font-bold text-lns-navy select-all bg-white p-3 rounded-lg border border-lns-border">LNS-A22-F4R-9X9-ZZ0</p>
                       </div>
                       <Button onClick={() => setShow2FA(false)} className="w-full h-16 bg-lns-navy text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">Finish & Exit</Button>
                    </div>
                  )}
               </CardContent>
            </Card>
         </div>
      )}
    </div>
  );
}
