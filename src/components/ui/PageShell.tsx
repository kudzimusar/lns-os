"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Construction, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PageShell({ title = "Module Shell", description = "This feature is currently being integrated into the LNS OS Core." }) {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 py-20">
      <div className="w-24 h-24 bg-lns-navy/5 rounded-3xl flex items-center justify-center text-lns-navy mb-4">
        <Construction size={48} />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-[800] text-lns-navy tracking-tight">{title}</h1>
        <p className="text-lns-mid-grey font-medium max-w-md mx-auto">{description}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft size={18} className="mr-2" />
          Go Back
        </Button>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
