import { getHomePage, getMenuItems } from "@/lib/details";
import { formatText } from "@/lib/text";
import NavbarClient from "./NavbarClient";

export default function Navbar() {
  const homePage = getHomePage();
  const companyName = formatText(homePage.text_blocks[0] ?? "PAKMON");
  const tagline = formatText(homePage.text_blocks[1] ?? "");
  const menuItems = getMenuItems();

  return (
    <NavbarClient
      companyName={companyName}
      tagline={tagline}
      menuItems={menuItems}
    />
  );
}
