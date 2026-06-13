import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle, FileText, 
  MapPin, Play, X, ArrowLeft, RefreshCw, AlertCircle, Info, ExternalLink
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function PreDriveScreen() {
  const { setActiveScreen, safetyScore } = useAppState();
  const [toastMessage, setToastMessage] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  
  // 5 document checklist items state
  const [docs, setDocs] = useState([
    { id: 'dl', name: 'Driving Licence', status: 'valid', desc: 'Expires in 4 years', expiry: '12-May-2030' },
    { id: 'rc', name: 'Registration Certificate (RC)', status: 'valid', desc: 'Expires in 7 years', expiry: '20-Oct-2033' },
    { id: 'insurance', name: 'Vehicle Insurance', status: 'expiring', desc: 'Expires in 12 days', expiry: '10-Jun-2026' },
    { id: 'puc', name: 'PUC Certificate', status: 'valid', desc: 'Expires in 4 months', expiry: '14-Sep-2026' },
    { id: 'fitness', name: 'Fitness Certificate', status: 'valid', desc: 'Expires in 9 years', expiry: '05-Mar-2035' }
  ]);

  // Risk Score from context
  const score = safetyScore.score; // 67 or similar

  // Staggered load animation helper
  const [animateRows, setAnimateRows] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setAnimateRows(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleRowClick = (doc) => {
    setSelectedDoc(doc);
    setShowBottomSheet(true);
  };

  const handleRenew = (id) => {
    setDocs(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: 'valid',
          desc: 'Expires in 1 year',
          expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
        };
      }
      return d;
    }));
    setShowBottomSheet(false);
    showToast(`${selectedDoc.name} updated successfully!`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleStartDrive = () => {
    showToast("Stay safe. Drive within limits.");
  };

  // local rules items
  const localRules = [
    { title: "Helmet Rule (Rider & Pillion)", penalty: "₹1,000 + 3 Months DL Suspension", desc: "Mandatory ISI helmet for both two-wheeler riders." },
    { title: "Seatbelt Enforcement", penalty: "₹1,000", desc: "All occupants in front & front-facing rear seats must wear seatbelts." },
    { title: "High Security Registration Plate (HSRP)", penalty: "₹500 - ₹1,000", desc: "Mandatory HSRP for all vehicles registered before April 2019." },
    { title: "Speed Limit Adherence (NH44 / Airport Rd)", penalty: "₹1,000", desc: "Speed cameras active. 80 km/h for cars, 60 km/h for heavy vehicles." },
    { title: "Air Pollution Norms (Valid PUC)", penalty: "₹10,000 (First violation)", desc: "Heavy penalty & possible suspension if driving with expired PUC." }
  ];

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button 
          onClick={() => setActiveScreen('dashboard')}
          className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h3 className="text-lg font-heading font-extrabold text-slate-800 dark:text-white tracking-wide">
            Pre-Drive Safety Check
          </h3>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            Verify readiness before your journey
          </span>
        </div>
      </div>

      {/* Safety Score / Risk Banner */}
      <div className={`border rounded-2xl p-4 mb-4 flex items-center gap-3.5 shadow-lg relative overflow-hidden transition-all duration-300 ${
        score >= 80 ? 'bg-emerald-500/10 border-emerald-500/30' :
        score >= 50 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-red-500/10 border-red-500/30'
      }`}>
        <div className={`p-2.5 rounded-xl border ${
          score >= 80 ? 'bg-emerald-500/25 border-emerald-500/20 text-emerald-500 dark:text-emerald-400' :
          score >= 50 ? 'bg-amber-500/25 border-amber-500/20 text-amber-500 dark:text-amber-400' : 'bg-red-500/25 border-red-500/20 text-red-500 dark:text-red-400'
        }`}>
          {score >= 50 ? <ShieldCheck className="w-6 h-6 animate-pulse" /> : <AlertTriangle className="w-6 h-6 animate-bounce" />}
        </div>
        <div className="flex-1 space-y-0.5">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              score >= 80 ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
              score >= 50 ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-red-500/20 text-red-600 dark:text-red-400'
            }`}>
              {score >= 80 ? 'Low Risk' : score >= 50 ? 'Moderate Risk' : 'High Risk'}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold font-mono">
              Driver Score: {score}/100
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            {score >= 80 ? 'Your compliance profile is excellent. Drive safely!' :
             score >= 50 ? 'Minor document expiry and driving pattern warnings. Keep under speed limits.' :
             'Multiple critical issues detected. Please check document expiration before driving.'}
          </p>
        </div>
      </div>

      {/* Document Checklist Panel */}
      <div className="glass-panel p-4 space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-electric-glow" />
            <h4 className="text-xs font-heading font-extrabold uppercase text-slate-800 dark:text-slate-300 tracking-wider">
              Required Documents
            </h4>
          </div>
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">
            Tap rows to renew/renewals
          </span>
        </div>

        <div className="space-y-2">
          {docs.map((doc, idx) => (
            <div 
              key={doc.id}
              onClick={() => handleRowClick(doc)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer hover:bg-slate-100/50 dark:hover:bg-white/10 transition-all duration-300 ${
                animateRows ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              } ${
                doc.status === 'expiring' 
                  ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40 text-amber-900 dark:text-amber-100' 
                  : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10'
              }`}
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-center gap-2.5">
                {doc.status === 'valid' ? (
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4.5 h-4.5 text-amber-500 dark:text-amber-400 animate-pulse" />
                )}
                <div>
                  <span className="text-xs font-bold block text-slate-800 dark:text-white">{doc.name}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{doc.desc}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                  doc.status === 'expiring' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                }`}>
                  {doc.status === 'expiring' ? 'Expiring' : 'Valid'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local Laws / Regional Rules Card */}
      <div className="glass-panel p-4 space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-electric-glow" />
          <h4 className="text-xs font-heading font-extrabold uppercase text-slate-800 dark:text-slate-300 tracking-wider">
            Active Karnataka Enforcement Rules
          </h4>
        </div>

        <div className="space-y-3">
          {localRules.map((rule, idx) => (
            <div key={idx} className="border-b border-slate-200 dark:border-white/5 last:border-0 pb-2.5 last:pb-0">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{rule.title}</span>
                <span className="text-[9px] font-mono font-bold bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  {rule.penalty}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Start Drive CTA */}
      <div className="mt-5">
        <button
          onClick={handleStartDrive}
          className="w-full bg-electric text-white py-3 rounded-2xl text-xs font-extrabold uppercase tracking-widest shadow-xl shadow-electric/20 hover:bg-electric-glow active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Start Driving Journey</span>
        </button>
      </div>

      {/* Slide up Action Bottom Sheet */}
      {showBottomSheet && selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-0 transition-all duration-300">
          <div className="glass-modal w-full max-w-md rounded-t-3xl border-t border-slate-200 dark:border-white/10 p-5 space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <span className="font-heading font-extrabold text-slate-800 dark:text-slate-200 text-sm tracking-wider uppercase">
                {selectedDoc.name} Actions
              </span>
              <button 
                onClick={() => setShowBottomSheet(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/15 text-slate-500 dark:text-slate-400 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-4.5 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 block">
                  Document Information
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Status:</span>
                    <strong className={`font-bold capitalize ${selectedDoc.status === 'expiring' ? 'text-amber-500' : 'text-emerald-500'}`}>{selectedDoc.status}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block">Expires:</span>
                    <strong className="text-slate-700 dark:text-slate-200">{selectedDoc.expiry}</strong>
                  </div>
                </div>
              </div>

              {selectedDoc.status === 'expiring' ? (
                <button
                  onClick={() => handleRenew(selectedDoc.id)}
                  className="w-full bg-electric text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-electric/25 hover:bg-electric-glow transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-slow" />
                  <span>Renew Document (Simulate)</span>
                </button>
              ) : (
                <button
                  onClick={() => handleRenew(selectedDoc.id)}
                  className="w-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-800 dark:text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Update Document details</span>
                </button>
              )}

              <a 
                href="https://sarathi.parivahan.gov.in/" 
                target="_blank" 
                rel="noreferrer"
                className="w-full border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center block transition-all hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span>Open Government Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 border border-slate-700 text-white dark:bg-navy-900 dark:border-indigo-500/30 font-bold text-xs py-3 px-6 rounded-2xl shadow-xl flex items-center gap-2 animate-fade-in">
          <Info className="w-4 h-4 text-electric-glow" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
