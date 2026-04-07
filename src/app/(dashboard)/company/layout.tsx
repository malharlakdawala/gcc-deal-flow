"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "@/components/features/language-toggle";
import {
  LayoutDashboard,
  FileText,
  Users,
  FolderOpen,
  Shield,
  FileSignature,
  MessageSquare,
  Sparkles,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Languages,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/company", icon: LayoutDashboard },
  { label: "My Listing", href: "/company/listing", icon: FileText },
  { label: "Investor Activity", href: "/company/investors", icon: Users },
  { label: "Data Room", href: "/company/data-room", icon: FolderOpen },
  { label: "NDA Manager", href: "/company/nda", icon: Shield },
  { label: "Term Sheets", href: "/company/terms", icon: FileSignature },
  { label: "Messages", href: "/company/messages", icon: MessageSquare },
  { label: "AI Tools", href: "/company/ai", icon: Sparkles, isAi: true },
];

const bottomItems = [
  { label: "Settings", href: "/company/settings", icon: Settings },
  { label: "Support", href: "/company/support", icon: HelpCircle },
];

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");

  const isActive = (href: string) => {
    if (href === "/company") return pathname === "/company";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-[240px] bg-surface-container-lowest border-e border-primary/10 flex-col py-6 z-40 hidden lg:flex">
        <div className="px-6 mb-6">
          <h3 className="text-xl font-bold text-primary tracking-tight">
            The Sovereign Ledger
          </h3>
        </div>

        <nav className="flex flex-col gap-0.5 flex-1 px-3">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200",
                  active
                    ? "text-primary bg-primary/5 border-e-2 border-primary"
                    : "text-on-surface-variant/60 hover:text-on-surface hover:bg-white/5"
                )}
              >
                <item.icon
                  size={20}
                  className={cn(
                    item.isAi && !active && "text-secondary"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/5 px-3 flex flex-col gap-0.5">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-on-surface-variant/60 hover:text-on-surface hover:bg-white/5 transition-all duration-200"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* Top nav bar */}
      <header className="fixed top-0 left-0 lg:left-[240px] right-0 h-16 bg-background/80 backdrop-blur-xl z-30 flex items-center justify-between px-8 shadow-[0_32px_32px_-12px_rgba(7,19,37,0.06)]">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
            />
            <input
              type="text"
              placeholder="Search investor records..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-surface-container-high border-none rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/40"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant/60 hover:bg-primary/10 transition-colors p-2 rounded-full">
            <Languages size={20} />
          </button>
          <button className="relative text-on-surface-variant/60 hover:bg-primary/10 transition-colors p-2 rounded-full">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
          </button>
          <div className="flex items-center gap-3 ml-2 border-l border-white/10 pl-6">
            <div className="text-right hidden lg:block">
              <p className="text-xs font-semibold text-on-surface">
                Alpha Strategic Ltd.
              </p>
              <p className="text-[10px] text-primary uppercase tracking-widest">
                Active Listing
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-surface-container-highest border border-primary/20 flex items-center justify-center overflow-hidden">
              <span className="text-on-surface-variant text-sm font-bold">
                AS
              </span>
            </div>
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
