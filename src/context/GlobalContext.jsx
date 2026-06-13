<<<<<<< HEAD
﻿import React, { createContext, useContext, useState, useEffect } from 'react';
=======
import React, { createContext, useContext, useState, useEffect } from 'react';
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
import countries from '../data/countries.json';
import { LANGUAGES, TRANSLATIONS } from '../data/translations.js';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  // Load location configs from localStorage or defaults to India
  const [country, setCountry] = useState(() => {
<<<<<<< HEAD
    return localStorage.getItem('DriVos_global_country') || 'IN';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('DriVos_global_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('DriVos_global_language', language);
=======
    return localStorage.getItem('drivelegal_global_country') || 'IN';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('drivelegal_global_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('drivelegal_global_language', language);
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
  }, [language]);

  const t = (key) => {
    if (TRANSLATIONS[language] && TRANSLATIONS[language][key]) {
      return TRANSLATIONS[language][key];
    }
    if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) {
      return TRANSLATIONS['en'][key];
    }
    return key;
  };

  const [region, setRegion] = useState(() => {
<<<<<<< HEAD
    return localStorage.getItem('DriVos_global_region') || 'Karnataka';
  });

  const [city, setCity] = useState(() => {
    return localStorage.getItem('DriVos_global_city') || 'Bengaluru';
=======
    return localStorage.getItem('drivelegal_global_region') || 'Karnataka';
  });

  const [city, setCity] = useState(() => {
    return localStorage.getItem('drivelegal_global_city') || 'Bengaluru';
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
  });

  const [transportType, setTransportType] = useState('road'); // road | commercial | maritime | aviation | rail

  // Calculated values based on the active country
  const [activeCountryConfig, setActiveCountryConfig] = useState(() => {
    return countries.find(c => c.id === 'IN') || countries[0];
  });

  // State for the full-screen 0.3s flag flash overlay
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashColor, setFlashColor] = useState('');

  // Auto-sync country parameters whenever the country ID changes
  useEffect(() => {
    const config = countries.find(c => c.id === country) || countries[0];
    setActiveCountryConfig(config);
<<<<<<< HEAD
    localStorage.setItem('DriVos_global_country', country);
=======
    localStorage.setItem('drivelegal_global_country', country);
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
  }, [country]);

  // Sync region to localstorage
  useEffect(() => {
<<<<<<< HEAD
    localStorage.setItem('DriVos_global_region', region);
=======
    localStorage.setItem('drivelegal_global_region', region);
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
  }, [region]);

  // Sync city to localstorage
  useEffect(() => {
<<<<<<< HEAD
    localStorage.setItem('DriVos_global_city', city);
=======
    localStorage.setItem('drivelegal_global_city', city);
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
  }, [city]);

  // Unified country/region changer with transition flash
  const changeCountry = (countryId, regionName = '') => {
    const targetConfig = countries.find(c => c.id === countryId);
    if (!targetConfig) return;

    // Start 0.3s flag color flash
    setFlashColor(targetConfig.color || '#3b82f6');
    setIsFlashing(true);
    
    // Set parameters
    setCountry(countryId);
    if (regionName) {
      setRegion(regionName);
      setCity(''); // reset city under new region
    } else {
      // Set default region per country
      if (countryId === 'IN') setRegion('Karnataka');
      else if (countryId === 'AE') setRegion('Dubai');
      else if (countryId === 'US') setRegion('California');
      else if (countryId === 'GB') setRegion('England');
      else if (countryId === 'DE') setRegion('Bavaria');
      else if (countryId === 'AU') setRegion('New South Wales');
      setCity('');
    }

    // End flash after 300ms
    setTimeout(() => {
      setIsFlashing(false);
    }, 450);
  };

  const changeRegion = (newRegion) => {
    setRegion(newRegion);
  };

  return (
    <GlobalContext.Provider value={{
      // Core fields
      country,
      currency: activeCountryConfig.currency,
      currencySymbol: activeCountryConfig.currencySymbol,
      language,
      setLanguage,
      t,
      languages: LANGUAGES,
      transportType,
      setTransportType,
      region,
      city,
      setCity,
      legalSystem: activeCountryConfig.legalSystem,
      unitSystem: activeCountryConfig.unitSystem,
      drivesSide: activeCountryConfig.driveSide.toLowerCase(),
      alcoholLimit: parseFloat(activeCountryConfig.alcoholLimit) || 0.0,
      lastUpdated: '2025-05-27',
      flag: activeCountryConfig.flag,
      activeCountryConfig,
      countries,
      
      // Control functions
      changeCountry,
      changeRegion,
      
      // Animation signals
      isFlashing,
      flashColor
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};
