import React from 'react';
import { AlertTriangle, Compass, MapPin, CheckCircle, ShieldAlert, Phone, ArrowLeftRight, Landmark } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';
import { useAppState } from '../context/AppStateContext';

export default function TravelInternationalScreen() {
  const { user } = useAppState();
  const { flag, country, region } = useGlobalContext();

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 space-y-4 max-w-md lg:max-w-xl mx-auto w-full animate-fade-in select-none">
      
      {/* HEADER */}
      <div className="text-center space-y-2 mt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-[10px] font-extrabold uppercase tracking-widest text-amber-500 leading-none">
          <Compass className="w-3 h-3 animate-spin-slow" />
          <span>Cross-Border Compliance Alerts</span>
        </div>
        <h1 className="text-2xl xs:text-3xl font-heading font-black text-slate-850 dark:text-white leading-tight">
          International Travel Mode
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-md mx-auto">
          You are currently travelling outside your home jurisdiction. Driving laws and RTO camera networks differ significantly.
        </p>
      </div>

      {/* 1. VEHICLE VALIDATION WARNING BANNER (Pulsing Amber Border) */}
      <div className="border border-amber-500/30 dark:border-amber-500/40 bg-amber-500/5 p-5 rounded-[2rem] space-y-3 shadow-md relative overflow-hidden animate-pulse-border text-left">
        <div className="flex items-start gap-3.5">
          <div className="bg-amber-500 p-2.5 rounded-2xl text-slate-950 shrink-0">
            <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black uppercase text-amber-550 dark:text-amber-400 tracking-wider">
              International Travel Alert
            </h4>
            <div className="text-[10px] text-slate-650 dark:text-slate-350 font-bold leading-normal space-y-0.5">
              <div className="flex gap-1.5">
                <span className="text-slate-450 uppercase">Home Profile:</span>
                <span className="text-slate-800 dark:text-white">🇮🇳 India | KA01AB1234</span>
              </div>
              <div className="flex gap-1.5">
                <span className="text-slate-450 uppercase">Current Destination:</span>
                <span className="text-slate-800 dark:text-white font-extrabold">{flag} {country} — {region || 'Default'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-slate-200 dark:bg-amber-500/20 my-2" />

        <div className="text-[10px] text-slate-550 dark:text-slate-400 font-semibold leading-relaxed">
          <strong>⚠️ VEHICLE IS NOT VALID HERE:</strong> Indian-registered vehicles cannot be driven in the UAE or UK without special carnet clearances. If renting locally, you MUST carry a valid **International Driving Permit (IDP)** alongside your original Indian physical license.
        </div>
      </div>

      {/* 2. KEY COUNTRY RULES TO KNOW */}
      <div className="glass-panel p-5 space-y-4 text-left">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-150 dark:border-white/5">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <h4 className="text-xs font-heading font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Critical {country} Rules to Know
          </h4>
        </div>

        <ul className="text-[10px] font-bold text-slate-600 dark:text-slate-350 space-y-3 leading-relaxed">
          <li className="flex items-start gap-2.5">
            <span className="bg-red-500/15 text-red-550 dark:text-red-400 rounded-full px-2 py-0.5 text-[8px] font-black shrink-0 uppercase">Alcohol</span>
            <span>**ZERO TOLERANCE:** UAE has a flat 0.00% BAC limit. Any amount in blood is a criminal offense, carrying heavy jail potential.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="bg-amber-500/15 text-amber-500 rounded-full px-2 py-0.5 text-[8px] font-black shrink-0 uppercase">Speed</span>
            <span>**CAMERA ENFORCEMENT:** High-speed cameras are active every 500m on highways. Speed buffers are exactly +20 km/h in Dubai, zero buffer in Abu Dhabi.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="bg-blue-500/15 text-blue-500 rounded-full px-2 py-0.5 text-[8px] font-black shrink-0 uppercase">Mobiles</span>
            <span>Fines of AED 800 (~₹18,300 equivalent) plus 4 black points added directly to license records. Hands-free mandatory.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-450 rounded-full px-2 py-0.5 text-[8px] font-black shrink-0 uppercase">Parking</span>
            <span>Paid zones monitored strictly via automated smart-scanners. Salik toll zones are charged electronically via wind-screen tags.</span>
          </li>
        </ul>
      </div>

      {/* 3. COMMON TOURIST FINES */}
      <div className="glass-panel p-5 space-y-3.5 text-left">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-150 dark:border-white/5">
          <Landmark className="w-4 h-4 text-electric" />
          <h4 className="text-xs font-heading font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Common Tourist Fines Registry
          </h4>
        </div>

        <div className="space-y-2 text-[10px] font-bold text-slate-650 dark:text-slate-350">
          {[
            { name: "Speeding (20 over limit)", local: "AED 300", equiv: "~₹6,860" },
            { name: "Mobile while driving", local: "AED 800", equiv: "~₹18,300" },
            { name: "No Seatbelt (Front/Rear)", local: "AED 400", equiv: "~₹9,100" },
            { name: "Unauthorized Parking", local: "AED 200", equiv: "~₹4,600" }
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5 last:border-0 last:pb-0">
              <span className="text-slate-800 dark:text-slate-300">{item.name}</span>
              <div className="flex gap-2 font-mono text-[9.5px]">
                <strong className="text-slate-800 dark:text-white">{item.local}</strong>
                <span className="text-slate-450">{item.equiv}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CURRENCY CONVERTER CARD */}
      <div className="glass-panel p-5 space-y-3 text-left bg-gradient-to-tr from-electric/5 to-transparent">
        <div className="flex items-center justify-between pb-1">
          <span className="text-[9px] uppercase font-black tracking-widest text-electric">
            Fine Currency Calculator
          </span>
          <span className="text-[8px] bg-slate-100 dark:bg-white/5 text-slate-500 px-2 py-0.5 rounded font-extrabold">
            AED to INR Ref
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold font-mono">
          <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-2 rounded-xl">
            <span className="block text-slate-450 uppercase text-[8px] mb-0.5">AED 100</span>
            <strong className="text-slate-800 dark:text-white">₹2,286</strong>
          </div>
          <div className="bg-slate-105 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-2 rounded-xl">
            <span className="block text-slate-450 uppercase text-[8px] mb-0.5">AED 500</span>
            <strong className="text-slate-805 dark:text-white">₹11,430</strong>
          </div>
          <div className="bg-slate-110 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-2 rounded-xl">
            <span className="block text-slate-450 uppercase text-[8px] mb-0.5">AED 1,000</span>
            <strong className="text-slate-810 dark:text-white">₹22,860</strong>
          </div>
        </div>
      </div>

      {/* 5. EMERGENCY CONTACTS CARD */}
      <div className="glass-panel p-5 space-y-4 text-left">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-150 dark:border-white/5">
          <Phone className="w-4 h-4 text-red-500 animate-pulse" />
          <h4 className="text-xs font-heading font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Emergency Contacts ({country})
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-3 text-[10px] font-bold">
          <a href="tel:901" className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-3 rounded-2xl flex items-center justify-between hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
            <div>
              <span className="block text-slate-450 uppercase text-[7px]">Traffic Police</span>
              <strong className="text-slate-800 dark:text-white font-mono text-sm block mt-0.5">901</strong>
            </div>
            <Phone className="w-4 h-4 text-electric" />
          </a>
          
          <a href="tel:999" className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-3 rounded-2xl flex items-center justify-between hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
            <div>
              <span className="block text-slate-455 uppercase text-[7px]">Ambulance/Rescue</span>
              <strong className="text-slate-805 dark:text-white font-mono text-sm block mt-0.5">999</strong>
            </div>
            <Phone className="w-4 h-4 text-red-500" />
          </a>
        </div>
      </div>

      {/* Style overrides for custom pulse border animation */}
      <style>{`
        @keyframes pulseBorder {
          0%, 100% { border-color: rgba(245, 158, 11, 0.3); }
          50% { border-color: rgba(245, 158, 11, 0.75); }
        }
        .animate-pulse-border {
          animation: pulseBorder 2s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}
