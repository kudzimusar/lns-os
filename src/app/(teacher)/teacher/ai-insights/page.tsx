"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  BrainCircuit, 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  Target,
  Sparkles,
  ChevronRight,
  TrendingDown
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIInsightsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight flex items-center">
            <BrainCircuit className="mr-3 text-lns-red" size={32} />
            LNS AI Insights
          </h1>
          <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px]">Strategic Prediction & Analysis Engine</p>
        </div>
        <Button className="bg-lns-navy hover:bg-lns-red text-white">
           <Sparkles size={18} className="mr-2" />
           Regenerate Global Analysis
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Insight Column */}
        <div className="lg:col-span-2 space-y-8">
           <Card className="border-none shadow-2xl bg-gradient-to-br from-lns-navy to-slate-900 text-white overflow-hidden relative p-8 md:p-12">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                 <BrainCircuit size={280} />
              </div>
              <div className="relative z-10 space-y-6">
                 <div className="inline-flex items-center space-x-2 px-3 py-1 bg-lns-red/20 rounded-full border border-lns-red/30">
                    <div className="w-1.5 h-1.5 bg-lns-red rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-lns-red">Executive Summary</span>
                 </div>
                 <h2 className="text-3xl font-[900] tracking-tight leading-tight max-w-xl">
                    "Predictive trends suggest a **12% increase** in Grade 10 Math outcomes if inter-disciplinary literacy tasks are integrated into Semester 2."
                 </h2>
                 <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                    Current school data (1,244,902 data points) analyzed. Correlation detected between period 1 attendance and post-lunch engagement levels.
                 </p>
                 <div className="pt-6 flex flex-wrap gap-4">
                    <Button className="bg-lns-red hover:bg-red-700 border-none px-8 rounded-2xl h-14 font-black uppercase tracking-widest text-xs">View Data Backing</Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-lns-navy px-8 rounded-2xl h-14 font-black uppercase tracking-widest text-xs">Save to Reports</Button>
                 </div>
              </div>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm bg-white p-6 space-y-4">
                 <div className="flex items-center justify-between">
                    <Target className="text-lns-navy" size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Cohort Strength</span>
                 </div>
                 <div>
                    <h4 className="font-black text-lns-navy italic">Grade 11 Humanities</h4>
                    <p className="text-xs text-lns-mid-grey mt-1">Showing 94th percentile performance in critical analysis across all IB schools in the trust.</p>
                 </div>
                 <div className="pt-4 flex items-center text-[10px] font-black uppercase text-green-600">
                    <TrendingUp size={14} className="mr-1" />
                    Outperforming Global Avg +14%
                 </div>
              </Card>

              <Card className="border-none shadow-sm bg-white p-6 space-y-4">
                 <div className="flex items-center justify-between">
                    <AlertTriangle className="text-lns-red" size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Warning: Burnout Risk</span>
                 </div>
                 <div>
                    <h4 className="font-black text-lns-navy italic">Mathematics Dept.</h4>
                    <p className="text-xs text-lns-mid-grey mt-1">High workload detected in last 14 days (120+ assessments published). Scheduling conflict potential detected.</p>
                 </div>
                 <div className="pt-4 flex items-center text-[10px] font-black uppercase text-lns-red">
                    <TrendingDown size={14} className="mr-1" />
                    Support Recommended
                 </div>
              </Card>
           </div>
        </div>

        {/* Action Sidebar */}
        <Card className="lg:col-span-1 border-none shadow-sm bg-lns-light-grey/50 p-8 space-y-8">
           <h3 className="text-sm font-black uppercase tracking-widest text-lns-navy">Strategic Recommendations</h3>
           <div className="space-y-4">
              {[
                { title: "Adjust Math Schedule", color: "bg-blue-100 text-blue-700" },
                { title: "Increase Literacy Support", color: "bg-green-100 text-green-700" },
                { title: "Conduct Wellness Check", color: "bg-red-100 text-lns-red" },
              ].map((rec, i) => (
                <div key={i} className="bg-white p-4 rounded-3xl shadow-sm border border-lns-border/20 group cursor-pointer hover:border-lns-red transition-all">
                   <div className={cn("inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter mb-3", rec.color)}>Action Red</div>
                   <h5 className="text-sm font-bold text-lns-navy mb-2 group-hover:text-lns-red transition-all">{rec.title}</h5>
                   <p className="text-[10px] text-lns-mid-grey leading-tight">AI identified this as a critical path to improve overall school power score by +2% in 30 days.</p>
                </div>
              ))}
           </div>
           <Button className="w-full bg-white text-lns-navy border-2 border-lns-navy/10 hover:border-lns-red transition-all h-14 rounded-2xl font-black uppercase tracking-widest text-[10px]">
              Generate Detailed Brief
           </Button>
        </Card>
      </div>
    </div>
  );
}
