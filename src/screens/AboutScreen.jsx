<<<<<<< HEAD
﻿import React from 'react';
=======
import React from 'react';
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
import { 
  Shield, Info, Sparkles, Scale, BookOpen, MapPin, 
  Bot, Mic, ClipboardList, Award, Camera, WifiOff, 
  Compass, BarChart3, Heart, Target, ArrowLeft 
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function AboutScreen() {
  const { setActiveScreen } = useAppState();

  const coreFeatures = [
    { 
      title: "Live Location Challan Lookup", 
      desc: "Instant location-based challan identification that maps rules exactly to your current state, city, and area.",
      icon: MapPin, 
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20"
    },
    { 
      title: "Smart Challan Calculator", 
      desc: "Simulate and calculate compound violations using dynamic multi-country legal frameworks and exchange rates.",
      icon: Scale, 
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    { 
      title: "AI Legal Assistant", 
      desc: "Get instant legal counsel on complex penalties, camera calibration rules, and dispute mechanisms globally.",
      icon: Bot, 
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20"
    },
    { 
      title: "Voice & Multilingual Support", 
      desc: "Hands-free speech commands and local translation formats matching multi-country vernacular needs.",
      icon: Mic, 
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    },
    { 
      title: "Challan History Dashboard", 
      desc: "Log, track, pay, and dispute past RTO tickets with full transparency of dates, officer IDs, and deadlines.",
      icon: ClipboardList, 
      color: "text-pink-500 bg-pink-500/10 border-pink-500/20"
    },
    { 
      title: "Road Safety Compliance Score", 
      desc: "Gamer-style safety index showing real-time risk profile with dynamic tips and clean-streak metrics.",
      icon: Award, 
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20"
    },
    { 
      title: "OCR Challan Scanner", 
      desc: "Upload or scan physical traffic ticket images to extract legal sections, demerits, and fines in one step.",
      icon: Camera, 
      color: "text-teal-500 bg-teal-500/10 border-teal-500/20"
    },
    { 
      title: "Zero-Network Offline Support", 
      desc: "Fully cached offline database guaranteeing 100% platform uptime even in remote low-network highway stretches.",
      icon: WifiOff, 
      color: "text-red-500 bg-red-500/10 border-red-500/20"
    },
    { 
      title: "International Travel Mode", 
      desc: "Active cross-border travel alerts detailing differences in drive-side, BAC alcohol limits, and tourist fines.",
      icon: Compass, 
      color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20"
    },
    { 
      title: "Enforcement Analytics System", 
      desc: "Comprehensive dashboards for traffic authorities to monitor offender density, hotspot zones, and compliance rates.",
      icon: BarChart3, 
      color: "text-orange-500 bg-orange-500/10 border-orange-500/20"
    }
  ];

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 space-y-6 max-w-2xl mx-auto w-full animate-fade-in select-none">
      
      {/* HEADER SECTION */}
      <div className="text-center space-y-2 mt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-electric/10 border border-electric/25 text-[10px] font-extrabold uppercase tracking-widest text-electric leading-none">
          <Info className="w-3 h-3" />
          <span>Platform Profile</span>
        </div>
        <h1 className="text-2xl xs:text-3xl font-heading font-black text-slate-850 dark:text-white leading-tight">
<<<<<<< HEAD
          About DriVos
=======
          About DRIVELEGAL
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-md mx-auto">
          AI-Powered Traffic Law and Challan Intelligence Platform.
        </p>
      </div>

      {/* CORE PLATFORM OVERVIEW CARD */}
      <div className="glass-panel p-5 space-y-4 relative overflow-hidden border-slate-200 dark:border-white/5">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-electric/10 to-transparent rounded-full blur-lg pointer-events-none" />
        
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-electric to-blue-600 p-2 rounded-xl text-white shadow-md">
            <Shield className="w-5 h-5 fill-white/10" />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider block">
            Core Concept
          </span>
        </div>

        <p className="text-xs text-slate-650 dark:text-slate-300 font-semibold leading-relaxed">
<<<<<<< HEAD
          DriVos is an AI-powered traffic law and challan intelligence platform designed to simplify traffic regulations, improve road safety awareness, and help users understand challans in a smarter and more accessible way.
=======
          DRIVELEGAL is an AI-powered traffic law and challan intelligence platform designed to simplify traffic regulations, improve road safety awareness, and help users understand challans in a smarter and more accessible way.
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
        </p>
        
        <p className="text-xs text-slate-650 dark:text-slate-300 font-semibold leading-relaxed">
          The platform combines location-based challan intelligence, AI-powered legal explanations, challan tracking, safety awareness, and smart compliance insights into a single modern system.
        </p>
      </div>

      {/* THE UNIQUE ASPECT CARD */}
      <div className="glass-panel p-5 space-y-3 relative overflow-hidden border-indigo-500/25 bg-gradient-to-r from-indigo-500/[0.02] to-electric/[0.02]">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-500 p-2 rounded-xl text-white">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider block">
            What Makes Us Unique?
          </span>
        </div>
        
        <p className="text-xs text-slate-650 dark:text-slate-300 font-semibold leading-relaxed">
<<<<<<< HEAD
          Unlike traditional challan platforms that mainly focus on payment or violation records, DriVos helps users understand:
=======
          Unlike traditional challan platforms that mainly focus on payment or violation records, DRIVELEGAL helps users understand:
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-bold text-slate-700 dark:text-slate-350">
          {[
            { label: "Why a challan exists", desc: "Understanding specific road safety contexts" },
            { label: "Related legal sections", desc: "Deciphering standard legal RTO jargon" },
            { label: "Consequences of repeat violations", desc: "Mapping demerits, points, and suspension risks" },
            { label: "Contribution to public safety", desc: "Viewing fine money allocation and safety guidelines" }
          ].map((item, index) => (
            <div key={index} className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-2 rounded-xl flex flex-col justify-center">
              <span className="text-indigo-500 font-black mb-0.5 uppercase tracking-wide">{item.label}</span>
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-semibold uppercase">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CORE FEATURES ACCORDION GRID */}
      <div className="space-y-3">
        <h3 className="font-heading font-extrabold text-sm uppercase text-slate-850 dark:text-slate-200 tracking-wider text-center">
          Core Platform Capabilities
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {coreFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div 
                key={index} 
                className="glass-panel p-4 flex gap-3.5 border-slate-200 dark:border-white/5 hover:border-slate-350 dark:hover:border-white/10 transition-all duration-300 group"
              >
                <div className={`p-2.5 rounded-xl border shrink-0 ${feat.color} group-hover:scale-105 transition-all duration-200 h-fit`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-wider block">
                    {feat.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* VISION & CITIZEN APPROACH */}
      <div className="glass-panel p-5 space-y-4 border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-navy-950/40 relative">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-amber-500 to-orange-500 p-2 rounded-xl text-white shadow-md">
            <Target className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider block">
            Our Vision
          </span>
        </div>

        <p className="text-xs italic bg-slate-100 dark:bg-white/5 p-3.5 border-l-2 border-amber-500 rounded-r-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
          "To build a smart, scalable, and awareness-focused traffic compliance ecosystem that improves road safety through technology, AI, and simplified legal education."
        </p>

        <div className="h-[1px] bg-slate-200 dark:bg-white/5 my-2" />

        <div className="flex items-start gap-2.5">
          <Heart className="w-5 h-5 text-red-500 shrink-0 mt-0.5 animate-pulse" />
          <div>
            <h5 className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-wider">Citizen-First Approach</h5>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-normal mt-0.5">
<<<<<<< HEAD
              DriVos is designed with a citizen-first approach to make traffic laws more transparent, understandable, and accessible for everyone.
=======
              DRIVELEGAL is designed with a citizen-first approach to make traffic laws more transparent, understandable, and accessible for everyone.
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setActiveScreen('dashboard')}
        className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl text-xs uppercase tracking-wider border border-slate-200 dark:border-white/10 transition-all text-center flex items-center justify-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </button>

    </div>
  );
}
