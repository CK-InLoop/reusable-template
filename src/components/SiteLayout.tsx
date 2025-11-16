import Link from "next/link";
import Image from "next/image";
import { getHomePage, getMenuItems } from "@/lib/details";
import { MENU_PATHS } from "@/lib/navigation";
import { formatText } from "@/lib/text";
import ServiceIcons from "./ServiceIcons";
import { getImagePath } from "@/lib/images";

type SiteLayoutProps = {
  children: React.ReactNode;
  activePath?: string;
};

export default function SiteLayout({
  children,
  activePath = "/",
}: SiteLayoutProps) {
  const homePage = getHomePage();
  const menuItems = getMenuItems();
  const companyName = formatText(homePage.text_blocks[0] ?? "PAKMON");
  const heroTagline = formatText(homePage.text_blocks[1] ?? "");
  const logoUrl = getImagePath(homePage.image_urls[0]);

  return (
    <div className="relative min-h-screen bg-white text-[#171717]">
      {/* Top Service Bar */}
      <div className="border-b border-[#e2e8f0] bg-[#f8fafc]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm text-[#64748b]">
          <span className="hidden sm:inline">
            {formatText("Process Equipments Design,Manufacture Installations and Commissioning")}
          </span>
          <a
            href="tel:+971564332583"
            className="flex items-center gap-2 font-semibold text-[#0b4f82] hover:text-[#ffb400] transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            +971 56 433 2583
          </a>
        </div>
      </div>

      {/* Header with Logo and Service Icons */}
      <header className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src={logoUrl}
                alt={companyName}
                fill
                className="object-contain"
                unoptimized
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
        </div>
      </header>

      {/* Dark Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-[#0b4f82] shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3">
          <div className="flex items-center gap-8 text-sm font-medium text-white">
            {menuItems.map((item) => {
              const href = item.href;
              const isActive =
                href === activePath ||
                (href !== "/" && activePath.startsWith(href));

              return (
                <Link
                  key={item.label}
                  href={href === "/" ? "/" : MENU_PATHS[item.label]}
                  className={`uppercase tracking-wider transition ${
                    isActive
                      ? "text-[#ffb400]"
                      : "text-white hover:text-[#ffb400]"
                  }`}
                >
                  {formatText(item.label)}
                </Link>
              );
            })}
          </div>

          <Link
            href={MENU_PATHS["CONTACT US"]}
            className="hidden items-center gap-2 rounded-md bg-[#ffb400] px-4 py-2 text-sm font-semibold text-[#171717] transition hover:bg-[#ffb400]/90 sm:inline-flex"
          >
            Contact
          </Link>
        </div>
      </nav>

      <main className="relative mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
        {children}
      </main>

      <footer className="border-t border-[#e2e8f0] bg-[#f8fafc] py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-8 text-sm text-[#64748b] md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl space-y-4">
              <p className="text-lg font-semibold text-[#171717]">
                {companyName}
              </p>
              <p className="text-sm leading-relaxed text-[#64748b]">
                {heroTagline}
              </p>
              <p className="text-sm font-medium text-[#0b4f82]">
                Phone: +971 56 433 2583
              </p>
            </div>
            <div className="grid gap-3 text-xs uppercase tracking-wider text-[#64748b] sm:grid-cols-3">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-md border border-[#e2e8f0] px-4 py-2 text-center transition hover:border-[#0b4f82] hover:text-[#0b4f82]"
                >
                  {formatText(item.label)}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-10 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent" />
          <p className="mt-6 text-xs uppercase tracking-wider text-[#64748b]">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

