'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, AlertCircle, RefreshCw } from 'lucide-react';
import { useAIStore } from '@/lib/ai/store';
import { motion } from 'framer-motion';

export const AIInsightsTab: React.FC = () => {
  const { pageContext } = useAIStore();
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [urgentFlag, setUrgentFlag] = useState(false);
  const [urgentReason, setUrgentReason] = useState<string | null>(null);

  const fetchInsights = async () => {
    setLoading(true);
    // Simulating API call as per spec
    setTimeout(() => {
      const mockInsights = [
        "Attendance for Grade 10B has dropped 5% compared to last week.",
        "3 students in Mathematics are at risk of failing the term assessment.",
        "Positive trend: Homework submission for 'Chemistry Lab' is at 98%."
      ];
      setInsights(mockInsights);
      setUrgentFlag(true);
      setUrgentReason("High absence rate in Period 3 detected.");
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchInsights();
  }, [pageContext?.page.route]);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-slate-200 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2 p-2 bg-slate-100 rounded-lg text-slate-500 text-xs">
        <MapPin size={12} />
        <span>Insights for: {pageContext?.page.title || 'Current View'}</span>
      </div>

      {urgentFlag && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-red-50 border border-red-100 rounded-xl flex gap-3"
        >
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <div className="space-y-1">
            <p className="text-xs font-bold text-red-900 uppercase tracking-tight">Urgent Attention Needed</p>
            <p className="text-sm text-red-700">{urgentReason}</p>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <Sparkles size={16} className="text-blue-500 mt-0.5 shrink-0" />
            <p className="text-sm text-slate-700 leading-relaxed">{insight}</p>
          </motion.div>
        ))}
      </div>

      <button
        onClick={fetchInsights}
        className="w-full py-3 flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100"
      >
        <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
        Refresh page insights
      </button>
    </div>
  );
};
