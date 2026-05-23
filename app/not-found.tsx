import Link from "next/link";
import { BrandCollab } from "@/components/brand/brand-collab";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6">
      <BrandCollab size="sm" href="/" />
      <h1 className="mt-8 text-xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
        The route you requested does not exist in StadiumOS AI.
      </p>
      <Link href="/dashboard" className="mt-6">
        <Button>Go to command center</Button>
      </Link>
    </div>
  );
}
