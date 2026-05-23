"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Bot,
  Map,
  Radio,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Digital Twin Stadium",
    desc: "Live SVG twin with gates, stands, exits, and incident overlays.",
  },
  {
    icon: Zap,
    title: "AI Crowd Flow Engine",
    desc: "Predict overcrowding and autonomously reroute fan movement.",
  },
  {
    icon: Shield,
    title: "Emergency Response Agents",
    desc: "Detect, dispatch, and simulate evacuation impact in seconds.",
  },
  {
    icon: Bot,
    title: "Operator AI Assistant",
    desc: "Gemini-powered command copilot with local intelligence fallback.",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030308]">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-purple-600/10 blur-[100px]" />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
            <Radio className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">
            StadiumOS <span className="text-cyan-400">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Image src="/GDG.png" alt="GDG" width={80} height={32} className="opacity-80" />
          <Link href="/dashboard">
            <Button>
              Enter Command Center
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Badge variant="live" className="mb-6">
            GDG Hackathon · Enterprise AI Platform
          </Badge>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            The AI Operating System for{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Stadium Operations
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Real-time crowd intelligence, autonomous emergency response, and
            predictive command center analytics for IPL-scale cricket events.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg">
                <Sparkles className="h-5 w-5" />
                Launch Command Center
              </Button>
            </Link>
            <Link href="/assistant">
              <Button size="lg" variant="outline">
                Talk to AI Assistant
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-cyan-500/10"
        >
          <Image
            src="/Banner.png"
            alt="StadiumOS AI Command Center"
            width={1200}
            height={600}
            className="w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-transparent" />
        </motion.div>

        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              <f.icon className="mb-4 h-8 w-8 text-cyan-400" />
              <h3 className="font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-xs text-zinc-600">
        StadiumOS AI · Built for GDG Hackathon · Google Cloud ready
      </footer>
    </div>
  );
}
