import { LandingNavbar } from "@/components/layout/landing-navbar";
import { LandingContent } from "@/components/landing/landing-content";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--background)]">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[420px] bg-gradient-to-b from-sky-100/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-32 top-40 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl"
        aria-hidden
      />

      <LandingNavbar />
      <LandingContent />
      <LandingFooter />
    </div>
  );
}
