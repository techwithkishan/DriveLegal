import React, { useState } from 'react';
import { 
  Shield, Home, Scale, ClipboardList, Bot, BookOpen, Sparkles, User, 
  CreditCard, Map, Users, FileText, Settings, LogOut, ChevronLeft, 
  ChevronRight, ShieldAlert, Sun, Moon, Wifi, WifiOff, Globe, ArrowLeft, Car, Info,
  Trophy, Route
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { useGlobalContext } from '../context/GlobalContext';

export default function SidebarNav() {
  const { 
    activeScreen, setActiveScreen, user, logout, 
    isAdminMode, setIsAdminMode, isOffline, setIsOffline,
    isTravelModeSimulated, setIsTravelModeSimulated, theme, toggleTheme 
  } = useAppState();
  const { country, countries, changeCountry, activeCountryConfig } = useGlobalContext();

  const [collapsed, setCollapsed] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  if (!user || activeScreen === 'splash' || activeScreen === 'auth' || activeScreen === 'landing') return null;

  // Nav item list configurations
  const citizenItems = [
    { id: 'dashboard', label: 'Home Dashboard', icon: Home },
    { id: 'checker', label: 'Challan Checker', icon: Scale },
    { id: 'compare', label: 'Global Comparison', icon: Globe },
    { id: 'transport', label: 'Multi-Transport', icon: Car },
    { id: 'history', label: 'Challan History', icon: ClipboardList },
    { id: 'ai', label: 'AI Legal Chat', icon: Bot },
    { id: 'awareness', label: 'Awareness Hub', icon: BookOpen },
    { id: 'scenario', label: 'Scenario Simulator', icon: Sparkles },

    { id: 'about', label: 'About DRIVELEGAL', icon: Info },

    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'pricing', label: 'Upgrade & Pricing', icon: CreditCard },
  ];

  const adminItems = [
    { id: 'adminDashboard', label: 'Violation Analytics', icon: Home },
    { id: 'adminZones', label: 'Zone Intelligence', icon: Map },
    { id: 'adminOffenders', label: 'Repeat Offenders', icon: Users },
    { id: 'adminReports', label: 'Smart Reports', icon: FileText },
    { id: 'adminMonitoring', label: 'System Control', icon: Settings },
  ];

  const navItems = isAdminMode ? adminItems : citizenItems;
  const activeAccent = isAdminMode ? 'border-amber-500/30 text-amber-500 bg-amber-500/10 dark:bg-amber-500/5 glow-amber' : 'border-electric/30 text-electric bg-electric/10 dark:bg-electric/5 glow-electric';
  const hoverAccent = isAdminMode ? 'hover:text-amber-500 hover:bg-amber-500/5 dark:hover:bg-amber-500/5' : 'hover:text-electric hover:bg-electric/5 dark:hover:bg-electric/5';

  return (
    <aside 
      className={`hidden lg:flex flex-col h-screen shrink-0 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-navy-950 transition-all duration-300 sticky top-0 z-30 select-none ${
        collapsed ? 'w-20' : 'w-72 xl:w-80'
      }`}
    >
      {/* 1. TOP BRANDING BANNER */}
      <div className={`p-5 flex items-center justify-between border-b border-slate-100 dark:border-white/5 shrink-0 ${
        collapsed ? 'flex-col gap-3.5' : ''
      }`}>
        <div 
          onClick={() => setActiveScreen(isAdminMode ? 'adminDashboard' : 'dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >

          <div className={`rounded-xl overflow-hidden text-white shadow-lg transition-all w-10 h-10 shrink-0 ${
            isAdminMode 
              ? 'shadow-amber-500/20 group-hover:scale-105' 
              : 'shadow-electric/20 group-hover:scale-105'
          }`}>
            <img src="/drivelegal-logo.jpg" alt="DRIVELEGAL Logo" className="w-full h-full object-cover" />

          </div>
          {!collapsed && (
            <div className="space-y-0.5 animate-fade-in">
              <span className="font-heading font-black text-sm tracking-wider bg-gradient-to-r from-slate-900 dark:from-white to-electric bg-clip-text text-transparent uppercase leading-none block">

                DRIVELEGAL

              </span>
              <span className="text-[7.5px] text-slate-400 font-extrabold uppercase tracking-widest block leading-none">
                Compliance AI
              </span>
            </div>
          )}
        </div>

        {/* Dynamic Governance / India indicator badge */}
        {!collapsed && (
          <div className="animate-fade-in shrink-0">
            {isAdminMode ? (
              <span className="text-[7.5px] bg-amber-500/15 text-amber-500 border border-amber-500/25 px-2 py-0.5 rounded-md font-extrabold tracking-wider uppercase block">
                Gov Mode
              </span>
            ) : (
              <span className="text-[8px] bg-slate-100 dark:bg-white/5 text-slate-500 px-2 py-0.5 rounded-md font-extrabold block">
                IN 🇮🇳
              </span>
            )}
          </div>
        )}
      </div>

      {/* 1.5 COUNTRY SWITCHER SECTION */}
      {!collapsed ? (
        <div className="px-5 py-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between gap-2 shrink-0 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-xl leading-none">{activeCountryConfig?.flag || '🇮🇳'}</span>
            <div>
              <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Target Region</span>
              <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 truncate max-w-[120px] block leading-tight">
                {activeCountryConfig?.name || 'India'}
              </span>
            </div>
          </div>
          <select
            value={country}
            onChange={(e) => changeCountry(e.target.value)}
            className="bg-slate-100 dark:bg-navy-800 border border-slate-250 dark:border-white/10 rounded-xl py-1.5 px-2 text-[10px] text-slate-800 dark:text-white font-extrabold focus:outline-none transition-all cursor-pointer"
          >
            {countries.map(c => (
              <option key={c.id} value={c.id} className="dark:bg-navy-900 text-slate-800 dark:text-white font-semibold">
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <button
          onClick={() => setActiveScreen('countrySelect')}
          className="mx-auto my-3 p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-250 dark:border-white/10 text-xl leading-none hover:scale-105 active:scale-95 transition-all shrink-0"
          title="Change Country"
        >
          {activeCountryConfig?.flag || '🇮🇳'}
        </button>
      )}

      {/* Governance Mode Header Banner inside Sidebar */}
      {isAdminMode && !collapsed && (
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-b border-amber-500/20 px-5 py-2.5 text-[8.5px] text-amber-500 font-extrabold tracking-wider uppercase animate-fade-in shrink-0 flex items-center justify-between">
          <span>Enforcement Console</span>
          <button 
            onClick={() => {
              setIsAdminMode(false);
              setActiveScreen('profile');
            }}
            className="hover:underline text-[8px] text-slate-400 font-bold"
          >
            ← Citizen View
          </button>
        </div>
      )}

      {/* 2. MIDDLE LINK COLLECTION */}
      <nav className="flex-grow py-5 px-3.5 space-y-1.5 overflow-y-auto scrollbar-none flex flex-col">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`relative w-full flex items-center gap-3.5 py-3 rounded-2xl transition-all font-bold text-[11px] uppercase tracking-wider ${
                collapsed ? 'justify-center px-0' : 'px-4'
              } ${isActive ? activeAccent : `text-slate-500 dark:text-slate-400 ${hoverAccent}`}`}
              title={collapsed ? item.label : ''}
              id={`sidebar-item-${item.id}`}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-transform ${
                isActive ? 'scale-105 text-current' : 'scale-100'
              }`} />
              {!collapsed && <span className="truncate leading-none">{item.label}</span>}
              {isActive && !collapsed && (
                <span className={`absolute right-4 w-1.5 h-1.5 rounded-full ${
                  isAdminMode ? 'bg-amber-500 animate-pulse' : 'bg-electric animate-pulse'
                }`} />
              )}
            </button>
          );
        })}

        {/* Vision Section — Phase 8 */}
        {!isAdminMode && (
          <>
            {!collapsed && (
              <div className="px-1 pt-3 pb-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
                  <span className="text-[7.5px] text-slate-400 font-extrabold uppercase tracking-widest shrink-0">Vision</span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-white/5" />
                </div>
              </div>
            )}
            {[
              { id: 'ecosystem', label: 'Ecosystem', emoji: '🌐', Icon: Globe },
              { id: 'aiCoach', label: 'AI Coach', emoji: '🤖', Icon: Bot },
              { id: 'achievements', label: 'Achievements', emoji: '🏆', Icon: Trophy },
              { id: 'roadmap', label: 'Roadmap', emoji: '🗺️', Icon: Route },
            ].map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`relative w-full flex items-center gap-3.5 py-3 rounded-2xl transition-all font-bold text-[11px] uppercase tracking-wider ${
                    collapsed ? 'justify-center px-0' : 'px-4'
                  } ${isActive ? activeAccent : `text-slate-500 dark:text-slate-400 ${hoverAccent}`}`}
                  title={collapsed ? item.label : ''}
                  id={`sidebar-item-${item.id}`}
                >
                  {collapsed ? (
                    <span className="text-base leading-none">{item.emoji}</span>
                  ) : (
                    <item.Icon className={`w-5 h-5 shrink-0 transition-transform ${isActive ? 'scale-105 text-current' : 'scale-100'}`} />
                  )}
                  {!collapsed && <span className="truncate leading-none">{item.label}</span>}
                  {isActive && !collapsed && (
                    <span className={`absolute right-4 w-1.5 h-1.5 rounded-full bg-electric animate-pulse`} />
                  )}
                </button>
              );
            })}
          </>
        )}

        {/* Toggle Mode button inside Nav */}
        {!isAdminMode && (
          <button
            onClick={() => {
              setIsAdminMode(true);
              setActiveScreen('adminDashboard');
            }}
            className={`w-full flex items-center gap-3.5 py-3 rounded-2xl text-amber-600 dark:text-amber-400 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/10 transition-all font-bold text-[10px] uppercase tracking-wider mt-4 shrink-0 ${
              collapsed ? 'justify-center px-0 border-0 bg-amber-500/10' : 'px-4'
            }`}
            title={collapsed ? 'Enforcement Mode' : ''}
          >
            <ShieldAlert className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="truncate">Governance Console</span>}
          </button>
        )}
      </nav>

      {/* 3. BOTTOM FOOTER SECTION */}
      <div className="p-4 border-t border-slate-100 dark:border-white/5 space-y-3 shrink-0 bg-white dark:bg-navy-950">
        {/* User Card */}
        <div className={`flex items-center justify-between ${collapsed ? 'flex-col gap-2.5' : ''}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl text-white font-mono text-xs font-black shadow-md ${
              isAdminMode ? 'bg-amber-500 shadow-amber-500/15' : 'bg-electric shadow-electric/15'
            }`}>
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="space-y-0.5 text-left animate-fade-in">
                <span className="block text-[11px] font-extrabold text-slate-800 dark:text-slate-200 truncate max-w-[130px]">
                  {user.name}
                </span>
                <span className="block text-[8px] font-mono text-slate-500 dark:text-slate-400 leading-none">
                  {user.primaryVehicle}
                </span>
              </div>
            )}
          </div>

          {/* Quick Drawer trigger */}
          {!collapsed && (
            <button 
              onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-250 dark:border-white/10 text-slate-500 dark:text-slate-450 active:scale-95 transition-all shrink-0"
              title="Simulation Controls"
            >
              <Settings className="w-4 h-4 text-electric" />
            </button>
          )}
        </div>

        {/* Expand/Collapse & Logout Actions Bar */}
        <div className={`flex items-center justify-between gap-1.5 ${collapsed ? 'flex-col' : ''}`}>
          {/* Collapse toggle button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex-1 flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-250 dark:border-white/10 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4.5 h-4.5" /> : <ChevronLeft className="w-4.5 h-4.5" />}
          </button>

          {/* Secure Logout button */}
          <button
            onClick={logout}
            className="flex-1 flex items-center justify-center p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 hover:text-red-650 transition-all"
            title="Secure Sign Out"
            id="sidebar-signout-btn"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* QUICK FLOATING OVERLAY SETTINGS DRAWER */}
      {showSettingsDrawer && !collapsed && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
            onClick={() => setShowSettingsDrawer(false)}
          />
          <div className="absolute bottom-[80px] left-[20px] right-[20px] w-[calc(100%-40px)] z-50 glass-modal p-4 border border-slate-250 dark:border-white/10 shadow-2xl animate-slide-up space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">
                Simulation Dashboard
              </span>
              <button 
                onClick={() => setShowSettingsDrawer(false)}
                className="text-[8px] bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-md px-1.5 py-0.5 font-bold"
              >
                Close
              </button>
            </div>

            <div className="space-y-2 text-[10px] font-bold text-slate-600 dark:text-slate-350">
              {/* Simulate Offline toggle */}
              <button
                onClick={() => setIsOffline(!isOffline)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
                  isOffline ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border-slate-200 dark:border-white/5'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                  Offline Mode
                </span>
                <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-red-500 animate-ping' : 'bg-slate-400'}`} />
              </button>

              {/* Simulate Travel Mode toggle */}
              <button
                onClick={() => setIsTravelModeSimulated(!isTravelModeSimulated)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
                  isTravelModeSimulated ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border-slate-200 dark:border-white/5'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-amber-500" />
                  Travel Alerts Mode
                </span>
                <span className={`w-2 h-2 rounded-full ${isTravelModeSimulated ? 'bg-amber-500 animate-ping' : 'bg-slate-400'}`} />
              </button>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
