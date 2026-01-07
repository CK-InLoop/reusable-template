import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import { db } from "@/lib/db";
import { formatText } from "@/lib/text";
import { getAzureSignedUrl } from "@/lib/azure";

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

          <div className="relative h-72 overflow-hidden rounded-lg bg-[#f8fafc] shadow-sm sm:h-80">
            {(supplier as any).profileImage ? (
              <img
                src={getAzureSignedUrl((supplier as any).profileImage)}
                alt={formatText(
                  (supplier as any).companyName ||
                  (supplier as any).name ||
                  "Supplier"
                )}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[#94a3b8]">
                <svg
                  className="h-24 w-24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            )}
          </div>
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
                <div className="relative h-48 overflow-hidden bg-[#f8fafc]">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={getAzureSignedUrl(product.images[0])}
                      alt={formatText(product.title || product.name || "Product")}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#94a3b8]">
                      <svg
                        className="h-12 w-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
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
