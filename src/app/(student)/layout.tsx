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
import { BottomNav } from "@/components/mobile/BottomNav";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { Sidebar, SidebarItem } from "@/components/tablet/Sidebar";
import { AIInitializer } from "@/components/ai/AIInitializer";

const studentSidebarItems: SidebarItem[] = [
  { name: "Home", icon: LayoutDashboard, href: "/student/dashboard", section: "main" },
  { name: "Scan QR", icon: QrCode, href: "/student/scan", section: "main" },
  { name: "Assignments", icon: ClipboardList, href: "/student/assignments", section: "main" },
  { name: "Grades", icon: GraduationCap, href: "/student/grades", section: "main" },
  { name: "Messages", icon: MessageSquare, href: "/student/messages", section: "secondary" },
  { name: "Documents", icon: Calendar, href: "/student/documents", section: "secondary" },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Get title from current route
  const currentItem = studentSidebarItems.find(item => item.href === pathname);
  const pageTitle = currentItem?.name || "Student";

  return (
    <div className="flex h-screen overflow-hidden bg-lns-light-grey">
      <AIInitializer role="student" />
      {/* Tablet/Desktop Sidebar */}
      <Sidebar 
        items={studentSidebarItems} 
        role="Student" 
        logoHref="/student/dashboard" 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="hidden md:block">
          <TopBar />
        </div>
        <MobileHeader title={pageTitle} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pt-20 md:pt-0 pb-24 md:pb-8">
          {children}
        </main>
        
        {/* Mobile-only Bottom Nav */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
