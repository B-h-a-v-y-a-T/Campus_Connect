"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Toast({
  message,
  visible,
  type = "success",
}: {
  message: string;
  visible: boolean;
  type?: "success" | "error" | "info";
}) {
  const colors = {
    success: "bg-emerald-500/90 border-emerald-400/30",
    error: "bg-red-500/90 border-red-400/30",
    info: "bg-violet-500/90 border-violet-400/30",
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-[100] rounded-xl border px-5 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-xl ${colors[type]}`}
    >
      {message}
    </motion.div>
  );
}
