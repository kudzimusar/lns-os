"use client";

import React from "react";
import PageShell from "@/components/ui/PageShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  History
} from "lucide-react";
import { motion } from "framer-motion";
import { SealedBadge } from "@/components/blockchain/SealedBadge";

const familyAttendance = [
  {
    student: "Amara Johnson",
    id: "stud_1",
    status: "Present",
    arrivalTime: "07:42 AM",
    streak: "14 Days",
    weeklyScore: 98,
    hash: "a3f8b7...842e"
  },
  {
    student: "Marcus Johnson",
    id: "stud_2",
    status: "Present",
    arrivalTime: "07:55 AM",
    streak: "2 Days",
    weeklyScore: 94,
    hash: "b9c1d2...r51t"
  }
];

export default function FamilyAttendancePage() {
  return (
    <PageShell 
      title="Family Attendance" 
      description="Real-time presence monitoring for all your children — blockchain-verified."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Summary Stats */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Family Present", value: "2/2", icon: shieldCheckColor },
            { label: "On-Time Rate", value: "96%", icon: trendingUpColor },
            { label: "Verification Status", value: "Locked", icon: lockColor },
            { label: "Last Sync", value: "Just Now", icon: clockColor }
          ].map(stat => (
            <Card key={stat.label} className="border-none shadow-sm bg-white">
              <CardContent className="p-6">
                <p className="text-[10px] font-black text-[#8C92A0] uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-[#0A1F44] font-manrope">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Individual Cards */}
        {familyAttendance.map((child, index) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="border-none shadow-xl overflow-hidden bg-white group h-full">
              <div className="bg-[#0A1F44] p-6 flex justify-between items-center text-white">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight">{child.student}</h3>
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-0.5">Today&apos;s Status</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase text-[#E8B84B] tracking-widest mb-1">Sealed</span>
                  <SealedBadge hash={child.hash} />
                </div>
              </div>
              
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-[#0A1F44]">{child.status}</p>
                      <p className="text-[10px] text-[#8C92A0] font-bold uppercase tracking-widest leading-none">Verified Arrival</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-[#0A1F44]">{child.arrivalTime}</p>
                    <p className="text-[10px] text-[#8C92A0] font-bold uppercase tracking-widest leading-none">Timestamp</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                   <div>
                      <p className="text-[9px] font-black text-[#8C92A0] uppercase tracking-widest mb-1">Attendance Streak</p>
                      <p className="text-xl font-black text-[#D62B2B]">{child.streak} 🔥</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-black text-[#8C92A0] uppercase tracking-widest mb-1">Weekly Score</p>
                      <p className="text-xl font-black text-[#0A1F44]">{child.weeklyScore}%</p>
                   </div>
                </div>

                <div className="p-4 bg-[#F4F5F7] rounded-xl flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                      <TrendingUp size={16} className="text-[#0A1F44]" />
                      <span className="text-[10px] font-black text-[#0A1F44] uppercase tracking-widest">View Historical Trends</span>
                   </div>
                   <ArrowRight size={16} className="text-[#8C92A0] group-hover:text-[#D62B2B] transition-colors" />
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                   <p className="text-[8px] font-mono text-[#8C92A0] break-all uppercase">
                      CRYPTO-NODE: {child.hash}
                   </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Global Attendance Log */}
        <div className="lg:col-span-3">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
               <h3 className="text-sm font-black text-[#0A1F44] uppercase tracking-widest flex items-center">
                  <History size={18} className="mr-2 text-[#D62B2B]" /> Unified Engagement Log
               </h3>
               <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-[#8C92A0] hover:text-[#0A1F44]">
                  Download Full Record
               </Button>
            </div>
            <CardContent className="p-0">
               <table className="w-full text-left">
                  <thead className="bg-[#F4F5F7]">
                     <tr>
                        <th className="px-8 py-4 text-[9px] font-black text-[#8C92A0] uppercase tracking-widest">Student</th>
                        <th className="px-8 py-4 text-[9px] font-black text-[#8C92A0] uppercase tracking-widest">Date</th>
                        <th className="px-8 py-4 text-[9px] font-black text-[#8C92A0] uppercase tracking-widest">Status</th>
                        <th className="px-8 py-4 text-[9px] font-black text-[#8C92A0] uppercase tracking-widest">Integrity Seal</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {[
                        { student: "Amara Johnson", date: "11 April 2026", status: "Present", code: "3A91" },
                        { student: "Marcus Johnson", date: "11 April 2026", status: "Present", code: "7B22" },
                        { student: "Amara Johnson", date: "10 April 2026", status: "Late (5m)", code: "1F41" },
                        { student: "Marcus Johnson", date: "10 April 2026", status: "Present", code: "9D82" },
                     ].map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-8 py-4 text-xs font-black text-[#0A1F44] uppercase">{row.student}</td>
                           <td className="px-8 py-4 text-xs font-bold text-[#8C92A0] uppercase">{row.date}</td>
                           <td className="px-8 py-4">
                              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${row.status.includes('Present') ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                 {row.status}
                              </span>
                           </td>
                           <td className="px-8 py-4">
                              <div className="flex items-center space-x-2">
                                 <ShieldCheck size={12} className="text-[#E8B84B]" />
                                 <span className="text-[10px] font-mono text-[#8C92A0] uppercase">{row.code}</span>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

const shieldCheckColor = <ShieldCheck className="text-green-500" />;
const trendingUpColor = <TrendingUp className="text-[#D62B2B]" />;
const lockColor = <ShieldCheck className="text-[#E8B84B]" />;
const clockColor = <Clock className="text-[#0A1F44]" />;
