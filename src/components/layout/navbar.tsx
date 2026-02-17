"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/user-context";
import { Role, getCoins } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  ShieldCheck,
  Briefcase,
  ChevronDown,
  Coins,
} from "lucide-react";

const roleConfig: Record<Role, { label: string; icon: React.ReactNode; color: string }> = {
  student: {
    label: "Student",
    icon: <GraduationCap className="h-4 w-4" />,
    color: "text-violet-400",
  },
  admin: {
    label: "Admin",
    icon: <ShieldCheck className="h-4 w-4" />,
    color: "text-emerald-400",
  },
  sponsor: {
    label: "Sponsor",
    icon: <Briefcase className="h-4 w-4" />,
    color: "text-amber-400",
  },
};

export default function Navbar() {
  const { role, setRole, userName } = useUser();
  const [open, setOpen] = React.useState(false);
  const coins = getCoins();

  const navLinks =
    role === "student"
      ? [
          { href: "/", label: "Events" },
          { href: "/profile", label: "Profile" },
        ]
      : role === "sponsor"
      ? [
          { href: "/", label: "Home" },
          { href: "/sponsor", label: "Sponsorship Hub" },
        ]
      : [
          { href: "/", label: "Home" },
          { href: "/admin", label: "Dashboard" },
        ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-9 w-9 rounded-lg overflow-hidden">
            <Image
              src="/logo.jpeg"
              alt="Campus Connect Logo"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Campus<span className="text-violet-400">Connect</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-slate-300 hover:text-white rounded-md hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Coin Wallet (student only) */}
          {role === "student" && (
            <motion.div
              key={coins}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1.5"
            >
              <Coins className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-semibold text-amber-300">
                {coins.toLocaleString()}
              </span>
            </motion.div>
          )}

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors"
            >
              <span className={roleConfig[role].color}>
                {roleConfig[role].icon}
              </span>
              <span className="hidden sm:inline">{roleConfig[role].label}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-slate-900/95 backdrop-blur-xl p-1.5 shadow-2xl"
                >
                  <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    Simulate Role
                  </p>
                  {(["student", "admin", "sponsor"] as Role[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        role === r
                          ? "bg-violet-600/20 text-violet-300"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className={roleConfig[r].color}>
                        {roleConfig[r].icon}
                      </span>
                      <div className="text-left">
                        <p className="font-medium">{roleConfig[r].label}</p>
                        <p className="text-[11px] text-slate-500">
                          {r === "student"
                            ? "Arjun Mehta"
                            : r === "admin"
                            ? "Dr. Ramesh Kumar"
                            : "TechCorp Inc."}
                        </p>
                      </div>
                      {role === r && (
                        <span className="ml-auto text-[10px] bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Avatar */}
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white">
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>
      </div>
    </nav>
  );
}
