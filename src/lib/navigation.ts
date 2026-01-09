export const MENU_ORDER = [
  "MAIN PAGE",
  "ACCESSORIES Fabrications",
  "SERVICES",
  "CONTACT US",
] as const;

export type MenuLabel = (typeof MENU_ORDER)[number];

export const MENU_PATHS: Record<MenuLabel, string> = {
  "MAIN PAGE": "/",
  "ACCESSORIES Fabrications": "/accessories",
  SERVICES: "/services",
  "CONTACT US": "/contact",
};

export const MENU_ITEMS = MENU_ORDER.map((label) => ({
  label,
  href: MENU_PATHS[label],
}));


