"use client";

import { Timeline } from "@/components/hero/timeline";
import { data } from "@/lib/data";

// Tag colour map with the new palette
const tagColors = {
  TECH:   "bg-[#2C5745]/15 text-[#2C5745] dark:text-[#EB7D00] border-[#2C5745]/30",
  DESIGN: "bg-[#AE2448]/15 text-[#AE2448] dark:text-[#AE2448] border-[#AE2448]/30",
  GAMING: "bg-[#EB7D00]/15 text-[#EB7D00] dark:text-[#EB7D00] border-[#EB7D00]/30",
  LEARN:  "bg-[#2C5745]/15 text-[#2C5745] dark:text-[#2C5745] border-[#2C5745]/30",
  FUN:    "bg-[#EB7D00]/15 text-[#EB7D00] dark:text-[#EB7D00] border-[#EB7D00]/30",
};

function ScheduleCard({ time, title, description, venue, tags }) {
  return (
    <div className="flex gap-4 items-start p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-[#EB7D00]/50 transition-colors group">
      {/* Time pill */}
      <div className="shrink-0 text-xs font-bold tabular-nums text-[#2C5745] dark:text-[#EB7D00] bg-[#2C5745]/10 dark:bg-[#EB7D00]/10 border border-[#2C5745]/20 dark:border-[#EB7D00]/20 rounded-lg px-2.5 py-1.5 mt-0.5 leading-tight text-center min-w-[70px]">
        {time}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm group-hover:text-[#2C5745] dark:group-hover:text-[#EB7D00] transition-colors">
            {title}
          </h4>
          {tags && tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tagColors[tag] || "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-300 dark:border-zinc-700"}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">📍 {venue}</p>
      </div>
    </div>
  );
}

// Build timeline entries from schedule data
function buildTimelineData() {
  const days = [data.schedule.day1, data.schedule.day2, data.schedule.day3];

  return days.map((day) => ({
    title: day.label,
    content: (
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
          {new Date(day.date).toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        {day.items.map((item, i) => (
          <ScheduleCard
            key={i}
            time={item.time}
            title={item.title}
            description={item.description}
            venue={item.venue}
            tags={item.tags}
          />
        ))}
      </div>
    ),
  }));
}

export default function CountdownAndTimeline() {
  const timelineData = buildTimelineData();
  const { fest } = data;

  return (
    <section className="w-full dark:bg-neutral-950 transition-colors duration-500">

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 pt-10 flex items-center gap-4">
        <div className="flex-1 h-px bg-zinc-400/30 dark:bg-zinc-800" />
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 px-2">
          Event Schedule
        </span>
        <div className="flex-1 h-px bg-zinc-400/30 dark:bg-zinc-800" />
      </div>

      {/* ── Timeline heading ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 pt-10 pb-4">
        <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-2">
          3 Days of <span className="text-[#2C5745] dark:text-[#EB7D00]">Non-Stop Action</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-sm md:text-base">
          From the opening ceremony to the grand prize distribution — here&apos;s every moment you can&apos;t miss at {fest.name}.
        </p>
      </div>

      {/* ── Timeline ── */}
      <Timeline data={timelineData} />

    </section>
  );
}
