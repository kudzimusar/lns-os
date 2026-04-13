"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Database, Link as LinkIcon, Lock } from "lucide-react";

export function BlockchainSection() {
  return (
    <section id="security" className="bg-[#0A1F44] py-24 px-6 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Content */}
        <div className="space-y-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-black text-white font-manrope uppercase leading-none"
          >
            The gold standard of <br />
            <span className="text-[#E8B84B]">school record integrity.</span>
          </motion.h2>

          <div className="space-y-12">
            {[
              { 
                title: "Immutable Records",
                text: "Every attendance mark, grade submission, payment, and message is sealed the moment it is created. No one — not the teacher, not the admin, not LNS OS itself — can alter a record without the change being permanently visible in the audit trail." 
              },
              { 
                title: "Publicly Verifiable Credentials",
                text: "Student Achievement Passports and report cards are anchored to the Polygon blockchain. Any university or employer can verify authenticity in seconds by scanning a QR code. No phone calls. No forgeries. No uncertainty." 
              },
              { 
                title: "The Correction Protocol",
                text: "Mistakes happen. When they do, corrections are recorded too — who made them, when, and why. The original record stays visible. Nothing is silently erased. This is accountability by design." 
              }
            ].map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="border-l-2 border-[#E8B84B] pl-8"
              >
                 <h3 className="text-xl font-black text-white uppercase font-manrope mb-4">{pillar.title}</h3>
                 <p className="text-[#8C92A0] font-medium leading-relaxed font-dm-sans">{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Visual */}
        <div className="flex justify-center">
           <div className="relative space-y-8">
              {[
                { label: "Attendance Sealed", icon: ShieldCheck },
                { label: "Grade Submitted", icon: Database },
                { label: "Report Published", icon: LinkIcon },
                { label: "Payment Confirmed", icon: Lock }
              ].map((item, i) => (
                <div key={item.label} className="relative flex flex-col items-center">
                   <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.3 }}
                     className="bg-white/5 border border-[#E8B84B]/40 px-8 py-5 rounded-2xl flex items-center space-x-6 z-10 w-80 shadow-2xl"
                   >
                     <div className="w-12 h-12 bg-[#E8B84B] rounded-full flex items-center justify-center text-[#0A1F44]">
                        <item.icon size={24} />
                     </div>
                     <span className="text-white font-black uppercase text-sm tracking-tight">{item.label}</span>
                   </motion.div>
                   {i !== 3 && (
                     <motion.div 
                       initial={{ height: 0 }}
                       whileInView={{ height: 32 }}
                       transition={{ delay: i * 0.3 + 0.3, duration: 0.5 }}
                       className="w-0.5 bg-gradient-to-b from-[#E8B84B] to-transparent z-0"
                     />
                   )}
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
