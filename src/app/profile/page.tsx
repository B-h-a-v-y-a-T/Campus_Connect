"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Trophy,
  Coins,
  TrendingUp,
  CheckCircle2,
  Award,
  Star,
  Target,
} from "lucide-react";
import {
  getRegisteredEvents,
  getEvents,
  getCoins,
  getLeaderboard,
} from "@/lib/mock-data";

export default function ProfilePage() {
  const registeredEventIds = getRegisteredEvents();
  const allEvents = getEvents();
  const coins = getCoins();
  const leaderboard = getLeaderboard();

  const registeredEvents = allEvents.filter((e) =>
    registeredEventIds.includes(e.id)
  );

  const userRank =
    leaderboard.findIndex((entry) => entry.name === "Arjun Mehta") + 1;
  const userStats = leaderboard.find((entry) => entry.name === "Arjun Mehta");

  const achievements = [
    { id: 1, title: "Early Bird", desc: "Registered for 3+ events", icon: "🐦", unlocked: registeredEvents.length >= 3 },
    { id: 2, title: "Tech Enthusiast", desc: "Attended 2 tech events", icon: "💻", unlocked: true },
    { id: 3, title: "Social Butterfly", desc: "Attended 5+ events", icon: "🦋", unlocked: registeredEvents.length >= 5 },
    { id: 4, title: "Top 5 Ranker", desc: "Reached top 5 on leaderboard", icon: "🏆", unlocked: userRank <= 5 },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-violet-500/25">
                AM
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Arjun Mehta</h1>
                <p className="text-slate-400 flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4" />
                  arjun.mehta@university.edu
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="rounded-2xl glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <Coins className="h-5 w-5 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-white">{coins}</p>
            <p className="text-xs text-slate-500 mt-1">Total Coins</p>
          </div>

          <div className="rounded-2xl glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white">{registeredEvents.length}</p>
            <p className="text-xs text-slate-500 mt-1">Events Registered</p>
          </div>

          <div className="rounded-2xl glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <Trophy className="h-5 w-5 text-rose-400" />
            </div>
            <p className="text-2xl font-bold text-white">#{userRank}</p>
            <p className="text-xs text-slate-500 mt-1">Leaderboard Rank</p>
          </div>

          <div className="rounded-2xl glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <Award className="h-5 w-5 text-violet-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {achievements.filter((a) => a.unlocked).length}/{achievements.length}
            </p>
            <p className="text-xs text-slate-500 mt-1">Achievements</p>
          </div>
        </motion.div>
      </section>

      {/* Profile Info */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl glass-card p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-violet-400" />
              Personal Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm text-white">arjun.mehta@university.edu</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="text-sm text-white">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Department</p>
                  <p className="text-sm text-white">Computer Science & Engineering</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Year</p>
                  <p className="text-sm text-white">3rd Year</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl glass-card p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-violet-400" />
              Achievements
            </h2>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-3 rounded-xl p-3 transition-all ${
                    achievement.unlocked
                      ? "bg-violet-500/10 border border-violet-500/20"
                      : "bg-white/[0.02] border border-white/5 opacity-50"
                  }`}
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {achievement.title}
                    </p>
                    <p className="text-xs text-slate-500">{achievement.desc}</p>
                  </div>
                  {achievement.unlocked && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registered Events */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl glass-card p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-violet-400" />
            My Registered Events ({registeredEvents.length})
          </h2>

          {registeredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">
                You haven&apos;t registered for any events yet.
              </p>
              <a
                href="/"
                className="inline-block mt-4 rounded-xl bg-violet-600 px-6 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
              >
                Browse Events
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {registeredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center gap-4 rounded-xl bg-white/[0.02] border border-white/5 p-4 hover:bg-white/[0.04] transition-all"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{event.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {event.location}
                      </span>
                    </div>
                  </div>
                  <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                    Registered
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Progress Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl glass-card p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-violet-400" />
            Engagement Progress
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Event Participation</span>
                <span className="text-white font-medium">
                  {registeredEvents.length} / 10 events
                </span>
              </div>
              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(registeredEvents.length / 10) * 100}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Coin Collection</span>
                <span className="text-white font-medium">{coins} / 2500 coins</span>
              </div>
              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(coins / 2500) * 100}%` }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Achievement Unlock</span>
                <span className="text-white font-medium">
                  {achievements.filter((a) => a.unlocked).length} / {achievements.length} unlocked
                </span>
              </div>
              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(achievements.filter((a) => a.unlocked).length / achievements.length) * 100}%`,
                  }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
