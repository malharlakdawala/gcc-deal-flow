import { HeroSection } from "@/components/landing/hero-section";
import { StatsBar } from "@/components/landing/stats-bar";
import { FlywheelSection } from "@/components/landing/flywheel-section";
import { TrustSection } from "@/components/landing/trust-section";
import { DealTypesSection } from "@/components/landing/deal-types-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { CtaSection } from "@/components/landing/cta-section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FlywheelSection />
      <TrustSection />
      <DealTypesSection />
      <HowItWorksSection />
      <CtaSection />
    </>
  );
}
