"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { formatText } from "@/lib/text";
import { getAzureSignedUrl } from "@/lib/azure";

type SubCategoryItem = { name: string; isHeading?: boolean };

type ProductSidebarClientProps = {
  sections: { name: string; subCategories: SubCategoryItem[] }[];
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
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [subCategoryHeight, setSubCategoryHeight] = useState<number | null>(null);

  // Ref for the subcategory panel to measure its height
  const subCategoryRef = useRef<HTMLElement>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Ref for debouncing fetch
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Ref for keeping flyout open when moving from link to flyout
  const flyoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeCategory = searchParams.get("category");
  const activeSubCategory = searchParams.get("subCategory");

  // Ref for the sidebar container to detect outside clicks
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Measure subcategory panel height when it changes
  useEffect(() => {
    if (subCategoryRef.current) {
      setSubCategoryHeight(subCategoryRef.current.offsetHeight);
    }
  }, [expandedSection]);

  // Close subcategory panel when clicking outside sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setExpandedSection(null);
        setHoveredSubCategory(null);
        setFlyoutSuppliers([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
      if (flyoutTimeoutRef.current) clearTimeout(flyoutTimeoutRef.current);
    };
  }, []);

  const toggleSection = (name: string) => {
    setExpandedSection((current) => (current === name ? null : name));
    // Clear hovered subcategory when changing sections
    setHoveredSubCategory(null);
    setFlyoutSuppliers([]);
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

  // Get the currently expanded section for rendering subcategories panel
  const expandedSectionData = sections.find(s => s.name === expandedSection);

  return (
    <div ref={sidebarRef} className="relative flex items-start" onMouseLeave={onFlyoutMouseLeave}>
      {/* Categories Panel (Left) */}
      <aside className="flex flex-col w-[200px] min-w-[280px] rounded-l-lg border border-slate-200 bg-white shadow-sm z-20 relative">
        <div className="divide-y divide-slate-100 flex-1 overflow-y-auto">
          {sections.map((section) => {
            const isExpanded = expandedSection === section.name;

            return (
              <div key={section.name} className="py-1">
                <button
                  type="button"
                  onClick={() => toggleSection(section.name)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#0b4f82] min-h-[44px] ${isExpanded ? "bg-[#0b4f82] text-white" : ""}`}
                  aria-expanded={isExpanded}
                >
                  <span>{formatText(section.name)}</span>
                  <svg
                    className={`h-4 w-4 flex-shrink-0 transition-transform ${isExpanded ? "text-white" : "text-slate-400"}`}
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
              </div>
            );
          })}
        </div>
      </aside>

      {/* Subcategories Panel (Middle) - Opens to the right of categories, positioned absolutely */}
      {expandedSectionData && (
        <aside ref={subCategoryRef} className="absolute left-[280px] top-0 flex flex-col w-[280px] min-w-[280px] border border-slate-200 bg-white shadow-lg rounded-r-lg z-15">
          <div className="flex-1 overflow-y-auto py-2">
            {expandedSectionData.subCategories.map((sub) => {
              if (sub.isHeading) {
                return (
                  <div key={sub.name} className="px-4 pt-4 pb-1 text-xs font-bold text-yellow-500 uppercase tracking-wider">
                    {sub.name}
                  </div>
                );
              }
              const isActive =
                pathname.startsWith("/suppliers") &&
                activeCategory === expandedSectionData.name &&
                activeSubCategory === sub.name;

              const isHovered = hoveredSubCategory?.category === expandedSectionData.name && hoveredSubCategory?.sub === sub.name;

              const subHref = `/suppliers?category=${encodeURIComponent(expandedSectionData.name)}&subCategory=${encodeURIComponent(sub.name)}`;

              return (
                <Link
                  key={sub.name}
                  href={subHref}
                  onMouseEnter={() => onSubMouseEnter(expandedSectionData.name, sub.name)}
                  onMouseLeave={onSubMouseLeave}
                  className={`block px-4 py-2 text-sm transition cursor-pointer hover:bg-slate-100 hover:text-[#0b4f82] ${isActive || isHovered
                    ? "text-[#0b4f82] font-semibold bg-slate-100"
                    : "text-slate-600"
                    }`}
                >
                  {formatText(sub.name)}
                </Link>
              );
            })}
          </div>
        </aside>
      )}

      {/* Supplier Flyout Panel (Right) - Opens when hovering subcategory, positioned beside subcategory */}
      {hoveredSubCategory && (
        <div
          className="absolute left-[560px] top-0 flex flex-col w-[650px] min-w-[650px] border border-[#0b4f82] bg-white shadow-xl rounded-r-lg z-10 overflow-hidden"
          style={{ height: subCategoryHeight ? `${subCategoryHeight}px` : 'auto' }}
          onMouseEnter={onFlyoutMouseEnter}
          onMouseLeave={onFlyoutMouseLeave}
        >
          <div className="px-4 py-3 border-b border-slate-200 bg-[#0b4f82]">
            <h3 className="text-sm font-semibold text-white">
              {formatText(hoveredSubCategory.sub)}
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {loadingFlyout ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0b4f82]"></div>
              </div>
            ) : flyoutSuppliers.length === 0 ? (
              <div className="text-slate-500 text-sm">No suppliers found in this category.</div>
            ) : (
              <div className="flex gap-4">
                {/* Supplier Grid */}
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-4">
                    {flyoutSuppliers.map((supplier) => (
                      <Link
                        key={supplier.id}
                        href={`/suppliers/${supplier.id}?category=${encodeURIComponent(hoveredSubCategory.category)}&subCategory=${encodeURIComponent(hoveredSubCategory.sub)}`}
                        className="group flex flex-col rounded-lg border border-[#0b4f82] overflow-hidden hover:shadow-md transition bg-white"
                      >
                        <div className="relative h-20 w-full bg-white">
                          {supplier.profileImage ? (
                            <img
                              src={getAzureSignedUrl(supplier.profileImage)}
                              alt={supplier.companyName || supplier.name}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-300">
                              <span className="text-xl font-bold">{(supplier.companyName || supplier.name || "S").charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <div className="p-2 text-center bg-white border-t border-slate-100">
                          <span className="text-xs font-semibold text-[#0b4f82] line-clamp-2 leading-tight block">
                            {supplier.companyName || supplier.name}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Inquiry Container */}
                <div className="w-[180px] flex-shrink-0 border-l border-slate-200 pl-4">
                  <div className="bg-slate-50 rounded-lg p-3 space-y-3">
                    <h4 className="text-xs font-semibold text-[#0b4f82] uppercase tracking-wide text-center">Quick Inquiry</h4>
                    <textarea
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Have a question? Drop it here…"
                      className="w-full h-20 px-2 py-2 text-xs border border-slate-200 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-[#0b4f82] focus:border-[#0b4f82]"
                    />
                    <a
                      href={`https://wa.me/971564332583?text=${encodeURIComponent(inquiryMessage || `Hi, I'm interested in ${hoveredSubCategory.sub}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-[#25D366] text-white text-xs font-semibold rounded-md hover:bg-[#1da851] transition"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:sales@pakmon.com?subject=Inquiry about ${encodeURIComponent(hoveredSubCategory.sub)}&body=${encodeURIComponent(inquiryMessage || `Hi, I'm interested in ${hoveredSubCategory.sub}`)}`}
                      className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-[#0b4f82] text-white text-xs font-semibold rounded-md hover:bg-[#0a3d6b] transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
