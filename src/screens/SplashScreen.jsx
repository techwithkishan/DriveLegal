
import React, { useEffect, useState, useRef } from 'react';
import { useAppState } from '../context/AppStateContext';

// BikeSVG has been replaced with the high-fidelity image loader

/* ─── Cycling loading messages ─────────────────────────────────────────── */
const MESSAGES = [
  'Loading traffic laws...',
  'Fetching zone data...',
  'Preparing AI assistant...',
  'Almost ready...',
];

/* ─── Main SplashScreen Component ───────────────────────────────────────── */
export default function SplashScreen() {
  const { setActiveScreen, user } = useAppState();

  const [progress, setProgress]   = useState(0);
  const [isDone, setIsDone]       = useState(false);
  const [fadeOut, setFadeOut]     = useState(false);
  const [msgIdx, setMsgIdx]       = useState(0);
  const [msgVisible, setMsgVisible] = useState(true);
  const [logoIn, setLogoIn]       = useState(false);

  const progressRef = useRef(0);

  /* ── Logo entrance ─────────────────────────────────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setLogoIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* ── Progress animation: 0 → 100 in ~2.6 seconds ───────────────────── */
  useEffect(() => {
    const DURATION  = 2600; // ms
    const TICK      = 24;   // ms per frame (~40fps)
    const INCREMENT = 100 / (DURATION / TICK);

    const interval = setInterval(() => {
      progressRef.current += INCREMENT;
      const clamped = Math.min(progressRef.current, 100);
      setProgress(clamped);

      if (clamped >= 100) {
        clearInterval(interval);
        // Show done state → fade out → navigate
        setTimeout(() => setIsDone(true), 200);
        setTimeout(() => setFadeOut(true), 1000);
        setTimeout(() => {
          setActiveScreen(user ? 'dashboard' : 'landing');
        }, 1600);
      }
    }, TICK);

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Message cycling with fade ──────────────────────────────────────── */
  useEffect(() => {
    const CYCLE = 680;
    const FADE  = 250;

    const interval = setInterval(() => {
      setMsgVisible(false);
      setTimeout(() => {
        setMsgIdx(prev => (prev + 1) % MESSAGES.length);
        setMsgVisible(true);
      }, FADE);
    }, CYCLE);

    return () => clearInterval(interval);
  }, []);

  /* ── Derived values ─────────────────────────────────────────────────── */
  // Bike travels from 0% to ~88% of road width (so it stays visible at end)
  const bikeLeft  = Math.min(progress * 0.88, 88);
  const pct       = Math.round(progress);

  // Which message to show based on progress brackets
  const activeMsg =
    progress < 26 ? MESSAGES[0] :
    progress < 55 ? MESSAGES[1] :
    progress < 82 ? MESSAGES[2] : MESSAGES[3];

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        background: '#0A0F1E',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.55s ease-in-out',
      }}
    >
      {/* ── Ambient glow blobs ───────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: 320, height: 320,
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute', bottom: '20%', left: '20%',
          width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }}
      />

      {/* ── TOP: Logo + Tagline ──────────────────────────────────────── */}
      <div
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          marginBottom: 52,
          opacity: logoIn ? 1 : 0,
          transform: logoIn ? 'translateY(0)' : 'translateY(-18px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        {/* Logo image */}
        <div
          style={{
            width: 72, height: 72, borderRadius: 18, overflow: 'hidden',
            border: '2px solid rgba(59,130,246,0.35)',
            boxShadow: '0 0 32px rgba(59,130,246,0.3), 0 0 8px rgba(59,130,246,0.15)',
            marginBottom: 14,
          }}
        >
          <img
            src="/drivelegal-logo.jpg"
            alt="DRIVELEGAL"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Brand name */}
        <h1
          style={{
            fontFamily: 'inherit',
            fontWeight: 900,
            fontSize: 'clamp(28px, 5vw, 42px)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            lineHeight: 1,
            margin: 0,
            background: 'linear-gradient(180deg, #fff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          DRIVE<span style={{ WebkitTextFillColor: '#3B82F6', color: '#3B82F6' }}>LEGAL</span>
        </h1>

        {/* Divider */}
        <div
          style={{
            width: 36, height: 2, borderRadius: 2,
            background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)',
            margin: '10px 0',
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'inherit',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#64748b',
            margin: 0,
          }}
        >
          Smart People. Smarter Cities.
        </p>
      </div>

      {/* ── CENTER: Road Loading Bar ─────────────────────────────────── */}
      <div style={{ width: '100%', maxWidth: 520, padding: '0 20px' }}>

        {/* Road track container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 52,
            borderRadius: 26,
            background: '#0F172A',
            border: '1.5px solid #1e293b',
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.1)',
          }}
        >
          {/* Road surface texture */}
          <div style={{ position: 'absolute', inset: 0, background: '#111827', borderRadius: 26 }} />

          {/* ── Electric blue trail fill ── */}
          <div
            style={{
              position: 'absolute',
              left: 0, top: 0, bottom: 0,
              width: `${progress}%`,
              borderRadius: '26px 0 0 26px',
              background: `linear-gradient(90deg,
                #1D4ED8 0%,
                #2563EB 40%,
                #3B82F6 75%,
                #60A5FA ${Math.max(progress - 5, 0)}%
              )`,
              boxShadow: '4px 0 24px rgba(59,130,246,0.6), 0 0 8px rgba(59,130,246,0.3)',
              transition: 'width 24ms linear',
            }}
          />

          {/* ── Glow edge at the bike's leading tip ── */}
          <div
            style={{
              position: 'absolute',
              left: `${progress}%`,
              top: 0, bottom: 0,
              width: 32,
              transform: 'translateX(-50%)',
              background: 'radial-gradient(ellipse at center, rgba(147,197,253,0.5) 0%, transparent 70%)',
              transition: 'left 24ms linear',
              pointerEvents: 'none',
            }}
          />

          {/* ── Center lane dashes ── */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: 3,
              transform: 'translateY(-50%)',
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 16px, transparent 16px, transparent 32px)',
              pointerEvents: 'none',
              animation: 'dashScroll 0.6s linear infinite',
            }}
          />

          {/* ── Road edge markings (top + bottom thin strips) ── */}
          <div
            style={{
              position: 'absolute', top: 5, left: 12, right: 12, height: 2,
              background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 40px, transparent 40px, transparent 60px)',
            }}
          />
          <div
            style={{
              position: 'absolute', bottom: 5, left: 12, right: 12, height: 2,
              background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 40px, transparent 40px, transparent 60px)',
            }}
          />

          {/* ── Bike Image ── */}
          <div
            style={{
              position: 'absolute',
              bottom: 2,
              left: `${bikeLeft}%`,
              transform: 'translateX(-8px)',
              transition: 'left 24ms linear',
              filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.5))',
              zIndex: 10,
              willChange: 'left',
            }}
          >
            <img 
              src="/bike-loader.jpg" 
              alt="Bike Loader" 
              style={{ 
                width: 48, 
                height: 48, 
                borderRadius: '50%', 
                border: '2px solid #3B82F6',
                objectFit: 'cover',
                boxShadow: '0 0 12px rgba(59,130,246,0.5)'
              }} 
            />
          </div>

          {/* ── Checkmark overlay at 100% ── */}
          {isDone && (
            <div
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(16,185,129,0.15)',
                animation: 'fadeIn 0.4s ease',
              }}
            >
              <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                {/* Outer ring pulse */}
                <circle cx="20" cy="20" r="18" stroke="#10B981" strokeWidth="2" opacity="0.4" />
                <circle cx="20" cy="20" r="14" fill="rgba(16,185,129,0.2)" stroke="#10B981" strokeWidth="1.5" />
                <path
                  d="M11 20 L17 26 L29 13"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animation: 'checkDraw 0.35s ease forwards' }}
                />
              </svg>
            </div>
          )}
        </div>

        {/* ── Percentage counter ── */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 18,
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: 'clamp(20px, 4vw, 26px)',
            fontVariantNumeric: 'tabular-nums',
            color: isDone ? '#10B981' : '#fff',
            letterSpacing: '0.04em',
            transition: 'color 0.4s ease',
            fontFeatureSettings: '"tnum"',
          }}
        >
          {pct}
          <span style={{ fontSize: '0.55em', fontWeight: 700, color: isDone ? '#10B981' : '#64748b', marginLeft: 2 }}>%</span>
        </div>

        {/* ── Cycling loading message ── */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 10,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'inherit',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#475569',
              opacity: msgVisible ? 1 : 0,
              transform: msgVisible ? 'translateY(0)' : 'translateY(4px)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}
          >
            {activeMsg}
          </span>
        </div>

        {/* ── Bottom: version label ── */}
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#1e3a5f',
            }}
          >
            DRIVELEGAL v1.0
          </span>
        </div>
      </div>

      {/* ── Keyframe CSS ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes dashScroll {
          0%   { background-position: 0 0; }
          100% { background-position: 32px 0; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }

        @keyframes checkDraw {
          from { stroke-dasharray: 30; stroke-dashoffset: 30; }
          to   { stroke-dasharray: 30; stroke-dashoffset: 0; }
        }

        @keyframes ambientPulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }

        }
      `}</style>
    </div>
  );
}
