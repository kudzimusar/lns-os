"use client";

import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Scan, 
  ShoppingCart, 
  AlertTriangle, 
  X, 
  Check, 
  Search, 
  WifiOff, 
  ShieldCheck,
  Zap,
  Clock,
  User,
  History
} from "lucide-react";

// Mock Data
const CANTEEN_ITEMS = [
  { id: 'item-1', name: "Daily Special (Chicken/Rice)", price: 4.50, allergens: ['Dairy'] },
  { id: 'item-2', name: "Garden Salad Bowl", price: 3.50, allergens: [] },
  { id: 'item-3', name: "Fresh Fruit Pot", price: 1.20, allergens: [] },
  { id: 'item-4', name: "Sparkling Water", price: 0.80, allergens: [] },
  { id: 'item-5', name: "Chocolate Muffin", price: 1.50, allergens: ['Gluten', 'Dairy', 'Eggs'] },
];

const MOCK_STUDENTS = {
  "STU-001": { 
    name: "Amara Johnson", 
    balance: 14.20, 
    allergens: ['Nuts'], 
    dailyLimit: 10.00, 
    todaySpend: 2.50,
    autoTopUp: true
  },
  "STU-002": { 
    name: "Blake Nkosi", 
    balance: 2.10, 
    allergens: ['Dairy'], 
    dailyLimit: 8.00, 
    todaySpend: 0.00,
    autoTopUp: false
  }
};

