import { LanguageToggle } from "@/components/features/language-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center">
      {/* Subtle radial gradient overlay for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(16, 28, 46, 0.2) 0%, transparent 60%)",
        }}
      />

      {/* Language toggle in top-right */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageToggle />
      </div>

      <div className="relative z-10 w-full px-4">{children}</div>
    </div>
  );
}
