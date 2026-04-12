"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  QrCode,
  ClipboardList,
  GraduationCap,
  User,
  Users,
  CalendarCheck,
  MessageSquare,
  ClipboardCheck,
  BookOpen,
  MoreHorizontal,
  LayoutDashboard,
  BarChart3,
  Bell,
  Settings,
} from "lucide-react";

type Tab = {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
};

const studentTabs: Tab[] = [
  { id: "home", label: "Home", icon: Home, href: "/student/dashboard" },
  { id: "scan", label: "Scan", icon: QrCode, href: "/student/scan" },
  { id: "assignments", label: "Assignments", icon: ClipboardList, href: "/student/assignments" },
  { id: "grades", label: "Grades", icon: GraduationCap, href: "/student/grades" },
  { id: "profile", label: "Profile", icon: User, href: "/student/profile" },
];

const parentTabs: Tab[] = [
  { id: "home", label: "Home", icon: Home, href: "/parent/dashboard" },
  { id: "child", label: "Child", icon: Users, href: "/parent/child" },
  { id: "attendance", label: "Attendance", icon: CalendarCheck, href: "/parent/attendance" },
  { id: "messages", label: "Messages", icon: MessageSquare, href: "/parent/messages" },
  { id: "profile", label: "Profile", icon: User, href: "/parent/profile" },
];

const teacherTabs: Tab[] = [
  { id: "home", label: "Home", icon: Home, href: "/teacher/dashboard" },
  { id: "register", label: "Register", icon: ClipboardCheck, href: "/teacher/register" },
  { id: "classes", label: "Classes", icon: BookOpen, href: "/teacher/classes" },
  { id: "messages", label: "Messages", icon: MessageSquare, href: "/teacher/messages" },
  { id: "more", label: "More", icon: MoreHorizontal, href: "#" }, // Opens drawer
];

const adminTabs: Tab[] = [
  { id: "home", label: "Home", icon: Home, href: "/admin/dashboard" },
  { id: "users", label: "Users", icon: Users, href: "/admin/users" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  { id: "alerts", label: "Alerts", icon: Bell, href: "/admin/alerts" },
  { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
];

export function BottomNav() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Determine role from pathname
  const roleMatch = pathname.match(/^\/([^/]+)/);
  const role = roleMatch ? roleMatch[1] : "";

  let tabs: Tab[] = [];
  switch (role) {
    case "student":
      tabs = studentTabs;
      break;
    case "parent":
      tabs = parentTabs;
      break;
    case "teacher":
      tabs = teacherTabs;
      break;
    case "admin":
      tabs = adminTabs;
      break;
    default:
      tabs = studentTabs; // Fallback
  }

  const isActive = (href: string) => {
    if (href === "#") return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 pb-safe glass-nav flex md:hidden">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          
          if (tab.id === "more") {
            return (
              <button
                key={tab.id}
                onClick={() => setIsDrawerOpen(true)}
                className="flex-1 flex flex-col items-center justify-center gap-0.5"
              >
                <tab.icon
                  size={24}
                  className="text-lns-mid-grey"
                />
                <span className="text-[10px] text-lns-mid-grey">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="flex-1 flex flex-col items-center justify-center gap-0.5"
            >
              <tab.icon
                size={22}
                className={active ? "text-lns-red" : "text-lns-mid-grey"}
              />
              <span
                className={cn(
                  "text-[10px]",
                  active ? "text-lns-red font-medium" : "text-lns-mid-grey"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Simple secondary navigation drawer placeholder */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-lns-navy/40 backdrop-blur-sm md:hidden animate-in fade-in duration-300"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div 
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-8 pb-24 shadow-2xl animate-in slide-in-from-bottom duration-500 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
            <h3 className="text-xl font-black text-lns-navy uppercase tracking-tight mb-8">System Commands</h3>
            <div className="grid grid-cols-2 gap-4">
               {/* Replaced grid-cols-3 with grid-cols-2 for better touch targets as per Section 7 */}
               <button className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-lns-navy">
                    <Settings size={22} />
                  </div>
                  <span className="font-bold text-sm">Settings</span>
               </button>
               <button className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-lns-navy">
                    <User size={22} />
                  </div>
                  <span className="font-bold text-sm">Profile</span>
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
