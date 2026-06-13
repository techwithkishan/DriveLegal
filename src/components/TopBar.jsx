
﻿import React, { useEffect, useRef, useState } from 'react';

import { 
  Bell, Search, User, ShieldAlert, Wifi, WifiOff, Globe, Sparkles 
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { useGlobalContext } from '../context/GlobalContext';
import ThemeToggle from './ThemeToggle';

export default function TopBar() {
  const { 
    activeScreen, setActiveScreen, user, isAdminMode, 
    challans, isTravelActive, isOffline 
  } = useAppState();

  const { language, setLanguage, languages, t } = useGlobalContext();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const searchInputRef = useRef(null);
  const [showSearchFocusedMessage, setShowSearchFocusedMessage] = useState(false);

  if (!user || activeScreen === 'splash' || activeScreen === 'auth' || activeScreen === 'landing') return null;

  // Sync keyboard shortcut (Cmd/Ctrl + K) to focus search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setShowSearchFocusedMessage(true);
        setTimeout(() => setShowSearchFocusedMessage(false), 2000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Map active screen code to dynamic page titles
  const getScreenTitle = () => {
    switch (activeScreen) {
      case 'dashboard':
        return 'Overview Dashboard';
      case 'checker':
        return 'Challan Compliance Calculator';
      case 'history':
        return 'My Violation Records';
      case 'ai':
        return 'AI Compliance Assistant';
      case 'awareness':
        return 'Road Safety Awareness Hub';
      case 'scenario':
        return 'Virtual Scenario Simulator';
      case 'profile':
        return 'Account Preferences & Vehicles';
      case 'pricing':
        return 'Subscription & Add-ons Plan';
      // Phase 4
      case 'scanner':
        return 'Physical Challan OCR Scanner';
      case 'reminders':
        return 'Smart Payment Reminders';
      case 'exportReport':
        return 'Export Compliance Report';
      // Phase 5
      case 'preDrive':
        return 'Pre-Drive Inspection Check';
      case 'zoneAlerts':
        return 'High-Risk Enforcement Zones';
      case 'travelAlert':
        return 'Cross-Border Travel Assistant';
      // Phase 6 Admin
      case 'adminDashboard':
        return 'Governance Analytics Control';
      case 'adminZones':
        return 'Enforcement Intelligence Map';
      case 'adminOffenders':
        return 'Repeat Offender Directory';
      case 'adminReports':
        return 'District Compliance Reports';
      case 'adminMonitoring':
        return 'Enforcement System Audit';
      default:

        return 'DRIVELEGAL Portal';

    }
  };

  const pendingChallansCount = challans.filter(c => c.status === 'Pending').length;

  return (
    <div className="hidden lg:flex items-center justify-between px-6 py-4 bg-white/70 dark:bg-navy-950/70 border-b border-slate-200 dark:border-white/5 backdrop-blur-md sticky top-0 z-20 shrink-0 w-full select-none select-none">
      
      {/* A. LEFT PORTION: DYNAMIC HEADER */}
      <div className="flex items-center gap-3">
        <h1 className="font-heading font-extrabold text-sm xs:text-base xl:text-lg tracking-wide text-slate-800 dark:text-white uppercase leading-none">
          {getScreenTitle()}
        </h1>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 shrink-0 text-[8px] font-extrabold uppercase tracking-wide">
          {isTravelActive && (
            <span className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full flex items-center gap-0.5 animate-pulse">
              <Globe className="w-2.5 h-2.5" /> Traveling Mode
            </span>
          )}
          {isOffline && (
            <span className="bg-red-500/10 border border-red-500/20 text-red-500 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <WifiOff className="w-2.5 h-2.5" /> Offline Sandbox
            </span>
          )}
        </div>
      </div>

      {/* B. RIGHT PORTION: MOCK SEARCH, NOTIFS, THEME, AVATAR */}
      <div className="flex items-center gap-4 relative">
        
        {/* Mock Search input */}
        <div className="relative hidden xl:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            ref={searchInputRef}
            type="text"
            placeholder="Search rules, acts, laws... (Ctrl + K)"
            className="bg-slate-100 dark:bg-white/5 border border-slate-250 dark:border-white/10 rounded-2xl pl-10 pr-4 py-2 text-[10px] font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 w-64 focus:w-72 focus:border-electric focus:outline-none transition-all"
          />
          {showSearchFocusedMessage && (
            <span className="absolute left-0 -bottom-6 text-[8px] bg-slate-950 text-white font-bold px-2 py-0.5 rounded animate-fade-in">
              ⌨️ Keyboard Search Focused!
            </span>
          )}
        </div>

        {/* Global actions bar */}
        <div className="flex items-center gap-2.5">
          {/* PREMIUM LANGUAGE DROPDOWN */}
          <div className="relative select-none z-30">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-250 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all flex items-center gap-1 focus:outline-none"
              title="Select Language / भाषा चुनें"
              id="topbar-lang-selector-btn"
            >
              <Globe className="w-4 h-4 text-electric animate-spin-slow" />
              <span className="text-[9px] font-extrabold uppercase tracking-wider hidden xl:inline">
                {languages.find(l => l.id === language)?.native || 'English'}
              </span>
            </button>

            {langDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto z-50 glass-modal p-2.5 shadow-2xl rounded-2xl animate-fade-in border border-slate-250 dark:border-white/10 grid grid-cols-2 gap-1 scrollbar-none">
                  <div className="col-span-2 text-[8px] uppercase tracking-wider font-extrabold text-slate-400 pb-1.5 border-b border-slate-150 dark:border-white/5 mb-1 text-center">
                    Constitution of India - 22 National Languages
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        setLanguage(lang.id);
                        setLangDropdownOpen(false);
                      }}
                      className={`flex flex-col items-start px-2.5 py-1.5 rounded-xl transition-all ${
                        language === lang.id
                          ? 'bg-electric text-white shadow-md shadow-electric/25'
                          : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="text-[10px] font-bold leading-tight">{lang.native}</span>
                      <span className={`text-[7.5px] leading-tight ${language === lang.id ? 'text-white/80' : 'text-slate-450'}`}>
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Notifications bell */}
          <button
            onClick={() => setActiveScreen('reminders')}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-250 dark:border-white/10 text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all relative"
            title={`${pendingChallansCount} Unpaid Challan Reminders`}
          >
            <Bell className="w-4 h-4 text-current" />
            {pendingChallansCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 border border-white dark:border-navy-950 rounded-full animate-pulse" />
            )}
          </button>

          {/* Theme switcher toggle */}
          <ThemeToggle />
        </div>

        {/* Vertical divider */}
        <span className="w-[1px] h-6 bg-slate-200 dark:bg-white/5" />

        {/* Mini avatar shortcut */}
        <button
          onClick={() => setActiveScreen('profile')}
          className={`flex items-center gap-2 p-1 rounded-2xl hover:bg-slate-150 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/5 transition-all text-left group`}
        >
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-mono text-[10px] font-black group-hover:scale-102 transition-transform shadow ${
            isAdminMode ? 'bg-amber-500 shadow-amber-500/10' : 'bg-electric shadow-electric/10'
          }`}>
            {user.name.substring(0, 2).toUpperCase()}
          </div>
        </button>

      </div>
    </div>
  );
}
