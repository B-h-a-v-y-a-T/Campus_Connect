// ──────────────────────────────────────────────
// Campus Connect — Mock Data Layer (Zero DB)
// ──────────────────────────────────────────────

export type Role = "student" | "admin" | "sponsor";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: "tech" | "cultural" | "sports" | "workshop" | "social";
  image: string;
  attendees: number;
  maxAttendees: number;
  organizer: string;
  price: number; // 0 = free
  trending: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  coins: number;
  eventsAttended: number;
  registeredEvents: string[]; // event ids
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  coins: number;
  eventsAttended: number;
}

export interface SponsorTier {
  id: string;
  name: string;
  color: string;
  price: string;
  perks: string[];
  totalSlots: number;
  filledSlots: number;
}

export interface ScanRecord {
  id: string;
  studentName: string;
  eventTitle: string;
  timestamp: string;
  status: "verified" | "invalid";
}

export interface BudgetItem {
  name: string;
  allocated: number;
  spent: number;
}

// ─── EVENTS ──────────────────────────────────
export const events: Event[] = [
  {
    id: "evt-001",
    title: "HackSphere 2026",
    description:
      "36-hour hackathon with mentorship from industry leaders. Build, pitch, win!",
    date: "2026-03-15",
    time: "09:00 AM",
    location: "Innovation Hub, Block A",
    category: "tech",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    attendees: 142,
    maxAttendees: 200,
    organizer: "IEEE Student Branch",
    price: 0,
    trending: true,
  },
  {
    id: "evt-002",
    title: "Neon Nights — Cultural Fest",
    description:
      "Dance battles, live bands, poetry slams, and a midnight food carnival.",
    date: "2026-03-22",
    time: "06:00 PM",
    location: "Open Air Theatre",
    category: "cultural",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    attendees: 320,
    maxAttendees: 500,
    organizer: "Cultural Committee",
    price: 100,
    trending: true,
  },
  {
    id: "evt-003",
    title: "AI/ML Workshop",
    description:
      "Hands-on workshop on building ML pipelines with TensorFlow & Hugging Face.",
    date: "2026-03-10",
    time: "02:00 PM",
    location: "Seminar Hall 2",
    category: "workshop",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
    attendees: 58,
    maxAttendees: 80,
    organizer: "GDSC",
    price: 0,
    trending: false,
  },
  {
    id: "evt-004",
    title: "Inter-Dept Cricket League",
    description: "T20 format with live commentary, cheerleaders, and prizes.",
    date: "2026-04-01",
    time: "08:00 AM",
    location: "Sports Ground",
    category: "sports",
    image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&q=80",
    attendees: 180,
    maxAttendees: 300,
    organizer: "Sports Club",
    price: 50,
    trending: true,
  },
  {
    id: "evt-005",
    title: "Startup Mixer",
    description:
      "Network with founders, VCs, and mentors. Pitch your idea in 60 seconds.",
    date: "2026-03-28",
    time: "05:00 PM",
    location: "Incubation Centre",
    category: "social",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
    attendees: 45,
    maxAttendees: 60,
    organizer: "E-Cell",
    price: 0,
    trending: false,
  },
  {
    id: "evt-006",
    title: "Cyber Security CTF",
    description:
      "Capture-the-flag competition — crack ciphers, exploit vulnerabilities, win glory.",
    date: "2026-04-05",
    time: "10:00 AM",
    location: "Lab 301, CS Block",
    category: "tech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
    attendees: 72,
    maxAttendees: 100,
    organizer: "CyberSec Club",
    price: 0,
    trending: false,
  },
];

// ─── LEADERBOARD ─────────────────────────────
export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Arjun Mehta", avatar: "AM", coins: 2450, eventsAttended: 14 },
  { rank: 2, name: "Priya Sharma", avatar: "PS", coins: 2100, eventsAttended: 12 },
  { rank: 3, name: "Rahul Dev", avatar: "RD", coins: 1800, eventsAttended: 11 },
  { rank: 4, name: "Sneha Iyer", avatar: "SI", coins: 1650, eventsAttended: 9 },
  { rank: 5, name: "Karan Singh", avatar: "KS", coins: 1400, eventsAttended: 8 },
];

