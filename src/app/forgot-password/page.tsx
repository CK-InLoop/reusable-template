"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to request a password reset.");
      setMessage(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to request a password reset.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6">
      <form onSubmit={submit} className="mx-auto mt-16 w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forgot your password?</h1>
          <p className="mt-2 text-sm leading-6 text-gray-600">Enter your account email and we’ll send a secure reset link.</p>
        </div>
        <div>
          <label htmlFor="forgot-email" className="mb-2 block text-sm font-medium text-gray-800">Email address</label>
          <input id="forgot-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-11 w-full rounded-md border border-gray-300 px-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        {message && <p role="status" className="text-sm text-green-700">{message}</p>}
        <button type="submit" disabled={loading} className="min-h-11 w-full rounded-md bg-indigo-600 px-4 font-medium text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50">{loading ? "Sending…" : "Send reset link"}</button>
        <Link href="/login" className="flex min-h-11 items-center justify-center text-sm text-indigo-600 hover:text-indigo-500">Back to login</Link>
      </form>
    </main>
  );
}
