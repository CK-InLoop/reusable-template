'use client';

import { useEffect } from "react";
import Link from "next/link";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Pakmon error boundary:", error);
  }, [error]);

  const message =
    error?.message?.trim() ||
    "Something went wrong while processing your request.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b4f82] via-[#0b4f82]/90 to-[#031b2d] text-white">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-8 rounded-3xl border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#ffb400]/20 text-[#ffb400]">
            <svg
              className="h-10 w-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
            Pakmon Emergency Shield
          </p>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            We hit an unexpected snag
          </h1>
          <p className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/80">
            <span className="text-xs uppercase tracking-widest text-white/60">
              Error message
            </span>
            <br />
            {message}
            {error?.digest && (
              <span className="mt-2 block text-xs text-white/60">
                Reference: {error.digest}
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm font-semibold sm:flex-row">
          <a
            href="mailto:info@pakmon.com"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-white/80 transition hover:border-white hover:text-white"
          >
            Contact support
          </a>
        </div>

        <p className="mt-12 text-xs uppercase tracking-widest text-white/50">
          © {new Date().getFullYear()} Pakmon. Engineering resilience.
        </p>
      </div>
    </div>
  );
}


