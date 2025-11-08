import fs from "fs";
import path from "path";
import { MENU_PATHS, type MenuLabel } from "./navigation";
import { formatText } from "./text";

export type PageContent = {
  url: string;
  text_blocks: string[];
  image_urls: string[];
};

export type DetailContent = {
  start_url: string;
  page_count: number;
  max_pages: number;
  pages: PageContent[];
};

let cachedDetails: DetailContent | null = null;

export function loadDetails(): DetailContent {
  if (cachedDetails) {
    return cachedDetails;
  }

  const detailsPath = path.join(process.cwd(), "details.txt");
  const rawDetails = fs.readFileSync(detailsPath, "utf-8");
  cachedDetails = JSON.parse(rawDetails) as DetailContent;
  return cachedDetails;
}

export function getPageByUrl(fragment: string): PageContent | undefined {
  const details = loadDetails();
  return details.pages.find((page) => page.url.includes(fragment));
}

export function getHomePage(): PageContent {
  const details = loadDetails();
  return (
    details.pages.find((page) => page.url === details.start_url) ??
    details.pages[0]
  );
}

const isMenuLabel = (value: string): value is MenuLabel =>
  value in MENU_PATHS;

export function getMenuItems(): { label: MenuLabel; href: string }[] {
  const homePage = getHomePage();
  const seen = new Set<string>();

  return homePage.text_blocks
    .filter((label): label is MenuLabel => isMenuLabel(label))
    .filter((label) => {
      if (seen.has(label)) return false;
      seen.add(label);
      return true;
    })
    .map((label) => ({
      label,
      href: MENU_PATHS[label],
    }));
}

export { MENU_PATHS } from "./navigation";
export { formatText };

