"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  BarChart3, 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  Zap, 
  Award, 
  ChevronRight,
  Megaphone,
  BellRing,
  ShieldCheck,
  Star,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 md:pb-8">
      {/* Target Announcement Banner */}
      <Card className="border-none shadow-xl bg-[#0A1F44] text-white overflow-hidden relative p-4 sm:p-6 mb-8 rounded-[2.5rem]">
         <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
               <div className="bg-lns-red p-4 rounded-[1.5rem] shadow-lg animate-pulse">
                  <Megaphone size={20} />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Institutional Broadcast</p>
                  <p className="text-sm sm:text-lg font-bold">End of Term Assessment Schedule has been published.</p>
               </div>
            </div>
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 text-[10px] font-black uppercase tracking-widest px-6 h-12 rounded-xl">
               Execute Read Node
            </Button>
         </div>
         <Activity className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64" />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Citizenship & Power Score */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="border-none shadow-xl bg-white p-8 relative overflow-hidden group">
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center space-x-3 text-lns-navy">
                     <Zap size={20} className="text-lns-red" />
                     <p className="text-[10px] font-black uppercase tracking-[0.2em]">Academic Power Score</p>
                  </div>
                  <div className="flex items-baseline space-x-2">
                     <span className="text-5xl font-[900] text-lns-navy tracking-tighter">88.2</span>
                     <span className="text-xs font-black text-green-500 uppercase">+4.1%</span>
                  </div>
                  <div className="w-full bg-lns-light-grey h-2 rounded-full overflow-hidden">
                     <div className="bg-lns-navy h-full w-[88%]" />
                  </div>
               </div>
               <Zap className="absolute -bottom-4 -right-4 text-lns-light-grey/30 group-hover:text-lns-red/5 transition-colors" size={120} />
            </Card>

            <Card className="border-none shadow-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white p-8 relative overflow-hidden group">
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center space-x-3">
                     <Award size={20} />
                     <p className="text-[10px] font-black uppercase tracking-[0.2em]">Citizenship Status</p>
                  </div>
                  <div className="space-y-1">
                     <span className="text-4xl font-[900] tracking-tight uppercase italic">PLATINUM</span>
                     <p className="text-[10px] font-bold text-white/80 uppercase">Elite Institutional Peer Rank</p>
                  </div>
                  <div className="pt-2">
                     <Button className="h-8 bg-white/20 hover:bg-white/30 text-white rounded-lg px-4 text-[9px] font-black uppercase tracking-widest border border-white/30 backdrop-blur-md">
                        View Criterion Details
                     </Button>
                  </div>
               </div>
               <Star className="absolute -bottom-4 -right-4 text-white/10 group-hover:scale-110 transition-transform" size={140} />
            </Card>
          </div>

          <Card className="border-none shadow-sm bg-white overflow-hidden rounded-[2.5rem]">
            <CardHeader className="border-b border-lns-border bg-lns-light-grey/20 px-8 py-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs uppercase tracking-widest text-lns-navy">Next Active Node</CardTitle>
                <div className="flex items-center space-x-2 text-lns-red animate-pulse">
                   <div className="w-1.5 h-1.5 bg-lns-red rounded-full" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Starts in 12m</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-lns-navy tracking-tight">IB English Literature</h3>
                  <div className="flex items-center space-x-6 text-xs font-bold text-lns-mid-grey uppercase mt-2">
                    <span className="flex items-center gap-2"><MapPin size={16} /> Room 4B</span>
                    <span className="flex items-center gap-2"><Clock size={16} /> 11:00 AM</span>
                  </div>
                </div>
                <Link href="/student/scan">
                   <Button className="h-16 px-10 bg-lns-navy text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-lns-navy/30 group">
                     Scan Into Session <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
           <Card className="border-none shadow-xl bg-lns-navy text-white p-10 rounded-[3rem] space-y-6 overflow-hidden relative group">
              <h3 className="text-xl font-black uppercase tracking-tight relative z-10">AI Academic Forecast</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-bold relative z-10">
                 Your trend suggests a potential A* in Humanities if you maintain current Engagement levels (+4% this week).
              </p>
              <div className="pt-4 space-y-2 relative z-10">
                 <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-lns-mid-grey">
                    <span>Progress to Target</span>
                    <span>88%</span>
                 </div>
                 <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden shadow-inner">
                    <div className="bg-lns-red h-full w-[88%] shadow-[0_0_10px_rgba(214,43,43,0.5)]" />
                 </div>
              </div>
              <ShieldCheck className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64 pointer-events-none" />
           </Card>

           <Card className="border-none shadow-sm bg-white p-8 space-y-6 rounded-[2.5rem]">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-mid-grey">Ledger Feedback</h4>
              <div className="space-y-6">
                 {[1, 2].map((i) => (
                   <div key={i} className="flex items-start space-x-4 border-b border-lns-border pb-6 last:border-0 last:pb-0">
                      <div className="w-10 h-10 rounded-xl bg-lns-light-grey flex items-center justify-center text-lns-navy shrink-0 font-black shadow-inner ring-2 ring-white">SJ</div>
                      <div className="space-y-1">
                         <p className="text-sm font-bold text-lns-navy">Sarah Jenkins</p>
                         <p className="text-[11px] text-lns-mid-grey font-medium leading-normal italic">Excellent depth in your literary critique of Hamlet. Focus on structural coherence in next assessment.</p>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
