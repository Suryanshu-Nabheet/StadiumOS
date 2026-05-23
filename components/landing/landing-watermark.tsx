import Image from "next/image";

/** Faded GDG marks blended into the white landing canvas */
export function LandingWatermark() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <Image
        src="/gdg.svg"
        alt=""
        width={520}
        height={520}
        className="landing-gdg-watermark absolute -right-24 top-[12%] h-auto w-[min(42vw,520px)]"
      />
      <Image
        src="/gdg.svg"
        alt=""
        width={380}
        height={380}
        className="landing-gdg-watermark absolute -left-20 bottom-[18%] h-auto w-[min(32vw,380px)] rotate-12"
      />
      <Image
        src="/gdg.svg"
        alt=""
        width={280}
        height={280}
        className="landing-gdg-watermark absolute left-1/2 top-[55%] h-auto w-[min(24vw,280px)] -translate-x-1/2 opacity-[0.025]"
      />
    </div>
  );
}
