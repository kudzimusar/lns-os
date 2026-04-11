"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell, Search, Globe, ChevronDown, Menu, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "EN", name: "English (UK)" },
  { code: "FR", name: "Français" },
  { code: "ES", name: "Español" },
  { code: "AR", name: "العربية" },
];

export function TopBar() {
  const [showLanguage, setShowLanguage] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  return (
    <header className="h-16 bg-white border-b border-lns-border sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 shrink-0">
      <div className="flex items-center space-x-4">
        <h2 className="hidden sm:block text-lg font-bold text-lns-navy">
          Lennon Nash High School
        </h2>
        <div className="md:hidden">
          <span className="text-xl font-[800] tracking-tighter text-lns-navy">
            LNS <span className="text-lns-red">OS</span>
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-6">
        {/* Search */}
        <div className="hidden lg:flex items-center relative w-64">
          <Search className="absolute left-3 text-lns-mid-grey" size={16} />
          <input
            type="text"
            placeholder="Search students, data..."
            className="w-full bg-lns-light-grey rounded-xl pl-10 pr-4 py-2 text-sm border-none focus:ring-1 focus:ring-lns-navy"
          />
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative">
             <button 
               onClick={() => setShowLanguage(!showLanguage)}
               className="flex items-center space-x-1 text-lns-mid-grey hover:text-lns-navy transition-colors bg-lns-light-grey/50 px-3 py-1.5 rounded-xl border border-transparent hover:border-lns-border"
             >
               <Globe size={16} />
               <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">{selectedLang.code}</span>
               <ChevronDown size={14} />
             </button>
             
             {showLanguage && (
               <div className="absolute top-full right-0 mt-2 bg-white border border-lns-border shadow-2xl rounded-2xl w-48 overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="p-2 space-y-1">
                     {languages.map(lang => (
                        <button 
                          key={lang.code}
                          onClick={() => { setSelectedLang(lang); setShowLanguage(false); }}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all",
                            selectedLang.code === lang.code ? "bg-lns-navy text-white" : "text-lns-mid-grey hover:bg-lns-light-grey hover:text-lns-navy"
                          )}
                        >
                           <span>{lang.name}</span>
                           {selectedLang.code === lang.code && <Check size={14} />}
                        </button>
                     ))}
                  </div>
               </div>
             )}
          </div>
          
          <button className="relative p-1 text-lns-mid-grey hover:text-lns-navy transition-colors">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-lns-red rounded-full border-2 border-white" />
          </button>
        </div>

        {/* User Profile */}
        <Link href="/settings">
          <div className="flex items-center space-x-3 pl-4 border-l border-lns-border cursor-pointer hover:opacity-80 transition-opacity">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-lns-navy">Sarah Jenkins</p>
              <p className="text-[10px] uppercase tracking-wider font-bold text-lns-mid-grey">
                Head Teacher
              </p>
            </div>
            <div className="w-9 h-9 bg-lns-navy rounded-xl flex items-center justify-center text-white text-xs font-bold overflow-hidden shadow-xl border-2 border-white">
              SJ
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
