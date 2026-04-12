"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription,
  CardFooter
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  ChevronLeft, 
  CheckCircle2, 
  CreditCard, 
  Wallet, 
  ShieldCheck, 
  ArrowRight,
  Loader2,
  ExternalLink,
  Bus,
  School,
  ShoppingBag,
  Info,
  Calendar,
  Clock,
  MapPin,
  Lock,
  Zap,
  Check
} from "lucide-react";

type Step = "review" | "method" | "processing" | "success";

const PAYMENT_ITEMS = {
  "trip-001": {
    title: "Science Museum Trip",
    student: "Amara Johnson",
    grade: "Grade 8A",
    details: {
      location: "Natural History Museum, London",
      date: "Wednesday 15 May 2026",
      time: "Depart 08:30 · Return 16:00",
      items: [
        "Packed lunch and snacks",
        "Comfortable walking shoes",
        "Weather-appropriate clothing",
        "Notebook and pen"
      ]
    },
    pricing: [
      { label: "Trip fee", amount: 24.00 },
      { label: "Sibling discount (10%)", amount: -2.40 }
    ],
    total: 21.60,
    deadline: "10 May 2026",
    refundPolicy: "Full refund if cancelled before 10 May",
    icon: Bus,
    color: "text-lns-red"
  },
  "fee-001": {
    title: "Term 3 Tuition Fee",
    student: "Amara Johnson",
    grade: "Grade 8A",
    details: {
      location: "Lennon Nash High School",
      date: "Spring Term 2026",
      time: "Covers all curriculum & lab fees",
      items: [
        "Full Tuition",
        "Laboratory Access",
        "Resource Materials",
        "Extracurricular Levy"
      ]
    },
    pricing: [
      { label: "Tuition Fee", amount: 1600.00 }
    ],
    total: 1600.00,
    deadline: "30 Apr 2026",
    refundPolicy: "Subject to school bursary terms",
    icon: School,
    color: "text-amber-600"
  },
  "shop-001": {
    title: "Year 8 Mathematics Textbooks",
    student: "Amara Johnson",
    grade: "Grade 8A",
    details: {
      location: "School Shop / Resource Centre",
      date: "Immediate Fulfilment",
      time: "Collect between 08:00 - 16:30",
      items: [
        "Algebra & Geometry Vol 2",
        "Mathematical Thinking Workbook",
        "Past Paper Compilation"
      ]
    },
    pricing: [
      { label: "Textbook Set", amount: 42.00 }
    ],
    total: 42.00,
    deadline: "Open",
    refundPolicy: "Returns accepted within 14 days if unused",
    icon: ShoppingBag,
    color: "text-blue-600"
  },
  "all": {
    title: "Consolidated Statement",
    student: "Amara Johnson",
    grade: "Grade 8A",
    details: {
      location: "Multiple Departments",
      date: "Spring Term 2026",
      time: "Full Account Clearance",
      items: [
          "Tuition",
          "Trip Fees",
          "Resources"
      ]
    },
    pricing: [
      { label: "Term 3 Tuition", amount: 1600.00 },
      { label: "Science Museum Trip", amount: 21.60 },
      { label: "Mathematics Textbooks", amount: 42.00 }
    ],
    total: 1663.60,
    deadline: "Multiple",
    refundPolicy: "Individual item policies apply",
    icon: Zap,
    color: "text-lns-navy"
  }
};

const PAYMENT_METHODS = [
  { id: "stripe_card", name: "Credit / Debit Card", icon: CreditCard, subtitle: "Visa, Mastercard, Amex", tag: "Secure" },
  { id: "apple_pay", name: "Apple Pay", icon: CheckCircle2, subtitle: "Fast, biometric entry", tag: "Express" },
  { id: "google_pay", name: "Google Pay", icon: CheckCircle2, subtitle: "One-tap checkout", tag: "Express" },
  { id: "paypal", name: "PayPal", icon: Wallet, subtitle: "PayPal wallet or credit", tag: "" },
  { id: "wallet", name: "School Wallet", icon: Wallet, subtitle: "Balance: £45.20", tag: "Instant" },
  { id: "bank_transfer", name: "Direct Debit", icon: School, subtitle: "Via GoCardless", tag: "Low Fee" },
];

