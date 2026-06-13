
﻿import React, { useState } from 'react';

import { 
  Check, CreditCard, Shield, Sparkles, Scale, Info, 
  ArrowLeft, Bell, Bot, Mic, Compass, FileText, ChevronDown, ChevronUp, AlertCircle, Lock,
  X, RefreshCw
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function PricingScreen() {
  const { setActiveScreen, user } = useAppState();

  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'lifetime'
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Payment Modal States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const addOns = [
    { id: 'ai', title: '🤖 AI Teaching Mode', duration: '3 Days', price: 9, desc: 'Learn challan laws with plain-language conversational AI examples.', icon: Bot },
    { id: 'voice', title: '🎙️ Voice Assistant', duration: '7 Days', price: 19, desc: 'Ask questions in Hindi, English, or Hinglish with speech synthesis.', icon: Mic },
    { id: 'travel', title: '🧭 Travel Mode', duration: '7 Days', price: 29, desc: 'Cross-border safety alerts and differential rules dashboard.', icon: Compass },
    { id: 'scanner', title: '📷 OCR Scanner Pack', duration: '10 Scans', price: 15, desc: 'Upload physical challan images or court PDFs for instant AI breakdowns.', icon: FileText },
    { id: 'score', title: '🛡️ Compliance Score', duration: '30 Days', price: 49, desc: 'Deep safety metrics tracking, telemetry audits, and safety tips.', icon: Shield }
  ];

  const faqs = [
    { q: "Can I use add-ons without any subscription?", a: "Yes. Add-ons are completely independent. Buy only what you need, only when you need it." },
    { q: "What happens when my add-on expires?", a: "The feature deactivates. Your data is never deleted. Reactivate anytime." },
    { q: "Is the Infinity plan really lifetime?", a: "Yes. One payment, all current and future features, forever. No hidden renewals." },
    { q: "Can my family share one account?", a: "Currently one account per user. Institutional Infinity supports up to 5 users." },
    { q: "How do government pricing plans work?", a: "Government and authority plans are custom-licensed per district, city, or department. Contact us for a tailored proposal." }
  ];

  const handleOpenPayment = (packName, price) => {
    setSelectedPack({ name: packName, price: price });
    setShowPaymentModal(true);
  };

  const handleExecutePayment = (method) => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
      triggerToast(`🎉 Payment Successful! Activated: ${selectedPack.name}`);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 space-y-6 max-w-md mx-auto w-full select-none text-slate-800 dark:text-slate-100 relative select-none">
      
      {/* Toast alert message */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-emerald-500 to-teal-600 border border-emerald-400 text-white text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-2xl animate-bounce-short">
          {toastMessage}
        </div>
      )}

      {/* Screen Header */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setActiveScreen('profile')}
          className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="space-y-0.5">
          <h2 className="text-base font-heading font-extrabold tracking-wide text-slate-800 dark:text-white uppercase leading-none">
            Simple, India-Friendly Pricing
          </h2>
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">
            Pay only for what you need. No forced subscriptions.
          </span>
        </div>
      </div>

      {/* Billing Switcher Toggle Switch */}
      <div className="flex justify-center shrink-0">
        <div className="flex bg-slate-200/60 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-1 rounded-xl gap-1 relative w-56">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`flex-1 py-1 text-[9px] font-bold tracking-wider rounded-lg transition-all duration-300 uppercase ${
              billingPeriod === 'monthly'
                ? 'bg-electric text-white shadow-md'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('lifetime')}
            className={`flex-1 py-1 text-[9px] font-bold tracking-wider rounded-lg transition-all duration-300 uppercase ${
              billingPeriod === 'lifetime'
                ? 'bg-electric text-white shadow-md'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            Lifetime
          </button>
        </div>
      </div>

      {billingPeriod === 'monthly' ? (
        <>
          {/* SECTION 1 — FREE PLAN */}
          <div className="glass-panel p-5 space-y-4 border-slate-200 dark:border-white/10 relative overflow-hidden flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[8px] bg-slate-100 dark:bg-white/5 text-slate-500 font-extrabold uppercase px-2 py-0.5 rounded">
              Basic Awareness Access
            </span>
            <span className="text-[8px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold uppercase px-2 py-0.5 rounded">
              Current Plan
            </span>
          </div>

          <div className="space-y-0.5">
            <h3 className="text-xs uppercase font-extrabold text-slate-400">FREE PLAN</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-800 dark:text-white">₹0</span>
              <span className="text-[9px] text-slate-500 font-semibold lowercase">forever</span>
            </div>
          </div>

          <div className="h-[1px] bg-slate-200 dark:bg-white/5" />

          <ul className="space-y-2 text-[10px] font-bold text-slate-650 dark:text-slate-350">
            {['Basic challan lookup', 'Manual challan calculator', 'Limited AI explanations (5/day)', 'Basic location-based rules', 'Offline cached rules (basic)', 'Limited daily searches (10/day)'].map((feat, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          disabled
          className="w-full mt-5 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-600 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider text-center"
        >
          Active Plan
        </button>
      </div>

      {/* SECTION 2 — ADD-ON PACKS */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[8px] text-electric font-black uppercase tracking-wider block">India's First Modular Traffic App 🇮🇳</span>
            <h4 className="text-xs font-heading font-extrabold uppercase text-slate-850 dark:text-white tracking-wider">
              Pay Only For What You Need
            </h4>
          </div>
        </div>

        <div className="space-y-2.5 text-[10px]">
          {addOns.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 p-3.5 rounded-2xl flex items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-800 dark:text-white block">{item.title}</span>
                    <span className="text-[7px] bg-electric/10 text-electric font-extrabold uppercase px-1.5 py-0.5 rounded">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-normal font-semibold">
                    {item.desc}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0 justify-center">
                  <span className="font-mono text-xs font-black text-slate-800 dark:text-white block">₹{item.price}</span>
                  <button 
                    onClick={() => handleOpenPayment(item.title, item.price)}
                    className="bg-electric hover:bg-electric-glow text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-md shadow-electric/15 active:scale-95 transition-all"
                  >
                    Activate
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3 — SMART COMBO PACKS */}
      <div className="space-y-3.5">
        <div className="space-y-0.5">
          <span className="text-[8px] text-electric font-black uppercase tracking-wider block">Bundles & Discounts</span>
          <h4 className="text-xs font-heading font-extrabold uppercase text-slate-850 dark:text-white tracking-wider">
            Best Value Bundles
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-3 text-[10px]">
          
          {/* Best Mini */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3">
              <span className="text-[7px] bg-amber-500/10 text-amber-500 font-extrabold uppercase px-1.5 py-0.5 rounded w-max block">
                Most Popular
              </span>
              <div>
                <span className="font-heading font-black text-slate-800 dark:text-white block text-sm uppercase">Best Mini</span>
                <span className="text-[9px] text-slate-550 dark:text-slate-400 block mt-0.5 font-bold">₹49 / month</span>
              </div>
              <div className="h-[1px] bg-slate-100 dark:bg-white/5" />
              <ul className="space-y-1.5 text-[8.5px] font-bold text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-1.5">🟢 AI Teaching Mode</li>
                <li className="flex items-center gap-1.5">🟢 Voice Assistant</li>
                <li className="flex items-center gap-1.5">🟢 Travel Mode</li>
                <li className="text-[8px] text-slate-400 font-medium">30-day access to all 3</li>
              </ul>
            </div>
            <button 
              onClick={() => handleOpenPayment("Best Mini Bundle", 49)}
              className="w-full mt-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white py-2 rounded-xl text-[8px] font-black uppercase tracking-wider text-center"
            >
              Get Best Mini
            </button>
          </div>

          {/* Best Plus */}
          <div className="bg-white dark:bg-slate-900 border-2 border-electric rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3">
              <span className="text-[7px] bg-blue-500/15 text-blue-500 font-extrabold uppercase px-1.5 py-0.5 rounded w-max block">
                Best for Daily Drivers
              </span>
              <div>
                <span className="font-heading font-black text-slate-800 dark:text-white block text-sm uppercase">Best Plus</span>
                <span className="text-[9px] text-slate-550 dark:text-slate-400 block mt-0.5 font-bold">₹99 / month</span>
              </div>
              <div className="h-[1px] bg-slate-100 dark:bg-white/5" />
              <ul className="space-y-1.5 text-[8.5px] font-bold text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-1.5">🟢 Unlimited AI Legal</li>
                <li className="flex items-center gap-1.5">🟢 Unlimited OCR Scans</li>
                <li className="flex items-center gap-1.5">🟢 Safety Score + History</li>
                <li className="flex items-center gap-1.5">🟢 Smart Alerts</li>
              </ul>
            </div>
            <button 
              onClick={() => handleOpenPayment("Best Plus Bundle", 99)}
              className="w-full mt-4 bg-electric hover:bg-electric-glow text-white py-2 rounded-xl text-[8px] font-black uppercase tracking-wider text-center shadow-md"
            >
              Get Best Plus
            </button>
          </div>

        </div>
      </div>

      {/* SECTION 4 — PRO PLAN */}
      <div className="bg-white dark:bg-slate-900 border-2 border-indigo-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
        
        <div className="space-y-4 text-left text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-[8px] bg-indigo-500/10 text-indigo-500 font-extrabold uppercase px-2 py-0.5 rounded w-max block">
              Recommended for Professionals
            </span>
            <span className="text-[8px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-extrabold uppercase px-2 py-0.5 rounded">
              Save 30% Annual
            </span>
          </div>

          <div>
            <span className="font-heading font-black text-slate-800 dark:text-white block text-sm uppercase">PRO PLAN</span>
            <span className="text-slate-500 font-bold block mt-0.5">
              {billingPeriod === 'monthly' ? '₹299 / month' : '₹2,499 / year (Save 30%)'}
            </span>
          </div>

          <div className="h-[1px] bg-slate-100 dark:bg-white/5" />

          <ul className="grid grid-cols-2 gap-2 text-[9px] font-bold text-slate-650 dark:text-slate-350">
            <li className="flex items-center gap-1.5">✓ Unlimited AI Chat</li>
            <li className="flex items-center gap-1.5">✓ Full OCR Scans</li>
            <li className="flex items-center gap-1.5">✓ Deep Analytics</li>
            <li className="flex items-center gap-1.5">✓ Multi-vehicle (up to 10)</li>
            <li className="flex items-center gap-1.5">✓ Export compliance PDFs</li>
            <li className="flex items-center gap-1.5">✓ Priority Support</li>
            <li className="flex items-center gap-1.5">✓ Prevention Intelligence</li>
            <li className="flex items-center gap-1.5">✓ Governance Authority view</li>
          </ul>

          <div className="pt-2 flex gap-2">
            <button 
              onClick={() => handleOpenPayment("Pro Monthly", 299)}
              className="flex-1 bg-indigo-500 hover:bg-indigo-650 text-white font-black uppercase text-[8px] tracking-wider py-2.5 rounded-xl text-center shadow-md"
            >
              Start Pro (299/mo)
            </button>
            <button 
              onClick={() => handleOpenPayment("Pro Annual", 2499)}
              className="flex-1 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold uppercase text-[8px] py-2.5 rounded-xl text-center"
            >
              Get Annual Plan
            </button>
          </div>
        </div>
      </div>
        </>
      ) : (
        <>
          {/* SECTION 5 — INFINITY PLAN */}
          <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-5 shadow-2xl relative overflow-hidden group select-none">
        {/* Glow pulsing border effect */}
        <div className="absolute inset-0 border border-amber-500/20 rounded-2xl animate-pulse pointer-events-none" />
        
        <div className="space-y-4 text-left text-[10px] text-slate-300">
          <div className="flex justify-between items-center">
            <span className="text-[8px] bg-amber-500/10 border border-amber-500/30 text-amber-500 font-extrabold uppercase px-2 py-0.5 rounded w-max block">
              One-Time. Forever.
            </span>
            <span className="font-extrabold text-amber-500 text-lg">∞</span>
          </div>

          <div>
            <span className="font-heading font-black text-white block text-sm uppercase">INFINITY PLAN</span>
            <span className="text-amber-500 font-bold block mt-0.5">₹2,999 one-time</span>
          </div>

          <div className="h-[1px] bg-slate-800" />

          <ul className="grid grid-cols-2 gap-2 text-[9px] font-bold text-slate-400">
            <li className="flex items-center gap-1.5 text-amber-400/80">✨ Lifetime premium access</li>
            <li className="flex items-center gap-1.5">✨ All future phase updates</li>
            <li className="flex items-center gap-1.5">✨ Unlimited feature unlocks</li>
            <li className="flex items-center gap-1.5">✨ Priority AI access</li>
            <li className="flex items-center gap-1.5">✨ Lifetime compliance report</li>
            <li className="flex items-center gap-1.5">✨ No renewals. Ever.</li>
          </ul>

          <button 
            onClick={() => handleOpenPayment("Infinity Lifetime", 2999)}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-650 text-slate-950 font-black uppercase text-[9px] tracking-widest py-3 rounded-xl text-center shadow-lg shadow-amber-500/15"
          >
            Get Lifetime Access — ₹2,999
          </button>
          
          <span className="block text-[8px] text-slate-500 font-semibold text-center mt-1">
            Institutional Infinity (up to 5 users) — ₹4,999 one-time
          </span>
        </div>
      </div>
        </>
      )}

      {billingPeriod === 'monthly' && (
        <>
          {/* SECTION 6 — AUTHORITY & GOVERNMENT PLANS */}
          <div className="bg-slate-50 dark:bg-navy-950/40 border border-slate-200 dark:border-white/5 rounded-2xl p-5 text-left text-[10px] space-y-4">
        <div className="space-y-0.5">
          <span className="text-[8px] text-indigo-500 font-black uppercase tracking-wider block">For Traffic Departments & Authorities</span>
          <h4 className="text-xs font-heading font-extrabold uppercase text-slate-850 dark:text-white tracking-wider">
            Scalable Enforcement Intelligence
          </h4>
        </div>

        <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/5 space-y-3">
          <div>
            <span className="block font-heading font-black text-slate-800 dark:text-white text-xs uppercase">POLICE / ENFORCEMENT</span>
            <span className="block text-slate-500 font-bold mt-0.5">From ₹25,000 / year</span>
          </div>
          <p className="text-[9px] text-slate-500 font-semibold leading-normal">
            Pricing varies by city size, department scale, and violation logs volume. Includes district dashboards, heatmaps, and repeat analytics.
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => triggerToast("📨 Demo Request Sent. Sales team will contact you shortly!")}
              className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-black uppercase text-[8px] py-2 rounded-xl text-center shadow"
            >
              Request Demo
            </button>
            <button 
              onClick={() => triggerToast("📨 Contact form triggered. We will mail RTO brochure.")}
              className="flex-1 bg-slate-100 dark:bg-white/5 hover:bg-slate-250 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 font-bold uppercase text-[8px] py-2 rounded-xl text-center"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* PLAN COMPARISON TABLE */}
      <div className="space-y-3">
        <h4 className="text-xs font-heading font-extrabold uppercase text-slate-850 dark:text-white tracking-wider text-left">
          Plan Comparison Details
        </h4>
        <div className="overflow-x-auto border border-slate-200 dark:border-white/5 rounded-2xl bg-white dark:bg-slate-900/60 shadow-xl scrollbar-none text-[9px]">
          <table className="w-full text-left border-collapse select-text">
            <thead>
              <tr className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/5 font-extrabold uppercase text-slate-500 text-[8px]">
                <th className="p-2.5">Feature</th>
                <th className="p-2.5">Free</th>
                <th className="p-2.5">Add-On</th>
                <th className="p-2.5">Plus</th>
                <th className="p-2.5">Pro</th>
                <th className="p-2.5">Infinity</th>
              </tr>
            </thead>
            <tbody className="font-bold text-slate-650 dark:text-slate-350">
              {[
                { name: 'Challan Lookup', free: '✅', addon: '✅', plus: '✅', pro: '✅', inf: '✅' },
                { name: 'AI Explanations', free: '5/day', addon: 'Temp', plus: 'Unlimited', pro: 'Unlimited', inf: 'Unlimited' },
                { name: 'Voice Assistant', free: '❌', addon: '7 days', plus: '❌', pro: '✅', inf: '✅' },
                { name: 'OCR Scanner', free: '❌', addon: 'Per pack', plus: 'Unlimited', pro: 'Unlimited', inf: 'Unlimited' },
                { name: 'Compliance Score', free: '❌', addon: '30 days', plus: '✅', pro: '✅', inf: '✅' },
                { name: 'Travel Mode', free: '❌', addon: '7 days', plus: '✅', pro: '✅', inf: '✅' },
                { name: 'Prevention Alerts', free: '❌', free: '❌', plus: '✅', pro: '✅', inf: '✅' },
                { name: 'Analytics', free: '❌', addon: '❌', plus: '❌', pro: '✅', inf: '✅' },
                { name: 'Multi-vehicle', free: '2 max', addon: '2 max', plus: '5 max', pro: '10 max', inf: 'Unlimited' },
                { name: 'PDF Export', free: '❌', addon: '❌', plus: '❌', pro: '✅', inf: '✅' },
                { name: 'Future Updates', free: '❌', addon: '❌', plus: '❌', pro: '❌', inf: '✅' }
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  <td className="p-2.5 font-extrabold text-slate-800 dark:text-white leading-normal">{row.name}</td>
                  <td className="p-2.5 font-mono">{row.free}</td>
                  <td className="p-2.5 font-mono">{row.addon}</td>
                  <td className="p-2.5 font-mono">{row.plus}</td>
                  <td className="p-2.5 font-mono">{row.pro}</td>
                  <td className="p-2.5 font-mono">{row.inf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}

      {/* FAQ SECTION */}
      <div className="space-y-3">
        <h4 className="text-xs font-heading font-extrabold uppercase text-slate-850 dark:text-white tracking-wider text-left">
          Frequently Asked Questions
        </h4>
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div 
                key={i} 
                className="bg-white dark:bg-white/5 border border-slate-250 dark:border-white/5 rounded-2xl overflow-hidden text-left shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full p-4 flex items-center justify-between font-bold text-[10px] text-slate-800 dark:text-white focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-electric" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400 leading-normal border-t border-slate-100 dark:border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* STICKY BOTTOM MOCK PAYMENT SHEET MODAL */}
      {showPaymentModal && selectedPack && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-[2rem] max-w-sm w-full p-6 space-y-5 animate-slide-up shadow-2xl select-none">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-white/5">
              <div className="space-y-0.5">
                <span className="text-[8px] text-slate-400 font-extrabold uppercase block tracking-wider">Secure Payment Gateway</span>
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-white flex items-center gap-1 uppercase">
                  Activating: {selectedPack.name}
                </h4>
              </div>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="flex justify-between items-center text-xs font-bold font-mono">
              <span className="text-slate-500">Billing Amount</span>
              <strong className="text-slate-800 dark:text-white text-base">₹{selectedPack.price}</strong>
            </div>

            <div className="h-[1px] bg-slate-100 dark:bg-white/5" />

            {isProcessingPayment ? (
              <div className="py-6 flex flex-col items-center justify-center space-y-3">
                <RefreshCw className="w-8 h-8 animate-spin text-electric" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Processing UPI Handshake...</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                <button
                  onClick={() => handleExecutePayment('upi')}
                  className="w-full bg-electric hover:bg-electric-glow text-white py-3 rounded-2xl text-xs font-black uppercase tracking-wider shadow-md focus:outline-none"
                >
                  Pay via UPI
                </button>
                <button
                  onClick={() => handleExecutePayment('card')}
                  className="w-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-800 dark:text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-center border border-slate-200 dark:border-white/10"
                >
                  Pay via Card
                </button>
                <button
                  onClick={() => handleExecutePayment('wallet')}
                  className="w-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-800 dark:text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-center border border-slate-200 dark:border-white/10"
                >
                  Pay via Wallet
                </button>
              </div>
            )}

            <div className="text-center text-[7px] text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-center gap-1 mt-1">

              <Lock className="w-3.5 h-3.5" /> Powered by DRIVOS Secure Payments

            </div>

          </div>
        </div>
      )}

      {/* STICKY BOTTOM CTA BANNER (Mobile-only bottom bar reminder) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-35 bg-white/95 dark:bg-navy-950/95 border-t border-slate-250 dark:border-white/10 px-4 py-3 flex items-center justify-between shadow-xl backdrop-blur-md">
        <div className="space-y-0.5 text-left pr-2">
          <span className="text-[7px] text-emerald-500 font-extrabold uppercase tracking-wider flex items-center gap-1">
            🔒 Free forever
          </span>
          <span className="text-[9px] text-slate-600 dark:text-slate-450 block font-semibold leading-tight">
            Upgrade anytime • No forced billing
          </span>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('pricing-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-electric hover:bg-electric-glow text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-md shadow-electric/25"
        >
          View Plans ↑
        </button>
      </div>

    </div>
  );
}
