"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MENU_ORDER, MENU_PATHS } from "@/lib/navigation";
import { formatText } from "@/lib/text";
import UserActions from "@/components/UserActions";

type NavbarClientProps = {
  companyName: string;
  tagline: string;
  menuItems: { label: string; href: string }[];
};

export default function NavbarClient({
  companyName,
  tagline,
  menuItems,
}: NavbarClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const orderedMenu = MENU_ORDER.map((label) =>
    menuItems.find((item) => item.label === label)
  ).filter(Boolean) as { label: string; href: string }[];

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        mobileMenuOpen
      ) {
        setMobileMenuOpen(false);
      }
    };

    // Prevent body scroll when menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <nav
        className="border-b border-slate-200 bg-white sticky top-0 z-50"
        ref={menuRef}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Desktop and Mobile Header */}
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo and Branding */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <Link
                href="/"
                className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
                onClick={closeMenu}
                aria-label="Home"
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-blue-500/40 bg-blue-600/10 text-base sm:text-lg font-semibold text-blue-600 flex-shrink-0">
                  PE
                </div>
                <div className="hidden sm:block min-w-0">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500 truncate">
                    {formatText("Process Equipments")}
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-slate-900 truncate">
                    {companyName}
                  </p>
                </div>
              </Link>
              <p className="hidden max-w-md text-xs text-slate-500 lg:block ml-4 truncate">
                {tagline}
              </p>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold uppercase tracking-widest text-slate-600">
              {orderedMenu.map((item) => {
                const href =
                  MENU_PATHS[item.label as keyof typeof MENU_PATHS] ?? item.href;
                const isActive =
                  pathname === href || (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={item.label}
                    href={href}
                    className={`transition hover:text-blue-600 ${isActive ? "text-blue-600" : ""
                      }`}
                  >
                    {formatText(item.label)}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href={MENU_PATHS["CONTACT US"]}
                className="flex items-center gap-2 rounded-full border border-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-600 transition hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Contact
              </Link>
              <UserActions />
            </div>

            {/* Mobile Menu Button - Larger touch target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-3 rounded-md text-slate-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 min-w-[44px] min-h-[44px]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
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
                  aria-hidden="true"
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

          {/* Mobile Menu with Animation */}
          <div
            id="mobile-menu"
            className={`lg:hidden border-t border-slate-200 bg-white overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen
              ? "max-h-[100vh] opacity-100"
              : "max-h-0 opacity-0"
              }`}
            aria-hidden={!mobileMenuOpen}
          >
            <div className="py-4 space-y-1">
              {/* Navigation Links */}
              {orderedMenu.map((item, index) => {
                const href =
                  MENU_PATHS[item.label as keyof typeof MENU_PATHS] ?? item.href;
                const isActive =
                  pathname === href || (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={item.label}
                    href={href}
                    onClick={closeMenu}
                    className={`block px-4 py-3 text-sm font-semibold uppercase tracking-widest transition min-h-[44px] flex items-center ${isActive
                      ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                      : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {formatText(item.label)}
                  </Link>
                );
              })}

              {/* Separator */}
              <div className="border-t border-slate-200 my-2" />

              {/* Contact Button */}
              <div className="px-4">
                <Link
                  href={MENU_PATHS["CONTACT US"]}
                  onClick={closeMenu}
                  className="block w-full text-center rounded-full border-2 border-blue-600 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-blue-600 transition hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center justify-center"
                >
                  Contact
                </Link>
              </div>

              {/* User Actions Section */}
              <div className="px-4 pt-2">
                <div className="border-t border-slate-200 pt-4">
                  <UserActions onAction={closeMenu} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

