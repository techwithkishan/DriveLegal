
﻿import React, { useState, useEffect } from 'react';

import { 
  Bot, Scale, Award, TrendingUp, Sparkles, 
  HelpCircle, ChevronRight, BrainCircuit, RefreshCw, AlertCircle,
  ShieldCheck, CheckCircle2, Clock, Calendar, CheckSquare, Target, User
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { AI_DRIVING_INSIGHTS } from '../data/demoData';

export default function InsightsScreen() {
  const { challans } = useAppState();

  const [activeTab, setActiveTab] = useState('insights'); // insights, prevention
  const [tipIndex, setTipIndex] = useState(0);
  const [rotating, setRotating] = useState(false);

  // Streak counter from localStorage or default to 14 days
  const [streakDays, setStreakDays] = useState(() => {

    const saved = localStorage.getItem('DRIVELEGAL_streak');
    if (!saved) {
      localStorage.setItem('DRIVELEGAL_streak', '14');

      return 14;
    }
    return parseInt(saved, 10);
  });

  // Rotate AI tips of the day
  useEffect(() => {
    const timer = setInterval(() => {
      setRotating(true);
      setTimeout(() => {
        setTipIndex(prev => (prev + 1) % AI_DRIVING_INSIGHTS.rotatingTips.length);
        setRotating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const totalViolationsCount = challans.length;
  const pendingViolations = challans.filter(c => c.status === 'Pending');
  const hasZeroPending = pendingViolations.length === 0;

  // Render the existing Insights Tab content
  const renderInsightsTab = () => (
    <div className="space-y-4 animate-fade-in">
      {/* SECTION 1: Pattern Analysis Card */}
      <div className="glass-panel p-5 space-y-3 relative overflow-hidden border-indigo-500/20">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/5 pb-2">
          <BrainCircuit className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Behavioral Pattern Analysis
          </span>
        </div>

        <div className="bg-indigo-500/5 border border-indigo-500/10 p-3.5 rounded-2xl relative">
          <div className="absolute -top-1.5 left-6 w-3 h-3 bg-slate-50 dark:bg-navy-950 border-t border-l border-indigo-500/10 rotate-45" />
          <p className="text-[11px] text-slate-700 dark:text-slate-200 leading-relaxed italic font-semibold">
            "{AI_DRIVING_INSIGHTS.pattern}"
          </p>
        </div>
      </div>

      {/* SECTION 2: Violation Heatmap (Visual progress bars) */}
      <div className="glass-panel p-5 space-y-4">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 border-b border-slate-200 dark:border-white/5 pb-2">
          <Scale className="w-4 h-4 text-electric" />
          Compliance Violation Heatmap
        </span>

        <div className="space-y-3.5" id="violation-heatmap">
          {AI_DRIVING_INSIGHTS.heatmap.map((item) => (
            <div key={item.violation} className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-650 dark:text-slate-300">{item.violation}</span>
                <span className="text-slate-800 dark:text-white">{item.count}x ({item.percentage}%)</span>
              </div>
              
              <div className="w-full h-2 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    item.count >= 2 
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 glow-red' 
                      : 'bg-gradient-to-r from-electric to-indigo-500 glow-electric'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Trend Card */}
      <div className="glass-panel p-4 flex items-center gap-4 hover:bg-slate-100/50 dark:hover:bg-white/10 transition-all">
        <div className="bg-emerald-500/15 p-2.5 rounded-xl text-emerald-500 shrink-0">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500">
            Quarterly Compliance Trend
          </span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block leading-snug">
            {AI_DRIVING_INSIGHTS.trend}
          </span>
        </div>
      </div>

      {/* SECTION 4: Positive Reinforcement badge */}
      {hasZeroPending ? (
        <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-2xl flex items-center gap-3 shadow-xl glow-green">
          <div className="bg-emerald-500/20 p-2 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Award className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block uppercase tracking-wider">Perfect compliance standing</span>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">No violations in last 90 days. Excellent compliance.</span>
          </div>
        </div>
      ) : (
        <div className="bg-amber-500/10 border border-amber-500/25 p-4 rounded-2xl flex items-center gap-3 shadow-xl glow-amber">
          <div className="bg-amber-500/20 p-2 rounded-xl text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 block uppercase tracking-wider font-heading">Encouragement Warning</span>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">2 pending violations on your record. Clear them to establish 90-day compliance!</span>
          </div>
        </div>
      )}

      {/* SECTION 5: AI Tip of the Day */}
      <div className="glass-panel p-5 space-y-3 relative overflow-hidden bg-gradient-to-tr from-slate-100 to-indigo-50/30 dark:from-navy-900 dark:to-indigo-950/20">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            AI Tip of the Day
          </span>
          <span className="text-[8px] bg-indigo-500/20 px-2 py-0.5 rounded text-indigo-600 dark:text-indigo-300 font-extrabold uppercase">
            RTO ADVOCATE
          </span>
        </div>

        <div className={`transition-all duration-300 py-1.5 ${rotating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-normal font-semibold">
            {AI_DRIVING_INSIGHTS.rotatingTips[tipIndex]}
          </p>
        </div>
      </div>
    </div>
  );

  // Render the new Prevention Tab content
  const renderPreventionTab = () => (
    <div className="space-y-4 animate-slide-in">
      
      {/* Top Pattern Alert Card */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4.5 space-y-2.5 shadow-lg glow-amber">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-500 animate-pulse" />
          <h4 className="text-xs font-heading font-extrabold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
            Critical Pattern Alert
          </h4>
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          We detected <strong className="text-slate-900 dark:text-white">Over-Speeding (x2)</strong> near <strong className="text-slate-900 dark:text-white">Silk Board Junction</strong> in your last 14 days of driving telemetry.
        </p>
        <div className="bg-slate-950/20 border border-amber-500/15 py-2 px-3 rounded-xl flex items-center justify-between text-[10px] font-bold text-amber-600 dark:text-amber-400 font-mono">
          <span>Active camera spot fines:</span>
          <span>₹1,000 per violation</span>
        </div>
      </div>

      {/* Prevention suggestions (4 cards) */}
      <div className="space-y-2.5">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-1">
          Safety Recommendations
        </span>

        {/* Speed Advice */}
        <div className="glass-panel p-3.5 flex gap-3 hover:bg-slate-100/50 dark:hover:bg-white/10 transition-all border-l-4 border-l-cyan-500">
          <div className="bg-cyan-500/10 p-2 rounded-xl text-cyan-500 shrink-0">
            <Target className="w-4.5 h-4.5" />
          </div>
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-slate-800 dark:text-white">Keep Speed Under 60 km/h</h5>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Main junctions in Koramangala and Silk Board have active automated speed traps. Speed reduction prevents high-impact penalties.
            </p>
          </div>
        </div>

        {/* Helmet Advice */}
        <div className="glass-panel p-3.5 flex gap-3 hover:bg-slate-100/50 dark:hover:bg-white/10 transition-all border-l-4 border-l-purple-500">
          <div className="bg-purple-500/10 p-2 rounded-xl text-purple-500 shrink-0">
            <CheckSquare className="w-4.5 h-4.5" />
          </div>
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-slate-800 dark:text-white">Pillion Helmet Requirement</h5>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Bengaluru Traffic Police strictly enforces helmets for pillion riders. Avoid spot checks by keeping a spare ISI-certified helmet.
            </p>
          </div>
        </div>

        {/* Document Expiry Advice */}
        <div className="glass-panel p-3.5 flex gap-3 hover:bg-slate-100/50 dark:hover:bg-white/10 transition-all border-l-4 border-l-amber-500">
          <div className="bg-amber-500/10 p-2 rounded-xl text-amber-500 shrink-0">
            <Clock className="w-4.5 h-4.5 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-slate-800 dark:text-white">Document Expiry Approaching</h5>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Your vehicle insurance policy is expiring in 12 days. Auto-renew or upload your new policy in RTO settings to avoid a ₹2,000 fine.
            </p>
          </div>
        </div>

        {/* What You're Doing Right */}
        <div className="glass-panel p-3.5 flex gap-3 hover:bg-slate-100/50 dark:hover:bg-white/10 transition-all border-l-4 border-l-emerald-500">
          <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-500 shrink-0">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-slate-800 dark:text-white">Excellent PUC Maintenance</h5>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Your PUC is fully updated and valid for another 4 months. Continuous maintenance ensures zero exhaust emissions penalties!
            </p>
          </div>
        </div>
      </div>

      {/* 30-Day Goal Progress Card & Streak */}
      <div className="glass-panel p-4.5 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-electric-glow" />
            <h5 className="text-xs font-heading font-extrabold uppercase text-slate-850 dark:text-slate-350 tracking-wider">
              30-Day Violation-Free Streak
            </h5>
          </div>
          <span className="text-[11px] font-bold text-indigo-500 dark:text-indigo-400 font-mono">
            {streakDays}/30 Days
          </span>
        </div>

        {/* Streak progress track bar */}
        <div className="w-full h-2.5 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-electric to-indigo-500 transition-all duration-1000 ease-out glow-electric rounded-full"
            style={{ width: `${(streakDays / 30) * 100}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] text-slate-550 dark:text-slate-400 border-t border-slate-200 dark:border-white/5 pt-2.5">
          <span className="font-semibold flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-indigo-500" />
            <span>Target: Unlock "Certified Compliant Driver"</span>
          </span>
          <button
            onClick={() => {
              const next = streakDays < 30 ? streakDays + 1 : 14;
              setStreakDays(next);

              localStorage.setItem('DRIVELEGAL_streak', next.toString());

            }}
            className="text-electric hover:text-electric-glow transition-all uppercase tracking-wider text-[8px] font-extrabold border border-electric/25 px-2 py-0.5 rounded"
          >
            Advance Day
          </button>
        </div>
      </div>

    </div>
  );

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 space-y-4 max-w-md mx-auto relative overflow-hidden">
      
      {/* Bot Chat Header */}
      <div className="flex items-center justify-between py-1">
        <div className="space-y-0.5">
          <h2 className="text-xl font-heading font-extrabold text-slate-800 dark:text-white tracking-wide">
            Driving Intelligence
          </h2>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">

            Powered by DRIVELEGAL AI

          </p>
        </div>
        <div className="bg-gradient-to-tr from-indigo-500 to-electric p-2 rounded-xl text-white shadow-lg glow-electric">
          <Bot className="w-5 h-5 animate-pulse" />
        </div>
      </div>

      {/* Tabs Layout Selector */}
      <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/10">
        <button
          onClick={() => setActiveTab('insights')}
          className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all duration-300 uppercase tracking-wider ${
            activeTab === 'insights' 
              ? 'bg-white dark:bg-navy-900 border border-slate-200 dark:border-indigo-500/20 text-slate-800 dark:text-white shadow-md'
              : 'text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          AI Insights
        </button>
        <button
          onClick={() => setActiveTab('prevention')}
          className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all duration-300 uppercase tracking-wider ${
            activeTab === 'prevention' 
              ? 'bg-white dark:bg-navy-900 border border-slate-200 dark:border-indigo-500/20 text-slate-800 dark:text-white shadow-md'
              : 'text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          Prevention
        </button>
      </div>

      {/* Render active content */}
      {activeTab === 'insights' ? renderInsightsTab() : renderPreventionTab()}

    </div>
  );
}
