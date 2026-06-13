import React, { useState, useEffect } from 'react';
import { 
  Plus, CheckCircle, AlertTriangle, HelpCircle, 
  Car, FileText, ArrowRight, TrendingUp, AlertCircle,
  FileCheck, ShieldCheck, MapPin, Eye, UploadCloud, RefreshCw, X, Scale, Bell, Compass, ShieldAlert, Globe
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { useGlobalContext } from '../context/GlobalContext';
<<<<<<< HEAD
import LocationChip from '../components/LocationChip';
=======
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1

export default function DashboardScreen() {
  const { 
    user, vehicles, addCustomVehicle, removeCustomVehicle, 
    isTravelActive, getTravelRules, activeScreen, 
<<<<<<< HEAD
    setActiveScreen, isOffline, location,
=======
    setActiveScreen, isOffline, setLocation, location,
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
    safetyScore, getChallanSummaryStats, challans
  } = useAppState();

  const { t, language, setLanguage, languages } = useGlobalContext();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Guided Onboarding Tour State
  const [showTourPrompt, setShowTourPrompt] = useState(() => {
<<<<<<< HEAD
    return localStorage.getItem('DriVos_tour_completed') !== 'true';
=======
    return localStorage.getItem('drivelegal_tour_completed') !== 'true';
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
  });
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(1);

  const [newVehicleInput, setNewVehicleInput] = useState('');
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [addingError, setAddingError] = useState('');
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('goodMorning');
    if (hour < 18) return t('goodAfternoon');
    return t('goodEvening');
  };

  const getGreetingEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 18) return '👋';
    return '🌙';
  };

  const handleAddVehicleSubmit = (e) => {
    e.preventDefault();
    setAddingError('');
    if (!newVehicleInput) return;

    const success = addCustomVehicle(newVehicleInput, 'Car', 'Karnataka');
    if (success) {
      setNewVehicleInput('');
      setShowAddVehicleModal(false);
    } else {
      setAddingError('Vehicle number already registered or invalid');
    }
  };

  const handleUploadChallan = () => {
    setActiveScreen('scanner');
  };

  const score = safetyScore.score;
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const dynamicStats = getChallanSummaryStats();

  const TOUR_STEPS = [
    {
      targetId: 'tour-greeting',
      title: t('tourTitle') + " ✦ Step 1",
      desc: language === 'hi' ? "मुख्य अभिवादन पैनल: यहां आपका नाम, तिथि, और आपका सक्रिय जीपीएस-आधारित शहर दिखाई देता है।" : "Welcome & Header: Displays your driver greetings, current date, active GPS-synced city, and the 22-language Indian localized switcher.",
    },
    {
      targetId: 'tour-upgrade',
      title: t('tourTitle') + " ✦ Step 2",
      desc: language === 'hi' ? "प्रीमियम अपग्रेड: असीमित एआई कानूनी विश्लेषण, लाइव आरटीओ कैमरा और प्री-ड्राइव रेडार सचेतक सक्षम करें।" : "Premium Features Banner: Unlock unlimited legal checks, real-time camera alerts, safe-driving rewards, and full compliance reporting.",
    },
    {
      targetId: 'score-circle-card',
      title: t('tourTitle') + " ✦ Step 3",
      desc: language === 'hi' ? "सड़क सुरक्षा अनुपालन स्कोर: 0 से 100 तक का आपका स्कोर। लंबित चालानों से अंक कटते हैं और समय पर भुगतान से बढ़ते हैं।" : "Compliance Score Meter: A real-time 0 to 100 safe driving index. Serious infractions lower the score; safe driving and quick settlements restore it.",
    },
    {
      targetId: 'tour-challan-summary',
      title: t('tourTitle') + " ✦ Step 4",
      desc: language === 'hi' ? "चालान सारांश बोर्ड: लंबित, भुगतान किए गए, और विवादित चालानों का पूरा वित्तीय लेखा-जोखा और आँकड़े।" : "Outstanding Summary: Aggregates total pending, paid, and disputed traffic tickets with real-time sync with RTO databases.",
    },
    {
      targetId: 'quick-check-challan-btn',
      title: t('tourTitle') + " ✦ Step 5",
      desc: language === 'hi' ? "चालान चेक सुविधा: 20 से अधिक श्रेणियों के जुर्माने की स्वचालित गणना और सटीक कानूनी धाराओं की जानकारी।" : "Fine Calculator Tool: Dynamic checking of traffic fine amounts across Indian states and 6 major global countries.",
    },
    {
      targetId: 'quick-ai-insights-btn',
      title: t('tourTitle') + " ✦ Step 6",
      desc: language === 'hi' ? "एआई ड्राइविंग अंतर्दृष्टि: आपका व्यक्तिगत ड्राइविंग रिपोर्ट कार्ड और 30-60-90 दिनों की सड़क सुरक्षा सुधार योजना।" : "AI Driving Advisor: Generates customized driving behavior report cards with a 30-60-90 day performance improvement plan.",
    },
    {
      targetId: 'quick-upload-challan-btn',
      title: t('tourTitle') + " ✦ Step 7",
      desc: language === 'hi' ? "ओसीआर चालान स्कैनर: कागज के चालान की फोटो अपलोड करें और हमारा एआई तत्काल सारा विवरण निकाल लेगा।" : "OCR Ticket Scanner: Upload or capture physical challans. The AI automatically extracts ticket numbers, fines, and RTO codes.",
    },
    {
      targetId: 'quick-predrive-check-btn',
      title: t('tourTitle') + " ✦ Step 8",
      desc: language === 'hi' ? "प्री-ड्राइव चेकलिस्ट: प्रदूषण सर्टिफिकेट (PUC) और बीमा की समय सीमा समाप्त होने की सचेत जांच ताकि जुर्माना न लगे।" : "Pre-Drive Compliance Audit: Quick inspections of key documents (PUC, insurance, licenses) to avoid steep penalty traps.",
    },
    {
      targetId: 'quick-zone-alerts-btn',
      title: t('tourTitle') + " ✦ Step 9",
      desc: language === 'hi' ? "क्षेत्र अलर्ट: आपके मार्ग में आने वाले स्पीड कैमरे, रडार, और स्कूल सुरक्षा सीमाओं की अग्रिम चेतावनी।" : "Enforcement Zone alerts: Instant alerts of nearby active speed traps, speed limits, and traffic enforcement zones.",
    },
    {
      targetId: 'tour-phase8',
      title: t('tourTitle') + " ✦ Step 10",
      desc: language === 'hi' ? "पारिस्थितिकी तंत्र अन्वेषण: फेज 8 की नई विशेषताएं - जैसे उपलब्धियां, ड्राइविंग कोच, रोडमैप और शैक्षिक क्विज़।" : "Phase 8 Future Hub: Explore dynamic ecosystem layers, gamified compliance streak badges, road safety lessons, and timeline roadmap.",
    }
  ];

  // Highlight tour targets on step change
  useEffect(() => {
    if (tourActive) {
      const step = TOUR_STEPS[tourStep - 1];
      if (step) {
        const el = document.getElementById(step.targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('ring-4', 'ring-amber-500', 'glow-amber', 'scale-[1.02]', 'z-50', 'relative', 'transition-all');
        }
      }
    }
    return () => {
      TOUR_STEPS.forEach(step => {
        const el = document.getElementById(step.targetId);
        if (el) {
          el.classList.remove('ring-4', 'ring-amber-500', 'glow-amber', 'scale-[1.02]', 'z-50', 'relative');
        }
      });
    };
  }, [tourActive, tourStep]);

  const getScoreColor = (val) => {
    if (val >= 80) return 'stroke-emerald-500 text-emerald-400';
    if (val >= 50) return 'stroke-amber-500 text-amber-400';
    return 'stroke-red-500 text-red-400';
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 lg:pb-8 space-y-6 max-w-md md:max-w-2xl lg:max-w-none mx-auto w-full select-none text-slate-800 dark:text-slate-100">
      
      {/* 1. TOP ROW: WELCOME BANNER (Dynamic Greeting) */}
      <div id="tour-greeting" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2 border-b border-slate-100 dark:border-white/5 pb-4">
        <div className="space-y-0.5 text-left">
          <h3 className="text-xl lg:text-2xl font-heading font-black text-slate-850 dark:text-white tracking-wide">
            {getGreeting()}, {user?.name.split(' ')[0]} {getGreetingEmoji()}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Mobile Bell Button (Hidden on Desktop) */}
          <button
            onClick={() => setActiveScreen('reminders')}
            id="dashboard-bell-btn"
            className="relative lg:hidden bg-red-500/10 border border-red-500/20 rounded-xl p-2.5 text-red-500 hover:bg-red-500/20 transition-all shrink-0"
            title="Payment Reminders"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white dark:border-navy animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white dark:border-navy" />
          </button>
          
