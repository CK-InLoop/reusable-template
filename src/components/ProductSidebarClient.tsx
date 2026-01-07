"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { formatText } from "@/lib/text";

type ProductSidebarClientProps = {
  sections: { name: string; subCategories: string[] }[];
  variant?: "flyout" | "accordion";
};

export default function ProductSidebarClient({
  sections,
  variant = "accordion",
}: ProductSidebarClientProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeCategory = searchParams.get("category");
  const activeSubCategory = searchParams.get("subCategory");

  useEffect(() => {
    if (activeCategory && variant === "accordion") {
      setExpandedSection(activeCategory);
    }
  }, [activeCategory, variant]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, []);

  const toggleSection = (name: string) => {
    setExpandedSection((current) => (current === name ? null : name));
  };

  const onMouseEnter = (name: string) => {
    if (variant === "flyout") {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setExpandedSection(name);
    }
  };

  const onMouseLeave = () => {
    if (variant === "flyout") {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpandedSection(null);
      }, 150);
    }
  };

  const onSubMouseEnter = (href: string) => {
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = setTimeout(() => {
      router.push(href);
    }, 200);
  };

  const onSubMouseLeave = () => {
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
  };

  return (
    <aside className={`flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm h-full ${variant === "accordion" ? "overflow-hidden" : ""}`}>
      {/* Category list */}
      <div className="divide-y divide-slate-100 flex-1 overflow-y-auto">
        {sections.map((section) => {
          const isExpanded = expandedSection === section.name;

          return (
            <div
              key={section.name}
              className={`relative py-1 ${variant === "flyout" ? "group" : ""}`}
              onMouseEnter={() => onMouseEnter(section.name)}
              onMouseLeave={onMouseLeave}
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

                    const subHref = `/suppliers?category=${encodeURIComponent(section.name)}&subCategory=${encodeURIComponent(sub)}`;

                    return (
                      <Link
                        key={sub}
                        href={subHref}
                        onMouseEnter={() => onSubMouseEnter(subHref)}
                        onMouseLeave={onSubMouseLeave}
                        className={`block px-6 py-2 text-sm transition cursor-pointer hover:bg-slate-50 hover:text-[#0b4f82] ${isActive
                          ? "text-[#0b4f82] font-semibold bg-slate-50"
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
  );
}
