"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { QrCode, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [loginMode, setLoginMode] = useState<"email" | "qr">("email");
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/teacher/dashboard");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-lns-light-grey">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-4xl font-[800] tracking-tighter text-lns-navy uppercase">
              LNS <span className="text-lns-red">OS</span>
            </h1>
          </div>
          <p className="text-lns-mid-grey font-[800] uppercase tracking-[0.3em] text-[10px]">
            The Operating System for Modern Learning
          </p>
        </div>

        <Card className="shadow-2xl border-none overflow-hidden rounded-[2rem]">
          <CardContent className="pt-10 pb-10 px-8">
            <div className="flex bg-lns-light-grey p-1.5 rounded-2xl mb-10">
              <button
                onClick={() => setLoginMode("email")}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-[800] uppercase tracking-wider transition-all ${
                  loginMode === "email"
                    ? "bg-white text-lns-navy shadow-lg"
                    : "text-lns-mid-grey hover:text-lns-navy"
                }`}
              >
                <Mail size={16} />
                <span>Email Portal</span>
              </button>
              <button
                onClick={() => setLoginMode("qr")}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-[800] uppercase tracking-wider transition-all ${
                  loginMode === "qr"
                    ? "bg-white text-lns-navy shadow-lg"
                    : "text-lns-mid-grey hover:text-lns-navy"
                }`}
              >
                <QrCode size={16} />
                <span>Scan Access</span>
              </button>
            </div>

            {loginMode === "email" ? (
              <div className="space-y-6">
                <FloatingInput label="Email Address" type="email" id="email" />
                <FloatingInput label="Password" type="password" id="password" />
                
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <button className="text-lns-navy hover:text-lns-red transition-colors">
                    Forgot password?
                  </button>
                  <span className="text-lns-mid-grey">
                    Need help? <button className="text-lns-red hover:underline">Contact Admin</button>
                  </span>
                </div>

                <Button className="w-full h-14 text-base font-[900] uppercase tracking-widest rounded-2xl shadow-xl shadow-lns-red/20" onClick={handleSignIn}>
                  Sign Into Portal
                  <ArrowRight className="ml-3" size={20} />
                </Button>
              </div>
            ) : (
              <div className="space-y-6 text-center pb-4">
                <div className="aspect-square bg-lns-light-grey rounded-[2.5rem] flex items-center justify-center border-2 border-dashed border-lns-border group hover:border-lns-red transition-all cursor-pointer">
                  <div className="space-y-3 text-lns-mid-grey group-hover:text-lns-navy transition-all transform group-hover:scale-110">
                    <QrCode size={80} className="mx-auto" />
                    <p className="text-xs font-[800] uppercase tracking-widest">Open Camera</p>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-lns-mid-grey px-8 leading-relaxed">
                  Position your LNS ID card in front of the camera for instant biometric authentication.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center space-y-8 pt-4">
          <div className="flex items-center justify-center space-x-6 text-[10px] font-black uppercase tracking-[0.1em] text-lns-mid-grey">
            <Link href="/privacy" className="hover:text-lns-navy transition-colors">Privacy Policy</Link>
            <span className="w-1.5 h-1.5 bg-lns-red/20 rounded-full" />
            <Link href="/terms" className="hover:text-lns-navy transition-colors">Terms & Conditions</Link>
            <span className="w-1.5 h-1.5 bg-lns-red/20 rounded-full" />
            <Link href="/support" className="hover:text-lns-navy transition-colors">Support</Link>
          </div>
          
          <div className="pt-10 border-t border-lns-border/50">
            <p className="text-center text-[9px] font-black uppercase tracking-[0.3em] text-lns-mid-grey mb-6">Development Quick Access</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/teacher/dashboard">
                <Button variant="outline" size="sm" className="w-full text-[10px] font-black uppercase tracking-widest h-11 rounded-xl border-lns-border">Teacher</Button>
              </Link>
              <Link href="/student/dashboard">
                <Button variant="outline" size="sm" className="w-full text-[10px] font-black uppercase tracking-widest h-11 rounded-xl border-lns-border">Student</Button>
              </Link>
              <Link href="/parent/dashboard">
                <Button variant="outline" size="sm" className="w-full text-[10px] font-black uppercase tracking-widest h-11 rounded-xl border-lns-border">Parent</Button>
              </Link>
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm" className="w-full text-[10px] font-black uppercase tracking-widest h-11 rounded-xl border-lns-border">Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
