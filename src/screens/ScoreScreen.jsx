import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Award, HelpCircle, ShieldCheck, 
  AlertTriangle, ShieldAlert, Sparkles, TrendingUp 
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function ScoreScreen() {
  const { safetyScore, setActiveScreen } = useAppState();

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const score = safetyScore.score;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColorClasses = (val) => {
    if (val >= 80) return { border: 'border-emerald-500/25', bg: 'bg-emerald-500/10', text: 'text-emerald-400', stroke: 'stroke-emerald-500' };
    if (val >= 50) return { border: 'border-amber-500/25', bg: 'bg-amber-500/10', text: 'text-amber-400', stroke: 'stroke-amber-500' };
    return { border: 'border-red-500/25', bg: 'bg-red-500/10', text: 'text-red-400', stroke: 'stroke-red-500' };
  };

  const colors = getScoreColorClasses(score);

  // SVG Chart settings for 6 months
  const chartHeight = 80;
  const chartWidth = 280;
  const maxScore = 100;

  const getBarColor = (val) => {
    if (val >= 80) return '#10B981'; // emerald
    if (val >= 50) return '#F59E0B'; // amber
    return '#EF4444'; // red
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 space-y-4 max-w-md mx-auto relative select-none">
      {/* Header and back action */}
      <div className="flex items-center gap-3 py-1">
        <button
          onClick={() => setActiveScreen('dashboard')}
          className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-xl font-heading font-extrabold text-slate-800 dark:text-white tracking-wide">
            Road Safety Compliance
          </h2>
          <p className="text-[10px] text-slate-555 dark:text-slate-400 font-bold uppercase tracking-wider">
            Scientific Driver Scoring System
          </p>
        </div>
      </div>

      {/* CIRCULAR Score Gauge Display */}
      <div className="glass-panel p-5 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-electric/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative flex items-center justify-center w-36 h-36">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-slate-200 dark:stroke-white/5"
              strokeWidth="9"
              fill="transparent"
            />
            <circle
              cx="72"
              cy="72"
              r={radius}
              className={`transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${colors.stroke}`}
              strokeWidth="9"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={animate ? strokeDashoffset : circumference}
              strokeLinecap="round"
            />
          </svg>
          
          <div className="absolute flex flex-col items-center justify-center">
            <span className={`text-4xl font-mono font-bold tabular-nums ${colors.text}`}>
              {score}
            </span>
            <span className="text-[9px] font-mono font-extrabold text-slate-500 uppercase tracking-widest mt-0.5">
              SCORE / 100
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <span className={`text-sm font-heading font-extrabold uppercase tracking-widest ${colors.text}`}>
            {safetyScore.label}
          </span>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal max-w-[280px] mx-auto">
            Calculated based on VAHAN driving history, speed breaches, and unpaid municipal citation status.
          </p>
        </div>
      </div>

      {/* SCORE DEDUCTION breakdown ledgers */}
      <div className="glass-panel p-5 space-y-3.5">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-white/5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            Deductions Ledger
          </span>
          <span className="text-[9px] font-bold text-slate-500 uppercase">
            Base: 100 Pts
          </span>
        </div>

        <div className="space-y-2.5">
          {safetyScore.deductions.map((d) => (
            <div key={d.id} className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-3 rounded-xl flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{d.name}</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-500 block leading-tight">{d.desc}</span>
              </div>
              <span className={`text-xs font-mono font-bold tabular-nums ${d.value < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                {d.value === 0 ? '+0' : d.value} pts
              </span>
            </div>
          ))}
        </div>

        {/* Deductions totals warning */}
        <div className="bg-red-500/5 border border-red-500/15 p-3 rounded-2xl flex justify-between items-center text-[10px]">
          <span className="text-slate-500 dark:text-slate-400 uppercase font-bold">Total Deductions</span>
          <span className="text-red-500 font-mono font-bold tabular-nums text-sm">-33 PTS</span>
        </div>
      </div>

      {/* IMPROVEMENT TIPS cards */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block px-1">
          Scoring Optimization Tips
        </span>
        
        <div className="grid grid-cols-1 gap-2.5">
          {safetyScore.tips.map((tip, i) => (
            <div key={tip.id} className="glass-panel p-3.5 flex items-center gap-3.5 hover:bg-slate-100/80 dark:hover:bg-white/10 transition-all">
              <div className="bg-electric/15 p-2 rounded-xl text-electric shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-[11px] text-slate-700 dark:text-slate-300 font-semibold leading-normal">
                {tip.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SCORE HISTORY MINI SVG BAR CHART */}
      <div className="glass-panel p-5 space-y-4">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 border-b border-slate-200 dark:border-white/5 pb-2">
          <TrendingUp className="w-4 h-4 text-electric" />
          6-Month Score History
        </span>

        {/* Responsive, custom-drawn premium SVG bar chart */}
        <div className="flex justify-center py-2 relative">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full">
            {/* Background Grid Lines */}
            {[25, 50, 75, 100].map((level) => {
              const y = chartHeight - (level / 100) * (chartHeight - 15);
              return (
                <g key={level}>
                  <line
                    x1="20"
                    y1={y}
                    x2={chartWidth}
                    y2={y}
                    className="stroke-slate-200 dark:stroke-white/5"
                    strokeWidth="1"
                  />
                  <text
                    x="5"
                    y={y + 3}
                    className="fill-slate-400 dark:fill-slate-500 font-bold"
                    fontSize="7"
                    fontFamily="monospace"
                  >
                    {level}
                  </text>
                </g>
              );
            })}

            {/* Individual Columns */}
            {safetyScore.history.map((entry, index) => {
              const numBars = safetyScore.history.length;
              const spacing = (chartWidth - 40) / numBars;
              const barWidth = 18;
              const x = 32 + index * spacing;
              
              // Animated height factor
              const targetHeight = (entry.score / maxScore) * (chartHeight - 20);
              const barHeight = animate ? targetHeight : 0;
              const y = chartHeight - barHeight - 10;

              return (
                <g key={entry.month} className="group">
                  {/* Bar shape */}
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="3"
                    fill={getBarColor(entry.score)}
                    opacity="0.8"
                    className="transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) hover:opacity-100 cursor-pointer"
                  />
                  
                  {/* Value bubble over bar */}
                  {animate && (
                    <text
                      x={x + barWidth / 2}
                      y={y - 3}
                      className="fill-slate-700 dark:fill-white font-extrabold"
                      fontSize="7"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {entry.score}
                    </text>
                  )}

                  {/* Month Label */}
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight}
                    className="fill-slate-400 dark:fill-slate-500 font-bold"
                    fontSize="7"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                  >
                    {entry.month}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
