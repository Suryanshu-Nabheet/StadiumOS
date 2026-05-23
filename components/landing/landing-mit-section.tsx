import Link from "next/link";
import { Panel } from "@/components/ui/panel";
import { siteConfig } from "@/config/site";
import { ExternalLink, FileCode2, Scale } from "lucide-react";

const MIT_URL = "https://opensource.org/licenses/MIT";

export function LandingMitSection() {
  const { author } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <section
      id="license"
      className="scroll-mt-28"
      aria-labelledby="license-heading"
    >
      <Panel padding="md" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-100/60 blur-2xl"
          aria-hidden
        />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-sky-600">
              <Scale className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Open source
              </span>
            </div>
            <h2
              id="license-heading"
              className="mt-2 text-xl font-semibold text-slate-900"
            >
              MIT License
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
              StadiumOS AI is released under the{" "}
              <strong className="font-medium text-slate-800">MIT License</strong>.
              You may use, copy, modify, merge, publish, distribute, sublicense,
              and sell copies of the software with attribution. See the full
              license text in the repository.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Copyright © {year}{" "}
              <span className="font-medium text-slate-700">{author.name}</span>
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={MIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-sky-200 hover:bg-sky-50/50 hover:text-sky-800"
              >
                <FileCode2 className="h-4 w-4" />
                Read MIT License
              </Link>
              <Link
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-sky-200 hover:bg-sky-50/50 hover:text-sky-800"
              >
                <ExternalLink className="h-4 w-4" />
                Author on GitHub
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-5 font-mono text-[11px] leading-relaxed text-slate-600 lg:max-w-xs">
            <p className="text-slate-400">LICENSE · excerpt</p>
            <p className="mt-2">
              Permission is hereby granted, free of charge, to any person obtaining
              a copy of this software…
            </p>
            <p className="mt-2 text-slate-500">
              THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY
              KIND.
            </p>
          </div>
        </div>
      </Panel>
    </section>
  );
}
