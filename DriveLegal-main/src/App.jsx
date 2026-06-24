import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { GlobalContextProvider, useGlobalContext } from './context/GlobalContext';

// Auth screen
import LoginScreen from './screens/LoginScreen';

// Layout & Components
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import OfflineBanner from './components/OfflineBanner';
import SidebarNav from './components/SidebarNav';
import TopBar from './components/TopBar';

// Screens
import SplashScreen from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import DashboardScreen from './screens/DashboardScreen';
import ChallanCheckerScreen from './screens/ChallanCheckerScreen';
import AIScreen from './screens/AIScreen';
import ProfileScreen from './screens/ProfileScreen';

// Phase 2 Screens
import HistoryScreen from './screens/HistoryScreen';
import ScoreScreen from './screens/ScoreScreen';
import InsightsScreen from './screens/InsightsScreen';

// Phase 3 Screens
import ScenarioSimulatorScreen from './screens/ScenarioSimulatorScreen';
import AwarenessScreen from './screens/AwarenessScreen';

// Phase 4 Screens
import ChallanScannerScreen from './screens/ChallanScannerScreen';
import PaymentRemindersScreen from './screens/PaymentRemindersScreen';
import ComplianceReportScreen from './screens/ComplianceReportScreen';

// Phase 5 Screens
import PreDriveScreen from './screens/PreDriveScreen';
import ZoneAlertsScreen from './screens/ZoneAlertsScreen';
import TravelAlertScreen from './screens/TravelAlertScreen';

// Phase 6 Screens
import ViolationAnalyticsScreen from './screens/ViolationAnalyticsScreen';
import ZoneIntelligenceScreen from './screens/ZoneIntelligenceScreen';
import RepeatOffenderScreen from './screens/RepeatOffenderScreen';
import SmartAwarenessReportScreen from './screens/SmartAwarenessReportScreen';
import AdminMonitoringScreen from './screens/AdminMonitoringScreen';
import AdminVehicleLookupScreen from './screens/AdminVehicleLookupScreen';
import FieldOfficerDashboardScreen from './screens/FieldOfficerDashboardScreen';

// Landing Page Screen
import LandingScreen from './screens/LandingScreen';
import PricingScreen from './screens/PricingScreen';

// Phase 7 Global Scaling Screens
import CountrySelectorScreen from './screens/CountrySelectorScreen';
import CountryComparisonScreen from './screens/CountryComparisonScreen';
import TransportEcosystemScreen from './screens/TransportEcosystemScreen';
import TravelInternationalScreen from './screens/TravelInternationalScreen';
import AboutScreen from './screens/AboutScreen';

// Phase 8 Ecosystem Screens
import EcosystemScreen from './screens/EcosystemScreen';
import SmartMobilityScreen from './screens/SmartMobilityScreen';
import AICoachScreen from './screens/AICoachScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import CivicAwarenessScreen from './screens/CivicAwarenessScreen';
import RoadmapScreen from './screens/RoadmapScreen';

