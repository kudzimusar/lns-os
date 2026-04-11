"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  Settings, 
  ShieldAlert, 
  Megaphone,
  LayoutDashboard,
  HelpCircle,
  FileText
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";

const adminSidebarItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "User Directory", icon: Users, href: "/admin/users" },
  { name: "Announcements", icon: Megaphone, href: "/admin/announcements" },
  { name: "Data Insights", icon: BarChart3, href: "/admin/analytics" },
  { name: "Audit Trail", icon: ShieldAlert, href: "/admin/audit" },
  { name: "School Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-lns-light-grey">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-lns-navy text-white sticky top-0">
        <div className="flex items-center h-16 px-6 border-b border-white/10 text-xl font-[800] tracking-tighter">
          LNS <span className="text-lns-red">OS</span>
          <span className="ml-2 px-2 py-0.5 bg-lns-red text-[8px] uppercase tracking-widest rounded-full">Admin</span>
        </div>
        <nav className="flex-1 pt-4 px-3 space-y-1">
          {adminSidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium",
                  isActive ? "bg-lns-red text-white" : "text-lns-mid-grey hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-lns-mid-grey hover:bg-white/5 hover:text-white transition-all text-sm font-medium">
            <HelpCircle size={20} />
            <span>IT Support</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 pb-32 md:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
