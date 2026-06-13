
﻿import React, { useState } from 'react';

import { Car, Truck, Anchor, Plane, Train, Lock, Sparkles, CheckCircle2, ChevronRight, ArrowRight, Shield } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';
import { useAppState } from '../context/AppStateContext';

export default function TransportEcosystemScreen() {
  const { country, region, flag, setTransportType } = useGlobalContext();
  const { setActiveScreen } = useAppState();

  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [selectedComingSoon, setSelectedComingSoon] = useState(null);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [submittedWaitlist, setSubmittedWaitlist] = useState(false);

  const transportModes = [
    {
      id: "road",
      name: "Road Transport",
      icon: Car,
      active: true,
      desc: "Individual and commercial road vehicles, localized speed cams, and regional RTO rules.",
      color: "bg-electric/15 border-electric/30 text-electric shadow-electric/5"
    },
    {
      id: "commercial",
      name: "Commercial Logistics",
      icon: Truck,
      active: false,
      desc: "Freight tracking, gross weight limits, cargo overloading checkpoints, and driver hours logs.",
      color: "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-400"
    },
    {
      id: "maritime",
      name: "Maritime Transport",
      icon: Anchor,
      active: false,
      desc: "Harbor authority regulations, vessel registry compliance, commercial shipping canal locks, and ballast guidelines.",
      color: "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-400"
    },
    {
      id: "aviation",
      name: "Aviation Transport",
      icon: Plane,
      active: false,
      desc: "Airport ramp compliance, ground handling guidelines, cargo custom declarations, and airside speed zones.",
      color: "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-400"
    },
    {
      id: "rail",
      name: "Rail Transport",
      icon: Train,
      active: false,
      desc: "Passenger railway code guidelines, cargo freight weight allocations, track speed restrictions, and level crossing compliance.",
      color: "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-400"
    }
  ];

  const handleCardClick = (mode) => {
    if (mode.active) {
      setTransportType(mode.id);
      setActiveScreen('dashboard');
    } else {
      setSelectedComingSoon(mode);
      setSubmittedWaitlist(false);
      setWaitlistEmail('');
      setShowWaitlistModal(true);
    }
  };

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (waitlistEmail) {
      setSubmittedWaitlist(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 space-y-5 max-w-md lg:max-w-4xl mx-auto w-full animate-fade-in select-none">
      
      {/* HEADER */}
      <div className="text-center space-y-2 mt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-electric/10 border border-electric/25 text-[10px] font-extrabold uppercase tracking-widest text-electric leading-none">
          <Shield className="w-3 h-3 animate-pulse" />
          <span>Ecosystem Scaling</span>
        </div>
        <h1 className="text-2xl xs:text-3xl font-heading font-black text-slate-850 dark:text-white leading-tight">
          Transport Ecosystem
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-md mx-auto">

          DRIVELEGAL's core penalty intelligence layer scales to secure compliance across all major fields of transport.

        </p>
      </div>

      {/* SELECTION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transportModes.map((mode) => {
          const Icon = mode.icon;
          
          return (
            <div
              key={mode.id}
              onClick={() => handleCardClick(mode)}
              className={`p-5 border rounded-[2rem] cursor-pointer relative overflow-hidden transition-all duration-300 group flex flex-col justify-between min-h-[140px] ${
                mode.active
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-electric/30 hover:scale-[1.01] hover:-translate-y-0.5 shadow-md dark:shadow-none'
                  : 'bg-white/40 dark:bg-slate-950/20 border-slate-200/50 dark:border-white/5 opacity-60 relative'
              }`}
            >
              {/* Top Icons */}
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl ${
                  mode.active 
                    ? 'bg-electric/15 text-electric group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-electric/5' 
                    : 'bg-slate-100 dark:bg-white/5 text-slate-400'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                {mode.active ? (
                  <span className="text-[7.5px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-extrabold uppercase px-2 py-0.5 rounded-md">
                    Active System
                  </span>
                ) : (
                  <span className="text-[7px] bg-slate-100 dark:bg-white/5 text-slate-400 font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 border border-slate-200 dark:border-white/5">
                    <Lock className="w-2.5 h-2.5" />
                    <span>Coming Soon</span>
                  </span>
                )}
              </div>

              {/* Title & Desc */}
              <div className="space-y-1.5 mt-4">
                <h3 className={`text-sm font-black uppercase leading-none ${
                  mode.active ? 'text-slate-850 dark:text-white' : 'text-slate-400 dark:text-slate-600'
                }`}>
                  {mode.name}
                </h3>
                <p className={`text-[10px] font-semibold leading-relaxed ${
                  mode.active ? 'text-slate-500 dark:text-slate-400' : 'text-slate-500 dark:text-slate-650'
                }`}>
                  {mode.desc}
                </p>
              </div>

              {/* Frosted Glass Lock Overlay for locked cards */}
              {!mode.active && (
                <div className="absolute inset-0 bg-white/5 dark:bg-navy-950/5 backdrop-blur-[0.5px] transition-all duration-300 group-hover:backdrop-blur-[1px] pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {/* DETAILED WAITLIST MODAL */}
      {showWaitlistModal && selectedComingSoon && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-modal max-w-sm w-full p-5 border border-slate-200 dark:border-white/10 animate-scale-up space-y-4 shadow-2xl relative overflow-hidden text-left">
            
            {/* Context indicator bar */}
            <div className="flex items-center justify-between text-[7px] font-black uppercase text-slate-450 dark:text-slate-500 bg-slate-100 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-white/5">
              <span className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-electric-glow animate-pulse" />

                DRIVELEGAL AI ENGINE

              </span>
              <span>•</span>
              <span>📍 {flag} {region || 'Global'}</span>
              <span>•</span>
              <button 
                onClick={() => {
                  setShowWaitlistModal(false);
                  setActiveScreen('countrySelect');
                }}
                className="text-electric hover:underline text-[6.5px]"
              >
                Change
              </button>
            </div>

            {/* Modal Title */}
            <div className="space-y-1">
              <h3 className="font-heading font-black text-slate-850 dark:text-white text-base tracking-wide uppercase leading-tight">
                {selectedComingSoon.name} Integration
              </h3>
              <span className="text-[8px] bg-electric/15 text-electric px-2 py-0.5 rounded font-extrabold uppercase inline-block">
                Ecosystem Pitch Preview
              </span>
            </div>

            {/* Explanatory bullets */}
            <div className="space-y-2.5 text-[9.5px] font-semibold text-slate-600 dark:text-slate-350 leading-relaxed border-y border-slate-150 dark:border-white/5 py-3">
              <span className="font-black text-slate-800 dark:text-white uppercase text-[8px] tracking-wide block mb-1">
                How the Ecosystem Scales:
              </span>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric shrink-0 mt-0.5" />
                <span>**Violation Databases:** Each transport mode inherits a custom-built, dedicated localized fine index.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric shrink-0 mt-0.5" />
                <span>**Legal Act Mappings:** Translates port authorities, cargo regulations, or aviation safety boards without legal jargon.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric shrink-0 mt-0.5" />
                <span>**Regional Rules Variation:** Adapts to specific airside gates, rail crossings, and international shipping channels.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric shrink-0 mt-0.5" />

                <span>**Unified Context Layer:** The same proprietary DRIVELEGAL AI technology powers all transport dimensions.</span>

              </div>
            </div>

            {/* Join waitlist form */}
            {!submittedWaitlist ? (
              <form onSubmit={handleWaitlistSubmit} className="space-y-2.5">
                <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-500">
                  Request early prototype access
                </span>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter business email..."
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="flex-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 px-3 text-xs font-semibold focus:border-electric focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-electric hover:bg-electric-glow text-white px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center shrink-0 shadow-md shadow-electric/15"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-xl text-[10px] text-emerald-450 font-bold text-center animate-scale-up">
                🎉 Request Logged! We will notify your team immediately upon rollout.
              </div>
            )}

            <button
              onClick={() => setShowWaitlistModal(false)}
              className="w-full mt-1 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-700 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
