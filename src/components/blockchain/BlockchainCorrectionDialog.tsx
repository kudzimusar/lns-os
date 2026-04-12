"use client";

import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  History, 
  Lock, 
  MessageSquare,
  ShieldAlert,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { SealedBadge } from './SealedBadge';
import { generateMockHash } from '@/lib/blockchain';

interface BlockchainCorrectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  record: {
    id: string;
    domain: string;
    originalValue: string;
    timestamp: string;
    hash: string;
  };
  onSuccess: (correctionHash: string) => void;
}

export function BlockchainCorrectionDialog({ 
  isOpen, 
  onClose, 
  record,
  onSuccess 
}: BlockchainCorrectionDialogProps) {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  const handleSubmit = async () => {
    if (reason.length < 20) return;
    
    setIsSubmitting(true);
    // Simulate blockchain sealing of the correction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const correctionHash = generateMockHash();
    setIsSubmitting(false);
    setStep('success');
    onSuccess(correctionHash);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="max-w-md w-full relative z-10"
      >
        <Card className="border-none shadow-2xl bg-white rounded-[2rem] overflow-hidden">
          {step === 'form' ? (
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-tight rounded-lg border border-amber-100">
                    <ShieldAlert size={12} /> Correction Protocol A4
                  </div>
                  <h3 className="text-xl font-black text-lns-navy italic uppercase">Request Modification</h3>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <span>Target Immutable Record</span>
                  <SealedBadge hash={record.hash} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Original Sealed Value</p>
                  <p className="text-sm font-black text-lns-navy font-mono px-3 py-2 bg-white rounded-lg border border-slate-200">{record.originalValue}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black text-lns-navy uppercase tracking-widest">
                  <MessageSquare size={14} className="text-lns-red" />
                  Mandatory Correction Reason
                </div>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Minimum 20 characters required for audit integrity..."
                  className="w-full h-32 px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-lns-navy focus:outline-none text-sm leading-relaxed transition-all italic font-medium"
                />
                <div className="flex justify-between text-[10px] font-bold">
                  <span className={reason.length < 20 ? "text-amber-600" : "text-green-600"}>
                    {reason.length < 20 ? `${20 - reason.length} characters remaining` : "Minimum met"}
                  </span>
                  <span className="text-slate-400 uppercase tracking-widest">Honesty Trail Logged</span>
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                disabled={reason.length < 20 || isSubmitting}
                className="w-full bg-lns-navy text-white h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <History className="animate-spin" size={16} /> Digitally Sealing Correction...
                  </span>
                ) : (
                  "Finalize Immutable Correction"
                )}
              </Button>

              <p className="text-[8px] text-slate-400 font-bold text-center leading-relaxed px-4 uppercase tracking-[0.2em]">
                Warning: The original record will remain in the ledger. This correction creates a linked record and will require admin authorization.
              </p>
            </div>
          ) : (
            <div className="p-10 text-center space-y-6">
               <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto border-2 border-green-500/20">
                  <CheckCircle2 className="text-green-500" size={40} />
               </div>
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-lns-navy italic uppercase">Protocol Synchronized</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">
                    Your correction request has been cryptographically sealed and queued for administrative approval.
                  </p>
               </div>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">New Correction Hash</p>
                  <SealedBadge hash={generateMockHash()} className="w-full py-2" />
               </div>
               <Button onClick={onClose} className="w-full bg-slate-900 text-white h-12 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg">
                  Resume Operations
               </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
