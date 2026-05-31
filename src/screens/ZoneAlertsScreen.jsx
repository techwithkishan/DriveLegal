import React, { useState } from 'react';
import { 
  MapPin, AlertTriangle, AlertCircle, ShieldAlert, ArrowLeft, 
  Map, Eye, X, Filter, Navigation, Info
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function ZoneAlertsScreen() {
  const { setActiveScreen } = useAppState();
  const [filter, setFilter] = useState('All');
  const [selectedZone, setSelectedZone] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);

  // 5 demo zones with coordinates for mock map positioning
  const zones = [
    { 
      id: 'silk_board', 
      name: 'Silk Board Junction', 
      risk: 'HIGH', 
      type: 'High Risk', 
      desc: 'Extensive camera enforcement for lane discipline & speed violation.', 
      penalty: '₹1,000 for lane splitting',
      coords: { x: '45%', y: '65%' },
      color: 'red'
    },
    { 
      id: 'koramangala', 
      name: 'Koramangala 80ft Road', 
      risk: 'MODERATE', 
      type: 'Parking Zones', 
      desc: 'Strict no-parking zone with dynamic towing active.', 
      penalty: '₹1,650 towing fee + fine',
      coords: { x: '35%', y: '40%' },
      color: 'amber'
    },
    { 
      id: 'hosur_road', 
      name: 'Hosur Road Elevated Expressway', 
      risk: 'HIGH', 
      type: 'Accident Zones', 
      desc: 'Accident-prone zone with radar speed gun monitors.', 
      penalty: '₹1,000 speeding (>80km/h)',
      coords: { x: '75%', y: '80%' },
      color: 'red'
    },
    { 
      id: 'indiranagar', 
      name: 'Indiranagar 12th Main', 
      risk: 'MODERATE', 
      type: 'School Zones', 
      desc: 'School hours speed limit active (25 km/h) & silent zone.', 
      penalty: '₹1,000 speeding / ₹500 honking',
      coords: { x: '60%', y: '30%' },
      color: 'blue'
    },
    { 
      id: 'whitefield', 
      name: 'Whitefield ITPL Main Road', 
      risk: 'LOW', 
      type: 'All', 
      desc: 'Routine document check post active near key business parks.', 
      penalty: 'Random checks for PUC & RC',
      coords: { x: '80%', y: '50%' },
      color: 'emerald'
    }
  ];

  const filterPills = [
    { label: 'All', value: 'All' },
    { label: 'High Risk', value: 'High Risk' },
    { label: 'Accident Zones', value: 'Accident Zones' },
    { label: 'School Zones', value: 'School Zones' },
    { label: 'Parking Zones', value: 'Parking Zones' }
  ];

  // Filtered zones calculation
  const filteredZones = zones.filter(z => {
    if (filter === 'All') return true;
    if (filter === 'High Risk') return z.risk === 'HIGH';
    return z.type === filter;
  });

  const handleOpenMap = (zone) => {
    setSelectedZone(zone);
    setShowMapModal(true);
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'HIGH':
        return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'MODERATE':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-emerald-500" />;
    }
  };

  const getRiskClasses = (risk) => {
    switch (risk) {
      case 'HIGH':
        return 'border-l-4 border-l-red-500 animate-pulse-left bg-red-500/5 border-red-500/10';
      case 'MODERATE':
        return 'border-l-4 border-l-amber-500 bg-amber-500/5 border-amber-500/10';
      default:
        return 'border-l-4 border-l-emerald-500 bg-emerald-500/5 border-emerald-500/10';
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveScreen('dashboard')}
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="text-lg font-heading font-extrabold text-slate-800 dark:text-white tracking-wide">
              Smart Zone Alerts
            </h3>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              Real-time enforcement & risk zones near you
            </span>
          </div>
        </div>
        <button
          onClick={() => handleOpenMap(null)}
          className="p-2 rounded-xl bg-electric/15 border border-electric/25 hover:bg-electric/25 text-electric-glow transition-all flex items-center gap-1.5 text-xs font-bold"
        >
          <Map className="w-4 h-4" />
          <span>Full Map</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none">
        <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
        {filterPills.map(pill => (
          <button
            key={pill.value}
            onClick={() => setFilter(pill.value)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase transition-all duration-300 shrink-0 ${
              filter === pill.value 
                ? 'bg-electric text-white shadow-md shadow-electric/20'
                : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Zones List */}
      <div className="space-y-3 flex-1 overflow-y-auto">
        {filteredZones.length > 0 ? (
          filteredZones.map((zone, idx) => (
            <div 
              key={zone.id}
              className={`glass-panel p-4 flex flex-col justify-between gap-3 border transition-all hover:scale-[1.01] ${getRiskClasses(zone.risk)}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    {getRiskIcon(zone.risk)}
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="text-xs font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                      <span>{zone.name}</span>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded font-extrabold tracking-wide uppercase ${
                        zone.risk === 'HIGH' ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
                        zone.risk === 'MODERATE' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' :
                        'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {zone.risk} Risk
                      </span>
                    </h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {zone.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action and fine alert */}
              <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/5 pt-2 text-[10px] font-bold">
                <span className="text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Penalty: {zone.penalty}</span>
                </span>
                
                <button
                  onClick={() => handleOpenMap(zone)}
                  className="text-electric hover:text-electric-glow transition-all flex items-center gap-1 uppercase tracking-wider text-[9px] font-extrabold"
                >
                  <span>View on Map</span>
                  <Navigation className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-panel p-8 text-center text-slate-500 dark:text-slate-400 space-y-2">
            <Info className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-semibold">No enforcement zones match this category near you.</p>
          </div>
        )}
      </div>

      {/* Styled Mock Map Modal Overlay */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-modal max-w-sm w-full p-5 border border-slate-200 dark:border-white/10 animate-scale-up space-y-4">
            
            {/* Modal Title */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-heading font-extrabold text-slate-800 dark:text-slate-200 text-xs tracking-wider uppercase block">
                  {selectedZone ? 'Enforcement Location' : 'All Enforcement Zones'}
                </span>
                <h4 className="text-xs text-slate-500 dark:text-slate-400 font-bold truncate max-w-[240px]">
                  {selectedZone ? selectedZone.name : 'Bengaluru Metropolitan Area'}
                </h4>
              </div>
              <button 
                onClick={() => setShowMapModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/15 text-slate-500 dark:text-slate-400 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Premium Interactive Vector Styled Map Div */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex flex-col justify-end">
              {/* Map background grid line visual */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-35" />
              
              {/* Custom SVG road lines */}
              <svg className="absolute inset-0 w-full h-full opacity-30 stroke-slate-500 stroke-[2] fill-none">
                {/* Horizontal main artery */}
                <path d="M 0 100 Q 150 150 400 120" />
                <path d="M 0 105 Q 150 155 400 125" className="stroke-dashed stroke-[1]" />
                
                {/* Diagonal highway */}
                <path d="M 50 0 L 350 400" />
                <path d="M 55 0 L 355 400" className="stroke-dashed stroke-[1]" />

                {/* Circular ring road */}
                <circle cx="200" cy="200" r="120" className="stroke-slate-600 stroke-[1.5]" />
              </svg>

              {/* Pins representation */}
              {zones.map(z => {
                // If a specific zone is selected, highlight only that one (or show all with full opacity)
                const isHighlighted = !selectedZone || selectedZone.id === z.id;
                
                return (
                  <div
                    key={z.id}
                    className="absolute flex flex-col items-center group transition-all duration-300"
                    style={{ 
                      left: z.coords.x, 
                      top: z.coords.y, 
                      transform: 'translate(-50%, -100%)',
                      opacity: isHighlighted ? 1 : 0.25,
                      scale: isHighlighted ? '1.1' : '0.85'
                    }}
                  >
                    {/* Glowing pulse ring */}
                    <span className={`absolute top-2 w-7 h-7 rounded-full opacity-60 animate-ping ${
                      z.risk === 'HIGH' ? 'bg-red-500' : 
                      z.risk === 'MODERATE' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    
                    {/* Glowing pin point */}
                    <div className={`p-1.5 rounded-full border border-white/20 text-white shadow-lg ${
                      z.risk === 'HIGH' ? 'bg-red-500 shadow-red-500/50' : 
                      z.risk === 'MODERATE' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-emerald-500 shadow-emerald-500/50'
                    }`}>
                      <MapPin className="w-3.5 h-3.5 fill-current" />
                    </div>

                    {/* Pop-up tooltip for selected/hovered pins */}
                    {isHighlighted && (
                      <div className="mt-1 bg-slate-900/90 border border-slate-700/80 rounded-lg py-1 px-2 text-[8px] font-bold text-white whitespace-nowrap tracking-wide select-none shadow-md">
                        {z.name.split(' ')[0]}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Map Footer status overlay */}
              <div className="relative z-10 m-2 p-2 rounded-xl bg-slate-950/80 backdrop-blur border border-slate-800 flex items-center justify-between text-[9px] text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-electric-glow animate-pulse" />
                  <span>GPS Synced: Bengaluru Area</span>
                </span>
                <span className="font-mono text-emerald-400 font-extrabold uppercase">Live Radar Active</span>
              </div>
            </div>

            {/* Bottom details block inside map modal */}
            {selectedZone && (
              <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-3 rounded-2xl space-y-2">
                <h5 className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                  <ShieldAlert className={`w-4 h-4 ${selectedZone.risk === 'HIGH' ? 'text-red-500' : 'text-amber-500'}`} />
                  <span>{selectedZone.name} Details</span>
                </h5>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                  {selectedZone.desc}
                </p>
                <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-2 rounded-xl text-[10px] font-bold flex items-center gap-1.5 mt-1">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Fines: {selectedZone.penalty}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Styled css rule for custom animated border */}
      <style>{`
        @keyframes borderPulse {
          0%, 100% { border-left-color: rgba(239, 68, 68, 1); }
          50% { border-left-color: rgba(239, 68, 68, 0.3); }
        }
        .animate-pulse-left {
          animation: borderPulse 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
