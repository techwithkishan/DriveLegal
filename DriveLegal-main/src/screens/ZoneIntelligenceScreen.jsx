import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, MapPin, ShieldAlert, AlertTriangle, AlertCircle, 
  Map, Eye, X, Compass, Activity, Shield, Bot, Info, Navigation
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function ZoneIntelligenceScreen() {
  const { setActiveScreen } = useAppState();
  const [selectedZone, setSelectedZone] = useState(null);
  
  // Staggered grid load animation
  const [animateGrid, setAnimateGrid] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setAnimateGrid(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Labeled hotspot zones mapping to grid coordinates (row, col in 0-indexed 8x8)
  const hotspots = [
    {
      id: 'silk_board',
      name: 'Silk Board Junction',
      row: 5,
      col: 4,
      challans: 847,
      risk: 'CRITICAL',
      colorClass: 'bg-red-700 hover:bg-red-800 border-red-500 shadow-lg shadow-red-500/25',
      label: 'Silk Board',
      marker: '🔴',
      topViolation: 'Signal Jumping (412)',
      peakHours: '8–10 AM, 6–8 PM',
      cameras: 4,
      accidents: 7,
      action: 'Increase patrol units between 6–9 AM.'
    },
    {
      id: 'mg_road',
      name: 'MG Road Boulevard',
      row: 2,
      col: 3,
      challans: 721,
      risk: 'CRITICAL',
      colorClass: 'bg-red-650 hover:bg-red-750 border-red-500 shadow-lg shadow-red-500/20',
      label: 'MG Road',
      marker: '🔴',
      topViolation: 'Wrong Parking (314)',
      peakHours: '12–3 PM, 7–10 PM',
      cameras: 6,
      accidents: 4,
      action: 'Strict towing enforcement on parallel lanes.'
    },
    {
      id: 'koramangala',
      name: 'Koramangala 80ft Rd',
      row: 4,
      col: 2,
      challans: 412,
      risk: 'HIGH',
      colorClass: 'bg-amber-600 hover:bg-amber-700 border-amber-400 shadow-md shadow-amber-500/15',
      label: 'Koramangala',
      marker: '🪖',
      topViolation: 'No Helmet / Pillion (182)',
      peakHours: '9–11 AM, 5–8 PM',
      cameras: 3,
      accidents: 2,
      action: 'Deploy mobile helmet compliance barricades.'
    },
    {
      id: 'whitefield',
      name: 'Whitefield ITPL Rd',
      row: 3,
      col: 7,
      challans: 334,
      risk: 'HIGH',
      colorClass: 'bg-amber-550 hover:bg-amber-650 border-amber-400 shadow-md shadow-amber-500/15',
      label: 'Whitefield',
      marker: '🪖',
      topViolation: 'Over-Speeding (145)',
      peakHours: '8–10 AM, 6–9 PM',
      cameras: 5,
      accidents: 3,
      action: 'Active radar speed guns on ITPL main highway.'
    },
    {
      id: 'indiranagar',
      name: 'Indiranagar 100ft Rd',
      row: 1,
      col: 5,
      challans: 287,
      risk: 'HIGH',
      colorClass: 'bg-amber-500 hover:bg-amber-600 border-amber-400 shadow-md shadow-amber-500/10',
      label: 'Indiranagar',
      marker: '🪖',
      topViolation: 'Honking / Silencer (112)',
      peakHours: '8 PM–12 AM (Weekend)',
      cameras: 2,
      accidents: 1,
      action: 'Dynamic decibel checks and exhaust inspections.'
    },
    {
      id: 'ecity',
      name: 'Electronic City Tollway',
      row: 7,
      col: 6,
      challans: 198,
      risk: 'MODERATE',
      colorClass: 'bg-yellow-500/80 hover:bg-yellow-600/80 border-yellow-400',
      label: 'ECity Tollway',
      marker: '🪖',
      topViolation: 'Over-Speeding (84)',
      peakHours: '8–11 AM, 5–7 PM',
      cameras: 8,
      accidents: 2,
      action: 'Point-to-point average speed trackers sync.'
    },
    {
      id: 'jayanagar',
      name: 'Jayanagar 4th Block',
      row: 6,
      col: 1,
      challans: 143,
      risk: 'MODERATE',
      colorClass: 'bg-yellow-450 hover:bg-yellow-500 border-yellow-400',
      label: 'Jayanagar',
      marker: '🪖',
      topViolation: 'One-Way Violation (67)',
      peakHours: '10 AM–1 PM, 5–7 PM',
      cameras: 3,
      accidents: 0,
      action: 'Improve physical divider signs on complex lanes.'
    }
  ];

  // Set Silk Board Junction as default selected zone details on load
  useEffect(() => {
    setSelectedZone(hotspots[0]);
  }, []);

  // Generate 8x8 grid cells
  const renderGridCells = () => {
    const cells = [];
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Find if this cell matches any hotspots
        const hotspot = hotspots.find(h => h.row === row && h.col === col);
        
        let cellClass = "";
        let isSelected = false;

        if (hotspot) {
          cellClass = hotspot.colorClass;
          isSelected = selectedZone && selectedZone.id === hotspot.id;
        } else {
          // Generate semi-random background shades to simulate real density
          const densityVal = (row * col * 17) % 100;
          if (densityVal > 70) {
            cellClass = "bg-amber-500/20 border-amber-500/10 dark:bg-amber-500/10 hover:bg-amber-500/25";
          } else if (densityVal > 30) {
            cellClass = "bg-yellow-500/10 border-yellow-500/5 dark:bg-yellow-500/5 hover:bg-yellow-500/15";
          } else {
            cellClass = "bg-emerald-500/10 border-emerald-500/5 dark:bg-emerald-500/5 hover:bg-emerald-500/15";
          }
        }

        const animDelay = (row + col) * 20;

        cells.push(
          <div
            key={`${row}-${col}`}
            onClick={() => hotspot && setSelectedZone(hotspot)}
            className={`aspect-square border rounded-md transition-all duration-300 relative group flex items-center justify-center cursor-pointer ${cellClass} ${
              isSelected ? 'scale-105 ring-2 ring-white dark:ring-blue-500 border-white relative z-25' : ''
            } ${animateGrid ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            style={{ 
              transitionDelay: `${animDelay}ms`,
              animationDelay: `${animDelay}ms`
            }}
          >
            {/* Glowing pin dot markers on labeled zones */}
            {hotspot && (
              <span className={`absolute w-2 h-2 rounded-full bg-white animate-ping opacity-75`} />
            )}
            
            {/* Mini label overlay inside grid block on hover */}
            {hotspot && (
              <div className="absolute hidden group-hover:block -top-7 z-30 bg-slate-900 text-white border border-slate-700 text-[8px] py-0.5 px-1.5 rounded shadow-lg whitespace-nowrap">
                {hotspot.label} ({hotspot.challans})
              </div>
            )}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto relative overflow-hidden select-none bg-slate-900/10 dark:bg-navy-950/20 text-slate-800 dark:text-slate-100 animate-fade-in">
      
      {/* Header */}
      <div className="py-2 border-b border-slate-200 dark:border-white/5 mb-4">
        <h2 className="text-xl font-heading font-black text-slate-800 dark:text-white tracking-wide">
          Zone Intelligence Map
        </h2>
        <span className="text-[10px] text-blue-500 font-extrabold uppercase tracking-widest block">
          Bengaluru — Challan Density & Risk Zones
        </span>
      </div>

      {/* Heatmap Grid Vector Grid */}
      <div className="glass-panel p-4.5 space-y-3 mb-4">
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Map className="w-4 h-4 text-blue-500 animate-pulse" />
            Live Density Visual Grid (8x8)
          </span>
          <span className="font-mono text-emerald-500">Karnataka GPS Sync</span>
        </div>

        {/* The 8x8 grid container */}
        <div className="relative">
          {/* Main grid cells */}
          <div className="grid grid-cols-8 gap-1.5 p-1 bg-slate-950/20 rounded-xl border border-slate-800">
            {renderGridCells()}
          </div>

          {/* Local Area Floating Labels */}
          <div className="absolute inset-0 pointer-events-none z-10 text-[7px] font-mono font-black text-white/90 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <span className="absolute top-[32%] left-[4%]">JAYANAGAR 🪖</span>
            <span className="absolute top-[18%] left-[28%]">MG ROAD 🔴</span>
            <span className="absolute top-[68%] left-[45%]">SILK BOARD 🔴</span>
            <span className="absolute top-[44%] left-[78%]">WHITEFIELD 🪖</span>
          </div>
        </div>

        {/* Legend color scale */}
        <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-white/5">
          <span className="uppercase">Density Scale:</span>
          <div className="flex items-center gap-2 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-red-650 border border-red-500" />
              <span>&gt;500</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-amber-500 border border-amber-400" />
              <span>200-500</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-yellow-450 border border-yellow-400" />
              <span>100-200</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/20" />
              <span>&lt;100</span>
            </span>
          </div>
        </div>
      </div>

      {/* Selected Hotspot Detail Card */}
      {selectedZone && (
        <div className="glass-panel p-4.5 space-y-3 mb-4 animate-slide-up border-l-4 border-l-red-500 border-red-500/10">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm shrink-0 leading-none">{selectedZone.marker}</span>
              <h4 className="text-xs font-heading font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
                {selectedZone.name}
              </h4>
            </div>
            <span className={`text-[8px] px-2 py-0.5 rounded font-extrabold uppercase tracking-wider ${
              selectedZone.risk === 'CRITICAL' ? 'bg-red-500/10 text-red-500 animate-pulse' : 'bg-amber-500/10 text-amber-500'
            }`}>
              {selectedZone.risk} Risk
            </span>
          </div>

          <div className="space-y-2 text-[10px] font-bold">
            <div className="flex justify-between border-b border-slate-100 dark:border-white/5 pb-1">
              <span className="text-slate-500 dark:text-slate-400">Total Challans (May):</span>
              <span className="text-slate-800 dark:text-white font-mono">{selectedZone.challans} challans</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-white/5 pb-1">
              <span className="text-slate-500 dark:text-slate-400">Top Violation:</span>
              <span className="text-slate-800 dark:text-white font-mono">{selectedZone.topViolation}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-white/5 pb-1">
              <span className="text-slate-500 dark:text-slate-400">Peak Hours:</span>
              <span className="text-slate-800 dark:text-white font-mono">{selectedZone.peakHours}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-white/5 pb-1">
              <span className="text-slate-500 dark:text-slate-400">Camera Coverage:</span>
              <span className="text-slate-800 dark:text-white font-mono">{selectedZone.cameras} active cameras</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-white/5 pb-1">
              <span className="text-slate-500 dark:text-slate-400">Accidents (May):</span>
              <span className="text-slate-800 dark:text-white font-mono">{selectedZone.accidents} reports</span>
            </div>
            
            {/* Suggested Action card */}
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-650 dark:text-blue-400 p-2 rounded-xl text-[10px] flex items-center gap-1.5 mt-2 leading-relaxed">
              <Info className="w-3.5 h-3.5 text-blue-550 dark:text-blue-400 shrink-0" />
              <span><strong>Suggested Action:</strong> {selectedZone.action}</span>
            </div>
          </div>
        </div>
      )}

      {/* AI Zone Insight Card */}
      <div className="bg-gradient-to-tr from-blue-500/5 to-blue-500/10 border border-blue-500/20 p-4.5 rounded-2xl space-y-2.5 shadow-xl glow-blue">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-500" />
          <h4 className="text-xs font-heading font-black text-blue-750 dark:text-blue-300 uppercase tracking-wider">
            🤖 AI Zone Insight
          </h4>
        </div>
        <p className="text-[11px] text-slate-700 dark:text-slate-350 leading-relaxed font-semibold italic">
          "Silk Board and MG Road together account for 32% of all Bengaluru challans. Signal jumping peaks on weekday mornings between 8–9 AM. Recommend increased camera monitoring during this window."
        </p>
      </div>

    </div>
  );
}
