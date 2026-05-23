import Image from "next/image";
import { siteConfig } from "@/config/site";

export function GdgHackathonBanner() {
  const { event, author } = siteConfig;

  return (
    <section
      id="hackathon"
      className="relative scroll-mt-28 overflow-hidden rounded-2xl border border-sky-100/90 bg-gradient-to-br from-white via-sky-50/50 to-white shadow-sm"
      aria-label="GDG Hackathon"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(14,165,233,0.12),transparent)]"
        aria-hidden
      />
      <Image
        src="/gdg.svg"
        alt=""
        width={320}
        height={320}
        className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 opacity-[0.07] sm:h-56 sm:w-56 md:right-4 md:top-1/2 md:-translate-y-1/2 md:opacity-[0.09]"
      />
      <Image
        src="/gdg.svg"
        alt=""
        width={200}
        height={200}
        className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 opacity-[0.05]"
      />

      <div className="relative flex flex-col items-center gap-6 px-6 py-10 text-center sm:flex-row sm:px-10 sm:py-12 sm:text-left">
        <div className="flex shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm ring-1 ring-sky-100/60 backdrop-blur-sm">
          <Image
            src="/GDG.png"
            alt="Google Developer Groups"
            width={120}
            height={120}
            className="h-16 w-auto sm:h-20"
            priority
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
            Official submission
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {event.name}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            StadiumOS AI is built for {event.partner} — enterprise-grade stadium
            operations with a live digital twin, crowd physics, and Gemini-powered
            operator assistance.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Created by{" "}
            <span className="font-medium text-slate-800">{author.name}</span>
          </p>
        </div>

        <div className="hidden shrink-0 sm:block">
          <div className="rounded-xl border border-dashed border-sky-200/80 bg-white/60 px-4 py-3 text-center backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Venue demo
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800">
              Narendra Modi Stadium
            </p>
            <p className="text-xs text-slate-500">132,000 capacity · IPL scale</p>
          </div>
        </div>
      </div>
    </section>
  );
}
