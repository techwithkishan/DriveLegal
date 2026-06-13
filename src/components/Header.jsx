import React, { useState, useRef, useEffect } from 'react';
import { Shield, LogOut, Globe, Moon, Sun, User, Menu, X, ArrowRightLeft, ArrowLeft } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { useGlobalContext } from '../context/GlobalContext';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { user, logout, isTravelActive, isOffline, setIsOffline, isTravelModeSimulated, setIsTravelModeSimulated, activeScreen, setActiveScreen } = useAppState();
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, languages, t } = useGlobalContext();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  // Click outside listener for menu dropdown close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-navy-950/80 border-b border-slate-200 dark:border-white/5 backdrop-blur-lg px-4 py-3 flex lg:hidden items-center justify-between transition-colors duration-300">
      {/* Brand logo / Back Arrow */}
      <div className="flex items-center gap-1.5">
        {activeScreen !== 'dashboard' && (
          <button 
            onClick={() => setActiveScreen('dashboard')}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 active:scale-95 transition-all mr-1 flex items-center justify-center shadow-sm"
            aria-label="Navigate Back"
            id="header-back-arrow-btn"
          >
            <ArrowLeft className="w-4 h-4 text-electric dark:text-electric-glow" />
          </button>
        )}
        
        <div 
          onClick={() => user && setActiveScreen('dashboard')} 
          className="flex items-center gap-1.5 cursor-pointer group"
        >

          <div className="rounded-xl overflow-hidden shadow-lg shadow-electric/20 group-hover:scale-105 transition-transform duration-300 w-8 h-8 shrink-0">
            <img src="/drivelegal-logo.jpg" alt="DRIVOS Logo" className="w-full h-full object-cover" />
          </div>
          <div className={activeScreen !== 'dashboard' ? 'hidden xs:block' : 'block'}>
            <span className="font-heading font-extrabold text-sm xs:text-base tracking-wide bg-gradient-to-r from-slate-900 dark:from-white via-slate-700 dark:via-slate-200 to-electric bg-clip-text text-transparent whitespace-nowrap">
              DRIVOS
            </span>
          </div>
        </div>
      </div>

      {/* Utilities panel */}
      <div className="flex items-center gap-2">
        {/* Active compliance status indicators */}
        {isTravelActive && user && (
          <div 
            onClick={() => setActiveScreen('dashboard')}
            className="hidden xs:flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold px-2 py-1 rounded-lg cursor-pointer hover:bg-amber-500/20 transition-all"
            title="Travel Mode: Registered state differs from location state"
          >
            <ArrowRightLeft className="w-3 h-3 animate-pulse" />
            <span>TRAVELING</span>
          </div>
        )}

        <ThemeToggle />

        {/* PREMIUM MOBILE LANGUAGE DROPDOWN */}
        {user && (
          <div className="relative select-none z-30">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all flex items-center justify-center focus:outline-none"
              title="Select Language / भाषा चुनें"
              id="mobile-header-lang-selector-btn"
            >
              <Globe className="w-5 h-5 text-electric animate-spin-slow" />
            </button>

            {langDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute right-[-45px] mt-2 w-64 max-h-72 overflow-y-auto z-50 glass-modal p-2 shadow-2xl rounded-2xl animate-fade-in border border-slate-200 dark:border-white/10 grid grid-cols-2 gap-1 scrollbar-none">
                  <div className="col-span-2 text-[8px] uppercase tracking-wider font-extrabold text-slate-400 pb-1.5 border-b border-slate-150 dark:border-white/5 mb-1 text-center">
                    Constitution of India - 22 Languages
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        setLanguage(lang.id);
                        setLangDropdownOpen(false);
                      }}
                      className={`flex flex-col items-start px-2 py-1.5 rounded-xl transition-all ${
                        language === lang.id
                          ? 'bg-electric text-white shadow-md shadow-electric/25'
                          : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-350'
                      }`}
                    >
                      <span className="text-[9px] font-bold leading-tight truncate w-full text-left">{lang.native}</span>
                      <span className={`text-[7px] leading-tight truncate w-full text-left ${language === lang.id ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}>
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all flex items-center justify-center text-slate-600 dark:text-slate-300"
              aria-label="User Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Premium dropdown menu */}
            {menuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 z-50 glass-modal p-2 shadow-2xl rounded-2xl animate-fade-in">
                  <div className="px-3 py-2.5 border-b border-slate-100 dark:border-white/5 mb-1.5">
                    <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium">Signed in as</span>
                    <span className="block text-sm text-slate-800 dark:text-slate-200 font-bold truncate">{user.name}</span>
                    <span className="block text-[10px] text-electric bg-electric/10 rounded-full px-2 py-0.5 mt-1.5 w-max font-semibold">
                      Licence: {user.licenseNumber}
                    </span>
                  </div>

                  {/* Dev controls for prototype simulation */}
                  <div className="p-1.5 border-b border-slate-100 dark:border-white/5 mb-1.5">
                    <span className="block text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-1 px-1.5">
                      Prototype Control
                    </span>
                    <button
                      onClick={() => setIsOffline(!isOffline)}
                      className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-xl font-medium transition-all ${
                        isOffline 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>Simulate Offline</span>
                      <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-red-500 animate-ping' : 'bg-slate-600'}`} />
                    </button>
                    <button
                      onClick={() => setIsTravelModeSimulated(!isTravelModeSimulated)}
                      className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-xl font-medium transition-all mt-1 ${
                        isTravelModeSimulated 
                          ? 'bg-amber-500/20 text-amber-400' 
                          : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>Simulate Travel Mode</span>
                      <span className={`w-2 h-2 rounded-full ${isTravelModeSimulated ? 'bg-amber-500 animate-ping' : 'bg-slate-600'}`} />
                    </button>
                  </div>

                  <button
                    onClick={() => { setActiveScreen('profile'); setMenuOpen(false); }}
                    className="w-full text-left flex items-center gap-2 text-xs px-2.5 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all font-medium"
                  >
                    <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>{t('myProfile') || 'My Profile'}</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 text-xs px-2.5 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-semibold"
                    id="logout-btn"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('signOut') || 'Secure Sign Out'}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
