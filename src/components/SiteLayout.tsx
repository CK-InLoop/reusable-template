import { getHomePage, getMenuItems } from "@/lib/details";
import { formatText } from "@/lib/text";
import { getImagePath } from "@/lib/images";
import { db } from "@/lib/db";
import SiteLayoutClient from "./SiteLayoutClient";

type SubCategory = {
  id: string;
  name: string;
  isHeading: boolean;
  order: number;
};

type Category = {
  id: string;
  name: string;
  order: number;
  subCategories: SubCategory[];
};

type SiteLayoutProps = {
  children: React.ReactNode;
  activePath?: string;
};

export default async function SiteLayout({
  children,
  activePath = "/",
}: SiteLayoutProps) {
  const homePage = getHomePage();
  const menuItems = getMenuItems();
  const companyName = formatText(homePage.text_blocks[0] ?? "PAKMON");
  const heroTagline = formatText(homePage.text_blocks[1] ?? "");
  const logoUrl = getImagePath(homePage.image_urls[0]);
  const brochureLinks = [
    {
      label: "Gas Systems Brochure",
      href: "/catalogs?type=gas",
    },
    {
      label: "Pressure Vessels Brochure",
      href: "/catalogs?type=pressure",
    },
  ];

  // Fetch categories on server-side to pass to client component
  const categoriesFromDb = await db.getCategories();
  const sidebarSections = (categoriesFromDb as Category[]).map((cat) => ({
    name: cat.name,
    subCategories: cat.subCategories.map((sub) => ({
      name: sub.name,
      isHeading: sub.isHeading,
    })),
  }));

  return (
    <SiteLayoutClient
      activePath={activePath}
      companyName={companyName}
      heroTagline={heroTagline}
      logoUrl={logoUrl}
      menuItems={menuItems}
      brochureLinks={brochureLinks}
      sidebarSections={sidebarSections}
    >
      {children}
    </SiteLayoutClient>
  );
}

