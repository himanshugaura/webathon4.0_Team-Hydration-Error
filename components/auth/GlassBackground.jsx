"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function GlassBackground() {
  const canvasRef = useRef(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const isDark = resolvedTheme === "dark";

    // Minimal floating geometric particles
    const particleCount = Math.min(Math.floor((width * height) / 18000), 45);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: isDark
          ? i % 3 === 0
            ? "rgba(132, 169, 140, 0.4)"
            : i % 3 === 1
            ? "rgba(82, 121, 111, 0.35)"
            : "rgba(202, 210, 197, 0.3)"
          : i % 3 === 0
          ? "rgba(82, 121, 111, 0.3)"
          : i % 3 === 1
          ? "rgba(53, 79, 82, 0.25)"
          : "rgba(132, 169, 140, 0.35)",
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles with minimal subtle lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const opacity = (1 - dist / 110) * 0.14;
            ctx.strokeStyle = isDark
              ? `rgba(132, 169, 140, ${opacity})`
              : `rgba(82, 121, 111, ${opacity})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-[#f7f9f7] via-[#eef2ee] to-[#e4eae4] dark:from-[#0d1611] dark:via-[#132018] dark:to-[#0a110d]">
      {/* Subtle organic ambient glow orbs in Sage & Emerald - strictly NO blue/purple */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#84a98c]/25 dark:bg-[#52796f]/20 blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#52796f]/20 dark:bg-[#84a98c]/15 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 w-[28rem] h-[28rem] rounded-full bg-[#354f52]/20 dark:bg-[#2f3e46]/35 blur-3xl" />
      
      {/* Subtle glass grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
        style={{
          backgroundImage: `radial-gradient(rgba(82, 121, 111, 0.8) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <canvas ref={canvasRef} className="w-full h-full relative z-10" />
    </div>
  );
}
