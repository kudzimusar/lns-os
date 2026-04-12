"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

interface BlockchainSealToastProps {
  message: string;
  hash: string;
  timestamp: string;
  onClose?: () => void;
}

export function BlockchainSealToast({ message, hash, timestamp, onClose }: BlockchainSealToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 500); // Wait for exit animation
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
      >
        <div className="p-4 flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
            <ShieldCheck className="text-green-400" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white">
              {message}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 truncate font-mono">
              Hash: {hash}
            </p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-bold">
              Sealed at {new Date(timestamp).toLocaleTimeString()}
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 text-slate-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="h-1 bg-green-500/30">
          <motion.div 
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-green-500"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
