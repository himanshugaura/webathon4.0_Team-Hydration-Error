"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function CyberBackground() {
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

    // Particle nodes for cyber network
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: isDark
          ? i % 3 === 0
            ? "#84a98c"
            : i % 3 === 1
            ? "#52796f"
            : "#a3b18a"
          : i % 3 === 0
          ? "#52796f"
          : i % 3 === 1
          ? "#354f52"
          : "#84a98c",
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let mouse = { x: -1000, y: -1000, radius: 150 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle cyber grid
      ctx.save();
      ctx.strokeStyle = isDark ? "rgba(132, 169, 140, 0.04)" : "rgba(82, 121, 111, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.22;
            ctx.strokeStyle = isDark
              ? `rgba(132, 169, 140, ${opacity})`
              : `rgba(82, 121, 111, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          const force = (1 - mdist / mouse.radius) * 1.5;
          p.x += (mdx / mdist) * force;
          p.y += (mdy / mdist) * force;
        }

        // Draw node
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Ambient background glow orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#84a98c]/20 dark:bg-[#52796f]/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#354f52]/20 dark:bg-[#84a98c]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-[#52796f]/15 dark:bg-[#2f3e46]/30 rounded-full blur-3xl" />
    </div>
  );
}
