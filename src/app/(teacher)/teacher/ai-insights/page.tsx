"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Send,
  Sparkles,
  Users,
  BarChart3,
  Zap,
  ChevronRight,
  Activity,
  Target,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

const atRiskStudents = [
  {
    id: "student-004",
    name: "David Moyo",
    class: "Grade 8A",
    riskLevel: "high",
    reasons: ["Grade trend declining −12% over 4 weeks", "Attendance 88% (below 90% threshold)", "3 incomplete assignments"],
    suggestions: [
      "Schedule a one-on-one academic review session",
      "Contact parent/guardian to discuss support plan",
      "Assign peer mentor from GOLD citizenship tier",
    ],
    powerScore: 65.4,
    trend: -12,
  },
  {
    id: "student-003",
    name: "Cara Mensah",
    class: "Grade 7B",
    riskLevel: "medium",
    reasons: ["Science grade dropped from B to D in 2 weeks", "Engagement score fell to L2"],
    suggestions: [
      "Review recent Science assessments for gaps in fundamentals",
      "Offer supplemental resources for wave-particle duality unit",
      "Check in during next class transition",
    ],
    powerScore: 76.1,
    trend: -6,
  },
];

const trendData = [
  { week: "W1", classAvg: 72, atRisk: 5 },
  { week: "W2", classAvg: 74, atRisk: 4 },
  { week: "W3", classAvg: 71, atRisk: 6 },
  { week: "W4", classAvg: 78, atRisk: 3 },
  { week: "W5", classAvg: 76, atRisk: 4 },
  { week: "W6", classAvg: 80, atRisk: 2 },
];

const radarData = [
  { subject: "Maths", score: 82, fullMark: 100 },
  { subject: "English", score: 91, fullMark: 100 },
  { subject: "Science", score: 68, fullMark: 100 },
  { subject: "Humanities", score: 78, fullMark: 100 },
  { subject: "Arts", score: 85, fullMark: 100 },
  { subject: "P.E.", score: 94, fullMark: 100 },
];

const aiInsights = [
  {
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "Positive Trend: Communications",
    body: "Class average in Communications has risen 8 points over the last 3 weeks. Ms. Chen's essay scaffold technique is showing measurable impact across all citizenship tiers.",
  },
  {
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    title: "Intervention Required: Science Unit 4",
    body: "42% of Grade 8A scored below 60% on the Wave-Particle Duality assessment. Recommend a 45-minute remediation session before the next formative assessment window.",
  },
  {
    icon: TrendingDown,
    color: "text-lns-red",
    bg: "bg-red-50",
    title: "Attendance Risk: Monday Cohort",
    body: "Monday attendance across Grade 8 has dropped to 87% over the last 4 Mondays. Pattern suggests a structural engagement issue. Recommend timetable review with Admin.",
  },
  {
    icon: CheckCircle2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    title: "Merit Impact Validated",
    body: "Students who received a merit award in the last 2 weeks showed a statistically significant +4.2% improvement in subsequent assessment scores. Merit system is working.",
  },
];

const chatHistory = [
  {
    role: "user",
    text: "Which students are struggling most in Science this term?",
  },
  {
    role: "ai",
    text: "Based on current data, David Moyo (Grade 8A, 65.4 Power Score) and Cara Mensah (Grade 7B, 76.1) are showing the steepest Science grade declines this term. David's score dropped from 74% to 61% across three assessments; Cara's from 79% to 67%. Both have incomplete lab reports outstanding. Recommend targeted intervention before the end-of-term assessment window.",
  },
];

