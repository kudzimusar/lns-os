"use client";

import React from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "LNS OS changed how we run our school. The blockchain audit trail alone has resolved three parent disputes this term — we simply showed them the immutable record.",
    author: "Dr. Sarah Chen",
    role: "Principal, Westbrook Academy"
  },
  {
    quote: "As a teacher, I used to spend Sunday evenings writing report card comments. Now AI drafts them based on my class data and I spend 20 minutes reviewing. That time goes back to my students.",
    author: "Mr. James Okafor",
    role: "Head of Mathematics, Northside College"
  },
  {
    quote: "My daughter's Achievement Passport was accepted by three universities as part of her application — without a single phone call to the school. That is the future.",
    author: "Mrs. Fatima Al-Rashid",
    role: "Parent"
  }
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#F4F5F7] py-24 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto font-manrope">
          <h2 className="text-4xl md:text-5xl font-black text-[#0A1F44] uppercase leading-none">
            What school leaders are saying.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500">
               <div>
                  <Quote size={40} className="text-[#D62B2B] mb-8" />
                  <p className="text-xl font-bold text-[#0A1F44] font-dm-sans leading-relaxed mb-10 italic">
                     &ldquo;{t.quote}&rdquo;
                  </p>
               </div>
               <div>
                  <p className="text-lg font-black text-[#0A1F44] font-manrope uppercase tracking-tight">{t.author}</p>
                  <p className="text-xs font-bold text-[#8C92A0] uppercase tracking-widest mt-1">{t.role}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
