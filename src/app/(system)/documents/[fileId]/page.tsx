"use client";

import React from "react";
import { 
  FileText, 
  ArrowLeft, 
  Download, 
  Share2, 
  ShieldCheck, 
  Printer, 
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Clock,
  User
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const FILES = [
  { id: 'file-1', name: "Term_1_Assessment_Framework.pdf", size: "2.4 MB", type: "PDF", owner: "System Admin", date: "2026-03-01" },
  { id: 'file-2', name: "Maths_Grade10_Resources.zip", size: "145 MB", type: "Archive", owner: "Sarah Jenkins", date: "2026-03-15" },
  { id: 'file-3', name: "School_Policies_2026.pdf", size: "1.2 MB", type: "PDF", owner: "Principal", date: "2026-01-10" },
  { id: 'file-4', name: "Campus_Redesign_Render.png", size: "8.5 MB", type: "Image", owner: "IT Dept", date: "2026-04-05" },
];

export async function generateStaticParams() {
  return FILES.map((file) => ({
    fileId: file.id,
  }));
}

export default function DocumentViewerPage({ params }: { params: { fileId: string } }) {
  const router = useRouter();
  const file = FILES.find(f => f.id === params.fileId) || FILES[0];
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  return (
    <div className={cn(
      "flex flex-col animate-in fade-in duration-500",
      isFullscreen ? "fixed inset-0 z-[100] bg-white" : "h-[calc(100vh-140px)] space-y-6"
    )}>
      {/* Viewer Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 flex-shrink-0">
         <div className="flex items-center gap-4">
            {!isFullscreen && (
               <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full text-lns-navy transition-colors">
                  <ArrowLeft size={20} />
               </button>
            )}
            <div className="flex items-center gap-3">
               <FileText size={20} className="text-lns-red" />
               <div className="flex flex-col">
                  <h1 className="text-sm font-black text-lns-navy leading-none mb-1 truncate max-w-[200px] md:max-w-md">{file.name}</h1>
                  <span className="text-[10px] font-bold text-lns-mid-grey uppercase tracking-widest">{file.size} • {file.type}</span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-black text-lns-navy mr-4">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               SECURE SESSION
            </div>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg" onClick={() => setIsFullscreen(!isFullscreen)}>
               {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
               <Download size={18} />
            </Button>
            <Button className="h-9 px-4 rounded-lg bg-lns-navy text-white hover:bg-lns-red text-[10px] font-black uppercase tracking-widest hidden md:flex">
               Print Asset
            </Button>
         </div>
      </div>

      {/* Main Viewer Area */}
      <div className="flex-1 bg-gray-200/50 relative overflow-hidden flex flex-col items-center p-4 md:p-8">
         {/* Document Toolstrip */}
         <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-2 flex items-center gap-4 z-10 border border-white/50">
            <div className="flex items-center gap-1 border-r border-gray-100 pr-4">
               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl"><ZoomOut size={16} /></Button>
               <span className="text-[10px] font-black w-10 text-center">100%</span>
               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl"><ZoomIn size={16} /></Button>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-lns-navy px-2">
               <span>Page 1 of 4</span>
            </div>
         </div>

         {/* Document Mock */}
         <div className="w-full max-w-4xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] aspect-[1/1.414] rounded-sm p-12 md:p-20 space-y-8 animate-in zoom-in-95 duration-700 overflow-y-auto">
            <div className="flex justify-between border-b-2 border-lns-navy pb-8">
               <div className="space-y-2">
                  <div className="text-2xl font-black text-lns-navy">LNS OS</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-lns-red">Institutional Asset</div>
               </div>
               <div className="text-right space-y-1">
                  <p className="text-[10px] font-black text-lns-navy uppercase tracking-widest leading-none">Security Hash</p>
                  <p className="text-[8px] font-mono text-lns-mid-grey">SHA256: 7f8d9a0b1c2d3e4f...</p>
               </div>
            </div>

            <div className="space-y-6">
               <h2 className="text-3xl font-[900] text-lns-navy tracking-tighter">{file.name.replace('.pdf', '').replace(/_/g, ' ')}</h2>
               <div className="grid grid-cols-2 gap-8 py-4 border-y border-gray-100">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest">Authority</p>
                     <p className="text-xs font-bold text-lns-navy">{file.owner}</p>
                  </div>
                  <div className="space-y-1 text-right">
                     <p className="text-[10px] font-black uppercase text-lns-mid-grey tracking-widest">Published</p>
                     <p className="text-xs font-bold text-lns-navy">{new Date(file.date).toLocaleDateString()}</p>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <div className="h-4 w-full bg-gray-50 rounded" />
                  <div className="h-4 w-[90%] bg-gray-50 rounded" />
                  <div className="h-4 w-[95%] bg-gray-50 rounded" />
                  <div className="h-4 w-[40%] bg-gray-50 rounded" />
                  
                  <div className="h-4 w-full bg-gray-50 rounded mt-8" />
                  <div className="h-4 w-[85%] bg-gray-50 rounded" />
                  <div className="h-4 w-[90%] bg-gray-50 rounded" />
               </div>

               <div className="p-8 border-2 border-dashed border-gray-100 rounded-2xl mt-12 flex items-center justify-center text-center">
                  <p className="text-xs font-medium text-gray-300 italic">Remaining institutional content follows in pages 2–4.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
