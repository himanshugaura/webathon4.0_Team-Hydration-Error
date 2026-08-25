# 🌟 NIRVAN '26 — Annual Technical Fest

> **Where Ideas Become Innovation**  
> *Developed by Team Hydration Error for Web-a-thon 4.0 Frontend Design Challenge*  
> *Graphic Era Hill University (GEHU), Haldwani Campus*

---

## 📌 Overview

**NIRVAN '26** is the official modern web application for the flagship annual technical symposium at Graphic Era Hill University. Engineered with a retro-futuristic aesthetic, fluid 3D graphics, seamless animation pipelines, and a student-first registration and squad invitation experience.

---

## ✨ Key Highlights & Features

### 🚀 1. Frictionless Student Profile & Session Persistence
- **Zero Repetitive Data Entry**: Once a student signs in or inputs their academic credentials (`Name`, `Email`, `Student ID / Roll No`, `Branch`, `Year`, `Phone`, `College`), the session state is stored and automatically populated across every event registration form on the platform.
- **Smart Form Auto-Fill**: Students never have to type their personal details again when registering for multiple hackathons, coding contests, or workshops.
- **Dynamic Session Switching**: Fast toggling between student profiles directly from the registration sidebar or the student dashboard.

### 👥 2. Team Member Invitation & Squad Management System
- **Multi-Mode Team Invites**:
  - **Direct Email Invitations**: Invite team members in real-time by entering their email address.
  - **One-Click Squad Join Links**: Generate and copy direct shareable squad invitation links (`https://nirvan.gehu.ac.in/join?team=...`).
  - **Unique Squad Codes**: Instant 6-digit squad access codes for rapid in-person pairing.
- **Real-Time Squad Tracker**:
  - Displays the registered Team Leader badge, active team slots, accepted team members, and pending invites.
  - Interactive member management with instant invite removal and slot vacancy tracking.
- **Intelligent Team Constraints**:
  - Enforces minimum and maximum team limits based on each event's category rules (e.g., Solo 1, HackSprint 3–5, RoboWar 2–4).

### 🎫 3. Unified Student Dashboard (`/dashboard`)
- **Digital Event Entry Passes**: Interactive pass cards with dynamic QR verification, unique pass IDs (`NIRVAN-26-XXXX`), and event timestamps.
- **Schedule & Status Filtering**: Filter registrations by `All`, `Upcoming`, and `Completed` events.
- **Pass Actions**: One-click pass downloads (`PDF/Image`) and direct entry sharing.
- **Squad Overview**: View and manage all team members across each registered event directly from the dashboard.

### 🎮 4. Real-Time 3D Interactive Hero Experience
- **Interactive 3D Robot Mascot**: Built with `Three.js`, `@react-three/fiber`, and `@react-three/drei`, featuring real-time lighting response, eye blinking cycles, studio reflections, and interactive mouse-following physics.
- **Deciphering Cyber Tagline**: Animated tagline deciphering animation powered by the custom `SpecialText` component.

### 🔍 5. Event Discovery & Deep Detail Pages (`/events` & `/events/[slug]`)
- **Real Event Photography & Posters**: Official campus posters and real high-resolution event action photos from previous editions.
- **Faceted Multi-Filter Bar**:
  - Live search by event name or description keywords.
  - Category filters: `Hackathon`, `Competitive Programming`, `Design`, `Robotics`, `IoT / Hardware`, `Gaming`, `Cybersecurity`, `Adventure`, `Workshop`.
  - Team size filters (`Solo`, `Team 2-3`, `Team 4+`).
  - Prize pool range filters (`No Prize`, `Under ₹10,000`, `₹10,000 - ₹20,000`, `Over ₹20,000`).
- **Comprehensive Event Specs**: Full breakdown of schedule dates, time, duration, venue, entry fee, prize pool, eligibility rules, and regulations.

### 🖼️ 6. Fullscreen Visual Memory Archive (`/gallery`)
- **Real Campus Photo Archive**: High-resolution event moments from Hackathons, E-Sports, CTF CyberQuest, and Treasure Hunt.
- **Fullscreen Lightbox Experience**:
  - Elevated modal with zero navbar interference (`z-[100]`).
  - Next/Previous image cycling with keyboard arrow navigation (`←` / `→`) and `Escape` to close.
  - Multi-trigger closing (corner close `X`, top-right floating button, or backdrop tap).
  - Year and category filter pills (`HackSprint`, `CTF`, `E-Sports`, `Tech Hunt`).

### ⏳ 7. Timeline & Dynamic Festival Countdown
- **Live Shifting Countdown**: Real-time ticker counting down to the festival opening on October 24, 2026.
- **3-Day Interactive Event Timeline**: Continuous scroll-tracking laser line with distinctive **Royal Purple** (`#7C3AED` / `#A78BFA`) Day 1, Day 2, and Day 3 milestone indicators and venue schedules.

### 🤝 8. About & Sponsorship Portals (`/about` & `/sponsors`)
- **About NIRVAN**: Core pillars, heritage of engineering excellence, student organizing committee directory, and campus location specs.
- **Sponsorship Portal**: Tiered sponsorship tiers (Title, Powered By, Associate, Community), deliverable perks matrix, and sponsorship prospectus download action.

---

## 🎨 Design System & Aesthetics

