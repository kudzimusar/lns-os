"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { 
  ClipboardList, 
  Search, 
  CheckCircle2, 
  ChevronRight,
  Clock,
  User,
  ArrowRight
} from "lucide-react";
import { SplitPanel, SplitPanelEmptyState } from "@/components/tablet/SplitPanel";
import { ASSIGNMENTS } from "@/lib/placeholder-data";
import { useRouter } from "next/navigation";

interface AssignmentsLayoutProps {
  selectedId?: string | null;
}

export function AssignmentsLayout({ selectedId: initialSelectedId }: AssignmentsLayoutProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = React.useState<string | null>(initialSelectedId || null);
  
  // Sync state with prop if it changes (e.g. navigation)
  React.useEffect(() => {
    if (initialSelectedId) {
      setSelectedId(initialSelectedId);
    }
  }, [initialSelectedId]);

  const selectedAssignment = ASSIGNMENTS.find(a => a.id === selectedId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    // Update URL without full reload if possible, or just navigate
    router.push(`/student/assignments/${id}`);
  };

  const LeftPanel = (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-black text-lns-navy tracking-tight mb-4">Assignments</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-lns-mid-grey" size={16} />
          <input 
            type="text" 
            placeholder="Filter active missions..." 
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-100 bg-gray-50 text-xs focus:outline-none focus:ring-2 focus:ring-lns-red/20"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {ASSIGNMENTS.map((item) => {
          const isActive = selectedId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={cn(
                "w-full text-left p-4 rounded-xl transition-all group relative",
                isActive 
                  ? "bg-lns-navy/5 border-l-4 border-lns-red" 
                  : "hover:bg-gray-50 border-l-4 border-transparent"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className={cn("text-sm font-bold", isActive ? "text-lns-navy" : "text-gray-700")}>
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-lns-mid-grey uppercase">
                    <span className={cn(item.urgency === "critical" ? "text-lns-red" : "")}>
                      {item.status === 'Completed' ? 'Completed' : `Due ${new Date(item.dueDate).toLocaleDateString()}`}
                    </span>
                    <span>•</span>
                    <span>{item.subject}</span>
                  </div>
                </div>
                {item.status === "Completed" && <CheckCircle2 size={14} className="text-green-500" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const RightPanel = (
    <div className="h-full bg-white">
      {selectedAssignment ? (
        <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300 h-full overflow-y-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-lns-navy/5 text-lns-navy text-[10px] font-black uppercase tracking-widest">
                  {selectedAssignment.subject}
                </span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest",
                  selectedAssignment.urgency === "critical" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                )}>
                  {selectedAssignment.status}
                </span>
              </div>
              <h1 className="text-3xl font-black text-lns-navy tracking-tighter leading-tight">
                {selectedAssignment.title}
              </h1>
              <div className="flex items-center gap-4 text-xs font-medium text-lns-mid-grey">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  {selectedAssignment.teacher}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  Due {new Date(selectedAssignment.dueDate).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {/* Instructions Section */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy">Operational Briefing</h3>
              <p className="text-lns-navy/70 leading-relaxed text-sm">
                {selectedAssignment.description}
              </p>
              <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-lns-navy/20 text-xs text-lns-navy/60 italic">
                Note: Ensure your analysis follows the standard institutional format. Include peer-reviewed citations where necessary.
              </div>
            </section>

            {/* If Completed, show feedback */}
            {selectedAssignment.status === 'Completed' ? (
              <section className="space-y-4 p-6 bg-green-50 rounded-2xl border border-green-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest text-green-700">Evaluation Result</h3>
                  <span className="text-2xl font-black text-green-700">{selectedAssignment.score}/{selectedAssignment.maxScore}</span>
                </div>
                <p className="text-sm text-green-800/70 italic">"{selectedAssignment.feedback}"</p>
              </section>
            ) : (
              /* Action Section */
              <section className="space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-navy">Assignment Workspace</h3>
                 
                 <Link href={`/student/assignments/${selectedAssignment.id}/submit`}>
                    <Button className="w-full md:w-auto bg-lns-red hover:bg-red-700 text-white h-14 px-10 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-red-600/20 active:scale-95 transition-all flex items-center gap-3">
                      Initialize Submission Flow
                      <ArrowRight size={18} />
                    </Button>
                 </Link>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-2">
                       <p className="text-[10px] font-black uppercase text-lns-mid-grey">Time Remaining</p>
                       <p className="text-sm font-bold text-lns-navy">2 Days, 4 Hours</p>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-2">
                       <p className="text-[10px] font-black uppercase text-lns-mid-grey">Weighting</p>
                       <p className="text-sm font-bold text-lns-navy">15% of Term Grade</p>
                    </div>
                 </div>
              </section>
            )}

            {/* Back to list on mobile */}
            <div className="md:hidden pt-8 border-t border-gray-100">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedId(null)}
                className="w-full text-lns-mid-grey"
              >
                Back to Assignment List
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <SplitPanelEmptyState 
          title="No Mission Active" 
          description="Select an assignment from the navigation sector to initialize the workspace."
          icon={ClipboardList}
        />
      )}
    </div>
  );

  return (
    <div className="h-[calc(100vh-120px)] -m-4 md:-m-6 lg:-m-8">
      <SplitPanel 
        leftPanel={LeftPanel} 
        rightPanel={RightPanel}
        showMobileDetail={!!selectedId}
        leftWidth="w-full md:w-80"
      />
    </div>
  );
}
