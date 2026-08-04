"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/auth/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to reset password");
      setMessage(data.message); setPassword("");
    } catch (err: any) { setError(err.message || "Unable to reset password"); }
    finally { setLoading(false); }
  }

  return <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4"><form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-lg bg-white p-8 shadow"><h1 className="text-2xl font-bold text-gray-900">Reset password</h1><input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full rounded border p-3" />{error && <p className="text-sm text-red-600">{error}</p>}{message && <p className="text-sm text-green-600">{message}</p>}<button disabled={loading || !token} className="w-full rounded bg-indigo-600 p-3 font-medium text-white disabled:opacity-50">{loading ? "Saving..." : "Set new password"}</button><Link href="/login" className="block text-center text-sm text-indigo-600">Back to login</Link></form></main>;
}