// ─── SPONSOR TIERS ───────────────────────────
export const sponsorTiers: SponsorTier[] = [
  {
    id: "tier-gold",
    name: "Gold",
    color: "#F59E0B",
    price: "₹2,00,000",
    perks: [
      "Main stage banner",
      "Logo on all merchandise",
      "Dedicated stall (10×10 ft)",
      "5 social media shoutouts",
      "VIP seating for 10",
    ],
    totalSlots: 3,
    filledSlots: 2,
  },
  {
    id: "tier-silver",
    name: "Silver",
    color: "#94A3B8",
    price: "₹1,00,000",
    perks: [
      "Side banner placement",
      "Logo on website",
      "Shared stall (5×5 ft)",
      "2 social media posts",
    ],
    totalSlots: 5,
    filledSlots: 3,
  },
  {
    id: "tier-bronze",
    name: "Bronze",
    color: "#CD7F32",
    price: "₹50,000",
    perks: [
      "Logo on website",
      "Mention in opening ceremony",
      "1 social media post",
    ],
    totalSlots: 10,
    filledSlots: 6,
  },
];

// ─── BUDGET DATA ─────────────────────────────
export const budgetData: BudgetItem[] = [
  { name: "Venue", allocated: 50000, spent: 45000 },
  { name: "Food & Bev", allocated: 30000, spent: 28000 },
  { name: "Prizes", allocated: 40000, spent: 25000 },
  { name: "Marketing", allocated: 20000, spent: 18000 },
  { name: "Tech/AV", allocated: 15000, spent: 12000 },
];

// ─── SCAN LOG ────────────────────────────────
export const scanLog: ScanRecord[] = [
  {
    id: "scan-001",
    studentName: "Arjun Mehta",
    eventTitle: "HackSphere 2026",
    timestamp: "2026-03-15 09:12 AM",
    status: "verified",
  },
  {
    id: "scan-002",
    studentName: "Priya Sharma",
    eventTitle: "HackSphere 2026",
    timestamp: "2026-03-15 09:15 AM",
    status: "verified",
  },
];

// ─── MOCK DB FUNCTIONS ───────────────────────
let _events = [...events];
let _sponsorTiers = sponsorTiers.map((t) => ({ ...t }));
let _scanLog = [...scanLog];
let _registeredEvents: string[] = [];
let _coins = 1250;

export function getEvents() {
  return _events;
}

export function getEventsByCategory(category: string) {
  if (category === "all") return _events;
  return _events.filter((e) => e.category === category);
}

export function searchEvents(query: string) {
  const q = query.toLowerCase();
  return _events.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.organizer.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q)
  );
}

export function registerForEvent(eventId: string) {
  const event = _events.find((e) => e.id === eventId);
  if (event && !_registeredEvents.includes(eventId)) {
    event.attendees += 1;
    _registeredEvents.push(eventId);
    _coins += 50; // reward coins
    return true;
  }
  return false;
}

export function isRegistered(eventId: string) {
  return _registeredEvents.includes(eventId);
}

export function getCoins() {
  return _coins;
}

export function getSponsorTiers() {
  return _sponsorTiers;
}

export function sponsorTier(tierId: string) {
  const tier = _sponsorTiers.find((t) => t.id === tierId);
  if (tier && tier.filledSlots < tier.totalSlots) {
    tier.filledSlots += 1;
    return true;
  }
  return false;
}

export function getScanLog() {
  return _scanLog;
}

export function addScanRecord(record: Omit<ScanRecord, "id">) {
  const newRecord: ScanRecord = {
    ...record,
    id: `scan-${String(_scanLog.length + 1).padStart(3, "0")}`,
  };
  _scanLog.unshift(newRecord);
  return newRecord;
}

export function getRegisteredEvents() {
  return _registeredEvents;
}

export function getBudgetData() {
  return budgetData;
}

export function getLeaderboard() {
  return leaderboard;
}

export function getTrendingEvents() {
  return _events.filter((e) => e.trending);
}
