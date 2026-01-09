import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import SearchInput from "@/components/SearchInput"; // Added export
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
    q?: string; // Added q param
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
  const searchTerm = resolvedSearchParams?.q; // Read q param

  const supplier = await db.getSupplierById(supplierId);
  if (!supplier) {
    notFound();
  }

  // Pass search term to db
  const products = await db.getProductsBySupplierId(supplierId, { search: searchTerm });

  const backHref = `/suppliers?category=${encodeURIComponent(
    category ?? ""
  )}&subCategory=${encodeURIComponent(subCategory ?? "")}`;

  return (
    <SiteLayout activePath="/products">
      {/* ... Supplier Card Section - Simplified with Inquiry Container ... */}
      <section className="mt-8 rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Profile Image */}
          <div className="relative h-28 w-48 flex-shrink-0 overflow-hidden rounded-lg bg-white border border-slate-100 shadow-sm">
            {(supplier as any).profileImage ? (
              <img
                src={getAzureSignedUrl((supplier as any).profileImage)}
                alt={formatText(
                  (supplier as any).companyName ||
                  (supplier as any).name ||
                  "Supplier"
                )}
                className="h-full w-full object-contain"
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

          {/* Right Column: Name on top, Text Field + Buttons below */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Supplier Name */}
            <h1 className="text-xl font-bold tracking-tight text-[#0b4f82]">
              {formatText(
                (supplier as any).companyName ||
                (supplier as any).name ||
                "Supplier"
              )}
            </h1>

            {/* Text Field + Buttons Row */}
            <div className="flex items-center gap-3">
              <textarea
                id="inquiry-message"
                placeholder="Have a question? Drop it here…"
                className="w-64 h-10 px-3 py-2 text-sm border border-slate-200 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-[#0b4f82] focus:border-[#0b4f82]"
              />
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/971564332583?text=${encodeURIComponent(`Hi, I'm interested in products from ${(supplier as any).companyName || (supplier as any).name || 'your company'}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-md hover:bg-[#1da851] transition whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get Quote on WhatsApp
              </a>
              {/* Email Button */}
              <a
                href={`mailto:sales@pakmon.com?subject=Inquiry about ${encodeURIComponent((supplier as any).companyName || (supplier as any).name || 'your company')}&body=${encodeURIComponent(`Hi, I'm interested in products from ${(supplier as any).companyName || (supplier as any).name || 'your company'}`)}`}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0b4f82] text-white text-sm font-semibold rounded-md hover:bg-[#0a3d6b] transition whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
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
          <div className="w-full md:w-72">
            <SearchInput placeholder="Search products..." />
          </div>
        </div>

        {(products as any[]).length === 0 ? (
          <section className="mt-8 rounded-lg border border-[#e2e8f0] bg-white p-6 text-sm text-[#64748b] shadow-sm">
            {searchTerm ? "No products found matching your search." : "This supplier has not added products yet."}
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
