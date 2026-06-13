import React, { useState } from 'react';
import { 
  ArrowLeft, Settings, ShieldAlert, Scale, RefreshCw, CheckCircle, 
  AlertTriangle, Database, Bot, Clock, Users, Cpu, FileText, Check, Server
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function AdminMonitoringScreen() {
  const { setActiveScreen } = useAppState();

  const [selectedState, setSelectedState] = useState('Karnataka');
  const [editingKey, setEditingKey] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  // Simulated State Rules database
  const [stateRules, setStateRules] = useState({
    Karnataka: {
      helmet: 1000,
      speeding: 1000,
      insurance: 2000,
      mobile: 1500,
      updated: '15 May 2025'
    },
    Goa: {
      helmet: 500,
      speeding: 1000,
      insurance: 2000,
      mobile: 1500,
      updated: '10 May 2025'
    },
    Maharashtra: {
      helmet: 500,
      speeding: 1000,
      insurance: 2000,
      mobile: 1000,
      updated: '03 Apr 2025'
    },
    Delhi: {
      helmet: 1000,
      speeding: 2000,
      insurance: 2000,
      mobile: 5000,
      updated: '29 May 2025'
    }
  });

  const [syncLoading, setSyncLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleEditClick = (key, val) => {
    setEditingKey(key);
    setEditValue(val.toString());
  };

  const handleSaveInline = (key) => {
    const numeric = parseInt(editValue, 10);
    if (!isNaN(numeric)) {
      setStateRules(prev => ({
        ...prev,
        [selectedState]: {
          ...prev[selectedState],
          [key]: numeric,
          updated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        }
      }));
      setEditingKey(null);
      showToast(`${key.toUpperCase()} fine updated to ₹${numeric.toLocaleString('en-IN')}`);
    } else {
      showToast("Invalid numeric value entered");
    }
  };

  const handleResetToDefault = () => {
    setStateRules(prev => ({
      ...prev,
      [selectedState]: {
        helmet: 1000,
        speeding: 1000,
        insurance: 2000,
        mobile: 1500,
        updated: '15 May 2025 (Reset)'
      }
    }));
    showToast(`Reset ${selectedState} rules back to system RTO defaults`);
  };

  const handleSyncAll = () => {
    setSyncLoading(true);
    setTimeout(() => {
      setSyncLoading(false);
      showToast("All regional rule databases synchronized successfully!");
    }, 2000);
  };

  const activeRules = stateRules[selectedState] || stateRules['Karnataka'];

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto relative overflow-hidden select-none bg-slate-900/10 dark:bg-navy-950/20 text-slate-800 dark:text-slate-100 animate-fade-in">
      
      {/* Header */}
      <div className="py-2 border-b border-slate-200 dark:border-white/5 mb-4">
        <h2 className="text-xl font-heading font-black text-slate-800 dark:text-white tracking-wide">
          System Administration
        </h2>
        <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-widest block">
          Manage challan database and regional rules
        </span>
      </div>

      {/* Section 1 - Regional Rules Manager */}
      <div className="glass-panel p-4.5 space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
            <Scale className="w-4 h-4 text-amber-500" />
            <span>Regional Rules Manager</span>
          </div>
          
          {/* State selector dropdown */}
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setEditingKey(null);
            }}
            className="bg-slate-100 dark:bg-navy-900 border border-slate-250 dark:border-white/10 rounded-xl py-1 px-2.5 text-[10px] text-slate-800 dark:text-white focus:border-amber-500 focus:outline-none font-bold"
          >
            <option value="Karnataka">Karnataka State</option>
            <option value="Goa">Goa State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi NCT</option>
          </select>
        </div>

        <div className="bg-slate-950/20 border border-slate-200 dark:border-white/5 rounded-xl p-3.5 space-y-3">
          <span className="block text-[8px] font-extrabold tracking-widest text-slate-400 uppercase">
            {selectedState} — Active Rules
          </span>

          <div className="space-y-3 font-semibold text-[10px]">
            {/* Rule item 1 */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
              <span className="text-slate-650 dark:text-slate-350">No Helmet Fine:</span>
              <div className="flex items-center gap-2">
                {editingKey === 'helmet' ? (
                  <div className="flex items-center gap-1">
                    <span className="text-slate-450">₹</span>
                    <input 
                      type="text" 
                      value={editValue} 
                      onChange={(e) => setEditValue(e.target.value)} 
                      className="w-16 bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30 focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <button onClick={() => handleSaveInline('helmet')} className="p-1 rounded bg-amber-500 text-slate-950 hover:bg-amber-600"><Check className="w-3 h-3" /></button>
                  </div>
                ) : (
                  <>
                    <strong className="text-slate-800 dark:text-white font-mono">₹{activeRules.helmet.toLocaleString('en-IN')}</strong>
                    <button onClick={() => handleEditClick('helmet', activeRules.helmet)} className="text-[8px] font-extrabold text-amber-500 hover:text-amber-600 border border-amber-500/25 px-1.5 py-0.2 rounded">Edit</button>
                  </>
                )}
              </div>
            </div>

            {/* Rule item 2 */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
              <span className="text-slate-650 dark:text-slate-350">Over-Speeding Fine:</span>
              <div className="flex items-center gap-2">
                {editingKey === 'speeding' ? (
                  <div className="flex items-center gap-1">
                    <span className="text-slate-450">₹</span>
                    <input 
                      type="text" 
                      value={editValue} 
                      onChange={(e) => setEditValue(e.target.value)} 
                      className="w-16 bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30 focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <button onClick={() => handleSaveInline('speeding')} className="p-1 rounded bg-amber-500 text-slate-950 hover:bg-amber-600"><Check className="w-3 h-3" /></button>
                  </div>
                ) : (
                  <>
                    <strong className="text-slate-800 dark:text-white font-mono">₹{activeRules.speeding.toLocaleString('en-IN')}</strong>
                    <button onClick={() => handleEditClick('speeding', activeRules.speeding)} className="text-[8px] font-extrabold text-amber-500 hover:text-amber-600 border border-amber-500/25 px-1.5 py-0.2 rounded">Edit</button>
                  </>
                )}
              </div>
            </div>

            {/* Rule item 3 */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
              <span className="text-slate-650 dark:text-slate-350">Insurance Fine:</span>
              <div className="flex items-center gap-2">
                {editingKey === 'insurance' ? (
                  <div className="flex items-center gap-1">
                    <span className="text-slate-450">₹</span>
                    <input 
                      type="text" 
                      value={editValue} 
                      onChange={(e) => setEditValue(e.target.value)} 
                      className="w-16 bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30 focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <button onClick={() => handleSaveInline('insurance')} className="p-1 rounded bg-amber-500 text-slate-950 hover:bg-amber-600"><Check className="w-3 h-3" /></button>
                  </div>
                ) : (
                  <>
                    <strong className="text-slate-800 dark:text-white font-mono">₹{activeRules.insurance.toLocaleString('en-IN')}</strong>
                    <button onClick={() => handleEditClick('insurance', activeRules.insurance)} className="text-[8px] font-extrabold text-amber-500 hover:text-amber-600 border border-amber-500/25 px-1.5 py-0.2 rounded">Edit</button>
                  </>
                )}
              </div>
            </div>

            {/* Rule item 4 */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
              <span className="text-slate-650 dark:text-slate-350">Mobile Fine:</span>
              <div className="flex items-center gap-2">
                {editingKey === 'mobile' ? (
                  <div className="flex items-center gap-1">
                    <span className="text-slate-450">₹</span>
                    <input 
                      type="text" 
                      value={editValue} 
                      onChange={(e) => setEditValue(e.target.value)} 
                      className="w-16 bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30 focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <button onClick={() => handleSaveInline('mobile')} className="p-1 rounded bg-amber-500 text-slate-950 hover:bg-amber-600"><Check className="w-3 h-3" /></button>
                  </div>
                ) : (
                  <>
                    <strong className="text-slate-800 dark:text-white font-mono">₹{activeRules.mobile.toLocaleString('en-IN')}</strong>
                    <button onClick={() => handleEditClick('mobile', activeRules.mobile)} className="text-[8px] font-extrabold text-amber-500 hover:text-amber-600 border border-amber-500/25 px-1.5 py-0.2 rounded">Edit</button>
                  </>
                )}
              </div>
            </div>

            {/* Last updated timestamp */}
            <div className="flex justify-between items-center text-[8px] text-slate-500 pt-1.5 leading-none">
              <span>Last Updated: {activeRules.updated}</span>
            </div>
          </div>
        </div>

        {/* Global Rules Action buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => showToast("Simulating saving configuration... Done! ✅")}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all active:scale-[0.98]"
          >
            Save Changes
          </button>
          
          <button
            onClick={handleResetToDefault}
            className="border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-white/5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all active:scale-[0.98]"
          >
            Reset to Default
          </button>
        </div>
      </div>

      {/* Section 2 - Cache & Data Sync Status */}
      <div className="glass-panel p-4.5 space-y-3 mb-4">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
          <Database className="w-4 h-4 text-amber-500" />
          <span>Data Sync & Cache Status</span>
        </div>

        <div className="border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden text-[9px] font-bold">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-white/5 text-slate-500 uppercase tracking-wider border-b border-slate-250 dark:border-white/5">
                <th className="py-2 px-3">Data Repository</th>
                <th className="py-2 px-2">Sync Status</th>
                <th className="py-2 px-2 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-2 px-3">Karnataka Rules</td>
                <td className="py-2 px-2 text-emerald-500">✅ Synced</td>
                <td className="py-2 px-2 text-right text-slate-500">15 May</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Bengaluru Zones</td>
                <td className="py-2 px-2 text-emerald-500">✅ Synced</td>
                <td className="py-2 px-2 text-right text-slate-500">20 May</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Goa Rules</td>
                <td className="py-2 px-2 text-emerald-500">✅ Synced</td>
                <td className="py-2 px-2 text-right text-slate-500">10 May</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Maharashtra Rules</td>
                <td className="py-2 px-2 text-amber-500">⚠️ Outdated</td>
                <td className="py-2 px-2 text-right text-slate-500 font-mono text-amber-500">03 Apr</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Delhi Rules</td>
                <td className="py-2 px-2 text-red-500">❌ Not Cached</td>
                <td className="py-2 px-2 text-right text-slate-500">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleSyncAll}
            className="bg-slate-900 border border-slate-800 hover:border-amber-500/20 text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-500 ${syncLoading ? 'animate-spin' : ''}`} />
            <span>Sync All Regions</span>
          </button>
          
          <button
            onClick={() => showToast("Cache cleared. Force refreshing data... Done! ✅")}
            className="border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-white/5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all active:scale-[0.98]"
          >
            Force Refresh
          </button>
        </div>
      </div>

      {/* Section 3 - System Health Monitor */}
      <div className="glass-panel p-4.5 space-y-3.5">
        <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200 dark:border-white/5">
          <Cpu className="w-4.5 h-4.5 text-amber-500" />
          <span className="text-xs font-heading font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Live System Health Metrics
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3.5 text-[9px] font-extrabold">
          
          <div className="p-3 bg-slate-950/20 border border-slate-200 dark:border-white/5 rounded-2xl space-y-1">
            <span className="text-slate-500 uppercase">API Gateway:</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-emerald-500 font-mono">OPERATIONAL</strong>
            </div>
          </div>

          <div className="p-3 bg-slate-950/20 border border-slate-200 dark:border-white/5 rounded-2xl space-y-1">
            <span className="text-slate-500 uppercase">RTO Database:</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-emerald-500 font-mono">CONNECTED</strong>
            </div>
          </div>

          <div className="p-3 bg-slate-950/20 border border-slate-200 dark:border-white/5 rounded-2xl space-y-1">
            <span className="text-slate-500 uppercase">OCR Challan Scanner:</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-emerald-500 font-mono">ACTIVE SERVICE</strong>
            </div>
          </div>

          <div className="p-3 bg-slate-950/20 border border-slate-200 dark:border-white/5 rounded-2xl space-y-1">
            <span className="text-slate-500 uppercase">AI Advisory Agent:</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-emerald-500 font-mono">RUNNING</strong>
            </div>
          </div>

        </div>

        {/* System parameters footer */}
        <div className="bg-slate-950/20 p-3 rounded-2xl border border-slate-200 dark:border-white/5 space-y-1.5 text-[9px] font-bold text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex justify-between">
            <span>Last Daily Backup:</span>
            <span className="text-slate-800 dark:text-white">27 May, 2:00 AM</span>
          </div>
          <div className="flex justify-between">
            <span>Active Connections:</span>
            <span className="text-emerald-500">1,247 Users Today</span>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 border border-slate-700 text-white font-bold text-xs py-3 px-6 rounded-2xl shadow-xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-amber-500" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
