"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Crown,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  PenTool,
  Award,
  Zap,
} from "lucide-react";
import { getSponsorTiers, sponsorTier } from "@/lib/mock-data";
import Toast from "@/components/ui/toast";
import confetti from "canvas-confetti";

export default function SponsorPage() {
  const [tiers, setTiers] = useState(getSponsorTiers);
  const [signingTier, setSigningTier] = useState<string | null>(null);
  const [signatureName, setSignatureName] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000);
  }, []);

  const handleSponsor = useCallback(() => {
    if (!signingTier || !signatureName.trim()) return;
    const success = sponsorTier(signingTier);
    if (success) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#F59E0B", "#FBBF24", "#FCD34D", "#8B5CF6"],
      });
      setTiers([...getSponsorTiers()]);
      showToast(`🎉 ${signatureName} signed as sponsor! Deal confirmed.`);
    }
    setSigningTier(null);
    setSignatureName("");
  }, [signingTier, signatureName, showToast]);

  const tierIcons: Record<string, React.ReactNode> = {
    "tier-gold": <Crown className="h-6 w-6" />,
    "tier-silver": <Award className="h-6 w-6" />,
    "tier-bronze": <Zap className="h-6 w-6" />,
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-amber-600/15 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-300 mb-6">
              <Briefcase className="h-3.5 w-3.5" />
              Sponsorship Hub
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Partner With Us
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-slate-400"
          >
            Join the most influential campus events. Choose your tier and sign
            in seconds.
          </motion.p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Reach", value: "50,000+", icon: <TrendingUp className="h-5 w-5 text-violet-400" /> },
            { label: "Events Covered", value: "24", icon: <Sparkles className="h-5 w-5 text-amber-400" /> },
            { label: "Active Sponsors", value: "11", icon: <Briefcase className="h-5 w-5 text-emerald-400" /> },
            { label: "Satisfaction", value: "98%", icon: <CheckCircle2 className="h-5 w-5 text-rose-400" /> },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl glass-card p-5 text-center"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Tier Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const isFull = tier.filledSlots >= tier.totalSlots;
            const pct = (tier.filledSlots / tier.totalSlots) * 100;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="rounded-2xl glass-card overflow-hidden"
              >
                {/* Tier Header */}
                <div
                  className="p-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${tier.color}15, transparent)`,
                  }}
                >
                  <div
                    className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${tier.color}20`, color: tier.color }}
                  >
                    {tierIcons[tier.id]}
                  </div>
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: tier.color }}
                  >
                    {tier.name} Tier
                  </h3>
                  <p className="text-3xl font-extrabold text-white mt-2">
                    {tier.price}
                  </p>
                </div>

                {/* Perks List */}
                <div className="px-6 pb-4">
                  <ul className="space-y-2.5">
                    {tier.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <CheckCircle2
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: tier.color }}
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vacancy Bar */}
                <div className="px-6 pb-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span>Vacancy</span>
                    <span>
                      {tier.filledSlots}/{tier.totalSlots} Sold
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: tier.color }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  {isFull ? (
                    <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-800/50 py-3 text-sm font-medium text-slate-500">
                      Fully Booked
                    </div>
                  ) : (
                    <button
                      onClick={() => setSigningTier(tier.id)}
                      className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:shadow-lg"
                      style={{
                        backgroundColor: tier.color,
                        boxShadow: `0 0 24px ${tier.color}30`,
                      }}
                    >
                      Sponsor Now →
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── SIGNING MODAL ───────────────── */}
      <AnimatePresence>
        {signingTier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSigningTier(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <PenTool className="h-6 w-6 text-violet-400" />
                <h2 className="text-xl font-bold text-white">
                  Sign Sponsorship Deal
                </h2>
              </div>

              <p className="text-sm text-slate-400 mb-6">
                Enter your name or company name below to sign the{" "}
                <strong className="text-white">
                  {tiers.find((t) => t.id === signingTier)?.name} Tier
                </strong>{" "}
                sponsorship agreement.
              </p>

              {/* Signature Input */}
              <div className="mb-6">
                <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                  Authorized Signature
                </label>
                <input
                  type="text"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="Type your name…"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-lg font-script text-white placeholder:text-slate-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 italic"
                  autoFocus
                />
                {signatureName && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-center text-2xl italic text-violet-300 font-serif"
                  >
                    {signatureName}
                  </motion.p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSponsor}
                  disabled={!signatureName.trim()}
                  className="flex-1 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ✍️ Sign & Confirm
                </button>
                <button
                  onClick={() => {
                    setSigningTier(null);
                    setSignatureName("");
                  }}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-400 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
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
