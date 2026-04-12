'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { useAIStore } from '@/lib/ai/store';
import { ChatMessage } from '@/types/ai';

export const AIChatTab: React.FC = () => {
  const { pageContext, userRole } = useAIStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Mocking Claude response as per B5 spec
    setTimeout(() => {
      let response = "";
      if (userRole === 'teacher') {
        response = `Based on the ${pageContext?.page.title || 'current'} data, I noticed that attendance patterns are fluctuating. Specifically, Grade 10 students have shown a 12% improvement in punctuality after the new morning assembly schedule. Would you like me to draft a summary for the upcoming faculty meeting?`;
      } else if (userRole === 'student') {
        response = `That's a great question about your assignment! Instead of giving the answer directly, have you considered how the principles of thermodynamics we discussed in class might apply to this heat transfer problem? What do you think happens to the energy when the two surfaces touch?`;
      } else {
        response = "I'm here to help you navigate LNS OS. I have access to your current page data and can provide specific analysis or help the school administration. What would you like to know?";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Context Indicator */}
      <div className="flex items-center gap-2 mb-3 p-2 bg-slate-900/5 rounded-lg border border-slate-100">
        <Sparkles size={12} className="text-blue-600" />
        <span className="text-[10px] text-slate-500 font-medium">
          Context: {pageContext?.page.title || 'General'}
        </span>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1"
      >
        {messages.length === 0 && (
          <div className="text-center py-8 space-y-2">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
              <Bot size={24} className="text-blue-500" />
            </div>
            <p className="text-sm font-semibold text-slate-800">How can I help you today?</p>
            <p className="text-xs text-slate-500 px-6">
              Ask me about current page data, student performance, or to draft communications.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-slate-200' : 'bg-red-50'
            }`}>
              {msg.role === 'user' ? <User size={14} className="text-slate-600" /> : <Bot size={14} className="text-red-600" />}
            </div>
            <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${
              msg.role === 'user' 
                ? 'bg-slate-900 text-white rounded-tr-none' 
                : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-red-600" />
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-100 rounded-tl-none shadow-sm flex gap-1">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Message LNS AI...`}
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1 px-2"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center disabled:opacity-20 transition-all active:scale-95"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};
