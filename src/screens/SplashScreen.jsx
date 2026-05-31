import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function SplashScreen() {
  const { setActiveScreen, user } = useAppState();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start entry animations
    setAnimate(true);

    const timer = setTimeout(() => {
      // If user session exists, go straight to dashboard. Else, landing screen.
      if (user) {
        setActiveScreen('dashboard');
      } else {
        setActiveScreen('landing');
      }
    }, 2500); // Transitions after 2.5 seconds (gives user enough time to absorb premium brand)

    return () => clearTimeout(timer);
  }, [user, setActiveScreen]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-navy-950 p-6 relative overflow-hidden">
      {/* Decorative premium radial gradients in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-electric/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Brand Logo Assembly */}
      <div 
        className={`flex flex-col items-center text-center transition-all duration-1000 transform ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-8'
        }`}
      >
        <div className="relative mb-6">
          {/* Pulsating glowing ring around emblem */}
          <div className="absolute inset-0 bg-electric/30 rounded-full blur-xl animate-pulse-slow" />
          <div className="relative bg-gradient-to-tr from-electric via-blue-600 to-indigo-700 p-6 rounded-[2rem] border border-white/20 text-white shadow-2xl glow-electric-lg">
            <Shield className="w-16 h-16 stroke-[1.5]" />
          </div>
        </div>

        <h1 className="font-heading font-extrabold text-4xl xs:text-5xl tracking-wide bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-md leading-none uppercase">
          DRIVE
          <span className="block text-electric mt-1">LEGAL</span>
        </h1>

        <div className="h-[2px] w-12 bg-electric my-4 rounded-full" />

        <p className="font-heading text-[9px] xs:text-[11px] uppercase tracking-wider text-slate-400 font-bold">
          Know Your Rights. Own The Road.
        </p>
      </div>

      {/* Modern thin line spinner at bottom */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <div className="w-32 h-[3px] bg-white/5 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-electric rounded-full animate-[loading_1.5s_infinite_ease-in-out]" style={{
            animationName: 'shimmer'
          }} />
        </div>
        <span className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase">
          SECURE ENCRYPTED PROTOTYPE
        </span>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
