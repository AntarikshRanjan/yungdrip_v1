"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Button from "@/components/button";
import { resetPassword } from "@/lib/api-client";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset link");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await resetPassword({ token, password });
      setMessage(response.message || "Password updated successfully.");
      window.setTimeout(() => router.replace("/login"), 1500);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return (
      <div className="shell py-12">
        <div className="panel mx-auto max-w-lg p-10 text-center">
          <h1 className="text-4xl font-semibold">Invalid reset link</h1>
          <p className="mt-3 text-sm text-black/60">Request a new password reset link to continue.</p>
          <Button href="/forgot-password" asChild className="mt-6">
            Request reset link
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="shell py-12">
      <div className="mx-auto max-w-lg">
        <div className="panel p-8 lg:p-10">
          <p className="muted-label mb-3">Account recovery</p>
          <h1 className="text-4xl font-semibold">Set new password</h1>
          <p className="mt-4 text-sm leading-7 text-black/60">Choose a new password for your YungDrip account.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block space-y-2 text-sm text-black/60">
              <span>New password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-[1.25rem] border border-black/10 px-4 py-3 outline-none transition focus:border-black/30"
                placeholder="Minimum 8 characters"
                required
              />
            </label>

            <label className="block space-y-2 text-sm text-black/60">
              <span>Confirm password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-[1.25rem] border border-black/10 px-4 py-3 outline-none transition focus:border-black/30"
                placeholder="Repeat password"
                required
              />
            </label>

            {error ? (
              <div className="rounded-[1.25rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
            ) : null}

            {message ? (
              <div className="rounded-[1.25rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {message}
              </div>
            ) : null}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update password"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-black/55">
            <Link href="/login" className="underline underline-offset-4">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
