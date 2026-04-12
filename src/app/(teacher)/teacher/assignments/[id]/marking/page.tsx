"use client";

import React from "react";
import { PLACEHOLDER_STUDENTS, SUBJECTS } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Save, 
  ShieldCheck, 
  ChevronLeft,
  ChevronRight,
  FileText,
  MessageSquare,
  Award,
  Zap,
  TrendingUp,
  Activity,
  User,
  ScanEye
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SplitPanel } from "@/components/tablet/SplitPanel";
import { cn } from "@/lib/utils";

const ASSIGNMENTS = [
  { id: '1', title: "Modernist Poetry Analysis", category: "Communications", dueDate: "Tomorrow, 4 PM", submissions: 24, total: 32, marked: 12, avg: 82, high: 98, status: "Active" },
];

export async function generateStaticParams() {
  return ASSIGNMENTS.map((a) => ({
    id: a.id,
  }));
}

export default function TeacherMarkingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentId = searchParams.get('student') || 'student-001';
  const student = PLACEHOLDER_STUDENTS.find(s => s.id === studentId) || PLACEHOLDER_STUDENTS[0];
  const assignment = ASSIGNMENTS.find(a => a.id === params.id) || ASSIGNMENTS[0];

  const [scores, setScores] = React.useState<Record<string, number>>({
    'Criteria A': 7,
    'Criteria B': 6,
    'Criteria C': 8,
    'Criteria D': 7,
  });
  const [feedback, setFeedback] = React.useState("");

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = 32; // 8 * 4
  const percentage = Math.round((totalScore / maxScore) * 100);

  const handleScoreChange = (criteria: string, val: number) => {
    setScores(prev => ({ ...prev, [criteria]: val }));
  };

  const LeftPanel = (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 overflow-y-auto">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
         <div className="flex items-center gap-4">
            <Link href={`/teacher/assignments/${params.id}`}>
               <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-lns-navy border border-gray-100 h-10 w-10">
                  <ArrowLeft size={18} />
               </Button>
            </Link>
            <div className="flex flex-col">
               <h3 className="text-sm font-black text-lns-navy uppercase tracking-tight leading-none mb-1 italic">Marking Assessment</h3>
               <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic leading-none">{student.name} • {student.idNumber}</p>
            </div>
         </div>
         <div className="h-10 w-10 rounded-xl bg-lns-navy/5 text-lns-navy flex items-center justify-center text-[10px] font-black shadow-inner">
            {student.name.charAt(0)}
         </div>
      </div>

      <div className="flex-1 p-8 space-y-10 pb-24">
         {/* Rubric Interactive Grid */}
         <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-2 italic">Institutional Rubric (MYP)</h4>
            <div className="grid grid-cols-1 gap-6">
               {['Criteria A', 'Criteria B', 'Criteria C', 'Criteria D'].map((crit) => (
                 <div key={crit} className="space-y-3">
                    <div className="flex justify-between items-center px-2">
                       <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{crit}</span>
                       <span className="text-sm font-black text-lns-navy">{scores[crit]}/8</span>
                    </div>
                    <div className="flex gap-1.5 h-10">
                       {Array.from({ length: 9 }).map((_, val) => (
                         <button
                           key={val}
                           onClick={() => handleScoreChange(crit, val)}
                           className={cn(
                             "flex-1 rounded-lg text-[10px] font-black transition-all border border-transparent active:scale-90",
                             scores[crit] === val ? "bg-lns-red text-white shadow-lg shadow-red-600/20" : "bg-gray-100 text-slate-400 hover:bg-gray-200"
                           )}
                         >
                           {val}
                         </button>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Feedback Area */}
         <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy px-2 italic">Faculty Synchronous Feedback</h4>
            <textarea 
              className="w-full h-48 bg-gray-50 border border-gray-100 rounded-[2rem] p-8 text-sm font-bold italic leading-relaxed text-lns-navy outline-none focus:bg-white focus:ring-4 focus:ring-lns-red/5 transition-all shadow-inner resize-none"
              placeholder="Deploy qualitative analysis for the student node..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
         </div>

         <div className="pt-6 border-t border-gray-50 flex flex-col gap-6">
            <div className="flex items-center justify-between p-6 bg-lns-navy text-white rounded-[2rem] shadow-xl overflow-hidden relative group">
               <div className="relative z-10">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Resonance Projection</p>
                  <p className="text-4xl font-black italic tracking-tighter">{percentage}% <span className="text-sm font-black opacity-30 text-white">/ {totalScore}/32</span></p>
               </div>
               <TrendingUp size={48} className="absolute -bottom-5 -right-5 text-white/10 group-hover:scale-125 transition-transform" />
            </div>

            <Button className="h-16 w-full bg-lns-red text-white hover:bg-black rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-red-600/20 active:scale-95 transition-all flex items-center justify-center gap-3">
               Commit to Institutional Ledger
               <ShieldCheck size={20} />
            </Button>
         </div>
      </div>
    </div>
  );

  const RightPanel = (
    <div className="h-full bg-gray-50 flex flex-col">
       <div className="p-8 border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-lns-red/5 text-lns-red flex items-center justify-center">
                <FileText size={20} />
             </div>
             <div className="flex flex-col">
                <h3 className="text-sm font-black text-lns-navy uppercase tracking-tight leading-none mb-1 italic">Asset Metadata</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey italic leading-none">{assignment.title} • SHA-Hashed</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="h-10 w-10 text-lns-mid-grey">
                <ScanEye size={20} />
             </Button>
             <Button variant="ghost" size="icon" className="h-10 w-10 text-lns-mid-grey">
                <TrendingUp size={20} />
             </Button>
          </div>
       </div>

       <div className="flex-1 p-12 flex items-center justify-center">
          <Card className="w-full h-full max-w-5xl bg-white border-none shadow-[0_50px_100px_rgba(0,0,0,0.08)] rounded-[0.5rem] p-24 space-y-16 animate-in zoom-in-95 duration-700 overflow-y-auto">
             <div className="flex items-start justify-between border-b-2 border-gray-100 pb-12">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-lns-mid-grey uppercase tracking-widest italic">Institutional Submission Node</p>
                   <p className="text-2xl font-black text-lns-navy italic tracking-tight uppercase leading-none">{student.name}</p>
                   <p className="text-xs font-mono font-bold text-slate-400">#NODE_{student.id.toUpperCase()}_77</p>
                </div>
                <div className="px-5 py-2 bg-green-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-green-600/20">
                   Verified Terminal
                </div>
             </div>

             <div className="space-y-10 prose prose-lns max-w-none">
                <p className="text-lg leading-loose text-lns-navy font-medium italic opacity-80">
                   The following analytical discourse aims to synthesize the modernist poetic paradigm through the lens of early 20th-century geopolitical fragmentation...
                </p>
                <p className="text-lg leading-loose text-lns-navy font-medium italic opacity-80">
                   Key motifs identified include the dissonance between historical continuity and structural innovation. The deployment of fragmented stanzas serves as a metadata layer for the existential crisis prevalent in the post-conflict era...
                </p>
                <div className="h-96 w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center text-center p-12 opacity-50">
                   <ScanEye size={48} className="text-lns-navy/10 mb-4" />
                   <p className="text-xs font-black uppercase tracking-widest text-lns-navy/30 italic">Submission Visualization Node 7 Active</p>
                   <p className="text-[10px] font-bold text-slate-400 mt-2">PDF RENDERER INITIALIZED</p>
                </div>
             </div>
             
             <div className="pt-24 border-t border-gray-100 flex items-center justify-center gap-12 text-[10px] font-black text-lns-mid-grey/30 uppercase tracking-widest italic">
                <div className="flex items-center gap-2"><ShieldCheck size={14} /> ENCRYPTED BY LNS OS</div>
                <div className="w-1.5 h-1.5 bg-gray-100 rounded-full" />
                <div className="flex items-center gap-2"><Activity size={14} /> LIVE REFINEMENT TRACKING</div>
             </div>
          </Card>
       </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-140px)] -m-4 md:-m-6 lg:-m-8">
      <SplitPanel 
        leftPanel={LeftPanel} 
        rightPanel={RightPanel}
        showMobileDetail={false} // Should focus on layout for tablet/desktop
        leftWidth="w-full md:w-[450px]"
      />
    </div>
  );
}
