import Link from "next/link";
import { getHomePage, getMenuItems } from "@/lib/details";
import { MENU_PATHS } from "@/lib/navigation";
import { formatText } from "@/lib/text";

type SiteLayoutProps = {
  children: React.ReactNode;
  activePath?: string;
};

const accentGradient =
  "bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500";

export default function SiteLayout({
  children,
  activePath = "/",
}: SiteLayoutProps) {
  const homePage = getHomePage();
  const menuItems = getMenuItems();
  const companyName = formatText(homePage.text_blocks[0] ?? "PAKMON");
  const heroTagline = formatText(homePage.text_blocks[1] ?? "");

  return (
    <div className="relative min-h-screen bg-[#fdfaf4] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-[-240px] h-[420px] bg-[radial-gradient(circle_at_top,_rgba(226,232,240,0.6),_rgba(253,250,244,0))]" />
        <div className="absolute inset-x-0 bottom-[-240px] h-[420px] bg-[radial-gradient(circle_at_bottom,_rgba(248,196,113,0.35),_rgba(253,250,244,0))]" />
      </div>

      <header className="border-b border-slate-200/60 bg-white/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-[11px] uppercase tracking-[0.35em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>{companyName}</span>
          <p className="max-w-3xl text-[10px] font-medium tracking-[0.4em] text-slate-400 sm:text-[11px] md:text-xs">
            {heroTagline}
          </p>
        </div>
      </header>

      <nav className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5">
          <Link href="/" className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md shadow-emerald-100/80 ${accentGradient} text-lg font-semibold text-white`}
            >
              PE
            </div>
            <div className="hidden sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">
                Process Equipment Experts
              </p>
              <p className="text-lg font-semibold tracking-tight text-slate-900">
                {companyName}
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500 lg:flex">
            {menuItems.map((item) => {
              const href = item.href;
              const isActive =
                href === activePath ||
                (href !== "/" && activePath.startsWith(href));

              return (
                <Link
                  key={item.label}
                  href={href === "/" ? "/" : MENU_PATHS[item.label]}
                  className={`transition ${
                    isActive
                      ? "text-slate-900"
                      : "text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {formatText(item.label)}
                </Link>
              );
            })}
          </div>

          <Link
            href={MENU_PATHS["CONTACT US"]}
            className="hidden items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-600 transition hover:border-amber-400 hover:text-amber-500 sm:inline-flex"
          >
            Contact
          </Link>
        </div>
      </nav>

      <main className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-20">
        <div className="rounded-[32px] border border-white/60 bg-white/90 p-6 text-slate-900 shadow-2xl shadow-slate-200/80 backdrop-blur-sm sm:p-10 lg:p-14">
          {children}
        </div>
      </main>

      <footer className="border-t border-slate-200/70 bg-white/90 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-8 text-sm text-slate-500 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl space-y-4">
              <p className="text-lg font-semibold text-slate-900">
                {companyName}
              </p>
              <p className="text-sm leading-relaxed text-slate-500">
                {heroTagline}
              </p>
            </div>
            <div className="grid gap-3 text-[11px] uppercase tracking-[0.35em] text-slate-400 sm:grid-cols-3 md:text-xs">
              {menuItems.map((item) => (
                <span
                  key={item.label}
                  className="rounded-full border border-slate-200 px-4 py-2 text-center transition hover:border-amber-400 hover:text-amber-500"
                >
                  {formatText(item.label)}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-10 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <p className="mt-6 text-xs uppercase tracking-[0.35em] text-slate-400">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

