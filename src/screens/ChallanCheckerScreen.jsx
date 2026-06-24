import React, { useState, useEffect } from 'react';
import { 
  MapPin, ChevronRight, CheckCircle2, Info, AlertTriangle, 
  HelpCircle, ChevronDown, Award, Calendar, BookOpen, HeartPulse, 

  Car, Shield, FileText, Scale, RefreshCw

} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { FINE_DATABASE, AI_TEACHING_BLOCKS, LOCATION_CASCADES } from '../data/demoData';
import { useGlobalContext } from '../context/GlobalContext';
import violationsGlobal from '../data/violations-global.json';
import exchangeRates from '../data/exchangeRates.json';

import LocationChip from '../components/LocationChip';


// Dynamic count-up numerical currency conversion strip for Step 4
function CurrencyConversionStrip({ amountInCurrentCurrency, currentCountry }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800; // ms
    const startTime = performance.now();
    let animationFrame;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressPercent = Math.min(elapsed / duration, 1);
      setProgress(progressPercent);

      if (progressPercent < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [amountInCurrentCurrency, currentCountry]);

  // Convert current fine back to INR baseline, then convert to target currencies
  const rateToINR = exchangeRates.rates[currentCountry] || 1;
  const amountInINR = amountInCurrentCurrency / rateToINR;

  const targets = [
    { code: 'INR', symbol: '₹' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'AED', symbol: 'د.إ' },
    { code: 'GBP', symbol: '£' },
    { code: 'AUD', symbol: 'A$' }
  ].filter(t => t.code !== currentCountry);

  return (
    <div className="bg-slate-500/5 border border-slate-200/10 dark:border-white/5 rounded-xl p-2.5 mt-2 space-y-1.5 animate-fade-in">
      <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
        AI Live Exchange Conversion Reference
      </span>
      <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
        {targets.map(t => {
          const targetRate = exchangeRates.rates[t.code] || 1;
          const targetAmount = Math.round(amountInINR * targetRate * progress);
          return (
            <div key={t.code} className="bg-white/5 border border-white/5 p-1.5 rounded-lg flex flex-col justify-center">
              <span className="text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t.code} Equivalent
              </span>
              <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-white">
                {t.symbol}{targetAmount.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ChallanCheckerScreen() {

  const { location, setLocation, isOffline, isTravelActive, getTravelRules, user, setActiveScreen, detectLocation, locationLoading, locationError } = useAppState();

  const { country, currencySymbol, activeCountryConfig } = useGlobalContext();

  // Wizard Steps: 1 = Location, 2 = Vehicle Type, 3 = Violations, 4 = Breakdown
  const [step, setStep] = useState(1);

  // Step 1: Location Cascades
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [selectedState, setSelectedState] = useState(location.state);
  const [selectedCity, setSelectedCity] = useState(location.city);
  const [selectedArea, setSelectedArea] = useState(location.area);

  // Step 2: Vehicle Type
  const [vehicleType, setVehicleType] = useState('Two-Wheeler');

  // Step 3: Violations (Multi-select)
  const [selectedViolations, setSelectedViolations] = useState([]);

  // Step 5: Accordion state for teaching card blocks (keyed by block name)
  const [expandedBlocks, setExpandedBlocks] = useState({
    example: true, // Expand first block by default
    whatIf: false,
    repeat: false,
    moneyGoes: false
  });

  // Helper to map and resolve violations country-specifically
  const getViolationData = (vName) => {
    let normalized = vName;
    if (vName === 'Using Mobile While Driving') normalized = 'Mobile While Driving';
    
    // Check global violations config
    const globalData = violationsGlobal[normalized]?.[country];
    if (globalData) {
      return {
        amount: globalData.fine,
        section: globalData.section,
        severity: globalData.severity,
        points: globalData.points,
        extra: globalData.extra,
        category: FINE_DATABASE[vName]?.category || 'All Vehicles',
        description: FINE_DATABASE[vName]?.description || ''
      };
    }
    
    // Fallback to local FINE_DATABASE
    const localData = FINE_DATABASE[vName];
    if (localData) {
      if (country === 'IN') return localData;
      // Convert INR to active currency
      const rate = exchangeRates.rates[country] || 1.0;
      return {
        ...localData,
        amount: Math.round(localData.amount * rate)
      };
    }
    return null;
  };

  // Reset violations when vehicle type changes to prevent incompatibilities
  useEffect(() => {
    setSelectedViolations([]);
  }, [vehicleType]);

  // Handle Location confirmation
  const handleConfirmLocation = () => {
    setLocation({
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      area: selectedArea,
      isAutoDetected: false
    });
    setStep(2);
  };


  // Real auto detect using browser Geolocation + Nominatim
  const handleAutoDetect = () => {
    detectLocation();
    // After detection, auto-advance to step 2 once location loads
    // We watch locationLoading in the UI to show feedback
    // Step advances happen via the button below

  };

  // Toggle violation selection
  const handleToggleViolation = (violationName) => {
    if (selectedViolations.includes(violationName)) {
      setSelectedViolations(prev => prev.filter(v => v !== violationName));
    } else {
      setSelectedViolations(prev => [...prev, violationName]);
    }
  };

  // Calculate totals and statistics
  const calculateTotalFine = () => {
    return selectedViolations.reduce((sum, v) => sum + (getViolationData(v)?.amount || 0), 0);
  };

  const determineOverallSeverity = () => {
    if (selectedViolations.length === 0) return 'NONE';
    
    const severities = selectedViolations.map(v => getViolationData(v)?.severity || 'LOW');
    if (severities.includes('HIGH')) return 'HIGH';
    if (severities.includes('MEDIUM')) return 'MEDIUM';
    return 'LOW';
  };

  const getSeverityBadgeColor = (severity) => {
    switch (severity) {
      case 'HIGH': return 'bg-red-500/10 border-red-500/30 text-red-400 glow-red';
      case 'MEDIUM': return 'bg-amber-500/10 border-amber-500/30 text-amber-400 glow-amber';
      case 'LOW': return 'bg-blue-500/10 border-blue-500/30 text-blue-400 glow-electric';
      default: return 'bg-slate-500/10 border-slate-500/30 text-slate-400';
    }
  };

  const toggleAccordionBlock = (block) => {
    setExpandedBlocks(prev => ({
      ...prev,
      [block]: !prev[block]
    }));
  };

  // Safe fetch cascade levels
  const countries = Object.keys(LOCATION_CASCADES);
  const states = LOCATION_CASCADES[selectedCountry] ? Object.keys(LOCATION_CASCADES[selectedCountry]) : [];
  const cities = LOCATION_CASCADES[selectedCountry]?.[selectedState] ? Object.keys(LOCATION_CASCADES[selectedCountry][selectedState]) : [];
  const areas = LOCATION_CASCADES[selectedCountry]?.[selectedState]?.[selectedCity] || [];

  // Filter violations matching vehicle type category (plus general 'All Vehicles' items)
  const getFilteredViolations = () => {
    return Object.keys(FINE_DATABASE).filter(key => {
      const data = getViolationData(key);
      const cat = data?.category || 'All Vehicles';
      if (cat === 'All Vehicles') return true;
      if (vehicleType === 'Two-Wheeler' && cat === 'Two-Wheeler') return true;
      if (vehicleType === 'Four-Wheeler (Private)' && cat === 'Four-Wheeler (Private)') return true;
      return true; // fallback, show all to give flexible sandbox control
    });
  };

  // Get aggregated teaching details for all selected violations
  // If multiple are selected, we present details for the first selected, or a combined view
  const getActiveTeachingViolation = () => {
    return selectedViolations[0] || "No Helmet"; // Fallback to No Helmet if empty
  };

  const activeTeachName = getActiveTeachingViolation();
  const teachingInfo = AI_TEACHING_BLOCKS[activeTeachName] || AI_TEACHING_BLOCKS["No Helmet"];

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 space-y-4 max-w-md lg:max-w-2xl mx-auto w-full select-none animate-fade-in">
      {/* Top Flag / Country Picker Chip */}
      <div className="glass-panel p-3 flex items-center justify-between border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none">{activeCountryConfig?.flag || '🇮🇳'}</span>
          <div>
            <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Active Country Context</span>
            <span className="text-xs font-extrabold text-slate-800 dark:text-white tracking-wide">
              {activeCountryConfig?.name || 'India'} ({activeCountryConfig?.legalSystem || 'MV Act 2019'})
            </span>
          </div>
        </div>
        <button
          onClick={() => setActiveScreen('countrySelect')}
          className="bg-electric/15 hover:bg-electric/25 border border-electric/30 hover:border-electric/50 text-electric font-extrabold px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-wider transition-all select-none"
        >
          Change Country
        </button>
      </div>

      {/* Wizard Progress Indicator bar */}
      <div className="glass-panel p-3 flex items-center justify-between">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-1.5 flex-1 last:flex-initial">
            <button
              onClick={() => step > s && setStep(s)}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                step === s 
                  ? 'bg-electric text-white glow-electric ring-4 ring-electric/10' 
                  : step > s 
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' 
                    : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400'
              }`}
            >
              {step > s ? <CheckCircle2 className="w-3.5 h-3.5" /> : s}
            </button>
            {s < 4 && (
              <div className={`h-[2px] flex-1 rounded-full ${
                step > s ? 'bg-emerald-500/30' : 'bg-slate-200 dark:bg-white/5'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* STEP 1: Location Setup */}
      {step === 1 && (
        <div className="glass-panel p-5 space-y-5 animate-fade-in">
          <div className="space-y-1 text-center">
            <h3 className="font-heading font-extrabold text-base uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Location Setup
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Traffic penalties differ significantly depending on state codes
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleAutoDetect}

              disabled={locationLoading}
              className={`py-3 px-4 rounded-xl border text-white font-bold text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-2 transition-all ${
                locationLoading
                  ? 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 opacity-70 cursor-not-allowed'
                  : 'bg-gradient-to-tr from-electric/25 to-blue-600/10 border-electric/40 hover:bg-electric/20 glow-electric'
              }`}
              id="auto-detect-loc-btn"
            >
              {locationLoading
                ? <RefreshCw className="w-5 h-5 text-electric animate-spin" />
                : <MapPin className="w-5 h-5 text-electric animate-bounce" />
              }
              <span className="text-slate-700 dark:text-slate-200">{locationLoading ? 'Detecting GPS…' : 'Auto Detect'}</span>

            </button>

            <button
              onClick={() => setSelectedState("Maharashtra")}
              className={`py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider flex flex-col items-center justify-center gap-2 transition-all ${
                selectedState === 'Maharashtra' 
                  ? 'bg-slate-200/50 dark:bg-white/10 border-slate-350 dark:border-white/20 text-slate-800 dark:text-white' 
                  : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <Scale className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              <span>Manual Select</span>
            </button>
          </div>


          {/* Show detected location feedback */}
          {location.isAutoDetected && !locationLoading && !locationError && (
            <div className="bg-electric/5 border border-electric/20 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-electric" />
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350">
                  📍 {location.city}, {location.area}, {location.state}
                </span>
              </div>
              <button
                onClick={() => { setSelectedState(location.state); setSelectedCity(location.city); setSelectedArea(location.area); setStep(2); }}
                className="text-[9px] font-extrabold text-electric uppercase tracking-wider hover:text-electric-glow transition-all"
              >
                Use This ›
              </button>
            </div>
          )}

          {locationError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-2.5">
              <span className="text-[10px] font-bold text-red-400 block">{locationError}</span>
            </div>
          )}


          <div className="h-[1px] bg-slate-200 dark:bg-white/5 my-2" />

          {/* Cascading dropdown selectors */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedState(LOCATION_CASCADES[e.target.value] ? Object.keys(LOCATION_CASCADES[e.target.value])[0] : '');
                }}
                className="w-full bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-white font-semibold focus:border-electric focus:outline-none transition-all"
              >
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">State</label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  const firstCity = LOCATION_CASCADES[selectedCountry]?.[e.target.value] ? Object.keys(LOCATION_CASCADES[selectedCountry][e.target.value])[0] : '';
                  setSelectedCity(firstCity);
                  const firstArea = LOCATION_CASCADES[selectedCountry]?.[e.target.value]?.[firstCity]?.[0] || '';
                  setSelectedArea(firstArea);
                }}
                className="w-full bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-white font-semibold focus:border-electric focus:outline-none transition-all"
                id="state-selector"
              >
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">City</label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  const firstArea = LOCATION_CASCADES[selectedCountry]?.[selectedState]?.[e.target.value]?.[0] || '';
                  setSelectedArea(firstArea);
                }}
                className="w-full bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-white font-semibold focus:border-electric focus:outline-none transition-all"
              >
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Area</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-xs text-slate-800 dark:text-white font-semibold focus:border-electric focus:outline-none transition-all"
              >
                {areas.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={handleConfirmLocation}
            className="w-full bg-gradient-to-r from-electric to-blue-600 hover:from-electric-glow hover:to-electric py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-1.5 transition-all mt-4"
          >
            <span>Proceed to Vehicle Type</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Vehicle Type */}
      {step === 2 && (
        <div className="glass-panel p-5 space-y-5 animate-fade-in">
          <div className="space-y-1 text-center">
            <h3 className="font-heading font-extrabold text-base uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Select Vehicle Type
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Rules and legal sections differ for heavy or private classes
            </p>
          </div>

          {/* Interactive Single-Select Pills */}
          <div className="grid grid-cols-2 gap-3" id="vehicle-type-container">
            {[
              'Two-Wheeler', 
              'Four-Wheeler (Private)', 
              'Commercial Vehicle', 
              'Heavy Vehicle'
            ].map((type) => (
              <button
                key={type}
                onClick={() => setVehicleType(type)}
                className={`py-4 px-3 rounded-2xl border text-xs font-bold text-center flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                  vehicleType === type
                    ? 'bg-electric/15 border-electric/60 text-white shadow-lg glow-electric shadow-electric/15'
                    : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                <Car className={`w-6 h-6 transition-all ${vehicleType === type ? 'text-electric animate-pulse' : 'text-slate-500'}`} />
                <span className="leading-tight">{type}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 bg-gradient-to-r from-electric to-blue-600 hover:from-electric-glow hover:to-electric py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Next: Violations</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Violation Selector */}
      {step === 3 && (
        <div className="glass-panel p-5 space-y-5 animate-fade-in">
          <div className="space-y-1 text-center">
            <h3 className="font-heading font-extrabold text-base uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Select Violations
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Choose one or more alleged offenses to generate fine calculation
            </p>
          </div>

          {/* Multi-Select Chips */}
          <div className="flex flex-wrap gap-2 justify-center max-h-[42vh] overflow-y-auto pr-1" id="violations-container">
            {getFilteredViolations().map((violation) => {
              const isActive = selectedViolations.includes(violation);
              return (
                <button
                  key={violation}
                  onClick={() => handleToggleViolation(violation)}
                  className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                    isActive 
                      ? 'bg-electric/20 border-electric/60 text-white font-bold glow-electric' 
                      : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-850 dark:hover:text-slate-200'
                  }`}
                >
                  {violation}
                </button>
              );
            })}
          </div>

          <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-3 rounded-2xl flex items-start gap-2.5">
            <Info className="w-4 h-4 text-electric shrink-0 mt-0.5" />
            <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
              You can select multiple violations. The AI assistant below will break down the highest severity risk first.
            </span>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (selectedViolations.length === 0) {
                  alert('Please select at least one violation to proceed.');
                  return;
                }
                setStep(4);
              }}
              disabled={selectedViolations.length === 0}
              className="flex-1 bg-gradient-to-r from-electric to-blue-600 hover:from-electric-glow hover:to-electric py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50 flex items-center justify-center gap-1.5 transition-all"
              id="confirm-violations-btn"
            >
              <span>Generate Breakdown</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 & 5: Challan Breakdown Card & AI Teaching Accordions */}
      {step === 4 && (
        <div className="space-y-4 animate-fade-in">
          {/* Breakdown Table panel */}
          <div className="glass-panel p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-electric" />
                <h3 className="font-heading font-extrabold text-sm uppercase text-slate-800 dark:text-slate-200 tracking-wider">
                  Challan Estimation
                </h3>
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-wider py-0.5 px-2 rounded-full border ${getSeverityBadgeColor(determineOverallSeverity())}`}>
                {determineOverallSeverity()} SEVERITY
              </span>
            </div>

            {/* Selected Location Banner Tag */}
            <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-2.5 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-electric" />
                <span className="text-slate-700 dark:text-slate-300 font-semibold">Target Area: <strong>{location.area}, {location.city} ({location.state})</strong></span>
              </div>
              {isOffline && (
                <span className="text-red-650 dark:text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded uppercase text-[8px]">
                  CACHED
                </span>
              )}
            </div>

            {/* Travel Mode Differential warning */}
            {isTravelActive && (
              <div className="bg-amber-500/5 border border-amber-500/20 text-amber-605 dark:text-amber-400 p-2.5 rounded-xl flex items-start gap-2 text-[10px] leading-relaxed">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-amber-700 dark:text-amber-300">Regional Registration Differential Applied</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Registered Maharashtra vehicle subjected to {location.state} Out-Of-State Road Tax laws (11 month threshold applies).</span>
                </div>
              </div>
            )}

            {/* Fine breakdown table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left" id="challan-breakdown-table">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/5 text-[9px] uppercase tracking-wider font-bold text-slate-500">
                    <th className="py-2">Violation</th>
                    <th className="py-2">Legal Section</th>
                    <th className="py-2 text-right">Fine Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                  {selectedViolations.map((violation) => {
                    const data = getViolationData(violation);
                    return (
                      <tr key={violation} className="text-slate-700 dark:text-slate-200">
                        <td className="py-3 font-bold text-slate-800 dark:text-slate-300">{violation}</td>
                        <td className="py-3 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{data?.section}</td>
                        <td className="py-3 text-right font-mono font-bold text-slate-850 dark:text-white">{currencySymbol}{data?.amount.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-300 dark:border-white/10 font-bold">
                    <td colSpan={2} className="py-3 text-slate-500 dark:text-slate-400 uppercase tracking-wider">Estimated Total</td>
                    <td className="py-3 text-right text-base text-electric font-heading font-extrabold" id="estimated-total-fine">
                      {currencySymbol}{calculateTotalFine().toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* AI Live Currency Conversion Strip */}
            <CurrencyConversionStrip amountInCurrentCurrency={calculateTotalFine()} currentCountry={country} />

            {/* Multiple violations legal warning banner */}
            {selectedViolations.length >= 2 && (
              <div className="bg-red-500/10 border border-red-500/25 p-3 rounded-2xl flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400 block uppercase tracking-wider">
                    High Risk: Compound Violations
                  </span>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-normal font-semibold">
                    Accumulating 2+ concurrent violations allows the local RTO/Police magistrate to place your driving license on a <strong>3-month suspension</strong> block. Pay immediate or contest details.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(3)}
              className="w-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider border border-slate-200 dark:border-white/10 transition-all text-center"
            >
              Modify Violations
            </button>
          </div>

          {/* AI TEACHING CARD (Screen 5) */}
          <div className="glass-panel p-4 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/5">
              <Scale className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400 animate-pulse" />
              <div>
                <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  AI Compliance Mentor
                </h4>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  Analyzing: {activeTeachName}
                </p>
              </div>
            </div>

            {/* Accordion Blocks */}
            <div className="space-y-2">
              {/* Block 1: Real Example */}
              <div className="border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleAccordionBlock('example')}
                  className="w-full bg-slate-100 dark:bg-white/5 py-3 px-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Real Example Scenario
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${expandedBlocks.example ? 'rotate-180' : ''}`} />
                </button>
                {expandedBlocks.example && (
                  <div className="p-4 bg-slate-50 dark:bg-navy-950/40 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-white/5 animate-slide-up">
                    <p className="italic bg-indigo-550/5 p-3 border-l-2 border-indigo-500 rounded-r-xl font-semibold">
                      "{teachingInfo.realExample}"
                    </p>
                  </div>
                )}
              </div>

              {/* Block 2: What Happens If You Don't Pay */}
              <div className="border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleAccordionBlock('whatIf')}
                  className="w-full bg-slate-100 dark:bg-white/5 py-3 px-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Timeline: If You Don't Pay
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${expandedBlocks.whatIf ? 'rotate-180' : ''}`} />
                </button>
                {expandedBlocks.whatIf && (
                  <div className="p-4 bg-slate-50 dark:bg-navy-950/40 text-[11px] text-slate-700 dark:text-slate-300 space-y-3.5 border-t border-slate-200 dark:border-white/5 animate-slide-up">
                    <div className="relative border-l-2 border-slate-300 dark:border-slate-700 pl-4 space-y-4 py-1">
                      {Object.keys(teachingInfo.whatIfNoPay).map((timeFrame) => (
                        <div key={timeFrame} className="relative">
                          {/* Dot on line */}
                          <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-slate-50 dark:border-navy-900" />
                          <span className="block font-bold text-slate-800 dark:text-white text-[10px] uppercase tracking-wider mb-0.5">{timeFrame}</span>
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-semibold">{teachingInfo.whatIfNoPay[timeFrame]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Block 3: Repeat Offense Consequences */}
              <div className="border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleAccordionBlock('repeat')}
                  className="w-full bg-slate-100 dark:bg-white/5 py-3 px-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-red-500 dark:text-red-400" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Repeat Offense Consequences
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${expandedBlocks.repeat ? 'rotate-180' : ''}`} />
                </button>
                {expandedBlocks.repeat && (
                  <div className="p-4 bg-slate-50 dark:bg-navy-950/40 text-[11px] text-red-700 dark:text-red-350 leading-relaxed border-t border-slate-200 dark:border-white/5 animate-slide-up">
                    <div className="bg-red-500/5 p-3 rounded-xl border border-red-500/10 font-semibold">
                      {teachingInfo.repeatOffense}
                    </div>
                  </div>
                )}
              </div>

              {/* Block 4: Where Your Money Goes */}
              <div className="border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleAccordionBlock('moneyGoes')}
                  className="w-full bg-slate-100 dark:bg-white/5 py-3 px-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Where Your Fine Money Goes
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${expandedBlocks.moneyGoes ? 'rotate-180' : ''}`} />
                </button>
                {expandedBlocks.moneyGoes && (
                  <div className="p-4 bg-slate-50 dark:bg-navy-950/40 text-[11px] text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-white/5 animate-slide-up">
                    <ul className="space-y-2 list-inside font-semibold">
                      {teachingInfo.whereMoneyGoes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-emerald-500 dark:text-emerald-400 font-extrabold text-sm select-none shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
