"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Users, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  ShieldAlert,
  Compass
} from "lucide-react";
import { data } from "@/lib/data";

export default function EventRegistrationPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;

  const event = data.events.find(
    (e) => e.slug === slug || e.id === slug
  );

  if (!event) {
    notFound();
  }

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    teamSize: event.teamSize.min === 1 ? "1 (Solo)" : `${event.teamSize.min}`,
    teamMemberNames: "",
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate dynamic team size options based on event specs
  const teamOptions = [];
  for (let i = event.teamSize.min; i <= event.teamSize.max; i++) {
    teamOptions.push(i === 1 ? "1 (Solo)" : `${i} Members`);
  }

  const isSolo = formData.teamSize === "1 (Solo)";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate registration submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to {event.name}</span>
          </Link>
        </div>

        {/* 2-Column Registration Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Schematic Registration Form Card */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-300/70 dark:border-zinc-800/80 p-6 sm:p-10 shadow-sm">
              
              {/* Form Header */}
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">
                  Register for {event.name}
                </h1>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal">
                  Complete the schematic layout below to secure your spot.
                </p>
                <div className="h-px bg-zinc-300/60 dark:bg-zinc-800 mt-6" />
              </div>

              {isSubmitted ? (
                /* Success State Card */
                <div className="py-12 px-6 text-center flex flex-col items-center justify-center space-y-5 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 rounded-full bg-[#00ffc6]/10 border border-[#00ffc6]/30 flex items-center justify-center text-[#00a896] dark:text-[#00ffc6] shadow-lg">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2 max-w-md">
                    <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                      Registration Confirmed!
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                      You are officially registered for <span className="font-bold text-zinc-900 dark:text-white">{event.name}</span>. A confirmation details package has been sent to <span className="font-semibold text-[#007a70] dark:text-[#00ffc6]">{formData.email}</span>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-300/60 dark:border-zinc-700/60 text-left w-full max-w-md space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Participant:</span>
                      <span className="font-bold">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Team Configuration:</span>
                      <span className="font-bold">{formData.teamSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Date & Venue:</span>
                      <span className="font-bold">{formattedDate} · {event.venue}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full max-w-md">
                    <Link
                      href="/events"
                      className="flex-1 py-3.5 px-6 rounded-xl bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-sm text-center shadow-md transition-all"
                    >
                      Explore Other Events
                    </Link>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="flex-1 py-3.5 px-6 rounded-xl bg-zinc-200/80 hover:bg-zinc-300/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-sm text-center transition-all cursor-pointer"
                    >
                      New Registration
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Section 1: Participant Information (2x2 Grid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                        <User className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Full Name</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/60 dark:bg-black/40 border border-zinc-300 dark:border-zinc-700/80 focus:ring-2 focus:ring-[#00ffc6]/50 focus:border-[#00ffc6] outline-none text-zinc-900 dark:text-white transition-all placeholder:text-zinc-400 text-sm sm:text-base"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                        <Mail className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@university.edu"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/60 dark:bg-black/40 border border-zinc-300 dark:border-zinc-700/80 focus:ring-2 focus:ring-[#00ffc6]/50 focus:border-[#00ffc6] outline-none text-zinc-900 dark:text-white transition-all placeholder:text-zinc-400 text-sm sm:text-base"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                        <Phone className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 (555) 000-0000"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/60 dark:bg-black/40 border border-zinc-300 dark:border-zinc-700/80 focus:ring-2 focus:ring-[#00ffc6]/50 focus:border-[#00ffc6] outline-none text-zinc-900 dark:text-white transition-all placeholder:text-zinc-400 text-sm sm:text-base"
                      />
                    </div>

                    {/* College/University */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                        <GraduationCap className="w-3.5 h-3.5 text-zinc-500" />
                        <span>College/University</span>
                      </label>
                      <input
                        type="text"
                        name="college"
                        required
                        value={formData.college}
                        onChange={handleChange}
                        placeholder="Institution Name"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/60 dark:bg-black/40 border border-zinc-300 dark:border-zinc-700/80 focus:ring-2 focus:ring-[#00ffc6]/50 focus:border-[#00ffc6] outline-none text-zinc-900 dark:text-white transition-all placeholder:text-zinc-400 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Section Divider */}
                  <div className="h-px bg-zinc-300/60 dark:bg-zinc-800" />

                  {/* Section 2: Team Configuration */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-lg sm:text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                      <Users className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                      <span>Team Configuration</span>
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
                          className="w-full px-4 py-3.5 rounded-xl bg-white/60 dark:bg-black/40 border border-zinc-300 dark:border-zinc-700/80 focus:ring-2 focus:ring-[#00ffc6]/50 focus:border-[#00ffc6] outline-none text-zinc-900 dark:text-white transition-all text-sm sm:text-base cursor-pointer"
                        >
                          {teamOptions.map((opt) => (
                            <option key={opt} value={opt} className="dark:bg-zinc-900">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Team Member Names (If Applicable) */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                          Team Member Name(s) {isSolo ? "(If Applicable)" : "(Required)"}
                        </label>
                        <input
                          type="text"
                          name="teamMemberNames"
                          required={!isSolo}
                          disabled={isSolo}
                          value={isSolo ? "" : formData.teamMemberNames}
                          onChange={handleChange}
                          placeholder={isSolo ? "Solo registration selected" : "Enter teammate name(s), comma separated"}
                          className={`w-full px-4 py-3.5 rounded-xl border transition-all text-sm sm:text-base ${
                            isSolo
                              ? "bg-zinc-100/50 dark:bg-zinc-800/30 border-zinc-200 dark:border-zinc-800/60 text-zinc-400 cursor-not-allowed"
                              : "bg-white/60 dark:bg-black/40 border-zinc-300 dark:border-zinc-700/80 focus:ring-2 focus:ring-[#00ffc6]/50 focus:border-[#00ffc6] text-zinc-900 dark:text-white placeholder:text-zinc-400"
                          }`}
                        />
                      </div>
                    </div>
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
                      className="mt-1 w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 focus:ring-[#00ffc6] cursor-pointer"
                    />
                    <label htmlFor="agreeToTerms" className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
                      I confirm that all provided details are accurate and I agree to abide by the rules and code of conduct for {event.name} at NIRVAN &apos;26.
                    </label>
                  </div>

                  {/* Submit Button aligned right as per wireframe */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto py-4 px-10 rounded-2xl bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-base shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Registration</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Right Column: Event Summary Sidebar Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-300/70 dark:border-zinc-800/80 p-6 sm:p-8 shadow-sm">
              
              {/* Summary Header with Calendar Icon */}
              <div className="flex items-center gap-2.5 mb-6">
                <Calendar className="w-5 h-5 text-[#007a70] dark:text-[#00ffc6]" />
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
                    <span className="font-black text-[#007a70] dark:text-[#00ffc6] text-right">
                      ₹{event.prizePool.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>

              {/* Location Map Placeholder Card as per wireframe */}
              <div className="mt-8 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-zinc-300/80 dark:border-zinc-700/80 bg-zinc-100 dark:bg-zinc-800/50 flex flex-col items-center justify-center text-center p-4 group">
                  
                  {/* Schematic Map Grid Backdrop */}
                  <div className="absolute inset-0 opacity-15 dark:opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
                  
                  {/* Diagonal Wireframe Crossing Lines as in wireframe */}
                  <svg className="absolute inset-0 w-full h-full stroke-zinc-300 dark:stroke-zinc-700/50" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="100%" y2="100%" strokeWidth="1" />
                    <line x1="100%" y1="0" x2="0" y2="100%" strokeWidth="1" />
                  </svg>

                  <div className="relative z-10 flex flex-col items-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 shadow-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-red-500">
                      <MapPin className="w-5 h-5 fill-red-500/20" />
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

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
