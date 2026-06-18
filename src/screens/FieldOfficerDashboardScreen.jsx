import React, { useState } from 'react';
import { 
  MapPin, Eye, RefreshCw, FileText, CheckCircle, XCircle, Plus, Clock, 
  ArrowUpRight, Lock, Scale, ShieldAlert, Edit, Save, Search, Camera, 
  BookOpen, AlertCircle, ShieldCheck, TrendingUp, Users, ClipboardList
} from 'lucide-react';

export default function FieldOfficerDashboardScreen({ subView }) {
  // Live Zone States
  const [cameras, setCameras] = useState([
    { id: 'cam1', location: 'Silk Board Junction CCTV', type: 'Speed & Line', status: 'ACTIVE' },
    { id: 'cam2', location: 'Outer Ring Road Speed Radar', type: 'Velocity Doppler', status: 'ACTIVE' },
    { id: 'cam3', location: 'Koramangala 80ft Rd ANPR', type: 'Plate Scanner', status: 'ACTIVE' },
    { id: 'cam4', location: 'HSR Layout Sector 1 Dome', type: 'Red Light Detector', status: 'INACTIVE' },
  ]);

  const toggleCamera = (id) => {
    setCameras(prev => prev.map(cam => {
      if (cam.id === id) {
        return { ...cam, status: cam.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' };
      }
      return cam;
    }));
  };

  const [handoverNote, setHandoverNote] = useState(
    'HSR Layout speed radar cam-4 Dome is currently reporting packet loss. Technicians scheduled for repair at 14:00. Watch out for increased over-speeding cases on Sector 1 slip roads.'
  );
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteSaveStatus, setNoteSaveStatus] = useState('');

  const saveHandoverNote = (e) => {
    e.preventDefault();
    setIsSavingNote(true);
    setTimeout(() => {
      setIsSavingNote(false);
      setNoteSaveStatus('Note Saved Successfully!');
      setTimeout(() => setNoteSaveStatus(''), 2500);
    }, 800);
  };

  // Issuance Log States
  const [issuanceLogs, setIssuanceLogs] = useState([
    { id: 'CH-2025-9812', plate: 'KA01AB1234', violation: 'Over-Speeding', amount: 1500, time: '10:15 AM', status: 'Issued' },
    { id: 'CH-2025-9781', plate: 'KA03CD5678', violation: 'No Helmet', amount: 1000, time: '09:42 AM', status: 'Paid' },
    { id: 'CH-2025-9764', plate: 'MH12PQ9081', violation: 'Wrong Parking', amount: 500, time: '08:20 AM', status: 'Disputed' },
    { id: 'CH-2025-9730', plate: 'DL01CA1102', violation: 'Red Light Jump', amount: 1000, time: 'Yesterday', status: 'Escalated' },
    { id: 'CH-2025-9699', plate: 'KA51MB8819', violation: 'Over-Speeding', amount: 1500, time: 'Yesterday', status: 'Paid' },
  ]);

  const [filterType, setFilterType] = useState('All'); // All, Speeding, Helmet, Parking, Signal
  const [filterStatus, setFilterStatus] = useState('All'); // All, Issued, Paid, Disputed, Escalated

  const filteredLogs = issuanceLogs.filter(log => {
    const typeMatch = filterType === 'All' || 
      (filterType === 'Speeding' && log.violation === 'Over-Speeding') ||
      (filterType === 'Helmet' && log.violation === 'No Helmet') ||
      (filterType === 'Parking' && log.violation === 'Wrong Parking') ||
      (filterType === 'Signal' && log.violation === 'Red Light Jump');

    const statusMatch = filterStatus === 'All' || log.status === filterStatus;

    return typeMatch && statusMatch;
  });

  // Watchlist States
  const [watchlistQuery, setWatchlistQuery] = useState('');
  const [watchlist, setWatchlist] = useState([
    { plate: 'KA03CD5678', violationsCount: 5, commonViolation: 'Over-Speeding', risk: 'CRITICAL' },
    { plate: 'DL01CA1102', violationsCount: 4, commonViolation: 'Red Light Jump', risk: 'HIGH' },
    { plate: 'MH12PQ9081', violationsCount: 3, commonViolation: 'Wrong Parking', risk: 'MODERATE' },
    { plate: 'KA51MB8819', violationsCount: 3, commonViolation: 'No Helmet', risk: 'MODERATE' },
  ]);

  // Disputes states
  const [disputes, setDisputes] = useState([
    { id: 'CH-2025-9764', plate: 'MH12PQ9081', violation: 'Wrong Parking', amount: 500, reason: 'The parking permission sign was obstructed by a municipal tree branch.', decision: 'Pending' },
    { id: 'CH-2025-9705', plate: 'KA03XY9999', violation: 'Red Light Jump', amount: 1000, reason: 'Yielding way to an approaching cardiac ambulance vehicle.', decision: 'Pending' },
  ]);

  const handleDisputeAction = (id, action) => {
    setDisputes(prev => prev.map(disp => {
      if (disp.id === id) {
        return { ...disp, decision: action === 'approve' ? 'Approved (Dismissed)' : 'Rejected (Upheld)' };
      }
      return disp;
    }));
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto w-full select-none bg-transparent text-slate-100 animate-fade-in">
      
      {/* 🚨 LIVE PATROL ZONE VIEW */}
      {subView === 'zone' && (
        <div className="space-y-4">
          {/* Zone Branding Header */}
          <div className="py-2 border-b border-purple-900/20 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-heading font-black text-white tracking-widest uppercase">
                Zone 4 Operations
              </h3>
              <span className="text-[9px] text-purple-400 font-extrabold tracking-wider uppercase block">
                Bengaluru South Beat • Live Console
              </span>
            </div>
            <div className="flex items-center gap-1 text-[8.5px] bg-purple-500/10 border border-purple-500/25 px-2 py-0.5 rounded font-black text-purple-400 uppercase">
              <MapPin className="w-2.5 h-2.5" /> GPS Active
            </div>
          </div>

          {/* Real-time Zone Overview metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-panel p-3.5 space-y-1 border border-purple-900/10 text-left">
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Today's Challans in Zone</span>
              <strong className="text-xl font-mono font-black text-purple-400 block">47</strong>
              <span className="text-[7.5px] text-emerald-500 font-semibold block flex items-center gap-0.5">
                +12% vs yesterday
              </span>
            </div>
            <div className="glass-panel p-3.5 space-y-1 border border-purple-900/10 text-left">
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Active Patrol Cameras</span>
              <strong className="text-xl font-mono font-black text-purple-400 block">
                {cameras.filter(c => c.status === 'ACTIVE').length} / {cameras.length}
              </strong>
              <span className="text-[7.5px] text-slate-400 font-semibold block">1 Camera offline</span>
            </div>
          </div>

          {/* Active Hotspots list */}
          <div className="glass-panel p-4 space-y-3.5">
            <div className="flex items-center justify-between border-b border-purple-900/10 pb-2">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-350 block flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                Active Violation Hotspots
              </span>
              <span className="text-[8px] bg-red-500/15 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded font-extrabold uppercase">High Alerts</span>
            </div>

            <div className="space-y-2.5 text-left text-[10px] font-semibold">
              {[
                { name: 'Silk Board Junction', count: 18, type: 'Speeding' },
                { name: 'Outer Ring Road (Sector 1)', count: 12, type: 'Helmet infractions' },
                { name: 'Koramangala 80ft Rd', count: 8, type: 'Wrong Parking' }
              ].map((spot, index) => (
                <div key={index} className="flex justify-between items-center bg-[#16161a] p-2.5 rounded-xl border border-purple-900/5 hover:border-purple-900/25 transition-all">
                  <div className="space-y-0.5">
                    <span className="block text-slate-200">{spot.name}</span>
                    <span className="block text-[8px] text-slate-500 uppercase">{spot.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-mono font-black text-red-400">{spot.count}</span>
                    <span className="text-[8px] text-slate-450 uppercase">Today</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Camera Toggles */}
          <div className="glass-panel p-4 space-y-3">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-350 block flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-purple-400" />
              Camera Feed Switcher
            </span>
            <div className="space-y-2 text-left text-[10px] font-semibold">
              {cameras.map((cam) => (
                <div key={cam.id} className="flex justify-between items-center bg-[#16161a] p-2.5 rounded-xl border border-purple-900/5">
                  <div className="space-y-0.5">
                    <span className="block text-slate-200">{cam.location}</span>
                    <span className="block text-[8px] text-slate-500 uppercase">{cam.type}</span>
                  </div>
                  <button
                    onClick={() => toggleCamera(cam.id)}
                    className={`text-[8.5px] font-extrabold px-3 py-1 rounded transition-all uppercase tracking-wider flex items-center gap-1 border ${
                      cam.status === 'ACTIVE' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-450 shadow-sm shadow-emerald-500/10' 
                        : 'bg-red-500/10 border-red-500/20 text-red-400 shadow-sm shadow-red-500/10'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${cam.status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                    <span>{cam.status}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Zone Performance Metrics */}
          <div className="glass-panel p-4 space-y-3">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-350 block flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              Zone Performance vs City Average
            </span>
            
            <div className="space-y-2 text-left text-[10px] font-bold">
              {[
                { label: 'Challans Issued', zone: '47', city: '32', status: '+46% Volume', positive: false },
                { label: 'Collection Rate', zone: '91%', city: '82%', status: '+11% Performance', positive: true },
                { label: 'Repeat Offense Rate', zone: '14%', city: '22%', status: '-36% Improvement', positive: true }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#16161a] p-3 rounded-xl border border-purple-900/5 space-y-1.5">
                  <div className="flex justify-between items-center text-slate-200">
                    <span>{item.label}</span>
                    <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                      item.positive 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex justify-between font-mono text-[9px] text-slate-400">
                    <span>Zone: <strong className="text-white">{item.zone}</strong></span>
                    <span>City Avg: <strong>{item.city}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shift Handover Notes */}
          <div className="glass-panel p-4 space-y-3">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-350 block flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5 text-purple-400" />
              Active Shift Handover Notes
            </span>
            <form onSubmit={saveHandoverNote} className="space-y-3">
              <textarea
                value={handoverNote}
                onChange={(e) => setHandoverNote(e.target.value)}
                className="w-full h-24 bg-[#16161a] border border-purple-900/20 rounded-xl p-3 text-[10px] text-slate-300 font-semibold focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none leading-relaxed transition-all resize-none"
              />
              <div className="flex justify-between items-center">
                <span className="text-[8.5px] font-extrabold uppercase text-emerald-450">{noteSaveStatus}</span>
                <button
                  type="submit"
                  disabled={isSavingNote}
                  className="bg-purple-650 hover:bg-purple-700 text-white font-extrabold text-[9px] uppercase tracking-wider px-4 py-2 rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-1"
                >
                  {isSavingNote ? (
                    <RefreshCw className="w-3 h-3 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-3 h-3" />
                      <span>Save Notes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📋 CHALLAN ISSUANCE LOG + DISPUTE QUEUE */}
      {subView === 'log' && (
        <div className="space-y-4">
          
          {/* Header */}
          <div className="py-2 border-b border-purple-900/20">
            <h3 className="text-sm font-heading font-black text-white tracking-widest uppercase text-left">
              Challan Operations Hub
            </h3>
            <span className="text-[9px] text-purple-400 font-extrabold tracking-wider uppercase block text-left">
              Zone Issuance Registry & Appeal Queue
            </span>
          </div>

          {/* Filter bars */}
          <div className="glass-panel p-4 space-y-3 text-left">
            <div className="space-y-1">
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Infraction Filter</span>
              <div className="flex gap-1 overflow-x-auto scrollbar-none pb-1">
                {['All', 'Speeding', 'Helmet', 'Parking', 'Signal'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setFilterType(tab)}
                    className={`text-[8.5px] font-extrabold px-3 py-1.5 rounded-lg border transition-all uppercase shrink-0 ${
                      filterType === tab 
                        ? 'bg-purple-650 text-white border-purple-650 shadow-md' 
                        : 'border-purple-900/15 text-slate-400 hover:bg-purple-900/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1 pt-1.5 border-t border-purple-900/5">
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">Status Filter</span>
              <div className="flex gap-1 overflow-x-auto scrollbar-none pb-1">
                {['All', 'Issued', 'Paid', 'Disputed', 'Escalated'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setFilterStatus(tab)}
                    className={`text-[8.5px] font-extrabold px-3 py-1.5 rounded-lg border transition-all uppercase shrink-0 ${
                      filterStatus === tab 
                        ? 'bg-purple-650 text-white border-purple-650 shadow-md' 
                        : 'border-purple-900/15 text-slate-400 hover:bg-purple-900/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Logs Table Card */}
          <div className="glass-panel p-4.5 space-y-3">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-350 block flex items-center gap-1.5 text-left">
              <ClipboardList className="w-3.5 h-3.5 text-purple-400" />
              Zone Challan Log ({filteredLogs.length})
            </span>

            <div className="border border-purple-900/10 rounded-xl overflow-hidden text-[9px] font-semibold text-left">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-900/5 border-b border-purple-900/10 text-slate-500 uppercase text-[8px] tracking-wider">
                    <th className="py-2 px-3">ID / Vehicle</th>
                    <th className="py-2 px-2">Violation</th>
                    <th className="py-2 px-3 text-right">Fine / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900/5 text-slate-300 font-mono">
                  {filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-purple-950/10">
                      <td className="py-2.5 px-3">
                        <span className="text-slate-500 text-[8px] block font-sans">{log.id}</span>
                        <strong className="text-white text-[9.5px] font-bold">{log.plate}</strong>
                      </td>
                      <td className="py-2.5 px-2">
                        <span className="text-[9.5px] text-slate-200">{log.violation}</span>
                        <span className="text-slate-500 text-[8px] block font-sans">{log.time}</span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <strong className="text-white block">₹{log.amount}</strong>
                        <span className={`text-[7px] font-bold uppercase px-1 rounded block w-max ml-auto mt-0.5 ${
                          log.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-450' :
                          log.status === 'Disputed' ? 'bg-amber-500/10 text-amber-500' :
                          log.status === 'Escalated' ? 'bg-red-500/10 text-red-400' :
                          'bg-purple-500/10 text-purple-400'
                        }`}>{log.status}</span>
                      </td>
                    </tr>
                  ))}
                  {filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-slate-500 uppercase text-[9px]">
                        No challan records match the filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dispute Appeals Queue */}
          <div className="glass-panel p-4.5 space-y-4">
            <div className="flex items-center justify-between border-b border-purple-900/10 pb-2">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-350 block flex items-center gap-1.5 text-left">
                <Scale className="w-3.5 h-3.5 text-purple-400" />
                Dispute & Escalation Queue
              </span>
              <span className="text-[8px] bg-amber-500/15 border border-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded font-extrabold uppercase">
                {disputes.filter(d => d.decision === 'Pending').length} Pending
              </span>
            </div>

            <div className="space-y-3.5 text-left text-[10px] font-semibold">
              {disputes.map((disp) => (
                <div key={disp.id} className="bg-[#16161a] p-3 rounded-xl border border-purple-900/5 space-y-2.5">
                  <div className="flex justify-between items-center border-b border-purple-900/10 pb-1.5">
                    <div className="space-y-0.5">
                      <span className="text-[8px] text-slate-500 font-mono block">{disp.id}</span>
                      <strong className="text-slate-200 text-[10.5px] uppercase tracking-wider">{disp.plate}</strong>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] text-slate-500 uppercase">{disp.violation}</span>
                      <strong className="text-purple-400 font-mono">₹{disp.amount}</strong>
                    </div>
                  </div>
                  
                  <div className="bg-[#0c0c0e] p-2 rounded-lg text-slate-400 text-[9px] leading-relaxed border border-purple-900/5">
                    <strong className="text-slate-300 block mb-0.5 text-[8.5px]">Citizen Statement:</strong>
                    "{disp.reason}"
                  </div>

                  {disp.decision === 'Pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDisputeAction(disp.id, 'approve')}
                        className="flex-1 bg-emerald-500/15 border border-emerald-500/20 hover:bg-emerald-500/25 text-emerald-450 font-extrabold text-[9px] uppercase tracking-wider py-1.5 rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Dismiss Fine</span>
                      </button>
                      <button
                        onClick={() => handleDisputeAction(disp.id, 'reject')}
                        className="flex-1 bg-red-500/15 border border-red-500/20 hover:bg-red-500/25 text-red-400 font-extrabold text-[9px] uppercase tracking-wider py-1.5 rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Uphold Fine</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase py-1 border-t border-purple-900/5">
                      {disp.decision.includes('Approved') ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className={disp.decision.includes('Approved') ? 'text-emerald-450' : 'text-red-400'}>
                        {disp.decision}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ⚠️ REPEAT OFFENDER WATCHLIST */}
      {subView === 'watchlist' && (
        <div className="space-y-4 text-left">
          {/* Header */}
          <div className="py-2 border-b border-purple-900/20">
            <h3 className="text-sm font-heading font-black text-white tracking-widest uppercase">
              Zone Watchlist
            </h3>
            <span className="text-[9px] text-purple-400 font-extrabold tracking-wider uppercase block">
              Active Repeat Infraction Tracker
            </span>
          </div>

          {/* Search Box */}
          <div className="glass-panel p-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search watchlist plate number..."
                value={watchlistQuery}
                onChange={(e) => setWatchlistQuery(e.target.value)}
                className="w-full bg-[#16161a] border border-purple-900/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 font-semibold placeholder:text-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none uppercase tracking-wider transition-all"
              />
            </div>
          </div>

          {/* List display */}
          <div className="glass-panel p-4 space-y-3.5">
            <div className="flex items-center justify-between border-b border-purple-900/10 pb-2">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-350 block flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                Flagged Vehicles ({watchlist.filter(w => w.plate.includes(watchlistQuery.toUpperCase())).length})
              </span>
              <span className="text-[8px] bg-red-500/15 border border-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-extrabold uppercase">Critical Check</span>
            </div>

            <div className="space-y-2.5 text-[10px] font-semibold">
              {watchlist
                .filter(w => w.plate.includes(watchlistQuery.toUpperCase()))
                .map((item, index) => (
                  <div key={index} className="bg-[#16161a] p-3 rounded-xl border border-purple-900/5 space-y-2 hover:border-purple-900/20 transition-all">
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-base leading-none">🚗</span>
                        <strong className="text-slate-100 text-[11px] font-bold tracking-widest">{item.plate}</strong>
                      </div>
                      <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 border rounded ${
                        item.risk === 'CRITICAL' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                        item.risk === 'HIGH' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                        'bg-purple-500/10 border-purple-500/20 text-purple-400'
                      }`}>
                        {item.risk} Risk
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[9px] font-bold text-slate-450 border-t border-purple-900/5 pt-2">
                      <div>
                        <span className="block text-slate-500 uppercase text-[8px]">Violations Count</span>
                        <strong className="text-white font-mono text-[10.5px]">{item.violationsCount} Tickets</strong>
                      </div>
                      <div>
                        <span className="block text-slate-500 uppercase text-[8px]">Primary Infraction</span>
                        <span className="text-slate-200">{item.commonViolation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              {watchlist.filter(w => w.plate.includes(watchlistQuery.toUpperCase())).length === 0 && (
                <div className="py-8 text-center text-slate-500 uppercase text-[9px]">
                  No flagged vehicles match the search pattern.
                </div>
              )}
            </div>
          </div>
          
          {/* Privacy locked compliance notice */}
          <div className="flex items-center gap-1.5 p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 text-[8.5px] text-purple-450 leading-relaxed font-semibold">
            <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <p>
              Officer watchlist showing vehicle data logs. Personal data (licenses, phone numbers) is redacted per central privacy policies.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
