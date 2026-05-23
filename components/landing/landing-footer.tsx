import { BrandCollab } from "@/components/brand/brand-collab";

export function LandingFooter() {
  return (
    <footer className="relative border-t border-slate-200/80 bg-white/80 py-6 backdrop-blur-sm md:py-7">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <BrandCollab size="xs" href="/" />
        <p className="text-center text-xs text-slate-500 sm:text-right">
          Real-time stadium intelligence · Hackathon build
        </p>
      </div>
    </footer>
  );
}
