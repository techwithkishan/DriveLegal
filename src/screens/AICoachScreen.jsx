
﻿import React, { useState } from 'react';

import { Info, Bot, TrendingUp, CheckSquare, Square } from 'lucide-react';

const VisionBanner = () => (
  <div className="bg-blue-500/10 border border-blue-500/25 rounded-2xl p-3.5 flex items-start gap-2.5">
    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
    <div>
      <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">Vision Layer</p>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">

        These screens showcase DRIVELEGAL's future ecosystem architecture. Core features (Phases 1–7) are fully functional. Phase 8 demonstrates scalability and long-term product vision.

      </p>
    </div>
  </div>
);

const behaviorCards = [
  {
    emoji: '🏎️',
    title: 'Your Speed Habit',
    color: 'from-red-500/10 to-red-600/5 border-red-500/20',
    accent: 'text-red-400',
    body: '2 over-speeding challans on highways, both between 8–10 PM on weekdays.',
    insight: '"Night highway driving appears to be your highest-risk window. Consider setting a personal speed reminder when travelling after 8 PM."',
    suggestion: 'Set speed alert',
    risk: '3rd offense = licence suspension 3 months',
  },
  {
    emoji: '📄',
    title: 'Document Readiness',
    color: 'from-amber-500/10 to-amber-600/5 border-amber-500/20',
    accent: 'text-amber-400',
    body: 'Your insurance expires in 12 days. PUC valid for 45 more days.',
    insight: '"Historically, insurance-related fines are the most financially damaging — ₹2,000 minimum plus accident claim void. This is your most urgent action item."',
    suggestion: 'Set Renewal Reminder',
    risk: null,
  },
  {
    emoji: '✅',
    title: 'Your Strengths',
    color: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20',
    accent: 'text-emerald-400',
    body: 'Signal compliance: 6 months clean. Mobile usage: No violations. Seatbelt: No violations.',
    insight: '"You show strong urban compliance habits. Your main risk area is highway speed discipline. Focus there and your score will hit 85+ within 60 days."',
    suggestion: null,
    risk: null,
  },
];

const roadmap = [
  {
    period: '30 DAYS',
    sub: 'Quick Wins',
    color: 'text-electric border-electric/25 bg-electric/5',
    from: 67, to: 85,
    tasks: [
      { label: 'Pay 2 pending challans', pts: '+8 pts' },
      { label: 'Renew insurance before expiry', pts: '+5 pts' },
      { label: '30 violation-free days', pts: '+15 pts' },
    ],
  },
  {
    period: '60 DAYS',
    sub: 'Consolidation',
    color: 'text-purple-400 border-purple-500/25 bg-purple-500/5',
    from: 85, to: 90,
    tasks: [
      { label: 'Maintain clean driving record', pts: null },
      { label: 'Complete 2 awareness modules', pts: null },
      { label: 'Verify PUC renewal', pts: null },
    ],
  },
  {
    period: '90 DAYS',
    sub: 'Safe Driver Status',
    color: 'text-amber-400 border-amber-500/25 bg-amber-500/5',
    from: 90, to: 95,
    tasks: [
      { label: 'Achieve 90-day clean streak', pts: null },
      { label: 'All documents valid', pts: null },
      { label: 'Score 90+ = Safe Driver badge', pts: null },
    ],
  },
];

export default function AICoachScreen() {
  const [checkedTasks, setCheckedTasks] = useState({});

  const toggleTask = (key) => setCheckedTasks(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex-1 flex flex-col p-4 pb-28 space-y-5 max-w-2xl mx-auto w-full animate-fade-in">
      <VisionBanner />

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-electric" />
          <h1 className="font-heading font-black text-xl text-slate-900 dark:text-white uppercase tracking-wider">Your AI Driving Coach</h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Personalized intelligence based on your driving history</p>
      </div>

      {/* Weekly Report Card */}
      <div className="glass-panel p-5 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 bg-electric/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/5">
          <TrendingUp className="w-4 h-4 text-electric" />
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">Weekly Compliance Report</h2>
        </div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Week of 20–26 May 2025</p>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Days driven', value: '5' },
            { label: 'Violation-free days', value: '5 ✅' },
            { label: 'Active challans', value: '2 ⚠️' },
            { label: 'Score change', value: '+3 pts 🟢' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-2.5 space-y-0.5">
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">{item.label}</p>
              <p className="text-xs font-extrabold text-slate-800 dark:text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-electric/5 border border-electric/20 rounded-xl p-3.5 space-y-1">
          <p className="text-[9px] font-extrabold text-electric uppercase tracking-widest">AI Assessment</p>
          <p className="text-[10px] text-slate-600 dark:text-slate-300 italic font-medium leading-relaxed">
            "Good week, Arjun. No new violations. Your compliance score improved by 3 points. Two pending challans remain unpaid — resolving these will add another 8 points to your score."
          </p>
        </div>
      </div>

      {/* Behavior Pattern Cards */}
      <div className="space-y-3">
        <h2 className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">AI-Generated Behavior Patterns</h2>
        {behaviorCards.map((card, i) => (
          <div key={i} className={`glass-panel p-4 space-y-3 bg-gradient-to-br ${card.color} border`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{card.emoji}</span>
              <h3 className={`text-xs font-extrabold uppercase tracking-wider ${card.accent}`}>{card.title}</h3>
            </div>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{card.body}</p>
            <div className="bg-white/40 dark:bg-white/5 rounded-xl p-2.5 border border-white/20 dark:border-white/5">
              <p className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">AI Insight</p>
              <p className="text-[10px] text-slate-700 dark:text-slate-300 italic font-medium leading-relaxed">{card.insight}</p>
            </div>
            {card.suggestion && (
              <button className={`text-[9px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg border ${card.accent} border-current/30 bg-current/5 hover:bg-current/10 transition-all`}>
                {card.suggestion} →
              </button>
            )}
            {card.risk && (
              <p className="text-[9px] text-red-400 font-semibold">⚠️ Risk if ignored: {card.risk}</p>
            )}
          </div>
        ))}
      </div>

      {/* 30-60-90 Day Roadmap */}
      <div className="glass-panel p-5 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/5">
          <span className="text-sm">🗓️</span>
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">Your Compliance Roadmap</h2>
        </div>

        <div className="space-y-3">
          {roadmap.map((phase, pi) => (
            <div key={pi} className={`border rounded-2xl p-4 space-y-3 ${phase.color}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-extrabold uppercase tracking-wider ${phase.color.split(' ')[0]}`}>{phase.period}</p>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">{phase.sub}</p>
                </div>
                <span className="text-[9px] font-extrabold text-slate-500 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-full">
                  Score: {phase.from} → {phase.to}{phase.to === 95 ? '+' : ''}
                </span>
              </div>
              <div className="space-y-1.5">
                {phase.tasks.map((task, ti) => {
                  const key = `${pi}-${ti}`;
                  const done = !!checkedTasks[key];
                  return (
                    <button
                      key={ti}
                      onClick={() => toggleTask(key)}
                      className="w-full flex items-center gap-2 text-left transition-all group"
                    >
                      {done
                        ? <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        : <Square className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                      }
                      <span className={`text-[10px] font-medium flex-1 ${done ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {task.label}
                      </span>
                      {task.pts && (
                        <span className="text-[8px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full shrink-0">
                          {task.pts}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-2.5 text-center">
          <p className="text-[10px] font-extrabold text-amber-400">🏆 Goal: Safe Driver Badge by Aug 2025</p>
        </div>
      </div>
    </div>
  );
}
