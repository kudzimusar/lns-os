import React from "react";
import { NavBar } from "./_components/NavBar";
import { HeroSection } from "./_components/HeroSection";
import { StatsStrip } from "./_components/StatsStrip";
import { ProblemSection } from "./_components/ProblemSection";
import { FeatureGrid } from "./_components/FeatureGrid";
import { InteractiveDemo } from "./_components/InteractiveDemo";
import { RolesSection } from "./_components/RolesSection";
import { BlockchainSection } from "./_components/BlockchainSection";
import { TestimonialsSection } from "./_components/TestimonialsSection";
import { PricingSection } from "./_components/PricingSection";
import { CTASection } from "./_components/CTASection";
import { Footer } from "./_components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0A1F44]">
      <NavBar />
      <HeroSection />
      <StatsStrip />
      <ProblemSection />
      <FeatureGrid />
      <InteractiveDemo />
      <RolesSection />
      <BlockchainSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
