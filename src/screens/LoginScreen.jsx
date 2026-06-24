import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useEffect } from "react";

const actionCodeSettings = {
  url: "https://drive-legal-seven.vercel.app/#/login",
  handleCodeInApp: true,
};

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      onLogin(result.user);
    } catch (err) {
      setMessage("Google login failed: " + err.message);
    }
    setLoading(false);
  };

  // Send email OTP link
  const handleSendOTP = async () => {
    if (!email) return setMessage("Email daalo pehle!");
    setLoading(true);
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem("emailForSignIn", email);
      setOtpSent(true);
      setMessage("✅ Email bhej di! Apna inbox check karo aur link pe click karo.");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
    setLoading(false);
  };

  // Auto-verify when user comes back from email link
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const savedEmail = localStorage.getItem("emailForSignIn") || 
        window.prompt("Apna email confirm karo:");
      if (savedEmail) {
        signInWithEmailLink(auth, savedEmail, window.location.href)
          .then((result) => {
            localStorage.removeItem("emailForSignIn");
            onLogin(result.user);
          })
          .catch((err) => setMessage("Verification failed: " + err.message));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-400">🚘 DRIVOS</h1>
          <p className="text-gray-400 mt-2 text-sm">AI-Powered Traffic Compliance</p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-200 mb-6 disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.4 30.3 0 24 0 14.8 0 6.9 5.4 3 13.3l7.9 6.1C12.7 13 17.9 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17z"/>
            <path fill="#FBBC05" d="M10.9 28.6A14.8 14.8 0 0 1 9.5 24c0-1.6.3-3.1.8-4.6L2.4 13.3A23.9 23.9 0 0 0 0 24c0 3.8.9 7.4 2.4 10.7l8.5-6.1z"/>
            <path fill="#4285F4" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.2 1.5-5 2.3-8.4 2.3-6.1 0-11.3-4.1-13.1-9.7l-7.9 6.1C6.9 42.6 14.8 48 24 48z"/>
          </svg>
          {loading ? "Loading..." : "Login with Google"}
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-500 text-sm">ya email se</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Email OTP */}
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Apna email daalo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 placeholder-gray-500"
          />
          <button
            onClick={handleSendOTP}
            disabled={loading || otpSent}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Bhej raha hoon..." : otpSent ? "Link Bhej Di ✅" : "Email Se Login Karo"}
          </button>
        </div>

        {/* Message */}
        {message && (
          <p className="mt-4 text-sm text-center text-amber-300">{message}</p>
        )}
      </div>
    </div>
  );
}
