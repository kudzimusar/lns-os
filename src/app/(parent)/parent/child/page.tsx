"use client";

import React from "react";
import PageShell from "@/components/ui/PageShell";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GraduationCap, ArrowRight, User, Calendar, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const mockChildren = [
  {
    id: "student-001",
    name: "Amara Johnson",
    grade: "8A",
    attendance: "98.2%",
    house: "Red House",
    image: null
  },
  {
    id: "student-004",
    name: "David Moyo",
    grade: "10C",
    attendance: "94.5%",
    house: "Red House",
    image: null
  }
];

export default function MyChildrenPage() {
  return (
    <PageShell 
      title="My Children" 
      description="Manage and view academic progress for your children."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {mockChildren.map((child, index) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border-none shadow-xl bg-white group hover:ring-2 hover:ring-[#D62B2B] transition-all duration-300">
              <CardContent className="p-0">
                <div className="bg-[#0A1F44] p-8 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-4 border-4 border-white/5">
                    <User size={48} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white font-manrope uppercase">{child.name}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#E8B84B] bg-[#E8B84B]/10 px-3 py-1 rounded-full">
                      Grade {child.grade}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60 bg-white/5 px-3 py-1 rounded-full">
                      {child.house}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F4F5F7] p-4 rounded-2xl">
                      <p className="text-[9px] font-black text-[#8C92A0] uppercase tracking-widest mb-1 flex items-center">
                        <Calendar size={12} className="mr-1.5" /> Attendance
                      </p>
                      <p className="text-xl font-black text-[#0A1F44]">{child.attendance}</p>
                    </div>
                    <div className="bg-[#F4F5F7] p-4 rounded-2xl">
                      <p className="text-[9px] font-black text-[#8C92A0] uppercase tracking-widest mb-1 flex items-center">
                        <BookOpen size={12} className="mr-1.5" /> Performance
                      </p>
                      <p className="text-xl font-black text-[#0A1F44]">Excellent</p>
                    </div>
                  </div>

                  <Link href={`/parent/child/${child.id}`}>
                    <Button className="w-full h-14 bg-[#D62B2B] hover:bg-[#B82525] text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-[#D62B2B]/20 transition-all active:scale-95 flex items-center justify-between px-6">
                      <span>View Full Profile</span>
                      <ArrowRight size={18} />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
