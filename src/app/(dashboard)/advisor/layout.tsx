"use client";

import { cn } from "@/lib/utils";
import { LanguageToggle } from "@/components/features/language-toggle";
import {
  GitBranch,
  Users,
  FileText,
  BarChart3,
  Settings,
  Sparkles,
  Search,
  Bell,
  Globe,
  Moon,
  PlusCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Pipelines", icon: GitBranch, href: "/advisor" },
  { label: "Clients", icon: Users, href: "/advisor/clients" },
  { label: "Documents", icon: FileText, href: "/advisor/documents" },
  { label: "Reports", icon: BarChart3, href: "/advisor/reports" },
];

export default function AdvisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-[240px] bg-background border-r border-primary/10 flex flex-col py-6 gap-y-4 z-50">
        <div className="px-6 mb-8">
          <h1 className="text-lg font-bold text-primary tracking-tight">
            The Ledger
          </h1>
          <p className="text-xs text-on-surface-variant/40 uppercase tracking-widest">
            Advisor Portal
          </p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/advisor"
                ? pathname === "/advisor"
                : pathname?.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "text-primary font-semibold bg-gradient-to-r from-primary/10 to-transparent"
                    : "text-on-surface-variant/40 hover:bg-primary/5 hover:text-primary"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 mt-auto border-t border-white/5 pt-4">
          {/* AI Insight Widget */}
          <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20 mb-4">
            <div className="flex items-center gap-2 text-secondary mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                AI Insight
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              3 deals are losing momentum. Recommend opening data rooms for
              shortlisted buyers.
            </p>
          </div>

          <Link
            href="/advisor/settings"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant/40 hover:text-primary transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Canvas */}
      <main className="pl-[240px] min-h-screen">
        {/* Top Bar */}
        <header className="h-16 flex justify-between items-center px-8 bg-background/80 backdrop-blur-xl sticky top-0 z-40 border-b border-white/5">
          <div className="flex items-center gap-8">
            <LanguageToggle />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search mandates or investors..."
                className="bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-xs w-64 focus:ring-1 focus:ring-primary/50 text-on-surface outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-on-surface-variant/50">
              <button className="hover:text-primary transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </button>
              <button className="hover:text-primary transition-colors">
                <Moon className="w-5 h-5" />
              </button>
            </div>

            <button className="gold-gradient text-on-primary font-semibold px-5 py-2 rounded-lg text-sm flex items-center gap-2 active:scale-95 transition-transform">
              <PlusCircle className="w-4 h-4" />
              New Deal
            </button>

            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20 bg-surface-container-high flex items-center justify-center text-xs font-bold text-primary">
              ML
            </div>
          </div>
        </header>

        {children}
      </main>

      {/* FAB for Global AI Assistant */}
      <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-secondary text-on-secondary shadow-2xl flex items-center justify-center ai-glow z-50 group active:scale-90 transition-transform">
        <Zap className="w-7 h-7 fill-current" />
        <div className="absolute right-16 bg-surface-container-high text-on-surface px-4 py-2 rounded-xl text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-secondary/30">
          Ask Sovereign Intelligence
        </div>
      </button>
    </div>
  );
}
