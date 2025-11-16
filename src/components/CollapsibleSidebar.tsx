import { getHomePage } from "@/lib/details";
import CollapsibleSidebarClient from "./CollapsibleSidebarClient";

export default function CollapsibleSidebar() {
  const homePage = getHomePage();

  // Extract product categories from text_blocks
  const categories = [
    "SS Tanks, Storage Vessels,Mixers Manufacturing",
    "Blending System Design and Fabrication",
    "CIP skids",
    "SS Process storageTanks,Agitators,Mixers",
    "SS Piping and Thermal Insulations",
    "Water treatment plants",
    "Dairy Plants",
    "Home Care and Personal Care Plants",
    "Process Equipment, Homogenizers and Blending Systems",
  ].filter((cat) =>
    homePage.text_blocks.some((text) =>
      text.toLowerCase().includes(cat.toLowerCase().substring(0, 10))
    )
  );

  return <CollapsibleSidebarClient categories={categories} />;
}

