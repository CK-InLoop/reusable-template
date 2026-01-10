import { db } from "@/lib/db";
import ProductSidebarClient from "./ProductSidebarClient";

interface SubCategory {
  id: string;
  name: string;
  isHeading: boolean;
  order: number;
}

interface Category {
  id: string;
  name: string;
  order: number;
  subCategories: SubCategory[];
}

export default async function ProductSidebar() {
  // Fetch categories from database (managed through pakmon-supplier dashboard)
  const categoriesFromDb = await db.getCategories();

  // Transform database categories to the format expected by ProductSidebarClient
  const sections = (categoriesFromDb as Category[]).map((cat) => ({
    name: cat.name,
    subCategories: cat.subCategories.map((sub) => ({
      name: sub.name,
      isHeading: sub.isHeading,
    })),
  }));

  // Fallback to empty array if no categories found
  if (sections.length === 0) {
    console.warn('No categories found in database. Categories can be managed at /dashboard/categories in pakmon-supplier.');
  }

  return <ProductSidebarClient sections={sections} />;
}
