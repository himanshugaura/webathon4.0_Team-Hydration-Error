"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Award,
  HeartHandshake,
  Download,
  Building,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  ArrowRight,
  ExternalLink,
  Users,
  Briefcase,
  Zap,
  Star,
  Check,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";

// Tiered Sponsor Data from PRD & Problem Statement
const SPONSORS_DATA = {
  title: [
    {
      name: "TechCorp",
      tier: "Title Sponsor",
      role: "Official Cloud & Infrastructure Partner",
      tagline: "Building resilient distributed cloud systems for the next decade.",
      quote: "NIRVAN '26 represents the pinnacle of student engineering in Northern India. We're proud to empower every builder with enterprise compute.",
      leader: "Devendra Mehta • VP of Engineering",
      perks: [
        "$2,500 in Cloud Compute Credits per winning team",
        "Direct interview fast-track for top 5 HackSprint finalists",
        "Interactive Kubernetes & Distributed Cloud booth on Day 1",
      ],
      website: "https://techcorp.example.com",
    },
    {
      name: "Zeopto",
      tier: "Title Sponsor",
      role: "Next-Gen AI & Acceleration Partner",
      tagline: "Pioneering intelligent autonomous AI systems and deep-tech innovation.",
      quote: "The next generation of AI breakthroughs will start in university labs. Zeopto is committed to backing audacious student ideas.",
      leader: "Dr. Kavita Narang • Chief AI Scientist",
      perks: [
        "Special AI Track Prize Pool of ₹25,000",
        "Free Zeopto AI API Sandbox keys for all 500+ participants",
        "Hands-on Autonomous Agent Masterclass by Zeopto engineers",
      ],
      website: "https://zeopto.example.com",
    },
  ],
  gold: [
    {
      name: "DevLabs",
      category: "Developer Tooling",
      offer: "Free Pro tier developer subscriptions & API tooling access.",
    },
    {
      name: "CloudNova",
      category: "High-Performance VMs",
      offer: "Dedicated GPU compute instances for AI & CTF challenges.",
    },
    {
      name: ".xyz",
      category: "Web3 & Domains",
      offer: "Free 1-year .xyz domains + SSL certificates for every team project.",
    },
    {
      name: "lovable.Ai",
      category: "Generative AI Systems",
      offer: "Early access tokens for next-gen full-stack generative prototyping.",
    },
    {
      name: "HackNest",
      category: "Hackathon Platform",
      offer: "Global leaderboard hosting, judging portal & automated test runners.",
    },
  ],
  community: [
    {
      name: "GitHub Community",
      type: "Global Ecosystem Partner",
      desc: "Providing GitHub Student Developer Packs, Copilot access, and verified open-source badges.",
    },
    {
      name: "GDG (Google Developer Groups)",
      type: "Developer Network",
      desc: "Conducting technical mentorship circles and expert judge representation across all tracks.",
    },
  ],
};

const TIER_BENEFITS = [
  {
    feature: "Logo on Main Stage LED Wall & Website",
    title: true,
    gold: true,
    silver: true,
  },
  {
    feature: "Dedicated Interactive Booth at GEHU Quad",
    title: "15x15 ft Premium",
    gold: "10x10 ft Standard",
    silver: "Shared Kiosk",
  },
  {
    feature: "Keynote / Masterclass Speaking Slot",
    title: "30 Min Keynote",
    gold: "15 Min Workshop",
    silver: "—",
  },
  {
    feature: "Direct Access to Student Resumes / GitHubs",
    title: "All 500+ Resumes",
    gold: "Finalist Resumes (Top 100)",
    silver: "Opt-in Only",
  },
  {
    feature: "Custom Challenge Track & Dedicated Prize",
    title: true,
    gold: true,
    silver: false,
  },
  {
    feature: "Swag Bag Distribution to All Attendees",
    title: true,
    gold: true,
    silver: true,
  },
];

