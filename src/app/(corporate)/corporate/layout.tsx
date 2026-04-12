"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Building2, 
  CreditCard, 
  Settings2, 
  Megaphone, 
  ShieldAlert, 
  Search, 
  Bell, 
  LogOut,
  ChevronRight,
  MonitorDot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navItems = [
  { label: "Performance Hub", href: "/corporate/dashboard", icon: BarChart3 },
  { label: "Institutional Fleet", href: "/corporate/schools", icon: Building2 },
  { label: "Subscription Engine", href: "/corporate/billing", icon: CreditCard },
  { label: "Global Configuration", href: "/corporate/config", icon: Settings2 },
  { label: "Platform Notices", href: "/corporate/announcements", icon: Megaphone },
  { label: "Security & Chain Audit", href: "/corporate/security", icon: ShieldAlert },
];

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#060B16] text-[#A0AEC0] font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1A1F37] border-r border-white/5 flex flex-col pt-8 pb-4 shrink-0 overflow-y-auto">
        <div className="px-8 mb-12">
           <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-lns-red rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(214,43,43,0.3)] animate-pulse">
                 <MonitorDot size={20} />
              </div>
              <div>
                 <h1 className="text-white font-black text-lg tracking-tighter uppercase leading-none">LNS <span className="text-lns-red">CORP</span></h1>
                 <p className="text-[10px] font-black tracking-widest text-[#4A5568] uppercase">Platform Level 4</p>
              </div>
           </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
           {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                   <div className={cn(
                     "flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all group",
                     isActive ? "bg-lns-navy text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-white/5" : "hover:bg-white/5 hover:text-white"
                   )}>
                      <item.icon size={20} className={cn(isActive ? "text-lns-red" : "group-hover:text-lns-red transition-colors")} />
                      <span className="text-sm font-bold">{item.label}</span>
                   </div>
                </Link>
              );
           })}
        </nav>

        <div className="px-6 py-4 mt-auto border-t border-white/5">
           <Button variant="ghost" className="w-full justify-start text-[#4A5568] hover:text-white group">
              <LogOut size={18} className="mr-3 group-hover:text-lns-red" />
              <span className="text-xs font-black uppercase tracking-widest">Terminate Session</span>
           </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
         <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#060B16]/80 backdrop-blur-xl">
            <div className="flex items-center space-x-3 text-xs font-black uppercase tracking-widest">
               <span className="text-lns-red">Status:</span>
               <span className="text-green-500 flex items-center"><div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" /> Platform Optimized</span>
            </div>
            <div className="flex items-center space-x-6">
               <div className="bg-white/5 p-2 px-4 rounded-xl flex items-center space-x-3">
                  <Search size={16} className="text-[#4A5568]" />
                  <input placeholder="Search platform-wide data..." className="bg-transparent border-none text-xs focus:ring-0 text-white w-48" />
               </div>
               <div className="flex items-center space-x-4 text-[#4A5568]">
                  <Bell size={20} className="hover:text-white transition-colors cursor-pointer" />
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-800 border-2 border-white/5 shadow-xl" />
               </div>
            </div>
         </header>

         <main className="flex-1 overflow-y-auto p-10 bg-[radial-gradient(circle_at_top_right,_#1A1F37_0%,_#060B16_50%)]">
            {children}
         </main>
      </div>
    </div>
  );
}
