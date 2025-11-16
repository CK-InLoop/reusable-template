"use client";

import Link from "next/link";
import { formatText } from "@/lib/text";

type ProductSidebarClientProps = {
  categories: string[];
};

export default function ProductSidebarClient({
  categories,
}: ProductSidebarClientProps) {
  return (
    <aside className="flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm h-full">
      {/* Blue header bar */}
      <div className="flex items-center gap-3 rounded-t-lg bg-[#0b4f82] px-4 py-3 flex-shrink-0">
        <svg
          className="h-5 w-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
          ALL PRODUCTS
        </h2>
      </div>

      {/* Category list */}
      <div className="divide-y divide-slate-100 flex-1 overflow-y-auto">
        {categories.map((category, index) => (
          <Link
            key={index}
            href="/products"
            className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#0b4f82] min-h-[44px]"
          >
            <span>{formatText(category)}</span>
            <svg
              className="h-4 w-4 text-slate-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </div>
    </aside>
  );
}

