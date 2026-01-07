import Link from "next/link";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import { db } from "@/lib/db";
import { formatText } from "@/lib/text";

export const dynamic = "force-dynamic";

type SupplierPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    category?: string;
    subCategory?: string;
  }>;
};

export default async function SupplierPage({
  params,
  searchParams,
}: SupplierPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const supplierId = resolvedParams.id;
  const category = resolvedSearchParams?.category;
  const subCategory = resolvedSearchParams?.subCategory;

  const supplier = await db.getSupplierById(supplierId);
  if (!supplier) {
    notFound();
  }

  const products = await db.getProductsBySupplierId(supplierId);

  const backHref = `/suppliers?category=${encodeURIComponent(
    category ?? ""
  )}&subCategory=${encodeURIComponent(subCategory ?? "")}`;

  return (
    <SiteLayout activePath="/products">
      <section className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm lg:p-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
          Supplier
        </span>

        <div className="mt-1 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="space-y-4 text-base leading-relaxed text-[#171717]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-[#0b4f82] md:text-4xl">
                {formatText(
                  (supplier as any).companyName ||
                  (supplier as any).name ||
                  "Supplier"
                )}
              </h1>

              <Link
                href={backHref}
                className="inline-flex items-center justify-center rounded-md border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#0b4f82] transition hover:border-[#0b4f82] hover:bg-[#0b4f82]/5"
              >
                Back to suppliers
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
              {(supplier as any).category && (
                <span className="rounded-full bg-[#0b4f82]/10 px-3 py-1 text-[#0b4f82]">
                  {formatText((supplier as any).category)}
                </span>
              )}
              {(supplier as any).subCategory && (
                <span className="rounded-full bg-[#ffb400]/15 px-3 py-1 text-[#0b4f82]">
                  {formatText((supplier as any).subCategory)}
                </span>
              )}
            </div>

            <div className="space-y-1 text-sm text-[#64748b]">
              {(supplier as any).email && <p>{(supplier as any).email}</p>}
              {(supplier as any).phone && <p>{(supplier as any).phone}</p>}
              {(supplier as any).address && (
                <p className="line-clamp-2">{(supplier as any).address}</p>
              )}
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0b4f82] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#0b4f82]/90"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#e2e8f0] px-6 py-3 text-sm font-semibold text-[#0b4f82] transition hover:border-[#0b4f82] hover:bg-[#0b4f82]/5"
              >
                Request Catalog
              </Link>
            </div>
          </div>

          <div className="relative h-72 overflow-hidden rounded-lg bg-[#f8fafc] shadow-sm sm:h-80" />
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              Products
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#0b4f82] md:text-3xl">
              {(products as any[]).length} item{(products as any[]).length === 1 ? "" : "s"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#64748b] md:text-base">
              Browse all products added by this supplier.
            </p>
          </div>
        </div>

        {(products as any[]).length === 0 ? (
          <section className="mt-8 rounded-lg border border-[#e2e8f0] bg-white p-6 text-sm text-[#64748b] shadow-sm">
            This supplier has not added products yet.
          </section>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(products as any[]).map((product: any) => (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-lg border border-[#e2e8f0] bg-white shadow-sm transition hover:border-[#0b4f82] hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden bg-[#f8fafc]" />
                <div className="flex flex-1 flex-col px-5 py-4">
                  <h3 className="text-base font-semibold text-[#171717]">
                    {formatText(product.title || product.name || "Product")}
                  </h3>
                  {product.shortDescription && (
                    <p className="mt-2 text-sm text-[#64748b] line-clamp-3">
                      {formatText(product.shortDescription)}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    {product.category && (
                      <span className="rounded-md border border-[#e2e8f0] px-4 py-2">
                        {formatText(product.category)}
                      </span>
                    )}
                    {product.priceRange && (
                      <span className="rounded-md border border-[#e2e8f0] px-4 py-2">
                        {formatText(product.priceRange)}
                      </span>
                    )}
                    {product.capacity && (
                      <span className="rounded-md border border-[#e2e8f0] px-4 py-2">
                        {formatText(product.capacity)}
                      </span>
                    )}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b4f82]">
                    Learn More <span aria-hidden="true">›</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
