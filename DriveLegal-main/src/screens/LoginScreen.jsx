import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';

const actionCodeSettings = {
  url: 'https://drive-legal-seven.vercel.app/#/auth',
  handleCodeInApp: true,
};

export default function LoginScreen({ onFirebaseLogin }) {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Auto-verify when user lands back from email magic link
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const savedEmail =
        localStorage.getItem('emailForSignIn') ||
        window.prompt('Confirm your email address:');
      if (savedEmail) {
        setLoading(true);
        signInWithEmailLink(auth, savedEmail, window.location.href)
          .then((result) => {
            localStorage.removeItem('emailForSignIn');
            onFirebaseLogin(result.user);
          })
          .catch((err) => {
            setIsError(true);
            setMessage('Verification failed: ' + err.message);
            setLoading(false);
          });
      }
    }
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      onFirebaseLogin(result.user);
    } catch (err) {
      setIsError(true);
      setMessage('Google login failed. Please try again.');
    }
    setLoading(false);
  };

  const handleSendOTP = async () => {
    if (!email.trim()) {
      setIsError(true);
      setMessage('Please enter your email address.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await sendSignInLinkToEmail(auth, email.trim(), actionCodeSettings);
      localStorage.setItem('emailForSignIn', email.trim());
      setOtpSent(true);
      setIsError(false);
      setMessage('✅ Login link sent! Check your inbox and click the link.');
    } catch (err) {
      setIsError(true);
      setMessage('Could not send email: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-sm z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-3xl">🚘</span>
            <h1 className="text-3xl font-black tracking-tight text-white">
              DRI<span className="text-amber-400">VOS</span>
            </h1>
          </div>
          <p className="text-gray-500 text-sm">AI-Powered Traffic Compliance</p>
        </div>

        {/* Card */}
        <div className="bg-[#13131a] border border-white/5 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-white font-bold text-lg mb-1">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-6">Sign in to continue to your dashboard</p>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-all duration-200 mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Google SVG Icon */}
            <svg width="18" height="18" viewBox="0 0 48 48" className="shrink-0">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.4 30.3 0 24 0 14.8 0 6.9 5.4 3 13.3l7.9 6.1C12.7 13 17.9 9.5 24 9.5z"/>
              <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17z"/>
              <path fill="#FBBC05" d="M10.9 28.6A14.8 14.8 0 0 1 9.5 24c0-1.6.3-3.1.8-4.6L2.4 13.3A23.9 23.9 0 0 0 0 24c0 3.8.9 7.4 2.4 10.7l8.5-6.1z"/>
              <path fill="#4285F4" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.2 1.5-5 2.3-8.4 2.3-6.1 0-11.3-4.1-13.1-9.7l-7.9 6.1C6.9 42.6 14.8 48 24 48z"/>
            </svg>
            {loading ? 'Please wait...' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-gray-600 text-xs">or sign in with email</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Email Input */}
          <div className="space-y-3">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !otpSent && handleSendOTP()}
              disabled={otpSent}
              className="w-full bg-[#0d0d14] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/60 placeholder-gray-600 transition-colors disabled:opacity-50"
            />
            <button
              onClick={handleSendOTP}
              disabled={loading || otpSent}
              className="w-full bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-black font-bold py-3 rounded-xl transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Sending...'
                : otpSent
                ? '📬 Link Sent — Check Inbox'
                : 'Send Sign-in Link'}
            </button>
          </div>

          {/* Status message */}
          {message && (
            <p className={`mt-4 text-xs text-center leading-relaxed ${isError ? 'text-red-400' : 'text-amber-300'}`}>
              {message}
            </p>
          )}

          {/* Resend option */}
          {otpSent && (
            <button
              onClick={() => { setOtpSent(false); setMessage(''); }}
              className="w-full mt-3 text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Didn't receive it? Try again
            </button>
          )}
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          By signing in, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
