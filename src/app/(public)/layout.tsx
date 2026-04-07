import { TopNav } from "@/components/landing/top-nav";
import { Footer } from "@/components/landing/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
