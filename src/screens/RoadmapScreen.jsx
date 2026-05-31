import React, { useEffect, useRef, useState } from 'react';
import { Map } from 'lucide-react';

const phases = [
  {
    id: '1–3',
    title: 'Challan Intelligence & AI',
    desc: 'Challan intelligence, user history, AI legal assistant',
    status: 'done',
    date: 'Completed',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-400',
    border: 'border-emerald-500',
  },
  {
    id: '4–5',
    title: 'OCR & Prevention Intelligence',
    desc: 'OCR scanner, pre-drive checklist, zone alert system',
    status: 'done',
    date: 'Completed',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-400',
    border: 'border-emerald-500',
  },
  {
    id: '6',
    title: 'Governance Analytics',
    desc: 'Governance analytics dashboard for authorities',
    status: 'done',
    date: 'Completed',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-400',
    border: 'border-emerald-500',
  },
  {
    id: '7',
    title: 'Global Expansion',
    desc: 'Multi-country support, travel mode, international compliance',
    status: 'done',
    date: 'Completed',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-400',
    border: 'border-emerald-500',
  },
  {
    id: '8',
    title: 'Ecosystem Vision',
    desc: 'Ecosystem vision, AI coach, gamification, civic awareness',
    status: 'active',
    date: 'Current — Live',
    color: 'bg-electric',
    textColor: 'text-electric',
    border: 'border-electric',
  },
  {
    id: '9',
    title: 'Live Data Integration',
    desc: 'Real Parivahan API, live challan data, MongoDB Atlas backend, Sarvam AI multilingual support',
    status: 'planned',
    date: 'Q3 2025',
    color: 'bg-blue-500',
    textColor: 'text-blue-400',
    border: 'border-blue-500/40 border-dashed',
  },
  {
    id: '10',
    title: 'Commercial Transport',
    desc: 'Logistics fleet management, RTO integration, iOS/Android PWA packaging',
    status: 'planned',
    date: 'Q4 2025',
    color: 'bg-blue-500',
    textColor: 'text-blue-400',
    border: 'border-blue-500/40 border-dashed',
  },
  {
    id: '11',
    title: 'IoT Vehicle Integration',
    desc: 'OBD2 vehicle integration, CarPlay/Android Auto widget, smart helmet NFC compatibility',
    status: 'planned',
    date: 'Q1 2026',
    color: 'bg-indigo-500',
    textColor: 'text-indigo-400',
    border: 'border-indigo-500/30 border-dashed',
  },
  {
    id: '12',
    title: 'National Rollout',
    desc: 'National rollout, B2G government licensing, 50 district partnerships, insurance ecosystem',
    status: 'planned',
    date: 'Q2 2026',
    color: 'bg-purple-500',
    textColor: 'text-purple-400',
    border: 'border-purple-500/30 border-dashed',
  },
];

function TimelineItem({ phase, index, isLast }) {
  const ref = useRef(null);
  const lineRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isDone = phase.status === 'done';
  const isActive = phase.status === 'active';
  const isPlanned = phase.status === 'planned';

  return (
    <div ref={ref} className="flex gap-4 items-start">
      {/* Left: dot + line */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-700 ${
          visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        } ${isDone ? `${phase.color} border-transparent text-white` : isActive ? `bg-transparent ${phase.border} border-2` : `bg-transparent ${phase.border} border-2`}`}>
          {isDone && <span className="text-xs font-black text-white">✓</span>}
          {isActive && (
            <>
              <span className={`absolute inset-0 rounded-full ${phase.color} animate-ping opacity-30`} />
              <span className={`w-3 h-3 rounded-full ${phase.color}`} />
            </>
          )}
          {isPlanned && <span className={`w-2.5 h-2.5 rounded-full ${phase.color} opacity-40`} />}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 min-h-[40px] bg-slate-200 dark:bg-white/10 relative mt-1 overflow-hidden">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-emerald-500/60 to-slate-300/30 transition-all duration-700 ease-out"
              style={{ height: visible ? '100%' : '0%' }}
            />
          </div>
        )}
      </div>

      {/* Right: content */}
      <div className={`pb-8 flex-1 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
        <div className={`p-4 rounded-2xl border ${phase.border} ${
          isDone ? 'bg-emerald-500/5' : isActive ? 'bg-electric/5 shadow-lg shadow-electric/5' : 'bg-slate-50/50 dark:bg-white/[0.02]'
        } space-y-1.5`}>
          <div className="flex items-center justify-between flex-wrap gap-1">
            <div className="flex items-center gap-2">
              <span className={`text-[8px] font-extrabold uppercase tracking-widest ${phase.textColor} bg-current/10 border border-current/20 px-2 py-0.5 rounded-full`}>
                Phase {phase.id}
              </span>
              {isDone && <span className="text-[7px] text-emerald-400 font-extrabold bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">✅ COMPLETED</span>}
              {isActive && <span className="text-[7px] text-electric font-extrabold bg-electric/10 border border-electric/20 px-1.5 py-0.5 rounded-full animate-pulse">● CURRENT</span>}
            </div>
            <span className="text-[8px] text-slate-400 font-bold">{phase.date}</span>
          </div>
          <p className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wide">{phase.title}</p>
          <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{phase.desc}</p>
          {isDone && <p className="text-[8px] text-emerald-400 font-extrabold">Status: Live in prototype</p>}
          {isPlanned && <p className={`text-[8px] ${phase.textColor} font-extrabold`}>Status: Roadmap planned</p>}
        </div>
      </div>
    </div>
  );
}

export default function RoadmapScreen() {
  return (
    <div className="flex-1 flex flex-col p-4 pb-28 space-y-5 max-w-2xl mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-electric" />
          <h1 className="font-heading font-black text-xl text-slate-900 dark:text-white uppercase tracking-wider">DRIVELEGAL Roadmap</h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">From prototype to national platform</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        {[
          { color: 'bg-emerald-500', label: 'Completed' },
          { color: 'bg-electric', label: 'Current (Phase 8)' },
          { color: 'bg-blue-500 opacity-50 border-2 border-blue-500 border-dashed', label: 'Planned' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-[9px] text-slate-500 font-semibold">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="pt-2">
        {phases.map((phase, i) => (
          <TimelineItem
            key={phase.id}
            phase={phase}
            index={i}
            isLast={i === phases.length - 1}
          />
        ))}
      </div>

      {/* Footer note */}
      <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-4 text-center space-y-1">
        <p className="text-[10px] font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-wider">🚀 Join the Journey</p>
        <p className="text-[9px] text-slate-400 font-medium leading-relaxed">
          DRIVELEGAL is built for scale. Every phase brings India's drivers closer to a zero-penalty, fully-compliant future.
        </p>
      </div>
    </div>
  );
}
