import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Check, Play, Car, HelpCircle, Bot, AlertTriangle, 
  MapPin, ClipboardList, Settings, Award, Users, Scale, ArrowRight, 
  Menu, X, Sparkles, ShieldAlert, FileText, ChevronRight, Globe, Lock, ExternalLink
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import ThemeToggle from '../components/ThemeToggle';


export default function LandingScreen() {
  const { setActiveScreen } = useAppState();

  // Navigation menu state for mobile hamburger
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavbarShrunk, setIsNavbarShrunk] = useState(false);

  // Custom Dot Cursor state
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [showCursor, setShowCursor] = useState(false);

  // Live Demo Section states
  const [demoState, setDemoState] = useState('Karnataka');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [demoVehicle, setDemoVehicle] = useState('Two-Wheeler');
  const [selectedViolations, setSelectedViolations] = useState(['helmet']); // Default pre-select helmet
  const [activeFooterTab, setActiveFooterTab] = useState(null);

  // Tracks navbar shrink on scroll past hero
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsNavbarShrunk(true);
      } else {
        setIsNavbarShrunk(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom mouse cursor listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setShowCursor(true);
    };
    const handleMouseLeave = () => {
      setShowCursor(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Dynamic Scroll revealing observer simulation
  const [revealHero, setRevealHero] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setRevealHero(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Section 6 Live Demo calculations
  const violationCatalog = [
    { id: 'helmet', label: 'No Helmet', fine: 1000, code: 'Sec 129, MV Act' },
    { id: 'insurance', label: 'No Insurance', fine: 2000, code: 'Sec 196, MV Act' },
    { id: 'speeding', label: 'Over-speeding', fine: 1000, code: 'Sec 112, MV Act' },
    { id: 'redlight', label: 'Red Light Jump', fine: 1000, code: 'Sec 119, MV Act' },
    { id: 'seatbelt', label: 'No Seatbelt', fine: 1000, code: 'Sec 138(3), MV Act' },
    { id: 'triple', label: 'Triple Riding', fine: 1000, code: 'Sec 128, MV Act' },
    { id: 'license', label: 'No Licence', fine: 5000, code: 'Sec 181, MV Act' },
    { id: 'mobile', label: 'Mobile While Driving', fine: 1500, code: 'Sec 184, MV Act' }
  ];

  const handleToggleViolation = (id) => {
    setSelectedViolations(prev => {
      if (prev.includes(id)) {
        return prev.filter(v => v !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const calculatedItems = violationCatalog.filter(item => selectedViolations.includes(item.id));
  const totalDemoFine = calculatedItems.reduce((sum, item) => sum + item.fine, 0);

  const getSeverity = () => {
    if (totalDemoFine === 0) return { label: 'LOW 🟢', class: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' };
    if (totalDemoFine <= 2000) return { label: 'MEDIUM 🟡', class: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400' };
    return { label: 'HIGH 🔴', class: 'bg-red-500/10 border-red-500/20 text-red-650 dark:text-red-400' };
  };

  const activeSeverity = getSeverity();

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen text-slate-800 dark:text-slate-100 font-sans relative overflow-x-hidden scroll-smooth select-none bg-slate-900/10 dark:bg-navy-950/20 transition-colors duration-300">
      
      {/* Premium Desktop Dot Cursor */}
      {showCursor && (
        <div 
          className="hidden lg:block fixed w-5 h-5 bg-amber-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-75 ease-out"
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        />
      )}

      {/* SECTION 1 — STICKY NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg border-b border-slate-200/40 dark:border-white/5 bg-white/70 dark:bg-navy-950/75 ${
        isNavbarShrunk ? 'py-3 shadow-md' : 'py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo assembly */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleScrollToSection('hero-section')}>
<<<<<<< HEAD
            <div className="rounded-xl overflow-hidden shadow-lg shadow-electric/25 group-hover:scale-105 transition-all w-9 h-9 shrink-0">
              <img src="/drivos-logo.jpg" alt="DriVos" className="w-full h-full object-cover" />
            </div>
            <span className="font-heading font-black text-lg tracking-wider bg-gradient-to-r from-slate-900 dark:from-white via-slate-700 dark:via-slate-200 to-electric bg-clip-text text-transparent uppercase leading-none">
              DriVos
=======
            <div className="bg-gradient-to-tr from-electric to-blue-600 p-2 rounded-xl text-white shadow-lg shadow-electric/25 group-hover:scale-105 transition-all">
              <Shield className="w-5 h-5 fill-white/10" />
            </div>
            <span className="font-heading font-black text-lg tracking-wider bg-gradient-to-r from-slate-900 dark:from-white via-slate-700 dark:via-slate-200 to-electric bg-clip-text text-transparent uppercase leading-none">
              DRIVELEGAL
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-350">
            <button onClick={() => handleScrollToSection('what-is-section')} className="hover:text-electric transition-colors">Features</button>
            <button onClick={() => handleScrollToSection('how-it-works-section')} className="hover:text-electric transition-colors">How It Works</button>
            <button onClick={() => handleScrollToSection('pricing-section')} className="hover:text-electric transition-colors">Pricing</button>
            <button onClick={() => handleScrollToSection('demo-section')} className="hover:text-electric transition-colors">Interactive Demo</button>
            <button onClick={() => handleScrollToSection('authorities-section')} className="hover:text-electric transition-colors">For Authorities</button>
            <button onClick={() => setActiveScreen('auth')} className="text-amber-500 hover:text-amber-450 transition-colors font-black">Officer Portal</button>
          </div>

          {/* Nav CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="mr-1">
              <ThemeToggle />
            </div>
            <button 
              onClick={() => setActiveScreen('auth')}
              className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-350 hover:text-electric transition-colors px-4 py-2"
            >
              Login
            </button>
            <button 
              onClick={() => setActiveScreen('auth')}
              className="bg-electric hover:bg-electric-glow text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-electric/20 active:scale-95 transition-all"
            >
              Get Started Free
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Slide-down Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-white/5 py-5 px-6 space-y-4 shadow-xl animate-slide-down flex flex-col font-bold uppercase tracking-wider text-xs text-slate-650 dark:text-slate-300">
            <button onClick={() => handleScrollToSection('what-is-section')} className="text-left py-2 hover:text-electric border-b border-slate-100 dark:border-white/5">Features</button>
            <button onClick={() => handleScrollToSection('how-it-works-section')} className="text-left py-2 hover:text-electric border-b border-slate-100 dark:border-white/5">How It Works</button>
            <button onClick={() => handleScrollToSection('pricing-section')} className="text-left py-2 hover:text-electric border-b border-slate-100 dark:border-white/5">Pricing</button>
            <button onClick={() => handleScrollToSection('demo-section')} className="text-left py-2 hover:text-electric border-b border-slate-100 dark:border-white/5">Interactive Demo</button>
            <button onClick={() => handleScrollToSection('authorities-section')} className="text-left py-2 hover:text-electric border-b border-slate-100 dark:border-white/5">For Authorities</button>

            <div className="flex gap-3 pt-2 items-center">
              <div className="flex items-center justify-center pr-3 border-r border-slate-200 dark:border-white/15">
                <ThemeToggle />
              </div>
              <button 
                onClick={() => setActiveScreen('auth')}
                className="flex-1 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-white py-2.5 rounded-xl text-center"
              >
                Login
              </button>
              <button 
                onClick={() => setActiveScreen('auth')}
                className="flex-1 bg-electric text-white py-2.5 rounded-xl text-center shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* SECTION 2 — HERO */}
      <section id="hero-section" className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6 relative max-w-7xl mx-auto w-full">
        {/* Glow Graphic background blobs */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-electric/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Text Column */}
          <div className={`space-y-6 text-left transition-all duration-1000 transform ${
            revealHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* India badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-extrabold uppercase tracking-wider text-slate-650 dark:text-slate-300">
              <span>Built for Indian Roads</span>
              <span>🇮🇳</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl xs:text-5xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05] text-slate-850 dark:text-white">
              Know Your Challan. <br />
              <span className="bg-gradient-to-r from-electric via-blue-500 to-amber-500 bg-clip-text text-transparent">
                Own The Road.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm xs:text-base text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-lg">
              India's first AI-powered traffic compliance app. Understand fines, track challans, learn traffic laws, and drive smarter — in your own language.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => handleScrollToSection('demo-section')}
                className="bg-electric hover:bg-electric-glow text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl shadow-xl shadow-electric/25 hover:scale-105 active:scale-98 transition-all animate-pulse-scale"
              >
                Try Free Demo
              </button>
              
              <button
                onClick={() => handleScrollToSection('how-it-works-section')}
                className="border border-slate-300 dark:border-white/10 hover:bg-slate-150 dark:hover:bg-white/5 text-slate-700 dark:text-white font-extrabold text-xs uppercase tracking-wider px-6 py-4 rounded-2xl flex items-center gap-2 transition-all active:scale-98"
              >
                <Play className="w-4 h-4 fill-current text-electric" />
                <span>See How It Works</span>
              </button>
            </div>

            {/* Trust strip */}
            <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex flex-wrap items-center gap-3.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-electric-glow" /> No login needed for demo</span>
              <span>•</span>
              <span>100% free to start</span>
              <span>•</span>
              <span>India traffic laws</span>
            </div>
          </div>

          {/* Right Visual Column (Floating Mockup) */}
          <div className="relative flex justify-center items-center h-full min-h-[300px]">
            {/* Abstract gradient mesh backdrop */}
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-navy-900 via-electric/10 to-amber-500/10 rounded-full blur-[80px] pointer-events-none select-none opacity-60" />

            {/* Desktop Mockup Card */}
            <div className="relative w-full max-w-[340px] bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-3xl p-5 shadow-2xl animate-float group z-20">
              
              {/* Mock welcome bar */}
              <div className="flex justify-between items-center pb-3.5 border-b border-slate-150 dark:border-white/5 mb-3.5">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Profile</span>
                  <strong className="text-xs text-slate-800 dark:text-white flex items-center gap-1 font-bold">Good Morning, Arjun 👋</strong>
                </div>
                <span className="bg-electric/10 text-electric text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">KA03CD1234</span>
              </div>

              {/* 3 stat chips */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold mb-4">
                <div className="bg-slate-100 dark:bg-white/5 p-2 rounded-xl border border-slate-200 dark:border-white/5">
                  <span className="block text-slate-500 dark:text-slate-400 uppercase text-[8px]">Challans</span>
                  <strong className="text-slate-800 dark:text-white text-xs font-mono">12</strong>
                </div>
                <div className="bg-red-500/10 border border-red-500/10 p-2 rounded-xl text-red-500">
                  <span className="block text-red-500/70 uppercase text-[8px]">Pending</span>
                  <strong className="text-xs font-mono text-red-500">3</strong>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/15 p-2 rounded-xl text-amber-500">
                  <span className="block text-amber-500/70 uppercase text-[8px]">Score</span>
                  <strong className="text-xs font-mono text-amber-500">67/100</strong>
                </div>
              </div>

              {/* 2x2 action buttons mockup */}
              <div className="grid grid-cols-2 gap-2 text-[9px] font-extrabold uppercase">
                <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-2.5 rounded-xl flex items-center gap-1.5 text-slate-700 dark:text-slate-350">
                  <FileText className="w-3.5 h-3.5 text-electric-glow" /> Check Challans
                </div>
                <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-2.5 rounded-xl flex items-center gap-1.5 text-slate-700 dark:text-slate-350">
                  <Bot className="w-3.5 h-3.5 text-indigo-500" /> AI Insights
                </div>
                <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-2.5 rounded-xl flex items-center gap-1.5 text-slate-700 dark:text-slate-350">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> Zone Alerts
                </div>
                <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-2.5 rounded-xl flex items-center gap-1.5 text-slate-700 dark:text-slate-350">
                  <Settings className="w-3.5 h-3.5 text-pink-500" /> RTO Profile
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* SECTION 3 — WHAT IS DriVos */}
=======
      {/* SECTION 3 — WHAT IS DRIVELEGAL */}
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
      <section id="what-is-section" className="py-20 px-6 max-w-7xl mx-auto w-full text-center scroll-mt-20">
        <div className="space-y-3 mb-12">
          <span className="text-[10px] text-electric font-black uppercase tracking-widest block">Traffic Compliance Made Simple</span>
          <h2 className="text-3xl font-heading font-black text-slate-850 dark:text-white">
<<<<<<< HEAD
            What is DriVos?
=======
            What is DRIVELEGAL?
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
          </h2>
          <div className="w-12 h-1 bg-electric mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-panel p-6 space-y-4 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-electric/5 rounded-full blur-xl" />
            <div className="bg-electric/15 p-3 rounded-2xl text-electric w-max group-hover:scale-105 transition-all">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">Traffic Compliance Made Simple</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
<<<<<<< HEAD
              DriVos helps every Indian driver understand challan laws, check fines, and improve driving compliance — without needing a lawyer.
=======
              DRIVELEGAL helps every Indian driver understand challan laws, check fines, and improve driving compliance — without needing a lawyer.
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-6 space-y-4 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-full blur-xl" />
            <div className="bg-indigo-500/15 p-3 rounded-2xl text-indigo-500 w-max group-hover:scale-105 transition-all">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">AI-Powered Legal Guidance</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
              Ask any traffic law question in plain language. Get instant answers with fine amounts, legal sections, and real-world consequences explained.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 space-y-4 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-xl" />
            <div className="bg-amber-500/15 p-3 rounded-2xl text-amber-500 w-max group-hover:scale-105 transition-all">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white">Prevention Over Penalty</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
<<<<<<< HEAD
              Instead of just reacting to challans, DriVos helps you avoid them. Smart reminders, zone alerts, and personalized driving insights.
=======
              Instead of just reacting to challans, DRIVELEGAL helps you avoid them. Smart reminders, zone alerts, and personalized driving insights.
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS */}
      <section id="how-it-works-section" className="py-20 px-6 max-w-7xl mx-auto w-full text-center pb-24 scroll-mt-20">
        
        <div className="space-y-3 mb-16">
          <span className="text-[10px] text-electric font-black uppercase tracking-widest block font-sans">Four Simple Steps</span>
          <h2 className="text-3xl font-heading font-black text-slate-850 dark:text-white">
<<<<<<< HEAD
            How DriVos Works
=======
            How DRIVELEGAL Works
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
          </h2>
          <div className="w-12 h-1 bg-electric mx-auto rounded-full" />
        </div>

        <div className="space-y-16">
          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-10 items-center text-left relative">
            <div className="absolute -top-12 left-0 text-7xl font-black font-mono text-slate-200/50 dark:text-white/5 select-none tracking-tight">01</div>
            <div className="space-y-3 relative z-10">
              <h3 className="text-lg font-heading font-extrabold text-slate-850 dark:text-white">
                Step 1 — Select Your Location & Vehicle
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-sm">
                Tell us where you are and what you drive. Auto-detect or manual select. Takes 10 seconds.
              </p>
            </div>
            {/* Visual */}
            <div className="bg-slate-100 dark:bg-white/5 p-4.5 rounded-2xl border border-slate-250 dark:border-white/5 flex items-center justify-between text-xs max-w-xs justify-self-center md:justify-self-end w-full">
              <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200">
                <MapPin className="w-4 h-4 text-electric-glow animate-pulse" />
                <span>Karnataka, Bengaluru</span>
              </div>
              <span className="text-[8px] bg-electric/15 text-electric px-1.5 py-0.5 rounded font-extrabold uppercase">Auto</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-10 items-center text-left md:text-right relative">
            <div className="absolute -top-12 md:right-0 text-7xl font-black font-mono text-slate-200/50 dark:text-white/5 select-none tracking-tight">02</div>
            <div className="md:order-2 space-y-3 relative z-10">
              <h3 className="text-lg font-heading font-extrabold text-slate-850 dark:text-white">
                Step 2 — Check Your Violation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-sm md:ml-auto">
                Select any violation to instantly see the exact fine, legal section, and consequences under Indian law.
              </p>
            </div>
            {/* Visual */}
            <div className="md:order-1 flex flex-wrap gap-2 max-w-xs justify-center md:justify-start w-full justify-self-center md:justify-self-start">
              <span className="px-3.5 py-1.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-electric text-white shadow-md shadow-electric/20 shrink-0">No Helmet (₹1,000)</span>
              <span className="px-3.5 py-1.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-electric text-white shadow-md shadow-electric/20 shrink-0">Over-speeding (₹1,000)</span>
              <span className="px-3.5 py-1.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-500 shrink-0">No Seatbelt</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-10 items-center text-left relative">
            <div className="absolute -top-12 left-0 text-7xl font-black font-mono text-slate-200/50 dark:text-white/5 select-none tracking-tight">03</div>
            <div className="space-y-3 relative z-10">
              <h3 className="text-lg font-heading font-extrabold text-slate-850 dark:text-white">
                Step 3 — Learn From AI
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-sm">
                Ask anything. Our AI explains traffic laws in simple Hindi, English, or Hinglish. No legal jargon.
              </p>
            </div>
            {/* Visual */}
            <div className="bg-slate-100 dark:bg-white/5 p-4.5 rounded-2xl border border-slate-250 dark:border-white/5 space-y-2 max-w-xs justify-self-center md:justify-self-end w-full text-xs font-bold leading-normal">
              <div className="bg-electric/15 text-electric p-2.5 rounded-xl rounded-bl-none text-[10px] text-left">
                "What is the fine for driving with an expired PUC in Karnataka?"
              </div>
              <div className="bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-350 p-2.5 rounded-xl rounded-br-none text-[10px] text-right">
                "Hi Arjun, expired PUC fine in KA is ₹10,000 for 1st violation (Sec 190(2)). Secure online updates are recommended."
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid md:grid-cols-2 gap-10 items-center text-left md:text-right relative">
            <div className="absolute -top-12 md:right-0 text-7xl font-black font-mono text-slate-200/50 dark:text-white/5 select-none tracking-tight">04</div>
            <div className="md:order-2 space-y-3 relative z-10">
              <h3 className="text-lg font-heading font-extrabold text-slate-850 dark:text-white">
                Step 4 — Track & Improve
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-sm md:ml-auto">
                Track your challan history, monitor your safety score, and get personalized tips to drive better.
              </p>
            </div>
            {/* Visual */}
            <div className="md:order-1 bg-amber-500/10 border border-amber-500/25 p-4 rounded-xl max-w-xs justify-self-center md:justify-self-start w-full text-left flex items-center gap-3">
              <div className="bg-amber-500/20 p-2 rounded-xl text-amber-500 font-mono text-sm font-black">67</div>
              <div>
                <span className="text-[9px] uppercase tracking-wider font-bold text-amber-500 block">Current Compliance Score</span>
                <span className="text-[10px] text-slate-700 dark:text-slate-300 font-bold block mt-0.5">Moderate Risk (Target: &gt;80)</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* SECTION 5 — FEATURES OVERVIEW */}
      <section className="py-20 px-6 bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-white w-full scroll-mt-20 border-y border-slate-200 dark:border-slate-900 transition-all duration-300">
        <div className="max-w-7xl mx-auto w-full text-center space-y-12">
          <div className="space-y-3">
            <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest block font-mono">Robust Utilities Suite</span>
            <h2 className="text-3xl font-heading font-black text-slate-850 dark:text-white">
              Everything You Need. Nothing You Don't.
            </h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Challan Calculator", icon: Scale, desc: "Exact fines for 20+ violations across all Indian states instantly." },
              { title: "AI Legal Assistant", icon: Bot, desc: "Ask in Hindi, English, or Hinglish. Get instant legal explanations." },
              { title: "OCR Challan Scanner", icon: FileText, desc: "Upload any challan image and extract all violation details instantly." },
              { title: "Compliance Score", icon: Award, desc: "Personal road safety rating. Track improvement and avoid escalations." },
              { title: "Zone Alerts", icon: MapPin, desc: "Get notified when near school zones, accident points, or high-enforcement areas." },
              { title: "Pre-Drive Check", icon: ClipboardList, desc: "Interactive document checklist & local regional rules reminders." }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-5 rounded-2xl space-y-3 hover:scale-[1.01] hover:border-amber-500/25 transition-all duration-300 group shadow-sm dark:shadow-none">
                  <div className="bg-amber-500/15 p-2.5 rounded-xl text-amber-500 w-max group-hover:scale-105 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-550 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6 — LIVE DEMO SECTION (No Login Required) */}
      <section id="demo-section" className="py-20 px-6 max-w-3xl mx-auto w-full text-center scroll-mt-20">
        
        <div className="space-y-3 mb-10">
<<<<<<< HEAD
          <span className="text-[10px] text-electric font-black uppercase tracking-widest block">Experience DriVos Instantly</span>
=======
          <span className="text-[10px] text-electric font-black uppercase tracking-widest block">Experience DRIVELEGAL Instantly</span>
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
          <h2 className="text-3xl font-heading font-black text-slate-850 dark:text-white">
            Try It Right Now — No Login Needed
          </h2>
          <div className="w-12 h-1 bg-electric mx-auto rounded-full" />
        </div>

        {/* The Live Interactive Calculator Card */}
        <div className="glass-panel p-6 text-left border-electric/20 relative overflow-hidden shadow-2xl space-y-5">
          <div className="absolute top-0 right-0 w-24 h-24 bg-electric/5 rounded-full blur-xl pointer-events-none" />

          {/* Step 1: Location */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase font-bold tracking-wider text-slate-500 block">Step 1 — Location</label>
            <div className="flex items-center justify-between bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-electric-glow animate-pulse" />
                <span>{demoState}, Bengaluru</span>
              </span>
              <button 
                onClick={() => setShowStateDropdown(!showStateDropdown)}
                className="text-[10px] font-black text-electric hover:text-electric-glow transition-all uppercase tracking-wider"
              >
                Change State
              </button>
            </div>
            {showStateDropdown && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 rounded-xl p-2.5 mt-1 grid grid-cols-2 gap-2 text-xs font-bold animate-fade-in absolute z-40 max-w-sm w-full">
                {['Karnataka', 'Goa', 'Maharashtra', 'Delhi'].map(st => (
                  <button 
                    key={st}
                    onClick={() => {
                      setDemoState(st);
                      setShowStateDropdown(false);
                    }}
                    className={`py-1.5 px-3 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-white/5 ${demoState === st ? 'text-electric' : 'text-slate-500'}`}
                  >
                    {st} State
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Step 2: Vehicle Type */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase font-bold tracking-wider text-slate-500 block">Step 2 — Vehicle Type</label>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold">
              {['Two-Wheeler', 'Four-Wheeler', 'Commercial', 'Heavy'].map(type => (
                <button
                  key={type}
                  onClick={() => setDemoVehicle(type)}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-300 border uppercase tracking-wider ${
                    demoVehicle === type 
                      ? 'bg-electric text-white border-electric shadow-lg shadow-electric/25'
                      : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Violations list multi-select */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase font-bold tracking-wider text-slate-500 block">Step 3 — Select Violations</label>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold">
              {violationCatalog.map(item => {
                const isSelected = selectedViolations.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleToggleViolation(item.id)}
                    className={`px-3 py-1.5 rounded-xl border transition-all duration-300 flex items-center gap-1.5 ${
                      isSelected 
                        ? 'bg-amber-500/10 border-amber-500/35 text-amber-700 dark:text-amber-300 font-extrabold'
                        : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isSelected && <Check className="w-3 h-3 text-amber-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Output Breakdown Card */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase font-bold tracking-wider text-slate-500 block">Step 4 — Output breakdown</label>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl font-mono text-[10px] text-white space-y-3 shadow-inner relative overflow-hidden transition-all duration-500">
              
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-400">Challan Breakdown — {demoState.toUpperCase()}</span>
                <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${activeSeverity.class}`}>{activeSeverity.label}</span>
              </div>

              {calculatedItems.length > 0 ? (
                <div className="space-y-2">
                  {calculatedItems.map(item => (
                    <div key={item.id} className="flex justify-between items-start gap-2">
                      <div>
                        <span className="block text-white font-bold">{item.label}</span>
                        <span className="block text-[8px] text-slate-500 mt-0.5">{item.code}</span>
                      </div>
                      <span className="font-bold text-white shrink-0">₹{item.fine.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                  
                  <div className="border-t border-dashed border-slate-800 pt-2.5 flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-400">Total Simulated Fine</span>
                    <strong className="text-white text-sm font-black">₹{totalDemoFine.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-slate-550">
                  Select one or more violations above to instantly see real RTO breakdown.
                </div>
              )}
            </div>
          </div>

          {/* Save & Auth CTA button */}
          <div className="pt-2">
            <button
              onClick={() => setActiveScreen('auth')}
              className="w-full bg-electric text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider shadow-xl shadow-electric/20 hover:bg-electric-glow active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Save Full Report — Sign Up Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wide mt-3 px-1">
              <span>Want AI explanations, voice assistant, and full history?</span>
              <button onClick={() => setActiveScreen('auth')} className="text-electric hover:text-electric-glow transition-all">Create Free Account</button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — PRICING SUMMARY */}
      <section id="pricing-section" className="py-20 px-6 max-w-7xl mx-auto w-full text-center bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white pb-24 scroll-mt-20 border-y border-slate-200 dark:border-slate-800 transition-all duration-300">
        
        <div className="space-y-3 mb-12">
          <span className="text-[10px] text-electric font-black uppercase tracking-widest block font-sans">Honest, India-Friendly Pricing</span>
          <h2 className="text-3xl font-heading font-black text-slate-850 dark:text-white">
            Pay Only For What You Need
          </h2>
          <div className="w-12 h-1 bg-electric mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch text-left">
          
          {/* COLUMN 1: FREE PLAN */}
          <div className="lg:col-span-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden shadow-md dark:shadow-none">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-extrabold uppercase px-2 py-0.5 rounded">
                  Basic Awareness
                </span>
                <span className="text-[8px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-450 font-bold uppercase px-2 py-0.5 rounded">
                  Current Plan
                </span>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-xs uppercase font-extrabold text-slate-400">FREE</h4>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-850 dark:text-white">₹0</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold lowercase">forever</span>
                </div>
              </div>

              <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />

              <ul className="space-y-2.5 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Basic challan lookup</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Manual challan calculator</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Limited AI explanations (5/day)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Basic location-based rules</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Offline cached rules (basic)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Limited daily searches (10/day)</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => setActiveScreen('auth')}
              className="w-full mt-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-wider text-center transition-all select-none border border-slate-200 dark:border-slate-700"
            >
              Get Started — Free
            </button>
          </div>

          {/* COLUMN 2 & 3: ADD-ON PACKS */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden shadow-md dark:shadow-none">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[8px] text-electric dark:text-electric-glow font-black uppercase tracking-wider block">India's First Modular Traffic App 🇮🇳</span>
                  <h4 className="text-sm font-extrabold text-slate-850 dark:text-white">Pay Only For What You Need</h4>
                </div>
                <span className="text-[7px] bg-amber-500/10 border border-amber-500/35 text-amber-500 font-extrabold uppercase px-2 py-1 rounded-md animate-pulse">
                  No Subscription Needed
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                Activate feature packs temporarily for a few rupees. Pay only when you are driving, travelling, or researching.
              </p>

              <div className="h-[1px] bg-slate-200 dark:bg-slate-800" />

              {/* Modular Scroll grid */}
              <div className="grid md:grid-cols-2 gap-3 text-[10px]">
                
                {/* Add-on 1 */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 p-3 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-slate-800 dark:text-white block">🤖 AI Teaching Mode</span>
                    <span className="text-[7px] bg-electric/15 text-electric px-1.5 py-0.5 rounded font-extrabold uppercase">3 Days</span>
                  </div>
                  <p className="text-[9px] text-slate-550 dark:text-slate-400 leading-normal font-semibold">
                    Learn challan laws with plain-language conversational AI examples.
                  </p>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-800">
                    <span className="font-mono font-bold text-slate-800 dark:text-white">₹9</span>
                    <button onClick={() => setActiveScreen('auth')} className="text-[8px] bg-electric text-white px-2.5 py-1 rounded-lg font-black uppercase">Activate</button>
                  </div>
                </div>

                {/* Add-on 2 */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 p-3 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-slate-800 dark:text-white block">🎙️ Voice Assistant</span>
                    <span className="text-[7px] bg-electric/15 text-electric px-1.5 py-0.5 rounded font-extrabold uppercase">7 Days</span>
                  </div>
                  <p className="text-[9px] text-slate-550 dark:text-slate-400 leading-normal font-semibold">
                    Ask questions in Hindi, English, or Hinglish with speech synthesis.
                  </p>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-800">
                    <span className="font-mono font-bold text-slate-800 dark:text-white">₹19</span>
                    <button onClick={() => setActiveScreen('auth')} className="text-[8px] bg-electric text-white px-2.5 py-1 rounded-lg font-black uppercase">Activate</button>
                  </div>
                </div>

                {/* Add-on 3 */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 p-3 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-slate-800 dark:text-white block">🧭 Travel Mode</span>
                    <span className="text-[7px] bg-electric/15 text-electric px-1.5 py-0.5 rounded font-extrabold uppercase">7 Days</span>
                  </div>
                  <p className="text-[9px] text-slate-550 dark:text-slate-400 leading-normal font-semibold">
                    Cross-border safety alerts and differential rules dashboard.
                  </p>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-200/40 dark:border-slate-800">
                    <span className="font-mono font-bold text-slate-800 dark:text-white">₹29</span>
                    <button onClick={() => setActiveScreen('auth')} className="text-[8px] bg-electric text-white px-2.5 py-1 rounded-lg font-black uppercase">Activate</button>
                  </div>
                </div>

                {/* Add-on 4 */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 p-3 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-slate-800 dark:text-white block">📷 OCR Scanner Pack</span>
                    <span className="text-[7px] bg-electric/15 text-electric px-1.5 py-0.5 rounded font-extrabold uppercase">10 Scans</span>
                  </div>
                  <p className="text-[9px] text-slate-550 dark:text-slate-400 leading-normal font-semibold">
                    Upload physical challan images or court PDFs for instant AI breakdowns.
                  </p>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-200 dark:border-slate-800">
                    <span className="font-mono font-bold text-slate-800 dark:text-white">₹15</span>
                    <button onClick={() => setActiveScreen('auth')} className="text-[8px] bg-electric text-white px-2.5 py-1 rounded-lg font-black uppercase">Activate</button>
                  </div>
                </div>

              </div>
            </div>

            <button 
              onClick={() => setActiveScreen('auth')}
              className="w-full mt-6 bg-gradient-to-r from-electric to-blue-600 hover:bg-electric-glow text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-wider text-center transition-all select-none shadow-lg shadow-electric/15"
            >
              Sign Up to Unlock Custom Packs
            </button>
          </div>

        </div>

      </section>

      {/* SECTION 8 — FOR AUTHORITIES */}
      <section id="authorities-section" className="py-20 px-6 max-w-7xl mx-auto w-full scroll-mt-20">
        
        {/* Amber Card border box */}
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 lg:p-12 shadow-2xl relative overflow-hidden text-left transition-all duration-300">
          {/* Subtle tropical palm pattern graphics */}
          <div className="absolute right-0 bottom-0 opacity-5 transform translate-y-8 translate-x-8 pointer-events-none select-none">
            <Shield className="w-80 h-80 text-amber-500" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Description Column */}
            <div className="space-y-6">
              <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest block">Authority Solutions</span>
              <h3 className="text-3xl font-heading font-black text-slate-850 dark:text-white leading-tight">
                Built for Authorities Too
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
<<<<<<< HEAD
                DriVos's governance layer gives traffic departments, RTOs, and civic agencies real-time violation analytics, zone heatmaps, and citizen compliance reports.
=======
                DRIVELEGAL's governance layer gives traffic departments, RTOs, and civic agencies real-time violation analytics, zone heatmaps, and citizen compliance reports.
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
              </p>
              
              {/* Bullet checklist */}
              <ul className="text-[11px] text-slate-605 dark:text-slate-350 font-bold uppercase tracking-wider space-y-3.5">
                <li className="flex items-center gap-2.5"><Check className="w-4.5 h-4.5 text-amber-500 shrink-0" /> Violation trend dashboards</li>
                <li className="flex items-center gap-2.5"><Check className="w-4.5 h-4.5 text-amber-500 shrink-0" /> High-risk zone intelligence</li>
                <li className="flex items-center gap-2.5"><Check className="w-4.5 h-4.5 text-amber-500 shrink-0" /> Repeat offender analytics</li>
                <li className="flex items-center gap-2.5"><Check className="w-4.5 h-4.5 text-amber-500 shrink-0" /> Downloadable PDF + CSV reports</li>
                <li className="flex items-center gap-2.5"><Check className="w-4.5 h-4.5 text-amber-500 shrink-0" /> Custom district licensing</li>
              </ul>

              <button
                onClick={() => showToast("Authority Demo request submitted. We will contact you! ✅")}
                className="bg-amber-500 hover:bg-amber-605 text-slate-950 dark:text-slate-950 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/25 transition-all"
              >
                Request Authority Demo
              </button>
            </div>

            {/* Right Mockup Column */}
            <div className="relative flex justify-center">
              <div className="w-full max-w-[340px] bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden space-y-4 shadow-md dark:shadow-none">
                <span className="block text-[8px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase">Traffic Control Mockup</span>

                {/* mini KPI strip */}
                <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-2 rounded-xl text-slate-800 dark:text-white">
                    <span className="block text-slate-450 dark:text-slate-500 uppercase text-[7px]">Total Violations</span>
                    <strong className="text-sm font-mono mt-0.5 block">48,291</strong>
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-855 p-2 rounded-xl text-emerald-600 dark:text-emerald-400">
                    <span className="block text-slate-455 dark:text-slate-550 uppercase text-[7px]">Fines Collected</span>
                    <strong className="text-sm font-mono mt-0.5 block">₹4.2 Cr</strong>
                  </div>
                </div>

                {/* bar chart visual */}
                <div className="space-y-2 border-t border-slate-200 dark:border-slate-900 pt-3">
                  <span className="block text-[7px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-extrabold mb-1">Violation Frequency</span>
                  <div className="space-y-1 text-[8px] font-bold text-slate-500 dark:text-slate-400 font-mono">
                    <div className="flex justify-between">
                      <span>Speeding</span>
                      <span>14.2K</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[80%] rounded-full" />
                    </div>
                    
                    <div className="flex justify-between mt-2">
                      <span>No Helmet</span>
                      <span>11.8K</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[60%] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* risk badge */}
                <div className="flex justify-between items-center text-[9px] font-extrabold bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl text-red-500 uppercase">
                  <span>High Risk Spot: Silk Board</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* SECTION 9 — TESTIMONIALS (Demo) */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full text-center scroll-mt-20">
        
        <div className="space-y-3 mb-16">
          <span className="text-[10px] text-electric font-black uppercase tracking-widest block font-sans">Driver Reviews</span>
          <h2 className="text-3xl font-heading font-black text-slate-850 dark:text-white">
            What Drivers Are Saying
          </h2>
          <div className="w-12 h-1 bg-electric mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          {/* Quote 1 */}
          <div className="glass-panel p-5.5 space-y-4 hover:scale-[1.01] transition-all flex flex-col justify-between">
            <p className="text-xs text-slate-550 dark:text-slate-400 font-semibold leading-relaxed italic">
<<<<<<< HEAD
              "I had no idea the fine for no insurance was ₹2,000 and that my accident claim would be void. DriVos explained it in 30 seconds."
=======
              "I had no idea the fine for no insurance was ₹2,000 and that my accident claim would be void. DRIVELEGAL explained it in 30 seconds."
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
            </p>
            <div className="flex items-center justify-between border-t border-slate-150 dark:border-white/5 pt-3 text-[10px] font-bold">
              <div>
                <span className="text-slate-850 dark:text-white block font-extrabold">Ramesh K.</span>
                <span className="text-slate-450 dark:text-slate-500 block uppercase font-extrabold tracking-wider text-[8px] mt-0.5">Bike Rider, Bengaluru</span>
              </div>
              <span className="text-amber-500 tracking-tighter">⭐⭐⭐⭐⭐</span>
            </div>
          </div>

          {/* Quote 2 */}
          <div className="glass-panel p-5.5 space-y-4 hover:scale-[1.01] transition-all flex flex-col justify-between">
            <p className="text-xs text-slate-550 dark:text-slate-400 font-semibold leading-relaxed italic">
              "The AI answered my helmet question in Hindi. Simple, clear, no confusing legal language. Finally an app that speaks my language."
            </p>
            <div className="flex items-center justify-between border-t border-slate-150 dark:border-white/5 pt-3 text-[10px] font-bold">
              <div>
                <span className="text-slate-850 dark:text-white block font-extrabold">Priya S.</span>
                <span className="text-slate-450 dark:text-slate-500 block uppercase font-extrabold tracking-wider text-[8px] mt-0.5">Daily Commuter, Pune</span>
              </div>
              <span className="text-amber-500 tracking-tighter">⭐⭐⭐⭐⭐</span>
            </div>
          </div>

          {/* Quote 3 */}
          <div className="glass-panel p-5.5 space-y-4 hover:scale-[1.01] transition-all flex flex-col justify-between">
            <p className="text-xs text-slate-550 dark:text-slate-400 font-semibold leading-relaxed italic">
              "As a fleet manager, the compliance reports save me hours every month. The Pro plan is worth every rupee."
            </p>
            <div className="flex items-center justify-between border-t border-slate-150 dark:border-white/5 pt-3 text-[10px] font-bold">
              <div>
                <span className="text-slate-850 dark:text-white block font-extrabold">Vikram T.</span>
                <span className="text-slate-450 dark:text-slate-500 block uppercase font-extrabold tracking-wider text-[8px] mt-0.5">Fleet Owner, Mumbai</span>
              </div>
              <span className="text-amber-500 tracking-tighter">⭐⭐⭐⭐⭐</span>
            </div>
          </div>
        </div>

      </section>

      {/* SECTION 10 — FINAL CTA STRIP */}
      <section className="py-24 px-6 bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-white w-full text-center relative overflow-hidden border-t border-slate-200 dark:border-slate-900 transition-all duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-electric/10 rounded-full blur-[120px] pointer-events-none select-none opacity-50" />
        
        <div className="max-w-2xl mx-auto w-full space-y-7 relative z-10">
          <h2 className="text-3xl xs:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight text-slate-850 dark:text-white">
            Start Driving Smarter Today
          </h2>
          <p className="text-xs xs:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider max-w-md mx-auto leading-relaxed">
            Free forever. No credit card. No hidden charges.
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <button
              onClick={() => setActiveScreen('auth')}
              className="bg-electric hover:bg-electric-glow text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl shadow-xl shadow-electric/25 transition-all animate-pulse-scale"
            >
              Create Free Account
            </button>
            
            <button
              onClick={() => handleScrollToSection('demo-section')}
              className="border border-slate-300 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-900 text-slate-700 dark:text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-2xl transition-all"
            >
              Try Demo First
            </button>
          </div>

          {/* Privacy note */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[9px] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider select-none">
            <span>Your data is private</span>
            <span>•</span>
            <span>Built for Indian Roads</span>
            <span>•</span>
            <span>Works 🇮🇳 offline</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-850 py-16 px-6 font-semibold text-[10px] uppercase tracking-wider leading-relaxed transition-all duration-300">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-10 text-left">
          
          {/* Col 1 */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-electric to-blue-600 p-1.5 rounded-lg text-white">
                <Shield className="w-4 h-4 fill-white/10" />
              </div>
<<<<<<< HEAD
              <span className="font-heading font-black text-sm text-slate-850 dark:text-white tracking-widest">DriVos</span>
=======
              <span className="font-heading font-black text-sm text-slate-850 dark:text-white tracking-widest">DRIVELEGAL</span>
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
            </div>
            <p className="text-[9px] text-slate-450 dark:text-slate-500 font-bold leading-normal tracking-wide mt-2">
              Know Your Rights. Own The Road.<br />
              Made 🇮🇳 in India.
            </p>
          </div>

          {/* Col 2 - Product */}
          <div className="space-y-3">
            <strong className="text-slate-800 dark:text-white block text-[9px] tracking-widest font-black">Product</strong>
            <div className="flex flex-col gap-2 font-bold text-slate-500 dark:text-slate-450 text-[9px]">
              <button onClick={() => handleScrollToSection('what-is-section')} className="text-left hover:text-slate-800 dark:hover:text-white transition-all">Features</button>
              <button onClick={() => handleScrollToSection('how-it-works-section')} className="text-left hover:text-slate-800 dark:hover:text-white transition-all">How It Works</button>
              <button onClick={() => handleScrollToSection('pricing-section')} className="text-left hover:text-slate-800 dark:hover:text-white transition-all">Pricing</button>
              <button onClick={() => handleScrollToSection('demo-section')} className="text-left hover:text-slate-800 dark:hover:text-white transition-all">Download App (coming soon)</button>
            </div>
          </div>

          {/* Col 3 - For Authorities */}
          <div className="space-y-3">
            <strong className="text-slate-800 dark:text-white block text-[9px] tracking-widest font-black">For Authorities</strong>
            <div className="flex flex-col gap-2 font-bold text-slate-500 dark:text-slate-450 text-[9px]">
              <button onClick={() => handleScrollToSection('authorities-section')} className="text-left hover:text-slate-800 dark:hover:text-white transition-all">Police Dashboard</button>
              <button onClick={() => handleScrollToSection('authorities-section')} className="text-left hover:text-slate-800 dark:hover:text-white transition-all">RTO Analytics</button>
              <button onClick={() => handleScrollToSection('authorities-section')} className="text-left hover:text-slate-800 dark:hover:text-white transition-all">Government Licensing</button>
              <button onClick={() => handleScrollToSection('authorities-section')} className="text-left hover:text-slate-800 dark:hover:text-white transition-all">Request Demo</button>
            </div>
          </div>

          {/* Col 4 - Company */}
          <div className="space-y-3">
            <strong className="text-slate-800 dark:text-white block text-[9px] tracking-widest font-black">Company</strong>
            <div className="flex flex-col gap-2 font-bold text-slate-500 dark:text-slate-450 text-[9px]">
              <button onClick={(e) => { e.preventDefault(); setActiveFooterTab('about'); }} className="text-left hover:text-slate-800 dark:hover:text-white transition-all">About</button>
              <button onClick={(e) => { e.preventDefault(); setActiveFooterTab('privacy'); }} className="text-left hover:text-slate-800 dark:hover:text-white transition-all">Privacy Policy</button>
              <button onClick={(e) => { e.preventDefault(); setActiveFooterTab('terms'); }} className="text-left hover:text-slate-800 dark:hover:text-white transition-all">Terms of Use</button>
              <button onClick={(e) => { e.preventDefault(); setActiveFooterTab('support'); }} className="text-left hover:text-slate-800 dark:hover:text-white transition-all">Contact Support</button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto w-full pt-8 mt-10 border-t border-slate-200 dark:border-slate-850/60 flex flex-wrap items-center justify-between gap-4 text-[8px] text-slate-450 dark:text-slate-500 font-bold font-mono">
<<<<<<< HEAD
          <span>© 2025 DriVos. All rights reserved.</span>
=======
          <span>© 2025 DRIVELEGAL. All rights reserved.</span>
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
          <span className="text-right">Not affiliated with any government body. For awareness and educational use.</span>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 border border-slate-700 text-white font-bold text-xs py-3 px-6 rounded-2xl shadow-xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-electric-glow animate-bounce" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* PREMIUM INTERACTIVE FOOTER INFORMATION MODAL */}
      {activeFooterTab && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-modal max-w-lg w-full p-6 border border-slate-200 dark:border-white/10 shadow-2xl relative animate-fade-in space-y-4 max-h-[85vh] overflow-y-auto scrollbar-none text-left bg-white/95 dark:bg-navy-950/95 text-slate-850 dark:text-slate-100 rounded-3xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/15">
              <span className="font-heading font-extrabold text-sm tracking-wider uppercase text-slate-900 dark:text-white flex items-center gap-2">
<<<<<<< HEAD
                {activeFooterTab === 'about' && 'About DriVos'}
=======
                {activeFooterTab === 'about' && 'About DRIVELEGAL'}
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
                {activeFooterTab === 'privacy' && 'Privacy Policy'}
                {activeFooterTab === 'terms' && 'Terms of Use'}
                {activeFooterTab === 'support' && 'Contact Support'}
              </span>
              <button 
                onClick={() => setActiveFooterTab(null)}
                className="p-1.5 rounded-lg hover:bg-slate-150 dark:hover:bg-white/15 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-all focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 text-xs leading-relaxed font-semibold text-slate-650 dark:text-slate-300">
              {activeFooterTab === 'about' && (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-electric/5 border border-electric/15 rounded-2xl">
<<<<<<< HEAD
                    <p className="text-slate-850 dark:text-white font-bold text-sm">DriVos</p>
                    <p className="mt-1 font-semibold leading-relaxed">
                      DriVos is an AI-powered traffic compliance platform built for Indian drivers and traffic authorities.
=======
                    <p className="text-slate-850 dark:text-white font-bold text-sm">DRIVELEGAL</p>
                    <p className="mt-1 font-semibold leading-relaxed">
                      DRIVELEGAL is an AI-powered traffic compliance platform built for Indian drivers and traffic authorities.
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
                    </p>
                  </div>
                  <p>
                    Founded with a mission to make traffic laws accessible, understandable, and actionable for every citizen.
                  </p>
                  <div className="border-t border-slate-200/50 dark:border-white/10 pt-4 space-y-2">
                    <p className="text-[9px] text-slate-450 dark:text-slate-500 uppercase tracking-widest font-black">Hackathon Context</p>
                    <div className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl space-y-2 text-[11px]">
                      <p>🏆 <strong className="text-slate-850 dark:text-white">Road Safety Hackathon (IITM) 2026</strong></p>
                      <p>👥 <strong className="text-slate-850 dark:text-white">Team:</strong> Team Achievers</p>
                      
                      {/* Institution with map link */}
                      <div className="space-y-1.5 pt-1">
                        <p className="flex items-start gap-1">
                          <span>🏫</span>
                          <span>
                            <strong className="text-slate-850 dark:text-white">Institution:</strong>{' '}
                            <a 
                              href="https://maps.google.com/?q=Baderia+Global+Institute+of+Engineering+and+Management+Jabalpur" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-electric hover:text-electric-glow font-bold hover:underline"
                              title="Open in Google Maps"
                            >
                              Baderia Global Institute of Engineering and Management, Jabalpur
                              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                            </a>
                          </span>
                        </p>
                        <div className="pl-5">
                          <a 
                            href="https://maps.google.com/?q=Baderia+Global+Institute+of+Engineering+and+Management+Jabalpur" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-electric/10 hover:bg-electric/25 text-electric text-[9px] font-black uppercase px-3 py-1.5 rounded-xl transition-all shadow-sm"
                          >
                            <MapPin className="w-3 h-3 text-current" />
                            <span>View on Maps</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center font-heading font-black text-xs italic text-electric tracking-wide pt-2">
                    "Know Your Rights. Own The Road."
                  </p>
                </div>
              )}

              {activeFooterTab === 'privacy' && (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl">
                    <p className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">🔒 Your Privacy is Our Priority</p>
                    <p className="mt-1">
                      We are committed to absolute transparency. Here's a brief overview of how your data is handled:
                    </p>
                  </div>
                  <ul className="space-y-2.5 list-disc list-inside bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/5">
                    <li><strong>We collect:</strong> phone number, vehicle number, licence number</li>
                    <li><strong>We do NOT sell user data</strong></li>
                    <li><strong>Challan history stored locally</strong> (localStorage in demo)</li>
                    <li><strong>Firebase Auth handles OTP securely</strong></li>
                    <li><strong>No third-party ad tracking</strong></li>
                    <li><strong>Data deletion available on request</strong></li>
                  </ul>
                  <div className="flex items-center justify-between text-[11px] font-bold mt-2 pt-2 border-t border-slate-200/50 dark:border-white/10">
                    <span>Contact:</span>
                    <a href="mailto:lucky114005@gmail.com" className="text-electric hover:underline font-black">lucky114005@gmail.com</a>
                  </div>
                </div>
              )}

              {activeFooterTab === 'terms' && (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-amber-500/5 border border-amber-500/15 rounded-2xl">
                    <p className="text-amber-700 dark:text-amber-400 font-bold text-sm">⚠️ Terms of Use Guidelines</p>
                    <p className="mt-1">
                      Please review the following baseline agreements regarding app usage:
                    </p>
                  </div>
                  <ul className="space-y-2.5 list-disc list-inside bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/5">
<<<<<<< HEAD
                    <li>DriVos is for <strong>awareness and educational purposes only</strong></li>
=======
                    <li>DRIVELEGAL is for <strong>awareness and educational purposes only</strong></li>
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
                    <li><strong>Not an official government service</strong></li>
                    <li><strong>Not affiliated</strong> with Parivahan, MoRTH, or any government body</li>
                    <li>Challan data shown is for reference</li>
                    <li>Fine amounts based on **MV Act 2019**</li>
                    <li>Always verify with official sources</li>
                    <li><strong>Not liable</strong> for legal decisions made based on app information</li>
                  </ul>
                </div>
              )}

              {activeFooterTab === 'support' && (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-indigo-500/5 border border-indigo-500/15 rounded-2xl">
                    <p className="text-indigo-700 dark:text-indigo-400 font-bold text-sm">💬 Contact Support Channel</p>
                    <p className="mt-1">
                      Reach out to us directly through the official communication pathways below:
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-4 space-y-1">
                      <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-400">General Support</span>
<<<<<<< HEAD
                      <p className="text-slate-850 dark:text-white font-bold">Email: support@DriVos.in</p>
=======
                      <p className="text-slate-850 dark:text-white font-bold">Email: support@drivelegal.in</p>
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
                      <p>Phone: +91 XXXXX XXXXX</p>
                      <p className="text-[8.5px] text-electric font-bold mt-1">Response time: Within 24 hours</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-4 space-y-1">
                      <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-400">Partnerships</span>
<<<<<<< HEAD
                      <p className="text-slate-855 dark:text-white font-bold">partnerships@DriVos.in</p>
=======
                      <p className="text-slate-855 dark:text-white font-bold">partnerships@drivelegal.in</p>
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
                      <p className="text-[8.5px] text-slate-450 mt-1">For Authority/Government inquiries</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-4 text-center">
                    <span className="block text-[8px] uppercase tracking-wider font-extrabold text-slate-400 mb-1">Press & Media</span>
<<<<<<< HEAD
                    <p className="text-slate-850 dark:text-white font-bold">media@DriVos.in</p>
=======
                    <p className="text-slate-850 dark:text-white font-bold">media@drivelegal.in</p>
>>>>>>> c1e2c4bda0494e2524f91ead0514f9423976c5b1
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS animations styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(-1.5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
