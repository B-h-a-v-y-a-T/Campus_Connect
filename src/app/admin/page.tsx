"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ScanLine,
  CheckCircle2,
  XCircle,
  Camera,
  Zap,
  Users,
  CalendarDays,
  DollarSign,
  Volume2,
} from "lucide-react";
import {
  getBudgetData,
  getScanLog,
  addScanRecord,
  getEvents,
  type ScanRecord,
} from "@/lib/mock-data";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Toast from "@/components/ui/toast";

const PIE_COLORS = ["#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#3B82F6"];

export default function AdminPage() {
  const [scanLog, setScanLog] = useState(getScanLog);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<"verified" | "invalid" | null>(null);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const budgetData = getBudgetData();
  const events = getEvents();

  const totalAllocated = budgetData.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgetData.reduce((sum, b) => sum + b.spent, 0);
  const totalAttendees = events.reduce((sum, e) => sum + e.attendees, 0);

  const pieData = budgetData.map((b) => ({
    name: b.name,
    value: b.spent,
  }));

  const barData = budgetData.map((b) => ({
    name: b.name,
    Allocated: b.allocated,
    Spent: b.spent,
  }));

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000);
  }, []);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch {
      showToast("Camera not available — use Simulate Scan instead");
    }
  }, [showToast]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  // Simulate scan success
  const simulateScanSuccess = useCallback(() => {
    const randomStudent = ["Arjun Mehta", "Priya Sharma", "Rahul Dev", "Sneha Iyer", "Karan Singh"];
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    const student = randomStudent[Math.floor(Math.random() * randomStudent.length)];

    const record = addScanRecord({
      studentName: student,
      eventTitle: randomEvent.title,
      timestamp: new Date().toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      status: "verified",
    });

    setScanLog([record, ...scanLog]);
    setScanResult("verified");
    showToast(`✅ ${student} verified for ${randomEvent.title}!`);

    // Play a beep sound
    try {
      const audioCtx = new AudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.frequency.value = 880;
      oscillator.type = "sine";
      gainNode.gain.value = 0.3;
      oscillator.start();
      setTimeout(() => oscillator.stop(), 200);
    } catch {
      // audio not supported
    }

    setTimeout(() => setScanResult(null), 2500);
  }, [events, scanLog, showToast]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-emerald-600/15 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          </motion.div>
          <p className="text-slate-400">
            Event management, budget tracking, and ticket verification.
          </p>
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
          {[
            {
              label: "Total Events",
              value: events.length,
              icon: <CalendarDays className="h-5 w-5 text-violet-400" />,
              delta: "+2 this week",
            },
            {
              label: "Total Attendees",
              value: totalAttendees.toLocaleString(),
              icon: <Users className="h-5 w-5 text-blue-400" />,
              delta: "+120 today",
            },
            {
              label: "Budget Allocated",
              value: `₹${(totalAllocated / 1000).toFixed(0)}K`,
              icon: <DollarSign className="h-5 w-5 text-emerald-400" />,
              delta: `₹${((totalAllocated - totalSpent) / 1000).toFixed(0)}K remaining`,
            },
            {
              label: "Scans Today",
              value: scanLog.length,
              icon: <ScanLine className="h-5 w-5 text-amber-400" />,
              delta: "All verified",
            },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className="rounded-2xl glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                {stat.icon}
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {stat.delta}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Charts Row */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Budget Pie */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Budget Distribution
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  stroke="none"
                  paddingAngle={3}
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#f1f5f9",
                  }}
                  formatter={(value: number | undefined) => [`₹${(value ?? 0).toLocaleString()}`, "Spent"]}
                />
                <Legend
                  formatter={(value: string) => (
                    <span className="text-xs text-slate-400">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Budget Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Budget vs Spend
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={{ stroke: "#334155" }}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={{ stroke: "#334155" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#f1f5f9",
                  }}
                  formatter={(value: number | undefined) => `₹${(value ?? 0).toLocaleString()}`}
                />
                <Legend
                  formatter={(value: string) => (
                    <span className="text-xs text-slate-400">{value}</span>
                  )}
                />
                <Bar dataKey="Allocated" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Spent" fill="#EC4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* ─── QR SCANNER SECTION ───────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ScanLine className="h-5 w-5 text-violet-400" />
              <h3 className="text-lg font-semibold text-white">
                QR Ticket Scanner
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {/* DEBUG / SIMULATE BUTTON */}
              <button
                onClick={simulateScanSuccess}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <Zap className="h-3.5 w-3.5" />
                Simulate Scan Success
              </button>
              <button
                onClick={() => {
                  setShowScanner(!showScanner);
                  if (!showScanner) startCamera();
                  else stopCamera();
                }}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 transition-colors"
              >
                <Camera className="h-3.5 w-3.5" />
                {showScanner ? "Hide Camera" : "Open Camera"}
              </button>
            </div>
          </div>

          {/* Camera Preview */}
          {showScanner && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 object-cover"
                />
                {/* Scan overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-48 w-48 border-2 border-violet-400/50 rounded-2xl animate-pulse" />
                </div>
                {!cameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                    <p className="text-sm text-slate-400">
                      Camera loading… Use &quot;Simulate Scan&quot; instead.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Scan Result Popup */}
          <AnimatePresence>
            {scanResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`mb-6 flex items-center justify-center gap-3 rounded-2xl p-6 ${
                  scanResult === "verified"
                    ? "bg-emerald-500/10 border border-emerald-500 /20"
                    : "bg-red-500/10 border border-red-500/20"
                }`}
              >
                {scanResult === "verified" ? (
                  <>
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                    <div>
                      <p className="text-xl font-bold text-emerald-400">
                        ✅ Verified!
                      </p>
                      <p className="text-sm text-slate-400">
                        Ticket is valid. Entry granted.
                      </p>
                    </div>
                    <Volume2 className="h-5 w-5 text-emerald-400 animate-pulse" />
                  </>
                ) : (
                  <>
                    <XCircle className="h-10 w-10 text-red-400" />
                    <div>
                      <p className="text-xl font-bold text-red-400">
                        ❌ Invalid
                      </p>
                      <p className="text-sm text-slate-400">
                        Ticket not recognized.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scan Log */}
          <div>
            <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
              Recent Scans
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {scanLog.map((record) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/5 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        record.status === "verified"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {record.status === "verified" ? "✓" : "✕"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {record.studentName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {record.eventTitle}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {record.timestamp}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Toast */}
      <AnimatePresence>
        <Toast message={toast.message} visible={toast.visible} />
      </AnimatePresence>
    </div>
  );
}
