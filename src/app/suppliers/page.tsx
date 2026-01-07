import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import { db } from "@/lib/db";
import { formatText } from "@/lib/text";

export const dynamic = "force-dynamic";

type SuppliersPageProps = {
  searchParams: Promise<{
    category?: string;
    subCategory?: string;
  }>;
};

export default async function SuppliersPage({ searchParams }: SuppliersPageProps) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category;
  const subCategory = resolvedParams?.subCategory;

  const suppliers = await db.getSuppliers({ category, subCategory });
  const supplierIds = suppliers.map((supplier: any) => supplier.id);
  const products = await db.getProductsBySupplierIds(supplierIds);

  const productsBySupplier = new Map<string, any[]>();
  for (const product of products as any[]) {
    const key = String(product.supplierId ?? "");
    if (!key) continue;
    const existing = productsBySupplier.get(key);
    if (existing) {
      existing.push(product);
    } else {
      productsBySupplier.set(key, [product]);
    }
  }

  const title = category
    ? `${formatText(category)} / ${formatText(subCategory ?? "All")}`
    : "Suppliers";

  return (
    <SiteLayout activePath="/products">
      <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <CollapsibleSidebar />

        <div className="space-y-6">

          {suppliers.length === 0 ? (
            <section className="rounded-lg border border-[#e2e8f0] bg-white p-6 text-sm text-[#64748b] shadow-sm">
              No suppliers found for this category.
            </section>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {suppliers.map((supplier: any) => {
                const supplierName =
                  supplier.companyName || supplier.name || "Supplier";

                const href = `/suppliers/${encodeURIComponent(
                  supplier.id
                )}?category=${encodeURIComponent(
                  category ?? ""
                )}&subCategory=${encodeURIComponent(subCategory ?? "")}`;

                const supplierProducts =
                  productsBySupplier.get(String(supplier.id)) ?? [];
                const productsCount = supplierProducts.length;
                const status = String(supplier.status ?? "");

                return (
                  <article
                    key={supplier.id}
                    className="flex flex-col overflow-hidden rounded-lg border border-[#e2e8f0] bg-white shadow-sm transition hover:border-[#0b4f82] hover:shadow-md"
                  >
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="rounded-lg bg-[#0b4f82]/10 p-3 text-[#0b4f82]">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7h8M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"
                            />
                          </svg>
                        </div>

                        {status && (
                          <span
                            className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider ${status === "APPROVED"
                              ? "bg-green-100 text-green-700"
                              : "bg-[#ffb400]/15 text-[#0b4f82]"
                              }`}
                          >
                            {formatText(status)}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-5 text-xl font-bold text-[#171717]">
                        {formatText(supplierName)}
                      </h2>

                      {(supplier.category || supplier.subCategory) && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {supplier.category && (
                            <span className="inline-flex items-center rounded-full border border-[#0b4f82]/20 bg-[#0b4f82]/10 px-4 py-1 text-xs font-semibold text-[#0b4f82]">
                              {formatText(supplier.category)}
                            </span>
                          )}
                          {supplier.subCategory && (
                            <span className="inline-flex items-center rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-4 py-1 text-xs font-semibold text-[#0b4f82]">
                              {formatText(supplier.subCategory)}
                            </span>
                          )}
                        </div>
                      )}

                      {supplier.companyName && supplier.name && (
                        <p className="mt-4 text-sm text-[#64748b]">
                          {formatText(supplier.name)}
                        </p>
                      )}

                      <div className="mt-5 space-y-3 text-sm text-[#64748b]">
                        {supplier.email && (
                          <div className="flex items-center gap-3">
                            <svg
                              className="h-5 w-5 flex-shrink-0 text-[#94a3b8]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 0a2 2 0 012-2h14a2 2 0 012 2m-18 0v10a2 2 0 002 2h14a2 2 0 002-2V8"
                              />
                            </svg>
                            <span className="truncate">{supplier.email}</span>
                          </div>
                        )}

                        {supplier.phone && (
                          <div className="flex items-center gap-3">
                            <svg
                              className="h-5 w-5 flex-shrink-0 text-[#94a3b8]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-1.5.75a11.042 11.042 0 005.516 5.516l.75-1.5a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            <span>{supplier.phone}</span>
                          </div>
                        )}

                        {supplier.address && (
                          <div className="flex items-start gap-3">
                            <svg
                              className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#94a3b8]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 11a3 3 0 100-6 3 3 0 000 6z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19.5 10.5c0 7-7.5 11-7.5 11s-7.5-4-7.5-11a7.5 7.5 0 1115 0z"
                              />
                            </svg>
                            <span className="line-clamp-2">{supplier.address}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#e2e8f0] px-6 py-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#171717]">
                        <svg
                          className="h-5 w-5 text-[#94a3b8]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10m0 0l-8-4V7"
                          />
                        </svg>
                        <span>
                          {productsCount} Product{productsCount === 1 ? "" : "s"}
                        </span>
                      </div>

                      <Link
                        href={href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b4f82] transition hover:text-[#0b4f82]/90"
                      >
                        View Supplier
                        <span aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
