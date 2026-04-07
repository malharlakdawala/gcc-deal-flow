import Link from "next/link";

const platformLinks = [
  { label: "Institutional Deal Flow", href: "#" },
  { label: "Private Credit Engine", href: "#" },
  { label: "Sharia Governance", href: "#" },
  { label: "Smart VDRs", href: "#" },
];

const corporateLinks = [
  { label: "Governance", href: "#" },
  { label: "GCC Regional Offices", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const countries = ["UAE", "KSA", "QATAR", "BAHRAIN"];

export function Footer() {
  return (
    <footer className="bg-background w-full py-12 px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-primary/10 pt-12 max-w-[1440px] mx-auto">
        {/* Branding column */}
        <div className="col-span-1">
          <div className="text-lg font-bold text-primary mb-4">
            The Sovereign Ledger
          </div>
          <div className="flex space-x-2 mb-6">
            {countries.map((country) => (
              <span
                key={country}
                className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-500 font-bold border border-white/10"
              >
                {country}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-xs font-bold text-primary cursor-pointer">
              EN
            </button>
            <span className="text-slate-700">|</span>
            <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors cursor-pointer">
              AR
            </button>
          </div>
        </div>

        {/* Platform links */}
        <div>
          <h5 className="text-white font-bold mb-6">Platform</h5>
          <ul className="space-y-4 font-light text-sm text-slate-400">
            {platformLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-white transition-all opacity-80 hover:opacity-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Corporate links */}
        <div>
          <h5 className="text-white font-bold mb-6">Corporate</h5>
          <ul className="space-y-4 font-light text-sm text-slate-400">
            {corporateLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-white transition-all opacity-80 hover:opacity-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Compliance */}
        <div>
          <h5 className="text-white font-bold mb-6">Compliance</h5>
          <p className="font-light text-[12px] text-slate-500 leading-relaxed mb-4">
            The Sovereign Ledger is a fintech platform providing technological
            infrastructure. Financial services are provided by licensed partners
            in their respective jurisdictions.
          </p>
          <p className="font-light text-sm text-slate-400 tabular-nums">
            &copy; 2024 The Sovereign Ledger. Authorized and regulated by the
            DFSA and QFCRA.
          </p>
        </div>
      </div>
    </footer>
  );
}