export default function CheckoutClient({ params }: { params: { id: string } }) {
  const [step, setStep] = useState<Step>("review");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [receiptId, setReceiptId] = useState("");
  const [blockchainHash, setBlockchainHash] = useState("");

  const item = PAYMENT_ITEMS[params.id as keyof typeof PAYMENT_ITEMS] || PAYMENT_ITEMS["trip-001"];

  useEffect(() => {
    if (step === "processing") {
      const timer = setTimeout(() => {
        setReceiptId(`LNS-2026-${Math.floor(Math.random() * 90000) + 10000}`);
        setBlockchainHash(`${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 10)}`);
        setStep("success");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNext = () => {
    if (step === "review") setStep("method");
    else if (step === "method" && selectedMethod) setStep("processing");
  };

  const handleBack = () => {
    if (step === "method") setStep("review");
    else if (step === "review") window.history.back();
  };

  if (step === "processing") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-in fade-in duration-500">
        <div className="relative">
          <Loader2 size={64} className="text-lns-navy animate-spin" />
          <Lock size={20} className="absolute inset-0 m-auto text-lns-navy" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-[900] text-lns-navy uppercase tracking-tight">Securing Transaction</h2>
          <p className="text-lns-mid-grey font-medium mt-2">Communicating with payment gateway via SSL...</p>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-lns-mid-grey bg-lns-light-grey px-4 py-2 rounded-full">
           <ShieldCheck size={14} className="text-green-600" />
           <span>PCI DSS COMPLIANT LAYER</span>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in zoom-in-95 duration-700">
        <Card className="border-none shadow-xl bg-white overflow-hidden text-center pt-12 pb-8 px-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 scale-110">
            <Check size={48} className="text-green-600 stroke-[3]" />
          </div>
          <h2 className="text-3xl font-[900] text-lns-navy uppercase tracking-tighter mb-2">Payment Confirmed</h2>
          <p className="text-lns-mid-grey font-medium max-w-md mx-auto">
            {params.id === 'all' ? "Your accounts have been cleared." : `${item.student}'s place on the ${item.title} has been confirmed.`}
          </p>

          <div className="mt-10 p-6 bg-lns-light-grey rounded-2xl space-y-4 text-left border border-lns-border/50">
             <div className="flex justify-between items-center text-sm">
                <span className="text-lns-mid-grey font-medium">Amount Paid</span>
                <span className="text-lns-navy font-[900]">£{item.total.toFixed(2)}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-lns-mid-grey font-medium">Payment Method</span>
                <span className="text-lns-navy font-bold">{PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-lns-mid-grey font-medium">Receipt ID</span>
                <span className="text-lns-navy font-bold uppercase tracking-wider">{receiptId}</span>
             </div>
             <div className="pt-4 mt-2 border-t border-lns-border flex items-center justify-between">
                <div className="flex items-center space-x-2">
                   <ShieldCheck size={18} className="text-lns-navy" />
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-lns-navy leading-none">Blockchain Proof</p>
                      <p className="text-[10px] text-lns-mid-grey font-mono mt-1">{blockchainHash}</p>
                   </div>
                </div>
                <Link href="/verify" className="p-2 bg-white rounded-lg shadow-sm">
                   <ExternalLink size={16} className="text-lns-navy" />
                </Link>
             </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/parent/payments/history">
              <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest">
                 Download Receipt
              </Button>
            </Link>
            <Link href="/parent/dashboard">
              <Button className="w-full h-12 rounded-xl bg-lns-navy text-white text-[10px] font-black uppercase tracking-widest">
                 Return Home
              </Button>
            </Link>
          </div>
          <p className="text-[10px] text-lns-mid-grey mt-6 font-medium">
             A confirmation has been sent to your registered email.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center space-x-2 px-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleBack}
          className="rounded-full hover:bg-white"
        >
          <ChevronLeft size={20} className="text-lns-navy" />
        </Button>
        <span className="text-[10px] font-black uppercase tracking-widest text-lns-mid-grey">
          Step {step === "review" ? "1" : "2"} of 2: {step === "review" ? "Review Details" : "Choose Method"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {step === "review" ? (
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <div className={`h-2 w-full bg-current ${item.color.replace('text-', 'bg-')}`}></div>
              <CardHeader className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-[900] text-lns-navy">{item.title}</CardTitle>
                    <CardDescription className="text-sm font-medium mt-1">For: {item.student} • {item.grade}</CardDescription>
                  </div>
                  <div className={`p-4 rounded-2xl ${item.color.replace('text-', 'bg-')}/10 ${item.color}`}>
                    <item.icon size={32} strokeWidth={2.5} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-lns-light-grey rounded-xl">
                      <MapPin size={18} className="text-lns-navy" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey leading-none mb-1">Location</p>
                      <p className="text-xs font-bold text-lns-navy">{item.details.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-lns-light-grey rounded-xl">
                      <Calendar size={18} className="text-lns-navy" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey leading-none mb-1">Date</p>
                      <p className="text-xs font-bold text-lns-navy">{item.details.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-lns-light-grey rounded-xl">
                      <Clock size={18} className="text-lns-navy" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey leading-none mb-1">Time / Schedule</p>
                      <p className="text-xs font-bold text-lns-navy">{item.details.time}</p>
                    </div>
                  </div>
                   <div className="flex items-start space-x-3">
                    <div className="p-2 bg-lns-light-grey rounded-xl">
                      <Info size={18} className="text-lns-navy" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-lns-mid-grey leading-none mb-1">Deadline</p>
                      <p className="text-xs font-bold text-lns-navy">{item.deadline}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-lns-navy/5 rounded-2xl border border-lns-navy/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-lns-navy mb-3">What to expect / bring:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.details.items.map((it, idx) => (
                      <li key={idx} className="flex items-center text-xs font-medium text-lns-navy/80">
                        <CheckCircle2 size={14} className="text-lns-red mr-2 shrink-0" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center space-x-2 text-xs text-lns-mid-grey italic bg-lns-white border border-lns-border p-3 rounded-xl">
                  <Info size={14} className="text-blue-500 shrink-0" />
                  <span>{item.refundPolicy}</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-[900] text-lns-navy uppercase tracking-tight ml-1">Payment Method</h3>
              <div className="grid grid-cols-1 gap-3">
                 {PAYMENT_METHODS.map((method) => (
                   <div 
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center justify-between p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${
                      selectedMethod === method.id 
                      ? "border-lns-navy bg-lns-navy/5 shadow-md scale-[1.01]" 
                      : "border-lns-border bg-white hover:border-lns-navy/30"
                    }`}
                   >
                     <div className="flex items-center">
                        <div className={`p-3 rounded-xl mr-4 ${selectedMethod === method.id ? "bg-lns-navy text-white" : "bg-lns-light-grey text-lns-navy"}`}>
                           <method.icon size={20} />
                        </div>
                        <div>
                           <div className="flex items-center space-x-2">
                             <span className={`text-sm font-[800] ${selectedMethod === method.id ? "text-lns-navy" : "text-slate-700"}`}>{method.name}</span>
                             {method.tag && (
                               <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-lns-navy/10 text-lns-navy rounded-md">
                                 {method.tag}
                               </span>
                             )}
                           </div>
                           <p className="text-[11px] text-lns-mid-grey font-medium">{method.subtitle}</p>
                        </div>
                     </div>
                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? "border-lns-navy" : "border-lns-border"}`}>
                       {selectedMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-lns-navy"></div>}
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm bg-lns-navy text-white sticky top-24">
            <CardHeader className="pb-2 border-b border-white/10">
              <CardTitle className="text-base text-white uppercase tracking-widest font-[800]">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {item.pricing.map((price, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm font-medium">
                  <span className="text-white/60">{price.label}</span>
                  <span className={`text-white ${price.amount < 0 ? 'text-green-400' : ''}`}>
                    {price.amount < 0 ? `-£${Math.abs(price.amount).toFixed(2)}` : `£${price.amount.toFixed(2)}`}
                  </span>
                </div>
              ))}
              
              <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50 leading-none mb-1">Total to Pay</p>
                  <p className="text-3xl font-[900] text-white tracking-tighter italic">£{item.total.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <CheckCircle2 size={24} className="text-blue-400 ml-auto opacity-50" />
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  onClick={handleNext}
                  disabled={step === "method" && !selectedMethod}
                  className="w-full h-14 rounded-xl bg-white text-lns-navy hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="text-[11px] font-black uppercase tracking-widest">
                    {step === "review" ? "Proceed to Checkout" : "Confirm & Pay Now"}
                  </span>
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-2 mt-4 text-[9px] text-white/40 font-bold uppercase tracking-widest">
                <Lock size={12} />
                <span>Encrypted AES-256 Bit Payment</span>
              </div>
            </CardContent>
            <CardFooter className="bg-white/5 border-t border-white/10 py-4 flex flex-col items-center justify-center text-center">
               <p className="text-[9px] text-white/50 font-medium">Card processing by</p>
               <div className="flex items-center space-x-2 opacity-60 grayscale hover:grayscale-0 transition-all cursor-crosshair">
                  <CreditCard size={16} />
                  <span className="text-xs font-black italic tracking-tighter">Stripe</span>
               </div>
            </CardFooter>
          </Card>

          {step === "method" && (
            <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-200">
               <div className="flex space-x-3">
                  <Zap size={18} className="text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-800 font-medium leading-relaxed">
                    By clicking confirm, you agree to the school's trip conduct and safety policy. Digital signature will be sealed to the blockchain record.
                  </p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
