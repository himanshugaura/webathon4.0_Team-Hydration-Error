"use client";

import { AuthCard } from "@/components/auth/AuthCard";

export default function LoginPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Soft Ambient Frosted Glows (Strictly Sage & Emerald, No Blue/Purple) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#84a98c]/20 dark:bg-[#52796f]/15 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#52796f]/15 dark:bg-[#84a98c]/10 blur-3xl" />
      </div>

      {/* Centered Single Clean Auth Card */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <AuthCard initialTab="login" />
      </div>
    </div>
  );
}
