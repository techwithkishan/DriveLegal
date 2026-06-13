
﻿import React, { useState, useEffect } from 'react';

import { Info, Share2, Trophy } from 'lucide-react';

const VisionBanner = ({ partial }) => (
  <div className="bg-blue-500/10 border border-blue-500/25 rounded-2xl p-3.5 flex items-start gap-2.5">
    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
    <div>
      <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">Vision Layer</p>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
        {partial
          ? 'The Leaderboard and Rewards sections below are future vision items. Badge tracking and streak counter are live.'

          : 'These screens showcase DRIVELEGAL\'s future ecosystem architecture. Core features (Phases 1–7) are fully functional. Phase 8 demonstrates scalability and long-term product vision.'}

      </p>
    </div>
  </div>
);

const BADGES = [
  { id: 'bronze', emoji: '🥉', title: 'Bronze Safe Driver', desc: '30 violation-free days', unlocked: true, unlockedDate: '15 May 2025', progress: null, max: null, color: 'from-amber-700/20 to-amber-800/10 border-amber-700/30', accent: 'text-amber-600 dark:text-amber-400' },
  { id: 'silver', emoji: '🥈', title: 'Silver Safe Driver', desc: '60 violation-free days', unlocked: false, progress: 27, max: 60, color: 'from-slate-400/10 to-slate-500/5 border-slate-400/20', accent: 'text-slate-400' },
  { id: 'gold', emoji: '🥇', title: 'Gold Safe Driver', desc: '90 violation-free days', unlocked: false, progress: 27, max: 90, color: 'from-yellow-500/10 to-yellow-600/5 border-yellow-500/20', accent: 'text-yellow-500' },
  { id: 'docmaster', emoji: '📄', title: 'Document Master', desc: 'All documents valid 90 days', unlocked: false, progress: 18, max: 90, color: 'from-blue-500/10 to-blue-600/5 border-blue-500/20', accent: 'text-blue-400' },
  { id: 'challan', emoji: '💰', title: 'Challan Clear', desc: 'Zero pending challans', unlocked: false, progress: null, max: null, statusNote: '2 pending (pay to unlock)', color: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20', accent: 'text-emerald-400' },
  { id: 'learner', emoji: '🎓', title: 'Law Learner', desc: 'Completed 3 awareness modules', unlocked: true, unlockedDate: '10 April 2025', progress: null, max: null, color: 'from-purple-500/10 to-purple-600/5 border-purple-500/20', accent: 'text-purple-400' },
  { id: 'traveller', emoji: '🌍', title: 'World Traveller', desc: 'Used Travel Mode in 3 countries', unlocked: false, progress: 1, max: 3, color: 'from-teal-500/10 to-teal-600/5 border-teal-500/20', accent: 'text-teal-400' },
  { id: 'perfect', emoji: '⭐', title: 'Perfect Month', desc: 'Zero violations in a calendar month', unlocked: false, statusNote: 'Best attempt: 27 days', progress: null, max: null, color: 'from-indigo-500/10 to-indigo-600/5 border-indigo-500/20', accent: 'text-indigo-400' },
];

function BadgeCard({ badge, justUnlocked }) {
  return (
    <div className={`relative flex flex-col items-center gap-2 p-3.5 rounded-2xl border bg-gradient-to-br ${badge.color} transition-all duration-300 ${badge.unlocked ? 'shadow-md' : 'opacity-80'}`}>
      {justUnlocked && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full animate-[confettiBurst_0.8s_ease-out_forwards]"
              style={{
                background: ['#3b82f6','#f59e0b','#10b981','#8b5cf6','#ef4444','#06b6d4','#f97316','#84cc16'][i],
                top: '50%', left: '50%',
                transform: `rotate(${i * 45}deg) translateY(-20px)`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      )}
      <span className={`text-2xl leading-none ${!badge.unlocked ? 'grayscale opacity-50' : ''}`}>{badge.emoji}</span>
      <div className="text-center space-y-0.5">
        <p className={`text-[9px] font-extrabold uppercase tracking-wider ${badge.unlocked ? badge.accent : 'text-slate-500'}`}>{badge.title}</p>
        <p className="text-[8px] text-slate-500 font-medium leading-tight">{badge.desc}</p>
      </div>
      {badge.unlocked ? (
        <span className="text-[8px] text-emerald-400 font-extrabold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">✅ UNLOCKED</span>
      ) : (
        <span className="text-[8px] text-slate-500 font-extrabold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-full">🔒 LOCKED</span>
      )}
      {badge.unlocked && badge.unlockedDate && (
        <p className="text-[7px] text-slate-400 font-semibold">{badge.unlockedDate}</p>
      )}
      {!badge.unlocked && badge.progress !== null && badge.max && (
        <div className="w-full space-y-0.5">
          <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-1">
            <div
              className={`h-1 rounded-full transition-all duration-700 ${badge.accent.replace('text-', 'bg-')}`}
              style={{ width: `${(badge.progress / badge.max) * 100}%` }}
            />
          </div>
          <p className="text-[7px] text-slate-400 text-center font-semibold">{badge.progress}/{badge.max}</p>
        </div>
      )}
      {!badge.unlocked && badge.statusNote && (
        <p className="text-[7px] text-slate-400 font-semibold text-center leading-tight">{badge.statusNote}</p>
      )}
    </div>
  );
}

const LS_KEY = 'dl_streak';

export default function AchievementsScreen() {
  const [streak] = useState(() => {
    try { return parseInt(localStorage.getItem(LS_KEY) || '27', 10); } catch { return 27; }
  });

  return (
    <div className="flex-1 flex flex-col p-4 pb-28 space-y-5 max-w-2xl mx-auto w-full animate-fade-in">
      <style>{`
        @keyframes confettiBurst {
          0% { transform: rotate(var(--r, 0deg)) translateY(0px); opacity: 1; }
          100% { transform: rotate(var(--r, 0deg)) translateY(-30px); opacity: 0; }
        }
        @keyframes flamePulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px #f97316); }
          50% { transform: scale(1.15); filter: drop-shadow(0 0 10px #f97316); }
        }
      `}</style>

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-electric" />
          <h1 className="font-heading font-black text-xl text-slate-900 dark:text-white uppercase tracking-wider">Compliance Achievements</h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Safe driving earns real rewards</p>
      </div>

      {/* Streak Card */}
      <div className="glass-panel p-5 space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-3">
          <span className="text-4xl" style={{ animation: 'flamePulse 1.8s ease-in-out infinite' }}>🔥</span>
          <div>
            <p className="font-heading font-black text-3xl text-slate-900 dark:text-white">{streak} <span className="text-base font-bold text-slate-400">days</span></p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Violation-free streak</p>
            <p className="text-[9px] text-slate-400 font-semibold">Your best: <span className="text-amber-400 font-bold">45 days</span></p>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-2.5 space-y-1.5">
          <p className="text-[9px] font-extrabold text-amber-400 uppercase tracking-widest">Keep going → 30 days = Bronze Badge</p>
          <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-1000"
              style={{ width: `${(streak / 30) * 100}%` }}
            />
          </div>
          <p className="text-[9px] text-slate-400 font-semibold">{30 - streak} more days to go</p>
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-electric/25 text-electric bg-electric/5 hover:bg-electric/10 text-[10px] font-extrabold uppercase tracking-wider transition-all active:scale-95">
          <Share2 className="w-3.5 h-3.5" />
          Share Streak
        </button>
      </div>

      {/* Badge Grid */}
      <div className="space-y-3">
        <h2 className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Achievement Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {BADGES.map(badge => (
            <BadgeCard key={badge.id} badge={badge} justUnlocked={false} />
          ))}
        </div>
      </div>

      {/* Leaderboard Vision */}
      <VisionBanner partial />
      <div className="glass-panel p-4 space-y-2 border border-dashed border-slate-300 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-sm">🏆</span>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">Community Leaderboard</h3>
          <span className="ml-auto text-[8px] text-slate-400 font-bold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-full">Phase 9</span>
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          Future: Compare your compliance score with anonymous community averages in your city/state.
        </p>
        <p className="text-[10px] text-slate-500 italic font-medium">"Top 10% of Bengaluru drivers maintain scores above 88."</p>
        <p className="text-[9px] text-electric font-bold">Your position: Top 34% currently. Keep improving to reach Top 10%.</p>
      </div>

      {/* Rewards Vision */}
      <div className="glass-panel p-4 space-y-3 border border-dashed border-slate-300 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-sm">🎁</span>
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">Future Rewards Ecosystem</h3>
        </div>
        <div className="space-y-2">
          {[
            { icon: '🛡️', text: 'Insurance discount eligibility (subject to insurer partnerships)' },
            { icon: '🏛️', text: 'Priority lane at RTO offices (subject to authority adoption)' },

            { icon: '⚡', text: 'DRIVELEGAL Pro plan discount' },

          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-sm leading-none mt-0.5">{item.icon}</span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-slate-400 font-semibold italic">
          Note: These are future vision items. No partnerships currently active. Shown for platform vision only.
        </p>
      </div>
    </div>
  );
}