function AppContent({ firebaseUser, onFirebaseLogin }) {
  const { activeScreen, isAdminMode, setIsAdminMode, setActiveScreen, user, setUser } = useAppState();
  const { isFlashing, flashColor } = useGlobalContext();

  // Sync Firebase user into AppStateContext when Firebase login happens
  useEffect(() => {
    if (firebaseUser && !user) {
      // Map Firebase user to the shape your app expects
      setUser({
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL || null,
        uid: firebaseUser.uid,
        isAuthority: false,
      });
      setActiveScreen('dashboard');
    }
  }, [firebaseUser, user, setUser, setActiveScreen]);

  // Route guarding: redirect unauthenticated users to landing
  React.useEffect(() => {
    if (!user && activeScreen !== 'splash' && activeScreen !== 'auth' && activeScreen !== 'landing') {
      setActiveScreen('landing');
    }
  }, [user, activeScreen, setActiveScreen]);

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'landing':
        return <LandingScreen />;
      case 'pricing':
        return <PricingScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'checker':
        return <ChallanCheckerScreen />;
      case 'history':
        return <HistoryScreen />;
      case 'score':
        return <ScoreScreen />;
      case 'insights':
        return <InsightsScreen />;
      case 'ai':
        return <AIScreen />;
      case 'awareness':
        return <AwarenessScreen />;
      case 'scenario':
        return <ScenarioSimulatorScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'scanner':
        return <ChallanScannerScreen />;
      case 'reminders':
        return <PaymentRemindersScreen />;
      case 'exportReport':
        return <ComplianceReportScreen />;
      case 'preDrive':
        return <PreDriveScreen />;
      case 'zoneAlerts':
        return <ZoneAlertsScreen />;
      case 'travelAlert':
        return <TravelAlertScreen />;
      case 'adminDashboard':
        return <ViolationAnalyticsScreen />;
      case 'fieldOfficerDashboard':
        return <FieldOfficerDashboardScreen subView="zone" />;
      case 'officerIssuanceLog':
        return <FieldOfficerDashboardScreen subView="log" />;
      case 'officerWatchlist':
        return <FieldOfficerDashboardScreen subView="watchlist" />;
      case 'adminZones':
        return <ZoneIntelligenceScreen />;
      case 'adminOffenders':
        return <RepeatOffenderScreen />;
      case 'adminReports':
        return <SmartAwarenessReportScreen />;
      case 'adminMonitoring':
        return <AdminMonitoringScreen />;
      case 'adminVehicleLookup':
        return <AdminVehicleLookupScreen />;
      case 'countrySelect':
        return <CountrySelectorScreen />;
      case 'compare':
        return <CountryComparisonScreen />;
      case 'transport':
        return <TransportEcosystemScreen />;
      case 'travel-international':
        return <TravelInternationalScreen />;
      case 'about':
        return <AboutScreen />;
      case 'ecosystem':
        return <EcosystemScreen />;
      case 'smartMobility':
        return <SmartMobilityScreen />;
      case 'aiCoach':
        return <AICoachScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      case 'civicAwareness':
        return <CivicAwarenessScreen />;
      case 'roadmap':
        return <RoadmapScreen />;
      default:
        return <SplashScreen />;
    }
  };

  const showHeader = activeScreen !== 'splash' && activeScreen !== 'auth' && activeScreen !== 'landing';

  return (
    <div className={`app-container ${user?.isAuthority ? 'theme-officer !bg-[#0F0F12] dark:!bg-[#0F0F12] bg-grid-pattern' : ''}`}>
      {/* Country Transition Color Flash Overlay */}
      {isFlashing && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-300 flex items-center justify-center animate-[flashFade_0.45s_ease-out_forwards]"
          style={{ backgroundColor: flashColor }}
        />
      )}
      <style>{`
        @keyframes flashFade {
          0% { opacity: 0; }
          25% { opacity: 0.85; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Background glow graphics */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-glow-pulse bg-electric/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-glow-pulse bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Governance Mode Banner */}
      {isAdminMode && showHeader && (
        <div className="w-full bg-[#16161a] border-b border-purple-900/20 text-purple-400 px-4 py-2 font-mono text-[9px] uppercase tracking-wider flex items-center justify-between shadow-md relative z-50 shrink-0 select-none">
          <div className="flex items-center gap-1.5 font-extrabold">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shrink-0" />
            <span>OFFICER DASHBOARD — RESTRICTED ACCESS</span>
          </div>
          <button
            onClick={() => {
              setIsAdminMode(false);
              setActiveScreen('profile');
            }}
            className="bg-purple-900/30 hover:bg-purple-900/50 text-purple-300 font-bold px-3 py-1 rounded border border-purple-500/20 text-[8px] uppercase tracking-wider transition-all select-none"
          >
            ← Citizen View
          </button>
        </div>
      )}

      <OfflineBanner />
      {showHeader && <Header />}
      {showHeader && <SidebarNav />}

      <main className="flex-1 flex flex-col w-full relative z-10 lg:h-screen lg:overflow-y-auto">
        {showHeader && <TopBar />}
        {renderActiveScreen()}
      </main>

      {activeScreen !== 'landing' && <BottomNav />}
    </div>
  );
}

export default function App() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  // Show loading spinner while Firebase checks auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl mb-3">🚘</div>
          <p className="text-amber-400 font-bold tracking-widest text-sm uppercase animate-pulse">
            Loading DRIVOS...
          </p>
        </div>
      </div>
    );
  }

  // Show Firebase Login screen if not logged in via Firebase
  if (!firebaseUser) {
    return (
      <GlobalContextProvider>
        <LoginScreen onFirebaseLogin={setFirebaseUser} />
      </GlobalContextProvider>
    );
  }

  // Firebase user exists — render full app and sync user into AppStateContext
  return (
    <GlobalContextProvider>
      <AppStateProvider>
        <AppContent
          firebaseUser={firebaseUser}
          onFirebaseLogin={setFirebaseUser}
        />
      </AppStateProvider>
    </GlobalContextProvider>
  );
}
