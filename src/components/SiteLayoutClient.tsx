"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { formatText } from "@/lib/text";
import HeaderNav from "./HeaderNav";
import ProductSidebarClient from "./ProductSidebarClient";
import { SidebarSkeleton } from "./Skeletons";

type SubCategoryItem = { name: string; isHeading?: boolean };

type SiteLayoutClientProps = {
    children: React.ReactNode;
    activePath: string;
    companyName: string;
    heroTagline: string;
    logoUrl: string;
    menuItems: { label: string; href: string }[];
    brochureLinks: { label: string; href: string }[];
    sidebarSections: { name: string; subCategories: SubCategoryItem[] }[];
};

export default function SiteLayoutClient({
    children,
    activePath,
    companyName,
    heroTagline,
    logoUrl,
    menuItems,
    brochureLinks,
    sidebarSections,
}: SiteLayoutClientProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isFabSidebarOpen, setIsFabSidebarOpen] = useState(false);
    const fabSidebarRef = useRef<HTMLDivElement>(null);

    // Lock body scroll when sidebar is open
    useEffect(() => {
        if (isSidebarOpen || isFabSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isSidebarOpen, isFabSidebarOpen]);

    // Close sidebar on path change
    useEffect(() => {
        setIsSidebarOpen(false);
        setIsFabSidebarOpen(false);
    }, [activePath]);

    // Close FAB sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                fabSidebarRef.current &&
                !fabSidebarRef.current.contains(event.target as Node) &&
                isFabSidebarOpen
            ) {
                setIsFabSidebarOpen(false);
            }
        };

        if (isFabSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isFabSidebarOpen]);

    // Handle escape key for FAB sidebar
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isFabSidebarOpen) {
                setIsFabSidebarOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isFabSidebarOpen]);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const isHomePage = activePath === "/";

    return (
        <div className="relative min-h-screen bg-white text-[#171717]">
            {/* Top Service Bar */}
            <div className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-sm text-[#64748b]">
                    <span className="hidden sm:inline">
                        {formatText(
                            "Process Equipments Design,Manufacture Installations and Commissioning"
                        )}
                    </span>
                    <a
                        href="tel:+971564332583"
                        className="flex items-center gap-2 font-semibold text-[#0b4f82] hover:text-[#ffb400] transition-colors"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                        +971 56 433 2583
                    </a>
                </div>
            </div>

            <HeaderNav
                companyName={companyName}
                logoUrl={logoUrl}
                menuItems={menuItems}
                brochureLinks={brochureLinks}
                activePath={activePath}
                onToggleSidebar={toggleSidebar}
                categorySections={sidebarSections}
            />

            <main className="relative mx-auto max-w-6xl px-4 pb-8 lg:pb-12">
                {children}

                {!isHomePage && isSidebarOpen && (
                    <>
                        {/* Backdrop - Click to close */}
                        <div
                            className="fixed inset-0 z-40 bg-black/20"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                        {/* Sidebar Panel */}
                        <div className="absolute left-4 top-0 z-50 w-[280px] h-fit overflow-visible">
                            <Suspense fallback={<div className="bg-white rounded-lg shadow-lg border border-[#e2e8f0] overflow-hidden"><SidebarSkeleton /></div>}>
                                <ProductSidebarClient sections={sidebarSections} />
                            </Suspense>
                        </div>
                    </>
                )}
            </main>

            {/* Mobile FAB Button - Shows on all pages */}
            {isFabSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setIsFabSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            <button
                onClick={() => setIsFabSidebarOpen(!isFabSidebarOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#0b4f82] text-white shadow-lg hover:bg-[#0a3d6b] transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={isFabSidebarOpen ? "Close sidebar" : "Open product categories"}
                aria-expanded={isFabSidebarOpen}
            >
                {isFabSidebarOpen ? (
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        className="h-6 w-6"
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
                )}
            </button>

            {/* Mobile FAB Sidebar - Collapsible overlay */}
            <aside
                ref={fabSidebarRef}
                className={`lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isFabSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                aria-hidden={!isFabSidebarOpen}
                role="complementary"
                aria-label="Product categories"
            >
                <div className="h-full overflow-y-auto p-4">
                    <Suspense fallback={<SidebarSkeleton />}>
                        <ProductSidebarClient sections={sidebarSections} isMobile={true} />
                    </Suspense>
                </div>
            </aside>

            <footer className="border-t border-[#e2e8f0] bg-[#f8fafc] py-12">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="flex flex-col gap-8 text-sm text-[#64748b] md:flex-row md:items-start md:justify-between">
                        <div className="max-w-xl space-y-4">
                            <p className="text-lg font-semibold text-[#171717]">
                                {companyName}
                            </p>
                            <p className="text-sm leading-relaxed text-[#64748b]">
                                {heroTagline}
                            </p>
                            <p className="text-sm font-medium text-[#0b4f82]">
                                Phone: +971 56 433 2583
                            </p>
                        </div>
                        <div className="grid gap-3 text-xs uppercase tracking-wider text-[#64748b] sm:grid-cols-3">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="rounded-md border border-[#e2e8f0] px-4 py-2 text-center transition hover:border-[#0b4f82] hover:text-[#0b4f82]"
                                >
                                    {formatText(item.label)}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="mt-10 h-px bg-gradient-to-r from-transparent via-[#e2e8f0] to-transparent" />
                    <p className="mt-6 text-xs uppercase tracking-wider text-[#64748b]">
                        © {new Date().getFullYear()} {companyName}. All rights reserved.
                    </p>
                </div>
            </footer>


        </div>
    );
}
