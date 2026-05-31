import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Compass, AlertCircle, CheckSquare, Square, 
  MapPin, ShieldAlert, Info, Scale, ArrowRight, CheckCircle
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function TravelAlertScreen() {
  const { setActiveScreen, location } = useAppState();

  // Slide down banner state
  const [showBanner, setShowBanner] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(true), 250);
    return () => clearTimeout(timer);
  }, []);

  // Goa checklist item toggles
  const [checklist, setChecklist] = useState([
    { id: 'puc', label: 'Valid PUC (Pollution Check) hard copy', done: true },
    { id: 'insurance', label: 'Original Insurance Certificate', done: true },
    { id: 'state_tax', label: 'Goa Entry State Tax receipt (for commercial)', done: false },
    { id: 'license', label: 'Original DL physical card', done: true },
    { id: 'emergency', label: 'Goa Police emergency numbers stored', done: false }
  ]);

  const toggleChecklistItem = (id) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    }));
  };

  const doneCount = checklist.filter(c => c.done).length;

  const handleDismissBanner = () => {
    setShowBanner(false);
  };

  // Laws comparison
  const differences = [
    { rule: "Drinking & Driving", karnataka: "BAC < 0.03% (Rigid)", goa: "Zero Tolerance tourist spots", imp: "Strict checking near coastal roads" },
    { rule: "Helmet Fine", karnataka: "₹1,000 + DL Suspension", goa: "₹500 (Strictly enforced)", imp: "Mandatory double-helmets for rentals" },
    { rule: "Speed Limit (Main)", karnataka: "80 - 100 km/h", goa: "60 - 80 km/h max", imp: "Zuari & Mandovi bridges are heavily radar-tracked" },
    { rule: "Dark Sun Films", karnataka: "Fine ₹500", goa: "Fine ₹1,000 + spot peeling", imp: "Strict peeling campaigns near Margao/Panaji" }
  ];

  const nearbyGoaZones = [
    { name: "Mandovi Bridge Radar Post", risk: "HIGH SPEED CHECK", desc: "Strict 60 km/h enforcement. High density speed cams." },
    { name: "Calangute Circle Towing Zone", risk: "ZERO TOLERANCE PARKING", desc: "Frequent towing of out-of-state cars parked on main junctions." },
    { name: "Colvale Checkpost", risk: "DOCUMENT VERIFICATION", desc: "Incoming out-of-state vehicles screened for valid physical documents." }
  ];

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto relative overflow-hidden">
      
      {/* Slide-down Banner for GOA Entry */}
      {showBanner && (
        <div className="mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 border border-cyan-400/30 text-white rounded-2xl p-4 shadow-2xl relative overflow-hidden animate-slide-down">
          {/* Subtle tropical palm pattern graphics */}
          <div className="absolute right-0 bottom-0 opacity-15 transform translate-y-4 translate-x-4 pointer-events-none select-none">
            <Compass className="w-32 h-32" />
          </div>

          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="space-y-1">
              <span className="text-[9px] bg-white/20 border border-white/20 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-widest text-white">
                GPS State Transition
              </span>
              <h4 className="text-xl font-heading font-black tracking-wide leading-none">
                YOU'VE ENTERED GOA!
              </h4>
              <p className="text-[11px] text-cyan-50/90 leading-relaxed mt-1.5 font-medium">
                DriveLegal has auto-detected your entry into Goa. We've compiled the region-specific checklist and strict compliance differences for you below!
              </p>
            </div>
            <button 
              onClick={handleDismissBanner}
              className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1 rounded-lg transition-all"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button 
          onClick={() => setActiveScreen('dashboard')}
          className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h3 className="text-lg font-heading font-extrabold text-slate-800 dark:text-white tracking-wide flex items-center gap-1.5">
            <span>Travel Mode Hub</span>
            <Compass className="w-4.5 h-4.5 text-cyan-500 animate-spin-slow" />
          </h3>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            Goa Regional Compliance & Safety
          </span>
        </div>
      </div>

      {/* Comparison Rules Table */}
      <div className="glass-panel p-4 space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-electric-glow" />
          <h4 className="text-xs font-heading font-extrabold uppercase text-slate-800 dark:text-slate-300 tracking-wider">
            Key Rule Differences (KA vs GA)
          </h4>
        </div>

        <div className="border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-[10px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-200 dark:border-white/5">
                <th className="py-2.5 px-3">Rule Category</th>
                <th className="py-2.5 px-2">Karnataka</th>
                <th className="py-2.5 px-2">Goa State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 font-semibold">
              {differences.map((diff, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-slate-700 dark:text-slate-300">
                  <td className="py-2.5 px-3 font-bold">
                    <span>{diff.rule}</span>
                    <span className="block text-[8px] text-slate-400 dark:text-slate-500 font-medium normal-case mt-0.5">{diff.imp}</span>
                  </td>
                  <td className="py-2.5 px-2 font-mono text-slate-500">{diff.karnataka}</td>
                  <td className="py-2.5 px-2 font-mono text-cyan-600 dark:text-cyan-400 font-bold">{diff.goa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Travel Checklist Section */}
      <div className="glass-panel p-4 space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-electric-glow" />
            <h4 className="text-xs font-heading font-extrabold uppercase text-slate-800 dark:text-slate-300 tracking-wider">
              Travel Readiness Checklist
            </h4>
          </div>
          <span className="text-[10px] font-bold text-cyan-500 dark:text-cyan-400">
            {doneCount}/{checklist.length} Ready
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${(doneCount / checklist.length) * 100}%` }}
          />
        </div>

        <div className="space-y-2 mt-2">
          {checklist.map(item => (
            <div 
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-all duration-200"
            >
              {item.done ? (
                <CheckSquare className="w-4.5 h-4.5 text-cyan-500 shrink-0" />
              ) : (
                <Square className="w-4.5 h-4.5 text-slate-400 dark:text-slate-600 shrink-0" />
              )}
              <span className={`text-[11px] font-medium leading-tight ${item.done ? 'text-slate-500 line-through dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Enforcement Zones */}
      <div className="glass-panel p-4 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
          <h4 className="text-xs font-heading font-extrabold uppercase text-slate-800 dark:text-slate-300 tracking-wider">
            Critical Nearby Enforcement Zones
          </h4>
        </div>

        <div className="space-y-2.5">
          {nearbyGoaZones.map((zone, idx) => (
            <div key={idx} className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-3 rounded-xl">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-white">{zone.name}</span>
                <span className="text-[8px] font-mono font-bold bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                  {zone.risk}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {zone.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
