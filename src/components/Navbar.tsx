"use client";

import { useState } from "react";
import Link from "next/link";
import { getHomePage, getMenuItems } from "@/lib/details";
import { MENU_ORDER, MENU_PATHS } from "@/lib/navigation";
import { formatText } from "@/lib/text";
import UserActions from "@/components/UserActions";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const homePage = getHomePage();
  const companyName = formatText(homePage.text_blocks[0] ?? "PAKMON");
  const tagline = formatText(homePage.text_blocks[1] ?? "");
  const menuItems = getMenuItems();

  const orderedMenu = MENU_ORDER.map((label) =>
    menuItems.find((item) => item.label === label)
  ).filter(Boolean) as { label: string; href: string }[];

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop and Mobile Header */}
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-blue-500/40 bg-blue-600/10 text-base sm:text-lg font-semibold text-blue-600">
                PE
              </div>
              <div className="hidden sm:block">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  {formatText("Process Equipments")}
                </p>
                <p className="text-base sm:text-lg font-semibold text-slate-900">
                  {companyName}
                </p>
              </div>
            </Link>
            <p className="hidden max-w-md text-xs text-slate-500 lg:block ml-4">
              {tagline}
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold uppercase tracking-widest text-slate-600">
            {orderedMenu.map((item) => (
              <Link
                key={item.label}
                href={MENU_PATHS[item.label as keyof typeof MENU_PATHS] ?? item.href}
                className="transition hover:text-blue-600"
              >
                {formatText(item.label)}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={MENU_PATHS["CONTACT US"]}
              className="flex items-center gap-2 rounded-full border border-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              Contact
            </Link>
            <UserActions />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded="false"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
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
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 space-y-3">
            {orderedMenu.map((item) => (
              <Link
                key={item.label}
                href={MENU_PATHS[item.label as keyof typeof MENU_PATHS] ?? item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-semibold uppercase tracking-widest text-slate-600 transition hover:text-blue-600 hover:bg-blue-50 rounded-md"
              >
                {formatText(item.label)}
              </Link>
            ))}
            <div className="px-4 pt-2 space-y-2 border-t border-slate-200">
              <Link
                href={MENU_PATHS["CONTACT US"]}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-full border border-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                Contact
              </Link>
              <div className="pt-2">
                <UserActions />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
