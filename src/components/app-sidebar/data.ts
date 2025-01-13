import * as React from "react";

import {
  AudioWaveform,
  Box,
  CarTaxiFront,
  ChartSpline,
  Command,
  Landmark,
  LayoutDashboard,
  LucideIcon,
  PieChart,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Tent,
  Users,
} from "lucide-react";

export interface Item {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export interface Team {
  name: string;
  logo: React.ElementType;
  plan: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface Report {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface Data {
  user: User;
  teams: Team[];
  navMain: Item[];
  reports: Report[];
}

export const user: User = {
  name: "Example",
  email: "m@example.com",
  avatar: "/vercel.svg",
};

export const teams: Team[] = [
  {
    name: "Tech IT",
    logo: Tent,
    plan: "Free",
  },
  {
    name: "Square",
    logo: AudioWaveform,
    plan: "Enterprise",
  },
  {
    name: "Meghna",
    logo: Command,
    plan: "Enterprise",
  },
];

export const navItems: Item[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    items: [],
  },
  {
    title: "Customer",
    icon: Users,
    isActive: true,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Starred",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
  {
    title: "Supplier",
    icon: CarTaxiFront,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
    ],
  },
  {
    title: "Expensive",
    icon: Landmark,
    items: [
      {
        title: "Introduction",
        url: "#",
      },
      {
        title: "Get Started",
        url: "#",
      },
      {
        title: "Tutorials",
        url: "#",
      },
      {
        title: "Changelog",
        url: "#",
      },
    ],
  },
  {
    title: "Product",
    icon: Box,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
  {
    title: "Purchase",
    icon: ShoppingBag,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
  {
    title: "Sale",
    icon: ShoppingCart,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
];

export const reports: Report[] = [
  {
    name: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    name: "Return",
    url: "#",
    icon: PieChart,
  },
  {
    name: "Report",
    url: "#",
    icon: ChartSpline,
  },
];
