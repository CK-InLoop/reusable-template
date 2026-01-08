'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatText } from "@/lib/text";
import { MENU_PATHS } from "@/lib/navigation";
import ServiceIcons from "./ServiceIcons";

type HeaderNavProps = {
  companyName: string;
  logoUrl: string;
  menuItems: { label: string; href: string }[];
  brochureLinks?: { label: string; href: string }[];
  activePath: string;
  onToggleSidebar?: () => void;
};

const SECTIONS = [
  {
    name: "OIL & GAS Piping Systems",
    subCategories: [
      "NG Factory Pipelines and SKIDS Installation",
      "LNG STORAGE TANKS AND SYSTEM INSTALLATION",
      "NITROGEN & OXYGEN GENERATORS",
    ],
  },
  {
    name: "Dairy & Food",
    subCategories: [
      "Dairy plants",
      "Water treatment plants",
      "CIP Plants",
      "Pilot plant/Mini plant",
      "Factory relocation",
      "SS storage tanks & mixers",
      "Cleaning stations",
      "IBC Dosing Stations",
      "Platforms",
      "SS pipings",
    ],
  },
  {
    name: "Industrial",
    subCategories: [
      "Home and persona care plants",
      "Sulphonation plant",
      "Lab plant",
      "Tank farms",
      "Utility & pipings",
    ],
  },
  {
    name: "Consulting & Services",
    subCategories: [
      "AMC Contracts",
      "Fan Balance and Monitoring",
      "Thermal Inspections",
      "Vibration Checks",
      "Central Lubrication System",
      "Tightening Checks",
      "6S Trainings",
      "TPM (Total Productive Maintenance)",
      "Focused Improvements",
      "Autonomous Maintenance",
      "Planned Maintenance",
      "Energy Savings Risk Assessment",
      "Cost Reductions",
      "Early Equipment Management",
      "HSE Risk Assessments and Predictions",
      "Efficiency Monitoring – FOL",
      "Low Cost Automations",
      "Supply Chain – Raw Materials",
    ],
  },
];

export default function HeaderNav({
  companyName,
  logoUrl,
  menuItems,
  brochureLinks = [],
  activePath,
  onToggleSidebar,
}: HeaderNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogsOpen, setIsCatalogsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsCatalogsOpen(false);
    setIsCategoriesOpen(false);
  };
  const isActiveLink = (href: string) =>
    href === activePath ||
    (href !== "/" && activePath.startsWith(href));

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <header className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-8">
          <Link
            href="/"
            className="flex items-center gap-6 whitespace-nowrap"
            onClick={closeMenu}
            aria-label="Go to homepage"
          >
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src={logoUrl}
                alt={companyName}
                fill
                className="object-contain"
                sizes="48px"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-bold text-[#0b4f82]">
                {companyName}
              </p>
            </div>
          </Link>

          <div className="hidden lg:block">
            <ServiceIcons />
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            className="ml-3 inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#e2e8f0] text-[#0b4f82] transition hover:border-[#0b4f82] hover:text-[#ffb400] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4f82] lg:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="site-mobile-menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      <nav className="sticky top-0 z-40 bg-[#0b4f82] shadow-md">
        <div className="mx-auto hidden max-w-6xl items-center justify-between gap-6 px-4 text-sm font-medium text-white lg:flex">
          {/* Left side - Category button */}
          <div className="h-full">
            <button
              type="button"
              onClick={(e) => {
                if (onToggleSidebar) {
                  e.preventDefault();
                  onToggleSidebar();
                }
              }}
              className="flex h-14 w-[280px] items-center gap-3 bg-[#0a3d6b] px-6 text-base font-bold uppercase tracking-wider transition hover:bg-[#083050]"
            >
              <svg
                className="h-5 w-5"
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
              Category
            </button>
          </div>

          {/* Right side - Menu items and Catalogs */}
          <div className="flex items-center gap-6 py-4">
            {menuItems.map((item) => {
              const href = item.href;
              const isActive = isActiveLink(href);

              return (
                <Link
                  key={item.label}
                  href={href}
                  className={`uppercase tracking-wider whitespace-nowrap transition ${isActive
                    ? "text-[#ffb400]"
                    : "text-white hover:text-[#ffb400]"
                    }`}
                >
                  {formatText(item.label)}
                </Link>
              );
            })}
            {brochureLinks.length > 0 && (
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 uppercase tracking-wider transition hover:text-[#ffb400]"
                  aria-haspopup="true"
                >
                  Catalog
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 4l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="invisible absolute right-0 top-full z-50 mt-3 w-64 translate-y-2 rounded-xl border border-white/20 bg-[#0b4f82] p-3 opacity-0 shadow-2xl transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/70">
                    Available Brochures
                  </p>
                  <div className="space-y-2">
                    {brochureLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-lg bg-white/5 p-3 transition hover:bg-white/10"
                        onClick={closeMenu}
                      >
                        <span className="block text-sm font-semibold text-white">
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          id="site-mobile-menu"
          className={`lg:hidden border-t border-white/20 bg-[#0b4f82] px-4 transition-[max-height,opacity] duration-300 ease-out ${isMenuOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex flex-col gap-3 py-4 text-white">
            {/* Category Section for Mobile */}
            <div className="rounded-lg bg-white/5">
              <button
                type="button"
                onClick={() => setIsCategoriesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-widest transition hover:bg-white/10"
                aria-expanded={isCategoriesOpen}
              >
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Category
                </span>
                <svg
                  className={`h-4 w-4 transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className={`grid overflow-hidden px-4 transition-[max-height,opacity] duration-200 ${isCategoriesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="space-y-2 pb-4 pt-2">
                  <Link href="/suppliers?category=OIL & GAS Piping Systems" onClick={closeMenu} className="block rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20">OIL & GAS Piping Systems</Link>
                  <Link href="/suppliers?category=Dairy & Food" onClick={closeMenu} className="block rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20">Dairy & Food</Link>
                  <Link href="/suppliers?category=Industrial" onClick={closeMenu} className="block rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20">Industrial</Link>
                  <Link href="/suppliers?category=Consulting & Services" onClick={closeMenu} className="block rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20">Consulting & Services</Link>
                </div>
              </div>
            </div>

            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-widest transition ${isActiveLink(item.href)
                  ? "bg-white/15 text-[#ffb400]"
                  : "hover:bg-white/10"
                  }`}
              >
                {formatText(item.label)}
              </Link>
            ))}

            {brochureLinks.length > 0 && (
              <div className="rounded-lg bg-white/5">
                <button
                  type="button"
                  onClick={() => setIsCatalogsOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-widest transition hover:bg-white/10"
                  aria-expanded={isCatalogsOpen}
                >
                  <span>Catalogs</span>
                  <svg
                    className={`h-4 w-4 transition-transform ${isCatalogsOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 4l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div
                  className={`grid overflow-hidden px-4 transition-[max-height,opacity] duration-200 ${isCatalogsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="space-y-2 pb-4 pt-2">
                    {brochureLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className="block rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}


