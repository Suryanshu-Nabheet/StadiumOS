import { BrandCollab } from "@/components/brand/brand-collab";
import { siteConfig } from "@/config/site";

export function LandingFooter() {
  const { author, event } = siteConfig;

  return (
    <footer className="relative border-t border-slate-200/80 bg-white/80 py-8 backdrop-blur-sm md:py-9">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <BrandCollab size="sm" href="/" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-800">
              Built by {author.name}
            </p>
            <p className="text-sm text-slate-500">
              {event.name} · Stadium crowd intelligence platform
            </p>
          </div>
        </div>
        <p className="mt-6 border-t border-slate-100 pt-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {author.name}. MIT License. A{" "}
          {event.partner} collaboration project.
        </p>
      </div>
    </footer>
  );
}
