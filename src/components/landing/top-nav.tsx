"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Fundraise", href: "#" },
  { label: "Invest", href: "#" },
  { label: "Advisory", href: "#" },
  { label: "Wealth Management", href: "#" },
];

export function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#071325]/80 backdrop-blur-xl bg-gradient-to-b from-[#071325] to-transparent">
      <div className="flex justify-between items-center px-8 py-4 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tighter text-primary"
        >
          The Sovereign Ledger
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center space-x-8 font-normal text-[15px] tracking-tight">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "transition-colors duration-300 cursor-pointer active:scale-95",
                i === 0
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-slate-300 hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side buttons */}
        <div className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
            Contact Us
          </Button>
          <Button variant="primary" size="md">
            Get Started
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-t border-white/5 px-8 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-slate-300 hover:text-primary transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <Button variant="ghost" size="sm" className="text-slate-300">
              Contact Us
            </Button>
            <Button variant="primary" size="md">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
