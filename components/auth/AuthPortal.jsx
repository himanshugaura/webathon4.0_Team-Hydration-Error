"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  GraduationCap,
  Building,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Trophy,
  Code,
  Shield,
  Compass,
  Gamepad2,
  BookOpen,
  Users,
  Check,
  Download,
  Calendar,
  Volume2,
  VolumeX,
} from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { soundFx } from "@/components/login/SoundEffects";
import { ForgotPasswordModal } from "@/components/login/ForgotPasswordModal";

// Available Events from the NIRVAN '26 PRD
const AVAILABLE_EVENTS = [
  {
    id: "hackathon",
    title: "HackSprint Hackathon",
    category: "Coding & Innovation",
    duration: "24 Hours",
    teamSize: "2 - 4 Members",
    prize: "₹15,000",
    icon: Code,
    desc: "Turn ideas into real solutions under high-tempo sprint conditions.",
    isTeam: true,
  },
  {
    id: "coderrush",
    title: "CoderRush Contest",
    category: "Competitive Coding",
    duration: "3 Hours",
    teamSize: "1 - 2 Members",
    prize: "₹10,000",
    icon: Trophy,
    desc: "Speed algorithmic problem-solving in C++, Java, or Python.",
    isTeam: false,
  },
  {
    id: "ctf",
    title: "Cyber CTF Arena",
    category: "Cybersecurity",
    duration: "4 Hours",
    teamSize: "1 - 3 Members",
    prize: "₹10,000",
    icon: Shield,
    desc: "Cryptography, web forensics, reverse engineering, and exploit challenges.",
    isTeam: true,
  },
  {
    id: "treasure_hunt",
    title: "Campus Treasure Hunt",
    category: "Logic & Adventure",
    duration: "2 Hours",
    teamSize: "2 - 3 Members",
    prize: "₹8,000",
    icon: Compass,
    desc: "Cryptic logic puzzles across the GEHU campus to uncover the treasure.",
    isTeam: true,
  },
  {
    id: "esports",
    title: "E-Sports Showdown",
    category: "Gaming Arena",
    duration: "5 Hours",
    teamSize: "4 Members",
    prize: "₹12,000",
    icon: Gamepad2,
    desc: "High-adrenaline tactical gaming tournament for campus supremacy.",
    isTeam: true,
  },
  {
    id: "workshop",
    title: "AI & Full-Stack Workshop",
    category: "Masterclass",
    duration: "3 Hours",
    teamSize: "Individual",
    prize: "Certificates + Kit",
    icon: BookOpen,
    desc: "Hands-on guided deep dive with industry engineers.",
    isTeam: false,
  },
];

