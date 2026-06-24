import React, { useState, useEffect } from 'react';
import { Search, MapPin, Check, ArrowRight, Globe, Compass, Star } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';
import { useAppState } from '../context/AppStateContext';

export default function CountrySelectorScreen() {
  const { countries, country, region, changeCountry } = useGlobalContext();
  const { setActiveScreen } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null); // The country object currently chosen in the flow
  const [regionsList, setRegionsList] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  
  // Confirmation card state
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Load regions dynamically based on selected country
  useEffect(() => {
    if (selectedCountry) {
      const loadRegions = async () => {
        try {
          let data;
          if (selectedCountry.id === 'IN') {
            data = await import('../data/regions/india.json');
          } else if (selectedCountry.id === 'AE') {
            data = await import('../data/regions/uae.json');
          } else if (selectedCountry.id === 'US') {
            data = await import('../data/regions/usa.json');
          } else if (selectedCountry.id === 'GB') {
            data = await import('../data/regions/uk.json');
          } else if (selectedCountry.id === 'DE') {
            data = await import('../data/regions/germany.json');
          } else if (selectedCountry.id === 'AU') {
            data = await import('../data/regions/australia.json');
          }
          setRegionsList(data.default || []);
          setSelectedRegion(data.default ? data.default[0] : '');
        } catch (err) {
          console.error("Failed to load region file", err);
          setRegionsList([]);
        }
      };
      loadRegions();
    }
  }, [selectedCountry]);

  // Filter countries by search query
  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.legalSystem.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (c) => {
    setSelectedCountry(c);
  };

  const handleConfirmSelect = () => {
    if (selectedCountry) {
      setShowConfirmModal(true);
    }
  };

  const handleFinalConfirm = () => {
    if (selectedCountry) {
      changeCountry(selectedCountry.id, selectedRegion);
      setShowConfirmModal(false);
      
      // Auto redirect to dashboard after selection
      setTimeout(() => {
        setActiveScreen('dashboard');
      }, 500);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 space-y-5 max-w-md lg:max-w-4xl mx-auto w-full animate-fade-in select-none">
      
      {/* HEADER SECTION */}
      <div className="text-center space-y-2 mt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-electric/10 border border-electric/25 text-[10px] font-extrabold uppercase tracking-widest text-electric leading-none">
          <Globe className="w-3 h-3 animate-spin-slow" />
          <span>Multi-Country Penalty Registry</span>
        </div>
        <h1 className="text-2xl xs:text-3xl font-heading font-black text-slate-850 dark:text-white leading-tight">
          Select Country & Region
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-md mx-auto">
          Laws, speed limits, drive-sides, and AI legal explanations automatically adapt to your jurisdiction.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="relative">
        <input 
          type="text"
          placeholder="Search country, act, or ISO (e.g. UAE, StVO, US)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-semibold text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none shadow-sm dark:shadow-none transition-all duration-300"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-450 hover:text-slate-800 uppercase"
          >
            Clear
          </button>
        )}
      </div>

      {/* COUNTRIES GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
        {filteredCountries.map((c) => {
          const isChosen = selectedCountry?.id === c.id;
          const isCurrentActive = country === c.id && !selectedCountry;
          
          return (
            <div
              key={c.id}
              onClick={() => handleCardClick(c)}
              className={`p-4 border rounded-3xl cursor-pointer flex flex-col justify-between h-[150px] relative overflow-hidden transition-all duration-300 select-none group ${
                isChosen
                  ? 'border-electric bg-electric/5 ring-2 ring-electric/30'
                  : isCurrentActive
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15'
              }`}
            >
              {/* Flag Badge with Hover Scale */}
              <div className="flex justify-between items-start">
                <span className="text-3xl filter drop-shadow-md group-hover:scale-115 transition-transform duration-300 select-none pointer-events-none">
                  {c.flag}
                </span>
                
                {isChosen && (
                  <span className="bg-electric text-white p-1 rounded-full shadow-md animate-scale-up">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
                {isCurrentActive && !isChosen && (
                  <span className="bg-emerald-500 text-white text-[7px] font-extrabold uppercase px-1.5 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </div>

              {/* Country Meta text */}
              <div className="space-y-0.5 z-10 relative">
                <h3 className="text-xs font-black text-slate-850 dark:text-white uppercase leading-none">
                  {c.name}
                </h3>
                <span className="text-[8px] font-extrabold text-slate-400 dark:text-slate-500 uppercase block tracking-wider truncate">
                  {c.legalSystem}
                </span>
                <span className="text-[8px] font-bold text-slate-450 dark:text-slate-550 block mt-1">
                  Drive: {c.driveSide} • {c.currency} ({c.currencySymbol})
                </span>
              </div>
              
              {/* Subtle visual color accents */}
              <div className="absolute right-0 bottom-0 w-2 h-2 opacity-20" style={{ backgroundColor: c.color }} />
            </div>
          );
        })}

        {/* More coming soon card */}
        <div className="p-4 border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/20 rounded-3xl flex flex-col justify-between h-[150px] opacity-60">
          <span className="text-3xl">🌍</span>
          <div className="space-y-0.5">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-600 uppercase leading-none">
              More Countries
            </h3>
            <span className="text-[8px] font-black bg-slate-200 dark:bg-white/5 text-slate-500 px-1.5 py-0.5 rounded w-max block mt-1.5 uppercase">
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* REGION SELECTOR (Dynamic Cascade Panel) */}
      {selectedCountry && (
        <div className="glass-panel p-5 space-y-4 animate-slide-up border-electric/25 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-electric/5 rounded-full blur-lg pointer-events-none" />
          
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/5">
            <MapPin className="w-4 h-4 text-electric" />
            <h4 className="text-xs font-heading font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Choose Jurisdiction State/Province
            </h4>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                Region / State in {selectedCountry.name}
              </label>
              
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-3.5 text-xs text-slate-800 dark:text-white focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none font-bold uppercase tracking-wider"
              >
                {regionsList.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleConfirmSelect}
              className="w-full bg-electric hover:bg-electric-glow text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-electric/15 flex items-center justify-center gap-1.5 transition-all select-none active:scale-[0.98]"
            >
              <span>Confirm Location Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* CONFIRMATION CARD DIALOG (Success Modal) */}
      {showConfirmModal && selectedCountry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-modal max-w-sm w-full p-6 border border-slate-200 dark:border-white/10 animate-scale-up space-y-4 shadow-2xl">
            
            <div className="flex flex-col items-center text-center space-y-3.5">
              <div className="bg-emerald-500/15 p-4 rounded-full text-emerald-505 animate-bounce-slow">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              
              <div className="space-y-1">
                <h3 className="font-heading font-black text-slate-850 dark:text-white text-base tracking-wide uppercase">
                  Location Verified
                </h3>
                <span className="text-2xl filter drop-shadow block mt-1.5 leading-none">
                  {selectedCountry.flag} {selectedCountry.name}
                </span>
                <span className="text-[10px] bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-extrabold uppercase px-2 py-0.5 rounded block mt-1.5">
                  {selectedRegion} Province
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal font-semibold max-w-[260px]">
                All traffic codes, penal acts, currency valuations ({selectedCountry.currencySymbol} {selectedCountry.currency}), drive-sides ({selectedCountry.driveSide} Side), and AI legal engines will adapt to {selectedCountry.name} metrics.
              </p>
            </div>

            <div className="flex gap-3.5 pt-2">
              <button
                onClick={handleFinalConfirm}
                className="flex-grow bg-electric hover:bg-electric-glow text-white font-black py-3 rounded-xl text-xs uppercase tracking-widest transition-all select-none shadow-lg shadow-electric/15 active:scale-[0.98]"
                id="confirm-global-location-btn"
              >
                Confirm & Continue
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
