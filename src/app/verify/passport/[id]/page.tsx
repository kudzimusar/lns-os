"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ShieldCheck, ShieldAlert, Loader2, Link as LinkIcon, CheckCircle2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { verifyOnChain, truncateHash } from "@/lib/blockchain";
import { motion, AnimatePresence } from "framer-motion";

export default function PassportVerificationPage() {
  const params = useParams();
  const [status, setStatus] = useState<'checking' | 'verified' | 'failed'>('checking');
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    async function performVerification() {
      // Simulate chain verification
      const result = await verifyOnChain(params.id as string);
      if (result.verified) {
        setDetails(result);
        setStatus('verified');
      } else {
        setStatus('failed');
      }
    }
    performVerification();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-[#0A1F44] flex items-center justify-center p-4 md:p-8">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-lns-red/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full relative z-10"
      >
        <Card className="border-none shadow-2xl bg-white rounded-[2rem] overflow-hidden">
          <div className="p-8 md:p-10 text-center">
            {/* Logo area */}
            <div className="flex justify-center mb-8">
               <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-lns-navy tracking-tighter">LNS OS</span>
                  <p className="text-[8px] font-black text-lns-mid-grey uppercase tracking-[0.3em]">Institutional Registry</p>
               </div>
            </div>

            <AnimatePresence mode="wait">
              {status === 'checking' && (
                <motion.div 
                  key="checking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center"
                >
                  <Loader2 className="w-16 h-16 text-lns-navy animate-spin mb-6" />
                  <h2 className="text-xl font-black text-lns-navy uppercase tracking-tight italic">Analyzing Ledger...</h2>
                  <p className="text-xs text-lns-mid-grey font-bold uppercase tracking-widest mt-2 px-8 leading-relaxed">
                    Cryptographic node establishing verification handshake with Polygon Mainnet.
                  </p>
                </motion.div>
              )}

              {status === 'verified' && (
                <motion.div 
                  key="verified"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-green-50 rounded-2xl flex items-center justify-center border-2 border-green-500/20 shadow-xl shadow-green-500/10 scale-110">
                      <ShieldCheck className="text-green-500 w-12 h-12" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-lns-navy uppercase tracking-tight italic">
                      Credential Verified
                    </h2>
                    <p className="text-xs text-green-600 font-bold uppercase tracking-widest leading-relaxed px-6">
                      Authenticity guaranteed by the LNS OS Hybrid Blockchain Protocol.
                    </p>
                  </div>

                  {/* Passport Preview Data */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-left space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Node</span>
                      <span className="text-sm font-black text-lns-navy italic">Johnathan Michael Nash</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institution</span>
                      <span className="text-sm font-black text-lns-navy italic">Lennon Nash Academy</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Period</span>
                      <span className="text-sm font-black text-lns-navy italic">AY 2025/26 - Term 2</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Blockchain Proof</span>
                      <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-[9px] break-all leading-tight text-slate-600">
                        {details.txHash}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <Button className="w-full bg-lns-navy text-white h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all">
                      View Full Record <LinkIcon size={14} className="ml-2" />
                    </Button>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                      Verification Hash: {truncateHash(details.txHash, 12, 8)}
                    </p>
                  </div>
                </motion.div>
              )}

              {status === 'failed' && (
                <motion.div 
                  key="failed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 space-y-6"
                >
                   <div className="flex justify-center">
                    <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center border-2 border-red-500/20">
                      <ShieldAlert className="text-red-500 w-10 h-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-black text-red-600 uppercase tracking-tight italic">Verification Failed</h2>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">
                      No matching record found in the LNS Registry. The document may have been altered or revoked.
                    </p>
                  </div>
                  <Button variant="outline" className="h-12 px-8 border-slate-200 text-slate-600 font-bold uppercase text-[10px] rounded-xl active:scale-95">
                    Contact Registrar
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="bg-slate-50 p-6 flex items-center justify-center border-t border-slate-100">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lns-navy flex items-center justify-center text-white">
                  <CheckCircle2 size={16} />
                </div>
                <p className="text-[9px] font-black text-lns-navy uppercase tracking-widest">Verified by LNS OS Core v1.0</p>
             </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
