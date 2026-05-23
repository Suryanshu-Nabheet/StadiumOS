"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { MotionLink } from "@/components/motion/motion-link";
import { FadeIn } from "@/components/motion/fade-in";
import { StadiumMapStatic } from "@/components/twin/stadium-map/stadium-map-static";
import { siteConfig } from "@/config/site";
import { ArrowRight, Map, Shield, Bot, Activity, type LucideIcon } from "lucide-react";

const features: {
  icon: LucideIcon;
  title: string;
  desc: string;
}[] = [
  {
    icon: Map,
    title: "Digital twin",
    desc: "Live stadium map with gates, stands, and incident overlays.",
  },
  {
    icon: Activity,
    title: "Crowd flow",
    desc: "Predict congestion and reroute fans across entry points.",
  },
  {
    icon: Shield,
    title: "Emergency response",
    desc: "Detect incidents, dispatch teams, model evacuation impact.",
  },
  {
    icon: Bot,
    title: "Operator assistant",
    desc: "Natural-language queries over live stadium telemetry.",
  },
];

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function LandingContent() {
  const { author, event } = siteConfig;

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-24 md:px-6 md:pt-28">
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="mb-2 text-sm font-medium text-sky-600">
            {event.name} · by {author.name}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl md:leading-tight lg:text-[2.75rem]">
            Stadium operations, powered by real-time intelligence
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            Circular digital twin, live crowd physics, and AI-assisted decisions
            for {siteConfig.match.venue}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MotionLink href="/dashboard">
              <Button size="lg">Open command center</Button>
            </MotionLink>
            <MotionLink href="/assistant">
              <Button size="lg" variant="outline">
                Operator assistant
              </Button>
            </MotionLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <StadiumMapStatic className="mx-auto max-w-md lg:max-w-none" />
          <p className="mt-3 text-center text-xs text-slate-500">
            Motera schematic · 132,000 seats · live telemetry in app
          </p>
        </motion.div>
      </section>

      <FadeIn className="mt-12" y={16}>
        <section id="platform" className="scroll-mt-28">
          <Panel padding="md" className="glass-surface flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-900">Match-day command center</p>
              <p className="mt-1 text-sm text-slate-500">
                Gates, stands, incidents, and AI routes — updating every few seconds.
              </p>
            </div>
            <MotionLink href="/dashboard">
              <Button variant="outline">
                Preview live dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </MotionLink>
          </Panel>
        </section>
      </FadeIn>

      <section id="features" className="mt-12 scroll-mt-28">
        <FadeIn>
          <h2 className="text-base font-semibold text-slate-900">Capabilities</h2>
          <p className="mt-1 text-sm text-slate-500">
            Built for match-day operations teams and hackathon demos.
          </p>
        </FadeIn>
        <motion.div
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={item}>
              <Panel padding="sm" className="h-full transition-shadow hover:shadow-md">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <f.icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-medium text-slate-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {f.desc}
                </p>
              </Panel>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
