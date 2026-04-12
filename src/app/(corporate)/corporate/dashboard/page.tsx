"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Users, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight,
  Download,
  Activity,
  Globe,
  Database
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from "recharts";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Active Institutions", value: "142", trend: "+12%", icon: Building2 },
  { label: "Total Data Nodes", value: "884k", trend: "+24%", icon: Database },
  { label: "Aggregate Power", value: "82.4", trend: "+2.1%", icon: Zap },
  { label: "Compliance Rate", value: "99.9%", trend: "0%", icon: ShieldCheck },
];

const analyticData = [
  { month: "Jan", growth: 4000, active: 2400 },
  { month: "Feb", growth: 3000, active: 1398 },
  { month: "Mar", growth: 2000, active: 9800 },
  { month: "Apr", growth: 2780, active: 3908 },
  { month: "May", growth: 1890, active: 4800 },
  { month: "Jun", growth: 2390, active: 3800 },
];

export default function CorporateDashboard() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-[900] text-white tracking-tighter uppercase italic">Platform <span className="text-lns-red">Performance</span></h2>
          <p className="text-[#4A5568] font-black uppercase tracking-[0.3em] text-[10px] mt-2">Global Institutional Intelligence Core</p>
        </div>
        <div className="flex items-center space-x-3">
           <Button variant="outline" className="border-white/5 bg-white/5 text-white hover:bg-white/10 h-12 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest">
              <Download size={16} className="mr-2" /> Export Global Audit
           </Button>
           <Button className="bg-lns-red hover:bg-red-700 text-white h-12 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-[0_0_30px_rgba(214,43,43,0.3)] border-none">
              <Activity size={16} className="mr-2" /> Live Node Status
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((s) => (
           <Card key={s.label} className="bg-[#1A1F37] border-white/5 p-6 hover:border-lns-red/50 transition-all group overflow-hidden relative">
              <div className="relative z-10 flex justify-between items-start mb-4">
                 <div className="p-3 bg-white/5 rounded-2xl text-lns-red group-hover:bg-lns-red group-hover:text-white transition-all">
                    <s.icon size={22} />
                 </div>
                 <div className={cn(
                   "text-[10px] font-black px-2 py-1 rounded-lg",
                   s.trend.startsWith('+') ? "bg-green-500/10 text-green-500" : "bg-white/5 text-slate-400"
                 )}>
                    {s.trend}
                 </div>
              </div>
              <p className="text-3xl font-[900] text-white tracking-tighter relative z-10">{s.value}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4A5568] mt-1 relative z-10">{s.label}</p>
              <s.icon size={120} className="absolute -bottom-8 -right-8 text-white/5 group-hover:text-lns-red/5 transition-all" />
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 bg-[#1A1F37] border-white/5 p-8 relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-0 mb-8 border-none bg-transparent">
               <CardTitle className="text-white text-lg font-black uppercase tracking-tight">Systemic Growth Vectors</CardTitle>
               <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase"><div className="w-2 h-2 bg-lns-red rounded-full" /> New Nodes</div>
                  <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase pl-4"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Active Users</div>
               </div>
            </CardHeader>
            <div className="h-[350px] relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticData}>
                     <defs>
                        <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#D62B2B" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#D62B2B" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#4A5568', fontSize: 10, fontWeight: 900}} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#4A5568', fontSize: 10, fontWeight: 900}} />
                     <Tooltip contentStyle={{backgroundColor: '#1A1F37', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}} />
                     <Area type="monotone" dataKey="growth" stroke="#D62B2B" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            <Globe size={400} className="absolute -top-32 -right-32 text-white/5 pointer-events-none" />
         </Card>

         <div className="space-y-6">
            <Card className="bg-[#1A1F37] border-white/5 p-8 h-full bg-gradient-to-br from-[#1A1F37] to-[#0A1F44]">
               <h3 className="text-xl font-black text-white uppercase tracking-tight mb-6">Regional Sync Hub</h3>
               <div className="space-y-6">
                  {[
                    { region: "Northen Node", status: "Active", load: "72%" },
                    { region: "Southern Node", status: "Active", load: "45%" },
                    { region: "Central Proxy", status: "Scaling", load: "91%" },
                  ].map(r => (
                    <div key={r.region} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-lns-red/30 transition-all group cursor-pointer">
                       <div className="flex justify-between items-center mb-3">
                          <p className="text-xs font-black text-white uppercase">{r.region}</p>
                          <span className="text-[9px] font-black text-green-500 uppercase tracking-widest flex items-center">
                             <div className="w-1 h-1 bg-green-500 rounded-full mr-2" /> {r.status}
                          </span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full transition-all duration-1000", parseInt(r.load) > 80 ? "bg-lns-red shadow-[0_0_10px_rgba(214,43,43,0.5)]" : "bg-blue-500")} 
                            style={{width: r.load}} 
                          />
                       </div>
                    </div>
                  ))}
               </div>
               <Button className="w-full h-14 bg-white text-lns-navy rounded-2xl font-black uppercase tracking-widest text-[10px]">Initialize Upgrade</Button>
            </Card>
         </div>
      </div>
    </div>
  );
}