export function AuthPortal({ initialMode = "signup", onStateUpdate }) {
  const [activeTab, setActiveTab] = useState(initialMode); // "login" | "signup"
  const [step, setStep] = useState(1); // 1: Email/Password -> 2: Personal Details -> 3: Events -> 4: Success
  const [showPassword, setShowPassword] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [mobile, setMobile] = useState("");
  const [college, setCollege] = useState("Graphic Era Hill University");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [year, setYear] = useState("3rd Year");
  const [selectedEvents, setSelectedEvents] = useState(["HackSprint Hackathon"]);
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // UI States
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Sync state with pass card
  useEffect(() => {
    if (onStateUpdate) {
      onStateUpdate({
        email,
        name,
        studentId,
        mobile,
        college,
        selectedEvents,
        activeTab,
      });
    }
  }, [email, name, studentId, mobile, college, selectedEvents, activeTab, onStateUpdate]);

  const toggleSound = () => {
    const next = soundFx.toggle();
    setSoundActive(next);
  };

  // Demo auto-fills for quick evaluation
  const fillDemoStudent = () => {
    soundFx.playSuccess();
    setErrorMsg("");
    setEmail("aryan.gehu@gmail.com");
    setPassword("Nirvan@2026Secure");
    setConfirmPassword("Nirvan@2026Secure");
    setName("Aryan Raj");
    setStudentId("GEHU/2023/1084");
    setMobile("+91 98765 43210");
    setCollege("Graphic Era Hill University");
    setDepartment("Computer Science & Engineering");
    setSelectedEvents(["HackSprint Hackathon", "Cyber CTF Arena"]);
    setTeamName("Team Hydration Error");
    setTeamMembers("Priya Sharma, Rohan Verma");
  };

  const toggleEventSelection = (eventTitle) => {
    soundFx.playClick();
    if (selectedEvents.includes(eventTitle)) {
      setSelectedEvents(selectedEvents.filter((t) => t !== eventTitle));
    } else {
      setSelectedEvents([...selectedEvents, eventTitle]);
    }
  };

  // Step 1 Validation (Email & Password)
  const handleStep1Next = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email || !password) {
      soundFx.playError();
      setErrorMsg("Please fill in both email and password.");
      return;
    }
    if (password.length < 6) {
      soundFx.playError();
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      soundFx.playError();
      setErrorMsg("Passwords do not match.");
      return;
    }
    soundFx.playClick();
    setStep(2);
  };

  // Step 2 Validation (Personal Details: Name, Student ID, Mobile, College)
  const handleStep2Next = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name || !studentId || !mobile) {
      soundFx.playError();
      setErrorMsg("Please provide your Full Name, Student ID, and Mobile Number.");
      return;
    }
    soundFx.playClick();
    setStep(3);
  };

  // Step 3 Submit (Event Selection & Finalize Registration)
  const handleStep3Submit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (selectedEvents.length === 0) {
      soundFx.playError();
      setErrorMsg("Please select at least one event to register for.");
      return;
    }
    soundFx.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
      soundFx.playSuccess();
    }, 1200);
  };

  // Login Submit Handler
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email || !password) {
      soundFx.playError();
      setErrorMsg("Please enter your registered email and password.");
      return;
    }
    soundFx.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setLoginSuccess(true);
      soundFx.playSuccess();
    }, 1200);
  };

  // Calculate Password Strength in Sage/Emerald tones (Strictly NO blue/purple)
  const getStrength = (pass) => {
    if (!pass) return { score: 0, text: "Enter password", color: "bg-black/10 dark:bg-white/10" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) return { score, text: "Weak password", color: "bg-amber-600" };
    if (score <= 4) return { score, text: "Strong security", color: "bg-[#84a98c]" };
    return { score, text: "Maximum security", color: "bg-emerald-600" };
  };

  const strength = getStrength(password);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Sleek Glassmorphic Container */}
      <div className="relative rounded-3xl p-6 sm:p-9 backdrop-blur-2xl bg-white/75 dark:bg-[#15231c]/80 border border-white/60 dark:border-[#84a98c]/25 shadow-[0_20px_60px_rgba(47,62,70,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        
        {/* Top Header & Tab Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2f3e46]/10 dark:border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2f3e46] dark:text-[#cad2c5]">
                {activeTab === "signup" ? "Event Registration" : "Student Login"}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#52796f]/10 dark:bg-[#84a98c]/20 text-[#52796f] dark:text-[#84a98c] border border-[#52796f]/20">
                NIRVAN '26
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {activeTab === "signup"
                ? "Register for NIRVAN '26 technical events & generate your official pass"
                : "Sign in with your registered email and password to view your events"}
            </p>
          </div>

          {/* Tab Switcher & Audio toggle */}
          <div className="flex items-center gap-2">
            <div className="flex p-1 bg-black/5 dark:bg-black/40 rounded-2xl border border-black/5 dark:border-white/5">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab("signup");
                  setErrorMsg("");
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "signup"
                    ? "bg-[#52796f] text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab("login");
                  setErrorMsg("");
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === "login"
                    ? "bg-[#52796f] text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </button>
            </div>

            <button
              type="button"
              onClick={toggleSound}
              title={soundActive ? "Mute Sound Effects" : "Enable Sound Effects"}
              className="p-2 rounded-xl bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/5 text-[#2f3e46] dark:text-[#cad2c5] hover:bg-[#84a98c]/20 transition-all"
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <VolumeX className="w-4 h-4 opacity-50" />
              )}
            </button>
          </div>
        </div>

        {/* 1-Click Fast Pre-fill (For Reviewers & Judges) */}
        <div className="mb-6 p-3 rounded-2xl bg-[#84a98c]/10 dark:bg-[#84a98c]/5 border border-[#84a98c]/20 flex items-center justify-between flex-wrap gap-2">
          <span className="text-[11px] font-mono font-medium text-[#52796f] dark:text-[#84a98c] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            EVALUATOR QUICK-FILL PRESET
          </span>
          <button
            type="button"
            onClick={fillDemoStudent}
            className="px-3 py-1 text-xs rounded-xl bg-white/80 dark:bg-white/10 border border-black/5 dark:border-white/10 text-[#2f3e46] dark:text-[#cad2c5] font-semibold hover:border-[#84a98c] transition-all hover:scale-105"
          >
            ⚡ Auto-Fill Aryan (GEHU CS)
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* -------------------- SIGN IN MODE -------------------- */}
        {activeTab === "login" && (
          <div>
            {loginSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2f3e46] dark:text-white">
                    Signed In Successfully!
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Welcome back to NIRVAN '26. Your event pass is ready.
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-800 dark:text-emerald-300 max-w-sm mx-auto">
                  SESSION ACTIVE • GEHU STUDENT PORTAL
                </div>
                <button
                  type="button"
                  onClick={() => setLoginSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#52796f] to-[#354f52] text-white text-xs font-semibold shadow-md hover:opacity-95"
                >
                  Manage Registrations
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                    COLLEGE EMAIL / ROLL NUMBER
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      placeholder="student@gehu.ac.in"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        soundFx.playKeypress();
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5]">
                      PASSWORD
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setForgotModalOpen(true);
                      }}
                      className="text-xs text-[#52796f] dark:text-[#84a98c] hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        soundFx.playKeypress();
                      }}
                      className="w-full pl-10 pr-11 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[#52796f] focus:ring-[#84a98c] accent-[#52796f]"
                    />
                    <span className="text-xs text-muted-foreground font-medium">
                      Keep me logged in
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#52796f] to-[#354f52] hover:from-[#44655c] hover:to-[#2c4144] transition-all shadow-lg shadow-[#52796f]/20 hover:shadow-[#52796f]/35 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Signing in...</span>
                  ) : (
                    <>
                      <span>Sign In to Student Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Social Login Options */}
                <div className="mt-6">
                  <div className="relative flex items-center justify-center mb-4">
                    <div className="border-t border-black/10 dark:border-white/10 w-full" />
                    <span className="bg-transparent px-3 text-[11px] font-mono text-muted-foreground uppercase">
                      Or Sign In With
                    </span>
                    <div className="border-t border-black/10 dark:border-white/10 w-full" />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={fillDemoStudent}
                      className="py-2.5 px-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-[#84a98c]/15 text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] flex items-center justify-center gap-2 transition-all"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>GitHub</span>
                    </button>
                    <button
                      type="button"
                      onClick={fillDemoStudent}
                      className="py-2.5 px-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-[#84a98c]/15 text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] flex items-center justify-center gap-2 transition-all"
                    >
                      <FaGoogle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Google</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* -------------------- PROGRESSIVE SIGNUP / REGISTRATION -------------------- */}
        {activeTab === "signup" && (
          <div>
            {/* Step Progress Bar */}
            <div className="mb-7">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className={`font-semibold ${step >= 1 ? "text-[#52796f] dark:text-[#84a98c]" : "text-muted-foreground"}`}>
                  1. Account
                </span>
                <span className={`font-semibold ${step >= 2 ? "text-[#52796f] dark:text-[#84a98c]" : "text-muted-foreground"}`}>
                  2. Student Details
                </span>
                <span className={`font-semibold ${step >= 3 ? "text-[#52796f] dark:text-[#84a98c]" : "text-muted-foreground"}`}>
                  3. Events
                </span>
                <span className={`font-semibold ${step >= 4 ? "text-[#52796f] dark:text-[#84a98c]" : "text-muted-foreground"}`}>
                  4. Pass
                </span>
              </div>
              <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-[#52796f] to-[#84a98c] transition-all duration-400"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: Email and Password only */}
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleStep1Next}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                    COLLEGE EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. aryan.student@gehu.ac.in"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        soundFx.playKeypress();
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Use your official college or personal email for registration confirmations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                      CREATE PASSWORD
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          soundFx.playKeypress();
                        }}
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                      CONFIRM PASSWORD
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••••••"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          soundFx.playKeypress();
                        }}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                      <span>SECURITY LEVEL:</span>
                      <span className="font-semibold text-[#52796f] dark:text-[#84a98c]">
                        {strength.text}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden flex gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className={`h-full flex-1 rounded-full transition-all duration-300 ${
                            strength.score >= lvl ? strength.color : "opacity-20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full mt-3 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#52796f] to-[#354f52] hover:from-[#44655c] hover:to-[#2c4144] transition-all shadow-lg shadow-[#52796f]/20 flex items-center justify-center gap-2"
                >
                  <span>Continue to Student Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>
            )}

            {/* STEP 2: Student Details (Name, Student ID, Mobile, College) */}
            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleStep2Next}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                    FULL NAME *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Raj"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        soundFx.playKeypress();
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                      STUDENT ID / ROLL NUMBER *
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. GEHU/2023/1084"
                        value={studentId}
                        onChange={(e) => {
                          setStudentId(e.target.value);
                          soundFx.playKeypress();
                        }}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                      MOBILE NUMBER *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value);
                          soundFx.playKeypress();
                        }}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                    COLLEGE / UNIVERSITY
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Graphic Era Hill University"
                      value={college}
                      onChange={(e) => {
                        setCollege(e.target.value);
                        soundFx.playKeypress();
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                      DEPARTMENT
                    </label>
                    <input
                      type="text"
                      placeholder="CSE / IT / ECE"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                      YEAR OF STUDY
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-[#15231c] border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white transition-all"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setStep(1);
                    }}
                    className="py-3 px-4 rounded-xl border border-black/10 dark:border-white/10 text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#52796f] to-[#354f52] hover:from-[#44655c] hover:to-[#2c4144] transition-all shadow-lg shadow-[#52796f]/20 flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Event Selection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 3: Event Selection & Team details */}
            {step === 3 && (
              <motion.form
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleStep3Submit}
                className="space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#2f3e46] dark:text-[#cad2c5] uppercase">
                      SELECT EVENTS TO ENROLL
                    </span>
                    <span className="text-xs font-mono text-[#52796f] dark:text-[#84a98c]">
                      {selectedEvents.length} Selected
                    </span>
                  </div>

                  {/* Grid of Events */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[290px] overflow-y-auto pr-1">
                    {AVAILABLE_EVENTS.map((evt) => {
                      const isSelected = selectedEvents.includes(evt.title);
                      const Icon = evt.icon;
                      return (
                        <div
                          key={evt.id}
                          onClick={() => toggleEventSelection(evt.title)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                            isSelected
                              ? "bg-[#52796f]/15 border-[#52796f] dark:border-[#84a98c] shadow-sm"
                              : "bg-black/5 dark:bg-black/30 border-black/5 dark:border-white/5 hover:border-[#84a98c]/40"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-[#52796f] text-white"
                                : "bg-black/5 dark:bg-white/5 text-[#52796f] dark:text-[#84a98c]"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h4 className="text-xs font-bold text-[#2f3e46] dark:text-white truncate">
                                {evt.title}
                              </h4>
                              {isSelected && (
                                <Check className="w-3.5 h-3.5 text-[#52796f] dark:text-[#84a98c] shrink-0" />
                              )}
                            </div>
                            <p className="text-[10px] text-muted-foreground truncate">
                              {evt.category} • {evt.teamSize}
                            </p>
                            <div className="mt-1 flex items-center justify-between text-[10px] font-mono">
                              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                                Prize: {evt.prize}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Team Configuration (if team event selected) */}
                <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#52796f] dark:text-[#84a98c]" />
                    <span className="text-xs font-mono font-bold text-[#2f3e46] dark:text-[#cad2c5]">
                      TEAM SPECIFICATIONS (OPTIONAL)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <input
                        type="text"
                        placeholder="Team / Squad Name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/60 dark:bg-black/50 border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Teammate Roll Numbers (comma separated)"
                        value={teamMembers}
                        onChange={(e) => setTeamMembers(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/60 dark:bg-black/50 border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setStep(2);
                    }}
                    className="py-3 px-4 rounded-xl border border-black/10 dark:border-white/10 text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || selectedEvents.length === 0}
                    className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#52796f] to-[#354f52] hover:from-[#44655c] hover:to-[#2c4144] transition-all shadow-lg shadow-[#52796f]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Generating Fest Pass...</span>
                    ) : (
                      <>
                        <span>Confirm & Generate Digital Pass</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 4: Success & Confirmed Admission Pass */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-[#2f3e46] dark:text-white">
                    Registration Confirmed!
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    You are officially registered for NIRVAN '26 at GEHU Haldwani.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 text-left text-xs space-y-2 max-w-md mx-auto font-mono">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Candidate:</span>
                    <span className="font-bold text-[#2f3e46] dark:text-white">{name || "Aryan Raj"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Roll No / ID:</span>
                    <span className="text-[#52796f] dark:text-[#84a98c] font-bold">{studentId || "GEHU/2023/1084"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Events ({selectedEvents.length}):</span>
                    <span className="text-right text-[#2f3e46] dark:text-[#cad2c5] font-semibold">{selectedEvents.join(", ")}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-black/10 dark:border-white/10">
                    <span className="text-muted-foreground">Confirmation Code:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">NIRV-2026-CONF-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playSuccess();
                      alert("Digital Admission Pass downloaded successfully!");
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#52796f] to-[#354f52] text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Pass (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setActiveTab("login");
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-black/10 dark:border-white/10 text-[#2f3e46] dark:text-[#cad2c5] text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                  >
                    Return to Login
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
      />
    </div>
  );
}
