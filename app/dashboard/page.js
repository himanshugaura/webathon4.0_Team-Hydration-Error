"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  GraduationCap,
  Building2,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  UserPlus,
  QrCode,
  Download,
  Share2,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Send,
  ExternalLink,
  Layers,
  Award,
  ChevronRight
} from "lucide-react";
import { data } from "@/lib/data";

// Mock student profile data
const mockStudent = {
  name: "Aryan Raj",
  email: "aryan.raj@gehu.ac.in",
  studentId: "GEHU/2023/1084",
  campus: "GEHU - Haldwani Campus",
  course: "B.Tech Computer Science & Engineering",
  section: "Section A (3rd Year)",
  phone: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
};

// Mock participated events data
const mockParticipatedEvents = [
  {
    id: "hackathon",
    slug: "hacksprint",
    name: "HackSprint",
    category: "Hackathon",
    tag: "TECH",
    role: "Team Leader",
    teamName: "CodeCraft Squad",
    status: "Confirmed",
    date: "Oct 25, 2026",
    time: "18:00 (12 Hours)",
    venue: "Innovation Hub",
    prizePool: "₹30,000",
    teamSize: "3 / 4 Members",
    teamCode: "NIRVAN-HACK-8492",
    members: [
      { name: "Aryan Raj", role: "Leader (You)", status: "Active" },
      { name: "Priyanshu Sharma", role: "Frontend Developer", status: "Active" },
      { name: "Sneha Bisht", role: "UI/UX Designer", status: "Active" },
    ],
    passToken: "NIRVAN26-HACK-PASS-9081"
  },
  {
    id: "coding",
    slug: "coderush",
    name: "CodeRush",
    category: "Competitive Programming",
    tag: "TECH",
    role: "Solo Participant",
    teamName: "Individual",
    status: "Confirmed",
    date: "Oct 25, 2026",
    time: "10:00 (3 Hours)",
    venue: "Computer Lab 1",
    prizePool: "₹15,000",
    teamSize: "Solo (1)",
    teamCode: null,
    members: [
      { name: "Aryan Raj", role: "Competitor (You)", status: "Active" }
    ],
    passToken: "NIRVAN26-CODE-PASS-4412"
  },
  {
    id: "ctf",
    slug: "ctf-cyberquest",
    name: "CTF: CyberQuest",
    category: "Cybersecurity",
    tag: "TECH",
    role: "Team Member",
    teamName: "ZeroDay Hunters",
    status: "Confirmed",
    date: "Oct 25, 2026",
    time: "16:00 (3 Hours)",
    venue: "Open Ground",
    prizePool: "₹12,000",
    teamSize: "2 / 3 Members",
    teamCode: "NIRVAN-CTF-3190",
    members: [
      { name: "Kavya Joshi", role: "Team Leader", status: "Active" },
      { name: "Aryan Raj", role: "Security Analyst (You)", status: "Active" }
    ],
    passToken: "NIRVAN26-CTF-PASS-7821"
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'team' | 'solo'
  const [selectedInviteEvent, setSelectedInviteEvent] = useState(null);
  const [selectedPassEvent, setSelectedPassEvent] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Filter events
  const filteredEvents = mockParticipatedEvents.filter((ev) => {
    if (activeTab === "team") return ev.role.includes("Team");
    if (activeTab === "solo") return ev.role.includes("Solo");
    return true;
  });

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteEmail("");
      setInviteSuccess(false);
    }, 2500);
  };

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        
        {/* Profile & Welcome Header Card */}
        <div className="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-300/70 dark:border-zinc-800/80 p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Student Info */}
            <div className="flex items-center gap-5">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#00ffc6]/40 shadow-md shrink-0">
                <img
                  src={mockStudent.avatar}
                  alt={mockStudent.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                    {mockStudent.name}
                  </h1>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>{mockStudent.studentId}</span>
                  <span>•</span>
                  <span>{mockStudent.course} ({mockStudent.section})</span>
                </p>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 pt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-[#007a70] dark:text-[#00ffc6]" />
                  <span>{mockStudent.campus}</span>
                </p>
              </div>
            </div>

            {/* Quick Action Link to Explore More */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/events"
                className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Browse More Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Section: My Participated Events */}
        <div className="space-y-6">
          
          {/* Section Header & Tab Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                My Registered Events
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                View your schedule, manage team squad members, and access your entry passes.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center p-1 rounded-2xl bg-zinc-200/70 dark:bg-zinc-800/80 border border-zinc-300/60 dark:border-zinc-700/60 self-start">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-white dark:bg-black text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                All (3)
              </button>
              <button
                onClick={() => setActiveTab("team")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "team"
                    ? "bg-white dark:bg-black text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Team Events (2)
              </button>
              <button
                onClick={() => setActiveTab("solo")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "solo"
                    ? "bg-white dark:bg-black text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Solo (1)
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredEvents.map((ev) => {
              const isTeam = ev.role.includes("Team");
              
              return (
                <div
                  key={ev.id}
                  className="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-300/70 dark:border-zinc-800/80 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-5">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                          {ev.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {ev.status}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          {ev.role}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                        {ev.name}
                      </h3>
                      
                      {isTeam && (
                        <p className="text-xs font-semibold text-[#007a70] dark:text-[#00ffc6]">
                          Team: {ev.teamName} ({ev.teamSize})
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {isTeam && (
                        <button
                          onClick={() => setSelectedInviteEvent(ev)}
                          className="px-4 py-2.5 rounded-xl bg-[#52796f]/15 dark:bg-[#84a98c]/20 hover:bg-[#52796f]/25 text-[#2f3e46] dark:text-[#cad2c5] font-bold text-xs border border-[#52796f]/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <UserPlus className="w-3.5 h-3.5 text-[#007a70] dark:text-[#00ffc6]" />
                          <span>Invite Teammates</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedPassEvent(ev)}
                        className="px-4 py-2.5 rounded-xl bg-zinc-200/80 hover:bg-zinc-300/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Entry Pass</span>
                      </button>

                      <Link
                        href={`/events/${ev.slug}`}
                        className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Event Specific Specs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="block text-zinc-500 dark:text-zinc-400 font-medium mb-0.5">Date & Time</span>
                      <span className="font-bold text-zinc-900 dark:text-white">{ev.date} · {ev.time}</span>
                    </div>

                    <div>
                      <span className="block text-zinc-500 dark:text-zinc-400 font-medium mb-0.5">Venue</span>
                      <span className="font-bold text-zinc-900 dark:text-white">{ev.venue}</span>
                    </div>

                    <div>
                      <span className="block text-zinc-500 dark:text-zinc-400 font-medium mb-0.5">Prize Pool</span>
                      <span className="font-black text-[#007a70] dark:text-[#00ffc6]">{ev.prizePool}</span>
                    </div>

                    <div>
                      <span className="block text-zinc-500 dark:text-zinc-400 font-medium mb-0.5">Pass Token</span>
                      <span className="font-mono text-zinc-700 dark:text-zinc-300 font-bold">{ev.passToken.slice(0, 14)}...</span>
                    </div>
                  </div>

                  {/* Team Members Roster if team event */}
                  {isTeam && (
                    <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                        Squad Roster
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {ev.members.map((m, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-xs font-semibold"
                          >
                            <div className="w-5 h-5 rounded-full bg-[#52796f] text-white flex items-center justify-center text-[10px] font-bold">
                              {m.name.charAt(0)}
                            </div>
                            <span className="text-zinc-800 dark:text-zinc-200">{m.name}</span>
                            <span className="text-[10px] text-zinc-500">({m.role})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Invite Teammates Modal */}
      {selectedInviteEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#007a70] dark:text-[#00ffc6]" />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Invite to {selectedInviteEvent.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInviteEvent(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Share your team invite code or send direct invites to teammates for team <span className="font-bold text-zinc-900 dark:text-white">{selectedInviteEvent.teamName}</span>.
            </p>

            {/* Copyable Team Code */}
            <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 space-y-2">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Team Code:</span>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-black/50 font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800">
                  {selectedInviteEvent.teamCode}
                </div>
                <button
                  onClick={() => handleCopy(selectedInviteEvent.teamCode)}
                  className="px-3.5 py-2 rounded-xl bg-[#52796f] hover:bg-[#44655c] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Email Invite Form */}
            <form onSubmit={handleSendInvite} className="space-y-2 pt-2">
              <label className="block text-xs font-bold uppercase text-zinc-500">Invite Teammate via Email</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="teammate@gehu.ac.in"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-black/50 border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00ffc6]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
              {inviteSuccess && (
                <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Invitation dispatched successfully!</span>
                </p>
              )}
            </form>

            <button
              onClick={() => setSelectedInviteEvent(null)}
              className="w-full py-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Digital Fest Pass Modal */}
      {selectedPassEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-[#84a98c]/40 p-6 sm:p-8 shadow-2xl text-center space-y-5 relative overflow-hidden">
            
            {/* Top Pass Brand */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-[#007a70] dark:text-[#00ffc6]">
                NIRVAN '26 Entry Pass
              </span>
              <button
                onClick={() => setSelectedPassEvent(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* QR Mock Code Box */}
            <div className="w-44 h-44 mx-auto rounded-2xl bg-white p-3 border-2 border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center shadow-inner">
              {/* QR Pattern visual */}
              <div className="w-full h-full border border-dashed border-zinc-400 flex flex-col items-center justify-center text-zinc-800 space-y-1">
                <QrCode className="w-24 h-24 text-zinc-900" />
                <span className="text-[9px] font-mono font-bold">{selectedPassEvent.passToken.slice(0, 16)}</span>
              </div>
            </div>

            {/* Pass Meta */}
            <div className="space-y-1">
              <h4 className="text-xl font-black text-zinc-900 dark:text-white">
                {selectedPassEvent.name}
              </h4>
              <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                {mockStudent.name} • {mockStudent.studentId}
              </p>
              <p className="text-[11px] text-zinc-500">
                {selectedPassEvent.date} · {selectedPassEvent.venue}
              </p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => alert("Downloading Official Digital Pass PDF...")}
                className="flex-1 py-3 rounded-xl bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Pass</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
