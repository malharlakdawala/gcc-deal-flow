"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "@/components/features/language-toggle";
import {
  LayoutDashboard,
  Vault,
  PieChart,
  Brain,
  ShieldCheck,
  Settings,
  HelpCircle,
  Search,
  Bell,
  User,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/investor", icon: LayoutDashboard },
  { label: "Deal Vault", href: "/investor/deals", icon: Vault },
  { label: "Portfolio", href: "/investor/portfolio", icon: PieChart },
  { label: "Intelligence", href: "/investor/intelligence", icon: Brain },
  { label: "Compliance", href: "/investor/compliance", icon: ShieldCheck },
];

const bottomItems = [
  { label: "Settings", href: "/investor/settings", icon: Settings },
  { label: "Support", href: "/investor/support", icon: HelpCircle },
];

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");

  const isActive = (href: string) => {
    if (href === "/investor") return pathname === "/investor";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-[240px] bg-surface-container-low border-e border-outline-variant/15 flex-col py-8 z-40 hidden lg:flex">
        <div className="px-6 mb-8">
          <h3 className="text-lg font-bold text-primary">
            The Sovereign Ledger
          </h3>
          <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mt-1">
            Private Concierge
          </p>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-200",
                  active
                    ? "text-primary bg-primary/10 border-s-4 border-primary"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-primary/5"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-1 mt-auto">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-primary/5 transition-all duration-200"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* Top nav bar */}
      <header className="fixed top-0 left-0 lg:left-[240px] right-0 h-16 bg-background/60 backdrop-blur-xl z-30 flex items-center justify-between px-8 border-b border-outline-variant/10">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              type="text"
              placeholder="Search deals, contacts..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-surface-container-highest border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-on-surface placeholder:text-on-surface-variant/40"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <button className="relative text-on-surface-variant hover:text-primary transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full" />
          </button>
          <div className="w-9 h-9 rounded-full bg-surface-container-highest border border-primary/20 flex items-center justify-center">
            <User size={18} className="text-on-surface-variant" />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="lg:ps-[240px] pt-16">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
