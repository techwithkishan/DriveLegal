import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, ArrowDown, ArrowUp, AlertCircle, FileText, CheckCircle, 
  ShieldAlert, RefreshCw, BarChart3, Users, Settings, Compass, Layers, Shield
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, BarChart, Bar, Cell, PieChart, Pie 
} from 'recharts';

export default function ViolationAnalyticsScreen() {
  const { setActiveScreen, isAdminMode } = useAppState();

  // Animated KPI numbers state
  const [totalChallans, setTotalChallans] = useState(0);
  const [pendingChallans, setPendingChallans] = useState(0);
  const [collectedFines, setCollectedFines] = useState(0);
  const [percentIncrease, setPercentIncrease] = useState(0);

  // Staggered load count-up simulation
  useEffect(() => {
    const duration = 1200; // ms
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setTotalChallans(Math.floor((48291 / steps) * currentStep));
      setPendingChallans(Math.floor((12847 / steps) * currentStep));
      setCollectedFines(parseFloat(((4.2 / steps) * currentStep).toFixed(2)));
      setPercentIncrease(Math.floor((18 / steps) * currentStep));

      if (currentStep >= steps) {
        setTotalChallans(48291);
        setPendingChallans(12847);
        setCollectedFines(4.2);
        setPercentIncrease(18);
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  // Section 1 Line Chart (Area) data
  const lineData = [
    { name: 'May 1', count: 1200 },
    { name: 'May 5', count: 1800 },
    { name: 'May 10', count: 1400 },
    { name: 'May 15', count: 2100 },
    { name: 'May 20', count: 1600 },
    { name: 'May 25', count: 2400 },
    { name: 'May 31', count: 1900 }
  ];

  // Section 2 Horizontal Bar Chart data
  const barData = [
    { violation: 'Over-Speeding', count: 14200, color: '#3b82f6' },
    { violation: 'No Helmet', count: 11800, color: '#f59e0b' },
    { violation: 'Wrong Parking', count: 8400, color: '#10b981' },
    { violation: 'Red Light Jump', count: 7100, color: '#8b5cf6' },
    { violation: 'No Insurance', count: 5600, color: '#ef4444' },
    { violation: 'Mobile Driving', count: 4300, color: '#3b82f6' },
    { violation: 'No Seatbelt', count: 3200, color: '#f59e0b' },
    { violation: 'Triple Riding', count: 2100, color: '#10b981' }
  ];

  // Section 3 Donut Chart data
  const donutData = [
    { name: 'Two-Wheeler', value: 58, color: '#3b82f6' },
    { name: 'Four-Wheeler', value: 29, color: '#f59e0b' },
    { name: 'Commercial', value: 9, color: '#10b981' },
    { name: 'Heavy Vehicle', value: 4, color: '#8b5cf6' }
  ];

  const MoMChange = [
    { rule: "Over-Speeding", change: "22%", up: true },
    { rule: "No Helmet", change: "8%", up: false },
    { rule: "Wrong Parking", change: "11%", up: true },
    { rule: "Red Light Jump", change: "5%", up: true },
    { rule: "No Insurance", change: "3%", up: false }
  ];

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto relative overflow-hidden select-none bg-slate-900/10 dark:bg-navy-950/20 text-slate-800 dark:text-slate-100 animate-fade-in">
      
      {/* Dashboard Top Header */}
      <div className="py-2 border-b border-slate-200 dark:border-white/5 mb-4">
        <h2 className="text-xl font-heading font-black text-slate-800 dark:text-white tracking-wide">
          Traffic Intelligence Dashboard
        </h2>
        <span className="text-[10px] text-purple-400 font-extrabold uppercase tracking-widest block">
          Karnataka State • May 2025
        </span>
      </div>

      {/* KPI Cards Horizontal Scroll Strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none shrink-0">
        
        {/* KPI 1 */}
        <div className="min-w-[115px] bg-slate-900 border border-slate-800 dark:border-blue-500/20 rounded-2xl p-3.5 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-blue-500/10 rounded-full blur-lg pointer-events-none" />
          <span className="text-[9px] font-bold text-blue-450 uppercase tracking-wider block">Total Challans</span>
          <strong className="text-lg font-mono font-black text-white block mt-1.5 tabular-nums">
            {totalChallans.toLocaleString()}
          </strong>
          <span className="text-[8px] text-slate-500 mt-1 font-semibold">This Month</span>
        </div>

        {/* KPI 2 */}
        <div className="min-w-[115px] bg-slate-900 border border-slate-800 dark:border-red-500/20 rounded-2xl p-3.5 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-red-500/5 rounded-full blur-lg pointer-events-none" />
          <span className="text-[9px] font-bold text-red-450 uppercase tracking-wider block">Pending</span>
          <strong className="text-lg font-mono font-black text-red-500 block mt-1.5 tabular-nums">
            {pendingChallans.toLocaleString()}
          </strong>
          <span className="text-[8px] text-slate-500 mt-1 font-semibold">Unresolved</span>
        </div>

        {/* KPI 3 */}
        <div className="min-w-[115px] bg-slate-900 border border-slate-800 dark:border-emerald-500/20 rounded-2xl p-3.5 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/5 rounded-full blur-lg pointer-events-none" />
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">Collected</span>
          <strong className="text-lg font-mono font-black text-emerald-450 block mt-1.5 tabular-nums">
            ₹{collectedFines} Cr
          </strong>
          <span className="text-[8px] text-slate-500 mt-1 font-semibold">Recovered Fines</span>
        </div>

        {/* KPI 4 */}
        <div className="min-w-[115px] bg-slate-900 border border-slate-800 dark:border-amber-500/20 rounded-2xl p-3.5 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">vs Last Mo.</span>
          <strong className="text-lg font-mono font-black text-amber-500 block mt-1.5 tabular-nums">
            +{percentIncrease}%
          </strong>
          <span className="text-[8px] text-slate-500 mt-1 font-semibold">Volume Trend</span>
        </div>

      </div>

      {/* Line / Area Chart - Daily Challan Trend */}
      <div className="glass-panel p-4.5 space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            Challans Issued — Last 30 Days
          </span>
          <span className="text-[9px] font-bold bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded uppercase">Daily Trend</span>
        </div>

        <div className="w-full h-44 mt-1 font-mono text-[9px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.01}/>
              </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" tickLine={false} />
              <YAxis stroke="#64748b" tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} 
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorArea)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Horizontal Bar Chart - Most Common Violations */}
      <div className="glass-panel p-4.5 space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            Most Common Violations — May 2025
          </span>
        </div>

        <div className="w-full h-56 font-mono text-[9px] mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
              <XAxis type="number" stroke="#64748b" tickLine={false} />
              <YAxis dataKey="violation" type="category" stroke="#64748b" width={80} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vehicle Type Breakdown - Donut Chart */}
      <div className="glass-panel p-4.5 space-y-3 mb-4">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 block">
          <Layers className="w-4 h-4 text-purple-400" />
          Vehicle Type Breakdown
        </span>

        <div className="flex items-center gap-2">
          {/* Pie Chart visual */}
          <div className="w-1/2 h-36 font-mono relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={36}
                  outerRadius={50}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold leading-none">Total</span>
              <strong className="text-[10px] font-mono font-extrabold text-slate-800 dark:text-white block mt-0.5">48,291</strong>
            </div>
          </div>

          {/* Legend Detail List */}
          <div className="w-1/2 space-y-1.5 text-[10px] font-bold">
            {donutData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-650 dark:text-slate-350">{item.name}</span>
                </div>
                <span className="text-slate-800 dark:text-white font-mono">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4 - Monthly Comparison Card */}
      <div className="glass-panel p-4.5 space-y-3.5">
        <div className="flex items-center gap-1.5">
          <RefreshCw className="w-4 h-4 text-purple-400 animate-spin-slow" />
          <h4 className="text-xs font-heading font-extrabold uppercase text-slate-800 dark:text-slate-300 tracking-wider">
            Month-Over-Month Change
          </h4>
        </div>

        <div className="space-y-2 pt-1">
          {MoMChange.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{item.rule}</span>
              <div className="flex items-center gap-1">
                {item.up ? (
                  <div className="flex items-center gap-0.5 text-red-500 font-mono text-xs font-black">
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>↑ {item.change}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-0.5 text-emerald-500 font-mono text-xs font-black">
                    <ArrowDown className="w-3.5 h-3.5" />
                    <span>↓ {item.change}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
