import React from 'react';
import { WifiOff, AlertCircle } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function OfflineBanner() {
  const { isOffline, location } = useAppState();

  if (!isOffline) return null;

  return (
    <div 
      className="sticky top-0 z-50 w-full bg-red-950/95 border-b border-red-500/30 text-red-200 py-3 px-4 backdrop-blur-md transition-all duration-300 animate-slide-up"
      id="offline-state-banner"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3 text-xs md:text-sm font-medium">
        <div className="flex items-center gap-2">
          <div className="bg-red-500/20 p-1.5 rounded-lg">
            <WifiOff className="w-4 h-4 text-red-400 animate-pulse" />
          </div>
          <div>
            <span className="font-semibold block text-red-400">Offline Mode Active</span>
            <span className="text-[10px] text-red-300">Showing cached compliance rules for {location.city || "last location"}</span>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 text-[10px] uppercase tracking-wider py-1 px-2 rounded-full font-bold">
          CACHED DATA
        </div>
      </div>
    </div>
  );
}