<<<<<<< HEAD
          <LocationChip compact className="shrink-0" />
=======
          <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-[10px] font-extrabold text-slate-700 dark:text-slate-350 tracking-wider">
            <MapPin className="w-4 h-4 text-electric-glow animate-pulse" />
            <span>{location.city.toUpperCase()}, {location.state.substring(0, 2).toUpperCase()}</span>
          </div>
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1

          {/* PREMIUM CONSTITUTIONAL INDIAN LANGUAGE DROPDOWN SELECTOR */}
          <div className="relative shrink-0 select-none">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-[10px] font-extrabold text-slate-700 dark:text-slate-350 tracking-wider transition-all select-none focus:outline-none"
              title="Select Language / भाषा चुनें"
              id="dashboard-lang-selector-btn"
            >
              <Globe className="w-3.5 h-3.5 text-electric animate-spin-slow" />
              <span>{languages.find(l => l.id === language)?.native || 'English'}</span>
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
                      <span className={`text-[7.5px] leading-tight ${language === lang.id ? 'text-white/80' : 'text-slate-400'}`}>
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. UPGRADE BANNER ROW (Full Width) */}
      <div id="tour-upgrade" className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-electric/10 border border-amber-500/20 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-left">
          <span className="text-[7.5px] bg-amber-500 text-slate-950 font-extrabold uppercase px-2 py-0.5 rounded-md inline-block tracking-widest">
            {t('premiumUnlocked')}
          </span>
          <h4 className="text-xs lg:text-sm font-black text-slate-850 dark:text-white mt-1">
            Unlock Unlimited AI Traffic Law Compliance
          </h4>
          <p className="text-[10px] lg:text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-2xl">
            Avoid 10x compounding fines! Upgrade now for unlimited AI explanations, real-time RTO scanner uploads, and pre-drive radar alerts.
          </p>
        </div>
        <button
          onClick={() => setActiveScreen('pricing')}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0 focus:outline-none"
        >
          {t('upgrade')}
        </button>
      </div>

      {/* 3. FLUID GRID UTILITIES ROW (2 columns on mobile, 3 on tablet, 6 in a single row on desktop) */}
      <div className="space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block px-1 text-left">
          Compliance Utilities
        </span>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <button
            onClick={() => setActiveScreen('checker')}
            className="glass-panel p-4 text-left hover:border-electric/50 hover:bg-slate-100/50 dark:hover:bg-electric/5 transition-all group flex flex-col justify-between h-28 relative overflow-hidden"
            id="quick-check-challan-btn"
          >
            <div className="bg-electric/15 p-2.5 rounded-xl text-electric w-max group-hover:scale-105 transition-transform duration-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-850 dark:text-white block leading-tight">{t('checkChallan')}</span>
              <span className="text-[8.5px] text-slate-500 dark:text-slate-450 block mt-0.5 leading-tight font-semibold">{t('complianceDesc')}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:translate-x-1 group-hover:text-electric transition-all absolute bottom-4 right-4" />
          </button>

          <button
            onClick={() => setActiveScreen('insights')}
            className="glass-panel p-4 text-left hover:border-electric/50 hover:bg-slate-100/50 dark:hover:bg-electric/5 transition-all group flex flex-col justify-between h-28 relative overflow-hidden"
            id="quick-ai-insights-btn"
          >
            <div className="bg-indigo-500/15 p-2.5 rounded-xl text-indigo-500 dark:text-indigo-400 w-max group-hover:scale-105 transition-transform duration-300">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-850 dark:text-white block leading-tight">{t('aiInsights')}</span>
              <span className="text-[8.5px] text-slate-500 dark:text-slate-450 block mt-0.5 leading-tight font-semibold">{t('aiInsightsDesc')}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:translate-x-1 group-hover:text-indigo-400 transition-all absolute bottom-4 right-4" />
          </button>

          <button
            onClick={handleUploadChallan}
            className="glass-panel p-4 text-left hover:border-electric/50 hover:bg-slate-100/50 dark:hover:bg-electric/5 transition-all group flex flex-col justify-between h-28 relative overflow-hidden"
            id="quick-upload-challan-btn"
          >
            <div className="bg-emerald-500/15 p-2.5 rounded-xl text-emerald-500 dark:text-emerald-400 w-max group-hover:scale-105 transition-transform duration-300">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-850 dark:text-white block leading-tight">{t('uploadChallan')}</span>
              <span className="text-[8.5px] text-slate-500 dark:text-slate-450 block mt-0.5 leading-tight font-semibold">{t('uploadDesc')}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:translate-x-1 group-hover:text-emerald-400 transition-all absolute bottom-4 right-4" />
          </button>

          <button
            onClick={() => setActiveScreen('preDrive')}
            className="glass-panel p-4 text-left hover:border-electric/50 hover:bg-slate-100/50 dark:hover:bg-electric/5 transition-all group flex flex-col justify-between h-28 relative overflow-hidden"
            id="quick-predrive-check-btn"
          >
            <div className="bg-cyan-500/15 p-2.5 rounded-xl text-cyan-500 dark:text-cyan-450 w-max group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-850 dark:text-white block leading-tight">{t('preDriveCheck')}</span>
              <span className="text-[8.5px] text-slate-500 dark:text-slate-450 block mt-0.5 leading-tight font-semibold">{t('preDriveDesc')}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:translate-x-1 group-hover:text-cyan-400 transition-all absolute bottom-4 right-4" />
          </button>

          <button
            onClick={() => setActiveScreen('zoneAlerts')}
            className="glass-panel p-4 text-left hover:border-electric/50 hover:bg-slate-100/50 dark:hover:bg-electric/5 transition-all group flex flex-col justify-between h-28 relative overflow-hidden"
            id="quick-zone-alerts-btn"
          >
            <div className="bg-amber-500/15 p-2.5 rounded-xl text-amber-500 dark:text-amber-400 w-max group-hover:scale-105 transition-transform duration-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-850 dark:text-white block leading-tight">{t('zoneAlerts')}</span>
              <span className="text-[8.5px] text-slate-500 dark:text-slate-450 block mt-0.5 leading-tight font-semibold">{t('zoneDesc')}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:translate-x-1 group-hover:text-amber-400 transition-all absolute bottom-4 right-4" />
          </button>

          <button
            onClick={() => setActiveScreen('profile')}
            className="glass-panel p-4 text-left hover:border-electric/50 hover:bg-slate-100/50 dark:hover:bg-electric/5 transition-all group flex flex-col justify-between h-28 relative overflow-hidden"
            id="quick-travel-mode-btn"
          >
            <div className="bg-pink-500/15 p-2.5 rounded-xl text-pink-500 dark:text-pink-400 w-max group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-850 dark:text-white block leading-tight">{t('myProfile')}</span>
              <span className="text-[8.5px] text-slate-500 dark:text-slate-450 block mt-0.5 leading-tight font-semibold">{t('preDriveDesc')}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:translate-x-1 group-hover:text-pink-400 transition-all absolute bottom-4 right-4" />
          </button>

        </div>
      </div>

      {/* PHASE 8 — What's New Strip (Mobile-first, horizontally scrollable) */}
      <div id="tour-phase8" className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-black text-slate-400">What's New</span>
            <span className="text-[7.5px] bg-electric/15 text-electric border border-electric/25 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-widest animate-pulse">Phase 8</span>
          </div>
          <button
            onClick={() => setActiveScreen('ecosystem')}
            className="text-[10px] font-black text-electric hover:text-electric-glow transition-all uppercase tracking-wider"
          >
            See All
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
          {[
            { id: 'ecosystem',    emoji: '🌐', label: 'Ecosystem',    sub: 'Platform architecture map', color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30',    badge: 'bg-blue-500/15 text-blue-400 border-blue-500/25' },
            { id: 'achievements', emoji: '🏆', label: 'Achievements', sub: 'Badges & streak tracker',   color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',  badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25' },
            { id: 'aiCoach',      emoji: '🤖', label: 'AI Coach',     sub: 'Your personalised coach',   color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30', badge: 'bg-purple-500/15 text-purple-400 border-purple-500/25' },
            { id: 'roadmap',      emoji: '🗺️', label: 'Roadmap',      sub: 'Phase 1–12 timeline',       color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              id={`dashboard-phase8-${item.id}-btn`}
              className={`snap-start shrink-0 w-36 flex flex-col gap-2.5 p-3.5 rounded-2xl border bg-gradient-to-br ${item.color} text-left hover:scale-[1.02] active:scale-95 transition-all duration-200`}
            >
              <span className="text-2xl leading-none">{item.emoji}</span>
              <div className="space-y-0.5">
                <p className="text-[10px] font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider">{item.label}</p>
                <p className="text-[8.5px] text-slate-500 dark:text-slate-400 font-medium leading-tight">{item.sub}</p>
              </div>
              <span className={`text-[7.5px] font-extrabold uppercase tracking-widest border px-2 py-0.5 rounded-full w-max ${item.badge}`}>New ✦</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. SPLIT LAYOUT GRID: Left/Center Main Column vs Right Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* A. LEFT/CENTER MAIN COLUMN (Spans 2 columns on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Linked Vehicles Card */}
          <div className="glass-panel p-5 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-electric/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-150 dark:border-white/5">
              <div className="flex items-center gap-2">
                <Car className="w-4.5 h-4.5 text-electric-glow" />
                <h4 className="text-xs font-heading font-extrabold uppercase text-slate-850 dark:text-slate-200 tracking-wider">
                  Linked Garage Vehicles ({vehicles.length})
                </h4>
              </div>
              <button 
                onClick={() => setShowAddVehicleModal(true)}
                className="p-1.5 rounded-xl bg-slate-150 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-electric active:scale-95 transition-all"
                title="Link another vehicle"
                id="add-vehicle-btn-desktop"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {vehicles.map((v) => (
                <div 
                  key={v.plate || v} 
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold tracking-wider transition-all duration-300 bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300"
                >
                  <span>{v.plate || v}</span>
                  {v.type && <span className="text-[7.5px] bg-electric/15 text-electric px-2 py-0.5 rounded font-extrabold uppercase">{v.type}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Primary Score & Statistics Panel */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            {/* Road Safety Score circular gauge - CLICKABLE */}
            <div 
              onClick={() => setActiveScreen('score')}
              className="md:col-span-2 glass-panel p-5 flex flex-col items-center justify-center text-center space-y-3 relative cursor-pointer hover:bg-slate-100/50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all"
              id="score-circle-card"
            >
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block">
                Compliance Score
              </span>
              <div className="relative flex items-center justify-center w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    className="stroke-slate-100 dark:stroke-white/5"
                    strokeWidth="7"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    className={`transition-all duration-1000 ease-out ${getScoreColor(score).split(' ')[0]}`}
                    strokeWidth="7"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className={`text-2xl font-mono font-black tabular-nums ${getScoreColor(score).split(' ')[1]}`}>
                    {score}
                  </span>
                  <span className="text-[8px] font-mono font-extrabold text-slate-500 uppercase tracking-widest leading-none mt-0.5">
                    / 100
                  </span>
                </div>
              </div>
              <span className={`text-[8.5px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                score >= 80 ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                score >= 50 ? 'bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400'
              }`}>
                {safetyScore.label}
              </span>
            </div>

            {/* Statistics Cards */}
            <div id="tour-challan-summary" className="md:col-span-3 glass-panel p-5 flex flex-col justify-between space-y-4">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block text-left">
                Challan Summary
              </span>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-3">
                  <span className="block text-xl font-heading font-black text-slate-800 dark:text-white font-mono">
                    {dynamicStats.total}
                  </span>
                  <span className="text-[9px] text-slate-550 font-bold uppercase tracking-wider block mt-0.5">Total</span>
                </div>
                
                <div className="bg-red-500/10 border border-red-500/10 rounded-2xl p-3 glow-red">
                  <span className="block text-xl font-heading font-black text-red-600 dark:text-red-400 font-mono">
                    {dynamicStats.pending}
                  </span>
                  <span className="text-[9px] text-red-600 dark:text-red-400 font-extrabold uppercase tracking-wider block mt-0.5 animate-pulse">Pending</span>
                </div>
                
                <div className="bg-emerald-500/10 border border-emerald-500/10 rounded-2xl p-3 glow-green">
                  <span className="block text-xl font-heading font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {dynamicStats.paid}
                  </span>
                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-wider block mt-0.5">Paid</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 py-2 px-3.5 rounded-xl font-bold leading-none">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>RTO compliance database synced successfully</span>
              </div>
            </div>

          </div>

          {/* Recent Violations List */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block text-left">
                Recent Violation Records
              </span>
              <button 
                onClick={() => setActiveScreen('history')}
                className="text-[10px] font-black text-electric hover:text-electric-glow transition-all uppercase tracking-wider"
              >
                View All Records
              </button>
            </div>

            <div className="space-y-2.5">
              {challans.slice(0, 3).map((violation) => (
                <div 
                  key={violation.id} 
                  className="glass-panel p-4 flex items-center justify-between hover:bg-slate-100/50 dark:hover:bg-white/10 transition-all text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl ${
                      violation.status === 'Pending' 
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/10 animate-pulse' 
                        : violation.status === 'Disputed'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/10'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10'
                    }`}>
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-slate-800 dark:text-white block">{violation.violation}</span>
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-semibold uppercase tracking-wider">
                        {violation.date} • {violation.section}
                      </span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-xs font-mono font-bold text-slate-850 dark:text-white block tabular-nums text-right">
                      ₹{violation.amount.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-[8px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block ${
                      violation.status === 'Pending' 
                        ? 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 glow-red' 
                        : violation.status === 'Disputed'
                          ? 'bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 glow-amber'
                          : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 glow-green'
                    }`}>
                      {violation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* B. RIGHT SIDEBAR PANEL (Spans 1 column on desktop) */}
        <div className="space-y-4">
          
          {/* Travel Mode Alert Card (Shown only if traveling) */}
          {isTravelActive && (
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-3.5 shadow-xl glow-amber animate-fade-in text-left">
              <div className="flex items-start gap-3">
                <div className="bg-amber-500/20 p-2 rounded-xl text-amber-400 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                    Cross-Border Travel Alert
                  </h4>
                  <p className="text-[11px] leading-normal text-slate-700 dark:text-slate-350">
                    You are in <strong className="text-slate-900 dark:text-white">{location.state}</strong>. Your vehicle <strong className="text-slate-900 dark:text-white">{user?.primaryVehicle}</strong> is registered in <strong className="text-slate-900 dark:text-white">{user?.registeredState}</strong>.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-amber-500/15 pt-3 space-y-2">
                <span className="block text-[8px] uppercase tracking-wider font-extrabold text-amber-700 dark:text-amber-400">
                  Local Rules Mismatches:
                </span>
                <ul className="text-[9.5px] leading-relaxed text-slate-700 dark:text-slate-350 list-disc list-inside space-y-1">
                  {getTravelRules()?.keyDifferences.slice(0, 2).map((diff, i) => (
                    <li key={i} className="truncate">{diff}</li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => setActiveScreen('travelAlert')} 
                className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-black py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
              >
                <span>Review Travel safety</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Prevention Intelligence Banner */}
          <div 
            onClick={() => setActiveScreen('insights')}
            className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4.5 flex flex-col justify-between gap-3.5 text-left cursor-pointer hover:bg-amber-500/15 transition-all shadow-md group relative overflow-hidden"
            id="dashboard-prevention-banner-desktop"
          >
            <div className="flex gap-3">
              <div className="bg-amber-500/25 p-2 rounded-xl text-amber-600 dark:text-amber-400 shrink-0 group-hover:scale-105 transition-all w-max h-max">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-805 dark:text-white uppercase tracking-wider">Prevention Alert</span>
                  <span className="text-[7.5px] bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold uppercase px-1.5 py-0.5 rounded leading-none">High Risk</span>
                </div>
                <p className="text-[10px] text-slate-550 dark:text-slate-400 leading-normal font-semibold mt-1">
                  Pattern warning: Frequent over-speeding snapped near Silk Board camera point. Adjust speed to avoid ₹2,000 auto-challans.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mt-1 justify-end">
              <span>View Safety Suggestions</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* AI Scenario Simulator Banner */}
          <button
            onClick={() => setActiveScreen('scenario')}
            className="w-full bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-indigo-500/30 rounded-2xl p-4.5 flex flex-col gap-3.5 text-left shadow group"
            id="quick-scenario-simulator-btn-desktop"
          >
            <div className="flex gap-3">
              <div className="bg-indigo-500/20 p-2.5 rounded-xl text-indigo-500 dark:text-indigo-400 shrink-0 group-hover:scale-105 transition-transform duration-300 h-max w-max">
                <Scale className="w-5.5 h-5.5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">AI Scenario Simulator</span>
                  <span className="text-[7px] bg-indigo-500/15 text-indigo-500 dark:text-indigo-400 font-extrabold uppercase px-1.5 py-0.5 rounded">NEW</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-normal mt-1">
                  Run simulated driving violations to see how cumulative fines compound and learn courtroom defense tips.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-wider mt-1 justify-end">
              <span>Test Simulated Scenarios</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Insurance Expiry Strip */}
          <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-center justify-between gap-3 text-left">
            <div className="flex items-start gap-2.5">
              <div className="bg-blue-500/20 p-1.5 rounded-lg text-blue-500 shrink-0">
                <AlertTriangle className="w-4 h-4 animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs text-slate-850 dark:text-slate-200 block font-bold">Insurance Expiring Soon</span>
                <span className="text-[9px] text-slate-500 leading-tight block font-semibold">KA03CD1234 policy expires in 12 days. Secure renewal leads to safety score upgrades.</span>
              </div>
            </div>
            <button 
              onClick={() => setActiveScreen('checker')}
              className="text-[9px] font-black text-electric hover:text-electric-glow transition-all uppercase tracking-wider shrink-0 focus:outline-none"
            >
              Renew
            </button>
          </div>

        </div>

      </div>

      {/* Add Vehicle Quick Modal Overlay */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-modal max-w-sm w-full p-5 border border-slate-200 dark:border-white/10 animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-heading font-extrabold text-slate-800 dark:text-slate-200 text-sm tracking-wider uppercase">
                Link Additional Vehicle
              </span>
              <button 
                onClick={() => setShowAddVehicleModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/15 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {addingError && (
              <span className="block text-[10px] text-red-500 font-semibold bg-red-500/10 border border-red-500/25 p-2 rounded-lg text-center">
                {addingError}
              </span>
            )}

            <form onSubmit={handleAddVehicleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                  Vehicle Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. MH12AB5678"
                  value={newVehicleInput}
                  onChange={(e) => setNewVehicleInput(e.target.value.toUpperCase())}
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3.5 text-slate-800 dark:text-white text-xs font-bold uppercase tracking-wider placeholder:text-slate-400 focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none transition-all"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full bg-electric text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-electric/25 hover:bg-electric-glow transition-all"
              >
                Link Vehicle
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Onboarding Tour Prompt Modal */}
      {showTourPrompt && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-modal max-w-sm w-full p-6 border border-slate-250 dark:border-white/10 animate-fade-in text-center space-y-4 shadow-2xl relative">
            <div className="absolute top-3 right-3">
              <button 
                onClick={() => {
                  setShowTourPrompt(false);
<<<<<<< HEAD
                  localStorage.setItem('DriVos_tour_completed', 'true');
=======
                  localStorage.setItem('drivelegal_tour_completed', 'true');
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-electric/15 text-electric p-3 rounded-full w-max mx-auto shadow-inner animate-bounce">
              <Compass className="w-8 h-8 text-electric" />
            </div>
            <h4 className="text-sm font-heading font-black text-slate-800 dark:text-white uppercase tracking-wider">
              {t('tourTitle')}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed font-semibold">
              {t('newToApp')}
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setShowTourPrompt(false);
                  setTourActive(true);
                  setTourStep(1);
                }}
                className="flex-1 bg-electric hover:bg-electric-glow text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-electric/25"
              >
                {t('beginTour')}
              </button>
              <button
                onClick={() => {
                  setShowTourPrompt(false);
<<<<<<< HEAD
                  localStorage.setItem('DriVos_tour_completed', 'true');
=======
                  localStorage.setItem('drivelegal_tour_completed', 'true');
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
                }}
                className="flex-1 bg-slate-100 dark:bg-white/5 border border-slate-250 dark:border-white/10 text-slate-550 dark:text-slate-400 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:bg-slate-200 dark:hover:bg-white/10"
              >
                {t('skip')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Onboarding Guided Tour Overlay Tooltip Box */}
      {tourActive && (
        <div className="fixed inset-x-0 bottom-24 z-[100] flex items-center justify-center px-4 pointer-events-none">
          <div className="glass-modal max-w-sm w-full p-5 border border-amber-500/40 dark:border-amber-500/35 shadow-2xl relative animate-slide-up pointer-events-auto space-y-3.5 bg-white/95 dark:bg-navy-950/95 text-slate-800 dark:text-white select-none">
            
            {/* Step Progress indicator */}
            <div className="flex justify-between items-center text-[8.5px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
<<<<<<< HEAD
              <span>{TOUR_STEPS[tourStep - 1]?.title || 'DriVos Onboarding'}</span>
=======
              <span>{TOUR_STEPS[tourStep - 1]?.title || 'DRIVELEGAL Onboarding'}</span>
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
              <span>Step {tourStep} of {TOUR_STEPS.length}</span>
            </div>
            
            <div className="w-full bg-slate-200 dark:bg-white/5 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${(tourStep / TOUR_STEPS.length) * 100}%` }}
              />
            </div>

            {/* Step Description */}
            <p className="text-xs text-slate-650 dark:text-slate-200 leading-relaxed font-semibold">
              {TOUR_STEPS[tourStep - 1]?.desc}
            </p>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center gap-3 pt-1">
              <button
                onClick={() => {
                  setTourActive(false);
<<<<<<< HEAD
                  localStorage.setItem('DriVos_tour_completed', 'true');
=======
                  localStorage.setItem('drivelegal_tour_completed', 'true');
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
                }}
                className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all focus:outline-none"
              >
                {t('skip')}
              </button>

              <div className="flex items-center gap-2">
                {tourStep > 1 && (
                  <button
                    onClick={() => setTourStep(prev => prev - 1)}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-350 hover:text-slate-800 dark:hover:text-white font-bold py-1.5 px-3 rounded-lg text-[10px] uppercase tracking-wider transition-all focus:outline-none border border-slate-200 dark:border-white/5"
                  >
                    {t('back')}
                  </button>
                )}

                {tourStep < TOUR_STEPS.length ? (
                  <button
                    onClick={() => setTourStep(prev => prev + 1)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-1.5 px-4.5 rounded-lg text-[10px] uppercase tracking-widest transition-all shadow-md shadow-amber-500/10 focus:outline-none"
                  >
                    {t('next')}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setTourActive(false);
<<<<<<< HEAD
                      localStorage.setItem('DriVos_tour_completed', 'true');
=======
                      localStorage.setItem('drivelegal_tour_completed', 'true');
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
                      
                      // Trigger dynamic confetti burst animation!
                      const burst = document.createElement('div');
                      burst.className = 'fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden';
                      burst.innerHTML = Array.from({ length: 40 }).map((_, i) => {
                        const size = Math.random() * 8 + 5;
                        const left = Math.random() * 100;
                        const top = Math.random() * 100;
                        const delay = Math.random() * 2;
                        const color = ['#3b82f6', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 5)];
                        return `<span style="position:absolute; width:${size}px; height:${size}px; background:${color}; left:${left}%; top:${top}%; border-radius:50%; animation: floatBurst 2s ease-out forwards; animation-delay:${delay}s"></span>`;
                      }).join('');
                      document.body.appendChild(burst);
                      setTimeout(() => burst.remove(), 4000);
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-1.5 px-4.5 rounded-lg text-[10px] uppercase tracking-widest transition-all shadow-md shadow-emerald-500/10 focus:outline-none"
                  >
                    {t('finish')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for upload laser & tour animations */}
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; }
          50% { top: 100%; }
        }
        @keyframes floatBurst {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-120px) scale(0) rotate(360deg); opacity: 0; }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
