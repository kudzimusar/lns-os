"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ClipboardList, 
  GraduationCap, 
  MessageSquare, 
  User,
  Calendar,
  Settings,
  HelpCircle,
  QrCode
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";

const studentSidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/student/dashboard" },
  { name: "Assignments", icon: ClipboardList, href: "/student/assignments" },
  { name: "Grades", icon: GraduationCap, href: "/student/grades" },
  { name: "Attendance", icon: Calendar, href: "/student/attendance" },
  { name: "Messages", icon: MessageSquare, href: "/student/messages" },
];

export default function StudentLayout({
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
        </div>
        <nav className="flex-1 pt-4 px-3 space-y-1">
          {studentSidebarItems.map((item) => {
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
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link href="/settings" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-lns-mid-grey hover:bg-white/5 hover:text-white transition-all text-sm font-medium">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          <button className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-lns-mid-grey hover:bg-white/5 hover:text-white transition-all text-sm font-medium">
            <HelpCircle size={20} />
            <span>Support</span>
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

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-lns-border h-20 px-6 flex items-center justify-between z-50">
        {studentSidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center space-y-1 transition-all",
                isActive ? "text-lns-red" : "text-lns-mid-grey"
              )}
            >
              <item.icon size={24} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
            </Link>
          );
        })}
        <Link 
          href="/student/profile" 
          className={cn(
            "flex flex-col items-center space-y-1 transition-all",
            pathname === "/student/profile" ? "text-lns-red" : "text-lns-mid-grey"
          )}
        >
          <User size={24} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
