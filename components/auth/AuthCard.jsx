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
import { MagicCard } from "@/components/ui/magic-card";

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

  // Register Step 2 -> Submit Final
  const handleRegisterStep2 = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !studentId || !mobile) {
      setErrorMsg("Please fill in all personal details.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRegisterStep(3); // Completed state
    }, 900);
  };

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      
      {/* Magic Card */}
      <MagicCard className="rounded-3xl p-6 sm:p-9 shadow-2xl">
        
        {/* Card Top Brand */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-2">
            <img 
              src="/gehu_logo.svg" 
              alt="GEHU Logo" 
              className="h-10 w-auto drop-shadow-md group-hover:scale-105 transition-transform" 
            />
            <span className="font-black text-2xl tracking-tight text-zinc-900 dark:text-white">
              NIRVAN <span className="text-[#EB7D00]">'26</span>
            </span>
          </Link>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
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
                ? "bg-[#2C5745] text-white shadow-md"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch("register")}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              tab === "register"
                ? "bg-[#2C5745] text-white shadow-md"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
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
            className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2"
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
                <div className="w-14 h-14 rounded-2xl bg-[#2C5745]/20 text-[#2C5745] dark:text-[#EB7D00] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Welcome Back!
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Authentication successful. Redirecting to your Dashboard...
                </p>
                <div className="pt-2">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2C5745] text-white text-xs font-semibold shadow-md hover:bg-[#234537] transition-all"
                  >
                    <span>Enter Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      required
                      placeholder="student@gehu.ac.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5745] dark:focus:ring-[#EB7D00] dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert("Password reset link has been dispatched to your email address.")}
                      className="text-xs text-[#2C5745] dark:text-[#EB7D00] hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5745] dark:focus:ring-[#EB7D00] dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-zinc-300 text-[#2C5745] focus:ring-[#2C5745]"
                    />
                    <span>Remember my session</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#2C5745] hover:bg-[#234537] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* ===================== REGISTER STUDENT ===================== */}
        {tab === "register" && (
          <div>
            {/* Step Indicators */}
            {registerStep < 3 && (
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className={`w-8 h-1.5 rounded-full transition-all ${registerStep === 1 ? "bg-[#2C5745]" : "bg-[#2C5745]/30"}`} />
                <span className={`w-8 h-1.5 rounded-full transition-all ${registerStep === 2 ? "bg-[#2C5745]" : "bg-black/10 dark:bg-white/10"}`} />
              </div>
            )}

            {/* Step 1: Email and Password */}
            {registerStep === 1 && (
              <form onSubmit={handleRegisterStep1} className="space-y-4">
                <div className="text-left mb-2">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Step 1: Account Credentials</h4>
                  <p className="text-xs text-zinc-500">Create your NIRVAN portal login</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    College / Student Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      required
                      placeholder="name.id@gehu.ac.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5745] dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Minimum 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5745] dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      placeholder="Re-type password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5745] dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#2C5745] hover:bg-[#234537] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Next: Personal Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Step 2: Personal and Academic Details */}
            {registerStep === 2 && (
              <form onSubmit={handleRegisterStep2} className="space-y-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Step 2: Student Details</h4>
                    <p className="text-xs text-zinc-500">Academic profile & contact</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRegisterStep(1)}
                    className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Raj"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5745] dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                      Student ID / Roll
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="GEHU/2023/..."
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5745] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                      Campus
                    </label>
                    <select
                      value={campus}
                      onChange={(e) => setCampus(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5745] dark:text-white"
                    >
                      <option value="Haldwani">Haldwani</option>
                      <option value="Bhimtal">Bhimtal</option>
                      <option value="Dehradun">Dehradun</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                      Course
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="B.Tech CSE"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5745] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                      Section
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Sec A"
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5745] dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5745] dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#2C5745] hover:bg-[#234537] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 3: Registration Success */}
            {registerStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#2C5745]/20 text-[#2C5745] dark:text-[#EB7D00] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
                    Registration Successful!
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Welcome to NIRVAN &apos;26, <span className="font-bold text-zinc-900 dark:text-white">{fullName}</span>. Your student profile is active.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-left text-xs space-y-1.5 font-medium">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Student ID:</span>
                    <span className="font-bold">{studentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Campus:</span>
                    <span className="font-bold">{campus} Campus</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Program:</span>
                    <span className="font-bold">{course} ({section})</span>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#2C5745] hover:bg-[#234537] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Go to My Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}

          </div>
        )}

      </MagicCard>

    </div>
  );
}
