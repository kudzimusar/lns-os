import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StatusBanner } from "@/components/system/StatusBanner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="en" className="h-full">
      <body
        className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased h-full text-lns-dark-grey`}
      >
        <StatusBanner />
        {children}
      </body>
    </html>
  );
}
