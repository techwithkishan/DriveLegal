import React, { useState, useRef, useEffect } from 'react';
import { Shield, Phone, CreditCard, Key, ArrowRight, RefreshCw, KeyRound, Building2 } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export default function AuthScreen() {
  const { executeLogin, registerAuthority, loginAuthority } = useAppState();

  const [loginMethod, setLoginMethod] = useState('phone'); // phone, vehicle, licence
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [vehicleNo, setVehicleNo] = useState('KA01AB1234');
  const [licenceNo, setLicenceNo] = useState('KA-2019-0012345');

  const [authStep, setAuthStep] = useState('phone_input'); // phone_input, otp_input, vehicle_input, licence_input
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Authority Portal States
  const [isAuthorityPortal, setIsAuthorityPortal] = useState(false);
  const [isAuthoritySignup, setIsAuthoritySignup] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authBadgeId, setAuthBadgeId] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authRegion, setAuthRegion] = useState('Karnataka');
  const [authAgency, setAuthAgency] = useState('RTO Inspectorate');
  const [authPin, setAuthPin] = useState('');

  const otpRefs = useRef([]);

  // Auto focus first OTP cell
  useEffect(() => {
    if (authStep === 'otp_input' && otpRefs.current[0]) {
      setTimeout(() => otpRefs.current[0].focus(), 150);
    }
  }, [authStep]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthStep('otp_input');
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && otpRefs.current[index - 1]) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Please enter all 6 digits of the OTP');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      executeLogin('phone', phoneNumber);
    }, 1200);
  };

  const handleVehicleSubmit = (e) => {
    e.preventDefault();
    const cleanPlate = vehicleNo.toUpperCase().replace(/\s+/g, '');
    if (!cleanPlate || cleanPlate.length < 8) {
      setError('Please enter a valid vehicle registration plate (e.g. KA01AB1234)');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      executeLogin('vehicle', cleanPlate);
    }, 1000);
  };

  const handleLicenceSubmit = (e) => {
    e.preventDefault();
    const cleanLicence = licenceNo.toUpperCase().replace(/\s+/g, '');
    if (!cleanLicence || cleanLicence.length < 10) {
      setError('Please enter a valid driving license ID (e.g. KA-2019-0012345)');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      executeLogin('licence', cleanLicence);
    }, 1000);
  };

  const handleAuthoritySignIn = (e) => {
    e.preventDefault();
    if (!authBadgeId || !authPin) {
      setError('Please fill in both Badge ID and Pin');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginAuthority(authBadgeId, authPin);
    }, 1200);
  };

  const handleAuthoritySignUpSubmit = (e) => {
    e.preventDefault();
    if (!authName || !authBadgeId || !authPhone || !authPin) {
      setError('Please fill in all registration fields');
      return;
    }
    if (authPin.length < 6) {
      setError('Secret PIN must be at least 6 digits');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      registerAuthority({
        name: authName,
        badgeId: authBadgeId,
        phone: authPhone,
        region: authRegion,
        agency: authAgency
      });
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col justify-center p-6 max-w-sm mx-auto relative select-none">
      
      {/* Background Glow Ring */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[80px] pointer-events-none transition-all duration-500 ${
        isAuthorityPortal ? 'bg-amber-500/15' : 'bg-electric/15'
      }`} />

      {/* Header section */}
      <div className="flex flex-col items-center mb-6 text-center">
        <div className={`p-3.5 rounded-2xl text-white shadow-lg transition-all duration-500 ${
          isAuthorityPortal 
            ? 'bg-gradient-to-tr from-amber-500 to-orange-600 shadow-amber-500/20' 
            : 'bg-gradient-to-tr from-electric to-blue-600 shadow-electric/25'
        }`}>
          {isAuthorityPortal ? (
            <Building2 className="w-8 h-8 fill-white/10" />
          ) : (
            <Shield className="w-8 h-8 fill-white/10" />
          )}
        </div>
        <h2 className="font-heading font-extrabold text-2xl tracking-wider text-slate-800 dark:text-white">
          {isAuthorityPortal ? 'DRIVELEGAL RTO' : 'DRIVELEGAL'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
          {isAuthorityPortal 
            ? 'Enforcement Officer & RTO Inspector Console' 
            : 'Secure Traffic Compliance & Personal Advisory Portal'}
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-semibold mb-4 text-center">
          {error}
        </div>
      )}

      {/* AUTHORITY PORTAL MODE */}
      {isAuthorityPortal ? (
        <div className="space-y-4 animate-fade-in">
          {/* Sign In vs Sign Up Tabs inside Officer Portal */}
          <div className="flex bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-1 rounded-xl gap-1 mb-4">
            <button
              type="button"
              onClick={() => {
                setIsAuthoritySignup(false);
                setError('');
              }}
              className={`flex-1 py-2 rounded-lg text-[9px] font-extrabold uppercase tracking-wider transition-all duration-300 ${
                !isAuthoritySignup 
                  ? 'bg-amber-500 text-slate-950 shadow-md glow-amber' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Officer Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAuthoritySignup(true);
                setError('');
              }}
              className={`flex-1 py-2 rounded-lg text-[9px] font-extrabold uppercase tracking-wider transition-all duration-300 ${
                isAuthoritySignup 
                  ? 'bg-amber-500 text-slate-950 shadow-md glow-amber' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Officer Register
            </button>
          </div>

          {/* AUTHORITY SIGN UP FORM */}
          {isAuthoritySignup ? (
            <form onSubmit={handleAuthoritySignUpSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Full Officer Name
                </label>
                <input
                  type="text"
                  required
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  placeholder="e.g. Vikram Singh"
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3.5 text-slate-850 dark:text-white text-xs font-semibold placeholder:text-slate-450 focus:border-amber-500 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Assigned Badge ID
                </label>
                <input
                  type="text"
                  required
                  value={authBadgeId}
                  onChange={(e) => setAuthBadgeId(e.target.value)}
                  placeholder="e.g. KA03-INS-584"
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3.5 text-slate-850 dark:text-white text-xs font-semibold placeholder:text-slate-450 focus:border-amber-500 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 9999988888"
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3.5 text-slate-850 dark:text-white text-xs font-semibold placeholder:text-slate-450 focus:border-amber-500 focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Region/State
                  </label>
                  <select
                    value={authRegion}
                    onChange={(e) => setAuthRegion(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-2.5 text-slate-850 dark:text-white text-xs font-semibold focus:outline-none transition-all"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Enforcement Agency
                  </label>
                  <select
                    value={authAgency}
                    onChange={(e) => setAuthAgency(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-2.5 text-slate-850 dark:text-white text-xs font-semibold focus:outline-none transition-all"
                  >
                    <option value="RTO Inspectorate">RTO Inspectorate</option>
                    <option value="Traffic Police">Traffic Police</option>
                    <option value="Highway Patrol">Highway Patrol</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Create Secret PIN (6 Digits)
                </label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={authPin}
                  onChange={(e) => setAuthPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••••"
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3.5 text-slate-855 dark:text-white text-xs font-semibold placeholder:text-slate-450 focus:border-amber-500 focus:outline-none transition-all tracking-widest text-center"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-500 active:scale-[0.98] disabled:opacity-50 text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all mt-4"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Register Officer ID</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* AUTHORITY SIGN IN FORM */
            <form onSubmit={handleAuthoritySignIn} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Enforcement Badge ID
                </label>
                <input
                  type="text"
                  required
                  value={authBadgeId}
                  onChange={(e) => setAuthBadgeId(e.target.value)}
                  placeholder="e.g. KA03-INS-584"
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-800 dark:text-white text-xs font-semibold tracking-wider placeholder:text-slate-450 focus:border-amber-500 focus:outline-none transition-all"
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Secret Enforcement PIN
                </label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={authPin}
                  onChange={(e) => setAuthPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="••••••"
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-805 dark:text-white text-xs font-semibold tracking-widest text-center placeholder:text-slate-450 focus:border-amber-500 focus:outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-500 active:scale-[0.98] disabled:opacity-50 text-slate-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all mt-4"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Verify Credentials & Enter</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <button
            type="button"
            onClick={() => {
              setIsAuthorityPortal(false);
              setError('');
            }}
            className="w-full text-center text-xs font-extrabold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all uppercase tracking-wider py-2"
          >
            ← Back to Citizen Portal
          </button>
        </div>
      ) : (
        /* CITIZEN PORTAL MODE */
        <div className="space-y-4 animate-fade-in">
          {/* Login Tab Selectors */}
          {authStep !== 'otp_input' && (
            <div className="flex bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-1 rounded-xl gap-1 mb-5" id="login-tabs">
              {[
                { id: 'phone', label: 'Phone', icon: Phone },
                { id: 'vehicle', label: 'Vehicle', icon: CreditCard },
                { id: 'licence', label: 'Licence', icon: KeyRound }
              ].map((tab) => {
                const Icon = tab.icon;
                const active = loginMethod === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setLoginMethod(tab.id);
                      setError('');
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                      active 
                        ? 'bg-electric text-white shadow-md glow-electric' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* phone login view */}
          {loginMethod === 'phone' && authStep !== 'otp_input' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Registered Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-bold text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-slate-800 dark:text-white text-sm font-semibold tracking-wider placeholder:text-slate-450 dark:placeholder:text-slate-600 focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none transition-all"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-electric to-blue-600 hover:from-electric-glow hover:to-electric active:scale-[0.98] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-electric/25 flex items-center justify-center gap-2 transition-all mt-4"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Request OTP Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* OTP verification view */}
          {authStep === 'otp_input' && (
            <form onSubmit={handleOtpVerify} className="space-y-5">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block text-center">
                  Enter Verification Code
                </label>
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      placeholder="•"
                      className="w-12 h-12 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-center text-xl font-bold text-slate-800 dark:text-white focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none transition-all"
                    />
                  ))}
                </div>
                <div className="text-center text-[10px] text-slate-500 font-bold uppercase mt-2">
                  Auto-fill code: enter any 6 digits (e.g. 1 2 3 4 5 6)
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-electric to-blue-600 hover:from-electric-glow hover:to-electric text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-electric/25 flex items-center justify-center transition-all mt-4"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Verify OTP</span>}
              </button>

              <button
                type="button"
                onClick={() => setAuthStep('phone_input')}
                className="w-full text-center text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all uppercase tracking-wider"
              >
                Back to Phone Login
              </button>
            </form>
          )}

          {/* vehicle number login view */}
          {loginMethod === 'vehicle' && authStep !== 'otp_input' && (
            <form onSubmit={handleVehicleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Vehicle Registration Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 dark:text-slate-400" />
                  <input
                    type="text"
                    value={vehicleNo}
                    onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                    placeholder="e.g. KA01AB1234"
                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-slate-800 dark:text-white text-xs font-semibold tracking-wider placeholder:text-slate-400 dark:placeholder:text-slate-650 focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none transition-all"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-electric to-blue-600 hover:from-electric-glow hover:to-electric active:scale-[0.98] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-electric/25 flex items-center justify-center gap-2 transition-all mt-4"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Sync VAHAN & Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* driving license login view */}
          {loginMethod === 'licence' && authStep !== 'otp_input' && (
            <form onSubmit={handleLicenceSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Driving License Number
                </label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 dark:text-slate-400" />
                  <input
                    type="text"
                    value={licenceNo}
                    onChange={(e) => setLicenceNo(e.target.value.toUpperCase())}
                    placeholder="e.g. KA-2019-0012345"
                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-slate-800 dark:text-white text-xs font-semibold tracking-wider placeholder:text-slate-400 dark:placeholder:text-slate-650 focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none transition-all"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-electric to-blue-600 hover:from-electric-glow hover:to-electric active:scale-[0.98] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-electric/25 flex items-center justify-center gap-2 transition-all mt-4"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Sync central SARATHI & Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Separate Authority Portal Switch Trigger */}
          <button
            type="button"
            onClick={() => {
              setIsAuthorityPortal(true);
              setIsAuthoritySignup(false);
              setError('');
            }}
            className="w-full border border-amber-500/35 hover:bg-amber-500/5 text-amber-500 font-extrabold py-2.5 rounded-xl text-[10px] uppercase tracking-widest transition-all mt-4 flex items-center justify-center gap-2"
          >
            <Building2 className="w-3.5 h-3.5 animate-pulse" />
            <span>RTO Authority / Officer Portal</span>
          </button>
        </div>
      )}

      <div className="text-center mt-6">
        <span className="text-[9px] text-slate-500 dark:text-slate-650 font-bold uppercase tracking-wider">
          {isAuthorityPortal ? 'Central Enforcement Authority Database' : 'Integrated with Central Parivahan APIs'}
        </span>
      </div>
    </div>
  );
}
