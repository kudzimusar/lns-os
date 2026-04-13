"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  BarChart3, 
  Clock, 
  FileText, 
  CreditCard,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Search
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

const attendanceData = [
  { name: "Mon", score: 92 },
  { name: "Tue", score: 94 },
  { name: "Wed", score: 88 },
  { name: "Thu", score: 96 },
  { name: "Fri", score: 91 },
];

export function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [isSealing, setIsSealing] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { label: "Teacher Dashboard", icon: BarChart3 },
    { label: "Attendance Register", icon: UserCheck },
    { label: "AI Insights", icon: Sparkles },
    { label: "Student Report", icon: FileText },
    { label: "Payments", icon: CreditCard },
  ];

  const handleSealAction = () => {
    setIsSealing(true);
    setTimeout(() => {
      setIsSealing(false);
      setIsSealed(true);
      setTimeout(() => setIsSealed(false), 4000);
    }, 1500);
  };

  return (
    <section className="bg-[#0A1F44] py-24 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white font-manrope uppercase"
          >
            See LNS OS in action.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#8C92A0] font-medium font-dm-sans"
          >
            Click through a live preview of the platform. No sign-up required.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-5xl mx-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={cn(
                "flex items-center space-x-2 px-6 py-4 rounded-t-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeTab === i 
                  ? "bg-white text-[#0A1F44] border-b-2 border-[#D62B2B]"
                  : "bg-white/5 text-[#8C92A0] hover:bg-white/10"
              )}
            >
              <tab.icon size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Browser Mockup */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#E0E3EA] rounded-b-2xl md:rounded-[2rem] overflow-hidden shadow-2xl relative">
             {/* Browser Chrome Header */}
             <div className="bg-[#E0E3EA] p-4 flex items-center space-x-4 border-b border-black/5">
                <div className="flex space-x-1.5">
                   <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                   <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                   <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 bg-white/50 rounded-lg h-8 flex items-center px-4 space-x-2">
                   <ShieldCheck size={14} className="text-green-600" />
                   <span className="text-[10px] font-bold text-gray-400 font-mono tracking-tight">app.lnsos.com/teacher/dashboard</span>
                </div>
                <div className="w-20" />
             </div>

             {/* Inner Viewport */}
             <div className="bg-white min-h-[600px] relative overflow-hidden flex">
                {/* Simplified Sidebar */}
                <div className="w-64 bg-[#0A1F44] p-6 hidden lg:flex flex-col space-y-6">
                   <div className="h-4 w-24 bg-white/20 rounded" />
                   <div className="space-y-4">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="flex items-center space-x-3">
                           <div className="w-8 h-8 rounded-lg bg-white/5" />
                           <div className="h-2 flex-1 bg-white/10 rounded" />
                        </div>
                      ))}
                   </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-8 bg-[#F4F5F7]">
                   <AnimatePresence mode="wait">
                      {activeTab === 0 && <DemoDashboard key="dashboard" mounted={mounted} />}
                      {activeTab === 1 && <DemoAttendance key="attendance" onSeal={handleSealAction} isSealing={isSealing} isSealed={isSealed} />}
                      {activeTab === 2 && <DemoAIInsights key="ai" />}
                      {activeTab === 3 && <DemoReport key="report" />}
                      {activeTab === 4 && <DemoPayments key="payments" />}
                   </AnimatePresence>
                </div>

                {/* Blockchain Seal Animation Layer */}
                <AnimatePresence>
                   {isSealed && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-[#E8B84B]/10 backdrop-blur-sm"
                      >
                         <div className="bg-white p-8 rounded-[2rem] shadow-2xl border-4 border-[#E8B84B] flex flex-col items-center space-y-4 max-w-sm text-center">
                            <div className="w-20 h-20 bg-[#E8B84B] rounded-full flex items-center justify-center text-white">
                               <Lock size={40} />
                            </div>
                            <h3 className="text-xl font-black text-[#0A1F44] uppercase font-manrope">Record Sealed</h3>
                            <p className="font-mono text-[10px] text-[#8C92A0] break-all px-4">SHA-256: a3f8b7e2c9d1a3f8b7e2c9d1a3f8b7e2c9d1</p>
                            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100 flex items-center">
                               <CheckCircle2 size={12} className="mr-2" /> Verified on Polygon
                            </div>
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoDashboard({ mounted }: { mounted: boolean }) {
   return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8"
      >
         <div className="flex justify-between items-end">
            <div>
               <h3 className="text-xl font-black text-[#0A1F44] font-manrope uppercase">Good morning, Mr. Okafor</h3>
               <p className="text-xs text-[#8C92A0] uppercase font-bold tracking-widest mt-1">Grade 8A · Monday, 14 April</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-black text-[#0A1F44] tracking-widest">LIVE DATA NODE</span>
            </div>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
               { label: "Power Score", value: "94%", color: "text-[#D62B2B]" },
               { label: "At-Risk", value: "3", color: "text-[#D62B2B]" },
               { label: "Unmarked", value: "7", color: "text-[#0A1F44]" },
               { label: "Messages", value: "2", color: "text-[#0A1F44]" },
            ].map(stat => (
               <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm">
                  <p className="text-[10px] font-black text-[#8C92A0] uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className={cn("text-3xl font-black font-manrope", stat.color)}>{stat.value}</p>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
               <p className="text-[10px] font-black text-[#8C92A0] uppercase tracking-widest mb-6">Weekly Attendance Score</p>
               <div className="h-64 mt-4">
                  {mounted && (
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={attendanceData} role="img" aria-label="Weekly Attendance Score Chart">
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fontWeight: 900, fill: '#8C92A0' }} 
                          />
                          <YAxis hide domain={[0, 100]} />
                          <Bar dataKey="score" radius={[8, 8, 8, 8]} barSize={40}>
                             {attendanceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.score > 90 ? '#0A1F44' : '#D62B2B'} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                  )}
               </div>
            </div>
            <div className="space-y-4">
               <p className="text-[10px] font-black text-[#8C92A0] uppercase tracking-widest mb-4">Pending AI Triggers</p>
               {[
                  { student: "Amara Johnson", reason: "3rd Absence", severity: "High" },
                  { student: "Blake Nkosi", reason: "Grade Drop -12%", severity: "Med" },
               ].map(alert => (
                  <div key={alert.student} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-amber-400">
                     <div className="flex justify-between items-start">
                        <div>
                           <p className="text-xs font-black text-[#0A1F44]">{alert.student}</p>
                           <p className="text-[10px] text-[#8C92A0] font-bold mt-0.5">{alert.reason}</p>
                        </div>
                        <span className="bg-amber-50 text-amber-700 text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest">⚡ AI Flag</span>
                     </div>
                     <button className="mt-4 w-full bg-[#0A1F44] text-white text-[9px] font-black uppercase tracking-widest py-2 rounded-lg hover:bg-slate-800 transition-colors">Approve Action</button>
                  </div>
               ))}
            </div>
         </div>
      </motion.div>
   );
}

function DemoAttendance({ onSeal, isSealing, isSealed }: { onSeal: () => void; isSealing: boolean; isSealed: boolean }) {
   return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
         <div className="flex justify-between items-center">
            <div>
               <h3 className="text-xl font-black text-[#0A1F44] font-manrope uppercase tracking-tight">Mathematics · Period 2</h3>
               <p className="text-xs text-[#8C92A0] uppercase font-bold tracking-widest mt-1">Institutional Roll Call</p>
            </div>
            <div className="flex items-center space-x-3">
               <div className="text-right">
                  <p className="text-[10px] font-black text-[#8C92A0] uppercase tracking-widest">Power Score</p>
                  <p className="text-xl font-black text-[#D62B2B]">18/24 <span className="text-xs opacity-50">75%</span></p>
               </div>
               <button 
                  onClick={onSeal}
                  disabled={isSealing || isSealed}
                  className="bg-[#0A1F44] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center space-x-2 hover:bg-slate-800 disabled:opacity-50"
               >
                  {isSealing ? (
                     <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Sealing...</span>
                     </>
                  ) : (
                     <>
                        <Lock size={14} />
                        <span>Lock Register 🔒</span>
                     </>
                  )}
               </button>
            </div>
         </div>

         <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                     <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-[#8C92A0]">Student Name</th>
                     <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-[#8C92A0]">Verified</th>
                     <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-[#8C92A0]">Engagement</th>
                     <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-[#8C92A0]">Correction Logic</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {[
                     { name: "Amara Johnson", status: "Present", method: "QR_SCAN", engagement: "L4" },
                     { name: "Blake Nkosi", status: "Absent", method: "PENDING", engagement: "L1" },
                     { name: "Cara Mensah", status: "Present", method: "QR_SCAN", engagement: "L3" },
                     { name: "David Moyo", status: "Present", method: "QR_SCAN", engagement: "L4" },
                     { name: "Elena Petrov", status: "Late", method: "MANUAL", engagement: "L2" },
                     { name: "Fatima R.", status: "Present", method: "QR_SCAN", engagement: "L4" },
                  ].map((s, i) => (
                     <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-xs font-black text-[#0A1F44]">{s.name}</td>
                        <td className="px-6 py-4">
                           {s.method === "QR_SCAN" ? (
                              <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full text-[8px] font-bold w-fit border border-green-100 uppercase tracking-widest">
                                 <CheckCircle2 size={10} className="mr-1.5" /> Authenticated
                              </div>
                           ) : (
                              <div className="flex items-center text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-[8px] font-bold w-fit border border-amber-100 uppercase tracking-widest">
                                 <Clock size={10} className="mr-1.5" /> PENDING SYNC
                              </div>
                           )}
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex space-x-1">
                              {["L1", "L2", "L3", "L4"].map(l => (
                                 <div key={l} className={cn(
                                    "w-6 h-6 rounded flex items-center justify-center text-[8px] font-black",
                                    s.engagement === l ? "bg-[#0A1F44] text-white" : "bg-gray-100 text-[#8C92A0]"
                                 )}>{l}</div>
                              ))}
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </motion.div>
   );
}

function DemoAIInsights() {
   return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8"
      >
         <div>
            <h3 className="text-xl font-black text-[#0A1F44] font-manrope uppercase tracking-tight">AI Diagnostic Core</h3>
            <p className="text-xs text-[#8C92A0] uppercase font-bold tracking-widest mt-1">Intelligence layer identifying struggles before they become trends.</p>
         </div>

         <div className="space-y-6">
            {[
               { name: "David Moyo", risk: "3rd consecutive absence", severity: "CRITICAL", draft: "Dear Parent, we noticed David has missed 3 days of school. Is everything okay? We are here to support." },
               { name: "Cara Mensah", risk: "Mathematics grade drop -14%", severity: "HIGH", draft: "Hi Mr. Mensah, Cara's recent assessment score has dipped below her average. I'm planning an intervention session this Wednesday." },
               { name: "Fatima R.", risk: "Communication goal reached", severity: "POSITIVE", draft: "Excellent news! Fatima has consistently achieved Level 4 engagement this term. Shall we award the 'Global Citizen' merit badge?" },
            ].map((card, i) => (
               <div key={i} className={cn(
                  "bg-white p-8 rounded-[2rem] shadow-sm border-l-8 flex flex-col md:flex-row gap-8 items-start",
                  card.severity === "CRITICAL" ? "border-red-500" : card.severity === "HIGH" ? "border-amber-500" : "border-green-500"
               )}>
                  <div className="w-full md:w-32 pt-1">
                     <span className={cn(
                        "text-[8px] font-black px-2 py-1 rounded uppercase tracking-[0.2em]",
                        card.severity === "CRITICAL" ? "bg-red-50 text-red-600" : card.severity === "HIGH" ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"
                     )}>{card.severity} RISK</span>
                     <p className="text-sm font-black text-[#0A1F44] mt-2">{card.name}</p>
                     <p className="text-[10px] text-[#8C92A0] font-bold leading-tight mt-1">{card.risk}</p>
                  </div>
                  <div className="flex-1 bg-gray-50 p-6 rounded-2xl relative">
                     <div className="absolute top-4 right-4 text-[9px] font-black text-[#8C92A0] uppercase tracking-widest">
                        AI Draft Ready
                     </div>
                     <textarea 
                        className="w-full bg-transparent text-xs text-[#0A1F44] font-medium leading-relaxed resize-none h-20 outline-none"
                        defaultValue={card.draft}
                     />
                     <div className="flex justify-end space-x-3 mt-4">
                        <button className="px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest text-[#8C92A0] hover:bg-gray-100">✏ Edit Draft</button>
                        <button className="px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest bg-[#0A1F44] text-white hover:bg-slate-800">✓ Approve & Send</button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </motion.div>
   );
}

function DemoReport() {
   return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8"
      >
         <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
               <div className="w-16 h-16 rounded-2xl bg-gray-200" />
               <div>
                  <h3 className="text-xl font-black text-[#0A1F44] font-manrope uppercase tracking-tight">Amara Johnson</h3>
                  <p className="text-xs text-[#8C92A0] uppercase font-bold tracking-widest mt-1">Grade 8A · Spring Term Report</p>
               </div>
            </div>
            <div className="flex flex-col items-end gap-2">
               <span className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Citizenship: Gold (C+)</span>
               <div className="flex items-center text-[10px] font-black text-[#E8B84B] uppercase tracking-widest">
                  <ShieldCheck size={14} className="mr-2" /> Blockchain Verified
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
               { sub: "Mathematics", grade: "B+", comment: "Amara has shown exceptional growth in her logical reasoning this term." },
               { sub: "English", grade: "A-", comment: "Her narrative structures have reached a complex, university-entry standard." },
               { sub: "Science", grade: "B", comment: "A dedicated student with a sharp eye for empirical data collection." },
               { sub: "Humanities", grade: "C+", comment: "Active participant in history seminars, showing strong empathy." },
            ].map(subject => (
               <div key={subject.sub} className="bg-white p-6 rounded-[2rem] shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                     <p className="font-black text-[#0A1F44] uppercase tracking-tight">{subject.sub}</p>
                     <span className="text-2xl font-black text-[#D62B2B]">{subject.grade}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl relative group">
                     <span className="absolute -top-2 left-4 px-2 bg-gray-50 text-[7px] font-black uppercase text-[#8C92A0] tracking-widest">AI Draft · Edited</span>
                     <p className="text-[11px] text-[#0A1F44] font-medium leading-[1.6] leading-relaxed italic">&apos;{subject.comment}&apos;</p>
                  </div>
               </div>
            ))}
         </div>

         <div className="flex justify-between items-center bg-[#0A1F44] p-6 rounded-[2rem]">
            <div className="space-y-1">
               <p className="text-white font-black uppercase tracking-widest text-[10px]">Institutional Ledger Confirmation</p>
               <p className="font-mono text-[8px] text-white/40 break-all">Sealed · Polygon TX: 0xa3f8b7e2c9d1a3f8b7e2c9d1a3f8b7e2c9d1</p>
            </div>
            <div className="flex space-x-3">
               <button className="bg-white text-[#0A1F44] text-[9px] font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-gray-100">Download PDF</button>
               <button className="bg-[#D62B2B] text-white text-[9px] font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-red-700">Verify Record</button>
            </div>
         </div>
      </motion.div>
   );
}

function DemoPayments() {
   return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8"
      >
         <div className="flex justify-between items-end">
            <div>
               <h3 className="text-xl font-black text-[#0A1F44] font-manrope uppercase tracking-tight">Spring Collection Cycle</h3>
               <p className="text-xs text-[#8C92A0] uppercase font-bold tracking-widest mt-1">Institutional Wallet Monitoring</p>
            </div>
            <div className="text-right">
               <p className="text-[10px] font-black text-[#8C92A0] uppercase tracking-widest">Collection Rate</p>
               <p className="text-2xl font-black text-[#D62B2B]">94%</p>
            </div>
         </div>

         <div className="bg-white p-8 rounded-[2rem] shadow-sm space-y-6">
            <div className="flex justify-between items-center">
               <p className="text-sm font-black text-[#0A1F44] uppercase tracking-tight">Total Collected</p>
               <p className="text-xl font-black text-[#0A1F44]">£134,180 <span className="text-xs text-[#8C92A0] font-bold">/ £142,400</span></p>
            </div>
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-green-500 w-[94%] rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
            </div>
         </div>

         <div className="space-y-4">
            {[
               { item: "Science Museum Trip", amount: "£24", status: "Paid", icon: CheckCircle2, iconColor: "text-green-500" },
               { item: "Annual School Fee", amount: "£1,600", status: "Pending", icon: AlertCircle, iconColor: "text-amber-500" },
               { item: "Advanced Chess Club", amount: "£48", status: "Paid", icon: CheckCircle2, iconColor: "text-green-500" },
            ].map((p, i) => (
               <div key={i} className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between group hover:border-[#D62B2B]/20 border border-transparent transition-all">
                  <div className="flex items-center space-x-4">
                     <p className="font-black text-[#0A1F44] uppercase tracking-tight">{p.item}</p>
                     <span className={cn("text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border", 
                        p.status === "Paid" ? "bg-green-50 text-green-700 border-green-100" : "bg-amber-50 text-amber-700 border-amber-100")}>
                        {p.status}
                     </span>
                  </div>
                  <div className="flex items-center space-x-8">
                     <p className="text-xl font-black text-[#0A1F44]">{p.amount}</p>
                     {p.status === "Pending" ? (
                        <button className="bg-[#D62B2B] text-white text-[9px] font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-red-700">Pay Now</button>
                     ) : (
                        <div className="flex items-center space-x-2 text-[9px] font-black text-[#E8B84B] uppercase tracking-widest">
                           <ShieldCheck size={14} /> <span>Receipt Sealed</span>
                        </div>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </motion.div>
   );
}