| Element | Specification | Rationale |
|---|---|---|
| **Typography (Headings)** | `Bitcount Single` & `Bitcount Prop Single` (Google Fonts, `font-weight: 400`) | Retro-futuristic, modular pixel display typography with crisp readability. |
| **Typography (Body)** | `Geist Sans` & `Geist Mono` | Ultra-clean, modern geometric sans-serif for UI elements and technical documentation. |
| **Primary Color** | `#2C5745` (Forest / Hunter Green) | Grounded, high-contrast primary branding for buttons, badges, and active elements. |
| **Warm Accent Color** | `#EB7D00` (Sunset Ochre / Amber Orange) | High-energy accent for countdowns, CTAs, and dark-mode highlight words. |
| **Crimson Accent** | `#AE2448` (Crimson / Deep Berry) | Distinctive secondary accent for category tags and technical tracks. |
| **Timeline Accent** | `#7C3AED` / `#A78BFA` (Royal Purple) | Dedicated timeline day indicator palette for multi-day schedule hierarchy. |
| **Card Skeleton** | `MagicCard` (`framer-motion`) | Subtle, non-intrusive radial spotlight border glow on hover with gentle light-mode sheen. |
| **Buttons** | `ShimmerButton` | Crisp black-and-white rotating shimmer spark button for primary high-conversion CTAs. |
| **Heading Sparkles** | `SparklesText` | Inline accent particle glow highlighting key words in headings. |
| **Ambient Laser Beams** | `BackgroundBeams` (`components/ui/background-beams.jsx`) | Zero-delay, infinite non-stop looping background laser beams rendered on all inner pages. |
| **Theme Support** | `next-themes` | Instant toggle between Light Mode (`#cecbcb` base) and Dark Mode (`neutral-950`). |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Turbopack, React 19, JavaScript only)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS Custom Properties
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 📁 Project Structure

```text
├── app/
│   ├── about/page.js              # Fest essence, pillars, team & history
│   ├── dashboard/page.js          # Student portal: passes, squad, registered events
│   ├── events/
│   │   ├── page.js                # Events discovery grid & multi-filter system
│   │   ├── [slug]/page.js         # Dynamic event detail page & rules
│   │   └── [slug]/register/page.js# Streamlined registration & squad invitation flow
│   ├── gallery/page.js            # Fullscreen visual memory archive & lightbox
│   ├── login/page.js              # Student authentication portal (Sign In)
│   ├── register/page.js           # Student authentication portal (Sign Up)
│   ├── sponsors/page.js           # Tiered sponsorship & partner portal
│   ├── globals.css                # Tailwind v4 setup, typography & design tokens
│   ├── layout.js                  # Root layout with theme provider & inner beams
│   └── page.js                    # Landing page: 3D robot hero, countdown, glimpses, timeline
├── components/
│   ├── auth/AuthCard.jsx          # Dual-tab login & registration card
│   ├── glimpse/
│   │   ├── Glimpses.jsx           # Festival glimpses section & countdown
│   │   └── carousel.jsx           # 3D curved stream image carousel
│   ├── hero/
│   │   ├── hero.jsx               # Interactive 3D WebGL robot mascot
│   │   └── timeline.jsx           # Royal purple 3-day milestone timeline
│   ├── ui/
│   │   ├── background-beams.jsx   # Infinite looping SVG laser beams
│   │   ├── magic-card.jsx         # Spotlight interactive card frame
│   │   ├── shimmer-button.jsx     # Rotating spark CTA button
│   │   ├── sparkles-text.jsx      # Ambient keyword particle highlighter
│   │   ├── special-text.jsx       # Deciphering cyber font animation
│   │   ├── countdown.jsx          # Shifting numerical countdown timer
│   │   └── button.jsx             # Standard button primitives
│   ├── InnerPageBeams.jsx         # Route-aware conditional background beams
│   ├── Navbar.jsx                 # Global glassmorphism navigation header
│   └── theme-provider.jsx         # Next-themes client wrapper
├── lib/
│   ├── data.js                    # Single source of truth: fest info, 9 events, timeline, sponsors
│   └── utils.js                   # Class merging utility (clsx + twMerge)
├── public/
│   ├── Poster/                    # Official event posters (Hackathon, CTF, E-Sports, Tech Hunt)
│   ├── Raw Images/                # Real event action photo archive from previous editions
│   └── gehu_logo.svg              # Graphic Era Hill University vector logo
└── package.json
```

---

## ⚡ Getting Started & Local Development

### Prerequisites
- **Node.js**: `v18.17.0` or higher
- **pnpm**: `v9.0.0` or higher (`npm install -g pnpm`)

### 1. Clone the Repository
```bash
git clone https://github.com/himanshugaura/webathon4.0_Team-Hydration-Error.git
cd webathon4.0_Team-Hydration-Error
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Start the Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
```bash
pnpm build
pnpm start
```

---

## 🏆 Web-a-thon 4.0 Challenge Criteria Fulfillment

- [x] **Innovative UX / UI**: 3D interactive hero, retro-futuristic `Bitcount Single` headings, subtle `MagicCard` hover sheens, and infinite laser beams.
- [x] **Zero-Friction Registration**: Automatic student detail caching and persistence across events without repetitive input.
- [x] **Dynamic Team Invites**: Real-time team member invitations via email, sharable links, and squad codes with live status tracking.
- [x] **Complete Fest Portal**: Comprehensive event discovery, live countdown, 3-day timeline, fullscreen gallery lightbox, student dashboard with digital passes, about, and sponsor tiers.
- [x] **Clean Engineering**: 100% JavaScript (App Router, Next.js 15, React 19), Tailwind CSS v4, zero hydration warnings, and responsive layout.

---

*NIRVAN '26 — Graphic Era Hill University, Haldwani Campus*  
*Crafted with ❤️ by **Team Hydration Error***
