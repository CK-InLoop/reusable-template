"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { formatText } from "@/lib/text";
import { getAzureSignedUrl } from "@/lib/azure";

type ProductSidebarClientProps = {
  sections: { name: string; subCategories: string[] }[];
  variant?: "flyout" | "accordion";
};

export default function ProductSidebarClient({
  sections,
  variant = "accordion",
}: ProductSidebarClientProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState<{ category: string, sub: string } | null>(null);
  const [flyoutSuppliers, setFlyoutSuppliers] = useState<any[]>([]);
  const [loadingFlyout, setLoadingFlyout] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Ref for debouncing fetch
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Ref for keeping flyout open when moving from link to flyout
  const flyoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeCategory = searchParams.get("category");
  const activeSubCategory = searchParams.get("subCategory");

  useEffect(() => {
    if (activeCategory && variant === "accordion") {
      setExpandedSection(activeCategory);
    }
  }, [activeCategory, variant]);

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
      if (flyoutTimeoutRef.current) clearTimeout(flyoutTimeoutRef.current);
    };
  }, []);

  const toggleSection = (name: string) => {
    setExpandedSection((current) => (current === name ? null : name));
  };

  const fetchSuppliers = useCallback(async (category: string, sub: string) => {
    setLoadingFlyout(true);
    try {
      const res = await fetch(`/api/suppliers/list?category=${encodeURIComponent(category)}&subCategory=${encodeURIComponent(sub)}`);
      if (res.ok) {
        const data = await res.json();
        setFlyoutSuppliers(data.suppliers || []);
      }
    } catch (error) {
      console.error("Failed to fetch flyout suppliers", error);
    } finally {
      setLoadingFlyout(false);
    }
  }, []);

  const onSubMouseEnter = (category: string, sub: string) => {
    if (flyoutTimeoutRef.current) clearTimeout(flyoutTimeoutRef.current);

    // If already hovering this item, do nothing
    if (hoveredSubCategory?.category === category && hoveredSubCategory?.sub === sub) return;

    setHoveredSubCategory({ category, sub });

    // Debounce fetch to avoid spamming while moving quickly
    if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    fetchTimeoutRef.current = setTimeout(() => {
      fetchSuppliers(category, sub);
    }, 100);
  };

  const onSubMouseLeave = () => {
    // Delay hiding to allow moving cursor into the flyout
    flyoutTimeoutRef.current = setTimeout(() => {
      setHoveredSubCategory(null);
      setFlyoutSuppliers([]);
    }, 300);
  };

  const onFlyoutMouseEnter = () => {
    if (flyoutTimeoutRef.current) clearTimeout(flyoutTimeoutRef.current);
  };

  const onFlyoutMouseLeave = () => {
    setHoveredSubCategory(null);
    setFlyoutSuppliers([]);
  };

  return (
    <div className="relative h-full flex" onMouseLeave={onFlyoutMouseLeave}>
      <aside className={`flex flex-col w-full rounded-lg border border-slate-200 bg-white shadow-sm h-full z-20 relative ${variant === "accordion" ? "overflow-hidden" : ""}`}>
        {/* Category list */}
        <div className="divide-y divide-slate-100 flex-1 overflow-y-auto">
          {sections.map((section) => {
            const isExpanded = expandedSection === section.name;

            return (
              <div
                key={section.name}
                className="relative py-1"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(section.name)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#0b4f82] min-h-[44px] ${isExpanded ? "bg-slate-50 text-[#0b4f82]" : ""}`}
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
                  <div className="pb-2 bg-slate-50/50">
                    {section.subCategories.map((sub) => {
                      const isActive =
                        pathname.startsWith("/suppliers") &&
                        activeCategory === section.name &&
                        activeSubCategory === sub;

                      const isHovered = hoveredSubCategory?.category === section.name && hoveredSubCategory?.sub === sub;

                      const subHref = `/suppliers?category=${encodeURIComponent(section.name)}&subCategory=${encodeURIComponent(sub)}`;

                      return (
                        <Link
                          key={sub}
                          href={subHref}
                          onMouseEnter={() => onSubMouseEnter(section.name, sub)}
                          onMouseLeave={onSubMouseLeave}
                          className={`block px-6 py-2 text-sm transition cursor-pointer hover:bg-slate-100 hover:text-[#0b4f82] ${isActive || isHovered
                            ? "text-[#0b4f82] font-semibold bg-slate-100"
                            : "text-slate-600"
                            }`}
                        >
                          {formatText(sub)}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Flyout Panel */}
      {hoveredSubCategory && (
        <div
          className="absolute left-[100%] top-0 h-[700px] w-[700px] bg-white border border-[#0b4f82] shadow-xl rounded-r-lg z-10 overflow-auto p-10 ml-1"
          onMouseEnter={onFlyoutMouseEnter}
          onMouseLeave={onFlyoutMouseLeave}
        >
          {loadingFlyout ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0b4f82]"></div>
            </div>
          ) : flyoutSuppliers.length === 0 ? (
            <div className="text-slate-500 text-sm">No suppliers found in this category.</div>
          ) : (
            <div className="grid grid-cols-3 gap-10">
              {flyoutSuppliers.map((supplier) => (
                <Link
                  key={supplier.id}
                  href={`/suppliers/${supplier.id}?category=${encodeURIComponent(hoveredSubCategory.category)}&subCategory=${encodeURIComponent(hoveredSubCategory.sub)}`}
                  className="group flex flex-col rounded-lg border border-[#0b4f82] overflow-hidden hover:shadow-md transition bg-white"
                >
                  <div className="relative h-20 w-full bg-slate-50">
                    {supplier.profileImage ? (
                      <img
                        src={getAzureSignedUrl(supplier.profileImage)}
                        alt={supplier.companyName || supplier.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-300">
                        <span className="text-xl font-bold">{(supplier.companyName || supplier.name || "S").charAt(0)}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
