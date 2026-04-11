import React from "react";
import { TeacherSidebar } from "@/components/layout/TeacherSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-lns-light-grey">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 pb-32 md:pb-8">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
