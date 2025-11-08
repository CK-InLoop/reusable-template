"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function UserActions() {
  const { user, loading, signOut, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center text-xs font-medium uppercase tracking-widest text-slate-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {isAdmin && (
        <Link
          href="/dashboard"
          className="hidden rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 transition hover:border-red-500 hover:text-red-600 sm:inline-flex"
        >
          Dashboard
        </Link>
      )}
      <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs uppercase tracking-widest text-slate-600 shadow-sm">
        <span className="truncate max-w-[160px] text-slate-700">
          {user.name || user.email}
        </span>
        <button
          onClick={() => signOut()}
          className="rounded-full bg-red-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white transition hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

