import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import SupplierInquiryPanel from "@/components/SupplierInquiryPanel";
import SupplierName from "@/components/SupplierName";
import SupplierWhatsAppLink from "@/components/SupplierWhatsAppLink";
import { getAppUrl } from "@/lib/app-url";
import { getAzureSignedUrl } from "@/lib/azure";
import { db } from "@/lib/db";
import { formatText } from "@/lib/text";

export const dynamic = "force-dynamic";

type SuppliersPageProps = {
  searchParams: Promise<{
    category?: string;
    subCategory?: string;
  }>;
};

function ProductPlaceholder() {
  return (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16 8.6 11.4a2 2 0 0 1 2.8 0L16 16m-2-2 1.6-1.6a2 2 0 0 1 2.8 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

export default async function SuppliersPage({ searchParams }: SuppliersPageProps) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category;
  const subCategory = resolvedParams?.subCategory;
  const [suppliers, whatsapp] = await Promise.all([
    db.getSuppliers({ category, subCategory }),
    db.getWhatsAppContact(),
  ]);
  const products = await db.getProductsBySupplierIds(
    suppliers.map((supplier: any) => supplier.id),
  );
  const featuredProducts = products.slice(0, 6);
  const baseUrl = getAppUrl();
  const heading = formatText(subCategory || category || "Suppliers");

  return (
    <SiteLayout activePath="/products">
      <section className="-mx-4 min-h-[520px] bg-slate-100 px-4 pb-10 lg:pb-14">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-0">
          <div className="pt-5 lg:pt-0">
            <CollapsibleSidebar />
          </div>

          <section className="overflow-hidden rounded-xl border border-[#0b4f82] bg-white shadow-lg shadow-slate-200/70 lg:mt-0 lg:rounded-l-none" aria-labelledby="supplier-results-heading">
            <header className="bg-[#0b4f82] px-5 py-4 sm:px-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200">
                Suppliers & Products
              </p>
              <h1 id="supplier-results-heading" className="mt-1 text-lg font-bold text-white sm:text-xl">
                {heading}
              </h1>
            </header>

            {suppliers.length === 0 ? (
              <div className="p-8 text-center sm:p-12">
                <p className="text-base font-semibold text-slate-800">No suppliers found in this category.</p>
                <Link href="/products" className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0b4f82] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#083d66] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4f82] focus-visible:ring-offset-2">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_210px]">
                <div className="p-5 sm:p-6">
                  <section aria-labelledby="suppliers-heading">
                    <div className="flex items-center justify-between gap-4">
                      <h2 id="suppliers-heading" className="text-sm font-bold uppercase tracking-wide text-[#0b4f82]">
                        Suppliers
                      </h2>
                      <span className="text-xs font-medium text-slate-500">
                        {suppliers.length} {suppliers.length === 1 ? "supplier" : "suppliers"}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {suppliers.map((supplier: any) => {
                        const supplierName = formatText(supplier.companyName || supplier.name || "Supplier");
                        const supplierHref = `/suppliers/${encodeURIComponent(supplier.id)}?category=${encodeURIComponent(category ?? "")}&subCategory=${encodeURIComponent(subCategory ?? "")}`;
                        const supplierProducts = products.filter((product: any) => product.supplierId === supplier.id);

                        return (
                          <article key={supplier.id} className="group relative flex flex-col rounded-lg border border-[#0b4f82] bg-white transition hover:shadow-md motion-reduce:transition-none">
                            <Link href={supplierHref} className="relative block h-24 overflow-hidden rounded-t-[7px] bg-white sm:h-28">
                              {supplier.profileImage ? (
                                <img src={getAzureSignedUrl(supplier.profileImage)} alt={supplierName} className="h-full w-full object-contain p-3" />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-2xl font-bold text-slate-300">
                                  {supplierName.charAt(0)}
                                </div>
                              )}
                            </Link>
                            <SupplierWhatsAppLink
                              whatsappDigits={whatsapp.digits}
                              supplier={supplier}
                              products={supplierProducts}
                              baseUrl={baseUrl}
                              className="absolute right-1.5 top-1.5 z-10"
                            />
                            <div className="rounded-b-[7px] border-t border-slate-100 p-2 text-center">
                              <SupplierName name={supplierName} href={supplierHref} />
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </section>

                  {featuredProducts.length > 0 && (
                    <section className="mt-8 border-t border-slate-200 pt-6" aria-labelledby="featured-products-heading">
                      <div className="flex items-center justify-between gap-4">
                        <h2 id="featured-products-heading" className="text-sm font-bold uppercase tracking-wide text-[#0b4f82]">
                          Featured Products
                        </h2>
                        <Link href="/products" className="text-xs font-bold text-[#0b4f82] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4f82] focus-visible:ring-offset-2">
                          View All
                        </Link>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {featuredProducts.map((product: any) => {
                          const mainImage = Array.isArray(product.images)
                            ? product.images[0]
                            : typeof product.images === "string"
                              ? product.images
                              : null;
                          const productName = formatText(product.title || product.name || "Product");

                          return (
                            <Link key={product.id} href={`/suppliers/${product.supplierId}/products/${product.id}`} className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-[#0b4f82] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4f82] focus-visible:ring-offset-2 motion-reduce:transition-none">
                              <div className="flex h-28 items-center justify-center bg-white p-3 text-slate-300 sm:h-32">
                                {mainImage ? (
                                  <img src={getAzureSignedUrl(mainImage)} alt={productName} className="h-full w-full object-contain" />
                                ) : (
                                  <ProductPlaceholder />
                                )}
                              </div>
                              <div className="border-t border-slate-100 p-3">
                                <p className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-slate-800 group-hover:text-[#0b4f82]">
                                  {productName}
                                </p>
                                {product.priceRange && (
                                  <p className="mt-1 text-[11px] font-bold text-amber-600">{product.priceRange}</p>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </section>
                  )}
                </div>

                <div className="border-t border-slate-200 p-5 xl:border-l xl:border-t-0">
                  <SupplierInquiryPanel whatsappDigits={whatsapp.digits} subCategory={subCategory} />
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </SiteLayout>
  );
}
