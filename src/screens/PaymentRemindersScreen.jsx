import React, { useState } from 'react';
import {
  Bell, Clock, AlertTriangle, CheckCircle, CreditCard,
  ChevronRight, Calendar, Download, X, ToggleLeft, ToggleRight,
  Zap, ShieldAlert, Receipt, BellOff
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

// ─── Mock Reminders Data ──────────────────────────────────────────────────────
const REMINDERS = [
  {
    id: 'REM001',
    type: 'urgent',
    challanNo: 'KA-2025-BLR-048721',
    violation: 'Over-speeding',
    vehicle: 'KA01AB1234',
    fine: 2000,
    dueDate: '15 Jun 2025',
    daysLeft: 4,
    section: 'Section 183',
    location: 'Mysuru Highway, BLR',
  },
  {
    id: 'REM002',
    type: 'due_soon',
    challanNo: 'KA-2025-BLR-039142',
    violation: 'No Helmet',
    vehicle: 'KA01AB1234',
    fine: 1000,
    dueDate: '28 Jun 2025',
    daysLeft: 17,
    section: 'Section 129',
    location: 'MG Road, Bengaluru',
  },
  {
    id: 'REM003',
    type: 'paid',
    challanNo: 'KA-2024-MYS-011832',
    violation: 'Wrong Parking',
    vehicle: 'KA01AB1234',
    fine: 500,
    dueDate: '10 Apr 2025',
    paidDate: '8 Apr 2025',
    section: 'Section 122',
    location: 'Commercial St, Mysuru',
  },
  {
    id: 'REM004',
    type: 'paid',
    challanNo: 'KA-2024-BLR-071123',
    violation: 'Red Light Jump',
    vehicle: 'KA01AB1234',
    fine: 1000,
    dueDate: '02 Feb 2025',
    paidDate: '29 Jan 2025',
    section: 'Section 119',
    location: 'Hebbal Flyover, BLR',
  },
];

const INSURANCE_REMINDER = {
  vehicle: 'KA01AB1234',
  insurer: 'HDFC ERGO General Insurance',
  policyNo: 'HDFC-2024-9381-KA',
  expiryDate: '10 Jun 2025',
  daysLeft: 12,
  renewalPremium: '₹8,200',
};

// ─── Toast Component ─────────────────────────────────────────────────────────
function Toast({ msg, onClose }) {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-slate-800 dark:bg-slate-700 border border-white/10 shadow-2xl rounded-2xl px-4 py-3 flex items-center gap-2.5">
        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span className="text-xs font-bold text-white">{msg}</span>
        <button onClick={onClose} className="ml-1 text-slate-400 hover:text-white transition-all">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function PaymentRemindersScreen() {
  const { setActiveScreen } = useAppState();
  const [reminders, setReminders] = useState(REMINDERS);
  const [toast, setToast] = useState(null);
  const [prefs, setPrefs] = useState({
    advanceNotif: true,
    dueDateAlert: true,
    courtEscalation: false,
    insuranceAlert: true,
    smsAlert: false,
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSnooze = (id) => {
    showToast('Reminder snoozed for 24 hours ⏰');
  };

  const handlePay = (id) => {
    showToast('Redirecting to Parivahan payment portal... 💳');
  };

  const handleDownloadReceipt = (id) => {
    showToast('Receipt download started 📄');
  };

  const togglePref = (key) => {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  };

  const urgentReminders = reminders.filter(r => r.type === 'urgent');
  const dueSoonReminders = reminders.filter(r => r.type === 'due_soon');
  const paidReminders = reminders.filter(r => r.type === 'paid');

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto w-full space-y-5">
      {/* Screen Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-heading font-extrabold text-slate-800 dark:text-white tracking-wide">
          Payment Reminders
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Track pending challans and set smart payment alerts
        </p>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Overdue', count: urgentReminders.length, color: 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400' },
          { label: 'Due Soon', count: dueSoonReminders.length, color: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400' },
          { label: 'Paid', count: paidReminders.length, color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border p-3 text-center ${s.color}`}>
            <span className="text-xl font-extrabold block">{s.count}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider block">{s.label}</span>
          </div>
        ))}
      </div>

      {/* URGENT — Pulsing Red Card */}
      {urgentReminders.length > 0 && (
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-red-500 px-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
            Urgent — Pay Immediately
          </span>
          {urgentReminders.map(rem => (
            <div
              key={rem.id}
              className="glass-panel border-l-4 border-l-red-500 p-4 space-y-3 shadow-xl shadow-red-500/5"
              style={{ animation: 'pulseGlow 2.5s ease-in-out infinite' }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-extrabold text-slate-800 dark:text-white block">{rem.violation}</span>
                  <span className="text-[9px] font-bold text-red-500 dark:text-red-400 uppercase tracking-wider">{rem.challanNo}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-red-600 dark:text-red-400 block">₹{rem.fine.toLocaleString('en-IN')}</span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400">Due: {rem.dueDate}</span>
                </div>
              </div>

              {/* Timer pill */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-red-400 animate-pulse flex-shrink-0" />
                <span className="text-[10px] font-bold text-red-600 dark:text-red-400">
                  Only <strong>{rem.daysLeft} days</strong> left before late fees apply • {rem.section}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handlePay(rem.id)}
                  className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-[11px] font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-red-500/25"
                >
                  <CreditCard className="w-3.5 h-3.5" /> Pay Now
                </button>
                <button
                  onClick={() => handleSnooze(rem.id)}
                  className="px-4 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 py-2.5 rounded-xl text-[11px] font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                >
                  Remind Tomorrow
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DUE SOON — Amber Cards */}
      {dueSoonReminders.length > 0 && (
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-amber-500 dark:text-amber-400 px-1">Due Soon</span>
          {dueSoonReminders.map(rem => (
            <div key={rem.id} className="glass-panel border-l-4 border-l-amber-500 p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 dark:text-white block">{rem.violation}</span>
                  <span className="text-[9px] font-bold text-amber-500 dark:text-amber-400 uppercase tracking-wider">{rem.challanNo}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-800 dark:text-white block">₹{rem.fine.toLocaleString('en-IN')}</span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400">Due: {rem.dueDate}</span>
                </div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                  {rem.daysLeft} days remaining — {rem.section} • {rem.location}
                </span>
              </div>
              <button
                onClick={() => handlePay(rem.id)}
                className="w-full border border-amber-500/30 text-amber-600 dark:text-amber-400 py-2.5 rounded-xl text-[11px] font-bold hover:bg-amber-500/10 transition-all flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5" /> Pay Before Due Date
              </button>
            </div>
          ))}
        </div>
      )}

      {/* INSURANCE REMINDER */}
      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-slate-800 dark:text-white">Insurance Expiring</span>
          <span className="ml-auto text-[9px] bg-blue-500/15 text-blue-500 dark:text-blue-400 font-bold px-2 py-0.5 rounded-full">
            {INSURANCE_REMINDER.daysLeft} days
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            ['Vehicle', INSURANCE_REMINDER.vehicle],
            ['Insurer', INSURANCE_REMINDER.insurer],
            ['Policy No', INSURANCE_REMINDER.policyNo],
            ['Renewal Cost', INSURANCE_REMINDER.renewalPremium],
          ].map(([label, val]) => (
            <div key={label} className="bg-white/50 dark:bg-white/5 rounded-xl p-2">
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">{label}</span>
              <span className="text-[10px] font-bold text-slate-800 dark:text-white leading-snug block">{val}</span>
            </div>
          ))}
        </div>
        <button className="w-full bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/20 text-blue-600 dark:text-blue-400 py-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5">
          Renew Insurance <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* PAID HISTORY */}
      {paidReminders.length > 0 && (
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 px-1">Payment History</span>
          {paidReminders.map(rem => (
            <div key={rem.id} className="glass-panel border-l-4 border-l-emerald-500 p-4 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-800 dark:text-white block">{rem.violation}</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400">
                  Paid {rem.paidDate} • {rem.section}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">₹{rem.fine}</span>
                <button
                  onClick={() => handleDownloadReceipt(rem.id)}
                  className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 hover:bg-emerald-500/20 transition-all"
                  title="Download Receipt"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NOTIFICATION PREFERENCES PANEL */}
      <div className="glass-panel p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-electric" />
          <h4 className="text-xs font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">Notification Preferences</h4>
        </div>
        <div className="space-y-3">
          {[
            { key: 'advanceNotif', label: 'Advance Reminders', desc: '7 days before due date' },
            { key: 'dueDateAlert', label: 'Due Date Alert', desc: '24 hours before expiry' },
            { key: 'courtEscalation', label: 'Court Escalation Alert', desc: 'If challan goes to tribunal' },
            { key: 'insuranceAlert', label: 'Insurance Expiry', desc: '30 days before policy end' },
            { key: 'smsAlert', label: 'SMS Notifications', desc: 'Get alerts via SMS too' },
          ].map(pref => (
            <div key={pref.key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-800 dark:text-white block">{pref.label}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">{pref.desc}</span>
              </div>
              <button
                onClick={() => togglePref(pref.key)}
                className={`transition-all duration-300 ${prefs[pref.key] ? 'text-electric' : 'text-slate-400 dark:text-slate-600'}`}
              >
                {prefs[pref.key] ? (
                  <ToggleRight className="w-7 h-7" />
                ) : (
                  <ToggleLeft className="w-7 h-7" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {/* Inline animations */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
          50% { box-shadow: 0 0 12px 3px rgba(239,68,68,0.15); }
        }
      `}</style>
    </div>
  );
}
