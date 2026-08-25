"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, CheckCircle2, X, Shield, Sparkles } from "lucide-react";
import { soundFx } from "./SoundEffects";

export function BiometricModal({ isOpen, onClose, onSuccess }) {
  const [status, setStatus] = useState("scanning"); // 'scanning' | 'success' | 'failed'

  useEffect(() => {
    if (isOpen) {
      setStatus("scanning");
      soundFx.playScan();

      const timer = setTimeout(() => {
        setStatus("success");
        soundFx.playSuccess();
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 1200);
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-sm rounded-3xl bg-white/90 dark:bg-[#1a2e1a]/95 backdrop-blur-2xl border border-white/20 dark:border-[#84a98c]/30 shadow-2xl p-6 text-center z-10 overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Biometric Icon animation */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-tr from-[#52796f]/20 to-[#84a98c]/20 border border-[#84a98c]/40 flex items-center justify-center">
              {status === "scanning" ? (
                <>
                  <Fingerprint className="w-16 h-16 text-[#52796f] dark:text-[#84a98c] animate-pulse" />
                  {/* Laser line moving vertically */}
                  <motion.div
                    animate={{ y: [-40, 40, -40] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="absolute w-20 h-1 bg-emerald-400 rounded-full shadow-[0_0_12px_#34d399]"
                  />
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                </motion.div>
              )}
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#2f3e46] dark:text-white mb-1">
            {status === "scanning" ? "Scanning Biometrics..." : "Passkey Authorized!"}
          </h3>

          <p className="text-xs text-muted-foreground font-mono mb-4">
            {status === "scanning"
              ? "Touch sensor or align FaceID to authenticate"
              : "Cryptographic signature validated • Access granted"}
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] font-mono text-muted-foreground">
            <Shield className="w-3.5 h-3.5 text-[#84a98c]" />
            FIDO2 / WebAuthn Compliant
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