export default function CanteenKioskPage() {
  const [activeStudent, setActiveStudent] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [scanning, setScanning] = useState(false);
  const [offline, setOffline] = useState(false);
  const [syncQueue, setSyncQueue] = useState(0);
  const [message, setMessage] = useState<{type: 'success' | 'error' | 'warning', text: string} | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const simulateScan = (id: string) => {
    setScanning(true);
    setTimeout(() => {
      const student = MOCK_STUDENTS[id as keyof typeof MOCK_STUDENTS];
      if (student) {
        setActiveStudent({ ...student, id });
        setMessage(null);
      } else {
        setMessage({ type: 'error', text: 'Invalid QR Code' });
      }
      setScanning(false);
    }, 1000);
  };

  const addToCart = (item: any) => {
    const allergenConflict = activeStudent?.allergens.some((a: string) => item.allergens.includes(a));
    if (allergenConflict) {
      setMessage({ type: 'warning', text: `ALLERGEN ALERT: ${item.name} contains allergens for ${activeStudent.name}` });
    }
    setCart([...cart, item]);
  };

  const processPayment = () => {
    if (!activeStudent) return;

    if (activeStudent.balance < total) {
      if (activeStudent.autoTopUp) {
        setMessage({ type: 'success', text: 'Insufficient funds. Auto-top-up triggered (+£20.00)' });
        setActiveStudent({ ...activeStudent, balance: activeStudent.balance + 20.00 });
        return;
      }
      setMessage({ type: 'error', text: 'Insufficient Balance. Please top up.' });
      return;
    }

    if (activeStudent.dailyLimit && (activeStudent.todaySpend + total) > activeStudent.dailyLimit) {
       setMessage({ type: 'error', text: 'Daily Spending Limit Exceeded' });
       return;
    }

    // Success
    setSyncQueue(prev => prev + 1);
    setMessage({ type: 'success', text: `Payment of £${total.toFixed(2)} accepted. Remaining: £${(activeStudent.balance - total).toFixed(2)}` });
    
    // Clear state
    setCart([]);
    setActiveStudent(null);
    
    // Simulate auto-sync
    setTimeout(() => {
      setSyncQueue(prev => Math.max(0, prev - 1));
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-12rem)] flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-lns-border">
         <div className="flex items-center space-x-4">
            <div className="p-3 bg-lns-navy text-white rounded-2xl">
               <ShoppingCart size={28} />
            </div>
            <div>
               <h1 className="text-2xl font-[900] text-lns-navy uppercase tracking-tighter leading-none">Canteen POS Terminal</h1>
               <p className="text-xs font-bold text-lns-mid-grey uppercase tracking-widest mt-1">Terminal ID: LN-CANT-04 • Spring Term</p>
            </div>
         </div>
         <div className="flex items-center space-x-6">
            <div className="text-right">
               <div className="flex items-center justify-end space-x-2">
                 <div className={`w-2 h-2 rounded-full ${offline ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-lns-navy">{offline ? 'Offline Mode' : 'Connected'}</span>
               </div>
               <p className="text-[9px] text-lns-mid-grey font-bold uppercase">{syncQueue} Pending Syncs</p>
            </div>
            <Button 
               variant="outline" 
               className={`h-12 w-12 rounded-2xl transition-all ${offline ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}`}
               onClick={() => setOffline(!offline)}
            >
               <WifiOff size={20} />
            </Button>
         </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        {/* Menu Section */}
        <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
           {message && (
             <div className={`p-4 rounded-2xl flex items-center justify-between animate-in slide-in-from-top-4 duration-300 ${
               message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
               message.type === 'error' ? 'bg-lns-red/10 text-lns-red border border-lns-red/20' :
               'bg-amber-50 text-amber-700 border border-amber-200'
             }`}>
                <div className="flex items-center gap-3">
                   {message.type === 'success' ? <Check size={18} /> : 
                    message.type === 'error' ? <AlertTriangle size={18} /> : <AlertTriangle size={18} />}
                   <span className="text-xs font-bold uppercase tracking-wide">{message.text}</span>
                </div>
                <X size={16} className="cursor-pointer opacity-50 hover:opacity-100" onClick={() => setMessage(null)} />
             </div>
           )}

           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pr-2 pb-4">
              {CANTEEN_ITEMS.map((item) => (
                <Card 
                  key={item.id} 
                  className={`border border-lns-border hover:border-lns-navy transition-all duration-300 cursor-pointer group relative overflow-hidden h-40 ${!activeStudent ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => addToCart(item)}
                >
                   <CardContent className="p-5 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                         <div className="w-10 h-10 bg-lns-light-grey rounded-xl flex items-center justify-center group-hover:bg-lns-navy group-hover:text-white transition-colors">
                           <ShoppingCart size={18} />
                         </div>
                         <p className="text-base font-black text-lns-navy">£{item.price.toFixed(2)}</p>
                      </div>
                      <div>
                         <h3 className="text-sm font-black text-lns-navy leading-tight mt-2">{item.name}</h3>
                         <div className="flex flex-wrap gap-1 mt-1">
                            {item.allergens.map(a => (
                               <span key={a} className="text-[8px] font-black uppercase tracking-tight text-lns-red bg-lns-red/5 px-1.5 py-0.5 rounded-sm">{a}</span>
                            ))}
                         </div>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
           {/* Scan / Identification Card */}
           <Card className="border-none shadow-xl bg-lns-navy text-white overflow-hidden shrink-0">
              <CardContent className="p-6">
                 {!activeStudent ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                       <div className={`w-24 h-24 border-2 border-dashed border-white/20 rounded-3xl flex items-center justify-center mb-6 relative overflow-hidden ${scanning ? "animate-pulse" : ""}`}>
                          {scanning ? (
                            <Loader2 size={40} className="text-white animate-spin opacity-50" />
                          ) : (
                            <>
                              <Scan size={44} className="text-white opacity-40" />
                              <div className="absolute w-full h-0.5 bg-lns-red shadow-[0_0_15px_#E63946] top-0 left-0 animate-scan"></div>
                            </>
                          )}
                       </div>
                       <h3 className="text-xl font-[900] uppercase tracking-tighter mb-2">Scan Student QR</h3>
                       <p className="text-xs text-white/50 font-medium mb-6">Position QR code within the frame to identify student and check wallet balance.</p>
                       <div className="flex gap-2 w-full">
                          <Button 
                            className="flex-1 bg-white text-lns-navy hover:bg-white/90 h-12 text-[10px] font-black uppercase tracking-widest rounded-xl"
                            onClick={() => simulateScan("STU-001")}
                          >
                            Mock: Amara
                          </Button>
                          <Button 
                            className="flex-1 bg-white text-lns-navy hover:bg-white/90 h-12 text-[10px] font-black uppercase tracking-widest rounded-xl"
                            onClick={() => simulateScan("STU-002")}
                          >
                            Mock: Blake
                          </Button>
                       </div>
                    </div>
                 ) : (
                    <div className="animate-in zoom-in-95 duration-300">
                       <div className="flex items-start justify-between mb-8">
                          <div className="flex items-center space-x-4">
                             <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                                <User size={28} />
                             </div>
                             <div>
                                <h3 className="text-lg font-black text-white leading-none">{activeStudent.name}</h3>
                                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">{activeStudent.id}</p>
                             </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-white/40 hover:text-white hover:bg-white/10 rounded-full"
                            onClick={() => { setActiveStudent(null); setCart([]); setMessage(null); }}
                          >
                            <X size={20} />
                          </Button>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                             <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Canteen Balance</p>
                             <p className={`text-2xl font-[900] tracking-tighter ${activeStudent.balance < 5 ? 'text-lns-red' : 'text-white'}`}>£{activeStudent.balance.toFixed(2)}</p>
                          </div>
                          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                             <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Daily Cap Left</p>
                             <p className="text-2xl font-[900] tracking-tighter text-white">£{(activeStudent.dailyLimit - activeStudent.todaySpend).toFixed(2)}</p>
                          </div>
                       </div>

                       {activeStudent.allergens.length > 0 && (
                          <div className="mt-4 p-3 bg-lns-red/20 border border-lns-red/40 rounded-xl flex items-center space-x-3">
                             <AlertTriangle size={18} className="text-lns-red" />
                             <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-lns-red">Allergen Registry</p>
                                <p className="text-[10px] font-bold text-white capitalize">{activeStudent.allergens.join(', ')} Restricted</p>
                             </div>
                          </div>
                       )}
                    </div>
                 )}
              </CardContent>
           </Card>

           {/* Shopping Cart Section */}
           <Card className="flex-1 border border-lns-border shadow-sm bg-white overflow-hidden flex flex-col">
              <CardHeader className="py-4 border-b border-lns-light-grey shrink-0">
                 <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-lns-navy">Current Order</CardTitle>
                    <span className="text-[10px] font-black px-2 py-0.5 bg-lns-light-grey text-lns-navy rounded-md">{cart.length} ITEMS</span>
                 </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                 {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                       <Clock size={32} className="text-lns-light-grey mb-3" />
                       <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">Awaiting items</p>
                    </div>
                 ) : (
                    <div className="divide-y divide-lns-light-grey">
                       {cart.map((item, idx) => (
                          <div key={idx} className="p-4 flex items-center justify-between hover:bg-lns-light-grey/30 transition-colors animate-in slide-in-from-right-2 duration-300">
                             <div>
                                <h4 className="text-sm font-bold text-lns-navy">{item.name}</h4>
                                <span className="text-[10px] font-black text-lns-mid-grey">UNIT: £{item.price.toFixed(2)}</span>
                             </div>
                             <div className="flex items-center space-x-3">
                                <span className="text-sm font-black text-lns-navy">£{item.price.toFixed(2)}</span>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-7 w-7 text-lns-red hover:bg-lns-red/5"
                                  onClick={() => setCart(cart.filter((_, i) => i !== idx))}
                                >
                                   <X size={14} />
                                </Button>
                             </div>
                          </div>
                       ))}
                    </div>
                 )}
              </CardContent>
              <div className="p-6 bg-lns-light-grey border-t border-lns-border shrink-0">
                 <div className="flex justify-between items-end mb-6">
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey leading-none mb-1">Transaction Value</p>
                       <p className="text-3xl font-[900] text-lns-navy tracking-tighter">£{total.toFixed(2)}</p>
                    </div>
                    {activeStudent && (
                       <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey leading-none mb-1">Net Balance</p>
                          <p className={`text-base font-black tracking-tight ${(activeStudent.balance - total) < 0 ? 'text-lns-red' : 'text-green-600'}`}>
                            £{(activeStudent.balance - total).toFixed(2)}
                          </p>
                       </div>
                    )}
                 </div>
                 <Button 
                    className="w-full h-14 bg-lns-navy text-white hover:bg-lns-navy/90 rounded-2xl shadow-lg shadow-lns-navy/10 disabled:opacity-50 group font-black uppercase tracking-widest text-[11px]"
                    disabled={cart.length === 0 || !activeStudent}
                    onClick={processPayment}
                 >
                    Complete Transaction
                    <Zap size={16} className="ml-2 fill-current" />
                 </Button>
              </div>
           </Card>

           <div className="flex items-center justify-center space-x-4 opacity-50">
              <ShieldCheck size={16} className="text-lns-navy" />
              <span className="text-[9px] font-black uppercase tracking-widest text-lns-navy italic">Blockchain Integrity Enabled</span>
           </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          from { top: 0; }
          to { top: 100%; }
        }
        .animate-scan {
          animation: scan 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
