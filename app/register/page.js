"use client";

import { AuthCard } from "@/components/auth/AuthCard";

export default function RegisterPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6">
      <div className="relative z-10 w-full flex items-center justify-center">
        <AuthCard initialTab="register" />
      </div>
    </div>
  );
}
