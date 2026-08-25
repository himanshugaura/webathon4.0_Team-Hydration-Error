"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, KeyRound, ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";
import { soundFx } from "./SoundEffects";

export function ForgotPasswordModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email) return;
    soundFx.playClick();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setTimer(60);
      soundFx.playSuccess();
    }, 1200);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    soundFx.playKeypress();

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    soundFx.playClick();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      soundFx.playSuccess();
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md rounded-3xl bg-white/90 dark:bg-[#1a2e1a]/95 backdrop-blur-2xl border border-white/20 dark:border-[#84a98c]/30 shadow-2xl p-6 sm:p-8 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#52796f]/10 dark:bg-[#84a98c]/20 flex items-center justify-center text-[#52796f] dark:text-[#84a98c]">
                <KeyRound className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-lg text-[#2f3e46] dark:text-white">
                Passcode Recovery
              </h3>
            </div>
            <button
              onClick={handleReset}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step 1: Input Email */}
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter your registered college email or roll number to receive a one-time verification token.
              </p>
              <div>
                <label className="block text-xs font-mono font-medium text-[#2f3e46] dark:text-[#cad2c5] mb-1">
                  COLLEGE EMAIL / ROLL NUMBER
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="student@gehu.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#52796f] to-[#354f52] hover:opacity-95 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Transmitting Recovery Token...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Token</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: Input OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  A 6-digit security token has been sent to{" "}
                  <span className="font-semibold text-[#52796f] dark:text-[#84a98c]">{email}</span>.
                </p>
              </div>

              {/* 6 Digit Inputs */}
              <div className="flex justify-between gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-input-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !digit && i > 0) {
                        const prev = document.getElementById(`otp-input-${i - 1}`);
                        if (prev) prev.focus();
                      }
                    }}
                    className="w-12 h-13 text-center text-xl font-bold font-mono rounded-xl bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/20 text-[#2f3e46] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#84a98c]"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span>Resend available in: {timer}s</span>
                <button
                  type="button"
                  disabled={timer > 0}
                  onClick={() => setTimer(60)}
                  className="text-[#52796f] dark:text-[#84a98c] hover:underline disabled:opacity-40"
                >
                  Resend Code
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || otp.some((d) => !d)}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#52796f] to-[#354f52] hover:opacity-95 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Validating Passcode Token...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Reset Passcode</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#2f3e46] dark:text-white">
                Passcode Reset Link Sent!
              </h4>
              <p className="text-sm text-muted-foreground">
                Your credentials have been securely verified. Please check your inbox for the immediate access token.
              </p>
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#52796f] to-[#354f52] shadow-lg"
              >
                Return to Login
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
