import { LandingNavbar } from "@/components/layout/landing-navbar";
import { LandingContent } from "@/components/landing/landing-content";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingWatermark } from "@/components/landing/landing-watermark";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <LandingWatermark />

      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[min(55vh,520px)] bg-gradient-to-b from-sky-50/90 via-[#f4f9fc] to-white"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -right-40 top-32 z-0 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -left-32 bottom-0 z-0 h-80 w-80 rounded-full bg-sky-50/80 blur-3xl"
        aria-hidden
      />

      <LandingNavbar />
      <LandingContent />
      <LandingFooter />
    </div>
  );
}
