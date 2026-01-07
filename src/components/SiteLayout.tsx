import { getHomePage, getMenuItems } from "@/lib/details";
import { formatText } from "@/lib/text";
import { getImagePath } from "@/lib/images";
import SiteLayoutClient from "./SiteLayoutClient";

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

  return (
    <SiteLayoutClient
      activePath={activePath}
      companyName={companyName}
      heroTagline={heroTagline}
      logoUrl={logoUrl}
      menuItems={menuItems}
      brochureLinks={brochureLinks}
    >
      {children}
    </SiteLayoutClient>
  );
}

