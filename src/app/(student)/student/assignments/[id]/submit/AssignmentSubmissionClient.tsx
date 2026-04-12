"use client";

import React from "react";
import { ASSIGNMENTS } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  CheckCircle,
  Clock,
  Save,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function AssignmentSubmissionClient({ params }: { params: { id: string } }) {
  const router = useRouter();
  const assignment = ASSIGNMENTS.find(a => a.id === params.id);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!assignment) return <div>Mission invalid.</div>;

  const questions = assignment.questions || [
    { id: 'q-default', text: 'Upload your final analytical paper or project files below.', type: 'file' }
  ];

  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      router.push(`/student/assignments/${assignment.id}/submitted`);
    }, 1500);
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 p-4">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
         <Link href={`/student/assignments/${assignment.id}`}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/50 text-lns-navy">
               <ChevronLeft size={24} />
            </Button>
         </Link>
         <div className="space-y-1">
            <h1 className="text-xl font-black text-lns-navy tracking-tight">{assignment.title}</h1>
            <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest">{assignment.subject} • Step {currentStep + 1} of {totalSteps}</p>
         </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
         <div 
           className="h-full bg-lns-red transition-all duration-500 ease-out" 
           style={{ width: `${progress}%` }}
         />
      </div>

      <Card className="p-8 border-none shadow-xl bg-white rounded-2xl min-h-[400px] flex flex-col">
         {/* Question Area */}
         <div className="flex-1 space-y-8">
            <div className="space-y-4">
               <h2 className="text-2xl font-black text-lns-navy leading-tight">
                  {currentQuestion.text}
               </h2>
               <div className="h-1 w-12 bg-lns-red/20 rounded-full" />
            </div>

            {/* Input Type Renderer */}
            <div className="space-y-4">
               {currentQuestion.type === 'essay' && (
                  <textarea 
                    className="w-full min-h-[250px] p-6 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-lns-navy/20 outline-none text-lns-navy leading-relaxed text-sm transition-all"
                    placeholder="Enter your terminal analysis here..."
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => setAnswers({...answers, [currentQuestion.id]: e.target.value})}
                  />
               )}

               {currentQuestion.type === 'short_answer' && (
                  <input 
                    type="text"
                    className="w-full h-16 px-6 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-lns-navy/20 outline-none text-lns-navy font-bold transition-all"
                    placeholder="Brief response..."
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => setAnswers({...answers, [currentQuestion.id]: e.target.value})}
                  />
               )}

               {currentQuestion.type === 'file' && (
                  <div className="border-4 border-dashed border-gray-100 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center gap-6 hover:border-lns-red/30 hover:bg-red-50/10 transition-all cursor-pointer group">
                     <div className="w-20 h-20 rounded-full bg-lns-navy flex items-center justify-center text-white shadow-xl shadow-navy-900/10 group-hover:scale-110 transition-transform">
                        <Upload size={32} />
                     </div>
                     <div className="space-y-1">
                        <p className="font-black text-lns-navy">Deployment Hub</p>
                        <p className="text-xs text-lns-mid-grey">Single or multiple files accepted. Max 50MB.</p>
                     </div>
                     <Button className="bg-lns-navy/5 text-lns-navy hover:bg-lns-navy hover:text-white rounded-xl px-8 h-12 font-black uppercase tracking-widest text-[10px]">
                        Select Payload
                     </Button>
                  </div>
               )}
            </div>
         </div>

         {/* Navigation Controls */}
         <div className="flex items-center justify-between pt-12 border-t border-gray-100 mt-12">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-600">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               Auto-saved 10s ago
            </div>

            <div className="flex items-center gap-4">
               {currentStep > 0 && (
                  <Button 
                    variant="ghost"
                    onClick={handleBack}
                    className="h-14 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest text-lns-navy cursor-pointer"
                  >
                    Previous Module
                  </Button>
               )}
               <Button 
                 onClick={handleNext}
                 disabled={isSubmitting}
                 className={cn(
                   "h-14 px-10 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all flex items-center gap-3",
                   currentStep === totalSteps - 1 
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-green-600/20" 
                    : "bg-lns-navy hover:bg-lns-red text-white shadow-navy-600/20"
                 )}
               >
                 {isSubmitting ? (
                   "Synchronizing..."
                 ) : (
                   currentStep === totalSteps - 1 ? "Execute Final Submission" : "Next Module"
                 )}
                 {currentStep < totalSteps - 1 && <ArrowRight size={18} />}
               </Button>
            </div>
         </div>
      </Card>

      {/* Footer Meta */}
      <div className="flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey/60 italic">
        <div className="flex items-center gap-2">
           <Save size={14} />
           Draft Persistent
        </div>
        <div className="flex items-center gap-2">
           <Clock size={14} />
           Deadline Respected
        </div>
      </div>
    </div>
  );
}
