import { Panel } from "@/components/ui/panel";
import { FadeIn } from "@/components/motion/fade-in";

const problem = {
  threat:
    "Massive crowds at cricket matches create dangerous bottlenecks, severe security vulnerabilities, and logistical chaos during highly congested pre- and post-match movements.",
  gap: "Current stadium operations rely on fragmented, manual systems, leaving security and volunteers unable to adapt instantly to rapid crowd surges, unpredictable weather shifts, or emerging threats.",
  need: "Organizers urgently need an integrated, real-time command platform to unify ticketing, dynamically route crowd flow, and automate emergency responses for a safe and seamless fan experience.",
} as const;

const solution = [
  "Live command center — KPIs, gate pressure, traffic, and AI agent feed in one view",
  "Circular digital twin of Narendra Modi Stadium (132,000 seats) with incident overlays",
  "Crowd physics simulation — heatmaps, reroutes, and stress index every 3.5s",
  "Emergency board — dispatch squads, incident reports, evacuation paths",
  "Gemini operator assistant grounded in the same live telemetry as the dashboards",
] as const;

export function LandingProblem() {
  return (
    <FadeIn className="mt-14" y={16}>
      <section id="problem" className="scroll-mt-28">
        <h2 className="text-xl font-semibold text-slate-900">Problem & solution</h2>
        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          Aligned with our GDG Hackathon pitch — cricket-scale crowd and emergency operations.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Panel padding="sm" className="h-full border-red-100/80 bg-red-50/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
              The threat
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{problem.threat}</p>
          </Panel>
          <Panel padding="sm" className="h-full border-amber-100/80 bg-amber-50/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              The gap
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{problem.gap}</p>
          </Panel>
          <Panel padding="sm" className="h-full border-sky-100/80 bg-sky-50/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
              The need
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{problem.need}</p>
          </Panel>
        </div>

        <Panel padding="md" className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
            StadiumOS AI — our answer
          </p>
          <ul className="mt-3 space-y-2">
            {solution.map((line) => (
              <li key={line} className="flex gap-2 text-sm text-slate-700">
                <span className="text-sky-500">→</span>
                {line}
              </li>
            ))}
          </ul>
        </Panel>
      </section>
    </FadeIn>
  );
}
