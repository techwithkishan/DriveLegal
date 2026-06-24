
﻿import React, { useState } from 'react';

import {
  FileText, Download, Share2, CheckCircle, AlertCircle,
  ShieldCheck, Car, User, BarChart2, Award, X,
  TrendingUp, AlertTriangle, Clock, RefreshCw
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

// ─── Toast Component ─────────────────────────────────────────────────────────
function Toast({ msg, onClose }) {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-fade-in pointer-events-none px-4">
      <div className="bg-slate-800 dark:bg-slate-700 border border-white/10 shadow-2xl rounded-2xl px-4 py-3 flex items-center gap-2.5 pointer-events-auto">
        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span className="text-xs font-bold text-white">{msg}</span>
        <button onClick={onClose} className="ml-1 text-slate-400 hover:text-white transition-all">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Mock Report Data ─────────────────────────────────────────────────────────
const REPORT = {
  driver: 'Arjun Mehta',
  licenseNo: 'KA01-2018-0083472',
  licenseType: 'LMV / MCWG',
  sarathiId: 'KA01-SAR-048',
  vehicle: 'KA01AB1234',
  vehicleType: 'Car (LMV)',
  rto: 'RT-01 Bengaluru East',
  complianceScore: 67,
  totalChallans: 5,
  paidChallans: 3,
  pendingChallans: 2,
  totalFines: 5500,
  paidAmount: 3000,
  pendingAmount: 2500,
  period: 'Jan 2024 – May 2025',
  topViolations: [
    { name: 'Over-speeding', count: 2, fine: 4000 },
    { name: 'No Helmet', count: 2, fine: 2000 },
    { name: 'Wrong Parking', count: 1, fine: 500 },
  ],
  safetyTrend: 'Improving',
  lastUpdated: '28 May 2025',
};

// ─── Circular Score Component ─────────────────────────────────────────────────
function ScoreCircle({ score }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  const label = score >= 80 ? 'Excellent' : score >= 50 ? 'Fair' : 'Poor';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          <circle
            cx="50" cy="50" r={radius} fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-slate-800 dark:text-white">{score}</span>
          <span className="text-[9px] text-slate-500 uppercase font-bold">/ 100</span>
        </div>
      </div>
      <span
        className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full"
        style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}
      >
        {label}
      </span>
    </div>
  );
}

