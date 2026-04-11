"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Building2, 
  Users, 
  ArrowUpRight, 
  Zap, 
  Activity, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  Cpu,
  Database
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const performanceData = [
  { name: "Mon", load: 2400, auths: 4000 },
  { name: "Tue", load: 1398, auths: 3000 },
  { name: "Wed", load: 9800, auths: 2000 },
  { name: "Thu", load: 3908, auths: 2780 },
  { name: "Fri", load: 4800, auths: 1890 },
];

export default function CorporateDashboard() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-widest uppercase">Performance <span className="text-lns-red">Hub</span></h1>
          <p className="text-[#4A5568] font-bold uppercase tracking-widest text-[10px] mt-1">Global Platform Governance • Operational Node 01</p>
        </div>
        <div className="flex bg-[#1A1F37] p-1 rounded-2xl border border-white/5">
           <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-white bg-white/5 px-6">Live Feed</Button>
           <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-[#4A5568] px-6">History Audit</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Total Schools", val: "142", trend: "+8", icon: Building2, color: "text-blue-500" },
           { label: "Active Users", val: "1.2M", trend: "+14.2k", icon: Users, color: "text-purple-500" },
           { label: "Ledger Health", val: "100%", trend: "STABLE", icon: ShieldCheck, color: "text-green-500" },
           { label: "Platform Revenue", val: ".8M", trend: "+12%", icon: TrendingUp, color: "text-lns-red" },
         ].map((stat) => (
           <Card key={stat.label} className="bg-[#1A1F37] border-none shadow-2xl p-6 overflow-hidden relative group hover:bg-[#252B4D] transition-all">
              <div className="relative z-10">
                 <div className="flex justify-between items-start mb-4">
                    <div className={cn("p-3 rounded-2xl bg-black/20", stat.color)}>
                       <stat.icon size={20} />
                    </div>
                    <div className={cn("px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white/5", stat.trend.includes('+') ? "text-green-500" : "text-blue-500")}>
                       {stat.trend}
                    </div>
                 </div>
                 <p className="text-3xl font-black text-white tracking-tighter">{stat.val}</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#4A5568] mt-1">{stat.label}</p>
              </div>
              <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                 <stat.icon size={120} />
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 bg-[#1A1F37] border-none shadow-2xl p-8">
            <CardHeader className="flex flex-row items-center justify-between px-0 pt-0 pb-8">
               <CardTitle className="text-xs uppercase tracking-[0.3em] font-black text-white">Platform-Wide API Load</CardTitle>
               <div className="flex items-center space-x-2">
                  <Cpu size={16} className="text-lns-red" />
                  <span className="text-[10px] font-black text-[#4A5568] uppercase">Claude 3.5 Sonnet Active</span>
               </div>
            </CardHeader>
            <div className="h-[350px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                     <defs>
                        <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#D62B2B" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#D62B2B" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D3748" strokeOpacity={0.2} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4A5568', fontSize: 10}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#4A5568', fontSize: 10}} />
                     <Tooltip contentStyle={{backgroundColor: '#1A1F37', border: 'none', borderRadius: '12px', fontSize: '10px'}} />
                     <Area type="monotone" dataKey="load" stroke="#D62B2B" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </Card>

         <div className="space-y-6">
            <Card className="bg-[#1A1F37] border-none shadow-2xl p-8 space-y-6">
               <h3 className="text-xs uppercase tracking-[0.3em] font-black text-white">Infrastructure Health</h3>
               <div className="space-y-4">
                  {[
                    { node: "Sovereign Cloud Hub", status: "Healthy", latency: "14ms" },
                    { node: "Blockchain Consensus", status: "Active", latency: "112ms" },
                    { node: "AI Synthesis Engine", status: "Peak", latency: "850ms" },
                  ].map(node => (
                    <div key={node.node} className="p-4 bg-black/20 rounded-2xl border border-white/5 flex items-center justify-between">
                       <div>
                          <p className="text-xs font-bold text-white uppercase tracking-tight">{node.node}</p>
                          <p className="text-[10px] font-black text-[#4A5568] uppercase mt-1">LATENCY: {node.latency}</p>
                       </div>
                       <span className="text-[9px] font-black uppercase text-green-500 bg-green-500/10 px-2 py-1 rounded-md">{node.status}</span>
                    </div>
                  ))}
               </div>
               <Button className="w-full h-12 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">
                  View Full Stack Trace
               </Button>
            </Card>

            <Card className="bg-gradient-to-br from-[#1A1F37] to-lns-red/20 border-none shadow-2xl p-8 text-center space-y-6">
               <Database className="mx-auto text-lns-red" size={40} />
               <div className="space-y-2">
                  <h4 className="text-lg font-black text-white uppercase tracking-tight">Security Protocol Beta</h4>
                  <p className="text-xs text-[#A0AEC0] leading-relaxed">
                     Zero-Knowledge proof integration for Grade exports is now 85% tested across the pilot fleet.
                  </p>
               </div>
               <Button className="w-full h-14 bg-white text-lns-navy rounded-2xl font-black uppercase tracking-widest text-[10px]">Initialize Upgrade</Button>
            </Card>
         </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
