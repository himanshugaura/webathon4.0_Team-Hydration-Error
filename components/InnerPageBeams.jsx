"use client";

import { usePathname } from "next/navigation";
import { BackgroundBeams } from "@/components/ui/background-beams";

export function InnerPageBeams() {
  const pathname = usePathname();

  // Exclude landing page (home route "/")
  if (pathname === "/") {
    return null;
  }

  return (
    <BackgroundBeams className="opacity-25 dark:opacity-45 pointer-events-none fixed inset-0 z-0" />
  );
}

export default InnerPageBeams;
