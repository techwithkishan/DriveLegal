import React, { useState } from 'react';
import { 
  User, CreditCard, Shield, MapPin, Plus, Trash2, 
  LogOut, ShieldAlert, BadgeInfo, Settings, RefreshCw, 
  Check, Bell, Eye, EyeOff, Edit, CheckSquare, X, ChevronRight, FileText
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function ProfileScreen() {
  const { 
    user, vehicles, addCustomVehicle, removeCustomVehicle, 
    logout, isOffline, setIsOffline, 
    isTravelModeSimulated, setIsTravelModeSimulated,
    theme, toggleTheme, updateUserProfile, loginMethod,
    setActiveScreen, isAdminMode, setIsAdminMode
  } = useAppState();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || 'Arjun Mehta');
  const [editedPhone, setEditedPhone] = useState(user?.phone || '+91 98765 43210');

  const [newPlate, setNewPlate] = useState('');
  const [newType, setNewType] = useState('Bike');
  const [newState, setNewState] = useState('Karnataka');
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [addingError, setAddingError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Notification Preferences
  const [notifPrefs, setNotifPrefs] = useState({
    reminders: true,
    alerts: true,
    tips: false,
    insurance: true,
    preDriveReminder: true,
    highRiskZoneAlerts: true,
    weeklyPatternReport: true,
    docExpiryAlerts: true,
    streakTrackerAlerts: true
  });

  const handleTogglePref = (key) => {
    setNotifPrefs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    const updated = updateUserProfile(editedName, editedPhone);
    if (updated) {
      setIsEditing(false);
      setSuccessMsg('Profile updated successfully');
      setTimeout(() => setSuccessMsg(''), 2000);
    }
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    setAddingError('');
    if (!newPlate) return;

    const added = addCustomVehicle(newPlate, newType, newState);
    if (added) {
      setNewPlate('');
      setSuccessMsg('Vehicle linked successfully');
      setTimeout(() => setSuccessMsg(''), 2000);
    } else {
      setAddingError('Plate number already exists or is invalid');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 space-y-4 max-w-md lg:max-w-xl mx-auto w-full animate-fade-in select-none">
      {/* Profile Header & Inline Edit */}
      <div className="glass-panel p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-electric/10 to-transparent rounded-full blur-lg pointer-events-none" />
        
        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/25 p-2 rounded-xl text-[10px] text-emerald-400 font-bold text-center mb-3 flex items-center justify-center gap-1">
            <Check className="w-3.5 h-3.5" />
            {successMsg}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleProfileSave} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold text-slate-500">Legal Name</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 dark:text-white focus:border-electric focus:outline-none"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold text-slate-500">Mobile Phone</label>
              <input
                type="text"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 dark:text-white focus:border-electric focus:outline-none"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 bg-electric hover:bg-electric-glow text-white py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditedName(user?.name);
                  setEditedPhone(user?.phone);
                }}
                className="flex-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="bg-gradient-to-tr from-electric via-indigo-600 to-blue-700 p-3.5 rounded-2xl text-white shadow-xl glow-electric relative">
                <User className="w-8 h-8" />
                <span className="absolute -bottom-1 -right-1 bg-slate-900 border border-slate-800 dark:border-white/10 rounded-full px-1.5 py-0.2 text-[7px] text-slate-450 dark:text-slate-400 font-extrabold uppercase">
                  {loginMethod}
                </span>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-heading font-extrabold text-slate-800 dark:text-white leading-tight">
                  {user?.name}
                </h3>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block uppercase tracking-wider">
                  {user?.phone}
                </span>
                <span className="text-[10px] text-electric bg-electric/15 rounded-full px-2.5 py-0.5 mt-1.5 w-max font-bold block">
                  Licence: {user?.licenseNumber}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              title="Edit Profile"
              id="edit-profile-btn"
            >
              <Edit className="w-4 h-4 text-electric" />
            </button>
          </div>
        )}
      </div>

      {/* Linked Vehicles Section with types and registrations */}
      <div className="glass-panel p-5 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/5">
          <CreditCard className="w-4 h-4 text-electric" />
          <h4 className="text-xs font-heading font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Manage Vehicles ({vehicles.length})
          </h4>
        </div>

        {addingError && (
          <span className="block text-[10px] text-red-400 font-bold bg-red-500/10 border border-red-500/20 p-2 rounded-xl text-center">
            {addingError}
          </span>
        )}

        <div className="space-y-2.5">
          {vehicles.map((v) => (
            <div key={v.plate} className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-3 rounded-xl flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-800 dark:text-white block tracking-wider">{v.plate}</span>
                <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-widest">
                  {v.type} • Registered in {v.state}
                </span>
              </div>
              {vehicles.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCustomVehicle(v.plate)}
                  className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
                  title="Remove vehicle"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add new vehicle cascading inputs */}
        <form onSubmit={handleAddVehicle} className="space-y-3 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/10 rounded-xl py-2 px-3 text-xs text-slate-800 dark:text-white focus:border-electric focus:outline-none font-semibold"
            >
              <option value="Bike">Bike (2-Wheeler)</option>
              <option value="Car">Car (4-Wheeler)</option>
              <option value="Commercial">Commercial</option>
            </select>
            
            <select
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
              className="bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/10 rounded-xl py-2 px-3 text-xs text-slate-800 dark:text-white focus:border-electric focus:outline-none font-semibold"
            >
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="PLATE NUMBER (e.g. KA03CD5678)"
              value={newPlate}
              onChange={(e) => setNewPlate(e.target.value.toUpperCase())}
              className="flex-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 px-3.5 text-xs text-slate-850 dark:text-white font-semibold placeholder:text-slate-405 dark:placeholder:text-slate-600 focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none uppercase tracking-wider"
            />
            <button
              type="submit"
              className="bg-electric hover:bg-electric-glow text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center shrink-0"
              id="add-vehicle-btn"
            >
              <Plus className="w-4.5 h-4.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Licence Details Card */}
      <div className="glass-panel p-5 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/5">
          <Shield className="w-4 h-4 text-electric" />
          <h4 className="text-xs font-heading font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Licence Credentials
          </h4>
        </div>

        <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-500">Sarathi ID:</span>
            <span className="font-bold text-slate-800 dark:text-white tracking-wider uppercase">{user?.licenseNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Expiry Date:</span>
            <span className="font-bold text-slate-800 dark:text-white">{user?.licenseExpiry}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">License Class:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{user?.licenseClass}</span>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="glass-panel p-5 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/5">
          <Bell className="w-4.5 h-4.5 text-electric" />
          <h4 className="text-xs font-heading font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Notification Preferences
          </h4>
        </div>

        <div className="space-y-3.5">
          {[
            { key: 'reminders', label: 'Payment Reminders', desc: 'Warn before challan court escalation dates' },
            { key: 'alerts', label: 'Violation Alerts', desc: 'Instant warning if RTO speed-cameras snap vehicle' },
            { key: 'tips', label: 'AI Tips of the Day', desc: 'Weekly legal advice and road safety modules' },
            { key: 'insurance', label: 'Insurance Expiry Alerts', desc: 'Alerts 15 days prior to policy expiries' },
            { key: 'preDriveReminder', label: 'Pre-Drive Reminder', desc: 'Daily checklist reminders before driving' },
            { key: 'highRiskZoneAlerts', label: 'Zone Alerts', desc: 'Get notified when near high-risk enforcement areas' },
            { key: 'weeklyPatternReport', label: 'Driving Pattern Report', desc: 'Weekly AI summary of driving telemetry compliance' },
            { key: 'docExpiryAlerts', label: 'Document Expiry Alerts', desc: 'Alerts for licence, RC, PUC expiration' },
            { key: 'streakTrackerAlerts', label: 'Streak Tracker Alerts', desc: 'Violation-free streak milestone updates' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="space-y-0.5 pr-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{item.label}</span>
                <span className="text-[9px] text-slate-550 dark:text-slate-500 block leading-tight">{item.desc}</span>
              </div>
              <button
                type="button"
                onClick={() => handleTogglePref(item.key)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-all duration-300 ${
                  notifPrefs[item.key] ? 'bg-electric' : 'bg-slate-200 dark:bg-white/10'
                }`}
              >
                <div className={`w-4.5 h-4.5 bg-white rounded-full transition-transform duration-300 ${
                  notifPrefs[item.key] ? 'translate-x-4.5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          ))}
        </div>

        {/* Quick link to Payment Reminders */}
        <button
          onClick={() => setActiveScreen('reminders')}
          id="profile-reminders-link-btn"
          className="w-full mt-1 flex items-center justify-between bg-electric/5 border border-electric/15 hover:bg-electric/10 rounded-xl px-3.5 py-2.5 transition-all"
        >
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-electric" />
            <span className="text-[11px] font-bold text-electric">Manage Payment Reminders</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-electric/60" />
        </button>
      </div>

      {/* Theme Toggle & Sandbox Simulations */}
      <div className="glass-panel p-5 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/5">
          <Settings className="w-4 h-4 text-electric" />
          <h4 className="text-xs font-heading font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            System Preferences
          </h4>
        </div>

        <div className="space-y-3.5">
          {/* Light/Dark toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Dark / Light Interface</span>
              <span className="text-[9px] text-slate-550 dark:text-slate-500 block leading-tight">Switch between deep-navy or sleek white</span>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-all duration-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 active:scale-95 text-slate-600 dark:text-slate-300 font-bold text-[10px]"
            >
              {theme === 'dark' ? 'DARK ACTIVE 🌙' : 'LIGHT ACTIVE ☀️'}
            </button>
          </div>

          <div className="h-[1px] bg-slate-200 dark:bg-white/5" />

          {/* Offline simulator switch */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-300 block">Simulate Offline Mode</span>
              <span className="text-[9px] text-slate-550 dark:text-slate-500 block leading-tight">Show cached regional rule databases</span>
            </div>
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`w-10 h-5.5 rounded-full p-0.5 transition-all duration-300 ${
                isOffline ? 'bg-red-500' : 'bg-slate-200 dark:bg-white/10'
              }`}
            >
              <div className={`w-4.5 h-4.5 bg-white rounded-full transition-transform duration-300 ${
                isOffline ? 'translate-x-4.5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Travel simulator switch */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-300 block">Simulate Travel Mode</span>
              <span className="text-[9px] text-slate-550 dark:text-slate-500 block leading-tight">Mismatches registration state to trigger alert</span>
            </div>
            <button
              onClick={() => setIsTravelModeSimulated(!isTravelModeSimulated)}
              className={`w-10 h-5.5 rounded-full p-0.5 transition-all duration-300 ${
                isTravelModeSimulated ? 'bg-amber-500' : 'bg-slate-200 dark:bg-white/10'
              }`}
            >
              <div className={`w-4.5 h-4.5 bg-white rounded-full transition-transform duration-300 ${
                isTravelModeSimulated ? 'translate-x-4.5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Plans & Pricing Redirect */}
      <button
        onClick={() => setActiveScreen('pricing')}
        id="profile-plans-pricing-btn"
        className="w-full bg-gradient-to-r from-blue-500/10 to-electric/10 border border-blue-500/20 text-electric dark:text-electric-glow py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider hover:from-blue-500/15 hover:to-electric/15 active:scale-[0.98] transition-all flex items-center justify-center gap-2 animate-pulse-slow"
      >
        <CreditCard className="w-4 h-4" />
        <span>Plans & Pricing</span>
      </button>

      {/* Export Compliance Report */}
      <button
        onClick={() => setActiveScreen('exportReport')}
        id="profile-export-report-btn"
        className="w-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider hover:from-indigo-500/15 hover:to-purple-500/15 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <FileText className="w-4 h-4" />
        <span>Export My Compliance Report</span>
      </button>

      {/* Platform Section — Phase 8 */}
      <div className="glass-panel p-4 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/5">
          <BadgeInfo className="w-4 h-4 text-electric" />
          <h4 className="text-xs font-heading font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Platform</h4>
          <span className="ml-auto text-[7.5px] bg-blue-500/15 text-blue-400 border border-blue-500/25 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-widest">Phase 8</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'ecosystem', emoji: '🌐', label: 'Ecosystem', color: 'text-electric border-electric/20 bg-electric/5 hover:bg-electric/10' },
            { id: 'aiCoach', emoji: '🤖', label: 'AI Coach', color: 'text-purple-500 dark:text-purple-400 border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10' },
            { id: 'achievements', emoji: '🏆', label: 'Achievements', color: 'text-amber-500 dark:text-amber-400 border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10' },
            { id: 'roadmap', emoji: '🗺️', label: 'Roadmap', color: 'text-emerald-500 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              id={`profile-${item.id}-btn`}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border font-bold text-[10px] uppercase tracking-wider transition-all active:scale-95 ${item.color}`}
            >
              <span className="text-base leading-none">{item.emoji}</span>
              <span>{item.label}</span>
              <ChevronRight className="w-3 h-3 ml-auto opacity-60" />
            </button>
          ))}
        </div>
      </div>

      {/* Switch to Governance View button */}
      <button
        onClick={() => {
          setIsAdminMode(true);
          setActiveScreen('adminDashboard');
        }}
        id="profile-governance-toggle-btn"
        className="w-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:from-amber-500/15 hover:to-orange-500/15 text-amber-600 dark:text-amber-400 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <ShieldAlert className="w-4 h-4 text-amber-500 animate-pulse" />
        <span>Switch to Governance View</span>
      </button>

      {/* Logout button triggers modal */}
      <button
        onClick={() => setShowLogoutModal(true)}
        className="w-full bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-red-100 dark:hover:bg-red-500/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 animate-pulse-slow"
        id="profile-logout-btn"
      >
        <LogOut className="w-4 h-4" />
        <span>Secure Sign Out</span>
      </button>

      {/* SIGN OUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-modal max-w-sm w-full p-5 border border-slate-200 dark:border-white/10 animate-fade-in space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-heading font-extrabold text-slate-800 dark:text-slate-200 text-sm tracking-wider uppercase">
                Confirm Sign Out
              </span>
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/15 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal font-semibold">
              Are you sure you want to securely log out of DRIVELEGAL? Your local VAHAN credentials sync settings will remain preserved in your secure local session keys.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
                className="flex-1 bg-red-500 hover:bg-red-650 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all"
                id="confirm-logout-btn"
              >
                Sign Out
              </button>
              
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
