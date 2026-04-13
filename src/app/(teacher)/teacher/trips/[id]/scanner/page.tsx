"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ChevronLeft, 
  Scan, 
  X, 
  Check, 
  Bus, 
  ShieldCheck, 
  AlertTriangle,
  Info,
  Users,
  Clock,
  Zap,
  Loader2
} from "lucide-react";

const MOCK_STUDENTS = {
  "STU-001": { name: "Amara Johnson", paid: true, consent: true, status: "READY" },
  "STU-002": { name: "Blake Nkosi", paid: true, consent: true, status: "READY" },
  "STU-003": { name: "David Moyo", paid: false, consent: false, status: "NOT_READY" },
  "STU-004": { name: "Elena Petrov", paid: false, consent: false, status: "NOT_READY" },
};

export default function TripBoardingScanner({ params }: { params: { id: string } }) {
  const [scanning, setScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<any>(null);
  const [boardedCount, setBoardedCount] = useState(12);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'> ('idle');

  const simulateScan = (id: string) => {
    setScanning(true);
    setStatus('idle');
    setTimeout(() => {
      const student = MOCK_STUDENTS[id as keyof typeof MOCK_STUDENTS];
      if (student) {
        setLastScanned(student);
        if (student.paid && student.consent) {
          setStatus('success');
          setBoardedCount(prev => prev + 1);
        } else {
          setStatus('error');
        }
      }
      setScanning(false);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between px-1">
        <Link href={`/teacher/trips/${params.id}`}>
          <Button variant="ghost" className="rounded-xl hover:bg-white text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
            <ChevronLeft size={16} className="mr-2" />
            Exit Scanner
          </Button>
        </Link>
        <div className="flex items-center space-x-3">
           <div className="px-3 py-1.5 bg-lns-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center">
              <Bus size={14} className="mr-2" />
              Science Museum Trip
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center overflow-hidden">
        {/* Scanner Viewport */}
        <div className="relative aspect-square max-w-sm mx-auto w-full group">
           <div className={`absolute inset-0 border-2 rounded-3xl transition-all duration-500 ${
             status === 'success' ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' :
             status === 'error' ? 'border-lns-red shadow-[0_0_30px_rgba(230,57,70,0.3)]' :
             'border-white/20'
           }`}>
              <div className="absolute inset-4 rounded-2xl bg-slate-900 overflow-hidden flex flex-col items-center justify-center">
                 {!scanning && !lastScanned && (
                   <div className="text-center p-8 animate-pulse">
                      <Scan size={64} className="text-white opacity-20 mx-auto mb-4" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Align QR Ticket within frame</p>
                   </div>
                 )}

                 {scanning && (
                   <div className="text-center p-8">
                      <div className="w-16 h-16 border-4 border-t-lns-red border-white/10 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Verifying Authority...</p>
                   </div>
                 )}

                 {!scanning && lastScanned && (
                   <div className={`text-center p-8 animate-in zoom-in-95 duration-300 ${status === 'success' ? 'text-green-400' : 'text-lns-red'}`}>
                      {status === 'success' ? (
                        <Check size={80} className="mx-auto mb-4 stroke-[4]" />
                      ) : (
                        <X size={80} className="mx-auto mb-4 stroke-[4]" />
                      )}
                      <h3 className="text-2xl font-[900] uppercase tracking-tighter text-white mb-1">{lastScanned.name}</h3>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${status === 'success' ? 'text-green-400/70' : 'text-lns-red/70'}`}>
                        {status === 'success' ? 'Ready for Departure' : 'UNAUTHORIZED / UNPAID'}
                      </p>
                   </div>
                 )}

                 {/* The Scan Bar */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lns-red to-transparent shadow-[0_0_15px_#E63946] animate-scanning z-10"></div>
              </div>
           </div>
           
           {/* Scan Corner Brackets */}
           <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-lns-navy rounded-tl-xl"></div>
           <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-lns-navy rounded-tr-xl"></div>
           <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-lns-navy rounded-bl-xl"></div>
           <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-lns-navy rounded-br-xl"></div>
        </div>

        {/* Boarding Info & Mock Controls */}
        <div className="space-y-6">
           <Card className="border-none shadow-sm bg-white overflow-hidden p-6">
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey leading-none mb-1">Boarded Students</h3>
                    <p className="text-4xl font-[900] text-lns-navy tracking-tighter">{boardedCount} / 30 <span className="text-sm text-lns-mid-grey font-medium tracking-normal normal-case">Confirmed</span></p>
                 </div>
                 <div className="h-14 w-14 bg-lns-navy/5 rounded-2xl flex items-center justify-center text-lns-navy">
                    <Users size={28} />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <Button 
                   className="h-12 bg-lns-navy text-white hover:bg-lns-navy/90 rounded-xl text-[10px] font-black uppercase tracking-widest"
                   onClick={() => simulateScan("STU-001")}
                   disabled={scanning}
                 >
                    Test: Success (Amara)
                 </Button>
                 <Button 
                   className="h-12 bg-lns-navy text-white hover:bg-lns-navy/90 rounded-xl text-[10px] font-black uppercase tracking-widest"
                   onClick={() => simulateScan("STU-003")}
                   disabled={scanning}
                 >
                    Test: Fail (David)
                 </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-lns-light-grey space-y-4">
                 <div className="flex items-center space-x-3 text-lns-mid-grey">
                    <Clock size={16} />
                    <span className="text-xs font-semibold">Departure Window: 08:30 - 08:45</span>
                 </div>
                 <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex space-x-3">
                    <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                       <p className="text-[10px] font-black text-amber-800 uppercase leading-none mb-1">10 Minutes to Departure</p>
                       <p className="text-[11px] text-amber-700 font-medium">8 students are confirmed but not yet boarded. Dispatching 1-minute boarding alert?</p>
                       <Button variant="ghost" className="p-0 h-auto text-[10px] font-black uppercase text-amber-900 mt-1">Send Broadcast</Button>
                    </div>
                 </div>
              </div>
           </Card>

           <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2 text-lns-navy/40 mb-2">
                 <ShieldCheck size={20} />
                 <span className="text-[9px] font-black uppercase tracking-widest italic">Voter Verification Engine Active</span>
              </div>
              <p className="text-[9px] text-lns-mid-grey text-center max-w-xs">Attendance record is cryptographically sealed to student #STU-2026 record on boarding.</p>
           </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scanner {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        .animate-scanning {
          animation: scanner 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
