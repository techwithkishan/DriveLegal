import React, { useRef, useEffect, useState } from 'react';
import { Info, Navigation, Zap, ChevronRight } from 'lucide-react';

const VisionBanner = () => (
  <div className="bg-blue-500/10 border border-blue-500/25 rounded-2xl p-3.5 flex items-start gap-2.5">
    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
    <div>
      <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">Vision Layer</p>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
        These screens showcase DriVos's future ecosystem architecture. Core features (Phases 1–7) are fully functional. Phase 8 demonstrates scalability and long-term product vision.
      </p>
    </div>
  </div>
);

const routeAlerts = [
  { km: '2.4', type: 'warning', icon: '⚠️', title: 'School Zone ahead', detail: 'Speed limit: 25 km/h (7–9 AM)', sub: 'Camera: Active' },
  { km: '4.1', type: 'danger', icon: '🔴', title: 'High enforcement zone', detail: 'Silk Board Junction', sub: 'Common: Signal jumping, lane cutting' },
  { km: '7.8', type: 'caution', icon: '⚠️', title: 'Accident prone stretch', detail: 'Hosur Road flyover — 12 accidents last month', sub: 'Recommended speed: 50 km/h' },
];

const inspirationCards = [
  {
    brand: '🚗 TESLA',
    title: 'Autopilot Speed Compliance',
    desc: 'Tesla vehicles auto-adjust speed near school zones and speed cameras using onboard map intelligence.',
    vision: 'OBD2 port integration → real-time vehicle data → compliance alerts on dashboard before violations occur.',
    color: 'from-red-500/10 to-red-600/5 border-red-500/20',
    accent: 'text-red-400',
  },
  {
    brand: '🚗 UBER / OLA',
    title: 'Driver Behavior Monitoring',
    desc: 'Detects harsh braking, speeding, phone usage while driving. Links to driver rating system.',
    vision: 'Commercial driver compliance scoring integrated with fleet management. Violations auto-logged to profile.',
    color: 'from-slate-800/60 to-slate-900/60 border-slate-600/20',
    accent: 'text-slate-300',
  },
  {
    brand: '🗺️ GOOGLE MAPS',
    title: 'Speedometer + Speed Limit Display',
    desc: 'Shows current speed vs limit. Warns when approaching cameras.',
    vision: 'Challan risk layer on top of navigation — shows enforcement zones, fine amounts, and live alerts as you approach.',
    color: 'from-blue-500/10 to-green-500/5 border-blue-500/20',
    accent: 'text-blue-400',
  },
];

const iotFeatures = [
  { emoji: '🔌', title: 'OBD2 Integration', desc: 'Connect DriVos to your vehicle\'s OBD2 port via Bluetooth adapter. Read: speed, location, engine status. Alert: before entering enforcement zones.' },
  { emoji: '⌚', title: 'Smartwatch Alerts', desc: 'Haptic alert when entering school zone. Vibration reminder: helmet check before starting engine.' },
  { emoji: '🪖', title: 'Smart Helmet Integration', desc: 'Future: Helmet with NFC chip confirms helmet worn → compliance logged automatically to profile.' },
  { emoji: '📱', title: 'Digital Dashboard Display', desc: 'Future: DriVos widget on CarPlay / Android Auto showing real-time compliance score and zone alerts while driving.' },
];

export default function SmartMobilityScreen() {
  return (
    <div className="flex-1 flex flex-col p-4 pb-28 space-y-5 max-w-2xl mx-auto w-full animate-fade-in">
      <VisionBanner />

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-electric" />
          <h1 className="font-heading font-black text-xl text-slate-900 dark:text-white uppercase tracking-wider">Smart Mobility Intelligence</h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Where DriVos meets the future of transport</p>
      </div>

      {/* Navigation Awareness Demo Card */}
      <div className="glass-panel p-5 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/5">
          <span className="text-sm">🗺️</span>
          <h2 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Smart Navigation Alert</h2>
          <span className="ml-auto text-[8px] bg-blue-500/15 text-blue-400 border border-blue-500/25 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider">Demo Mode</span>
        </div>

        <div className="space-y-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span><span className="text-slate-400">Current:</span> <span className="text-slate-800 dark:text-white font-bold">Koramangala, Bengaluru</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span>🎯</span>
            <span><span className="text-slate-400">Destination:</span> <span className="text-slate-800 dark:text-white font-bold">Electronic City</span></span>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-white/5 pt-3 space-y-2">
          <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Route Intelligence</p>
          {routeAlerts.map((alert, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 p-2.5 rounded-xl ${
                alert.type === 'danger' ? 'bg-red-500/10 border border-red-500/20' :
                'bg-amber-500/5 border border-amber-500/15'
              }`}
            >
              <span className="text-sm leading-none mt-0.5">{alert.icon}</span>
              <div>
                <p className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200">km {alert.km} — {alert.title}</p>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold">{alert.detail}</p>
                <p className="text-[9px] text-slate-400 font-medium">{alert.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-2.5 flex items-center gap-2">
          <span>✅</span>
          <div>
            <p className="text-[10px] font-extrabold text-emerald-400">Estimated compliance risk: LOW</p>
            <p className="text-[9px] text-slate-500 font-medium">Drive safely and arrive penalty-free.</p>
          </div>
        </div>

        <div className="bg-slate-100/50 dark:bg-white/5 rounded-xl p-2.5 flex items-start gap-2 border border-slate-200 dark:border-white/5">
          <Zap className="w-3.5 h-3.5 text-electric shrink-0 mt-0.5" />
          <p className="text-[9px] text-slate-500 font-semibold leading-relaxed">
            <span className="text-electric font-extrabold">Future:</span> Live integration with Google Maps, Apple Maps, and HERE Navigation APIs
          </p>
        </div>

        <p className="text-[9px] text-slate-400 font-semibold italic text-center">
          📌 This is a vision demo. Navigation integration planned for Phase 9.
        </p>
      </div>

      {/* Real World Inspiration Cards */}
      <div className="space-y-3">
        <h2 className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Real World Inspiration</h2>
        {inspirationCards.map((card, i) => (
          <div key={i} className={`glass-panel p-4 space-y-3 bg-gradient-to-br ${card.color} border`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-extrabold uppercase tracking-wider ${card.accent}`}>{card.brand}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${card.accent} opacity-50`} />
            </div>
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">{card.title}</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{card.desc}</p>
            <div className="border-t border-white/10 pt-2.5 space-y-1">
              <p className="text-[8px] font-extrabold uppercase tracking-widest text-electric">DriVos Vision:</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{card.vision}</p>
            </div>
          </div>
        ))}
      </div>

      {/* IoT & Connected Vehicle Vision */}
      <div className="glass-panel p-5 space-y-4 border border-dashed border-slate-300 dark:border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">🔮 Connected Vehicle Support</h2>
          <span className="text-[8px] bg-slate-100 dark:bg-white/5 text-slate-500 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider">Future Vision</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {iotFeatures.map((f, i) => (
            <div key={i} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">{f.emoji}</span>
                <p className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">{f.title}</p>
              </div>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center space-y-0.5">
          <p className="text-[9px] text-slate-400 font-semibold">Status: Architecture designed.</p>
          <p className="text-[9px] text-slate-400 font-semibold">Implementation: Phase 9–10 roadmap.</p>
        </div>
      </div>
    </div>
  );
}
