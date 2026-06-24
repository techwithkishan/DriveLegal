import React, { useState, useEffect } from 'react';
import { 
  Scale, ShieldAlert, AlertTriangle, AlertCircle, ArrowLeft,
  CheckCircle2, Plus, Info, RefreshCw, Car, Landmark, BookOpen
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { FINE_DATABASE } from '../data/demoData';

export default function ScenarioSimulatorScreen() {
  const { setActiveScreen, location } = useAppState();

  const [selectedVehicle, setSelectedVehicle] = useState('Two-Wheeler'); // Two-Wheeler, Four-Wheeler (Private), Commercial
  const [selectedViolations, setSelectedViolations] = useState([]);
  const [isRepeatOffense, setIsRepeatOffense] = useState(false);
  const [simulationState, setSimulationState] = useState('idle'); // idle, calculating, finished
  const [showFlash, setShowFlash] = useState(false);

  // Dynamic filter for violations list based on vehicle type compatibility
  const violationsList = Object.keys(FINE_DATABASE).map(key => ({
    name: key,
    ...FINE_DATABASE[key]
  }));

  const handleToggleViolation = (name) => {
    if (selectedViolations.includes(name)) {
      setSelectedViolations(prev => prev.filter(v => v !== name));
    } else {
      setSelectedViolations(prev => [...prev, name]);
    }
    setSimulationState('idle');
  };

  const handleRunSimulation = () => {
    if (selectedViolations.length === 0) return;
    setSimulationState('calculating');
    
    setTimeout(() => {
      setSimulationState('finished');
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 500);
    }, 1500);
  };

  // Compile calculations
  let totalFine = 0;
  let highestSeverity = 'LOW';
  const breakdown = [];

  selectedViolations.forEach(name => {
    const data = FINE_DATABASE[name];
    if (!data) return;

    let baseAmount = data.amount;
    // Repeat offense multipliers
    if (isRepeatOffense) {
      if (name === 'No Helmet' || name === 'No Insurance' || name === 'Using Mobile While Driving' || name === 'Red Light Jump') {
        baseAmount *= 2;
      } else if (name === 'No Valid Licence') {
        baseAmount = 10000; // subsequent offense is 10k
      }
    }

    totalFine += baseAmount;
    
    // Severity priority logic: HIGH > MEDIUM > LOW
    if (data.severity === 'HIGH') {
      highestSeverity = 'HIGH';
    } else if (data.severity === 'MEDIUM' && highestSeverity !== 'HIGH') {
      highestSeverity = 'MEDIUM';
    }

    breakdown.push({
      name,
      amount: baseAmount,
      section: data.section,
      severity: data.severity
    });
  });

  // Dynamic compound warnings
  const selectedCount = selectedViolations.length;
  if (selectedCount >= 3) {
    highestSeverity = 'HIGH';
  }

  const getSeverityStyle = (sev) => {
    switch (sev) {
      case 'HIGH':
        return {
          bg: 'bg-red-500/10 border-red-500/30',
          text: 'text-red-400',
          glow: 'glow-red',
          label: 'CRITICAL HIGH RISK',
          desc: 'Mandatory virtual court summons, potential license cancellation, or vehicle impoundment.'
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30',
          text: 'text-amber-400',
          glow: 'glow-amber',
          label: 'MODERATE EXPOSURE',
          desc: 'High financial penalties. License suspension warning active. Clear immediately to avoid points.'
        };
      default:
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30',
          text: 'text-emerald-400',
          glow: 'glow-green',
          label: 'LOW EXPOSURE',
          desc: 'Standard spot-challan fines. Resolvable digitally within 60 days without RTO escalation.'
        };
    }
  };

  const currentSeverityStyle = getSeverityStyle(highestSeverity);

  return (
    <div className={`flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto space-y-4 relative select-none transition-colors duration-500 ${
      showFlash ? 'bg-red-500/20' : ''
    }`}>
      
      {/* Screen Header */}
      <div className="bg-white/75 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800/80 rounded-2xl p-3.5 flex items-center justify-between border-electric/25 shadow-lg shadow-indigo-500/5 shrink-0 transition-all duration-300">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveScreen('ai')}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all mr-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-white block uppercase tracking-wider">
              Legal Simulator
            </span>
            <span className="text-[8px] bg-indigo-500/10 rounded-full px-2 py-0.5 mt-0.5 inline-block text-indigo-500 dark:text-indigo-400 font-semibold uppercase">
              Compounding Offense Calculator
            </span>
          </div>
        </div>
        
        <div className="bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700/50 px-2.5 py-1 rounded-xl text-[9px] text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
          📍 {location.state} rules
        </div>
      </div>

      {/* Simulator Inputs Card */}
      <div className="bg-white/75 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800/80 rounded-2xl p-4 space-y-4 shadow-xl transition-all duration-300">
        {/* Vehicle Selection */}
        <div className="space-y-1.5">
          <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block">
            1. Select Vehicle Classification
          </span>
          <div className="grid grid-cols-3 gap-2">
            {['Two-Wheeler', 'Four-Wheeler (Private)', 'Commercial'].map((vClass) => {
              const active = selectedVehicle === vClass;
              return (
                <button
                  key={vClass}
                  onClick={() => {
                    setSelectedVehicle(vClass);
                    setSelectedViolations([]);
                    setSimulationState('idle');
                  }}
                  className={`py-2 px-1 text-[9px] font-bold tracking-wider rounded-xl transition-all duration-300 uppercase flex flex-col items-center justify-center gap-1 border ${
                    active 
                      ? 'bg-electric border-electric text-white shadow-md glow-electric' 
                      : 'bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700/50 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  <span>{vClass.replace(' (Private)', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Violations Chips Checkbox grid */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block">
              2. Add Cumulative Violations
            </span>
            {selectedViolations.length > 0 && (
              <button 
                onClick={() => {
                  setSelectedViolations([]);
                  setSimulationState('idle');
                }}
                className="text-[8px] text-red-500 dark:text-red-400 hover:underline uppercase font-bold tracking-wider"
              >
                Clear All ({selectedViolations.length})
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 py-1 max-h-48 overflow-y-auto pr-1">
            {violationsList
              .filter(v => {
                if (selectedVehicle === 'Two-Wheeler' && v.category === 'Four-Wheeler (Private)') return false;
                if (selectedVehicle === 'Four-Wheeler (Private)' && v.category === 'Two-Wheeler') return false;
                return true;
              })
              .map((v) => {
                const isSelected = selectedViolations.includes(v.name);
                return (
                  <button
                    key={v.name}
                    onClick={() => handleToggleViolation(v.name)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-semibold transition-all border ${
                      isSelected 
                        ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-600 dark:text-indigo-400 font-bold' 
                        : 'bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700/50 text-slate-500 dark:text-slate-400 hover:border-slate-350 dark:hover:border-white/15'
                    }`}
                  >
                    <span>{v.name}</span>
                    {isSelected ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
                    ) : (
                      <Plus className="w-3 h-3 text-slate-500 dark:text-slate-600" />
                    )}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Offense Multiplier toggle */}
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/5 pt-3">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-slate-800 dark:text-white block">
              Is this a Repeat Offense?
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 block">
              Within 3 years of first compliance ticket
            </span>
          </div>
          
          <button
            onClick={() => {
              setIsRepeatOffense(!isRepeatOffense);
              setSimulationState('idle');
            }}
            className={`w-12 h-6.5 rounded-full p-1 transition-all duration-300 ${
              isRepeatOffense ? 'bg-electric' : 'bg-slate-300 dark:bg-navy-800'
            }`}
          >
            <div className={`w-4.5 h-4.5 rounded-full bg-white transition-all shadow-md transform ${
              isRepeatOffense ? 'translate-x-5.5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Simulate Action Button */}
        <button
          onClick={handleRunSimulation}
          disabled={selectedViolations.length === 0 || simulationState === 'calculating'}
          className="w-full bg-electric text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-electric/20 hover:bg-electric-glow active:scale-95 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
        >
          {simulationState === 'calculating' ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white-glow" />
              <span>Simulating Court Algorithms...</span>
            </>
          ) : (
            <>
              <Landmark className="w-4 h-4" />
              <span>Analyze Compound Threat ({selectedViolations.length})</span>
            </>
          )}
        </button>
      </div>

      {/* Simulator Results Section */}
      {simulationState === 'calculating' && (
        <div className="bg-white/75 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 animate-pulse shadow-xl transition-all duration-300">
          <div className="relative flex items-center justify-center w-16 h-16 bg-indigo-500/10 rounded-full">
            <Landmark className="w-8 h-8 text-indigo-500 dark:text-indigo-400 animate-bounce" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Processing MV Act Clauses...</span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              Scanning intersection guidelines, liability clauses, and legal parameters.
            </p>
          </div>
        </div>
      )}

      {simulationState === 'finished' && (
        <div className="space-y-3.5 animate-slide-up">
          {/* Compound Risk Banner */}
          <div className={`border p-4 rounded-2xl space-y-3 shadow-xl ${currentSeverityStyle.bg} ${currentSeverityStyle.glow}`}>
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block">
                  Threat Matrix Standing
                </span>
                <span className={`text-base font-heading font-extrabold block tracking-wider uppercase ${currentSeverityStyle.text}`}>
                  {currentSeverityStyle.label}
                </span>
                <p className="text-[10px] text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                  {currentSeverityStyle.desc}
                </p>
              </div>
              <div className={`p-2 rounded-xl border shrink-0 bg-slate-100 dark:bg-navy-800 border-slate-200 dark:border-navy-700/50 ${currentSeverityStyle.text}`}>
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Price Ledger / Penalty Sum */}
            <div className="border-t border-slate-200 dark:border-white/10 pt-3 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block">
                  Cumulative Fine
                </span>
                <span className="text-xl font-mono font-extrabold text-slate-800 dark:text-white block tabular-nums">
                  ₹{totalFine.toLocaleString('en-IN')}
                </span>
              </div>
              
              <div className="bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700/50 rounded-xl px-2.5 py-1 text-center shrink-0">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block">
                  Active Penalties
                </span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-white block tabular-nums">
                  {selectedCount} MV Act
                </span>
              </div>
            </div>
          </div>

          {/* Magistrate detention warnings for 3+ compounding violations */}
          {selectedCount >= 3 && (
            <div className="bg-gradient-to-r from-red-500/10 via-rose-500/5 to-transparent border border-red-500/30 rounded-2xl p-4 space-y-2.5 animate-pulse">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <Landmark className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest font-extrabold">RTO Magistrate Escalate Warning</span>
              </div>
              <p className="text-[10px] text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                <strong className="text-red-600 dark:text-red-400 uppercase tracking-wide">CRITICAL:</strong> Compounding 3+ active MV Act violations triggers automated virtual court escalation. RTO Magistrate can confiscate registration certificates and summon the vehicle owner under jail terms.
              </p>
            </div>
          )}

          {/* Individual Breakdown List */}
          <div className="bg-white/75 dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800/80 rounded-2xl p-4 space-y-3 shadow-xl transition-all duration-300">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block border-b border-slate-200 dark:border-white/5 pb-1.5">
              Individual Fines Breakdown
            </span>
            <div className="space-y-2.5">
              {breakdown.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 dark:text-white block">{item.name}</span>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 block uppercase font-mono tracking-wider">{item.section}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-800 dark:text-white block tabular-nums">₹{item.amount.toLocaleString('en-IN')}</span>
                    <span className={`text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full inline-block mt-0.5 ${
                      item.severity === 'HIGH' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20' :
                      item.severity === 'MEDIUM' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable advisor recommendations card */}
          <div className="bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700/50 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span className="text-[9px] uppercase tracking-wider font-bold">Actionable Legal Advice</span>
            </div>
            <ul className="text-[10px] text-slate-700 dark:text-slate-300 list-disc list-inside space-y-1.5 leading-relaxed font-semibold">
              <li>Keep DigiLocker documents ready to dispute secondary violations on-the-spot.</li>
              <li>A single repeat offense can lead to a flat 3-month license suspension by the RTO if unresolved.</li>
              <li>Avoid driving the vehicle immediately until active insurance or missing registration papers are physically updated.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Helper style for slide up */}
      <style>{`
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
