import React, { useState, useRef } from 'react';
import {
  Camera, Upload, FileText, RefreshCw, CheckCircle, AlertCircle,
  ChevronDown, ChevronUp, Shield, ArrowRight, Clock, Zap, Eye,
  XCircle, AlertTriangle, ScanLine, FileCheck, Info, X
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

// ─── Mock OCR Challan Data ───────────────────────────────────────────────────
const MOCK_CHALLAN = {
  challanNo: 'KA-2025-BLR-048721',
  vehicle: 'KA01AB1234',
  violationType: 'Over-speeding',
  section: 'Section 112/183 MV Act',
  speed: '89 km/h in 50 km/h zone',
  location: 'Mysuru Highway, Bengaluru',
  officerBadge: 'BRTS-4421',
  date: '22 May 2025, 09:14 AM',
  fine: '₹2,000',
  courtDate: '15 Jun 2025',
  issuingAuthority: 'Karnataka Traffic Police – BLR East',
};

// ─── Accordion Explanation Blocks ────────────────────────────────────────────
const EXPLANATIONS = [
  {
    id: 'limits',
    icon: '⚡',
    title: 'Speed Limits on This Stretch',
    content: 'The Mysuru Highway is classified as a National Highway (NH-275). The permissible speed limit for private cars is 50 km/h in urban stretches and 80 km/h outside city limits. Your recorded speed of 89 km/h in a 50 km/h zone is a confirmed violation under Section 183 of the Motor Vehicles Act, 1988.',
  },
  {
    id: 'law',
    icon: '⚖️',
    title: 'Applicable Law & Fine Breakdown',
    content: 'Section 112 sets the permissible speed limits. Section 183 penalises driving at excessive speed. First-time offence: ₹1,000. Subsequent offence: ₹2,000. Exceeding 40+ km/h over limit: ₹4,000 + 3-month DL suspension. Your challan applies the standard ₹2,000 levy for first recorded over-speed event on this vehicle.',
  },
  {
    id: 'payment',
    icon: '💳',
    title: 'Payment Schedule & Discounts',
    content: 'Pay within 7 days: No late fee. Pay within 30 days: ₹250 late fee added. After 60 days: Challan forwarded to Motor Accident Claims Tribunal. Online payment is accepted via Parivahan.gov.in, PhonePe, GPay, or the VAHAN mobile app. A 30% concession applies if paid within 24 hours via Parivahan portal.',
  },
  {
    id: 'repeat',
    icon: '🔁',
    title: 'Repeat Offence Check',
    content: 'No prior over-speeding record found for vehicle KA01AB1234 in the last 12 months. This challan is categorised as a first-time offence on your profile. A second over-speeding offence within 12 months may trigger an automatic Safety Score downgrade and RTO notification to your insurer.',
  },
  {
    id: 'nextsteps',
    icon: '📋',
    title: 'Your Options & Next Steps',
    content: '1. Pay online at Parivahan.gov.in before Jun 15, 2025. 2. Contest at Traffic Court: Appear at Shivajinagar Traffic Court, Bengaluru, with originals of RC, DL, and Insurance. 3. If the challan details are incorrect (wrong vehicle / location), submit a dispute via the Karnataka e-Challan portal within 15 days. 4. Check your updated compliance score under the SCORE tab.',
  },
];

// ─── Evidence Analysis Variants ──────────────────────────────────────────────
const EVIDENCE_VARIANTS = [
  {
    id: 'A',
    violation: 'No Helmet',
    section: 'Section 129',
    fine: '₹1,000',
    severity: 'Medium',
    severityColor: 'text-amber-400',
    severityBg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Rider detected without ISI-certified helmet. Pillion rider also not wearing helmet. Both are prosecutable under Section 129 MV Act.',
    confidence: 92,
    detections: ['No helmet on rider (92% confidence)', 'No helmet on pillion (87% confidence)', 'Bike registration partially visible'],
    recommendation: 'Fine applicable to both rider and pillion. Total liability: ₹2,000 (₹1,000 × 2). Always wear BIS/ISI certified helmets.',
  },
  {
    id: 'B',
    violation: 'Wrong Parking',
    section: 'Section 122/177',
    fine: '₹500',
    severity: 'Low',
    severityColor: 'text-blue-400',
    severityBg: 'bg-blue-500/10 border-blue-500/20',
    description: 'Vehicle parked in a No Parking zone. Yellow striping on kerb visible. Street sign "No Parking 8AM–8PM" detected in frame.',
    confidence: 88,
    detections: ['No Parking zone marker (95% confidence)', 'Vehicle number plate visible', 'Parking time within prohibited hours'],
    recommendation: 'Vehicle may be towed. Pay via Parivahan within 7 days. Avoid parking within 10m of junctions or near fire hydrants.',
  },
  {
    id: 'C',
    violation: 'Mobile Phone Use',
    section: 'Section 184',
    fine: '₹1,500',
    severity: 'High',
    severityColor: 'text-red-400',
    severityBg: 'bg-red-500/10 border-red-500/20',
    description: 'Driver identified holding a mobile phone to ear while vehicle is in motion. This is a dangerous driving offence under Section 184.',
    confidence: 96,
    detections: ['Phone to ear (96% confidence)', 'Vehicle in motion (confirmed)', 'Driver face partially visible'],
    recommendation: 'Repeat offence attracts ₹3,000 fine + 3-month DL suspension. Use Bluetooth hands-free devices. Pull over safely before using phone.',
  },
];

// ─── Authenticity Checks ─────────────────────────────────────────────────────
const AUTH_CHECKS = [
  { label: 'Officer Badge Format', status: 'pass', detail: 'BRTS-4421 is a valid Karnataka Traffic Police code' },
  { label: 'MV Act Section Valid', status: 'pass', detail: 'Section 112/183 confirmed in Motor Vehicles Act 1988' },
  { label: 'Challan Number Format', status: 'warn', detail: 'Format matches KA-series, verification pending with state DB' },
  { label: 'Issuing Authority', status: 'pass', detail: 'BLR East Traffic Zone is an official RTO sub-division' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScanTab({ setActiveScreen }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [scanPhase, setScanPhase] = useState('idle'); // idle | scanning | done
  const [scanSteps, setScanSteps] = useState([false, false, false, false]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authVisible, setAuthVisible] = useState([false, false, false, false]);
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setScanPhase('idle');
    setScanSteps([false, false, false, false]);
    setShowExplanation(false);
    setShowAuth(false);
  };

  const handleScan = () => {
    if (!file) return;
    setScanPhase('scanning');
    setScanSteps([false, false, false, false]);

    const delays = [800, 1800, 2600, 3200];
    delays.forEach((d, i) => {
      setTimeout(() => {
        setScanSteps(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        if (i === delays.length - 1) {
          setTimeout(() => setScanPhase('done'), 400);
        }
      }, d);
    });
  };

  const handleAuthCheck = () => {
    setShowAuth(true);
    [0, 1, 2, 3].forEach(i => {
      setTimeout(() => {
        setAuthVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 300 + 200);
    });
  };

  const SCAN_STEPS = [
    'Reading document structure...',
    'Extracting challan fields...',
    'Cross-referencing MV Act sections...',
    'Generating compliance report...',
  ];

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${
          file
            ? 'border-electric/50 bg-electric/5'
            : 'border-slate-300 dark:border-white/15 hover:border-electric/40 hover:bg-electric/3'
        }`}
      >
        {preview ? (
          <div className="w-full space-y-2 text-center">
            <div className="w-16 h-16 mx-auto rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center">
              <FileText className="w-8 h-8 text-electric" />
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-white truncate max-w-full px-4">{file?.name}</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">{(file?.size / 1024).toFixed(1)} KB • Tap to change</p>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center">
              <ScanLine className="w-7 h-7 text-electric" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-800 dark:text-white">Tap to upload challan</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Accepts JPG, PNG, PDF</p>
            </div>
          </>
        )}
      </div>
      <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={handleFileChange} />

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 rounded-xl py-3 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
        >
          <Camera className="w-4 h-4" /> Take Photo
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 rounded-xl py-3 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
        >
          <Upload className="w-4 h-4" /> Upload File
        </button>
      </div>

      {/* Scan Button */}
      {file && scanPhase === 'idle' && (
        <button
          onClick={handleScan}
          className="w-full bg-electric text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg shadow-electric/30 hover:shadow-electric/50 hover:bg-electric-glow transition-all flex items-center justify-center gap-2 animate-fade-in"
        >
          <ScanLine className="w-4 h-4" /> Scan Challan
        </button>
      )}

      {/* Scanning Animation Steps */}
      {(scanPhase === 'scanning' || scanPhase === 'done') && (
        <div className="glass-panel p-4 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">OCR Processing</span>
            {scanPhase === 'done' ? (
              <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full">Complete</span>
            ) : (
              <RefreshCw className="w-4 h-4 text-electric animate-spin" />
            )}
          </div>
          {SCAN_STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                scanSteps[i] ? 'bg-emerald-500/20 text-emerald-400' : (scanPhase === 'scanning' && !scanSteps[i] && scanSteps[i - 1] !== false) ? 'bg-electric/20 text-electric' : 'bg-slate-100 dark:bg-white/5 text-slate-400'
              }`}>
                {scanSteps[i] ? <CheckCircle className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
              </div>
              <span className={`text-xs transition-all ${scanSteps[i] ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* OCR Results Card */}
      {scanPhase === 'done' && (
        <div className="space-y-3 animate-fade-in">
          {/* Demo Badge */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              🧪 Demo Mode — Sample Challan
            </span>
          </div>

          {/* Challan Details Card */}
          <div className="glass-panel p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">Challan Extracted</h4>
                <p className="text-[10px] text-electric font-bold mt-0.5">{MOCK_CHALLAN.challanNo}</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-lg">
                <span className="text-xs font-extrabold text-red-500 dark:text-red-400">{MOCK_CHALLAN.fine}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                ['Vehicle', MOCK_CHALLAN.vehicle],
                ['Violation', MOCK_CHALLAN.violationType],
                ['Section', MOCK_CHALLAN.section],
                ['Detected Speed', MOCK_CHALLAN.speed],
                ['Location', MOCK_CHALLAN.location],
                ['Officer Badge', MOCK_CHALLAN.officerBadge],
                ['Date & Time', MOCK_CHALLAN.date],
                ['Court Date', MOCK_CHALLAN.courtDate],
              ].map(([label, val]) => (
                <div key={label} className="bg-slate-100 dark:bg-white/5 rounded-xl p-2.5 space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block">{label}</span>
                  <span className="text-[10px] font-bold text-slate-800 dark:text-white leading-tight block">{val}</span>
                </div>
              ))}
            </div>

            <p className="text-[9px] text-slate-400 text-center">Issued by: {MOCK_CHALLAN.issuingAuthority}</p>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowExplanation(v => !v)}
              className="flex items-center justify-center gap-1.5 bg-electric/10 border border-electric/20 text-electric py-3 rounded-xl text-[11px] font-bold hover:bg-electric/20 transition-all"
            >
              <FileText className="w-4 h-4" />
              {showExplanation ? 'Hide' : 'View Full'} Explanation
            </button>
            <button
              onClick={handleAuthCheck}
              className="flex items-center justify-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 py-3 rounded-xl text-[11px] font-bold hover:bg-amber-500/20 transition-all"
            >
              <Shield className="w-4 h-4" />
              Verify Authenticity
            </button>
          </div>

          {/* Explanation Accordion */}
          {showExplanation && (
            <div className="space-y-2 animate-fade-in">
              <h5 className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 px-1">Legal Explanation</h5>
              {EXPLANATIONS.map((exp) => (
                <div key={exp.id} className="glass-panel overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === exp.id ? null : exp.id)}
                    className="w-full flex items-center justify-between p-3.5 text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{exp.icon}</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-white">{exp.title}</span>
                    </div>
                    {openAccordion === exp.id ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {openAccordion === exp.id && (
                    <div className="px-4 pb-4 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-white/5 pt-3 animate-fade-in">
                      {exp.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Authenticity Audit Card */}
          {showAuth && (
            <div className="glass-panel p-4 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Authenticity Audit</h5>
                <div className="bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                  <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider">⚠ Likely Authentic</span>
                </div>
              </div>
              <div className="space-y-2">
                {AUTH_CHECKS.map((check, i) => (
                  <div
                    key={check.label}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl transition-all duration-500 ${
                      authVisible[i] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    } ${check.status === 'pass' ? 'bg-emerald-500/5 border border-emerald-500/15' : 'bg-amber-500/5 border border-amber-500/15'}`}
                  >
                    {check.status === 'pass' ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="text-[10px] font-bold text-slate-800 dark:text-white block">{check.label}</span>
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 leading-snug">{check.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-slate-400 text-center pt-1">Note: Full verification requires state traffic authority API access</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EvidenceTab() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [variantIndex, setVariantIndex] = useState(0);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setIsAnalyzing(false);
    setAnalyzeProgress(0);
  };

  const handleAnalyze = () => {
    if (!file) return;
    setIsAnalyzing(true);
    setResult(null);
    setAnalyzeProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setAnalyzeProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 5;
      });
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      setAnalyzeProgress(100);
      const nextIndex = (variantIndex + 1) % EVIDENCE_VARIANTS.length;
      setVariantIndex(nextIndex);
      setResult(EVIDENCE_VARIANTS[nextIndex]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const variant = result;

  return (
    <div className="space-y-4">
      {/* Header info */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-3.5 flex items-start gap-2.5">
        <Eye className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
          Upload a photo of a road incident or traffic situation. Our AI will detect violations and calculate applicable fines.
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${
          file ? 'border-indigo-500/40 bg-indigo-500/5' : 'border-slate-300 dark:border-white/15 hover:border-indigo-500/40 hover:bg-indigo-500/3'
        }`}
      >
        {file ? (
          <div className="w-full text-center space-y-1">
            <div className="w-14 h-14 mx-auto rounded-xl bg-indigo-500/15 flex items-center justify-center">
              <Camera className="w-7 h-7 text-indigo-400" />
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-white truncate px-4">{file.name}</p>
            <p className="text-[10px] text-slate-500">Tap to change image</p>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 flex items-center justify-center">
              <Camera className="w-7 h-7 text-indigo-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-800 dark:text-white">Upload Evidence Photo</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Traffic scene, dashcam image, or road photo</p>
            </div>
          </>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      {/* Analyze Button */}
      {file && !isAnalyzing && !result && (
        <button
          onClick={handleAnalyze}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2 animate-fade-in"
        >
          <Zap className="w-4 h-4" /> Analyze Evidence
        </button>
      )}

      {/* Progress Bar */}
      {isAnalyzing && (
        <div className="glass-panel p-4 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-white">AI Vision Processing...</span>
            <span className="text-xs font-mono text-indigo-400">{analyzeProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-100"
              style={{ width: `${analyzeProgress}%` }}
            />
          </div>
          <div className="space-y-1.5">
            {['Object detection model loading...', 'Road scene segmentation...', 'Violation pattern matching...'].map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                {analyzeProgress > (i + 1) * 30 ? (
                  <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                ) : (
                  <div className="w-3 h-3 rounded-full border border-slate-300 dark:border-white/20 flex-shrink-0" />
                )}
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result Card */}
      {variant && !isAnalyzing && (
        <div className="space-y-3 animate-fade-in">
          {/* Demo Badge */}
          <span className="inline-block text-[10px] bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            🧪 Demo Mode — Sample Analysis
          </span>

          {/* Violation Badge */}
          <div className={`glass-panel p-4 space-y-3 border-l-4 ${variant.severity === 'High' ? 'border-l-red-500' : variant.severity === 'Medium' ? 'border-l-amber-500' : 'border-l-blue-500'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">{variant.violation}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{variant.section}</p>
              </div>
              <div className="text-right space-y-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${variant.severityBg} ${variant.severityColor}`}>
                  {variant.severity}
                </span>
                <p className="text-sm font-extrabold text-slate-800 dark:text-white">{variant.fine}</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{variant.description}</p>

            {/* Confidence & Detections */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">AI Confidence</span>
                <span className={`text-xs font-bold tabular-nums ${variant.severityColor}`}>{variant.confidence}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-1.5">
                <div
                  className={`h-full rounded-full ${variant.severity === 'High' ? 'bg-red-500' : variant.severity === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'}`}
                  style={{ width: `${variant.confidence}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Detections</span>
              {variant.detections.map((d, i) => (
                <div key={i} className="flex items-start gap-2 text-[10px] text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1" />
                  {d}
                </div>
              ))}
            </div>

            {/* Recommendation */}
            <div className="bg-slate-100 dark:bg-white/5 rounded-xl p-3 space-y-1">
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Recommendation</span>
              <p className="text-[10px] text-slate-700 dark:text-slate-300 leading-relaxed">{variant.recommendation}</p>
            </div>
          </div>

          {/* Analyze Again */}
          <button
            onClick={handleAnalyze}
            className="w-full border border-indigo-500/30 text-indigo-400 py-3 rounded-xl text-xs font-bold hover:bg-indigo-500/10 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Analyze Another Image
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ChallanScannerScreen() {
  const { setActiveScreen } = useAppState();
  const [activeTab, setActiveTab] = useState('scan');

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto w-full space-y-4">
      {/* Screen Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-heading font-extrabold text-slate-800 dark:text-white tracking-wide">
          Challan Scanner
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Upload a challan image or PDF to extract details
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-1 gap-1">
        <button
          onClick={() => setActiveTab('scan')}
          className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'scan'
              ? 'bg-white dark:bg-white/10 shadow-sm text-electric border border-slate-200 dark:border-white/10'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Scan Challan
        </button>
        <button
          onClick={() => setActiveTab('evidence')}
          className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'evidence'
              ? 'bg-white dark:bg-white/10 shadow-sm text-indigo-500 dark:text-indigo-400 border border-slate-200 dark:border-white/10'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Eye className="w-3.5 h-3.5" /> Analyze Evidence
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'scan' ? (
        <ScanTab setActiveScreen={setActiveScreen} />
      ) : (
        <EvidenceTab />
      )}
    </div>
  );
}
