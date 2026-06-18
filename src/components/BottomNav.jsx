import { Home, ClipboardList, Bot, User, BookOpen, Map, Settings, RefreshCw, Search, ShieldAlert, Users } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function BottomNav() {
  const { activeScreen, setActiveScreen, user, isAdminMode } = useAppState();

  // If no user is logged in or if on special screens, do not render navigation
  if (!user || activeScreen === 'splash' || activeScreen === 'auth' || activeScreen === 'landing' || activeScreen === 'pricing') return null;

  // Render Admin bottom nav or Citizen bottom nav
  const navItems = isAdminMode
    ? (user?.role === 'field'
      ? [
          { id: 'fieldOfficerDashboard', label: 'Live Zone', icon: ShieldAlert },
          { id: 'adminVehicleLookup', label: 'Lookup', icon: Search },
          { id: 'officerIssuanceLog', label: 'Log', icon: ClipboardList },
          { id: 'officerWatchlist', label: 'Watchlist', icon: Users },
          { id: 'adminDashboard', label: 'Analytics', icon: Home },
        ]
      : [
          { id: 'adminDashboard', label: 'Dashboard', icon: Home },
          { id: 'adminZones', label: 'Zone Map', icon: Map },
          { id: 'adminOffenders', label: 'Offenders', icon: RefreshCw },
          { id: 'adminVehicleLookup', label: 'Lookup', icon: Search },
          { id: 'adminReports', label: 'Reports', icon: ClipboardList },
          { id: 'adminMonitoring', label: 'Admin', icon: Settings },
        ])
    : [
        { id: 'dashboard', label: 'Home', icon: Home },
        { id: 'history', label: 'Challans', icon: ClipboardList },
        { id: 'ai', label: 'AI Chat', icon: Bot },
        { id: 'awareness', label: 'Awareness', icon: BookOpen },
        { id: 'profile', label: 'Profile', icon: User },
      ];

  return (
    <nav className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm px-4 py-2.5 shadow-2xl flex lg:hidden items-center justify-around gap-1 ${
      (isAdminMode || user?.isAuthority) 
        ? 'bg-[#16161a]/95 border border-purple-900/20 backdrop-blur-md rounded-2xl' 
        : 'glass-panel'
    }`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveScreen(item.id)}
            className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-300 ${
              isActive 
                ? 'text-slate-800 dark:text-white' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
            id={`nav-item-${item.id}`}
          >
            {/* Active Glow Accent Background */}
            {isActive && (
              <span className={`absolute inset-0 border rounded-xl animate-fade-in ${
                (isAdminMode || user?.isAuthority) 
                  ? 'bg-purple-500/10 border-purple-500/20 shadow-purple-500/20' 
                  : 'bg-electric/10 border-electric/20 glow-electric'
              }`} />
            )}

            <Icon className={`w-5 h-5 relative z-10 transition-transform duration-300 ${
              isActive 
                ? `scale-110 ${(isAdminMode || user?.isAuthority) ? 'text-purple-400' : 'text-electric'}` 
                : 'scale-100'
            }`} />
            <span className="text-[9px] font-semibold tracking-wide relative z-10 mt-1 uppercase">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
