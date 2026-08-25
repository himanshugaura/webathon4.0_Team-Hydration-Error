"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";
import { data } from "@/lib/data";

const COUNTDOWN_FROM = data.fest.countdownTarget; // "2026-10-24T09:00:00+05:30"

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR   = MINUTE * 60;
const DAY    = HOUR   * 24;

export default function ShiftingCountdown() {
  return (
    <div className="flex w-full max-w-5xl items-center bg-transparent mx-auto">
      <CountdownItem unit="Day"    label="Days"    />
      <CountdownItem unit="Hour"   label="Hours"   />
      <CountdownItem unit="Minute" label="Minutes" />
      <CountdownItem unit="Second" label="Seconds" />
    </div>
  );
}

function CountdownItem({ unit, label }) {
  const { ref, time } = useTimer(unit);
  const display = unit === "Second" ? String(time).padStart(2, "0") : time;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 px-4 py-6 md:gap-2 md:py-8">
      <div className="relative w-full overflow-hidden text-center">
        <span
          ref={ref}
          className="block text-5xl font-mono font-black text-zinc-900 dark:text-white md:text-7xl lg:text-8xl transition-colors duration-500"
        >
          {display}
        </span>
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 md:text-sm transition-colors duration-500">
        {label}
      </span>
      <div className="h-px w-full dark:bg-zinc-700 bg-zinc-300 mt-3 transition-colors duration-500" />
    </div>
  );
}

function useTimer(unit) {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef(null);
  const timeRef     = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    handleCountdown();
    intervalRef.current = setInterval(handleCountdown, 1000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountdown = async () => {
    const end      = new Date(COUNTDOWN_FROM);
    const now      = new Date();
    const distance = end - now;

    let newTime = 0;
    switch (unit) {
      case "Day":
        newTime = Math.max(0, Math.floor(distance / DAY));
        break;
      case "Hour":
        newTime = Math.max(0, Math.floor((distance % DAY) / HOUR));
        break;
      case "Minute":
        newTime = Math.max(0, Math.floor((distance % HOUR) / MINUTE));
        break;
      default:
        newTime = Math.max(0, Math.floor((distance % MINUTE) / SECOND));
    }

    if (newTime !== timeRef.current) {
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );
      timeRef.current = newTime;
      setTime(newTime);
      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref, time };
}
