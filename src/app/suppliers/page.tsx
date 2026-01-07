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
          <section className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm lg:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              Supplier Directory
            </p>
            <h1 className="mt-2 text-2xl font-bold text-[#0b4f82] md:text-3xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-[#64748b] md:text-base">
              Browse suppliers and their available products.
            </p>
          </section>

          {suppliers.length === 0 ? (
            <section className="rounded-lg border border-[#e2e8f0] bg-white p-6 text-sm text-[#64748b] shadow-sm">
              No suppliers found for this category.
            </section>
          ) : (
            <div className="grid gap-6">
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

                return (
                  <article
                    key={supplier.id}
                    className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm transition hover:border-[#0b4f82] hover:shadow-md"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-[#171717]">
                          {formatText(supplierName)}
                        </h2>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
                          {supplier.category && (
                            <span className="rounded-full bg-[#0b4f82]/10 px-3 py-1 text-[#0b4f82]">
                              {formatText(supplier.category)}
                            </span>
                          )}
                          {supplier.subCategory && (
                            <span className="rounded-full bg-[#ffb400]/15 px-3 py-1 text-[#0b4f82]">
                              {formatText(supplier.subCategory)}
                            </span>
                          )}
                        </div>
                        <div className="mt-3 space-y-1 text-sm text-[#64748b]">
                          {supplier.email && <p>{supplier.email}</p>}
                          {supplier.phone && <p>{supplier.phone}</p>}
                          {supplier.address && (
                            <p className="line-clamp-2">{supplier.address}</p>
                          )}
                        </div>
                      </div>

                      <Link
                        href={href}
                        className="inline-flex items-center justify-center rounded-md bg-[#0b4f82] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b4f82]/90"
                      >
                        View Supplier
                      </Link>
                    </div>

                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                        Products
                      </p>
                      {supplierProducts.length === 0 ? (
                        <p className="mt-2 text-sm text-[#64748b]">
                          No products added yet.
                        </p>
                      ) : (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {supplierProducts.slice(0, 12).map((product: any) => (
                            <span
                              key={product.id}
                              className="rounded-md border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-xs font-semibold text-[#171717]"
                            >
                              {formatText(product.title || product.name || "Product")}
                            </span>
                          ))}
                        </div>
                      )}
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
