<<<<<<< HEAD
﻿import React, { useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
import { useAppState } from '../context/AppStateContext';
import { Globe, X, ArrowRight, Info } from 'lucide-react';

const NODES = {
  core: {
    id: 'core',
    emoji: '🛡️',
<<<<<<< HEAD
    label: 'DriVos\nCore Engine',
=======
    label: 'DRIVELEGAL\nCore Engine',
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
    status: 'live',
    desc: 'The central intelligence layer powering all citizen, authority, and mobility features across the platform.',
    detail: 'Phases 1–8 live in prototype. Real backend integration in Phase 9.',
  },
  citizen: {
    id: 'citizen',
    emoji: '👤',
    label: 'CITIZEN\nLAYER',
    status: 'live',
    desc: 'Challan AI, compliance prevention, education modules, and AI legal assistant for everyday drivers.',
    detail: 'Fully functional. Includes dashboard, score, history, AI chat, and awareness hub.',
  },
  authority: {
    id: 'authority',
    emoji: '👮',
    label: 'AUTHORITY\nLAYER',
    status: 'live',
    desc: 'Governance analytics, heatmaps, zone intelligence, RTO linking, and enforcement console.',
    detail: 'Phase 6 — Live in prototype. Governance dashboard with admin mode.',
  },
  mobility: {
    id: 'mobility',
    emoji: '🚗',
    label: 'MOBILITY\nLAYER',
    status: 'dev',
    desc: 'Smart navigation, IoT alerts, insurance integration, and connected vehicle support.',
    detail: 'Phase 8 vision demo. Architecture designed. Implementation in Phase 9–11.',
  },
  challanAI: {
    id: 'challanAI',
    emoji: '🤖',
    label: 'Challan AI',
    status: 'live',
    desc: 'AI-powered challan detection and legal interpretation for Indian traffic law.',
    detail: 'Phase 1–2 — Live.',
  },
  compliance: {
    id: 'compliance',
    emoji: '✅',
    label: 'Compliance\nPrevention',
    status: 'live',
    desc: 'Pre-drive checklist, zone alerts, real-time risk scoring before you start your journey.',
    detail: 'Phase 5 — Live in prototype.',
  },
  education: {
    id: 'education',
    emoji: '📚',
    label: 'Education',
    status: 'live',
    desc: 'Interactive awareness modules, scenario simulator, and gamified compliance learning.',
    detail: 'Phase 3 & 8 — Live.',
  },
  analytics: {
    id: 'analytics',
    emoji: '📊',
    label: 'Analytics',
    status: 'live',
    desc: 'Violation heatmaps, repeat offender tracking, and state-level governance reports.',
    detail: 'Phase 6 — Live in prototype.',
  },
  heatmaps: {
    id: 'heatmaps',
    emoji: '🗺️',
    label: 'Heatmaps',
    status: 'live',
    desc: 'Zone intelligence layer showing high-risk enforcement areas across India.',
    detail: 'Phase 6 — Live in prototype.',
  },
  rtoLink: {
    id: 'rtoLink',
    emoji: '🏛️',
    label: 'RTO Link',
    status: 'future',
    desc: 'Direct integration with Parivahan / RTO APIs for live challan data and licence verification.',
    detail: 'Phase 9 — Q3 2025 target.',
  },
  smartNav: {
    id: 'smartNav',
    emoji: '🧭',
    label: 'Smart Nav',
    status: 'planned',
    desc: 'Compliance-aware navigation overlaying enforcement zones on Google Maps and HERE APIs.',
    detail: 'Phase 9 — Planned.',
  },
  iot: {
    id: 'iot',
    emoji: '📡',
    label: 'IoT Alerts',
    status: 'future',
    desc: 'OBD2 port integration, smartwatch haptic alerts, and connected vehicle compliance logging.',
    detail: 'Phase 11 — Q1 2026.',
  },
  insurance: {
    id: 'insurance',
    emoji: '🛡️',
    label: 'Insurance',
    status: 'future',
    desc: 'Safe Driver Score linked to insurance premium discounts through insurer partnerships.',
    detail: 'Phase 12 — Vision. No partnerships currently active.',
  },
};

function StatusChip({ status }) {
  const map = {
    live: { dot: 'bg-emerald-400', text: 'text-emerald-400', label: '🟢 Live' },
    dev: { dot: 'bg-blue-400', text: 'text-blue-400', label: '🔵 In Development' },
    planned: { dot: 'bg-sky-400', text: 'text-sky-400', label: '🔜 Planned' },
    future: { dot: 'bg-slate-400', text: 'text-slate-400', label: '🔜 Future' },
  };
  const s = map[status];
  return (
    <span className={`text-[8px] font-extrabold uppercase tracking-widest ${s.text} bg-white/5 border border-current/20 px-2 py-0.5 rounded-full`}>
      {s.label}
    </span>
  );
}

function NodeCard({ node, onClick }) {
  const glowClass = node.status === 'live'
    ? 'border-emerald-500/40 shadow-emerald-500/10 shadow-lg'
    : node.status === 'dev'
    ? 'border-blue-500/40 border-dashed'
    : 'border-slate-500/25 border-dashed';

  const pulseClass = node.status === 'live'
    ? 'animate-[ecosystemPulse_3s_ease-in-out_infinite]'
    : node.status === 'dev'
    ? 'animate-[ecosystemPulse_4s_ease-in-out_infinite_0.5s]'
    : '';

  return (
    <button
      onClick={() => onClick(node)}
      className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl border bg-white/5 dark:bg-navy-900/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10 active:scale-95 cursor-pointer select-none ${glowClass} ${pulseClass}`}
      title={node.label.replace('\n', ' ')}
    >
      <span className="text-xl leading-none">{node.emoji}</span>
      <span className="text-[9px] font-extrabold text-slate-700 dark:text-slate-200 text-center uppercase tracking-wider leading-tight whitespace-pre-line">
        {node.label}
      </span>
      <StatusChip status={node.status} />
    </button>
  );
}

function NodeModal({ node, onClose }) {
  if (!node) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div
        className="glass-modal max-w-sm w-full p-5 border border-slate-200 dark:border-white/10 space-y-3 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{node.emoji}</span>
            <span className="font-heading font-extrabold text-sm text-slate-800 dark:text-white uppercase tracking-wider">
              {node.label.replace('\n', ' ')}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
        <StatusChip status={node.status} />
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{node.desc}</p>
        <p className="text-[10px] text-slate-400 font-semibold italic border-t border-slate-100 dark:border-white/5 pt-2">{node.detail}</p>
      </div>
    </div>
  );
}

export default function EcosystemScreen() {
  const { setActiveScreen } = useAppState();
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div className="flex-1 flex flex-col p-4 pb-28 space-y-5 max-w-3xl mx-auto w-full animate-fade-in">
      <style>{`
        @keyframes ecosystemPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes greenGlow {
          0%, 100% { box-shadow: 0 0 8px 2px rgba(52,211,153,0.15); }
          50% { box-shadow: 0 0 18px 6px rgba(52,211,153,0.35); }
        }
      `}</style>

      {/* Vision Banner */}
      <div className="bg-blue-500/10 border border-blue-500/25 rounded-2xl p-3.5 flex items-start gap-2.5 animate-fade-in">
        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">Vision Layer</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
<<<<<<< HEAD
            These screens showcase DriVos's future ecosystem architecture. Core features (Phases 1–7) are fully functional. Phase 8 demonstrates scalability and long-term product vision.
=======
            These screens showcase DRIVELEGAL's future ecosystem architecture. Core features (Phases 1–7) are fully functional. Phase 8 demonstrates scalability and long-term product vision.
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-electric" />
<<<<<<< HEAD
          <h1 className="font-heading font-black text-xl text-slate-900 dark:text-white uppercase tracking-wider">DriVos Ecosystem</h1>
=======
          <h1 className="font-heading font-black text-xl text-slate-900 dark:text-white uppercase tracking-wider">DRIVELEGAL Ecosystem</h1>
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">The intelligent mobility compliance platform of tomorrow</p>
      </div>

      {/* Ecosystem Map */}
      <div className="glass-panel p-5 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-electric/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <h2 className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 text-center">Platform Architecture</h2>

        {/* Core Engine */}
        <div className="flex justify-center">
          <NodeCard node={NODES.core} onClick={setActiveNode} />
        </div>

        {/* Connector line down */}
        <div className="flex justify-center">
          <div className="w-px h-5 bg-gradient-to-b from-emerald-500/60 to-transparent" />
        </div>

        {/* Three layers */}
        <div className="grid grid-cols-3 gap-3 relative">
          {/* Connector lines */}
          <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-[calc(100%-80px)] h-px bg-gradient-to-r from-transparent via-slate-400/30 to-transparent" />

          <NodeCard node={NODES.citizen} onClick={setActiveNode} />
          <NodeCard node={NODES.authority} onClick={setActiveNode} />
          <NodeCard node={NODES.mobility} onClick={setActiveNode} />
        </div>

        {/* Connector lines down */}
        <div className="grid grid-cols-3 gap-3">
          {[0,1,2].map(i => (
            <div key={i} className="flex justify-center">
              <div className="w-px h-4 bg-gradient-to-b from-slate-400/30 to-transparent" />
            </div>
          ))}
        </div>

        {/* Sub-nodes row */}
        <div className="grid grid-cols-3 gap-2">
          {/* Citizen sub-nodes */}
          <div className="flex flex-col gap-2">
            <NodeCard node={NODES.challanAI} onClick={setActiveNode} />
            <NodeCard node={NODES.compliance} onClick={setActiveNode} />
            <NodeCard node={NODES.education} onClick={setActiveNode} />
          </div>
          {/* Authority sub-nodes */}
          <div className="flex flex-col gap-2">
            <NodeCard node={NODES.analytics} onClick={setActiveNode} />
            <NodeCard node={NODES.heatmaps} onClick={setActiveNode} />
            <NodeCard node={NODES.rtoLink} onClick={setActiveNode} />
          </div>
          {/* Mobility sub-nodes */}
          <div className="flex flex-col gap-2">
            <NodeCard node={NODES.smartNav} onClick={setActiveNode} />
            <NodeCard node={NODES.iot} onClick={setActiveNode} />
            <NodeCard node={NODES.insurance} onClick={setActiveNode} />
          </div>
        </div>

        <p className="text-[9px] text-slate-400 text-center font-semibold">Tap any node to learn more</p>
      </div>

      {/* Quick links to Phase 8 screens */}
      <div className="glass-panel p-4 space-y-3">
        <h3 className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Explore Phase 8</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: 'Smart Mobility', emoji: '🚗', id: 'smartMobility', color: 'text-blue-400 border-blue-500/25 bg-blue-500/5 hover:bg-blue-500/10' },
            { label: 'AI Coach', emoji: '🤖', id: 'aiCoach', color: 'text-purple-400 border-purple-500/25 bg-purple-500/5 hover:bg-purple-500/10' },
            { label: 'Achievements', emoji: '🏆', id: 'achievements', color: 'text-amber-400 border-amber-500/25 bg-amber-500/5 hover:bg-amber-500/10' },
            { label: 'Roadmap', emoji: '🗺️', id: 'roadmap', color: 'text-emerald-400 border-emerald-500/25 bg-emerald-500/5 hover:bg-emerald-500/10' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border font-bold text-[10px] uppercase tracking-wider transition-all active:scale-95 ${item.color}`}
            >
              <span className="text-base">{item.emoji}</span>
              <span>{item.label}</span>
              <ArrowRight className="w-3 h-3 ml-auto opacity-60" />
            </button>
          ))}
        </div>
      </div>

      {/* Node Modal */}
      <NodeModal node={activeNode} onClose={() => setActiveNode(null)} />
    </div>
  );
}
