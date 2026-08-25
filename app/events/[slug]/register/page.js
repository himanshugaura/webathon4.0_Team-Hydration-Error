"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  UserPlus,
  Send,
  Link as LinkIcon
} from "lucide-react";
import { data } from "@/lib/data";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { MagicCard } from "@/components/ui/magic-card";

// Mock logged-in student account session
const currentStudent = {
  name: "Aryan Raj",
  email: "aryan.raj@gehu.ac.in",
  studentId: "GEHU/2023/1084",
  campus: "GEHU - Haldwani Campus",
  course: "B.Tech CSE",
  section: "Section A",
  mobile: "+91 98765 43210"
};

export default function EventRegistrationPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;

  const event = data.events.find(
    (e) => e.slug === slug || e.id === slug
  );

  if (!event) {
    notFound();
  }

  // Event specific form state (No re-entering personal details)
  const [formData, setFormData] = useState({
    teamName: `${currentStudent.name.split(" ")[0]}'s Squad`,
    teamSize: event.teamSize.min === 1 ? "1 (Solo)" : `${event.teamSize.min}`,
    teamMemberNames: "",
    agreeToTerms: false
  });

  const [inviteEmail, setInviteEmail] = useState("");
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic invite code
  const teamInviteCode = `NIRVAN-${event.slug.toUpperCase().slice(0, 5)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const teamInviteLink = `https://nirvan.gehu.in/team/join?code=${teamInviteCode}`;

  // Generate dynamic team size options based on event specs
  const teamOptions = [];
  for (let i = event.teamSize.min; i <= event.teamSize.max; i++) {
    teamOptions.push(i === 1 ? "1 (Solo)" : `${i} Members`);
  }

  const isSolo = formData.teamSize === "1 (Solo)";
  const isTeamEvent = event.teamSize.max > 1;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInvitedMembers((prev) => [...prev, inviteEmail.trim()]);
    setInviteEmail("");
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(teamInviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-[#2C5745] dark:hover:text-[#EB7D00] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to {event.name}</span>
          </Link>
        </div>

        {/* 2-Column Registration Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Schematic Registration Form Card */}
          <div className="lg:col-span-8">
            <MagicCard className="rounded-3xl p-6 sm:p-10 shadow-sm">
              
              {/* Form Header */}
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">
                  Register for {event.name}
                </h1>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal">
                  Your student identity is verified from your active portal session. Configure your participation below.
                </p>
                <div className="h-px bg-zinc-300/60 dark:bg-zinc-800 mt-6" />
              </div>

              {isSubmitted ? (
                /* Success State Card */
                <div className="py-8 px-4 text-center flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 rounded-full bg-[#2C5745]/15 border border-[#2C5745]/30 flex items-center justify-center text-[#2C5745] dark:text-[#EB7D00] shadow-lg">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2 max-w-lg">
                    <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                      Registration Confirmed!
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                      <span className="font-bold text-zinc-900 dark:text-white">{currentStudent.name}</span>, you are officially registered for <span className="font-bold text-zinc-900 dark:text-white">{event.name}</span>. A confirmation pass has been dispatched to <span className="font-bold text-[#2C5745] dark:text-[#EB7D00]">{currentStudent.email}</span>.
                    </p>
                  </div>

                  {/* Team Invite Box if Team Event */}
                  {isTeamEvent && (
                    <div className="w-full max-w-lg p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 text-left space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                          <UserPlus className="w-4 h-4 text-[#2C5745] dark:text-[#EB7D00]" />
                          <span>Team Invite Link</span>
                        </span>
                        <span className="text-[11px] font-mono font-bold bg-[#2C5745]/15 text-[#2C5745] dark:text-[#EB7D00] px-2 py-0.5 rounded-md border border-[#2C5745]/20">
                          {teamInviteCode}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Share this link with your squad members to let them join your team roster directly:
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={teamInviteLink}
                          className="flex-1 px-3 py-2 text-xs font-mono rounded-lg bg-white dark:bg-black/50 border border-zinc-300 dark:border-zinc-700 select-all"
                        />
                        <button
                          onClick={handleCopyLink}
                          className="px-4 py-2 rounded-lg bg-[#2C5745] hover:bg-[#234537] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                        >
                          {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedLink ? "Copied!" : "Copy"}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-300/60 dark:border-zinc-700/60 text-left w-full max-w-lg space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Student Name:</span>
                      <span className="font-bold">{currentStudent.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Roll Number:</span>
                      <span className="font-mono font-bold">{currentStudent.studentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Participation Format:</span>
                      <span className="font-bold">{formData.teamSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Date & Venue:</span>
                      <span className="font-bold">{formattedDate} · {event.venue}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full max-w-lg">
                    <Link
                      href="/dashboard"
                      className="flex-1 py-3.5 px-6 rounded-xl bg-[#2C5745] hover:bg-[#234537] dark:bg-[#EB7D00] dark:hover:bg-[#d47000] text-white dark:text-black font-bold text-sm text-center shadow-md transition-all"
                    >
                      View on My Dashboard
                    </Link>
                    <Link
                      href="/events"
                      className="flex-1 py-3.5 px-6 rounded-xl bg-zinc-200/80 hover:bg-zinc-300/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-sm text-center transition-all"
                    >
                      Explore Other Events
                    </Link>
                  </div>
                </div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Section 1: Pre-filled Student Identity Card */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-zinc-100/70 dark:bg-zinc-800/50 border border-zinc-300/70 dark:border-zinc-700/70 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#2C5745] text-white flex items-center justify-center font-bold text-base shadow-sm">
                          {currentStudent.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base text-zinc-900 dark:text-white">
                              {currentStudent.name}
                            </span>
                          </div>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                            {currentStudent.email}
                          </span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                        <div className="font-mono font-bold text-zinc-900 dark:text-zinc-200">
                          {currentStudent.studentId}
                        </div>
                        <div>{currentStudent.course} ({currentStudent.section})</div>
                        <div className="text-zinc-500">{currentStudent.campus}</div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Team Configuration */}
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-lg sm:text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                        <Users className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                        <span>Team Configuration</span>
                      </div>

                      {/* Invite Button for Team Events */}
                      {isTeamEvent && !isSolo && (
                        <button
                          type="button"
                          onClick={() => setShowInviteModal(true)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2C5745]/15 dark:bg-[#EB7D00]/15 hover:bg-[#2C5745]/25 text-[#2C5745] dark:text-[#EB7D00] text-xs font-bold border border-[#2C5745]/30 dark:border-[#EB7D00]/30 transition-all cursor-pointer"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Invite Teammates</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Team Size Dropdown */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                          Team Size
                        </label>
                        <select
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl bg-white/60 dark:bg-black/40 border border-zinc-300 dark:border-zinc-700/80 focus:ring-2 focus:ring-[#2C5745]/50 dark:focus:ring-[#EB7D00]/50 outline-none text-zinc-900 dark:text-white transition-all text-sm sm:text-base cursor-pointer"
                        >
                          {teamOptions.map((opt) => (
                            <option key={opt} value={opt} className="dark:bg-zinc-900">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Team Name if Team Event */}
                      {isTeamEvent && !isSolo ? (
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                            Squad / Team Name
                          </label>
                          <input
                            type="text"
                            name="teamName"
                            required
                            value={formData.teamName}
                            onChange={handleChange}
                            placeholder="e.g. CodeCraft Squad"
                            className="w-full px-4 py-3.5 rounded-xl bg-white/60 dark:bg-black/40 border border-zinc-300 dark:border-zinc-700/80 focus:ring-2 focus:ring-[#2C5745]/50 dark:focus:ring-[#EB7D00]/50 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-sm sm:text-base transition-all"
                          />
                        </div>
                      ) : (
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                            Participation Mode
                          </label>
                          <input
                            type="text"
                            readOnly
                            value="Solo Competitor"
                            className="w-full px-4 py-3.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800/60 text-zinc-500 dark:text-zinc-400 text-sm sm:text-base select-none cursor-not-allowed"
                          />
                        </div>
                      )}
                    </div>

                    {/* Invite Box inside Team Configuration if not solo */}
                    {isTeamEvent && !isSolo && (
                      <div className="p-4 rounded-2xl bg-zinc-100/70 dark:bg-zinc-800/50 border border-zinc-300/70 dark:border-zinc-700/70 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                            <LinkIcon className="w-3.5 h-3.5 text-[#2C5745] dark:text-[#EB7D00]" />
                            <span>Shareable Squad Invite Link:</span>
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyLink}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#2C5745] dark:text-[#EB7D00] hover:underline cursor-pointer"
                          >
                            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedLink ? "Invite Link Copied!" : "Copy Team Link"}</span>
                          </button>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Teammates who join using this link or your team code will be added directly into your squad roster.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Section Divider */}
                  <div className="h-px bg-zinc-300/60 dark:bg-zinc-800" />

                  {/* Agree to Terms */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      required
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-[#2C5745] focus:ring-[#2C5745] cursor-pointer"
                    />
                    <label htmlFor="agreeToTerms" className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
                      I confirm my participation and agree to abide by the rules and code of conduct for {event.name} at NIRVAN &apos;26.
                    </label>
                  </div>

                  {/* Submit Button aligned right */}
                  <div className="flex justify-end pt-2">
                    <ShimmerButton
                      type="submit"
                      disabled={isSubmitting}
                      background="#2C5745"
                      shimmerColor="#EB7D00"
                      className="w-full sm:w-auto py-4 px-10 rounded-2xl text-white font-bold text-base shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>Confirming Registration...</span>
                      ) : (
                        <>
                          <span>Confirm Registration</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </ShimmerButton>
                  </div>
                </form>
              )}

            </MagicCard>
          </div>

          {/* Right Column: Event Summary Sidebar Card */}
          <div className="lg:col-span-4 space-y-6">
            <MagicCard className="rounded-3xl p-6 sm:p-8 shadow-sm">
              
              {/* Summary Header with Calendar Icon */}
              <div className="flex items-center gap-2.5 mb-6">
                <Calendar className="w-5 h-5 text-[#2C5745] dark:text-[#EB7D00]" />
                <h2 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                  Event Summary
                </h2>
              </div>

              <div className="h-px bg-zinc-300/60 dark:bg-zinc-800 mb-6" />

              {/* Key-Value Summary List */}
              <div className="space-y-4 text-sm">
                
                {/* Event Name */}
                <div className="flex justify-between items-center py-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Event</span>
                  <span className="font-bold text-zinc-900 dark:text-white text-right">{event.name}</span>
                </div>

                {/* Date */}
                <div className="flex justify-between items-center py-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Date</span>
                  <span className="font-bold text-zinc-900 dark:text-white text-right">{formattedDate}</span>
                </div>

                {/* Venue */}
                <div className="flex justify-between items-center py-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Venue</span>
                  <span className="font-bold text-zinc-900 dark:text-white text-right">{event.venue}</span>
                </div>

                {/* Format / Category */}
                <div className="flex justify-between items-center py-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Format</span>
                  <span className="font-bold text-zinc-900 dark:text-white text-right">{event.category}</span>
                </div>

                {/* Fee */}
                <div className="flex justify-between items-center py-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Fee</span>
                  <span className="font-bold text-zinc-900 dark:text-white text-right">
                    {event.fee > 0 ? `₹${event.fee}` : "Free"}
                  </span>
                </div>

                {/* Prize Pool */}
                {event.prizePool > 0 && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium">Prize Pool</span>
                    <span className="font-black text-[#2C5745] dark:text-[#EB7D00] text-right">
                      ₹{event.prizePool.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>

              {/* Location Map Placeholder Card */}
              <div className="mt-8 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-zinc-300/80 dark:border-zinc-700/80 bg-zinc-100 dark:bg-zinc-800/50 flex flex-col items-center justify-center text-center p-4 group">
                  
                  <div className="absolute inset-0 opacity-15 dark:opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
                  
                  <svg className="absolute inset-0 w-full h-full stroke-zinc-300 dark:stroke-zinc-700/50" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="100%" y2="100%" strokeWidth="1" />
                    <line x1="100%" y1="0" x2="0" y2="100%" strokeWidth="1" />
                  </svg>

                  <div className="relative z-10 flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-[#AE2448]">
                      <MapPin className="w-5 h-5 fill-[#AE2448]/20" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 bg-white/90 dark:bg-black/90 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
                      {event.venue}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Graphic Era Hill University Campus
                    </span>
                  </div>
                </div>
              </div>

            </MagicCard>
          </div>

        </div>

      </div>

      {/* Team Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#2C5745] dark:text-[#EB7D00]" />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Invite Squad Members
                </h3>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Invite teammates to join your <span className="font-semibold text-zinc-900 dark:text-white">{event.name}</span> team roster by sending them an invitation or sharing your team link.
            </p>

            <form onSubmit={handleSendInvite} className="space-y-2">
              <label className="block text-xs font-bold uppercase text-zinc-500">Invite via Student Email / ID</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="teammate@gehu.ac.in"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-black/50 border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5745]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#2C5745] hover:bg-[#234537] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Invite</span>
                </button>
              </div>
            </form>

            {invitedMembers.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase text-zinc-500">Invited Teammates:</span>
                <div className="space-y-1">
                  {invitedMembers.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      <span>{m}</span>
                      <span className="text-[10px] font-semibold text-[#EB7D00] bg-[#EB7D00]/10 px-2 py-0.5 rounded">Pending</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Or Share Team Invite Code:</span>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  {teamInviteCode}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-xl bg-[#2C5745] hover:bg-[#234537] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowInviteModal(false)}
              className="w-full py-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
