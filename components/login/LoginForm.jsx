"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Fingerprint,
  CheckCircle2,
  Sparkles,
  Volume2,
  VolumeX,
  GraduationCap,
  Award,
  Users,
  AlertCircle,
  Building,
  User,
  Loader2,
} from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { soundFx } from "./SoundEffects";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { BiometricModal } from "./BiometricModal";

export function LoginForm({ onFormStateChange }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [activeRole, setActiveRole] = useState("participant"); // 'participant' | 'judge' | 'team_lead'
  const [showPassword, setShowPassword] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);

  // Form Fields
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Modals
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [biometricModalOpen, setBiometricModalOpen] = useState(false);

  // Submission State
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Sync state with parent (e.g. For live 3D HoloPass preview)
  useEffect(() => {
    if (onFormStateChange) {
      onFormStateChange({
        identifier,
        fullName,
        collegeName,
        teamName,
        role: activeRole,
        isSignUp,
      });
    }
  }, [identifier, fullName, collegeName, teamName, activeRole, isSignUp, onFormStateChange]);

  // Handle Caps Lock
  const handleKeyDown = (e) => {
    if (e.getModifierState && e.getModifierState("CapsLock")) {
      setCapsLockActive(true);
    } else {
      setCapsLockActive(false);
    }
  };

  // Sound Toggle
  const toggleSound = () => {
    const next = soundFx.toggle();
    setSoundEnabled(next);
  };

  // Role Switcher
  const handleRoleChange = (role) => {
    soundFx.playClick();
    setActiveRole(role);
    setErrorMsg("");
  };

  // Demo Credentials Fill
  const fillDemo = (type) => {
    soundFx.playSuccess();
    setErrorMsg("");
    if (type === "participant") {
      setActiveRole("participant");
      setIsSignUp(false);
      setIdentifier("aryan.gehu@gmail.com");
      setPassword("Nirvan2026!Pro");
      setFullName("Aryan Raj");
    } else if (type === "judge") {
      setActiveRole("judge");
      setIsSignUp(false);
      setIdentifier("jury.verma@gehu.ac.in");
      setPassword("JudgeKey#9920");
      setFullName("Dr. S. Verma");
    } else if (type === "lead") {
      setActiveRole("team_lead");
      setIsSignUp(false);
      setIdentifier("priya.captain@gehu.ac.in");
      setPassword("TeamAlpha!2026");
      setFullName("Priya Singh");
    }
  };

  // Calculate Password Strength
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "Empty", color: "bg-muted" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score, label: "Basic Protection", color: "bg-amber-500" };
    if (score <= 4) return { score, label: "Strong Defense", color: "bg-[#84a98c]" };
    return { score, label: "Cyber Fortress (Maximum)", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(password);

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    soundFx.playClick();
    setErrorMsg("");

    if (!identifier || !password) {
      soundFx.playError();
      setErrorMsg("Please provide all required credentials.");
      return;
    }

    setLoading(true);
    setLoadingMessage("Connecting to GEHU Mainframe Gateway...");

    setTimeout(() => {
      setLoadingMessage("Validating SHA-256 Access Token...");
    }, 800);

    setTimeout(() => {
      setLoadingMessage("Decrypting NIRVAN '26 Security Clearance...");
    }, 1600);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      soundFx.playSuccess();
    }, 2400);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Background card glow & border */}
      <div className="relative rounded-3xl p-6 sm:p-9 bg-white/70 dark:bg-[#1a2e1a]/80 backdrop-blur-2xl border border-white/50 dark:border-[#84a98c]/25 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        
        {/* Card Header & Controls */}
        <div className="flex items-center justify-between pb-5 border-b border-black/10 dark:border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2f3e46] dark:text-[#cad2c5]">
                {isSignUp ? "Create Fest ID" : "Welcome Back"}
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#52796f]/10 dark:bg-[#84a98c]/20 text-[#52796f] dark:text-[#84a98c] border border-[#52796f]/20">
                NIRVAN '26
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {isSignUp
                ? "Register your profile or team for the technical fest"
                : "Authenticate to access your schedule, events & badge"}
            </p>
          </div>

          {/* Sound FX & Audio Synthesizer Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={soundEnabled ? "Mute Sci-Fi Audio" : "Enable Sci-Fi Audio Synthesis"}
            className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-[#84a98c]/20 transition-all text-[#2f3e46] dark:text-[#cad2c5]"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-emerald-500 animate-pulse" />
            ) : (
              <VolumeX className="w-5 h-5 opacity-60" />
            )}
          </button>
        </div>

        {/* Demo Fast-Fill Pills (For Instant Evaluation/Review) */}
        <div className="mb-6 p-3 rounded-2xl bg-[#84a98c]/10 dark:bg-[#84a98c]/5 border border-[#84a98c]/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-semibold tracking-wider text-[#52796f] dark:text-[#84a98c] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              QUICK DEMO PRESETS (1-CLICK TEST)
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fillDemo("participant")}
              className="px-2.5 py-1 text-xs rounded-xl bg-white/80 dark:bg-white/10 border border-black/5 dark:border-white/10 hover:border-[#84a98c] dark:hover:border-[#84a98c] text-[#2f3e46] dark:text-[#cad2c5] font-medium transition-all hover:scale-105"
            >
              🚀 Aryan (Hacker)
            </button>
            <button
              type="button"
              onClick={() => fillDemo("judge")}
              className="px-2.5 py-1 text-xs rounded-xl bg-white/80 dark:bg-white/10 border border-black/5 dark:border-white/10 hover:border-amber-500 text-[#2f3e46] dark:text-[#cad2c5] font-medium transition-all hover:scale-105"
            >
              🛡️ Dr. Verma (Judge)
            </button>
            <button
              type="button"
              onClick={() => fillDemo("lead")}
              className="px-2.5 py-1 text-xs rounded-xl bg-white/80 dark:bg-white/10 border border-black/5 dark:border-white/10 hover:border-emerald-500 text-[#2f3e46] dark:text-[#cad2c5] font-medium transition-all hover:scale-105"
            >
              ⚡ Priya (Team Captain)
            </button>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-black/5 dark:bg-black/40 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => handleRoleChange("participant")}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeRole === "participant"
                ? "bg-white dark:bg-[#2a4436] text-[#2f3e46] dark:text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Participant</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange("judge")}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeRole === "judge"
                ? "bg-white dark:bg-[#2a4436] text-[#2f3e46] dark:text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Judge / Mentor</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange("team_lead")}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeRole === "team_lead"
                ? "bg-white dark:bg-[#2a4436] text-[#2f3e46] dark:text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Team Lead</span>
          </button>
        </div>

        {/* Success Splash Screen */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-8 text-center space-y-4"
            >
              <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-500 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#2f3e46] dark:text-white">
                  Access Granted!
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Welcome to NIRVAN '26 • Initializing your dashboard...
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-800 dark:text-emerald-300">
                TOKEN: 0x9f4a...e12b • CLEARANCE LEVEL: AUTHORIZED
              </div>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#52796f] to-[#354f52] text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-all"
              >
                Continue to Fest Arena
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Form */}
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error banner */}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* Extra fields if Sign Up */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-mono font-medium text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                    FULL NAME
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        soundFx.playKeypress();
                      }}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                    COLLEGE / INSTITUTION
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Graphic Era Hill University"
                      value={collegeName}
                      onChange={(e) => {
                        setCollegeName(e.target.value);
                        soundFx.playKeypress();
                      }}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                    />
                  </div>
                </div>

                {activeRole === "team_lead" && (
                  <div>
                    <label className="block text-xs font-mono font-medium text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                      SQUAD / TEAM NAME
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="e.g. Team Hydration Error"
                        value={teamName}
                        onChange={(e) => {
                          setTeamName(e.target.value);
                          soundFx.playKeypress();
                        }}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Email / Identifier Field */}
            <div>
              <label className="block text-xs font-mono font-medium text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                {activeRole === "judge"
                  ? "JURY ACCESS ID / EMAIL"
                  : "COLLEGE EMAIL / ROLL NUMBER"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  placeholder={
                    activeRole === "judge"
                      ? "judge.access@gehu.ac.in"
                      : "roll_number@gehu.ac.in"
                  }
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    soundFx.playKeypress();
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono font-medium text-[#2f3e46] dark:text-[#cad2c5]">
                  {activeRole === "judge" ? "SECURITY CLEARANCE PIN" : "PASSWORD"}
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setForgotModalOpen(true);
                    }}
                    className="text-xs text-[#52796f] dark:text-[#84a98c] hover:underline font-medium"
                  >
                    Forgot passcode?
                  </button>
                )}
              </div>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyDown}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    soundFx.playKeypress();
                  }}
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Caps Lock Alert */}
              {capsLockActive && (
                <p className="text-[11px] text-amber-500 font-mono mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Caps Lock is active
                </p>
              )}

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                    <span>SECURITY RATING:</span>
                    <span className="font-semibold text-[#52796f] dark:text-[#84a98c]">
                      {strength.label}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          strength.score >= level ? strength.color : "opacity-20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Remember Me & Biometric Passkey shortcut */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => {
                    soundFx.playClick();
                    setRememberMe(e.target.checked);
                  }}
                  className="w-4 h-4 rounded border-gray-300 text-[#52796f] focus:ring-[#84a98c] accent-[#52796f]"
                />
                <span className="text-xs text-muted-foreground font-medium">
                  Remember this device
                </span>
              </label>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setBiometricModalOpen(true);
                }}
                className="text-xs font-mono text-[#52796f] dark:text-[#84a98c] hover:underline flex items-center gap-1"
              >
                <Fingerprint className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant Passkey</span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#52796f] via-[#354f52] to-[#2f3e46] hover:from-[#44655c] hover:to-[#223335] transition-all shadow-lg shadow-[#52796f]/25 hover:shadow-[#52796f]/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{loadingMessage || "Authenticating..."}</span>
                </>
              ) : (
                <>
                  <span>
                    {isSignUp ? "Generate Fest Pass & Register" : "Authorize & Enter Fest"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Social / Alternate SSO Sign-Ins */}
        {!success && (
          <div className="mt-6">
            <div className="relative flex items-center justify-center mb-4">
              <div className="border-t border-black/10 dark:border-white/10 w-full" />
              <span className="bg-transparent px-3 text-[11px] font-mono text-muted-foreground uppercase">
                Or Connect With
              </span>
              <div className="border-t border-black/10 dark:border-white/10 w-full" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  fillDemo("participant");
                }}
                className="py-2 px-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-[#84a98c]/15 text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] flex items-center justify-center gap-1.5 transition-all"
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  fillDemo("participant");
                }}
                className="py-2 px-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-[#84a98c]/15 text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] flex items-center justify-center gap-1.5 transition-all"
              >
                <FaGoogle className="w-4 h-4 text-red-500" />
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  fillDemo("participant");
                }}
                className="py-2 px-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-[#84a98c]/15 text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] flex items-center justify-center gap-1.5 transition-all"
              >
                <Shield className="w-4 h-4 text-[#84a98c]" />
                <span>GEHU ERP</span>
              </button>
            </div>

            {/* Toggle Sign In / Sign Up */}
            <div className="mt-6 text-center text-xs text-muted-foreground">
              {isSignUp ? (
                <>
                  Already registered for NIRVAN '26?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setIsSignUp(false);
                    }}
                    className="font-bold text-[#52796f] dark:text-[#84a98c] hover:underline ml-1"
                  >
                    Sign In here
                  </button>
                </>
              ) : (
                <>
                  New to NIRVAN '26 Fest?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setIsSignUp(true);
                    }}
                    className="font-bold text-[#52796f] dark:text-[#84a98c] hover:underline ml-1"
                  >
                    Create Fest ID / Team
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sub-modals */}
      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
      />
      <BiometricModal
        isOpen={biometricModalOpen}
        onClose={() => setBiometricModalOpen(false)}
        onSuccess={() => {
          fillDemo("participant");
          setSuccess(true);
        }}
      />
    </div>
  );
}
