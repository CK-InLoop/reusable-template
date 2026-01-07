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
      <section className="mt-8 rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Profile Image - Compact */}
          <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-[#f8fafc] border border-slate-100 shadow-sm">
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
                  className="h-12 w-12"
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

          {/* Supplier Info */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#0b4f82]">
                  {formatText(
                    (supplier as any).companyName ||
                    (supplier as any).name ||
                    "Supplier"
                  )}
                </h1>
                <div className="mt-1 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
                  {(supplier as any).category && (
                    <span className="rounded-md bg-[#0b4f82]/10 px-2 py-0.5 text-[#0b4f82]">
                      {formatText((supplier as any).category)}
                    </span>
                  )}
                  {(supplier as any).subCategory && (
                    <span className="rounded-md bg-[#ffb400]/15 px-2 py-0.5 text-[#0b4f82]">
                      {formatText((supplier as any).subCategory)}
                    </span>
                  )}
                </div>
              </div>

              <Link
                href={backHref}
                className="text-sm font-medium text-[#64748b] transition hover:text-[#0b4f82]"
              >
                &larr; Back to suppliers
              </Link>
            </div>

            {(supplier as any).description && (
              <p className="max-w-4xl text-sm leading-relaxed text-[#64748b] line-clamp-3">
                {(supplier as any).description}
              </p>
            )}

            <div className="grid max-w-2xl gap-x-8 gap-y-1 text-sm text-[#64748b] sm:grid-cols-2">
              {(supplier as any).email && (
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{(supplier as any).email}</span>
                </div>
              )}
              {(supplier as any).phone && (
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{(supplier as any).phone}</span>
                </div>
              )}
              {(supplier as any).address && (
                <div className="col-span-full flex items-start gap-2 pt-1 sm:col-span-2">
                  <svg className="h-4 w-4 mt-0.5 opacity-70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="line-clamp-1">{(supplier as any).address}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-3">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-md bg-[#0b4f82] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0b4f82]/90"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-[#e2e8f0] px-4 py-2 text-sm font-semibold text-[#0b4f82] transition hover:border-[#0b4f82] hover:bg-[#0b4f82]/5"
              >
                Request Catalog
              </Link>
            </div>
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
              <Link
                key={product.id}
                href={`/suppliers/${supplierId}/products/${product.id}`}
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
                    View Details <span aria-hidden="true">›</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
