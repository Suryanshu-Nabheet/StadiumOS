import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    title: "Crowd flow AI",
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
    desc: "AI copilot for gates, security, and incident reporting.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo size="md" href="/" />
          <div className="flex items-center gap-5">
            <GdgLogo />
            <Link href="/dashboard">
              <Button>
                Command center
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="max-w-2xl">
          <Badge variant="neutral" className="mb-4">
            GDG Hackathon
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Stadium operations, powered by{" "}
            <span className="text-sky-600">real-time AI</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Crowd intelligence and emergency coordination for IPL-scale cricket
            venues — one command platform for density, routing, and response.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button size="lg">Open command center</Button>
            </Link>
            <Link href="/assistant">
              <Button size="lg" variant="outline">
                AI assistant
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-sky-50 to-white px-8 py-16 shadow-sm">
          <Image
            src="/favicon.svg"
            alt="StadiumOS"
            width={120}
            height={120}
            className="drop-shadow-md"
            priority
          />
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <f.icon className="h-4 w-4" />
              </div>
              <h3 className="font-medium text-slate-900">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
        StadiumOS AI · GDG Hackathon
      </footer>
    </div>
  );
}
