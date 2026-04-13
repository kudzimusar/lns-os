"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ShieldCheck, 
  ScrollText, 
  QrCode, 
  CreditCard, 
  LayoutGrid 
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Sparkles,
    color: "#E8B84B",
    heading: "AI-First by Design",
    body: "Every report card comment, parent alert, attendance summary, and intervention plan starts as an AI draft. Teachers review, edit, and approve with one tap. Nothing sends without human sign-off.",
    tag: "Claude AI Powered"
  },
  {
    icon: ShieldCheck,
    color: "#E8B84B",
    heading: "Blockchain Integrity",
    body: "Attendance, grades, payments, and communications are hashed to an immutable blockchain ledger the moment they are created. No silent edits. No disputed records. No missing evidence.",
    tag: "Polygon + AWS QLDB"
  },
  {
    icon: ScrollText,
    color: "#E8B84B",
    heading: "Student Achievement Passport",
    body: "Every student earns a blockchain-anchored Achievement Passport. Universities and employers verify it with a QR scan — no phone calls, no forged documents, no uncertainty.",
    tag: "Publicly Verifiable"
  },
  {
    icon: QrCode,
    color: "white",
    heading: "QR Identity System",
    body: "Students, teachers, and staff have unique QR identities. Classroom attendance, canteen payments, event entry, and trip boarding — all verified by scan.",
    tag: "Triple-Verified Attendance"
  },
  {
    icon: CreditCard,
    color: "white",
    heading: "Integrated Payments",
    body: "Stripe, PayPal, Apple Pay, bank transfer, school wallet — all payment methods, all categories, all connected to the school workflow. Every transaction blockchain-sealed.",
    tag: "Stripe Connect Powered"
  },
  {
    icon: LayoutGrid,
    color: "white",
    heading: "Four-Portal System",
    body: "Teacher portal. Student portal. Parent portal. Admin console. Each role sees exactly what they need, in their language, on any device — installed as a native PWA.",
    tag: "PWA — Works Everywhere"
  }
];

export function FeatureGrid() {
  return (
    <section id="features" className="bg-[#0A1F44] py-24 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white font-manrope uppercase"
          >
            One platform. Every stakeholder. Zero compromises.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.heading}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/5 p-8 rounded-[2rem] group hover:border-[#E8B84B]/30 transition-all duration-500 relative flex flex-col justify-between h-full"
            >
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E8B84B]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               
               <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                     <feature.icon size={28} className={cn(feature.color === "white" ? "text-white" : `text-[${feature.color}]`)} style={{ color: feature.color }} />
                  </div>
                  
                  <h3 className="text-xl font-black text-white uppercase font-manrope tracking-tight mb-4">
                     {feature.heading}
                  </h3>
                  
                  <p className="text-[#8C92A0] font-medium leading-relaxed font-dm-sans mb-8">
                     {feature.body}
                  </p>
               </div>

               <div className="bg-white/5 px-4 py-2 rounded-full w-fit border border-white/5">
                  <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{feature.tag}</span>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
