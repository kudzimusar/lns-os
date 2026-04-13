import type { Metadata } from "next";
import { Manrope, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StatusBanner } from "@/components/system/StatusBanner";
import { AIDrawer } from "@/components/ai/AIDrawer";
import { AIDrawerTrigger } from "@/components/ai/AIDrawerTrigger";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LNS OS | The Operating System for Modern Learning",
  description: "A comprehensive digital ecosystem for teachers, students, parents, and administrators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased h-full text-lns-dark-grey`}
        suppressHydrationWarning
      >
        <StatusBanner />
        {children}
        <AIDrawer />
        <AIDrawerTrigger />
      </body>
    </html>
  );
}
