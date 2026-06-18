import React, { useState } from 'react';
import { 
  Search, Lock, Car, AlertCircle, ShieldCheck, ClipboardList, Info, ArrowRight, RefreshCw
} from 'lucide-react';

export default function AdminVehicleLookupScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedPlate, setSearchedPlate] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setShowResults(false);

    // Simulate database lookup handshake (450ms duration)
    setTimeout(() => {
      setLoading(false);
      setSearchedPlate(searchQuery.trim().toUpperCase());
      setShowResults(true);
    }, 450);
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto w-full select-none text-slate-800 dark:text-slate-100 animate-fade-in bg-transparent">
      
      {/* Header & Subtitle */}
      <div className="py-2 border-b border-slate-200 dark:border-white/5 mb-4">
        <h2 className="text-xl font-heading font-black text-slate-800 dark:text-white tracking-wide">
          Vehicle Challan History
        </h2>
        <span className="text-[10px] text-purple-400 font-extrabold uppercase tracking-widest block">
          Search by vehicle registration number
        </span>
      </div>

      {/* Search Box Glass Panel */}
      <div className="glass-panel p-4.5 space-y-4 mb-4">
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter vehicle number (e.g. KA01AB1234)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-850 dark:text-white font-semibold placeholder:text-slate-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none uppercase tracking-wider transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-650 hover:bg-purple-700 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-purple-500/10 flex items-center justify-center gap-1.5 shrink-0"
            >
              {loading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Privacy notice displayed above results */}
        <div className="bg-purple-500/5 border border-purple-500/20 text-purple-650 dark:text-purple-400 p-3 rounded-xl flex items-start gap-2 text-[10px] leading-relaxed">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="font-semibold">
            <strong>Important Privacy Notice:</strong> This lookup shows only vehicle and challan data. No personal identity information (name, phone, address) is displayed.
          </p>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center py-12 space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-purple-500" />
          <span className="text-[10px] text-slate-550 font-bold uppercase tracking-wider">Retrieving secure RTO ledger...</span>
        </div>
      )}

      {/* Search Results Card */}
      {showResults && !loading && (
        <div className="glass-panel p-5 space-y-4 animate-slide-up border-l-4 border-l-purple-500 shadow-xl">
          
          {/* Vehicle Metadata Header */}
          <div className="pb-3 border-b border-slate-200 dark:border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-heading font-black text-slate-800 dark:text-white tracking-widest block uppercase">
                VEHICLE: {searchedPlate}
              </span>
              <span className="text-[8px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-extrabold uppercase tracking-wide flex items-center gap-1">
                <Car className="w-2.5 h-2.5" /> Two-Wheeler
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-[9px] font-bold text-slate-650 dark:text-slate-400">
              <div>
                <span className="block text-slate-500 uppercase text-[8px]">Registration State</span>
                <span className="text-slate-800 dark:text-white">Karnataka</span>
              </div>
              <div>
                <span className="block text-slate-500 uppercase text-[8px]">Registration Year</span>
                <span className="text-slate-800 dark:text-white">2019</span>
              </div>
            </div>
          </div>

          {/* Challan History Table */}
          <div className="space-y-2">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block flex items-center gap-1">
              <ClipboardList className="w-3.5 h-3.5 text-purple-400" />
              Challan History
            </span>
            
            <div className="border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden text-[9.5px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-white/5 text-slate-500 font-extrabold uppercase tracking-wider border-b border-slate-200 dark:border-white/5">
                    <th className="py-2 px-3">Date | Violation</th>
                    <th className="py-2 px-2 text-right">Fine</th>
                    <th className="py-2 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/5 font-semibold text-slate-700 dark:text-slate-355 font-mono">
                  <tr className="hover:bg-slate-50 dark:hover:bg-white/5">
                    <td className="py-2.5 px-3">
                      <span className="text-slate-500 text-[8.5px] block font-sans">12 May 2025</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 font-sans">No Helmet</span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-900 dark:text-white">₹1,000</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="text-red-500 font-bold uppercase text-[8px] bg-red-500/10 px-1.5 py-0.5 rounded">Pending</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-white/5">
                    <td className="py-2.5 px-3">
                      <span className="text-slate-500 text-[8.5px] block font-sans">28 Apr 2025</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 font-sans">Over-Speeding</span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-900 dark:text-white">₹1,500</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="text-red-500 font-bold uppercase text-[8px] bg-red-500/10 px-1.5 py-0.5 rounded">Pending</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-white/5">
                    <td className="py-2.5 px-3">
                      <span className="text-slate-500 text-[8.5px] block font-sans">10 Mar 2025</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 font-sans">Wrong Parking</span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-900 dark:text-white">₹500</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="text-emerald-500 font-bold uppercase text-[8px] bg-emerald-500/10 px-1.5 py-0.5 rounded">Paid</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-white/5">
                    <td className="py-2.5 px-3">
                      <span className="text-slate-500 text-[8.5px] block font-sans">22 Feb 2025</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 font-sans">No Seatbelt</span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-900 dark:text-white">₹500</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="text-emerald-500 font-bold uppercase text-[8px] bg-emerald-500/10 px-1.5 py-0.5 rounded">Paid</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Aggregate Metrics & Risk Info */}
          <div className="bg-slate-950/20 border border-slate-200 dark:border-white/5 p-3.5 rounded-xl space-y-2 text-[10px] font-bold">
            <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-1.5">
              <span className="text-slate-500 uppercase text-[8.5px]">Total Challans:</span>
              <span className="text-slate-800 dark:text-white">6</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-1.5">
              <span className="text-slate-500 uppercase text-[8.5px]">Pending Amount:</span>
              <span className="text-red-500 font-mono">₹2,500</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 dark:border-white/5 pb-1.5">
              <span className="text-slate-500 uppercase text-[8.5px]">Repeat Offense Flag:</span>
              <span className="text-amber-500">Over-Speeding (2x)</span>
            </div>
            <div className="flex justify-between items-center pt-0.5">
              <span className="text-slate-500 uppercase text-[8.5px]">Compliance Risk Level:</span>
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-500 px-2 py-0.5 rounded uppercase tracking-wider text-[8.5px] font-extrabold">
                MODERATE
              </span>
            </div>
          </div>

          {/* Privacy compliance lock text notice */}
          <div className="flex items-center gap-1.5 pt-1 text-[8.5px] text-slate-400 font-semibold leading-relaxed border-t border-slate-200 dark:border-white/5">
            <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span>Personal identity data is protected and not accessible through this lookup, per data privacy compliance.</span>
          </div>

        </div>
      )}

    </div>
  );
}
