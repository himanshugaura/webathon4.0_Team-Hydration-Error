"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Trophy, ArrowRight, Tag, Search, Users } from "lucide-react";
import { data } from "@/lib/data";
import { MagicCard } from "@/components/ui/magic-card";
import { SparklesText } from "@/components/ui/sparkles-text";

// Helper function to assign styling and real imagery based on event/category
const getEventStyles = (event) => {
  const eventMap = {
    "hacksprint": {
      image: "/Poster/Hackathon.png",
      badgeColor: "bg-[#2C5745] text-white",
      border: "group-hover:border-[#2C5745]/60"
    },
    "hackathon": {
      image: "/Poster/Hackathon.png",
      badgeColor: "bg-[#2C5745] text-white",
      border: "group-hover:border-[#2C5745]/60"
    },
    "coderush": {
      image: "/Raw Images/Hackathon/20260418_101029.jpg",
      badgeColor: "bg-[#EB7D00] text-white",
      border: "group-hover:border-[#EB7D00]/60"
    },
    "coding": {
      image: "/Raw Images/Hackathon/20260418_101029.jpg",
      badgeColor: "bg-[#EB7D00] text-white",
      border: "group-hover:border-[#EB7D00]/60"
    },
    "ui-ux-arena": {
      image: "/Raw Images/Hackathon/20260418_110744.jpg",
      badgeColor: "bg-[#AE2448] text-white",
      border: "group-hover:border-[#AE2448]/60"
    },
    "design": {
      image: "/Raw Images/Hackathon/20260418_110744.jpg",
      badgeColor: "bg-[#AE2448] text-white",
      border: "group-hover:border-[#AE2448]/60"
    },
    "robowar": {
      image: "/Raw Images/esport/DSC08175.JPG",
      badgeColor: "bg-[#AE2448] text-white",
      border: "group-hover:border-[#AE2448]/60"
    },
    "robotics": {
      image: "/Raw Images/esport/DSC08175.JPG",
      badgeColor: "bg-[#AE2448] text-white",
      border: "group-hover:border-[#AE2448]/60"
    },
    "smart-systems-expo": {
      image: "/Raw Images/tech treasyre hunt/DSC_0111.jpg",
      badgeColor: "bg-[#2C5745] text-white",
      border: "group-hover:border-[#2C5745]/60"
    },
    "iot": {
      image: "/Raw Images/tech treasyre hunt/DSC_0111.jpg",
      badgeColor: "bg-[#2C5745] text-white",
      border: "group-hover:border-[#2C5745]/60"
    },
    "esports-arena": {
      image: "/Poster/Esport.png",
      badgeColor: "bg-[#EB7D00] text-white",
      border: "group-hover:border-[#EB7D00]/60"
    },
    "esports": {
      image: "/Poster/Esport.png",
      badgeColor: "bg-[#EB7D00] text-white",
      border: "group-hover:border-[#EB7D00]/60"
    },
    "ctf-cyberquest": {
      image: "/Poster/Ctf.png",
      badgeColor: "bg-[#AE2448] text-white",
      border: "group-hover:border-[#AE2448]/60"
    },
    "ctf": {
      image: "/Poster/Ctf.png",
      badgeColor: "bg-[#AE2448] text-white",
      border: "group-hover:border-[#AE2448]/60"
    },
    "treasure-hunt": {
      image: "/Poster/Tech treasure hunt.png",
      badgeColor: "bg-[#EB7D00] text-white",
      border: "group-hover:border-[#EB7D00]/60"
    },
    "treasurehunt": {
      image: "/Poster/Tech treasure hunt.png",
      badgeColor: "bg-[#EB7D00] text-white",
      border: "group-hover:border-[#EB7D00]/60"
    },
    "genai-workshop": {
      image: "/Raw Images/ctf/img4.jpg",
      badgeColor: "bg-[#2C5745] text-white",
      border: "group-hover:border-[#2C5745]/60"
    },
    "workshop": {
      image: "/Raw Images/ctf/img4.jpg",
      badgeColor: "bg-[#2C5745] text-white",
      border: "group-hover:border-[#2C5745]/60"
    }
  };

  const key = typeof event === "string" ? event : (event?.slug || event?.id);
  if (eventMap[key]) {
    return eventMap[key];
  }

  const category = typeof event === "string" ? event : event?.category;
  const categoryFallback = {
    "Hackathon": {
      image: "/Poster/Hackathon.png",
      badgeColor: "bg-[#2C5745] text-white",
      border: "group-hover:border-[#2C5745]/60"
    },
    "Competitive Programming": {
      image: "/Raw Images/Hackathon/20260418_101029.jpg",
      badgeColor: "bg-[#EB7D00] text-white",
      border: "group-hover:border-[#EB7D00]/60"
    },
    "Design": {
      image: "/Raw Images/Hackathon/20260418_110744.jpg",
      badgeColor: "bg-[#AE2448] text-white",
      border: "group-hover:border-[#AE2448]/60"
    },
    "Robotics": {
      image: "/Raw Images/esport/DSC08175.JPG",
      badgeColor: "bg-[#AE2448] text-white",
      border: "group-hover:border-[#AE2448]/60"
    },
    "IoT / Hardware": {
      image: "/Raw Images/tech treasyre hunt/DSC_0111.jpg",
      badgeColor: "bg-[#2C5745] text-white",
      border: "group-hover:border-[#2C5745]/60"
    },
    "Gaming": {
      image: "/Poster/Esport.png",
      badgeColor: "bg-[#EB7D00] text-white",
      border: "group-hover:border-[#EB7D00]/60"
    },
    "Cybersecurity": {
      image: "/Poster/Ctf.png",
      badgeColor: "bg-[#AE2448] text-white",
      border: "group-hover:border-[#AE2448]/60"
    },
    "Adventure": {
      image: "/Poster/Tech treasure hunt.png",
      badgeColor: "bg-[#EB7D00] text-white",
      border: "group-hover:border-[#EB7D00]/60"
    },
    "Workshop": {
      image: "/Raw Images/ctf/img4.jpg",
      badgeColor: "bg-[#2C5745] text-white",
      border: "group-hover:border-[#2C5745]/60"
    }
  };

  return categoryFallback[category] || {
    image: "/Poster/Hackathon.png",
    badgeColor: "bg-[#2C5745] text-white",
    border: "group-hover:border-[#2C5745]/60"
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
  const categories = ["All Categories", ...Array.from(new Set(events.map(e => e.category)))];
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
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white">
            Explore <SparklesText className="text-[#2C5745] dark:text-[#EB7D00]">Events</SparklesText>
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
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C5745]/50 dark:focus:ring-[#EB7D00]/50 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Filter */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C5745]/50 dark:focus:ring-[#EB7D00]/50 text-zinc-900 dark:text-zinc-100 cursor-pointer min-w-[160px] appearance-none"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            {/* Team Size Filter */}
            <select 
              value={selectedTeamSize}
              onChange={(e) => setSelectedTeamSize(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C5745]/50 dark:focus:ring-[#EB7D00]/50 text-zinc-900 dark:text-zinc-100 cursor-pointer min-w-[140px] appearance-none"
            >
              {teamSizes.map(size => <option key={size} value={size}>{size}</option>)}
            </select>

            {/* Prize Filter */}
            <select 
              value={selectedPrize}
              onChange={(e) => setSelectedPrize(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C5745]/50 dark:focus:ring-[#EB7D00]/50 text-zinc-900 dark:text-zinc-100 cursor-pointer min-w-[160px] appearance-none"
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
              className="bg-[#2C5745] text-white hover:bg-[#234537]"
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            const styles = getEventStyles(event);
            
            return (
              <MagicCard 
                key={event.id}
                className="flex flex-col h-full rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Event Image Banner */}
                <div className="relative h-48 w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={styles.image} 
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${styles.badgeColor} shadow-md`}>
                      <Tag className="w-3 h-3" />
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex flex-col flex-1 p-6 relative">
                  <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 group-hover:text-[#2C5745] dark:group-hover:text-[#EB7D00] transition-colors">
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
                    <div className="flex items-center text-sm font-bold text-[#2C5745] dark:text-[#EB7D00]">
                      <Trophy className="w-4 h-4 mr-3 text-[#EB7D00]" />
                      <span>
                        {event.prizePool > 0 ? `Prize Pool: ${event.currency} ${event.prizePool.toLocaleString()}` : "No Prize Pool"}
                      </span>
                    </div>
                  </div>

                  <Link href={`/events/${event.slug}`} className="mt-auto">
                    <Button className="w-full rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-[#2C5745] dark:hover:bg-[#EB7D00] dark:hover:text-black transition-all cursor-pointer">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </MagicCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
