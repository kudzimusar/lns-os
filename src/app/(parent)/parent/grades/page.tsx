"use client";

import React from "react";
import PageShell from "@/components/ui/PageShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  TrendingUp, 
  Award, 
  BookOpen, 
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

const childrenGrades = [
  {
    name: "Amara Johnson",
    gpa: "3.92",
    rank: "Top 3%",
    subjects: [
      { name: "Mathematics", grade: "A+", score: 98, trend: "up" },
      { name: "Physics", grade: "A", score: 92, trend: "up" },
      { name: "English Literature", grade: "A", score: 94, trend: "stable" }
    ]
  },
  {
    name: "David Moyo",
    gpa: "3.45",
    rank: "Top 15%",
    subjects: [
      { name: "Mathematics", grade: "B+", score: 88, trend: "up" },
      { name: "Computer Science", grade: "A", score: 91, trend: "stable" },
      { name: "History", grade: "B", score: 82, trend: "down" }
    ]
  }
];

export default function ParentGradesPage() {
  return (
    <PageShell 
      title="Academic Performance" 
      description="Blockchain-sealed grade reports and continuous AI performance tracking."
    >
      <div className="space-y-12 mt-8">
        {childrenGrades.map((child, childIdx) => (
          <div key={child.name} className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-xl font-black text-[#0A1F44] uppercase tracking-tight font-manrope">{child.name}</h3>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-[10px] font-black text-[#8C92A0] uppercase tracking-widest">Weighted GPA</p>
                  <p className="text-xl font-black text-[#D62B2B]">{child.gpa}</p>
                </div>
                <div className="w-px h-8 bg-gray-100" />
                <div className="text-right">
                  <p className="text-[10px] font-black text-[#8C92A0] uppercase tracking-widest">Global Rank</p>
                  <p className="text-xl font-black text-[#0A1F44]">{child.rank}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {child.subjects.map((sub, i) => (
                <motion.div
                  key={sub.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (childIdx * 3 + i) * 0.1 }}
                >
                  <Card className="border-none shadow-xl bg-white group hover:translate-y-[-4px] transition-all cursor-pointer">
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-[#0A1F44]/5 flex items-center justify-center text-[#0A1F44] group-hover:bg-[#0A1F44] group-hover:text-white transition-all">
                          <BookOpen size={24} />
                        </div>
                        <div className="text-right">
                           <span className="text-3xl font-black text-[#0A1F44] leading-none">{sub.grade}</span>
                           <p className="text-[10px] font-black text-[#8C92A0] uppercase tracking-widest mt-1">{sub.score}% Verified</p>
                        </div>
                      </div>
                      
                      <h4 className="text-sm font-black text-[#0A1F44] uppercase tracking-tight mb-4">{sub.name}</h4>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                         <div className="flex items-center space-x-2">
                            <TrendingUp size={14} className={sub.trend === 'up' ? 'text-green-500' : sub.trend === 'down' ? 'text-red-500' : 'text-blue-500'} />
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#8C92A0]">Progress: {sub.trend}</span>
                         </div>
                         <ChevronRight size={16} className="text-gray-200 group-hover:text-[#D62B2B] transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="border-none bg-[#0A1F44] p-6 rounded-3xl overflow-hidden relative">
               <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 rounded-xl bg-[#E8B84B]/20 flex items-center justify-center">
                        <Zap size={20} className="text-[#E8B84B] animate-pulse" />
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-[#E8B84B] uppercase tracking-widest">AI Prediction Layer</p>
                        <p className="text-xs font-bold text-white/80 italic">&ldquo;Based on current entropy, {child.name.split(' ')[0]} is on track for an A* in Mathematics by year-end.&rdquo;</p>
                     </div>
                  </div>
                  <Button className="bg-white/10 hover:bg-white/20 text-white text-[9px] font-black uppercase tracking-widest h-10 px-6 rounded-xl border border-white/10">
                     View Mastery Map
                  </Button>
               </div>
            </Card>
          </div>
        ))}

        {/* Global Security Footer */}
        <div className="pt-12 text-center">
           <div className="inline-flex items-center space-x-3 bg-gray-50 px-6 py-2 rounded-full border border-gray-100">
              <ShieldCheck size={14} className="text-green-600" />
              <span className="text-[10px] font-black text-[#8C92A0] uppercase tracking-widest">All grades are finalized on the Institutional Ledger v2.0</span>
           </div>
        </div>
      </div>
    </PageShell>
  );
}
