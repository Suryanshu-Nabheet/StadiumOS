import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { LandingNavbar } from "@/components/layout/landing-navbar";
import { Logo, GdgLogo } from "@/components/brand/logo";
import { ArrowRight, Map, Shield, Bot, Activity } from "lucide-react";

const features = [
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

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--background)]">
      {/* Soft sky ambience behind glass nav */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[420px] bg-gradient-to-b from-sky-100/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-32 top-40 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl"
        aria-hidden
      />

      <LandingNavbar />

      <main className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-28 md:px-6 md:pt-32">
        <section className="max-w-2xl">
          <p className="mb-3 text-sm font-medium text-sky-600">GDG Hackathon</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl md:leading-tight">
            Stadium operations, powered by real-time intelligence
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Crowd density, emergency coordination, and AI-assisted decisions for
            IPL-scale cricket venues.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button size="lg">Open command center</Button>
            </Link>
            <Link href="/assistant">
              <Button size="lg" variant="outline">
                Operator assistant
              </Button>
            </Link>
          </div>
        </section>

        <section id="platform" className="mt-14">
          <Panel
            padding="md"
            className="glass-surface flex flex-col items-center justify-center py-14 md:py-16"
          >
            <Image
              src="/favicon.svg"
              alt="StadiumOS"
              width={96}
              height={96}
              priority
            />
            <p className="mt-4 text-center text-sm text-slate-600">
              Sky-blue operations platform · Narendra Modi Stadium demo
            </p>
            <Link href="/dashboard" className="mt-6">
              <Button variant="outline">
                Preview live dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Panel>
        </section>

        <section id="features" className="mt-12 scroll-mt-28">
          <h2 className="text-lg font-semibold text-slate-900">Capabilities</h2>
          <p className="mt-1 text-sm text-slate-500">
            Built for match-day operations teams and hackathon demos.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Panel key={f.title} padding="sm" className="h-full">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <f.icon className="h-4 w-4" />
                </div>
                <h3 className="font-medium text-slate-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {f.desc}
                </p>
              </Panel>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative border-t border-slate-200/80 bg-white/80 py-8 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <Logo size="sm" href="/" showText />
          <p className="text-sm text-slate-500">StadiumOS AI · GDG Hackathon</p>
          <GdgLogo />
        </div>
      </footer>
    </div>
  );
}
