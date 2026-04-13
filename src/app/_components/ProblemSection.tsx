"use client";

import React from "react";
import { Lock, Zap, EyeOff, Link2Off } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      title: "Records get altered",
      icon: EyeOff,
      text: "Grade changes happen without audit trails. Attendance is disputed. Report cards are questioned. There is no single source of truth."
    },
    {
      title: "AI is an afterthought",
      icon: Zap,
      text: "Every platform bolts on AI as a feature. In reality, teachers still start with blank pages, write every comment from scratch, and manually spot every struggling student."
    },
    {
      title: "Parents are in the dark",
      icon: Lock,
      text: "Parents receive a termly report card and occasional emails. They have no real-time visibility into their child's progress, attendance, or school payments."
    },
    {
      title: "Payments are siloed",
      icon: Link2Off,
      text: "Trip fees, school fees, canteen payments — all in separate systems. No connection to attendance. No AI communication. No audit trail."
    }
  ];

  return (
    <section className="bg-[#F4F5F7] py-24 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto font-manrope">
          <h2 className="text-4xl md:text-5xl font-black text-[#0A1F44] uppercase leading-none">
            School management is broken. <br />
            <span className="text-[#8C92A0]">Everyone feels it.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {problems.map(problem => (
            <div key={problem.title} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:-translate-y-2 transition-all duration-500">
               <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-[#D62B2B] mb-8">
                  <problem.icon size={32} />
               </div>
               <h3 className="text-2xl font-black text-[#0A1F44] uppercase tracking-tight mb-4 font-manrope">{problem.title}</h3>
               <p className="text-[#8C92A0] font-medium leading-relaxed font-dm-sans">{problem.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
           <p className="italic text-xl font-black text-[#0A1F44] font-manrope uppercase tracking-tight">
              LNS OS was built to fix all of this. Permanently.
           </p>
        </div>
      </div>
    </section>
  );
}
