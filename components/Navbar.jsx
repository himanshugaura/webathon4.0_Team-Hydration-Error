"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll event for glassmorphism enhancement
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
    { name: "Schedule", href: "/schedule" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/40 dark:bg-[#1a2e1a]/40 backdrop-blur-lg border-b border-white/20 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#84a98c] to-[#354f52] flex items-center justify-center shadow-lg group-hover:shadow-[#84a98c]/50 transition-all duration-300">
              <span className="text-white font-bold text-xl tracking-tighter">N</span>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#2f3e46] dark:text-[#cad2c5]">
              NIRVAN <span className="text-[#52796f] dark:text-[#84a98c]">'26</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/20 dark:bg-black/20 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/30 dark:border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-[#2f3e46] dark:text-[#cad2c5] hover:text-[#52796f] dark:hover:text-[#84a98c] transition-colors rounded-full group"
              >
                {link.name}
                <span className="absolute inset-0 bg-[#84a98c]/10 dark:bg-[#84a98c]/20 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-white/10 text-[#2f3e46] dark:text-[#cad2c5] hover:bg-[#84a98c]/20 dark:hover:bg-[#84a98c]/20 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <Link
              href="/register"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#52796f] to-[#354f52] hover:from-[#44655c] hover:to-[#2c4144] rounded-full shadow-lg shadow-[#52796f]/30 hover:shadow-[#52796f]/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md text-[#2f3e46] dark:text-[#cad2c5]"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#2f3e46] dark:text-[#cad2c5] hover:bg-white/20 dark:hover:bg-black/20 rounded-full transition-colors"
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
            className="md:hidden overflow-hidden bg-white/70 dark:bg-[#1a2e1a]/80 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-3 rounded-xl text-base font-medium text-[#2f3e46] dark:text-[#cad2c5] hover:bg-[#84a98c]/20 hover:text-[#52796f] dark:hover:text-[#84a98c] transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="w-full text-center mt-4 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#52796f] to-[#354f52] rounded-xl shadow-lg shadow-[#52796f]/30"
              >
                Register Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