export default function AIInsightsPage() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(chatHistory);
  const [isTyping, setIsTyping] = useState(false);
  const [expandedRisk, setExpandedRisk] = useState<string | null>("student-004");

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: "user", text: chatInput };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Analysing your cohort data across 311 academic records... Based on current performance trajectories, attendance patterns, and citizenship scores, the highest-risk intervention window is the next 2 weeks before the end-of-term assessment. Shall I generate a targeted support plan?",
        },
      ]);
      setIsTyping(false);
    }, 1800);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-[800] text-lns-navy tracking-tight flex items-center gap-3">
            <BrainCircuit size={28} className="text-lns-red" />
            AI Intelligence Hub
          </h1>
          <p className="text-lns-mid-grey font-medium uppercase tracking-[0.2em] text-[10px] mt-1">
            Powered by Claude · 311 student records analysed · Last updated 2 min ago
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white h-11 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2">
            <RefreshCw size={16} />
            Refresh Analysis
          </Button>
          <Button className="h-11 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2">
            <Sparkles size={16} />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "At-Risk Students", value: "2", sub: "Require intervention", icon: AlertTriangle, color: "text-lns-red", bg: "bg-red-50" },
          { label: "Avg Class Score", value: "80%", sub: "+4% vs last month", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { label: "Predictions Active", value: "14", sub: "Attendance & grade", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "AI Accuracy Rate", value: "94.2%", sub: "Validated against outcomes", icon: Target, color: "text-lns-navy", bg: "bg-lns-navy/5" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm bg-white p-6">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", stat.bg, stat.color)}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-[900] text-lns-navy">{stat.value}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey mt-1">{stat.label}</p>
            <p className="text-[10px] text-lns-mid-grey/60 mt-1">{stat.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* At-Risk Panel */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-sm font-[900] text-lns-navy uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle size={16} className="text-lns-red" />
            At-Risk Student Flags
          </h2>
          {atRiskStudents.map((student) => (
            <Card
              key={student.id}
              className={cn(
                "border-none shadow-sm bg-white rounded-2xl overflow-hidden cursor-pointer transition-all",
                expandedRisk === student.id ? "shadow-lg ring-2 ring-lns-red/20" : "hover:shadow-md"
              )}
              onClick={() => setExpandedRisk(expandedRisk === student.id ? null : student.id)}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-[900] text-lns-navy">{student.name}</p>
                    <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">{student.class}</p>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                    student.riskLevel === "high" ? "bg-red-100 text-lns-red" : "bg-amber-100 text-amber-700"
                  )}>
                    {student.riskLevel} risk
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", student.riskLevel === "high" ? "bg-lns-red" : "bg-amber-500")}
                      style={{ width: `${student.powerScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-[900] text-lns-navy">{student.powerScore}</span>
                  <span className={cn("text-[10px] font-black", student.trend < 0 ? "text-lns-red" : "text-green-600")}>
                    {student.trend}%
                  </span>
                </div>
              </div>

              {expandedRisk === student.id && (
                <div className="px-5 pb-5 space-y-4 border-t border-gray-50 pt-4">
                  <div className="space-y-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey">Risk Signals</p>
                    {student.reasons.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-lns-navy/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-lns-red mt-1.5 shrink-0" />
                        {r}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-green-600">AI Suggestions</p>
                    {student.suggestions.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-lns-navy/70">
                        <CheckCircle2 size={12} className="text-green-500 mt-0.5 shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full h-10 bg-lns-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                    Create Support Plan
                    <ChevronRight size={14} className="ml-2" />
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Trend */}
          <Card className="border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 size={16} className="text-lns-navy" />
                6-Week Performance Arc
              </CardTitle>
              <span className="text-[9px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-1 rounded-full">
                Trending Up
              </span>
            </CardHeader>
            <CardContent className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0A1F44" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#0A1F44" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F5F7" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#8C92A0", fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8C92A0", fontSize: 10 }} domain={[60, 100]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="classAvg" stroke="#0A1F44" strokeWidth={3} fillOpacity={1} fill="url(#aiGrad)" name="Class Avg %" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subject Radar */}
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap size={16} className="text-lns-navy" />
                Subject Mastery Radar
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#F4F5F7" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#8C92A0", fontSize: 10 }} />
                  <Radar name="Score" dataKey="score" stroke="#D62B2B" fill="#D62B2B" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Narrative Insights */}
      <div>
        <h2 className="text-sm font-[900] text-lns-navy uppercase tracking-widest flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-lns-red" />
          AI-Generated Insights This Week
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiInsights.map((insight, i) => (
            <Card key={i} className="border-none shadow-sm bg-white rounded-2xl p-6 flex gap-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", insight.bg, insight.color)}>
                <insight.icon size={20} />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-[900] text-lns-navy leading-tight">{insight.title}</p>
                <p className="text-[11px] text-lns-navy/60 leading-relaxed">{insight.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Chat Interface */}
      <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-lns-navy text-white px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-lns-red flex items-center justify-center shadow-lg shadow-red-600/30">
              <BrainCircuit size={20} />
            </div>
            <div>
              <CardTitle className="text-white text-base">Ask the AI</CardTitle>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Data-grounded responses from your class records</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-64 overflow-y-auto p-8 space-y-6 bg-lns-light-grey/30">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-xl bg-lns-navy text-white flex items-center justify-center shrink-0 mt-1">
                    <BrainCircuit size={14} />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-lns-navy text-white rounded-tr-sm font-medium"
                      : "bg-white text-lns-navy/80 rounded-tl-sm shadow-sm font-medium"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-lns-navy text-white flex items-center justify-center shrink-0">
                  <BrainCircuit size={14} />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 bg-lns-navy/30 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest">Analysing records…</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-6 border-t border-gray-100 flex gap-4">
            <input
              className="flex-1 h-12 bg-lns-light-grey rounded-xl px-6 text-sm font-medium text-lns-navy outline-none focus:bg-white focus:ring-2 focus:ring-lns-red/10 transition-all border border-gray-100"
              placeholder="Ask about your class data… e.g. Who missed the most lessons this month?"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button
              onClick={handleSend}
              disabled={!chatInput.trim() || isTyping}
              className="h-12 px-6 bg-lns-navy text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg"
            >
              <Send size={16} />
              Ask
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
