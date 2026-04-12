'use client';

import React from 'react';
import { X, Sparkles, MessageSquare, Zap, Lightbulb } from 'lucide-react';
import { useAIStore } from '@/lib/ai/store';
import { motion, AnimatePresence } from 'framer-motion';
import { AIInsightsTab } from './AIInsightsTab';
import { AIActionsTab } from './AIActionsTab';
import { AIChatTab } from './AIChatTab';

export const AIDrawer: React.FC = () => {
  const { isDrawerOpen, setDrawerOpen, activeTab, setActiveTab, pendingActions, pageContext, userRole } = useAIStore();
  const pendingCount = pendingActions.length;

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-red-600" />
                <span className="font-semibold text-slate-900 text-sm">AI Assistant</span>
              </div>
              <button 
                onClick={() => setDrawerOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
              >
                <X size={18} className="text-slate-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 bg-white">
              {[
                { id: 'Insights', icon: Lightbulb },
                { id: 'Actions', icon: Zap, count: pendingCount },
                { id: 'Ask', icon: MessageSquare }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`flex-1 py-3 text-xs font-medium transition-all relative flex flex-col items-center gap-1
                    ${activeTab === tab.id
                      ? 'text-red-600'
                      : 'text-slate-400 hover:text-slate-600'}`}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  <tab.icon size={16} />
                  <span>{tab.id}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="absolute top-2 right-6 bg-red-600 text-white text-[10px] rounded-full px-1.5 min-w-[18px] h-[18px] flex items-center justify-center border-2 border-white">
                      {tab.count}
                    </span>
                  )}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto bg-slate-50/30">
              <div className="p-4 h-full">
                {activeTab === 'Insights' && <AIInsightsTab />}
                {activeTab === 'Actions' && <AIActionsTab />}
                {activeTab === 'Ask' && <AIChatTab />}
              </div>
            </div>

            {/* Footer / Context Indicator */}
            <div className="p-3 bg-slate-900 text-slate-400 text-[10px] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>AI Core Online</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap size={10} className="text-yellow-400" />
                <span>Claude Sonnet 3.5</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
