"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Trophy, ArrowRight, Tag, Search, Users } from "lucide-react";
import { data } from "@/lib/data";

// Helper function to assign styling and imagery based on category
const getEventStyles = (category) => {
  const styles = {
    "Hackathon": {
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
      color: "from-blue-500/20 to-purple-500/20",
      border: "group-hover:border-blue-500/50"
    },
    "Competitive Programming": {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
      color: "from-green-500/20 to-emerald-500/20",
      border: "group-hover:border-green-500/50"
    },
    "Design": {
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
      color: "from-pink-500/20 to-rose-500/20",
      border: "group-hover:border-pink-500/50"
    },
    "Robotics": {
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
      color: "from-red-500/20 to-orange-500/20",
      border: "group-hover:border-red-500/50"
    },
    "IoT / Hardware": {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
      color: "from-cyan-500/20 to-teal-500/20",
      border: "group-hover:border-cyan-500/50"
    },
    "Gaming": {
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
      color: "from-indigo-500/20 to-violet-500/20",
      border: "group-hover:border-indigo-500/50"
    },
    "Cybersecurity": {
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
      color: "from-orange-500/20 to-amber-500/20",
      border: "group-hover:border-orange-500/50"
    },
    "Adventure": {
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
      color: "from-yellow-500/20 to-lime-500/20",
      border: "group-hover:border-yellow-500/50"
    },
    "Workshop": {
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
      color: "from-purple-500/20 to-fuchsia-500/20",
      border: "group-hover:border-purple-500/50"
    }
  };

  return styles[category] || {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    color: "from-zinc-500/20 to-neutral-500/20",
    border: "group-hover:border-zinc-500/50"
  };
};

export default function EventsPage() {
  const events = data.events;
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTeamSize, setSelectedTeamSize] = useState("All Sizes");
  const [selectedPrize, setSelectedPrize] = useState("All Prizes");

  // Options for filters
  const categories = ["All Categories", ...new Set(events.map(e => e.category))];
  const teamSizes = ["All Sizes", "Solo", "Team (2-3)", "Team (4+)"];
  const prizeRanges = ["All Prizes", "No Prize", "Under ₹10,000", "₹10,000 - ₹20,000", "Over ₹20,000"];

  // Filter Logic
  const filteredEvents = events.filter((event) => {
    // 1. Search Match
    const matchesSearch = 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Category Match
    const matchesCategory = selectedCategory === "All Categories" || event.category === selectedCategory;
    
    // 3. Team Size Match
    let matchesTeamSize = true;
    if (selectedTeamSize === "Solo") {
      matchesTeamSize = event.teamSize.min === 1 && event.teamSize.max === 1;
    } else if (selectedTeamSize === "Team (2-3)") {
      matchesTeamSize = event.teamSize.max >= 2 && event.teamSize.min <= 3;
    } else if (selectedTeamSize === "Team (4+)") {
      matchesTeamSize = event.teamSize.max >= 4;
    }

    // 4. Prize Pool Match
    let matchesPrize = true;
    if (selectedPrize === "No Prize") {
      matchesPrize = event.prizePool === 0;
    } else if (selectedPrize === "Under ₹10,000") {
      matchesPrize = event.prizePool > 0 && event.prizePool < 10000;
    } else if (selectedPrize === "₹10,000 - ₹20,000") {
      matchesPrize = event.prizePool >= 10000 && event.prizePool <= 20000;
    } else if (selectedPrize === "Over ₹20,000") {
      matchesPrize = event.prizePool > 20000;
    }

    return matchesSearch && matchesCategory && matchesTeamSize && matchesPrize;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-500">
            Explore Events
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Discover a wide range of exciting technical, non-technical, and gaming events at {data.fest.name}.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="w-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 mb-12 flex flex-col lg:flex-row gap-4 shadow-sm">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input 
              type="text"
              placeholder="Search by event name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ffc6]/50 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Filter */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ffc6]/50 text-zinc-900 dark:text-zinc-100 cursor-pointer min-w-[160px] appearance-none"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            {/* Team Size Filter */}
            <select 
              value={selectedTeamSize}
              onChange={(e) => setSelectedTeamSize(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ffc6]/50 text-zinc-900 dark:text-zinc-100 cursor-pointer min-w-[140px] appearance-none"
            >
              {teamSizes.map(size => <option key={size} value={size}>{size}</option>)}
            </select>

            {/* Prize Filter */}
            <select 
              value={selectedPrize}
              onChange={(e) => setSelectedPrize(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ffc6]/50 text-zinc-900 dark:text-zinc-100 cursor-pointer min-w-[160px] appearance-none"
            >
              {prizeRanges.map(prize => <option key={prize} value={prize}>{prize}</option>)}
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-zinc-600 dark:text-zinc-400 font-medium">
          Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">No events found</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">We couldn't find any events matching your current filters.</p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setSelectedTeamSize("All Sizes");
                setSelectedPrize("All Prizes");
              }}
              className="bg-[#00ffc6] text-black hover:bg-[#00e5b2]"
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            const styles = getEventStyles(event.category);
            
            return (
              <div 
                key={event.id}
                className={`group relative flex flex-col rounded-3xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800/50 overflow-hidden hover:shadow-2xl transition-all duration-300 ${styles.border}`}
              >
                {/* Event Image Banner */}
                <div className="relative h-48 w-full overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${styles.color} opacity-80 mix-blend-overlay z-10`} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={styles.image} 
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-black/80 text-zinc-900 dark:text-zinc-100 backdrop-blur-md">
                      <Tag className="w-3 h-3" />
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex flex-col flex-1 p-6 z-20 relative">
                  <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 group-hover:text-[#00ffc6] transition-colors">
                    {event.name}
                  </h3>
                  
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-2 flex-1">
                    {event.shortDescription}
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-zinc-700 dark:text-zinc-300">
                      <Calendar className="w-4 h-4 mr-3 text-zinc-400 dark:text-zinc-500" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-sm text-zinc-700 dark:text-zinc-300">
                      <Clock className="w-4 h-4 mr-3 text-zinc-400 dark:text-zinc-500" />
                      <span>{event.time} ({event.durationHours} Hours)</span>
                    </div>
                    <div className="flex items-center text-sm text-zinc-700 dark:text-zinc-300">
                      <Users className="w-4 h-4 mr-3 text-zinc-400 dark:text-zinc-500" />
                      <span>
                        {event.teamSize.min === event.teamSize.max 
                          ? (event.teamSize.min === 1 ? 'Solo' : `Team of ${event.teamSize.min}`) 
                          : `Team of ${event.teamSize.min}-${event.teamSize.max}`}
                      </span>
                    </div>
                    <div className="flex items-center text-sm font-semibold text-zinc-900 dark:text-[#00ffc6]">
                      <Trophy className="w-4 h-4 mr-3 text-yellow-500" />
                      <span>
                        {event.prizePool > 0 ? `Prize Pool: ${event.currency} ${event.prizePool.toLocaleString()}` : "No Prize Pool"}
                      </span>
                    </div>
                  </div>

                  <Link href={`/events/${event.slug}`} className="mt-auto">
                    <Button className="w-full rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 group-hover:bg-[#00ffc6] group-hover:text-black transition-all">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
