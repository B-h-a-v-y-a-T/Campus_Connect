"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/user-context";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Ticket,
  Trophy,
  TrendingUp,
  Sparkles,
  CalendarDays,
  Filter,
  CheckCircle2,
  Star,
} from "lucide-react";
import {
  getEvents,
  getEventsByCategory,
  searchEvents,
  registerForEvent,
  isRegistered,
  getLeaderboard,
  getTrendingEvents,
  getCoins,
  type Event,
} from "@/lib/mock-data";
import QRCode from "react-qr-code";
import confetti from "canvas-confetti";
import Toast from "@/components/ui/toast";

const categories = [
  { id: "all", label: "All Events", icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: "tech", label: "Tech", icon: <span>💻</span> },
  { id: "cultural", label: "Cultural", icon: <span>🎭</span> },
  { id: "sports", label: "Sports", icon: <span>🏏</span> },
  { id: "workshop", label: "Workshop", icon: <span>🔧</span> },
  { id: "social", label: "Social", icon: <span>🤝</span> },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function HomePage() {
  const { role } = useUser();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [, forceUpdate] = useState(0);

  const events =
    query.length > 0 ? searchEvents(query) : getEventsByCategory(category);
  const trending = getTrendingEvents();
  const leaderboard = getLeaderboard();
  const coins = getCoins();

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000);
  }, []);

  const handleRegister = useCallback(
    (eventId: string) => {
      const success = registerForEvent(eventId);
      if (success) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#8B5CF6", "#A78BFA", "#C4B5FD", "#7C3AED"],
        });
        showToast("🎉 Registered successfully! +50 Coins earned!");
        forceUpdate((n) => n + 1);
      }
    },
    [showToast]
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ─── HERO ─────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-fuchsia-600/15 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 text-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              {role === "student"
                ? `Welcome back! You have ${coins} coins`
                : role === "admin"
                ? "Admin Dashboard Active"
                : "Sponsor Portal Active"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
              The Ultimate
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Campus Hub
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-400"
          >
            Discover events, earn rewards, connect with sponsors — all in one
            place. Your campus life, supercharged.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-10 max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search events, clubs, categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 backdrop-blur-xl transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TRENDING CAROUSEL ────────────── */}
      {trending.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-12">
          <motion.div {...fadeUp} transition={{ delay: 0.5 }}>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-rose-400" />
              <h2 className="text-xl font-bold text-white">Trending Now</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {trending.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="min-w-[320px] rounded-2xl glass-card overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-rose-500/90 px-2.5 py-1 text-[10px] font-bold uppercase text-white">
                      <TrendingUp className="h-3 w-3" /> Trending
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white truncate">
                      {event.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" /> {event.attendees}/
                        {event.maxAttendees}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── CATEGORY FILTER ──────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-400">
            Filter by Category
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id);
                setQuery("");
              }}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                category === cat.id
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                  : "bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ─── EVENT GRID ───────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group rounded-2xl glass-card overflow-hidden cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className="rounded-lg bg-violet-600/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      {event.category}
                    </span>
                    {event.price === 0 ? (
                      <span className="rounded-lg bg-emerald-500/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                        FREE
                      </span>
                    ) : (
                      <span className="rounded-lg bg-amber-500/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                        ₹{event.price}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-400 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" /> {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {event.location}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 min-w-[80px] rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                          style={{
                            width: `${(event.attendees / event.maxAttendees) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {event.attendees}/{event.maxAttendees}
                      </span>
                    </div>

                    {isRegistered(event.id) ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Registered
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRegister(event.id);
                        }}
                        className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500 transition-colors"
                      >
                        RSVP
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {events.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">
              No events found. Try a different search or category.
            </p>
          </div>
        )}
      </section>

      {/* ─── LEADERBOARD ──────────────────── */}
      {role === "student" && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="h-5 w-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Leaderboard</h2>
              <span className="text-xs text-slate-500 ml-2">
                Top performers this semester
              </span>
            </div>
            <div className="rounded-2xl glass-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4 text-right">Coins</th>
                    <th className="px-6 py-4 text-right">Events</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry) => (
                    <motion.tr
                      key={entry.rank}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="px-6 py-4">
                        {entry.rank <= 3 ? (
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                              entry.rank === 1
                                ? "bg-amber-500/20 text-amber-400"
                                : entry.rank === 2
                                ? "bg-slate-300/20 text-slate-300"
                                : "bg-orange-500/20 text-orange-400"
                            }`}
                          >
                            {entry.rank}
                          </span>
                        ) : (
                          <span className="text-sm text-slate-500 pl-2">
                            {entry.rank}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold text-white">
                            {entry.avatar}
                          </div>
                          <span className="font-medium text-white">
                            {entry.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-1 text-amber-400 font-semibold text-sm">
                          <Star className="h-3.5 w-3.5" />{" "}
                          {entry.coins.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-slate-400">
                        {entry.eventsAttended}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── EVENT DETAIL MODAL ───────────── */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-3 right-3 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedEvent.title}
                    </h2>
                    <p className="text-sm text-violet-400 mt-1">
                      by {selectedEvent.organizer}
                    </p>
                  </div>
                  <span className="rounded-lg bg-violet-600/20 px-3 py-1 text-xs font-bold text-violet-300 uppercase">
                    {selectedEvent.category}
                  </span>
                </div>

                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                  {selectedEvent.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <CalendarDays className="h-4 w-4 text-violet-400" />
                    {selectedEvent.date}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="h-4 w-4 text-violet-400" />
                    {selectedEvent.time}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="h-4 w-4 text-violet-400" />
                    {selectedEvent.location}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Ticket className="h-4 w-4 text-violet-400" />
                    {selectedEvent.price === 0
                      ? "Free"
                      : `₹${selectedEvent.price}`}
                  </div>
                </div>

                {/* QR Ticket */}
                {isRegistered(selectedEvent.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-6 rounded-xl bg-white p-4 flex flex-col items-center"
                  >
                    <QRCode
                      value={`CAMPUS-CONNECT-TICKET-${selectedEvent.id}`}
                      size={140}
                    />
                    <p className="mt-2 text-xs font-mono text-slate-600">
                      DEMO-TICKET-{selectedEvent.id}
                    </p>
                  </motion.div>
                )}

                <div className="mt-6 flex gap-3">
                  {isRegistered(selectedEvent.id) ? (
                    <div className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 py-3 text-sm font-semibold text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> You&apos;re
                      Registered!
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRegister(selectedEvent.id)}
                      className="flex-1 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
                    >
                      🎟 RSVP Now
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-400 hover:bg-white/5 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        <Toast message={toast.message} visible={toast.visible} />
      </AnimatePresence>
    </div>
  );
}
