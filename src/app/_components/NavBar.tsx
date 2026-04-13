"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#0A1F44]/90 backdrop-blur-md py-3 shadow-lg border-b border-white/5"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-1">
          <span className="text-2xl font-[800] tracking-tight text-white uppercase font-manrope">
            LNS <span className="text-[#D62B2B]">OS</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-10">
          {["Features", "Security", "Pricing", "For Schools"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors font-dm-sans"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 text-sm font-bold uppercase tracking-widest px-6"
            >
              Sign In
            </Button>
          </Link>
          <Button className="bg-[#D62B2B] hover:bg-[#B82525] text-white rounded-full px-8 h-12 text-sm font-bold uppercase tracking-widest shadow-lg shadow-[#D62B2B]/20 transition-all active:scale-95">
            Request Demo →
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-[#0A1F44] z-40 p-6 flex flex-col space-y-8 animate-in slide-in-from-right duration-300">
          {["Features", "Security", "Pricing", "For Schools"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-2xl font-bold text-white uppercase tracking-tight"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="pt-8 flex flex-col space-y-4">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="outline"
                className="w-full h-14 border-white/20 text-white font-black uppercase tracking-widest rounded-xl"
              >
                Sign In
              </Button>
            </Link>
            <Button className="w-full h-14 bg-[#D62B2B] text-white font-black uppercase tracking-widest rounded-xl">
              Request Demo →
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
