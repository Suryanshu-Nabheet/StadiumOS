export const siteConfig = {
  name: "StadiumOS AI",
  shortName: "StadiumOS",
  description:
    "AI-powered stadium crowd intelligence and emergency response platform for large-scale cricket events.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  author: {
    name: "Suryanshu Nabheet",
    github: "https://github.com/Suryanshu-Nabheet/",
  },
  event: {
    name: "GDG Hackathon",
    partner: "Google Developer Groups",
  },
  match: {
    title: "IPL Final — Night Match",
    teams: "Mumbai Indians vs Chennai Super Kings",
    venue: "Narendra Modi Stadium, Ahmedabad",
    capacity: 132_000,
    status: "LIVE" as const,
    inning: "2nd Innings — Over 14.3",
  },
} as const;

export const navItems = [
  { href: "/dashboard", label: "Command center", icon: "LayoutDashboard" },
  { href: "/crowd-flow", label: "Crowd flow", icon: "GitBranch" },
  { href: "/emergency", label: "Emergency", icon: "Siren" },
  { href: "/twin", label: "Digital twin", icon: "Map" },
  { href: "/analytics", label: "Analytics", icon: "BarChart3" },
  { href: "/assistant", label: "Assistant", icon: "Bot" },
] as const;
