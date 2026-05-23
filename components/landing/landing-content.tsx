"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { MotionLink } from "@/components/motion/motion-link";
import { FadeIn } from "@/components/motion/fade-in";
import { BrandCollab } from "@/components/brand/brand-collab";
import { GdgHackathonBanner } from "@/components/landing/gdg-hackathon-banner";
import { LandingStatsStrip } from "@/components/landing/landing-stats-strip";
import { LandingModulesGrid } from "@/components/landing/landing-modules-grid";
import { LandingMitSection } from "@/components/landing/landing-mit-section";
import { StadiumMapStatic } from "@/components/twin/stadium-map/stadium-map-static";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  Map,
  Shield,
  Bot,
  Activity,
  Zap,
  Radio,
  type LucideIcon,
} from "lucide-react";

const features: {
  icon: LucideIcon;
  title: string;
  desc: string;
}[] = [
  {
    icon: Map,
    title: "Circular digital twin",
    desc: "Bird's-eye Motera schematic with striped outfield, live stand density, gates, and incident pins.",
  },
  {
    icon: Activity,
    title: "Crowd physics engine",
    desc: "Wait times, throughput, heatmaps, and stress index correlated across every tick.",
  },
  {
    icon: Shield,
    title: "Emergency orchestration",
    desc: "Detect, dispatch, report, and model evacuation impact on the operations map.",
  },
  {
    icon: Bot,
    title: "Gemini operator AI",
    desc: "Natural-language briefings with full live telemetry — same data as the dashboards.",
  },
  {
    icon: Zap,
    title: "Autonomous agents",
    desc: "CrowdFlow, Emergency, Security, Traffic, and Weather agents act on live thresholds.",
  },
  {
    icon: Radio,
    title: "Real-time simulation",
    desc: "Zustand-powered telemetry stream updates gates, KPIs, and timelines every 3.5 seconds.",
  },
];

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function LandingContent() {
  const { author, event, match } = siteConfig;

  return (
    <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-24 md:px-6 md:pt-28">
      {/* Hero */}
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="mb-4">
            <BrandCollab size="md" href={null} />
          </div>
          <p className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50/80 px-3 py-1 text-xs font-medium text-sky-700">
            {event.name} · Production demo
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl md:leading-[1.15] lg:text-[2.85rem]">
            Stadium operations, powered by real-time intelligence
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            End-to-end command center for {match.venue} — live occupancy,
            gate pressure, emergency response, and AI-assisted decisions for
            IPL-scale cricket.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-slate-600">
            <li className="flex gap-2">
              <span className="text-sky-500">✓</span>
              132,000-seat circular twin with physics-based crowd simulation
            </li>
            <li className="flex gap-2">
              <span className="text-sky-500">✓</span>
              Gemini 2.5 Flash operator assistant with live database context
            </li>
            <li className="flex gap-2">
              <span className="text-sky-500">✓</span>
              Open source under MIT License · by {author.name}
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionLink href="/dashboard">
              <Button size="lg" className="shadow-sm">
                Open command center
                <ArrowRight className="h-4 w-4" />
              </Button>
            </MotionLink>
            <MotionLink href="/assistant">
              <Button size="lg" variant="outline">
                Try operator AI
              </Button>
            </MotionLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-sky-100/50 to-transparent blur-2xl" />
          <div className="relative">
            <StadiumMapStatic className="mx-auto w-full max-w-lg" />
            <p className="mt-3 text-center text-xs text-slate-500">
              Motera schematic · live telemetry in platform
            </p>
          </div>
        </motion.div>
      </section>

      <FadeIn className="mt-10" y={12}>
        <LandingStatsStrip />
      </FadeIn>

      <FadeIn className="mt-14" y={16}>
        <GdgHackathonBanner />
      </FadeIn>

      <FadeIn className="mt-14" y={16}>
        <section id="platform" className="scroll-mt-28">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Platform modules
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Six integrated workspaces — each wired to the same live simulation.
            </p>
          </div>
          <LandingModulesGrid />
        </section>
      </FadeIn>

      <FadeIn className="mt-14" y={16}>
        <Panel
          padding="md"
          className="glass-surface flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Ready for match day?
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Jump into the command center — KPIs, map, and agents update live.
            </p>
          </div>
          <MotionLink href="/dashboard">
            <Button size="lg" variant="outline" className="gap-2">
              Launch dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </MotionLink>
        </Panel>
      </FadeIn>

      <section id="features" className="mt-14 scroll-mt-28">
        <FadeIn>
          <h2 className="text-xl font-semibold text-slate-900">
            Why StadiumOS AI
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Built for judges, operators, and hackathon demos — detailed, realistic,
            and fully interactive.
          </p>
        </FadeIn>
        <motion.div
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-48px" }}
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={item}>
              <Panel
                padding="sm"
                className="h-full transition-shadow hover:border-sky-100 hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {f.desc}
                </p>
              </Panel>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <FadeIn className="mt-14" y={16}>
        <LandingMitSection />
      </FadeIn>
    </main>
  );
}
