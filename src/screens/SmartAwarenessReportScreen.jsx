import React, { useState } from 'react';
import { 
  ArrowLeft, FileText, Download, Share2, ClipboardList, Info, Bot, Check, InfoIcon
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function SmartAwarenessReportScreen() {
  const { setActiveScreen } = useAppState();
  const [activeReportTab, setActiveReportTab] = useState('monthly'); // monthly, district, violation, effectiveness
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText("https://DriVos.gov.in/reports/may-2025-compliance");
    showToast("Report Link copied to clipboard!");
  };

  const handleDownloadPDF = () => {
    showToast("Downloading PDF Report... Done! ✅");
  };

  const handleDownloadCSV = () => {
    showToast("Downloading CSV Dataset... Done! ✅");
  };

  const reportTabs = [
    { id: 'monthly', label: 'Monthly Summary' },
    { id: 'district', label: 'District Report' },
    { id: 'violation', label: 'Violation Trend' },
    { id: 'effectiveness', label: 'Awareness Efficacy' }
  ];

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto relative overflow-hidden select-none bg-slate-900/10 dark:bg-navy-950/20 text-slate-800 dark:text-slate-100 animate-fade-in">
      
      {/* Header */}
      <div className="py-2 border-b border-slate-200 dark:border-white/5 mb-4">
        <h2 className="text-xl font-heading font-black text-slate-800 dark:text-white tracking-wide">
          Awareness Report Generator
        </h2>
        <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-widest block">
          Generate regional compliance and violation reports
        </span>
      </div>

      {/* Pill tabs selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none shrink-0">
        {reportTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveReportTab(tab.id)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase transition-all duration-300 shrink-0 ${
              activeReportTab === tab.id 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-650 dark:text-slate-350'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Report Preview card container */}
      <div className="flex-1 flex flex-col justify-start py-2">
        
        {/* Beautiful Printed Paper Sheet with bottom-right page curl */}
        <div className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-5 rounded-2xl border border-slate-250 dark:border-slate-800 shadow-2xl relative overflow-hidden min-h-[360px] flex flex-col justify-between font-mono text-[9px] uppercase tracking-wide leading-relaxed">
          
          {/* Subtle paper background lines layout */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100%_20px] pointer-events-none" />
          
          {/* Custom Page Curl Visual on bottom right */}
          <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none bg-gradient-to-tl from-slate-350/90 to-transparent dark:from-slate-800/80 border-t border-l border-slate-300 dark:border-slate-700 rounded-tl-lg shadow-[-2px_-2px_4px_rgba(0,0,0,0.1)]" />

          {/* Report Internal Data */}
          <div className="space-y-3.5 z-10">
            {/* Title segment */}
            <div className="text-center border-b-2 border-dashed border-slate-300 dark:border-slate-700 pb-2.5">
              <strong className="text-xs block tracking-widest font-black text-slate-800 dark:text-white">
                KARNATAKA TRAFFIC COMPLIANCE
              </strong>
              <span className="block text-[8px] text-slate-500 mt-0.5 font-bold">
                MONTHLY SUMMARY REPORT — MAY 2025
              </span>
            </div>

            {/* Financial Overview grid */}
            <div className="space-y-1">
              <div className="flex justify-between font-extrabold text-slate-700 dark:text-slate-300">
                <span>Total Challans Issued:</span>
                <span className="font-mono text-slate-900 dark:text-white">48,291</span>
              </div>
              <div className="flex justify-between font-extrabold text-slate-750 dark:text-slate-300">
                <span>Total Fines Collected:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-450">₹ 4.2 Cr</span>
              </div>
              <div className="flex justify-between font-extrabold text-slate-750 dark:text-slate-300">
                <span>Pending Recovery:</span>
                <span className="font-mono text-red-500">₹ 1.1 Cr</span>
              </div>
            </div>

            {/* Top 3 Violations */}
            <div className="border-t border-b border-dashed border-slate-200 dark:border-slate-800 py-2 space-y-1">
              <strong className="block text-slate-500 text-[8px] mb-1">TOP 3 VIOLATIONS:</strong>
              <div className="flex justify-between font-semibold">
                <span>1. Over-Speeding</span>
                <span className="font-mono">14,200 (29%)</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>2. No Helmet</span>
                <span className="font-mono">11,800 (24%)</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>3. Wrong Parking</span>
                <span className="font-mono">8,400 (17%)</span>
              </div>
            </div>

            {/* Districts split */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <strong className="block text-emerald-600 text-[8px]">SAFEST DISTRICTS:</strong>
                <div className="flex flex-col gap-0.5 text-[8px] font-semibold text-slate-650 dark:text-slate-400">
                  <span>1. Mysuru — 1.2K</span>
                  <span>2. Mangaluru — 1.8K</span>
                  <span>3. Hubballi — 2.1K</span>
                </div>
              </div>
              <div className="space-y-1">
                <strong className="block text-red-500 text-[8px]">HIGH RISK DISTRICTS:</strong>
                <div className="flex flex-col gap-0.5 text-[8px] font-semibold text-slate-650 dark:text-slate-400">
                  <span>1. Bengaluru Urban — 22.4K</span>
                  <span>2. Bengaluru Rural — 6.8K</span>
                  <span>3. Tumkuru — 4.2K</span>
                </div>
              </div>
            </div>

            {/* AI Recommendation panel */}
            <div className="border-t border-dashed border-slate-200 dark:border-slate-800 pt-2.5">
              <strong className="block text-slate-500 text-[8px] mb-1">AI RECOMMENDATION:</strong>
              <p className="text-[8px] font-semibold font-sans italic text-slate-600 dark:text-slate-400 leading-normal lowercase first-letter:uppercase">
                "Increase helmet enforcement in Bengaluru Urban. Deploy mobile patrol units on Hosur Road and Silk Board during peak hours."
              </p>
            </div>

          </div>

          {/* RTO stamp stamp mark layout */}
          <div className="text-[7px] text-right font-extrabold text-slate-400/50 mt-4 leading-none select-none tracking-widest">
            DriVos SECURE RTO SYSTEM
          </div>

        </div>

      </div>

      {/* Export Action Buttons Block */}
      <div className="space-y-2.5 mt-2 shrink-0">
        
        <button
          onClick={handleDownloadPDF}
          className="w-full bg-slate-900 border border-slate-800 hover:border-amber-500/30 text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md"
        >
          <FileText className="w-4 h-4 text-amber-500" />
          <span>Download PDF Report</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDownloadCSV}
            className="bg-slate-900 border border-slate-800 hover:border-amber-500/25 text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5 text-amber-500" />
            <span>Export CSV</span>
          </button>
          
          <button
            onClick={handleShare}
            className="bg-slate-900 border border-slate-800 hover:border-amber-500/25 text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Share Link</span>
          </button>
        </div>

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 border border-slate-700 text-white font-bold text-xs py-3 px-6 rounded-2xl shadow-xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-amber-550 animate-bounce" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
