import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import { getHomePage, getPageByUrl } from "@/lib/details";
import { formatText } from "@/lib/text";
import { getImagePath } from "@/lib/images";
import { db } from "@/lib/db";
import { getAzureSignedUrl } from "@/lib/azure";

export const dynamic = "force-dynamic";

const homePage = getHomePage();

const accessoryHighlights = homePage.text_blocks
  .filter((text) => text.includes("Fabrication") || text.includes("CIP"))
  .slice(0, 6);

export default async function AccessoriesPage() {
  const products = await db.getAllProducts();

  return (
    <SiteLayout activePath="/accessories">
      {/* Hero Card - Keep this as is */}
      <section className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm lg:p-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
          Accessories & Fabrications
        </span>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="space-y-6 text-base leading-relaxed text-[#171717]">
            <h1 className="text-3xl font-bold tracking-tight text-[#0b4f82] md:text-4xl">
              Custom stainless-steel fabrications built for long-term service.
            </h1>
            <p className="text-[#64748b]">
              {formatText(
                homePage.text_blocks.find((text) =>
                  text.startsWith("SS Tanks, Storage Vessels")
                ) ??
                "From CIP skids to blending system components, we design and manufacture precision accessories for your process lines."
              )}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {accessoryHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 text-sm font-semibold text-[#171717] transition hover:border-[#0b4f82] hover:bg-white hover:shadow-sm"
                >
                  {formatText(item)}
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-72 overflow-hidden rounded-lg bg-[#f8fafc] shadow-sm sm:h-80">
            <Image
              src={getImagePath(homePage.image_urls[5])}
              alt="Accessory Fabrication"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Products Section - Replaces Fabrication Showcase */}
      <section className="mt-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              Products
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#0b4f82] md:text-3xl">
              {(products as any[]).length} item{(products as any[]).length === 1 ? "" : "s"} available
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#64748b] md:text-base">
              Browse our complete product catalog from all suppliers.
            </p>
          </div>
        </div>

        {(products as any[]).length === 0 ? (
          <section className="mt-8 rounded-lg border border-[#e2e8f0] bg-white p-6 text-sm text-[#64748b] shadow-sm">
            No products found.
          </section>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(products as any[]).map((product: any) => (
              <Link
                key={product.id}
                href={`/suppliers/${product.supplierId}/products/${product.id}`}
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
