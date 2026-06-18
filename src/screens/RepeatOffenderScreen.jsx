import React from 'react';
import { 
  ArrowLeft, RefreshCw, AlertTriangle, Scale, ShieldAlert, Info, Users, 
  MapPin, Clock, Calendar, BarChart3, Bot, Compass
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { 
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';

export default function RepeatOffenderScreen() {
  const { setActiveScreen } = useAppState();

  // Recurrence Chart data
  const recurrenceData = [
    { name: '1 Violation', count: 28400, color: '#3b82f6' },
    { name: '2 Violations', count: 8200, color: '#f59e0b' },
    { name: '3 Violations', count: 3241, color: '#10b981' },
    { name: '4+ Violations', count: 847, color: '#8b5cf6' },
    { name: 'Court Ref', count: 124, color: '#ef4444' }
  ];

  const repeatTypes = [
    { violation: "Over-Speeding", count: "1,842", gap: "23 days" },
    { violation: "No Helmet", count: "1,204", gap: "31 days" },
    { violation: "Wrong Parking", count: "891", gap: "18 days" },
    { violation: "Red Light Jump", count: "712", gap: "27 days" }
  ];

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto relative overflow-hidden select-none bg-slate-900/10 dark:bg-navy-950/20 text-slate-800 dark:text-slate-100 animate-fade-in">
      
      {/* Header */}
      <div className="py-2 border-b border-slate-200 dark:border-white/5 mb-4">
        <h2 className="text-xl font-heading font-black text-slate-800 dark:text-white tracking-wide">
          Repeat Offense Intelligence
        </h2>
        <span className="text-[10px] text-blue-500 font-extrabold uppercase tracking-widest block">
          Identifying High-Risk Driver Patterns
        </span>
      </div>

      {/* KPI Cards Horizontal Strip */}
      <div className="grid grid-cols-3 gap-3 mb-4 shrink-0">
        
        {/* KPI 1 */}
        <div className="bg-slate-900 border border-blue-500/20 rounded-xl p-3 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500/5 rounded-full blur-md pointer-events-none" />
          <span className="text-[8px] font-bold text-blue-450 uppercase tracking-wider block">Repeat Offenders</span>
          <strong className="text-sm font-mono font-black text-white mt-1 block">3,241</strong>
          <span className="text-[7px] text-slate-500 block mt-0.5">Drivers (3+ Violations)</span>
        </div>

        {/* KPI 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between shadow-lg">
          <span className="text-[8px] font-bold text-amber-400 uppercase tracking-wider block">3+ Violations</span>
          <strong className="text-sm font-mono font-black text-amber-500 mt-1 block">847</strong>
          <span className="text-[7px] text-slate-500 block mt-0.5">High-Frequency</span>
        </div>

        {/* KPI 3 */}
        <div className="bg-slate-900 border border-red-500/20 rounded-xl p-3 flex flex-col justify-between shadow-lg">
          <span className="text-[8px] font-bold text-red-400 uppercase tracking-wider block">Court-Referred</span>
          <strong className="text-sm font-mono font-black text-red-500 mt-1 block">124</strong>
          <span className="text-[7px] text-slate-500 block mt-0.5">Escalated Status</span>
        </div>

      </div>

      {/* Recurrence Chart */}
      <div className="glass-panel p-4.5 space-y-3 mb-4">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
          <BarChart3 className="w-4 h-4 text-blue-500" />
          <span>How Often Drivers Repeat Violations</span>
        </div>

        <div className="w-full h-48 font-mono text-[9px] mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={recurrenceData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" tickLine={false} />
              <YAxis stroke="#64748b" tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {recurrenceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Repeat Violation Types Table */}
      <div className="glass-panel p-4.5 space-y-3 mb-4">
        <div className="flex items-center gap-1.5">
          <RefreshCw className="w-4 h-4 text-blue-500 animate-spin-slow" />
          <h4 className="text-xs font-heading font-extrabold uppercase text-slate-800 dark:text-slate-300 tracking-wider">
            Top Repeat Violation Types
          </h4>
        </div>

        <div className="border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-[10px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-200 dark:border-white/5">
                <th className="py-2.5 px-3">Most Repeated Violation</th>
                <th className="py-2.5 px-2">Count</th>
                <th className="py-2.5 px-2">Avg Repeat Gap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 font-semibold">
              {repeatTypes.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-slate-700 dark:text-slate-300">
                  <td className="py-2.5 px-3 font-bold">{item.violation}</td>
                  <td className="py-2.5 px-2 font-mono text-slate-500">{item.count}</td>
                  <td className="py-2.5 px-2 font-mono text-blue-500 font-extrabold">{item.gap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demographic Profile Card */}
      <div className="glass-panel p-4.5 space-y-3 mb-4">
        <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-white/5">
          <Users className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-heading font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Repeat Offender Profile (Demo)
          </span>
        </div>

        <div className="space-y-2 text-[10px] font-bold">
          <div className="flex justify-between border-b border-slate-150 dark:border-white/5 pb-1">
            <span className="text-slate-550 dark:text-slate-400">Vehicle Type:</span>
            <span className="text-slate-800 dark:text-white">Two-Wheeler (68%)</span>
          </div>
          <div className="flex justify-between border-b border-slate-150 dark:border-white/5 pb-1">
            <span className="text-slate-550 dark:text-slate-400">Time Pattern:</span>
            <span className="text-slate-800 dark:text-white">Night Hours (62%)</span>
          </div>
          <div className="flex justify-between border-b border-slate-150 dark:border-white/5 pb-1">
            <span className="text-slate-550 dark:text-slate-400">Age Group:</span>
            <span className="text-slate-800 dark:text-white">18–30 Years (54%)</span>
          </div>
          <div className="flex justify-between pb-1">
            <span className="text-slate-550 dark:text-slate-400">Region:</span>
            <span className="text-slate-800 dark:text-white">Urban Core (71%)</span>
          </div>
        </div>
      </div>

      {/* AI Note Card */}
      <div className="bg-gradient-to-tr from-blue-500/5 to-blue-500/10 border border-blue-500/20 p-4.5 rounded-2xl space-y-2 shadow-xl glow-blue">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-500" />
          <h4 className="text-xs font-heading font-black text-blue-750 dark:text-blue-300 uppercase tracking-wider">
            🤖 AI Profile Analysis
          </h4>
        </div>
        <p className="text-[11px] text-slate-700 dark:text-slate-350 leading-relaxed font-semibold italic">
          "Night-hour two-wheeler riders show the highest repeat violation rate. Targeted awareness in this segment could reduce repeat offenses by an estimated 30%."
        </p>
      </div>

    </div>
  );
}
