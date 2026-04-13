"use client";

import React from "react";
import { GraduationCap, Star, Heart, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const roles = [
  {
    icon: GraduationCap,
    iconColor: "text-[#0A1F44]",
    role: "Teachers",
    headline: "Less admin. More teaching.",
    points: [
      "AI drafts every report card comment",
      "Attendance locked with one tap",
      "At-risk students flagged automatically",
      "All communication approved before sending"
    ],
    cta: "Explore Teacher Portal",
    href: "/login"
  },
  {
    icon: Star,
    iconColor: "text-[#D62B2B]",
    role: "Students",
    headline: "Your achievements, verified forever.",
    points: [
      "Submit work directly in the platform",
      "Grades explained in plain language by AI",
      "QR identity — no lost cards or IDs",
      "Achievement Passport follows you for life"
    ],
    cta: "See Student Portal",
    href: "/login"
  },
  {
    icon: Heart,
    iconColor: "text-[#0A1F44]",
    role: "Parents",
    headline: "Always know how your child is doing.",
    points: [
      "Real-time attendance and grade visibility",
      "Pay trip fees in one tap",
      "Receive teacher messages in your language",
      "Download verified report cards anytime"
    ],
    cta: "Explore Parent Portal",
    href: "/login"
  },
  {
    icon: Building2,
    iconColor: "text-[#E8B84B]",
    role: "Administrators",
    headline: "Run a school with confidence.",
    points: [
      "Blockchain audit trail on everything",
      "AI-generated school-wide reports",
      "Payment collection managed end-to-end",
      "Full compliance and data rights built in"
    ],
    cta: "See Admin Console",
    href: "/login"
  }
];

export function RolesSection() {
  return (
    <section className="bg-[#F4F5F7] py-24 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto font-manrope">
          <h2 className="text-4xl md:text-5xl font-black text-[#0A1F44] uppercase leading-none">
            Built for every person in the school community.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map(role => (
            <div key={role.role} className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col justify-between border-l-4 border-transparent hover:border-[#D62B2B] transition-all duration-500 group">
               <div>
                  <div className={`w-14 h-14 rounded-2xl bg-[#F4F5F7] flex items-center justify-center ${role.iconColor} mb-8`}>
                     <role.icon size={28} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase text-[#8C92A0] tracking-[0.2em] mb-2">{role.role}</h3>
                  <h4 className="text-xl font-black text-[#0A1F44] font-manrope uppercase leading-tight mb-6">{role.headline}</h4>
                  
                  <ul className="space-y-4 mb-12">
                     {role.points.map(point => (
                        <li key={point} className="flex items-start space-x-3">
                           <div className="w-1.5 h-1.5 bg-[#D62B2B]/30 rounded-full mt-1.5" />
                           <span className="text-xs font-bold text-[#8C92A0] font-dm-sans leading-relaxed">{point}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               <Link href={role.href}>
                  <Button variant="ghost" className="w-full justify-between h-12 bg-[#F4F5F7] hover:bg-[#0A1F44] hover:text-white px-6 rounded-xl group-hover:bg-[#0A1F44] group-hover:text-white transition-all">
                     <span className="text-[10px] font-black uppercase tracking-widest">{role.cta}</span>
                     <ArrowRight size={16} />
                  </Button>
               </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
