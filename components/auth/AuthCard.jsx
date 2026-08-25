"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  GraduationCap,
  Building2,
  BookOpen,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

export function AuthCard({ initialTab = "login" }) {
  const router = useRouter();
  const [tab, setTab] = useState(initialTab); // 'login' | 'register'
  const [registerStep, setRegisterStep] = useState(1); // 1: Email/Pass -> 2: Personal details -> 3: Complete
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form Fields - Step 1: Credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Form Fields - Step 2: Personal & Academic Details
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [campus, setCampus] = useState("Haldwani");
  const [course, setCourse] = useState("B.Tech CSE");
  const [section, setSection] = useState("Section A");
  const [mobile, setMobile] = useState("");

  // Status
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Switch tab
  const handleTabSwitch = (newTab) => {
    setTab(newTab);
    setErrorMsg("");
    setRegisterStep(1);
    setLoginSuccess(false);
  };

  // Login Submit
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both your email and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoginSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    }, 900);
  };

  // Register Step 1 -> Step 2
  const handleRegisterStep1 = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please provide an email and password.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter.");
      return;
    }

    setRegisterStep(2);
  };

  // Register Step 2 -> Submit
  const handleRegisterFinal = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !studentId || !mobile || !campus || !course || !section) {
      setErrorMsg("Please fill in all required academic and personal details.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRegisterStep(3);
    }, 1100);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Sleek Glassmorphic Card */}
      <div className="relative rounded-3xl p-6 sm:p-9 backdrop-blur-2xl bg-white/80 dark:bg-[#121c17]/90 border border-zinc-300/70 dark:border-[#84a98c]/25 shadow-[0_20px_60px_rgba(47,62,70,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all">
        
        {/* Card Top Brand */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-2">
            <img 
              src="/gehu_logo.svg" 
              alt="GEHU Logo" 
              className="h-10 w-auto drop-shadow-md group-hover:scale-105 transition-transform" 
            />
            <span className="font-extrabold text-2xl tracking-tight text-[#2f3e46] dark:text-[#cad2c5]">
              NIRVAN <span className="text-[#52796f] dark:text-[#84a98c]">'26</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground font-medium">
            Student Access & Event Registration Portal
          </p>
        </div>

        {/* Tab Toggle Pill */}
        <div className="grid grid-cols-2 p-1 bg-black/5 dark:bg-black/40 rounded-2xl mb-6 border border-black/5 dark:border-white/5">
          <button
            type="button"
            onClick={() => handleTabSwitch("login")}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              tab === "login"
                ? "bg-[#52796f] text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch("register")}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              tab === "register"
                ? "bg-[#52796f] text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Register Student
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/25 text-destructive text-xs font-medium flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* ===================== SIGN IN ===================== */}
        {tab === "login" && (
          <div>
            {loginSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#2f3e46] dark:text-white">
                  Welcome Back!
                </h3>
                <p className="text-xs text-muted-foreground">
                  Authentication successful. Redirecting to your Dashboard...
                </p>
                <div className="pt-2">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#52796f] text-white text-xs font-semibold shadow-md hover:bg-[#44655c] transition-all"
                  >
                    <span>Enter Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      placeholder="student@gehu.ac.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2f3e46] dark:text-[#cad2c5]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert("Password reset link has been dispatched to your email address.")}
                      className="text-xs text-[#52796f] dark:text-[#84a98c] hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
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
                    <span className="text-xs text-muted-foreground font-medium">Remember credentials</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#52796f] to-[#354f52] hover:from-[#44655c] hover:to-[#2c4144] transition-all shadow-md shadow-[#52796f]/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* ===================== REGISTER ===================== */}
        {tab === "register" && (
          <div>
            {/* Step indicator */}
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-5 px-1">
              <span className={registerStep >= 1 ? "font-bold text-[#52796f] dark:text-[#84a98c]" : ""}>
                1. Credentials
              </span>
              <span className="text-muted-foreground/40">→</span>
              <span className={registerStep >= 2 ? "font-bold text-[#52796f] dark:text-[#84a98c]" : ""}>
                2. Student Profile
              </span>
              <span className="text-muted-foreground/40">→</span>
              <span className={registerStep === 3 ? "font-bold text-[#52796f] dark:text-[#84a98c]" : ""}>
                3. Ready
              </span>
            </div>

            {/* STEP 1: Email, Password & Confirm Password */}
            {registerStep === 1 && (
              <form onSubmit={handleRegisterStep1} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      placeholder="student@gehu.ac.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                    Create Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2f3e46] dark:text-[#cad2c5] mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#52796f] to-[#354f52] hover:from-[#44655c] hover:to-[#2c4144] transition-all shadow-md shadow-[#52796f]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Next: Personal Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: Personal, Campus, Course & Section Details */}
            {registerStep === 2 && (
              <form onSubmit={handleRegisterFinal} className="space-y-3.5">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2f3e46] dark:text-[#cad2c5] mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Raj"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                    />
                  </div>
                </div>

                {/* Student ID & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2f3e46] dark:text-[#cad2c5] mb-1">
                      Student ID / Roll No. *
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        placeholder="GEHU/2023/1084"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2f3e46] dark:text-[#cad2c5] mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 9876543210"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Campus Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2f3e46] dark:text-[#cad2c5] mb-1">
                    Campus *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      value={campus}
                      onChange={(e) => setCampus(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white cursor-pointer"
                    >
                      <option value="Haldwani" className="dark:bg-zinc-900">GEHU - Haldwani Campus</option>
                      <option value="Bhimtal" className="dark:bg-zinc-900">GEHU - Bhimtal Campus</option>
                      <option value="Dehradun" className="dark:bg-zinc-900">GEU / GEHU - Dehradun Campus</option>
                    </select>
                  </div>
                </div>

                {/* Course & Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2f3e46] dark:text-[#cad2c5] mb-1">
                      Course / Program *
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white cursor-pointer"
                      >
                        <option value="B.Tech CSE" className="dark:bg-zinc-900">B.Tech CSE</option>
                        <option value="B.Tech AI/ML" className="dark:bg-zinc-900">B.Tech AI/ML</option>
                        <option value="BCA" className="dark:bg-zinc-900">BCA</option>
                        <option value="MCA" className="dark:bg-zinc-900">MCA</option>
                        <option value="B.Tech ME/EE/ECE" className="dark:bg-zinc-900">B.Tech ME/EE/ECE</option>
                        <option value="B.Sc IT / CS" className="dark:bg-zinc-900">B.Sc IT / CS</option>
                        <option value="BBA / MBA" className="dark:bg-zinc-900">BBA / MBA</option>
                        <option value="Other Program" className="dark:bg-zinc-900">Other Program</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2f3e46] dark:text-[#cad2c5] mb-1">
                      Section *
                    </label>
                    <div className="relative">
                      <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Section A"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setRegisterStep(1)}
                    className="py-2.5 px-4 rounded-xl border border-black/10 dark:border-white/10 text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#52796f] to-[#354f52] hover:from-[#44655c] hover:to-[#2c4144] transition-all shadow-md shadow-[#52796f]/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating Student Profile...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Registration</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Complete / Success */}
            {registerStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#2f3e46] dark:text-white">
                    Registration Complete!
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Welcome <span className="font-semibold text-[#2f3e46] dark:text-white">{fullName}</span>, your student account is active.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 text-xs text-left space-y-1.5 text-zinc-700 dark:text-zinc-300 font-mono">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Roll ID:</span>
                    <span className="font-bold">{studentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Campus:</span>
                    <span className="font-bold">GEHU - {campus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course & Sec:</span>
                    <span className="font-bold">{course} ({section})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-bold">{email}</span>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="w-full py-3 rounded-xl bg-[#52796f] hover:bg-[#44655c] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
