"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarCheck,
  QrCode,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Users,
  MessageSquare,
  Zap,
  Clock,
  FileBarChart,
  BrainCircuit,
  Settings,
  HelpCircle,
  FileText,
  BarChart3
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/teacher/dashboard" },
  { name: "Attendance", icon: CalendarCheck, href: "/teacher/attendance" },
  { name: "QR Scanner", icon: QrCode, href: "/teacher/scanner" },
  { name: "Gradebook", icon: BookOpen, href: "/teacher/gradebook" },
  { name: "Assignments", icon: ClipboardList, href: "/teacher/assignments" },
  { name: "Assessments", icon: GraduationCap, href: "/teacher/assessments" },
  { name: "Students", icon: Users, href: "/teacher/students" },
  { name: "Messaging", icon: MessageSquare, href: "/teacher/messaging" },
  { name: "Behaviour", icon: Zap, href: "/teacher/behaviour" },
  { name: "Timetable", icon: Clock, href: "/teacher/timetable" },
  { name: "Reports", icon: FileBarChart, href: "/teacher/reports" },
  { name: "AI Insights", icon: BrainCircuit, href: "/teacher/ai-insights" },
  { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  { name: "Documents", icon: FileText, href: "/documents" },
];

export function TeacherSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen bg-lns-navy text-white transition-all duration-300 ease-in-out shrink-0 sticky top-0",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center h-16 px-6 border-b border-white/10">
        {!collapsed && (
          <span className="text-xl font-[800] tracking-tighter uppercase">
            LNS <span className="text-lns-red">OS</span>
          </span>
        )}
        {collapsed && (
          <span className="text-xl font-[800] text-lns-red tracking-tighter mx-auto uppercase">
            L
          </span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto pt-4 px-3 space-y-1 scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium group",
                isActive
                  ? "bg-lns-red text-white shadow-lg shadow-lns-red/20"
                  : "text-lns-mid-grey hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-white" : "group-hover:text-white"
                )}
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          href="/settings"
          className={cn(
            "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium",
            pathname === "/settings" ? "bg-white/10 text-white" : "text-lns-mid-grey hover:bg-white/5 hover:text-white"
          )}
        >
          <Settings size={20} className="shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
        <Link
          href="/support"
          className={cn(
            "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium",
            pathname === "/support" ? "bg-white/10 text-white" : "text-lns-mid-grey hover:bg-white/5 hover:text-white"
          )}
        >
          <HelpCircle size={20} className="shrink-0" />
          {!collapsed && <span>Support</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="md:hidden lg:flex w-full items-center space-x-3 px-3 py-2.5 rounded-lg text-lns-mid-grey hover:bg-white/5 hover:text-white transition-all text-sm font-medium"
        >
          <div className="w-5" />
          {!collapsed && <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Collapse Sidebar</span>}
        </button>
      </div>
    </aside>
  );
}