export default function ComplianceReportScreen() {
  const { setActiveScreen } = useAppState();
  const [toast, setToast] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast('📄 Compliance report downloaded! Check your Downloads folder.');
    }, 2200);
  };

  const handleShare = () => {
    showToast('🔗 Shareable compliance link copied to clipboard!');
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto w-full space-y-5">
      {/* Screen Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-heading font-extrabold text-slate-800 dark:text-white tracking-wide">
          Compliance Report
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Your complete driving compliance record & export
        </p>
      </div>

      {/* 3D Paper Document Preview — tilted effect */}
      <div className="relative">
        {/* Shadow layer (below) */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 dark:from-black/50 dark:to-black/80"
          style={{ transform: 'rotate(-1.5deg) translateY(4px)', filter: 'blur(4px)', opacity: 0.5 }}
        />
        {/* Main Document Card */}
        <div
          className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden"
          style={{ transform: 'rotate(-0.8deg)' }}
        >
          {/* Document Header Band */}
          <div className="bg-gradient-to-r from-electric to-blue-600 p-4 pb-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Official Report</p>
                <h3 className="text-sm font-extrabold text-white tracking-wide mt-0.5">Driving Compliance Certificate</h3>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl p-2.5">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-[9px] text-white/60 mt-2">Period: {REPORT.period} • Last updated: {REPORT.lastUpdated}</p>
          </div>

          {/* Document Body */}
          <div className="p-4 space-y-4">
            {/* Driver + Vehicle Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3 text-electric" />
                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Driver</span>
                </div>
                <div className="space-y-1">
                  {[
                    ['Name', REPORT.driver],
                    ['License', REPORT.licenseNo],
                    ['Category', REPORT.licenseType],
                    ['Sarathi ID', REPORT.sarathiId],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <span className="text-[8px] text-slate-400 dark:text-slate-500 block">{label}</span>
                      <span className="text-[10px] font-bold text-slate-800 dark:text-white block leading-tight">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Car className="w-3 h-3 text-electric" />
                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Vehicle</span>
                </div>
                <div className="space-y-1">
                  {[
                    ['Reg. No.', REPORT.vehicle],
                    ['Type', REPORT.vehicleType],
                    ['RTO', REPORT.rto],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <span className="text-[8px] text-slate-400 dark:text-slate-500 block">{label}</span>
                      <span className="text-[10px] font-bold text-slate-800 dark:text-white block leading-tight">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-slate-200 dark:border-white/10" />

            {/* Score + Stats Row */}
            <div className="flex items-center justify-between gap-4">
              <ScoreCircle score={REPORT.complianceScore} />
              <div className="flex-1 space-y-2">
                {[
                  { label: 'Total Challans', val: REPORT.totalChallans, color: 'text-slate-800 dark:text-white' },
                  { label: 'Paid', val: REPORT.paidChallans, color: 'text-emerald-600 dark:text-emerald-400' },
                  { label: 'Pending', val: REPORT.pendingChallans, color: 'text-red-600 dark:text-red-400' },
                  { label: 'Total Fines', val: `₹${REPORT.totalFines.toLocaleString('en-IN')}`, color: 'text-slate-800 dark:text-white' },
                  { label: 'Pending Amt', val: `₹${REPORT.pendingAmount.toLocaleString('en-IN')}`, color: 'text-red-600 dark:text-red-400' },
                ].map(stat => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold">{stat.label}</span>
                    <span className={`text-[11px] font-extrabold tabular-nums ${stat.color}`}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-dashed border-slate-200 dark:border-white/10" />

            {/* Top Violations */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <BarChart2 className="w-3 h-3 text-electric" />
                <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Top Violations</span>
              </div>
              {REPORT.topViolations.map((v, i) => (
                <div key={v.name} className="flex items-center gap-2">
                  <span className="text-[9px] font-extrabold text-slate-400 w-4">{i + 1}.</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold text-slate-800 dark:text-white">{v.name}</span>
                      <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">×{v.count} • ₹{v.fine.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-1">
                      <div
                        className="h-full rounded-full bg-electric"
                        style={{ width: `${(v.count / REPORT.totalChallans) * 100}%`, opacity: 1 - i * 0.25 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-slate-200 dark:border-white/10" />

            {/* Safety Trend Pill */}
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
                Safety trend: <span className="text-emerald-600 dark:text-emerald-400">{REPORT.safetyTrend}</span>
              </span>
            </div>

            {/* Watermark */}
            <p className="text-center text-[8px] text-slate-300 dark:text-white/15 font-bold uppercase tracking-[0.2em]">

              Generated by DRIVOS • Unofficial — For Reference Only

            </p>
          </div>
        </div>
      </div>

      {/* Advisory Note */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-3.5 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
          This report is generated from locally stored compliance data and is <strong>not an official government document</strong>. For official challan records, visit <span className="text-electric font-bold">Parivahan.gov.in</span>.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="w-full bg-electric text-white py-4 rounded-2xl text-sm font-bold uppercase tracking-widest shadow-lg shadow-electric/30 hover:shadow-electric/50 hover:bg-electric-glow transition-all flex items-center justify-center gap-2.5 disabled:opacity-60"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Generating Report...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download PDF Report
            </>
          )}
        </button>
        <button
          onClick={handleShare}
          className="w-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2.5"
        >
          <Share2 className="w-4 h-4" />
          Share Report Link
        </button>
      </div>

      {/* Stats Footer Grid */}
      <div className="glass-panel p-4 grid grid-cols-2 gap-3">
        {[
          { icon: <Award className="w-4 h-4 text-amber-400" />, label: 'Compliance Rank', val: '#3,812 / Karnataka' },
          { icon: <Clock className="w-4 h-4 text-blue-400" />, label: 'Avg. Payment Time', val: '3.2 days' },
          { icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, label: 'Clean Months', val: '4 of 17' },
          { icon: <AlertCircle className="w-4 h-4 text-red-400" />, label: 'High Severity', val: '2 violations' },
        ].map(item => (
          <div key={item.label} className="bg-slate-100 dark:bg-white/5 rounded-xl p-3 space-y-2">
            {item.icon}
            <div>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block">{item.label}</span>
              <span className="text-[11px] font-extrabold text-slate-800 dark:text-white">{item.val}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Toast */}
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
