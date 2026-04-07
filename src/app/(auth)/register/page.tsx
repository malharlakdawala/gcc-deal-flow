"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, TrendingUp, Briefcase } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UserRole } from "@/types/user";

const ROLES: { value: UserRole; label: string; icon: typeof Building2 }[] = [
  { value: "company", label: "Company", icon: Building2 },
  { value: "investor", label: "Investor", icon: TrendingUp },
  { value: "advisor", label: "Advisor", icon: Briefcase },
];

const ROLE_REDIRECTS: Record<UserRole, string> = {
  company: "/onboarding/step-1",
  investor: "/investor",
  advisor: "/advisor",
};

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Please select a role.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError("Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // Insert profile row
      const { error: profileError } = await supabase.from("profiles").insert({
        user_id: data.user.id,
        role,
        name,
      });

      if (profileError) {
        setError("Account created but profile setup failed. Please contact support.");
        setLoading(false);
        return;
      }

      router.push(ROLE_REDIRECTS[role]);
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
          Create your account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Role selector */}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-on-surface-variant font-medium">
              I am a...
            </span>
            <div className="grid grid-cols-3 gap-3">
              {ROLES.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  className={`flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-200 cursor-pointer ${
                    role === value
                      ? "bg-surface-container-high border border-primary/30"
                      : "bg-surface-container-low border border-transparent hover:bg-surface-container"
                  }`}
                >
                  <Icon
                    size={22}
                    className={
                      role === value
                        ? "text-primary"
                        : "text-on-surface-variant"
                    }
                  />
                  <span
                    className={`text-sm font-medium ${
                      role === value
                        ? "text-on-surface"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

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
            Create Account
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-on-surface-variant">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
