import Image from "next/image";
import Link from "next/link";
import { BrandCollab } from "@/components/brand/brand-collab";
import { siteConfig } from "@/config/site";
import { ExternalLink, Scale } from "lucide-react";

const MIT_URL = "https://opensource.org/licenses/MIT";

export function LandingFooter() {
  const { author, event } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/80 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <BrandCollab size="sm" href="/" />
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              AI-powered stadium crowd intelligence for large-scale cricket.
              Submitted to {event.name} by {author.name}.
            </p>
            <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2 w-fit">
              <Image
                src="/gdg.svg"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 opacity-90"
              />
              <span className="text-xs text-slate-600">
                In collaboration with{" "}
                <span className="font-medium text-slate-800">{event.partner}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Platform
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href="/dashboard"
                    className="text-slate-600 hover:text-sky-600"
                  >
                    Command center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/assistant"
                    className="text-slate-600 hover:text-sky-600"
                  >
                    AI Assistant
                  </Link>
                </li>
                <li>
                  <Link
                    href="/twin"
                    className="text-slate-600 hover:text-sky-600"
                  >
                    Digital twin
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Project
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href="#hackathon"
                    className="text-slate-600 hover:text-sky-600"
                  >
                    GDG Hackathon
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="text-slate-600 hover:text-sky-600"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#license"
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-sky-600"
                  >
                    <Scale className="h-3.5 w-3.5" />
                    MIT License
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Author
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href={author.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-sky-600"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    GitHub
                  </Link>
                </li>
                <li className="text-slate-600">{author.name}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-400">
            © {year} {author.name}. Released under the{" "}
            <Link
              href={MIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 underline-offset-2 hover:text-sky-600 hover:underline"
            >
              MIT License
            </Link>
            .
          </p>
          <p className="text-xs text-slate-400">
            {event.name} · {event.partner}
          </p>
        </div>
      </div>
    </footer>
  );
}
