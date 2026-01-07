"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { formatText } from "@/lib/text";

type ProductSidebarClientProps = {
  sections: { name: string; subCategories: string[] }[];
};

export default function ProductSidebarClient({
  sections,
}: ProductSidebarClientProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeCategory = searchParams.get("category");
  const activeSubCategory = searchParams.get("subCategory");

  useEffect(() => {
    if (activeCategory) {
      setExpandedSection(activeCategory);
    }
  }, [activeCategory]);

  const toggleSection = (name: string) => {
    setExpandedSection((current) => (current === name ? null : name));
  };

  const handleSubCategoryHover = useCallback((sectionName: string, sub: string) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    // Set a short delay to prevent accidental navigation
    hoverTimeoutRef.current = setTimeout(() => {
      const href = `/suppliers?category=${encodeURIComponent(sectionName)}&subCategory=${encodeURIComponent(sub)}`;
      router.push(href);
    }, 150);
  }, [router]);

  const handleSubCategoryLeave = useCallback(() => {
    // Clear timeout if mouse leaves before delay completes
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <aside className="flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm h-full">
      {/* Blue header bar */}
      <div className="flex items-center gap-3 rounded-t-lg bg-[#0b4f82] px-4 py-3 flex-shrink-0">
        <svg
          className="h-5 w-5 self-start text-white"
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
          Category
        </h2>
      </div>

      {/* Category list */}
      <div className="divide-y divide-slate-100 flex-1 overflow-y-auto">
        {sections.map((section) => {
          const isExpanded = expandedSection === section.name;

          return (
            <div key={section.name} className="py-1">
              <button
                type="button"
                onClick={() => toggleSection(section.name)}
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#0b4f82] min-h-[44px]"
                aria-expanded={isExpanded}
              >
                <span>{formatText(section.name)}</span>
                <svg
                  className={`h-4 w-4 text-slate-400 flex-shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""
                    }`}
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
              </button>

              {isExpanded && (
                <div className="pb-2">
                  {section.subCategories.map((sub) => {
                    const isActive =
                      pathname.startsWith("/suppliers") &&
                      activeCategory === section.name &&
                      activeSubCategory === sub;

                    return (
                      <div
                        key={sub}
                        onMouseEnter={() => handleSubCategoryHover(section.name, sub)}
                        onMouseLeave={handleSubCategoryLeave}
                        className={`block px-6 py-2 text-sm transition cursor-pointer hover:bg-slate-50 hover:text-[#0b4f82] ${isActive
                          ? "text-[#0b4f82] font-semibold bg-slate-50"
                          : "text-slate-600"
                          }`}
                      >
                        {formatText(sub)}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
