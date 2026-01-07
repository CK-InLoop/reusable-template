"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatText } from "@/lib/text";
import HeaderNav from "./HeaderNav";
import CollapsibleSidebar from "./CollapsibleSidebar";

type SiteLayoutClientProps = {
    children: React.ReactNode;
    activePath: string;
    companyName: string;
    heroTagline: string;
    logoUrl: string;
    menuItems: { label: string; href: string }[];
    brochureLinks: { label: string; href: string }[];
};

export default function SiteLayoutClient({
    children,
    activePath,
    companyName,
    heroTagline,
    logoUrl,
    menuItems,
    brochureLinks,
}: SiteLayoutClientProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Lock body scroll when sidebar is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isSidebarOpen]);

    // Close sidebar on path change
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [activePath]);

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
            />

            <main className="relative mx-auto max-w-6xl px-4 pb-8 lg:pb-12">
                {children}

                {!isHomePage && isSidebarOpen && (
                    <div className="absolute left-4 top-0 z-50 w-[280px] min-h-[600px] bg-white border border-[#e2e8f0] shadow-2xl rounded-lg">
                        <div className="p-4 border-b border-[#e2e8f0] bg-[#f8fafc] flex justify-between items-center lg:hidden">
                            <span className="font-bold text-[#0b4f82] uppercase tracking-wider">Categories</span>
                            <button onClick={() => toggleSidebar()} className="text-slate-400 hover:text-[#0b4f82]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <CollapsibleSidebar />
                    </div>
                )}
            </main>

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
