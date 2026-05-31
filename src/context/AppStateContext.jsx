import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USER, HISTORICAL_CHALLANS, MOCK_SAFETY_SCORE } from '../data/demoData';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  // Navigation & Active View state
  const [activeScreen, setActiveScreen] = useState(() => {
    const hash = window.location.hash.replace(/^#\//, '');
    if (hash) {
      if (hash === 'admin/dashboard') return 'adminDashboard';
      if (hash === 'admin/zones') return 'adminZones';
      if (hash === 'admin/offenders') return 'adminOffenders';
      if (hash === 'admin/reports') return 'adminReports';
      if (hash === 'admin/monitoring') return 'adminMonitoring';
      if (hash === 'country-select') return 'countrySelect';
      return hash;
    }
    return 'splash';
  });

  // Sync state changes back to URL hash
  useEffect(() => {
    let hash = activeScreen;
    if (activeScreen === 'adminDashboard') hash = 'admin/dashboard';
    else if (activeScreen === 'adminZones') hash = 'admin/zones';
    else if (activeScreen === 'adminOffenders') hash = 'admin/offenders';
    else if (activeScreen === 'adminReports') hash = 'admin/reports';
    else if (activeScreen === 'adminMonitoring') hash = 'admin/monitoring';
    else if (activeScreen === 'countrySelect') hash = 'country-select';
    
    const currentHash = window.location.hash.replace(/^#\//, '');
    if (currentHash !== hash) {
      window.location.hash = '/' + hash;
    }
  }, [activeScreen]);

  // Listen to browser Back/Forward popstate changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\//, '');
      if (hash) {
        let screen = hash;
        if (hash === 'admin/dashboard') screen = 'adminDashboard';
        else if (hash === 'admin/zones') screen = 'adminZones';
        else if (hash === 'admin/offenders') screen = 'adminOffenders';
        else if (hash === 'admin/reports') screen = 'adminReports';
        else if (hash === 'admin/monitoring') screen = 'adminMonitoring';
        else if (hash === 'country-select') screen = 'countrySelect';
        
        setActiveScreen(screen);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Theme: Dark/Light Mode state
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('drivelegal_theme');
    return savedTheme ? savedTheme : 'dark';
  });

  // Authentication & Login Method State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('drivelegal_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loginMethod, setLoginMethod] = useState(() => {
    return localStorage.getItem('drivelegal_login_method') || 'phone'; // phone, vehicle, licence
  });

  // Registered Vehicles State (Phase 2 with types and states)
  const [vehicles, setVehicles] = useState(() => {
    const savedVehicles = localStorage.getItem('drivelegal_vehicles_v2');
    return savedVehicles ? JSON.parse(savedVehicles) : DEMO_USER.vehicles;
  });

  // Historical Challans State (allows pay/dispute)
  const [challans, setChallans] = useState(() => {
    const savedChallans = localStorage.getItem('drivelegal_challans');
    return savedChallans ? JSON.parse(savedChallans) : HISTORICAL_CHALLANS;
  });

  // Compliance Score State
  const [safetyScore, setSafetyScore] = useState(() => {
    const savedScore = localStorage.getItem('drivelegal_score_v2');
    return savedScore ? JSON.parse(savedScore) : MOCK_SAFETY_SCORE;
  });

  // Location State
  const [location, setLocation] = useState({
    country: "India",
    state: "Karnataka",
    city: "Bengaluru",
    area: "MG Road",
    isAutoDetected: false
  });

  // Offline & Travel Simulation States
  const [isOffline, setIsOffline] = useState(false);
  const [isTravelModeSimulated, setIsTravelModeSimulated] = useState(false);

  // Admin Mode state
  const [isAdminMode, setIsAdminMode] = useState(() => {
    return localStorage.getItem('drivelegal_admin_mode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('drivelegal_admin_mode', isAdminMode.toString());
  }, [isAdminMode]);

  // Apply dark class to <html> tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('drivelegal_theme', theme);
  }, [theme]);

  // Sync state variables with local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('drivelegal_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('drivelegal_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('drivelegal_login_method', loginMethod);
  }, [loginMethod]);

  useEffect(() => {
    localStorage.setItem('drivelegal_vehicles_v2', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('drivelegal_challans', JSON.stringify(challans));
  }, [challans]);

  useEffect(() => {
    localStorage.setItem('drivelegal_score_v2', JSON.stringify(safetyScore));
  }, [safetyScore]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Mock Authentication Login Method lead to dashboard
  const executeLogin = (method, value) => {
    setLoginMethod(method);
    
    // Check if user already exists
    const existing = localStorage.getItem('drivelegal_user');
    if (existing) {
      setUser(JSON.parse(existing));
      setActiveScreen('dashboard');
    } else {
      // First time login - register Arjun Mehta defaults
      const defaultProfile = {
        name: DEMO_USER.name,
        phone: DEMO_USER.phone,
        primaryVehicle: method === 'vehicle' ? value.toUpperCase() : DEMO_USER.primaryVehicle,
        licenseNumber: method === 'licence' ? value.toUpperCase() : DEMO_USER.licenseNumber,
        licenseExpiry: DEMO_USER.licenseExpiry,
        licenseClass: DEMO_USER.licenseClass,
        registeredState: DEMO_USER.registeredState
      };
      setUser(defaultProfile);
      setVehicles([
        { plate: defaultProfile.primaryVehicle, type: 'Car', state: defaultProfile.registeredState },
        { plate: 'KA01AB1234', type: 'Bike', state: defaultProfile.registeredState }
      ]);
      localStorage.removeItem('drivelegal_tour_completed');
      setActiveScreen('dashboard');
    }
  };

  const register = (userData) => {
    const newUser = {
      name: userData.name || DEMO_USER.name,
      phone: userData.phone || DEMO_USER.phone,
      primaryVehicle: (userData.primaryVehicle || DEMO_USER.primaryVehicle).toUpperCase(),
      licenseNumber: (userData.licenseNumber || DEMO_USER.licenseNumber).toUpperCase(),
      licenseExpiry: DEMO_USER.licenseExpiry,
      licenseClass: DEMO_USER.licenseClass,
      registeredState: userData.registeredState || DEMO_USER.registeredState
    };
    setUser(newUser);
    setVehicles([
      { plate: newUser.primaryVehicle, type: 'Car', state: newUser.registeredState }
    ]);
    localStorage.removeItem('drivelegal_tour_completed');
    setActiveScreen('dashboard');
  };

  const registerAuthority = (authData) => {
    const newOfficer = {
      name: authData.name,
      badgeId: authData.badgeId.toUpperCase(),
      phone: authData.phone,
      region: authData.region || "Karnataka",
      agency: authData.agency || "RTO Inspectorate",
      isAuthority: true,
      licenseNumber: "OFFICER-DL",
      primaryVehicle: "POLICE-VEHICLE",
      registeredState: authData.region || "Karnataka"
    };
    setUser(newOfficer);
    setIsAdminMode(true);
    setActiveScreen('adminDashboard');
  };

  const loginAuthority = (badgeId, pin) => {
    const officer = {
      name: "Inspector Vikram Singh",
      badgeId: badgeId.toUpperCase(),
      phone: "+91 99999 88888",
      region: "Karnataka",
      agency: "RTO Inspectorate",
      isAuthority: true,
      licenseNumber: "OFFICER-DL",
      primaryVehicle: "POLICE-VEHICLE",
      registeredState: "Karnataka"
    };
    setUser(officer);
    setIsAdminMode(true);
    setActiveScreen('adminDashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('drivelegal_user');
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveScreen('splash');
  };

  // Profile Inline Editor
  const updateUserProfile = (name, phone) => {
    if (user) {
      setUser(prev => ({
        ...prev,
        name: name,
        phone: phone
      }));
      return true;
    }
    return false;
  };

  // Vehicles list operations
  const addCustomVehicle = (plateNo, type, stateCode) => {
    const cleanPlate = plateNo.toUpperCase().replace(/\s+/g, '');
    if (cleanPlate && !vehicles.some(v => v.plate === cleanPlate)) {
      setVehicles(prev => [...prev, { plate: cleanPlate, type: type || 'Car', state: stateCode || 'Karnataka' }]);
      return true;
    }
    return false;
  };

  const removeCustomVehicle = (plateNo) => {
    if (vehicles.length > 1) {
      setVehicles(prev => prev.filter(v => v.plate !== plateNo));
    }
  };

  // Challans Pay/Dispute operations
  const payChallan = (id) => {
    setChallans(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: 'Paid', deadline: `Paid on ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}` };
      }
      return c;
    }));

    // Reward Safety Score for paying!
    setSafetyScore(prev => {
      const newScore = Math.min(prev.score + 4, 100);
      const cleanLabel = newScore >= 80 ? "Safe Driver" : newScore >= 50 ? "Moderate Risk" : "High Risk";
      return {
        ...prev,
        score: newScore,
        label: cleanLabel,
        // reduce deduct pts for unpaid
        deductions: prev.deductions.map(d => {
          if (d.name === 'Unpaid Challans') {
            return { ...d, value: Math.min(d.value + 4, 0), desc: "1 pending challan" };
          }
          return d;
        })
      };
    });
  };

  const disputeChallan = (id) => {
    setChallans(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: 'Disputed', deadline: 'Awaiting virtual court magistrate hearing' };
      }
      return c;
    }));
  };

  // Dynamically calculate aggregate financials
  const getChallanSummaryStats = () => {
    const pendingCount = challans.filter(c => c.status === 'Pending').length;
    const paidCount = challans.filter(c => c.status === 'Paid').length;
    const disputedCount = challans.filter(c => c.status === 'Disputed').length;

    const totalFines = challans.reduce((sum, c) => sum + c.amount, 0);
    const paidFines = challans.filter(c => c.status === 'Paid').reduce((sum, c) => sum + c.amount, 0);
    const pendingFines = challans.filter(c => c.status === 'Pending').reduce((sum, c) => sum + c.amount, 0);
    const disputedFines = challans.filter(c => c.status === 'Disputed').reduce((sum, c) => sum + c.amount, 0);

    return {
      total: challans.length,
      pending: pendingCount,
      paid: paidCount,
      disputed: disputedCount,
      totalFines,
      paidFines,
      pendingFines,
      disputedFines
    };
  };

  // Determine if cross-state registered plate rules apply
  const registeredState = user?.registeredState || "Karnataka";
  const currentLocationState = location.state;
  const isTravelActive = isTravelModeSimulated || (user && registeredState !== currentLocationState);

  return (
    <AppStateContext.Provider value={{
      activeScreen,
      setActiveScreen,
      theme,
      toggleTheme,
      user,
      loginMethod,
      executeLogin,
      register,
      registerAuthority,
      loginAuthority,
      logout,
      updateUserProfile,
      
      // Vehicles
      vehicles,
      addCustomVehicle,
      removeCustomVehicle,
      
      // Challans
      challans,
      payChallan,
      disputeChallan,
      getChallanSummaryStats,
      
      // Compliance Score
      safetyScore,
      setSafetyScore,

      // Simulation/Parameters
      location,
      setLocation,
      isOffline,
      setIsOffline,
      isTravelModeSimulated,
      setIsTravelModeSimulated,
      isTravelActive,

      // Admin Mode
      isAdminMode,
      setIsAdminMode
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
