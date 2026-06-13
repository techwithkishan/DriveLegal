
﻿import React from 'react';

import { AppStateProvider, useAppState } from './context/AppStateContext';

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

// Landing Page Screen
import LandingScreen from './screens/LandingScreen';
import PricingScreen from './screens/PricingScreen';

// Phase 7 Global Scaling Screens
import CountrySelectorScreen from './screens/CountrySelectorScreen';
import CountryComparisonScreen from './screens/CountryComparisonScreen';
import TransportEcosystemScreen from './screens/TransportEcosystemScreen';
import TravelInternationalScreen from './screens/TravelInternationalScreen';
import AboutScreen from './screens/AboutScreen';
import { GlobalContextProvider, useGlobalContext } from './context/GlobalContext';

// Phase 8 Ecosystem Screens
import EcosystemScreen from './screens/EcosystemScreen';
import SmartMobilityScreen from './screens/SmartMobilityScreen';
import AICoachScreen from './screens/AICoachScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import CivicAwarenessScreen from './screens/CivicAwarenessScreen';
import RoadmapScreen from './screens/RoadmapScreen';

function AppContent() {
  const { activeScreen, isAdminMode, setIsAdminMode, setActiveScreen, user } = useAppState();
  const { isFlashing, flashColor } = useGlobalContext();

  // Route guarding: redirect unauthenticated users to landing (/)
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
      // Phase 4
      case 'scanner':
        return <ChallanScannerScreen />;
      case 'reminders':
        return <PaymentRemindersScreen />;
      case 'exportReport':
        return <ComplianceReportScreen />;
      // Phase 5
      case 'preDrive':
        return <PreDriveScreen />;
      case 'zoneAlerts':
        return <ZoneAlertsScreen />;
      case 'travelAlert':
        return <TravelAlertScreen />;
      // Phase 6
      case 'adminDashboard':
        return <ViolationAnalyticsScreen />;
      case 'adminZones':
        return <ZoneIntelligenceScreen />;
      case 'adminOffenders':
        return <RepeatOffenderScreen />;
      case 'adminReports':
        return <SmartAwarenessReportScreen />;
      case 'adminMonitoring':
        return <AdminMonitoringScreen />;
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
      // Phase 8
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
    <div className="app-container">
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

      {/* Governance Mode Amber Banner */}
      {isAdminMode && showHeader && (
        <div className="w-full bg-amber-500 text-slate-950 px-4 py-2 font-bold text-xs flex items-center justify-between shadow-md relative z-50 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-pulse shrink-0" />

            <span>GOVERNANCE MODE — DRIVOS ADMIN</span>

          </div>
          <button 
            onClick={() => {
              setIsAdminMode(false);
              setActiveScreen('profile');
            }}
            className="bg-slate-950 hover:bg-slate-900 text-amber-500 font-extrabold px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider transition-all select-none"
          >
            ← Citizen View
          </button>
        </div>
      )}

      {/* Network offline simulation warning */}
      <OfflineBanner />

      {/* RTO Profile / Signout Header */}
      {showHeader && <Header />}

      {/* Sidebar Navigation for Desktop */}
      {showHeader && <SidebarNav />}

      {/* Main Core View Area */}
      <main className="flex-1 flex flex-col w-full relative z-10 lg:h-screen lg:overflow-y-auto">
        {showHeader && <TopBar />}
        {renderActiveScreen()}
      </main>

      {/* Persistent Mobile Bottom Navigation */}
      {activeScreen !== 'landing' && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <GlobalContextProvider>
      <AppStateProvider>
        <AppContent />
      </AppStateProvider>
    </GlobalContextProvider>
  );
}
