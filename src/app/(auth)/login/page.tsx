"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UserRole } from "@/types/user";

const ROLE_REDIRECTS: Record<UserRole, string> = {
  advisor: "/advisor",
  company: "/company",
  investor: "/investor",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      // Fetch profile to determine role-based redirect
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", data.user.id)
        .single();

      if (profileError || !profile) {
        setError("Could not load your profile. Please contact support.");
        setLoading(false);
        return;
      }

      const redirect = ROLE_REDIRECTS[profile.role as UserRole];
      router.push(redirect || "/login");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="glass-panel max-w-md w-full rounded-2xl p-8">
        <h1 className="text-primary font-semibold text-2xl text-center">
          The Sovereign Ledger
        </h1>
        <p className="text-on-surface-variant text-center mt-2 mb-8">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-error text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
          >
            Sign In
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
