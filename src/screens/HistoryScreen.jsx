import React, { useState } from 'react';
import { 
  Search, SlidersHorizontal, AlertTriangle, CheckCircle, 
  HelpCircle, ChevronDown, ChevronUp, Clock, ShieldCheck, 
  MapPin, ShieldAlert, BadgeInfo, Scale, Receipt, CreditCard, FileText
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function HistoryScreen() {
  const { challans, payChallan, disputeChallan, getChallanSummaryStats, isOffline, setActiveScreen } = useAppState();

  const [filter, setFilter] = useState('All'); // All, Paid, Pending, Disputed
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChallanId, setExpandedChallanId] = useState(null);
  
  // Receipt mock view state
  const [activeReceiptId, setActiveReceiptId] = useState(null);

  const stats = getChallanSummaryStats();

  const toggleExpand = (id) => {
    if (expandedChallanId === id) {
      setExpandedChallanId(null);
    } else {
      setExpandedChallanId(id);
    }
  };

  const getStatusColorClasses = (status) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 glow-green';
      case 'Pending': return 'bg-amber-500/10 border-amber-500/20 text-amber-400 glow-amber';
      case 'Disputed': return 'bg-red-500/10 border-red-500/20 text-red-400 glow-red';
      default: return 'bg-slate-500/10 border-slate-500/20 text-slate-400';
    }
  };

  const getViolationIcon = (name) => {
    switch (name) {
      case 'No Helmet':
      case 'Triple Riding':
        return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
      case 'Over-speeding':
      case 'Red Light Jump':
        return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case 'Wrong Parking':
        return <BadgeInfo className="w-5 h-5 text-blue-400" />;
      default:
        return <Scale className="w-5 h-5 text-slate-400" />;
    }
  };

  // Filters & searches computation
  const filteredChallans = challans.filter(c => {
    const matchesFilter = filter === 'All' || c.status === filter;
    const matchesSearch = 
      c.violation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.amount.toString().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  return (

    <div className="flex-1 flex flex-col p-4 pb-24 space-y-4 max-w-md mx-auto relative select-none">

      {/* Header and Filter Icon */}
      <div className="flex items-center justify-between py-1">
        <div className="space-y-0.5">
          <h2 className="text-xl font-heading font-extrabold text-slate-800 dark:text-white tracking-wide">
            My Challan History
          </h2>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            Linked to Sarathi & Vahan databases
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Export to Compliance Report */}
          <button
            onClick={() => setActiveScreen('exportReport')}
            id="history-export-btn"
            title="Export Compliance Report"
            className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 hover:bg-indigo-500/20 active:scale-95 transition-all"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 active:scale-95 transition-all">
            <SlidersHorizontal className="w-4 h-4 text-electric" />
          </button>
        </div>
      </div>

      {/* Filter pills bar */}
      <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none" id="history-filter-bar">
        {['All', 'Pending', 'Paid', 'Disputed'].map((status) => {
          const count = 
            status === 'All' ? challans.length :
            status === 'Pending' ? stats.pending :
            status === 'Paid' ? stats.paid : stats.disputed;

          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shrink-0 ${
                filter === status
                  ? 'bg-electric border-electric text-white shadow-md glow-electric'
                  : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              <span>{status}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[8px] ${
                filter === status ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-650" />
        <input
          type="text"
          placeholder="Search by date, violation, or fine amount..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}

          className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-650 focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none transition-all font-semibold"

          id="history-search-input"
        />
      </div>


      {/* Challan Summary Panel - inline style to prevent overlapping floating elements */}
      <div className="w-full" id="history-summary-stats-panel">
        <div className="bg-slate-100/50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-2xl py-3.5 px-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-350">
          <div className="flex flex-col text-center items-center flex-1">
            <span className="text-slate-500 dark:text-slate-400 text-[8px] font-semibold mb-0.5">Total Fines</span>
            <span className="text-slate-800 dark:text-white text-xs font-mono font-bold tabular-nums">₹{stats.totalFines.toLocaleString('en-IN')}</span>
          </div>
          <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10" />
          
          <div className="flex flex-col text-center items-center flex-1">
            <span className="text-emerald-600 dark:text-emerald-500/80 text-[8px] font-semibold mb-0.5">Paid</span>
            <span className="text-emerald-600 dark:text-emerald-450 text-xs font-mono font-bold tabular-nums">₹{stats.paidFines.toLocaleString('en-IN')}</span>
          </div>
          <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10" />
          
          <div className="flex flex-col text-center items-center flex-1">
            <span className="text-amber-600 dark:text-amber-500/80 text-[8px] font-semibold mb-0.5">Pending</span>
            <span className="text-amber-600 dark:text-amber-400 text-xs font-mono font-bold tabular-nums">₹{stats.pendingFines.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>


      {/* Offline Alert Strip inside History */}
      {isOffline && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2.5 rounded-xl flex items-center gap-2 text-[10px] font-medium leading-relaxed">
          <Clock className="w-3.5 h-3.5 animate-pulse shrink-0" />
          <span>Local network is simulated offline. Disputing or paying defaults to cached mode.</span>
        </div>
      )}

      {/* History List scroll view */}
      <div className="space-y-3" id="challans-history-list">
        {filteredChallans.length === 0 ? (
          <div className="text-center py-10 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl">
            <SlidersHorizontal className="w-8 h-8 text-slate-500 dark:text-slate-600 mx-auto mb-3" />
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">No Challans Found</span>
            <span className="block text-[10px] text-slate-600 dark:text-slate-500 mt-1 font-semibold">Try adapting search parameters or filters</span>
          </div>
        ) : (
          filteredChallans.map((challan) => {
            const isExpanded = expandedChallanId === challan.id;
            return (
              <div 
                key={challan.id} 
                className={`glass-panel border transition-all duration-300 ${
                  isExpanded ? 'border-electric bg-slate-100/80 dark:bg-white/10' : 'border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                {/* Main Card header */}
                <div 
                  onClick={() => toggleExpand(challan.id)}
                  className="p-3.5 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${
                      challan.status === 'Paid' ? 'bg-emerald-500/10 border-emerald-500/10' :
                      challan.status === 'Pending' ? 'bg-amber-500/10 border-amber-500/10' : 'bg-red-500/10 border-red-500/10'
                    }`}>
                      {getViolationIcon(challan.violation)}
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-slate-800 dark:text-white block leading-tight">{challan.violation}</span>
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
                        {challan.date} • {challan.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right space-y-1">
                      <span className="text-xs font-mono font-bold text-slate-800 dark:text-white block tabular-nums text-right">
                        ₹{challan.amount.toLocaleString('en-IN')}
                      </span>
                      <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block ${getStatusColorClasses(challan.status)}`}>
                        {challan.status}
                      </span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </div>
                </div>

                {/* Expanded Details body */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1.5 border-t border-slate-100 dark:border-white/5 space-y-3.5 text-[10px] text-slate-700 dark:text-slate-300 animate-slide-up">
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block uppercase font-bold text-[8px]">Legal Section</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{challan.section}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-slate-400 block uppercase font-bold text-[8px]">Officer Badge</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{challan.officerId}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-500 dark:text-slate-400 block uppercase font-bold text-[8px]">Deadline Status</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{challan.deadline}</span>
                      </div>
                    </div>

                    {/* Receipt mock view toggle panel */}
                    {activeReceiptId === challan.id && (
                      <div className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-xl p-3.5 space-y-2 font-mono text-[9px] text-slate-700 dark:text-slate-300 animate-fade-in relative">
                        <div className="absolute top-3 right-3 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-[8px] border border-emerald-500/20 px-2 py-0.5 rounded">
                          VERIFIED
                        </div>
                        <span className="block text-[10px] font-bold text-center border-b border-slate-200 dark:border-white/10 pb-1.5 uppercase text-slate-800 dark:text-slate-200 tracking-wider">
                          Official E-Receipt
                        </span>
                        <div className="space-y-1">
                          <div className="flex justify-between"><span>RECEIPT NO:</span><span>REC-2025-{challan.id.toUpperCase()}</span></div>
                          <div className="flex justify-between"><span>DATE PAID:</span><span>{challan.deadline.replace('Paid on ', '')}</span></div>
                          <div className="flex justify-between"><span>TXN STATUS:</span><span className="text-emerald-600 dark:text-emerald-400 font-bold">SUCCESS</span></div>
                          <div className="flex justify-between"><span>GATEWAY:</span><span>PARIVAHAN_PG_NET</span></div>
                          <div className="flex justify-between border-t border-slate-200 dark:border-white/10 pt-1.5 font-bold text-slate-800 dark:text-slate-200">
                            <span>TOTAL AMOUNT:</span><span>₹{challan.amount.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dynamic Action Buttons */}
                    <div className="flex gap-2 pt-1">
                      {challan.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => payChallan(challan.id)}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-lg shadow-emerald-500/10"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Pay Challan</span>
                          </button>
                          
                          <button
                            onClick={() => disputeChallan(challan.id)}
                            className="flex-1 bg-red-50/20 dark:bg-red-950/20 border border-red-200 dark:border-red-500/35 hover:bg-red-100 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 font-bold py-2 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                          >
                            <Scale className="w-3.5 h-3.5" />
                            <span>File Dispute</span>
                          </button>
                        </>
                      )}

                      {challan.status === 'Paid' && (
                        <button
                          onClick={() => setActiveReceiptId(activeReceiptId === challan.id ? null : challan.id)}
                          className="w-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/15 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 text-center"
                        >
                          <Receipt className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                          <span>{activeReceiptId === challan.id ? "Hide Payment Receipt" : "View Payment Receipt"}</span>
                        </button>
                      )}

                      {challan.status === 'Disputed' && (
                        <div className="w-full bg-red-500/5 border border-red-500/15 py-2.5 px-3 rounded-xl font-semibold text-red-500 dark:text-red-400 text-center uppercase tracking-wide flex items-center justify-center gap-1.5">
                          <Scale className="w-4 h-4 animate-pulse" />
                          <span>Magistrate Hearing In Progress</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>


    </div>
  );
}
