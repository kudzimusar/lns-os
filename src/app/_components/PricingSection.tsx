import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Standard",
    subtitle: "For growing schools",
    price: "From £X",
    features: [
      "Up to 500 students",
      "All core modules",
      "Stripe + PayPal payments",
      "Standard support"
    ],
    cta: "Get Started",
    highlight: false
  },
  {
    name: "Premium",
    subtitle: "For established schools",
    price: "From £X",
    features: [
      "Up to 2,000 students",
      "Everything in Standard",
      "Advanced AI suite",
      "Reduced platform fee (0.25%)",
      "Priority support"
    ],
    cta: "Get Started",
    highlight: true,
    badge: "Most Popular"
  },
  {
    name: "Enterprise",
    subtitle: "For multi-school districts",
    price: "Custom",
    features: [
      "Unlimited students",
      "Corporate admin console",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee"
    ],
    cta: "Talk to Sales",
    highlight: false
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-[#0A1F44] py-24 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto font-manrope">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-none">
            Transparent pricing. <br />
            <span className="text-[#8C92A0]">No surprises.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {tiers.map((tier, i) => (
            <div 
              key={tier.name} 
              className={cn(
                "p-10 rounded-[3rem] flex flex-col justify-between relative transition-all duration-500",
                tier.highlight 
                  ? "bg-white border-[3px] border-[#D62B2B] scale-105 shadow-2xl z-10" 
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              )}
            >
               {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D62B2B] text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg">
                     {tier.badge}
                  </div>
               )}

               <div>
                  <h3 className={cn("text-sm font-black uppercase tracking-[0.2em] mb-2", tier.highlight ? "text-[#D62B2B]" : "text-[#8C92A0]")}>
                     {tier.name}
                  </h3>
                  <p className={cn("text-xl font-bold font-manrope uppercase leading-tight mb-8", tier.highlight ? "text-[#0A1F44]" : "text-white")}>
                     {tier.subtitle}
                  </p>
                  
                  <div className="mb-10">
                     <span className={cn("text-4xl font-black font-manrope", tier.highlight ? "text-[#0A1F44]" : "text-white")}>{tier.price}</span>
                     <span className={cn("text-sm font-bold uppercase tracking-widest ml-1", tier.highlight ? "text-[#8C92A0]" : "text-white/40")}>/month</span>
                  </div>

                  <ul className="space-y-4 mb-12">
                     {tier.features.map(feature => (
                        <li key={feature} className="flex items-start space-x-3">
                           <Check size={18} className={tier.highlight ? "text-[#D62B2B]" : "text-[#E8B84B]"} />
                           <span className={cn("text-[13px] font-bold font-dm-sans leading-relaxed", tier.highlight ? "text-[#2E3A4E]" : "text-white/60")}>{feature}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               <Link href="/login">
                  <Button 
                    className={cn(
                      "w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 shadow-xl",
                      tier.highlight ? "bg-[#D62B2B] text-white hover:bg-[#B82525] shadow-[#D62B2B]/20" : "bg-white text-[#0A1F44] hover:bg-gray-100"
                    )}
                  >
                     {tier.cta} <ArrowRight className="ml-3" size={16} />
                  </Button>
               </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
