import { Suspense } from "react";
import { db } from "@/lib/db";
import CollapsibleSidebarClient from "./CollapsibleSidebarClient";

function SidebarSkeleton() {
  return (
    <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg"></div>
  );
}

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

async function SidebarContent() {
  // Fetch categories from database (managed through pakmon-supplier dashboard)
  const categoriesFromDb = await db.getCategories();

  // Transform database categories to the format expected by CollapsibleSidebarClient
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

  return <CollapsibleSidebarClient sections={sections} />;
}

export default function CollapsibleSidebar() {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <SidebarContent />
    </Suspense>
  );
}
