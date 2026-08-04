"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const token = useSearchParams().get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (password !== confirmation) return setError("Passwords do not match.");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to reset password.");
      setMessage(data.message);
      setPassword("");
      setConfirmation("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-lg bg-white p-8 shadow">
      <div><h1 className="text-2xl font-bold text-gray-900">Reset password</h1><p className="mt-2 text-sm text-gray-600">Choose a new password with at least eight characters.</p></div>
      <div><label htmlFor="new-password" className="mb-2 block text-sm font-medium text-gray-800">New password</label><input id="new-password" name="password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} className="min-h-11 w-full rounded-md border border-gray-300 px-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
      <div><label htmlFor="confirm-password" className="mb-2 block text-sm font-medium text-gray-800">Confirm password</label><input id="confirm-password" name="password-confirmation" type="password" autoComplete="new-password" required minLength={8} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="min-h-11 w-full rounded-md border border-gray-300 px-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {message && <p role="status" className="text-sm text-green-700">{message}</p>}
      <button disabled={loading || !token} className="min-h-11 w-full rounded-md bg-indigo-600 px-4 font-medium text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50">{loading ? "Saving…" : "Set new password"}</button>
      <Link href="/login" className="flex min-h-11 items-center justify-center text-sm text-indigo-600 hover:text-indigo-500">Back to login</Link>
    </form>
  );
}

export default function ResetPasswordPage() {
  return <main className="min-h-screen bg-gray-50 px-4 py-12"><div className="mx-auto mt-16 flex justify-center"><Suspense fallback={<p className="text-gray-600">Loading…</p>}><ResetPasswordForm /></Suspense></div></main>;
}
