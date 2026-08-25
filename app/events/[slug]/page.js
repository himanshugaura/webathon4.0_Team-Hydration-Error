import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Users, 
  Check, 
  Tag, 
  Coins,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { data } from "@/lib/data";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { MagicCard } from "@/components/ui/magic-card";
import { SparklesText } from "@/components/ui/sparkles-text";

// Helper function to resolve high-res event image or poster
function getEventVisual(event) {
  // If specific poster exists in /Poster
  const posterMap = {
    "hacksprint": "/Poster/Hackathon.png",
    "hackathon": "/Poster/Hackathon.png",
    "ctf-cyberquest": "/Poster/Ctf.png",
    "ctf": "/Poster/Ctf.png",
    "esports-arena": "/Poster/Esport.png",
    "esports": "/Poster/Esport.png",
    "treasure-hunt": "/Poster/Tech treasure hunt.png",
    "treasurehunt": "/Poster/Tech treasure hunt.png",
  };

  if (posterMap[event.slug] || posterMap[event.id]) {
    return {
      src: posterMap[event.slug] || posterMap[event.id],
      isPoster: true,
    };
  }

  // High quality Unsplash imagery per category
  const categoryImages = {
    "Hackathon": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
    "Competitive Programming": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    "Design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    "Robotics": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    "IoT / Hardware": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    "Gaming": "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    "Cybersecurity": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    "Adventure": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
    "Workshop": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
  };

  return {
    src: categoryImages[event.category] || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    isPoster: false,
  };
}

// Helper for dynamic action phrase in bottom banner
function getActionPhrase(category) {
  switch (category) {
    case "Competitive Programming":
      return "Ready to Code?";
    case "Hackathon":
      return "Ready to Build?";
    case "Design":
      return "Ready to Design?";
    case "Robotics":
      return "Ready to Battle?";
    case "Gaming":
      return "Ready to Play?";
    case "Cybersecurity":
      return "Ready to Hack?";
    case "Adventure":
      return "Ready for Adventure?";
    default:
      return "Ready to Participate?";
  }
}

export default async function EventDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const event = data.events.find(
    (e) => e.slug === slug || e.id === slug
  );

  if (!event) {
    notFound();
  }

  const visual = getEventVisual(event);
  const actionPhrase = getActionPhrase(event.category);

  // Format date and time
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const teamSizeDisplay =
    event.teamSize.min === event.teamSize.max
      ? event.teamSize.min === 1
        ? "1 (Solo)"
        : `${event.teamSize.min}`
      : `${event.teamSize.min}-${event.teamSize.max}`;

  const feeDisplay =
    event.fee && event.fee > 0
      ? `₹${event.fee}`
      : "Free";

  const prizeDisplay =
    event.prizePool && event.prizePool > 0
      ? `₹${event.prizePool.toLocaleString("en-IN")}`
      : "Certificate";

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Events</span>
          </Link>
        </div>

        {/* Top Hero Section: Visual Banner (Left) & Key Info Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-stretch">
          
          {/* Left Column: Event Visual / Poster */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] rounded-3xl overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-zinc-900/40 border border-zinc-300/70 dark:border-zinc-800/80 shadow-sm flex items-center justify-center group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={visual.src}
                alt={event.name}
                className={`w-full h-full ${
                  visual.isPoster ? "object-contain p-4 sm:p-6" : "object-cover"
                } transition-transform duration-700 group-hover:scale-[1.02]`}
              />
              
              {/* Subtle glass reflection & gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-60 dark:opacity-80" />
              
              {/* Tag overlay inside image for sleek aesthetic */}
              <div className="absolute top-5 left-5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-black/70 text-white border border-white/20 shadow-lg">
                  <Tag className="w-3.5 h-3.5 text-[#EB7D00]" />
                  {event.tag || event.category}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Event Header & Meta Information Card */}
          <div className="lg:col-span-5 flex flex-col">
            <MagicCard className="h-full rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                {/* Category Pill */}
                <div className="mb-4">
                  <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wide bg-[#2C5745]/15 text-[#2C5745] dark:text-[#EB7D00] border border-[#2C5745]/30 dark:border-[#EB7D00]/30">
                    {event.category}
                  </span>
                </div>

                {/* Event Name */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
                  {event.name}
                </h1>

                {/* Short Description */}
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 font-normal">
                  {event.shortDescription || event.description}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 pt-2 pb-6 border-t border-zinc-200/80 dark:border-zinc-800/80">
                  {/* Prize Pool */}
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                      Prize Pool
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-[#2C5745] dark:text-[#EB7D00] tracking-tight">
                      {prizeDisplay}
                    </span>
                  </div>

                  {/* Team Size */}
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                      Team Size
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                      {teamSizeDisplay}
                    </span>
                  </div>

                  {/* Fee */}
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                      Fee
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                      {feeDisplay}
                    </span>
                  </div>

                  {/* Date & Time */}
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                      Date & Time
                    </span>
                    <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white block mt-1">
                      {formattedDate}, {event.time}
                    </span>
                  </div>

                  {/* Venue (Spans full width) */}
                  <div className="col-span-2 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                      Venue
                    </span>
                    <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                      <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="mt-4">
                <Link href={`/events/${event.slug}/register`} className="block w-full">
                  <ShimmerButton className="w-full py-4 px-6 rounded-2xl text-white font-bold text-base shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer">
                    <span>Register Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </ShimmerButton>
                </Link>
              </div>
            </MagicCard>
          </div>
        </div>

        {/* Middle Section: 2 Cards (About the Event & Eligibility) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* About the Event Card */}
          <div className="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-300/70 dark:border-zinc-800/80 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              About the Event
            </h2>
            <div className="h-px bg-zinc-300/60 dark:bg-zinc-800 my-4" />
            <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              {event.description}
            </p>
          </div>

          {/* Eligibility Card */}
          <div className="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-300/70 dark:border-zinc-800/80 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              Eligibility
            </h2>
            <div className="h-px bg-zinc-300/60 dark:bg-zinc-800 my-4" />
            <ul className="space-y-3.5">
              {event.eligibility?.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 dark:bg-zinc-400 mt-2 shrink-0" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rules Section Card */}
        {event.rules && event.rules.length > 0 && (
          <div className="rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-300/70 dark:border-zinc-800/80 p-6 sm:p-8 shadow-sm mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              Rules
            </h2>
            <div className="h-px bg-zinc-300/60 dark:bg-zinc-800 my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3.5">
              {event.rules.map((rule, index) => (
                <div key={index} className="flex items-start gap-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 dark:bg-zinc-400 mt-2 shrink-0" />
                  <span className="leading-snug">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Banner Card */}
        <MagicCard className="rounded-3xl p-6 sm:p-10 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
              <SparklesText className="text-[#2C5745] dark:text-[#EB7D00]">{actionPhrase}</SparklesText>
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium">
              Secure your spot in {event.name} before registrations close.
            </p>
          </div>

          <Link
            href={`/events/${event.slug}/register`}
            className="w-full md:w-auto shrink-0"
          >
            <ShimmerButton className="w-full md:w-auto py-3.5 px-8 rounded-2xl text-white font-bold text-base shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer">
              <span>{event.registerCta || `Register for ${event.name}`}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </ShimmerButton>
          </Link>
        </MagicCard>

      </div>
    </div>
  );
}
