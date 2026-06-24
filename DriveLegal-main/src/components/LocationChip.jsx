import React, { useState } from 'react';
import { MapPin, RefreshCw, AlertCircle, ChevronDown } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

/**
 * LocationChip — Reusable location display chip with:
 * - Auto-detect via browser Geolocation + Nominatim reverse geocoding
 * - Loading spinner while fetching
 * - Error state with manual fallback dropdown
 * - Shows: 📍 Area, City, State
 *
 * Props:
 *   compact   — if true, show only city+state abbreviation (dashboard header style)
 *   showLabel — if true, show the label text before the chip
 */
export default function LocationChip({ compact = false, showLabel = false, className = '' }) {
  const { location, locationLoading, locationError, detectLocation, setLocation } = useAppState();

  const [showFallback, setShowFallback] = useState(false);
  const [manualState, setManualState] = useState(location.state || 'Karnataka');
  const [manualCity, setManualCity] = useState(location.city || 'Bengaluru');

  const FALLBACK_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Chandigarh', 'Puducherry', 'Jammu & Kashmir', 'Ladakh'
  ];

  const handleManualSave = () => {
    setLocation(prev => ({
      ...prev,
      state: manualState,
      city: manualCity,
      area: manualCity,
      isAutoDetected: false
    }));
    setShowFallback(false);
  };

  const handleRefresh = () => {
    setShowFallback(false);
    detectLocation();
  };

  // ─── Compact chip (used in dashboard header, just city + state abbrev) ────
  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={locationLoading ? undefined : (locationError ? () => setShowFallback(!showFallback) : handleRefresh)}
          title={locationLoading ? 'Detecting location…' : locationError ? 'Location unavailable — click to set manually' : `📍 ${location.area}, ${location.city}, ${location.state}`}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-extrabold tracking-wider transition-all select-none ${
            locationLoading
              ? 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400'
              : locationError
              ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/15'
              : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-350 hover:border-electric/30 hover:bg-electric/5'
          }`}
        >
          {locationLoading ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-electric" />
          ) : locationError ? (
            <AlertCircle className="w-3.5 h-3.5" />
          ) : (
            <MapPin className="w-3.5 h-3.5 text-electric-glow animate-pulse" />
          )}
          <span>
            {locationLoading
              ? 'Detecting…'
              : locationError
              ? 'Set Location'
              : `${location.city.toUpperCase()}${location.area && location.area !== location.city ? `, ${location.area.toUpperCase()}` : ''}, ${location.state.substring(0, 2).toUpperCase()}`}
          </span>
          {(locationError || !locationLoading) && (
            <ChevronDown className="w-3 h-3 opacity-50" />
          )}
        </button>

        {/* Manual Fallback Dropdown */}
        {showFallback && (
          <>
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => setShowFallback(false)}
            />
            <div className="absolute right-0 mt-2 w-64 z-50 glass-modal p-3 shadow-2xl rounded-2xl border border-slate-200 dark:border-white/10 animate-fade-in space-y-2.5">
              <div className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 pb-1.5 border-b border-slate-150 dark:border-white/5">
                📍 Set Location Manually
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">State</label>
                <select
                  value={manualState}
                  onChange={e => setManualState(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/10 rounded-xl py-2 px-2.5 text-[10px] text-slate-800 dark:text-white font-semibold focus:outline-none focus:border-electric"
                >
                  {FALLBACK_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">City</label>
                <input
                  type="text"
                  value={manualCity}
                  onChange={e => setManualCity(e.target.value)}
                  placeholder="e.g. Jabalpur"
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 px-2.5 text-[10px] text-slate-800 dark:text-white font-semibold placeholder:text-slate-400 focus:outline-none focus:border-electric"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleRefresh}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] font-bold text-electric uppercase tracking-wider hover:bg-electric/10 transition-all"
                >
                  <RefreshCw className="w-3 h-3" /> Retry GPS
                </button>
                <button
                  onClick={handleManualSave}
                  className="flex-1 py-2 rounded-xl bg-electric text-white text-[9px] font-extrabold uppercase tracking-wider shadow-md shadow-electric/20 hover:bg-electric-glow transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // ─── Full chip (used in screen headers, shows full area/city/state) ────────
  return (
    <div className={`relative ${className}`}>
      <div className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border transition-all ${
        locationLoading
          ? 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10'
          : locationError
          ? 'bg-red-500/10 border-red-500/25'
          : 'bg-electric/5 border-electric/20'
      }`}>
        {locationLoading ? (
          <RefreshCw className="w-4 h-4 animate-spin text-electric shrink-0" />
        ) : locationError ? (
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
        ) : (
          <MapPin className="w-4 h-4 text-electric animate-pulse shrink-0" />
        )}

        <div className="min-w-0">
          {locationLoading ? (
            <div className="space-y-1">
              <div className="h-2 w-28 bg-slate-200 dark:bg-white/10 rounded-full animate-pulse" />
              <div className="h-1.5 w-20 bg-slate-200 dark:bg-white/10 rounded-full animate-pulse" />
            </div>
          ) : locationError ? (
            <div>
              <span className="text-[10px] font-extrabold text-red-400 block">Location Unavailable</span>
              <span className="text-[9px] text-red-400/70 block">{locationError}</span>
            </div>
          ) : (
            <div>
              <span className="text-[11px] font-extrabold text-slate-800 dark:text-white block leading-tight">
                📍 {location.city}{location.area && location.area !== location.city ? `, ${location.area}` : ''}, {location.state}
              </span>
              <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block">
                {location.isAutoDetected ? '✦ GPS Detected' : '✦ Manual'}
              </span>
            </div>
          )}
        </div>

        {/* Refresh / Set Manual button */}
        <button
          onClick={locationLoading ? undefined : (locationError ? () => setShowFallback(!showFallback) : detectLocation)}
          className={`ml-auto shrink-0 p-1.5 rounded-xl transition-all ${
            locationLoading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-slate-200/60 dark:hover:bg-white/10 active:scale-95 cursor-pointer'
          } ${locationError ? 'text-red-400' : 'text-electric'}`}
          title={locationLoading ? 'Detecting…' : locationError ? 'Set location manually' : 'Re-detect location'}
        >
          {locationLoading
            ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            : locationError
            ? <ChevronDown className="w-3.5 h-3.5" />
            : <RefreshCw className="w-3.5 h-3.5" />
          }
        </button>
      </div>

      {/* Manual Fallback Dropdown (Full chip) */}
      {showFallback && !locationLoading && (
        <>
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setShowFallback(false)}
          />
          <div className="absolute left-0 right-0 mt-2 z-50 glass-modal p-4 shadow-2xl rounded-2xl border border-slate-200 dark:border-white/10 animate-fade-in space-y-3">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 pb-1.5 border-b border-slate-150 dark:border-white/5">
              📍 Set Location Manually
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">State</label>
              <select
                value={manualState}
                onChange={e => setManualState(e.target.value)}
                className="w-full bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/10 rounded-xl py-2 px-2.5 text-[10px] text-slate-800 dark:text-white font-semibold focus:outline-none focus:border-electric"
              >
                {FALLBACK_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">City / Area</label>
              <input
                type="text"
                value={manualCity}
                onChange={e => setManualCity(e.target.value)}
                placeholder="e.g. Jabalpur"
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 px-2.5 text-[10px] text-slate-800 dark:text-white font-semibold placeholder:text-slate-400 focus:outline-none focus:border-electric"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] font-bold text-electric uppercase tracking-wider hover:bg-electric/10 transition-all"
              >
                <RefreshCw className="w-3 h-3" /> Retry GPS
              </button>
              <button
                onClick={handleManualSave}
                className="flex-1 py-2 rounded-xl bg-electric text-white text-[9px] font-extrabold uppercase tracking-wider shadow-md shadow-electric/20 hover:bg-electric-glow transition-all"
              >
                Save Location
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
