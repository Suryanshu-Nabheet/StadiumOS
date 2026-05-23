"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

/** Brand lockup — expanded wordmark or large icon tile when sidebar is collapsed. */
export function SidebarBrand() {
  const { state, isMobile } = useSidebar();
  const collapsed = !isMobile && state === "collapsed";
  const { event } = siteConfig;

  if (collapsed) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            tooltip="StadiumOS AI"
            className="[&_img]:size-8"
            render={<Link href="/" />}
          >
            <Image
              src="/favicon.svg"
              alt="StadiumOS AI"
              width={32}
              height={32}
              className="size-8 shrink-0"
              priority
            />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <Link
      href="/"
      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 outline-none transition-[background-color,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-sidebar-accent/60 focus-visible:ring-2 focus-visible:ring-sidebar-ring"
    >
      <Image
        src="/favicon.svg"
        alt=""
        width={36}
        height={36}
        className="size-9 shrink-0"
        priority
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight text-sidebar-foreground">
          StadiumOS
          <span className="text-sidebar-primary"> AI</span>
        </p>
        <p className="truncate text-xs text-muted-foreground">{event.name}</p>
      </div>
    </Link>
  );
}
