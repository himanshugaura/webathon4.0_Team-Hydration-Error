"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gehu_logo.svg"
              alt="GEHU Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-sans font-black text-xl tracking-tight text-zinc-900 dark:text-white">
              NIRVAN <span className="text-[#EB7D00]">'26</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/40 dark:bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-bold text-zinc-800 dark:text-zinc-200 hover:text-[#2C5745] dark:hover:text-[#EB7D00] transition-colors rounded-full group"
              >
                {link.name}
                <span className="absolute inset-0 bg-[#2C5745]/10 dark:bg-[#EB7D00]/10 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 text-zinc-800 dark:text-zinc-200 hover:text-[#EB7D00] hover:bg-[#2C5745]/10 dark:hover:bg-[#EB7D00]/10 transition-all duration-300 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-bold text-zinc-800 dark:text-zinc-200 hover:text-[#2C5745] dark:hover:text-[#EB7D00] transition-colors"
            >
              Sign In
            </Link>
            <Link href="/register">
              <ShimmerButton className="text-sm font-bold shadow-md hover:-translate-y-0.5 transition-transform">
                <span>Register Now</span>
              </ShimmerButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md text-zinc-800 dark:text-zinc-200"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-800 dark:text-zinc-200 hover:bg-white/20 dark:hover:bg-black/20 rounded-full transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-3 rounded-xl text-base font-bold text-zinc-800 dark:text-zinc-200 hover:bg-[#2C5745]/10 hover:text-[#2C5745] dark:hover:text-[#EB7D00] transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-full flex flex-col gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-6 py-2.5 text-base font-bold text-zinc-800 dark:text-zinc-200 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-6 py-2.5 text-base font-bold text-white bg-[#2C5745] hover:bg-[#234537] rounded-xl shadow-md"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
