import Link from "next/link";
import { getHomePage } from "@/lib/details";
import { formatText } from "@/lib/text";

export default function ProductSidebar() {
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

  return (
    <aside className="flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
      {/* Red header bar */}
      <div className="flex items-center gap-3 rounded-t-lg bg-[#ef4444] px-4 py-3">
        <svg
          className="h-5 w-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
          ALL PRODUCTS
        </h2>
      </div>

      {/* Category list */}
      <div className="divide-y divide-slate-100">
        {categories.map((category, index) => (
          <Link
            key={index}
            href="/products"
            className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#0b4f82]"
          >
            <span>{formatText(category)}</span>
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </div>
    </aside>
  );
}

