import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Shield, Sparkles, Scale, Info, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';
import { useAppState } from '../context/AppStateContext';

// Import datasets
import violationsGlobal from '../data/violations-global.json';
import exchangeRates from '../data/exchangeRates.json';

export default function CountryComparisonScreen() {
  const { countries, currencySymbol } = useGlobalContext();
  const { setActiveScreen } = useAppState();

  const violationList = [
    { id: "No Helmet", label: "No Helmet" },
    { id: "Over-speeding", label: "Over-speeding" },
    { id: "No Insurance", label: "No Insurance" },
    { id: "Mobile While Driving", label: "Mobile While Driving" },
    { id: "Drunk Driving", label: "Drunk Driving" }
  ];

  const [activeViolation, setActiveViolation] = useState("No Helmet");

  // Fetch violation matrix
  const violationData = violationsGlobal[activeViolation] || {};

  // Formulate data for the strictness bar chart (INR conversions)
  const chartData = Object.keys(violationData).map(countryId => {
    const cInfo = countries.find(c => c.id === countryId) || {};
    const metrics = violationData[countryId];
    
    // Convert to INR equivalent for absolute baseline comparison
    // Fine amount / exchange rate to get INR: fine is in local currency.
    // In exchangeRates.json, base is INR. rates show (Local / INR).
    // So: Local Fine / rate = INR Fine. (e.g. UAE fine is 500. rate is 0.044. 500 / 0.044 = ~11,363)
    const rate = exchangeRates.rates[cInfo.currency] || 1.0;
    const inrValue = Math.round(metrics.fine / rate);

    return {
      id: countryId,
      name: cInfo.name,
      flag: cInfo.flag,
      localFine: `${cInfo.currencySymbol}${metrics.fine.toLocaleString()}`,
      inrValue: inrValue,
      color: cInfo.color || '#3b82f6'
    };
  }).sort((a, b) => b.inrValue - a.inrValue); // Sort highest first for strictness ranking

  // Static AI Insights per violation category
  const aiInsights = {
    "No Helmet": {
      summary: "Australia enforces the absolute highest fine for riding without a helmet at A$287 (~₹15,900), followed closely by California, USA at $250. Germany represents the lowest enforcement at €15 (~₹1,350) because helmet rules are primarily advisory for light vehicles. The UAE stands out by adding 4 black points to your driving record, which can trigger suspension after accumulating 24 points.",
      strict: "Australia",
      loose: "Germany",
      uniq: "UAE (Black Points system)"
    },
    "Over-speeding": {
      summary: "The UAE represents extremely strict automated speed enforcement, starting at AED 600 (~₹13,600) and reaching up to AED 3,000 for extreme violations. They are also unique in impounding vehicles for up to 30 days. In contrast, Germany's highway systems (Autobahn) have no speed limit, but urban speeding carries a mild €70 baseline fine. The UK enforces a mandatory minimum of 3 license points on any speeding ticket.",
      strict: "UAE (Dubai)",
      loose: "Germany",
      uniq: "UK (Mandatory License Points)"
    },
    "No Insurance": {
      summary: "Driving without compulsory third-party insurance carries high criminal consequences in Europe and Australia. Germany has a zero-tolerance policy where uninsured driving is a criminal offense under PflVG S.6 carrying up to 1 year of imprisonment. The UK enforces S.143 S-seizure of the vehicle on-spot. UAE and India utilize heavy RTO portal blocklists, preventing any ownership transfer until compliance is met.",
      strict: "Germany",
      loose: "USA",
      uniq: "UK (Immediate Vehicle Seizure)"
    },
    "Mobile While Driving": {
      summary: "Distracted driving has become a high-priority enforcement zone globally. The UK and Australia levy severe demerits: 6 license points in the UK (which immediately revokes a new driver's license) and 5 demerit points in NSW, Australia. The UAE charges AED 800 (~₹18,200) plus 4 points. India is catching up by classifying mobile usage as dangerous driving under S.184 with spot fines up to ₹1,500.",
      strict: "UK",
      loose: "USA (California)",
      uniq: "Australia (5 Demerit Points)"
    },
    "Drunk Driving": {
      summary: "The UAE operates under a absolute zero-tolerance standard (0.00% BAC) where any amount of alcohol is a criminal offense leading to immediate license cancellation and court trials. India's BAC threshold is 0.03% (S.185) with a ₹10,000 fine. The UK and USA allow up to 0.08% BAC, but enforce massive financial penalties and mandatory interlock installation on conviction.",
      strict: "UAE (0.00% BAC)",
      loose: "USA (0.08% BAC)",
      uniq: "USA (Mandatory Ignition Interlock)"
    }
  }[activeViolation];

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 space-y-5 max-w-md lg:max-w-4xl mx-auto w-full animate-fade-in select-none">
      
      {/* HEADER */}
      <div className="text-center space-y-2 mt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-[10px] font-extrabold uppercase tracking-widest text-indigo-500 leading-none">
          <ArrowLeftRight className="w-3 h-3" />
          <span>Global Benchmarks</span>
        </div>
        <h1 className="text-2xl xs:text-3xl font-heading font-black text-slate-850 dark:text-white leading-tight">
          Global Fine Comparison
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-md mx-auto">
          See how the same traffic violation is penalized and regulated across major global jurisdictions.
        </p>
      </div>

      {/* VIOLATION SELECTOR TABS */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
        {violationList.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveViolation(v.id)}
            className={`px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all shrink-0 snap-center border ${
              activeViolation === v.id
                ? 'bg-electric border-electric text-white shadow-lg shadow-electric/25'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5 text-slate-500 hover:border-slate-350'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* COMPARISON DATA TABLE */}
      <div className="glass-panel p-1 overflow-hidden shadow-lg border-slate-200 dark:border-white/5">
        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left border-collapse text-[10px] font-bold">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[8px] bg-slate-50 dark:bg-slate-950/20">
                <th className="py-3 px-4 font-black">Country</th>
                <th className="py-3 px-4 font-black">Fine (Local)</th>
                <th className="py-3 px-4 font-black">INR Equivalent</th>
                <th className="py-3 px-4 font-black">Legal Basis</th>
                <th className="py-3 px-4 font-black">Black Points</th>
                <th className="py-3 px-4 font-black">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              {countries.map((c) => {
                const metrics = violationData[c.id] || { fine: 0, section: 'N/A', points: 'None', severity: 'LOW' };
                const rate = exchangeRates.rates[c.currency] || 1.0;
                const inrVal = Math.round(metrics.fine / rate);
                
                // Colors mapped dynamically for row highlights
                const isSeverityHigh = metrics.severity === 'HIGH';
                const isSeverityMedium = metrics.severity === 'MEDIUM';

                return (
                  <tr 
                    key={c.id}
                    className="hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all duration-150 group"
                  >
                    {/* Country flag and name */}
                    <td className="py-3.5 px-4 flex items-center gap-2">
                      <span className="text-lg filter drop-shadow-sm group-hover:scale-110 transition-transform duration-200">
                        {c.flag}
                      </span>
                      <span className="font-extrabold text-slate-800 dark:text-white uppercase">
                        {c.name}
                      </span>
                    </td>
                    
                    {/* Local fine */}
                    <td className="py-3.5 px-4 font-mono font-black text-slate-800 dark:text-white">
                      {c.currencySymbol} {metrics.fine.toLocaleString()}
                    </td>

                    {/* INR equivalent */}
                    <td className="py-3.5 px-4 font-mono text-slate-450 dark:text-slate-450">
                      ₹{inrVal.toLocaleString()}
                    </td>

                    {/* Legal act */}
                    <td className="py-3.5 px-4 uppercase text-[9px] tracking-wide text-slate-500 dark:text-slate-450 max-w-[150px] truncate" title={metrics.section}>
                      {metrics.section}
                    </td>

                    {/* License points */}
                    <td className="py-3.5 px-4">
                      {metrics.points !== 'None' ? (
                        <span className="bg-red-500/10 dark:bg-red-500/5 border border-red-500/25 text-red-500 text-[8px] font-black uppercase px-2 py-0.5 rounded-full">
                          {metrics.points}
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-650">—</span>
                      )}
                    </td>

                    {/* Severity badge */}
                    <td className="py-3.5 px-4">
                      <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded-md ${
                        isSeverityHigh 
                          ? 'bg-red-500/10 border border-red-500/20 text-red-500' 
                          : isSeverityMedium 
                          ? 'bg-amber-500/10 border border-amber-500/20 text-amber-500' 
                          : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500'
                      }`}>
                        {metrics.severity}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* STRICTNESS BAR CHART */}
      <div className="glass-panel p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-electric" />
            <h4 className="text-xs font-heading font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Strictness Benchmark (INR Equivalent)
            </h4>
          </div>
          <span className="text-[7.5px] bg-electric/15 text-electric px-2 py-0.5 rounded-md font-extrabold uppercase tracking-wide">
            baseline index
          </span>
        </div>

        <div className="h-[200px] w-full text-[9px] font-extrabold text-slate-500 font-mono">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke="currentColor" 
                fontSize={8} 
                tickLine={false} 
                axisLine={false}
                width={70}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 border border-slate-800 text-white p-2.5 rounded-xl font-mono text-[9px] space-y-1 shadow-xl">
                        <span className="block font-black">{data.flag} {data.name}</span>
                        <span className="block text-slate-400">Local: {data.localFine}</span>
                        <span className="block text-electric-glow font-bold">INR Equiv: ₹{data.inrValue.toLocaleString()}</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="inrValue" radius={[0, 8, 8, 0]} barSize={10}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI GLOBAL INSIGHT CARD */}
      <div className="bg-gradient-to-r from-electric/5 to-indigo-500/5 border border-electric/25 p-5 rounded-[2rem] space-y-3 relative overflow-hidden text-left shadow-inner">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-electric/10 to-transparent rounded-full blur-lg pointer-events-none" />
        
        <div className="flex items-center gap-2">
          <div className="bg-electric p-2 rounded-xl text-white">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <span className="text-[10px] text-electric font-black uppercase tracking-wider block font-sans">
            AI Penalty Intelligence
          </span>
        </div>

        <p className="text-xs text-slate-650 dark:text-slate-300 font-semibold leading-relaxed">
          {aiInsights.summary}
        </p>

        <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-200/50 dark:border-white/5 text-[9px] font-extrabold uppercase">
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 p-2 rounded-xl text-red-500">
            <span className="block text-slate-450 uppercase text-[7px] mb-0.5">Strictest</span>
            <span>{aiInsights.strict}</span>
          </div>
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 p-2 rounded-xl text-emerald-500">
            <span className="block text-slate-450 uppercase text-[7px] mb-0.5">Least Penalty</span>
            <span>{aiInsights.loose}</span>
          </div>
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 p-2 rounded-xl text-electric">
            <span className="block text-slate-450 uppercase text-[7px] mb-0.5">Unique Aspect</span>
            <span>{aiInsights.uniq}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