export default function SponsorsPage() {
  const [downloading, setDownloading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    tier: "Gold Tier",
    message: "",
  });

  const handleDownloadProspectus = () => {
    setDownloading(true);
    setTimeout(() => {
      alert("NIRVAN '26 Sponsorship Prospectus (PDF) downloaded successfully!");
      setDownloading(false);
    }, 800);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#f7f9f7] via-[#eef2ee] to-[#e4eae4] dark:from-[#0d1611] dark:via-[#132018] dark:to-[#0a110d] transition-colors duration-500">
      
      {/* Background Soft Organic Glows (Strictly Sage & Emerald, No Blue/Purple) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#84a98c]/20 dark:bg-[#52796f]/15 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#52796f]/15 dark:bg-[#84a98c]/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-[28rem] h-[28rem] rounded-full bg-[#354f52]/15 dark:bg-[#2f3e46]/30 blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(rgba(82, 121, 111, 0.8) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-16 sm:space-y-24">
        
        {/* =========================================================
            HERO & PARTNERSHIP PHILOSOPHY
           ========================================================= */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-[#15231c]/80 backdrop-blur-md border border-white/60 dark:border-[#84a98c]/25 text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] shadow-sm">
            <HeartHandshake className="w-3.5 h-3.5 text-[#52796f] dark:text-[#84a98c]" />
            <span>INDUSTRY PATRONS & PARTNERS • NIRVAN '26</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#2f3e46] dark:text-[#cad2c5]">
            Powering Student Innovation
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Our sponsors don’t just put logos on banners — they provide the cloud compute, developer tooling, mentorship, and career pathways that empower over 500+ student innovators to turn ideas into reality.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleDownloadProspectus}
              disabled={downloading}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#52796f] to-[#354f52] hover:from-[#44655c] hover:to-[#2c4144] text-white text-xs font-semibold shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? "Downloading..." : "Download Sponsorship Prospectus (PDF)"}</span>
            </button>

            <a
              href="#sponsor-contact"
              className="px-6 py-3 rounded-2xl bg-white/60 dark:bg-[#15231c]/80 backdrop-blur-md border border-black/10 dark:border-white/10 text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] hover:border-[#84a98c] transition-all"
            >
              Partner With Us
            </a>
          </div>
        </div>

        {/* =========================================================
            TIER 1: TITLE SPONSORS (PROMINENT SHOWCASE)
           ========================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#2f3e46] dark:text-white">
                Title Sponsors
              </h2>
            </div>
            <span className="text-xs font-mono text-[#52796f] dark:text-[#84a98c]">
              Anchor Industry Leaders
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SPONSORS_DATA.title.map((sponsor) => (
              <div
                key={sponsor.name}
                className="rounded-3xl p-7 sm:p-9 bg-white/75 dark:bg-[#15231c]/85 backdrop-blur-2xl border-2 border-[#52796f]/35 dark:border-[#84a98c]/35 shadow-lg space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black font-mono text-[#2f3e46] dark:text-white tracking-tight">
                      {sponsor.name}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                      {sponsor.tier}
                    </span>
                  </div>

                  <p className="text-xs font-mono font-bold text-[#52796f] dark:text-[#84a98c]">
                    {sponsor.role}
                  </p>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {sponsor.tagline}
                  </p>

                  {/* Leader Quote */}
                  <div className="p-4 rounded-2xl bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/5 space-y-2">
                    <p className="text-xs italic text-[#2f3e46] dark:text-[#cad2c5] leading-relaxed">
                      "{sponsor.quote}"
                    </p>
                    <span className="block text-[11px] font-mono text-[#52796f] dark:text-[#84a98c]">
                      — {sponsor.leader}
                    </span>
                  </div>

                  {/* Highlights Perks */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono font-semibold text-muted-foreground uppercase">
                      SPONSOR CONTRIBUTION TO DELEGATES
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#2f3e46] dark:text-[#cad2c5]">
                      {sponsor.perks.map((perk, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">GEHU CAMPUS BOOTH: CENTRAL QUAD</span>
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#52796f] dark:text-[#84a98c] hover:underline flex items-center gap-1"
                  >
                    <span>Visit Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            TIER 2: GOLD SPONSORS (PLATFORMS & TOOLING)
           ========================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#52796f] dark:text-[#84a98c]" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#2f3e46] dark:text-white">
                Gold Sponsors
              </h2>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              Developer Ecosystem & Tooling
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SPONSORS_DATA.gold.map((sp) => (
              <div
                key={sp.name}
                className="p-6 rounded-3xl bg-white/65 dark:bg-[#15231c]/75 backdrop-blur-2xl border border-white/60 dark:border-[#84a98c]/20 hover:border-[#52796f] dark:hover:border-[#84a98c] transition-all space-y-3 shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black font-mono text-[#2f3e46] dark:text-white group-hover:text-[#52796f] dark:group-hover:text-[#84a98c] transition-colors">
                      {sp.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#52796f]/10 dark:bg-[#84a98c]/15 text-[#52796f] dark:text-[#84a98c]">
                      {sp.category}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {sp.offer}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>GOLD TIER</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Verified Partner</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            TIER 3: COMMUNITY PARTNERS
           ========================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#52796f] dark:text-[#84a98c]" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#2f3e46] dark:text-white">
                Community & Network Partners
              </h2>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              Global Student Guilds
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SPONSORS_DATA.community.map((comm) => (
              <div
                key={comm.name}
                className="p-6 rounded-3xl bg-white/65 dark:bg-[#15231c]/75 backdrop-blur-2xl border border-white/60 dark:border-[#84a98c]/20 shadow-sm flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#52796f] to-[#354f52] p-0.5 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#2f3e46] dark:text-white font-mono">
                      {comm.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
                      {comm.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {comm.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            TIER PERKS COMPARISON MATRIX
           ========================================================= */}
        <div className="rounded-3xl p-7 sm:p-9 bg-white/70 dark:bg-[#15231c]/80 backdrop-blur-2xl border border-white/60 dark:border-[#84a98c]/25 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-mono font-semibold text-[#52796f] dark:text-[#84a98c] uppercase tracking-wider">
              SPONSORSHIP TIERS & DELIVERABLES
            </span>
            <h3 className="text-2xl font-bold text-[#2f3e46] dark:text-white mt-1">
              Package Deliverables Comparison
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-[#52796f] dark:text-[#84a98c]">
                  <th className="py-3 px-4 font-bold">SPONSOR DELIVERABLE</th>
                  <th className="py-3 px-4 font-bold text-center">TITLE TIER</th>
                  <th className="py-3 px-4 font-bold text-center">GOLD TIER</th>
                  <th className="py-3 px-4 font-bold text-center">SILVER TIER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {TIER_BENEFITS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-[#2f3e46] dark:text-[#cad2c5] font-sans">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-[#52796f] dark:text-[#84a98c]">
                      {typeof row.title === "boolean" ? (row.title ? <Check className="w-4 h-4 mx-auto text-emerald-500" /> : "—") : row.title}
                    </td>
                    <td className="py-3.5 px-4 text-center text-muted-foreground">
                      {typeof row.gold === "boolean" ? (row.gold ? <Check className="w-4 h-4 mx-auto text-emerald-500" /> : "—") : row.gold}
                    </td>
                    <td className="py-3.5 px-4 text-center text-muted-foreground">
                      {typeof row.silver === "boolean" ? (row.silver ? <Check className="w-4 h-4 mx-auto text-emerald-500" /> : "—") : row.silver}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================================
            INQUIRY & BECOME A SPONSOR SECTION
           ========================================================= */}
        <div id="sponsor-contact" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold text-[#52796f] dark:text-[#84a98c] uppercase tracking-wider">
                JOIN AS A 2026 PATRON
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2f3e46] dark:text-white mt-1">
                Partner With NIRVAN '26
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                Connect with Uttarakhand’s most prolific student engineering talent. Custom custom sponsorship packages, hardware lab sponsorship, and recruiting hackathon tracks are available.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white/70 dark:bg-[#15231c]/80 backdrop-blur-2xl border border-white/60 dark:border-[#84a98c]/25 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#52796f]/10 dark:bg-[#84a98c]/15 text-[#52796f] dark:text-[#84a98c] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-muted-foreground">PARTNERSHIPS SECRETARIAT</span>
                  <a href="mailto:nirvan@gehu.in" className="text-sm font-bold text-[#2f3e46] dark:text-white hover:underline">
                    nirvan@gehu.in
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#52796f]/10 dark:bg-[#84a98c]/15 text-[#52796f] dark:text-[#84a98c] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-muted-foreground">DIRECT HELPLINE</span>
                  <a href="tel:+911256489632" className="text-sm font-bold text-[#2f3e46] dark:text-white hover:underline">
                    +91 1256489632
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadProspectus}
                className="w-full py-3 rounded-xl border border-black/10 dark:border-white/10 text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Detailed Brochure (PDF)</span>
              </button>
            </div>
          </div>

          {/* Right: Instant Inquiry Form */}
          <div className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-white/75 dark:bg-[#15231c]/85 backdrop-blur-2xl border border-white/60 dark:border-[#84a98c]/25 shadow-lg">
            {formSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-[#2f3e46] dark:text-white">
                  Thank You for Your Interest!
                </h4>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Our sponsorships team will review your message and reach out within 24 hours with custom partnership proposals.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#52796f] text-white text-xs font-semibold shadow-md mt-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h4 className="text-lg font-bold text-[#2f3e46] dark:text-white mb-2">
                  Request a Sponsorship Discussion
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1">
                      ORGANIZATION / BRAND *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Corp"
                      value={inquiryData.companyName}
                      onChange={(e) => setInquiryData({ ...inquiryData, companyName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1">
                      CONTACT PERSON *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={inquiryData.contactPerson}
                      onChange={(e) => setInquiryData({ ...inquiryData, contactPerson: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1">
                      CORPORATE EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="partnerships@company.com"
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1">
                      PREFERRED TIER
                    </label>
                    <select
                      value={inquiryData.tier}
                      onChange={(e) => setInquiryData({ ...inquiryData, tier: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-[#15231c] border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                    >
                      <option value="Title Tier">Title Sponsor Tier</option>
                      <option value="Gold Tier">Gold Sponsor Tier</option>
                      <option value="Silver Tier">Silver Sponsor Tier</option>
                      <option value="Hackathon Track">Custom Hackathon Track</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] mb-1">
                    MESSAGE / COLLABORATION GOALS
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you'd like to achieve at NIRVAN '26..."
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#84a98c] dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#52796f] to-[#354f52] hover:from-[#44655c] hover:to-[#2c4144] transition-all shadow-md shadow-[#52796f]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Partnership Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
