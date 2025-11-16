import Link from "next/link";
import { getHomePage, getMenuItems } from "@/lib/details";
import { MENU_ORDER, MENU_PATHS } from "@/lib/navigation";
import { formatText } from "@/lib/text";
import UserActions from "@/components/UserActions";

export default function Navbar() {
  const homePage = getHomePage();
  const companyName = formatText(homePage.text_blocks[0] ?? "PAKMON");
  const tagline = formatText(homePage.text_blocks[1] ?? "");
  const menuItems = getMenuItems();

  const orderedMenu = MENU_ORDER.map((label) =>
    menuItems.find((item) => item.label === label)
  ).filter(Boolean) as { label: string; href: string }[];

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500/40 bg-red-600/10 text-lg font-semibold text-red-600">
              PE
            </div>
            <div className="hidden sm:block">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                {formatText("Process Equipments")}
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {companyName}
              </p>
            </div>
          </Link>
          <p className="hidden max-w-md text-xs text-slate-500 md:block">
            {tagline}
          </p>
        </div>

        <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-widest text-slate-600 lg:flex">
          {orderedMenu.map((item) => (
            <Link
              key={item.label}
              href={MENU_PATHS[item.label as keyof typeof MENU_PATHS] ?? item.href}
              className="transition hover:text-red-600"
            >
              {formatText(item.label)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={MENU_PATHS["CONTACT US"]}
            className="hidden items-center gap-2 rounded-full border border-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-600 transition hover:bg-red-600 hover:text-white sm:inline-flex"
          >
            Contact
          </Link>
          <UserActions />
        </div>
      </div>
    </nav>
  );
}
