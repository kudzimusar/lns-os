"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { TeacherSidebar } from "@/components/layout/TeacherSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/mobile/BottomNav";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { Sidebar, SidebarItem } from "@/components/tablet/Sidebar";
import { AIInitializer } from "@/components/ai/AIInitializer";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  QrCode, 
  BookOpen, 
  ClipboardList, 
  GraduationCap, 
  Users, 
  Zap, 
  Clock, 
  FileBarChart, 
  BrainCircuit, 
  BarChart3, 
  MessageSquare, 
  FileText 
} from "lucide-react";

const teacherMenuItems: SidebarItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/teacher/dashboard", section: "1" },
  { name: "Attendance", icon: CalendarCheck, href: "/teacher/attendance", section: "1" },
  { name: "QR Scanner", icon: QrCode, href: "/teacher/scanner", section: "1" },
  { name: "Gradebook", icon: BookOpen, href: "/teacher/gradebook", section: "1" },
  { name: "Assignments", icon: ClipboardList, href: "/teacher/assignments", section: "1" },
  { name: "Assessments", icon: GraduationCap, href: "/teacher/assessments", section: "1" },
  { name: "Approvals", icon: BrainCircuit, href: "/teacher/approvals", section: "1" },
  
  { name: "Students", icon: Users, href: "/teacher/students", section: "2" },
  { name: "Behaviour", icon: Zap, href: "/teacher/behaviour", section: "2" },
  { name: "Timetable", icon: Clock, href: "/teacher/timetable", section: "2" },
  
  { name: "Reports", icon: FileBarChart, href: "/teacher/reports", section: "3" },
  { name: "AI Insights", icon: BrainCircuit, href: "/teacher/ai-insights", section: "3" },
  { name: "Analytics", icon: BarChart3, href: "/teacher/analytics", section: "3" },
  
  { name: "Messaging", icon: MessageSquare, href: "/teacher/messaging", section: "4" },
  { name: "Documents", icon: FileText, href: "/teacher/documents", section: "4" },
];

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Get title from current route
  const currentItem = teacherMenuItems.find(item => item.href === pathname);
  const pageTitle = currentItem?.name || "Teacher";

  return (
    <div className="flex h-screen overflow-hidden bg-lns-light-grey">
      <AIInitializer role="teacher" />
      <Sidebar items={teacherMenuItems} role="Teacher" logoHref="/teacher/dashboard" />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="hidden md:block">
          <TopBar />
        </div>
        <MobileHeader title={pageTitle} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pt-20 md:pt-0 pb-24 md:pb-8">
          {children}
        </main>
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
