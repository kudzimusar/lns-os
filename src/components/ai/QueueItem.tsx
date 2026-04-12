'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ApprovalQueueItem } from '@/types/ai';
import { RefreshCw, X, Check, AlertCircle, Clock, Undo2 } from 'lucide-react';
import { useAIStore } from '@/lib/ai/store';

interface Props {
  item: ApprovalQueueItem;
}

export const QueueItem: React.FC<Props> = ({ item }) => {
  const { updateQueueItem, removeQueueItem } = useAIStore();
  const [editedContent, setEditedContent] = useState(item.content);
  const [isEditing, setIsEditing] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [recallCountdown, setRecallCountdown] = useState(300);
  const [showRecall, setShowRecall] = useState(false);
  const lastSavedRef = useRef<Date>(new Date());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Mark as VIEWED on mount if it was DRAFT as per A4
  useEffect(() => {
    if (item.status === 'DRAFT') {
      updateQueueItem(item.id, { status: 'VIEWED' });
    }
  }, [item.id, item.status, updateQueueItem]);

  // Auto-save logic
  useEffect(() => {
    if (!isEditing) return;
    
    // Set state to EDITING immediately when typing starts
    if (item.status !== 'EDITING') {
      updateQueueItem(item.id, { status: 'EDITING' });
    }

    const interval = setInterval(() => {
      // After 10 seconds of no typing, or on interval, mark as EDITED
      updateQueueItem(item.id, { content: editedContent, status: 'EDITED' });
      lastSavedRef.current = new Date();
      setIsEditing(false); // Reset editing flag after save
    }, 10000);
    return () => clearInterval(interval);
  }, [isEditing, editedContent, item.id, item.status, updateQueueItem]);

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      updateQueueItem(item.id, { status: 'APPROVED' });
      setIsApproving(false);
      setShowRecall(true);
      
      // Start recall countdown (300s = 5m as per A4)
      let count = 300;
      timerRef.current = setInterval(() => {
        count -= 1;
        setRecallCountdown(count);
        if (count <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          updateQueueItem(item.id, { status: 'SENT', sentAt: new Date().toISOString() });
          setShowRecall(false);
        }
      }, 1000);
    }, 1000);
  };

  const handleRecall = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    updateQueueItem(item.id, { status: 'EDITED' });
    setShowRecall(false);
    setRecallCountdown(5);
  };

  const handleRegenerate = () => {
    if (editedContent !== item.content) {
      if (!confirm('Regenerating will replace your edits. Are you sure?')) return;
    }
    // Simulation of regeneration
    setEditedContent("Regenerated version: " + item.content);
    updateQueueItem(item.id, { status: 'DRAFT', content: "Regenerated version: " + item.content });
  };

  const severityStyles = {
    CRITICAL: 'border-red-300 bg-red-50',
    HIGH: 'border-amber-200 bg-amber-50/30',
    MEDIUM: 'border-slate-200 bg-white',
    LOW: 'border-slate-100 bg-white'
  };

  return (
    <div className={`rounded-2xl border p-5 space-y-4 transition-all ${severityStyles[item.severity]}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
              item.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 
              item.severity === 'HIGH' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
            }`}>
              {item.severity}
            </span>
            <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{item.type.replace(/_/g, ' ')}</span>
          </div>
          <p className="font-bold text-slate-900 text-base">
            {item.studentName} — {item.contentType.charAt(0).toUpperCase() + item.contentType.slice(1)}
          </p>
          <p className="text-xs text-slate-500">
            Recipient: <span className="font-semibold">{item.recipient.name}</span> ({item.recipient.role})
          </p>
        </div>
        <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${
          item.status === 'APPROVED' ? 'bg-green-100 text-green-700 border-green-200' :
          item.status === 'SENT' ? 'bg-slate-900 text-white border-slate-900' :
          item.status === 'EDITING' ? 'bg-amber-100 text-amber-700 border-amber-200 animate-pulse' :
          item.status === 'EDITED' ? 'bg-blue-100 text-blue-700 border-blue-200' :
          item.status === 'VIEWED' ? 'bg-slate-100 text-slate-600 border-slate-200 italic' :
          'bg-slate-100 text-slate-400 border-slate-200'
        }`}>
          {item.status}
        </div>
      </div>

      {/* EDITABLE TEXTAREA — Spec B4 Core Requirement */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            AI Draft — Edit freely before approving
          </label>
          {isEditing && (
            <span className="text-[10px] text-blue-500 animate-pulse font-medium">
              Auto-saving...
            </span>
          )}
        </div>
        <textarea
          value={editedContent}
          onChange={(e) => {
            setEditedContent(e.target.value);
            setIsEditing(true);
          }}
          className="w-full min-h-[140px] p-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-inner font-manrope"
          placeholder="AI draft content..."
        />
        <div className="flex justify-between items-center text-[10px] text-slate-400">
          <span>AI Confidence: <span className="text-slate-600 font-bold">{item.aiConfidence}</span></span>
          <span>{editedContent.split(/\s+/).filter(Boolean).length} words</span>
        </div>
      </div>

      {/* Recall Window */}
      {showRecall && (
        <div className="flex items-center justify-between p-3 bg-green-600 text-white rounded-xl shadow-lg animate-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2">
            <Clock size={16} className="animate-pulse" />
            <span className="text-sm font-medium">Approved! Sending in {recallCountdown}s...</span>
          </div>
          <button 
            onClick={handleRecall}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all"
          >
            <Undo2 size={14} />
            Recall
          </button>
        </div>
      )}

      {/* Action Buttons */}
      {!showRecall && (
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleRegenerate}
            className="flex items-center gap-2 px-4 h-10 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
          >
            <RefreshCw size={14} />
            Regenerate
          </button>
          
          <button
            onClick={() => removeQueueItem(item.id)}
            className="flex items-center gap-2 px-4 h-10 rounded-xl border border-slate-200 text-xs font-bold text-red-500 hover:bg-red-50 transition-all active:scale-95"
          >
            <X size={14} />
            Reject
          </button>

          <button
            onClick={handleApprove}
            disabled={isApproving || !editedContent.trim()}
            className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isApproving ? <RefreshCw size={14} className="animate-spin" /> : <Check size={16} />}
            Approve & Send
          </button>
        </div>
      )}
    </div>
  );
};
