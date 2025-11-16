"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

type UserActionsProps = {
  onAction?: () => void;
};

export default function UserActions({ onAction }: UserActionsProps) {
  const { user, loading, signOut, isAdmin } = useAuth();

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center text-xs font-medium uppercase tracking-widest text-slate-500 min-h-[44px]">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        onClick={handleAction}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 min-h-[44px] w-full lg:w-auto"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full lg:w-auto">
      {isAdmin && (
        <Link
          href="/dashboard"
          onClick={handleAction}
          className="hidden lg:inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 transition hover:border-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px]"
        >
          Dashboard
        </Link>
      )}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 rounded-lg sm:rounded-full border border-slate-200 bg-white px-4 py-3 sm:py-2 text-xs uppercase tracking-widest text-slate-600 shadow-sm w-full lg:w-auto">
        <span className="truncate text-slate-700 text-center sm:text-left min-h-[44px] flex items-center justify-center sm:justify-start">
          {user.name || user.email}
        </span>
        <button
          onClick={() => {
            signOut();
            handleAction();
          }}
          className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] w-full sm:w-auto"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

