"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesText } from "@/components/ui/sparkles-text";
import {
  Sparkles,
  Award,
  Users,
  Code2,
  Cpu,
  Shield,
  Zap,
  Globe,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Download,
  Calendar,
  Layers,
  Terminal,
  Compass,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Building,
  HeartHandshake,
  Star,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

// Sponsors categorized by tiers (matching PRD & problem statement)
const SPONSORS = {
  title: [
    {
      name: "TechCorp",
      tagline: "Enterprise Cloud & Digital Infrastructure Partner",
      description: "Empowering developers worldwide with resilient cloud architecture and scalable developer primitives.",
      tier: "Title Sponsor",
      badgeColor: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
    },
    {
      name: "Zeopto",
      tagline: "Next-Gen AI & Tech Acceleration Partner",
      description: "Pioneering intelligent autonomous systems, accelerating deep-tech research and developer innovation.",
      tier: "Title Sponsor",
      badgeColor: "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
    },
  ],
  gold: [
    {
      name: "DevLabs",
      category: "Developer Tooling",
      role: "Official Hackathon Tooling Partner",
    },
    {
      name: "CloudNova",
      category: "Cloud Compute",
      role: "High-Performance Cloud Infrastructure",
    },
    {
      name: ".xyz",
      category: "Web3 & Domains",
      role: "Domains & Decentralized Web Partner",
    },
    {
      name: "lovable.Ai",
      category: "Generative AI",
      role: "AI Workflow & Frontend Acceleration",
    },
    {
      name: "HackNest",
      category: "Hacker Platform",
      role: "Hackathon Platform & Community Partner",
    },
  ],
  community: [
    {
      name: "GitHub Community",
      type: "Ecosystem Partner",
      desc: "Empowering student open-source contributors & student developers.",
    },
    {
      name: "GDG (Google Developer Groups)",
      type: "Tech Community",
      desc: "Fostering local tech talent through hands-on bootcamps & knowledge sharing.",
    },
  ],
};

// Tech Geeks Club Pillars & Domains
const CLUB_DOMAINS = [
  {
    icon: Code2,
    title: "Web & Distributed Systems",
    desc: "Building production-ready, ultra-fast web architectures, modern stacks, and resilient APIs.",
  },
  {
    icon: Cpu,
    title: "AI, ML & Data Science",
    desc: "Experimenting with cutting-edge LLMs, generative models, computer vision, and predictive intelligence.",
  },
  {
    icon: Shield,
    title: "Cybersecurity & CTF",
    desc: "Investigating cryptography, binary exploitation, penetration testing, and defense frameworks.",
  },
  {
    icon: Terminal,
    title: "Competitive Programming",
    desc: "Sharpening algorithmic thinking, data structures, and speed problem solving for global contests.",
  },
  {
    icon: Layers,
    title: "UI/UX & Product Design",
    desc: "Crafting intuitive digital experiences, design systems, modern typography, and motion prototypes.",
  },
  {
    icon: Zap,
    title: "Open Source & DevOps",
    desc: "Automating CI/CD pipelines, containerization, Kubernetes, and contributing to public repositories.",
  },
];

// Organizing Team Members
const ORGANIZERS = [
  {
    name: "Dr. R. K. Sharma",
    role: "Dean & Chief Convener",
    dept: "Faculty Leadership",
    bio: "Guiding the technological vision and student research initiatives across Graphic Era Hill University.",
  },
  {
    name: "Prof. Ananya Joshi",
    role: "Faculty Coordinator",
    dept: "Dept. of Computer Science & Engineering",
    bio: "Mentoring student developers and spearheading technical symposiums and academic partnerships.",
  },
  {
    name: "Aryan Raj",
    role: "President, Tech Geeks",
    dept: "Lead Fest Convener",
    bio: "Full-stack engineer & open-source enthusiast orchestrating the grand vision for NIRVAN '26.",
  },
  {
    name: "Priya Singh",
    role: "Technical Head & CTF Lead",
    dept: "Core Engineering",
    bio: "Security researcher and architect managing platform infrastructure, judge portals, and challenges.",
  },
  {
    name: "Rohan Verma",
    role: "Head of Operations & Logistics",
    dept: "Event Operations",
    bio: "Managing on-ground coordination, hospitality, scheduling, and seamless campus execution.",
  },
  {
    name: "Sneha Bhatt",
    role: "Head of Design & UI/UX",
    dept: "Creative Direction",
    bio: "Directing the visual identity, brand guidelines, merchandise, and interactive digital interfaces.",
  },
];

export default function AboutPage() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadProspectus = () => {
    setDownloaded(true);
    setTimeout(() => {
      alert("NIRVAN '26 Sponsorship Prospectus downloaded successfully!");
      setDownloaded(false);
    }, 800);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
      <div className="relative z-10 max-w-7xl mx-auto space-y-20 sm:space-y-28">
        
        {/* =========================================================
            SECTION 1: HERO & FEST ESSENCE
           ========================================================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
            Where Ideas Become <br className="hidden sm:inline" />
            <SparklesText className="text-[#2C5745] dark:text-[#EB7D00]">
              Innovation & Impact
            </SparklesText>
          </h1>

          {/* Lead Paragraph */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            NIRVAN '26 is the flagship annual technical symposium organized by{" "}
            <span className="font-semibold text-[#2f3e46] dark:text-white">Tech Geeks</span> at{" "}
            <span className="font-semibold text-[#2f3e46] dark:text-white">Graphic Era Hill University</span>, Haldwani Campus.
            A two-day celebration bridging engineering rigor with creative rebellion — empowering student builders, designers, and hackers.
          </p>

          {/* Quick Metrics Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#15231c]/70 backdrop-blur-xl border border-white/60 dark:border-[#84a98c]/20 text-center shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-[#52796f] dark:text-[#84a98c] font-mono">
                ₹1,00,000+
              </span>
              <span className="text-xs font-medium text-muted-foreground">Prize Pool</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#15231c]/70 backdrop-blur-xl border border-white/60 dark:border-[#84a98c]/20 text-center shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-[#2f3e46] dark:text-[#cad2c5] font-mono">
                500+
              </span>
              <span className="text-xs font-medium text-muted-foreground">Innovators</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#15231c]/70 backdrop-blur-xl border border-white/60 dark:border-[#84a98c]/20 text-center shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-[#52796f] dark:text-[#84a98c] font-mono">
                9+
              </span>
              <span className="text-xs font-medium text-muted-foreground">Tech Arenas</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#15231c]/70 backdrop-blur-xl border border-white/60 dark:border-[#84a98c]/20 text-center shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-[#2f3e46] dark:text-[#cad2c5] font-mono">
                2 Days
              </span>
              <span className="text-xs font-medium text-muted-foreground">GEHU Campus</span>
            </div>
          </div>
        </motion.section>


        {/* =========================================================
            SECTION 2: GRAPHIC ERA TECH CLUB ("TECH GEEKS")
           ========================================================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#52796f] dark:text-[#84a98c] uppercase tracking-wider mb-2">
                <Building className="w-4 h-4" />
                <span>The Student Tech Society</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2f3e46] dark:text-[#cad2c5]">
                About Tech Geeks Club
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-lg">
              The premier student technical community at Graphic Era Hill University. Dedicated to transforming theoretical curiosity into ship-ready software, AI models, and competitive solutions.
            </p>
          </div>

          {/* Club Story & Impact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Story Card */}
            <div className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-white/70 dark:bg-[#15231c]/80 backdrop-blur-2xl border border-white/60 dark:border-[#84a98c]/25 shadow-sm space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#52796f]/10 dark:bg-[#84a98c]/15 text-[#52796f] dark:text-[#84a98c] text-xs font-mono font-semibold">
                  <Star className="w-3.5 h-3.5" />
                  FOUNDED AT GEHU HALDWANI
                </div>
                <h3 className="text-2xl font-bold text-[#2f3e46] dark:text-white">
                  Cultivating a Culture of Builders, Hackers, & Problem Solvers
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tech Geeks was established with a singular vision: to create a thriving playground where students collaborate across disciplines, participate in global hackathons, contribute to open-source, and push the envelope of modern computing.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  From weekly code sprints and CTF training sessions to hosting Uttarakhand’s biggest hackathons, Tech Geeks bridges the gap between campus academics and industry-standard engineering.
                </p>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-black/10 dark:border-white/10 text-center">
                <div className="p-3 rounded-2xl bg-black/5 dark:bg-black/30">
                  <span className="block text-xs font-mono font-bold text-[#52796f] dark:text-[#84a98c]">01. LEARN</span>
                  <span className="text-[11px] text-muted-foreground">Workshops & Sprints</span>
                </div>
                <div className="p-3 rounded-2xl bg-black/5 dark:bg-black/30">
                  <span className="block text-xs font-mono font-bold text-[#52796f] dark:text-[#84a98c]">02. BUILD</span>
                  <span className="text-[11px] text-muted-foreground">Ship Real Projects</span>
                </div>
                <div className="p-3 rounded-2xl bg-black/5 dark:bg-black/30">
                  <span className="block text-xs font-mono font-bold text-[#52796f] dark:text-[#84a98c]">03. LEAD</span>
                  <span className="text-[11px] text-muted-foreground">National Podiums</span>
                </div>
              </div>
            </div>

            {/* Club Numbers Card */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white/70 dark:bg-[#15231c]/80 backdrop-blur-2xl border border-white/60 dark:border-[#84a98c]/25 flex flex-col justify-center text-center shadow-sm">
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#52796f] dark:text-[#84a98c]">
                  2,500+
                </span>
                <span className="text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] mt-1">
                  Community Members
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Across CS & IT streams</span>
              </div>

              <div className="p-6 rounded-3xl bg-white/70 dark:bg-[#15231c]/80 backdrop-blur-2xl border border-white/60 dark:border-[#84a98c]/25 flex flex-col justify-center text-center shadow-sm">
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#2f3e46] dark:text-white">
                  50+
                </span>
                <span className="text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] mt-1">
                  Events Organized
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Bootcamps & Sprints</span>
              </div>

              <div className="p-6 rounded-3xl bg-white/70 dark:bg-[#15231c]/80 backdrop-blur-2xl border border-white/60 dark:border-[#84a98c]/25 flex flex-col justify-center text-center shadow-sm">
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#2f3e46] dark:text-white">
                  150+
                </span>
                <span className="text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] mt-1">
                  Projects Deployed
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Open Source Software</span>
              </div>

              <div className="p-6 rounded-3xl bg-white/70 dark:bg-[#15231c]/80 backdrop-blur-2xl border border-white/60 dark:border-[#84a98c]/25 flex flex-col justify-center text-center shadow-sm">
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#52796f] dark:text-[#84a98c]">
                  12+
                </span>
                <span className="text-xs font-semibold text-[#2f3e46] dark:text-[#cad2c5] mt-1">
                  National Wins
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Smart India Hackathon & more</span>
              </div>
            </div>
          </div>

          {/* Club Technical Wings Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#2f3e46] dark:text-white font-mono flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#52796f] dark:text-[#84a98c]" />
              <span>CORE TECHNICAL WINGS & SPECIALIZATIONS</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CLUB_DOMAINS.map((domain) => {
                const Icon = domain.icon;
                return (
                  <div
                    key={domain.title}
                    className="p-5 rounded-2xl bg-white/60 dark:bg-[#15231c]/70 backdrop-blur-xl border border-white/60 dark:border-[#84a98c]/20 hover:border-[#52796f] dark:hover:border-[#84a98c] transition-all group shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#52796f]/10 dark:bg-[#84a98c]/15 text-[#52796f] dark:text-[#84a98c] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-[#2f3e46] dark:text-white mb-1">
                      {domain.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {domain.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>


        {/* =========================================================
            SECTION 3: SPONSORS & INDUSTRY PARTNERS
           ========================================================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#52796f] dark:text-[#84a98c] uppercase tracking-wider mb-2">
                <HeartHandshake className="w-4 h-4" />
                <span>Industry Backing</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2f3e46] dark:text-[#cad2c5]">
                Our Sponsors & Partners
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-lg">
              NIRVAN '26 is made possible through the generous support of our industry leaders, enabling world-class prizes, cloud credits, and career opportunities for participants.
            </p>
          </div>

          {/* Tier 1: Title Sponsors */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest text-[#52796f] dark:text-[#84a98c] uppercase">
                👑 TITLE SPONSORS
              </span>
              <span className="text-xs font-mono text-muted-foreground">Premier Partners</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SPONSORS.title.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="p-7 rounded-3xl bg-white/70 dark:bg-[#15231c]/80 backdrop-blur-2xl border-2 border-[#52796f]/30 dark:border-[#84a98c]/30 shadow-lg shadow-[#52796f]/5 relative overflow-hidden group hover:border-[#52796f] dark:hover:border-[#84a98c] transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#2f3e46] dark:text-white">
                      {sponsor.name}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${sponsor.badgeColor}`}>
                      {sponsor.tier}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#52796f] dark:text-[#84a98c] mb-2 font-mono">
                    {sponsor.tagline}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {sponsor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2: Gold Sponsors */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest text-[#52796f] dark:text-[#84a98c] uppercase">
                ⭐ GOLD SPONSORS
              </span>
              <span className="text-xs font-mono text-muted-foreground">Technology & Infrastructure</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {SPONSORS.gold.map((sp) => (
                <div
                  key={sp.name}
                  className="p-5 rounded-2xl bg-white/60 dark:bg-[#15231c]/70 backdrop-blur-xl border border-white/60 dark:border-[#84a98c]/20 hover:border-[#52796f] dark:hover:border-[#84a98c] transition-all text-center flex flex-col justify-between shadow-sm"
                >
                  <h4 className="text-base font-black font-mono text-[#2f3e46] dark:text-[#cad2c5] mb-1">
                    {sp.name}
                  </h4>
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/5 dark:bg-black/40 text-muted-foreground">
                      {sp.category}
                    </span>
                    <p className="text-[11px] text-muted-foreground line-clamp-2">
                      {sp.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 3: Community & Ecosystem Partners */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest text-[#52796f] dark:text-[#84a98c] uppercase">
                🌐 COMMUNITY & ECOSYSTEM PARTNERS
              </span>
              <span className="text-xs font-mono text-muted-foreground">Global Networks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SPONSORS.community.map((comm) => (
                <div
                  key={comm.name}
                  className="p-5 rounded-2xl bg-white/60 dark:bg-[#15231c]/70 backdrop-blur-xl border border-white/60 dark:border-[#84a98c]/20 flex items-start gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#52796f]/10 dark:bg-[#84a98c]/15 text-[#52796f] dark:text-[#84a98c] flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#2f3e46] dark:text-white font-mono">
                        {comm.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
                        {comm.type}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {comm.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Become a Sponsor CTA Banner */}
          <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-white/80 via-white/50 to-white/70 dark:from-[#1b2b23]/90 dark:via-[#15231c]/80 dark:to-[#0f1713]/90 border border-white/60 dark:border-[#84a98c]/30 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-[#2f3e46] dark:text-white">
                Interested in Sponsoring NIRVAN '26?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Partner with the region’s largest student technical symposium. Connect with 500+ top engineering talent, showcase APIs, and conduct technical workshops.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleDownloadProspectus}
                disabled={downloaded}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#52796f] to-[#354f52] hover:from-[#44655c] hover:to-[#2c4144] text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{downloaded ? "Downloading..." : "Download Prospectus (PDF)"}</span>
              </button>

              <a
                href="mailto:nirvan@gehu.in?subject=Sponsorship%20Inquiry%20NIRVAN%2026"
                className="px-6 py-3 rounded-2xl border border-black/10 dark:border-white/15 text-[#2f3e46] dark:text-[#cad2c5] text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all text-center"
              >
                Contact Partnerships
              </a>
            </div>
          </div>
        </motion.section>


        {/* =========================================================
            SECTION 4: ORGANIZING COMMITTEE & LEADERSHIP
           ========================================================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#52796f] dark:text-[#84a98c] uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" />
                <span>The People Behind The Fest</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2f3e46] dark:text-[#cad2c5]">
                Organizing Team & Mentors
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-lg">
              Committed faculty mentors and student leads collaborating to craft an unforgettable technical experience for every participant.
            </p>
          </div>

          {/* Organizers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ORGANIZERS.map((person) => (
              <div
                key={person.name}
                className="p-6 rounded-3xl bg-white/70 dark:bg-[#15231c]/80 backdrop-blur-2xl border border-white/60 dark:border-[#84a98c]/25 shadow-sm space-y-4 hover:border-[#52796f] dark:hover:border-[#84a98c] transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#52796f] to-[#354f52] p-0.5 shadow-md flex items-center justify-center text-white font-bold text-lg font-mono">
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/5 dark:bg-black/40 text-muted-foreground border border-black/5 dark:border-white/5">
                    {person.dept}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[#2f3e46] dark:text-white group-hover:text-[#52796f] dark:group-hover:text-[#84a98c] transition-colors">
                    {person.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#52796f] dark:text-[#84a98c] font-mono mt-0.5">
                    {person.role}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {person.bio}
                </p>

                <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs text-muted-foreground font-mono">
                  <span>NIRVAN '26 CORE</span>
                  <a
                    href="mailto:nirvan@gehu.in"
                    className="hover:text-[#52796f] dark:hover:text-[#84a98c] flex items-center gap-1 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Connect</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.section>


        {/* =========================================================
            SECTION 5: VENUE & DIRECT CONTACT
           ========================================================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 sm:p-12 bg-white/70 dark:bg-[#15231c]/80 backdrop-blur-2xl border border-white/60 dark:border-[#84a98c]/25 shadow-lg space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-semibold text-[#52796f] dark:text-[#84a98c] uppercase tracking-wider">
                  OFFICIAL COORDINATION & VENUE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2f3e46] dark:text-white mt-1">
                  Have Questions or Want to Collaborate?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  Reach out to the NIRVAN '26 organizing secretariat for event queries, schedule clarifications, and sponsorship details.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4 text-[#52796f] dark:text-[#84a98c]" />
                    <span>EMAIL INQUIRIES</span>
                  </div>
                  <a
                    href="mailto:nirvan@gehu.in"
                    className="block text-sm font-bold text-[#2f3e46] dark:text-white hover:underline"
                  >
                    nirvan@gehu.in
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 text-[#52796f] dark:text-[#84a98c]" />
                    <span>HELPLINE</span>
                  </div>
                  <a
                    href="tel:+911256489632"
                    className="block text-sm font-bold text-[#2f3e46] dark:text-white hover:underline"
                  >
                    +91 1256489632
                  </a>
                </div>

                <div className="sm:col-span-2 p-4 rounded-2xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-[#52796f] dark:text-[#84a98c]" />
                    <span>FEST VENUE</span>
                  </div>
                  <p className="text-sm font-bold text-[#2f3e46] dark:text-white">
                    Graphic Era Hill University, Haldwani Campus, Uttarakhand, India
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Cards */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#52796f]/15 via-[#84a98c]/10 to-transparent border border-[#84a98c]/25 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#52796f] dark:text-[#84a98c]" />
                <h4 className="font-bold text-base text-[#2f3e46] dark:text-white">
                  Join the NIRVAN '26 Journey
                </h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Registrations are open for all 9 flagship events including HackSprint, CoderRush, Cyber CTF, and E-Sports Arena.
              </p>

              <div className="space-y-2.5 pt-2">
                <Link
                  href="/register"
                  className="w-full py-3 px-4 rounded-xl bg-[#52796f] hover:bg-[#44655c] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <span>Register for Events Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/events"
                  className="w-full py-3 px-4 rounded-xl bg-white/80 dark:bg-black/40 border border-black/10 dark:border-white/10 text-[#2f3e46] dark:text-[#cad2c5] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-white dark:hover:bg-black/60 transition-all"
                >
                  <span>Explore 9 Event Arenas</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
