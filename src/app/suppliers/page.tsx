import Link from "next/link";
import Image from "next/image";
import SiteLayout from "@/components/SiteLayout";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import { db } from "@/lib/db";
import { formatText } from "@/lib/text";
import { getAzureSignedUrl } from "@/lib/azure";
import { getAppUrl } from "@/lib/app-url";
import SupplierWhatsAppLink from "@/components/SupplierWhatsAppLink";

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

  const [suppliers, whatsapp] = await Promise.all([
    db.getSuppliers({ category, subCategory }),
    db.getWhatsAppContact(),
  ]);
  const products = await db.getProductsBySupplierIds(
    suppliers.map((supplier: any) => supplier.id),
  );
  const baseUrl = getAppUrl();

  return (
    <SiteLayout activePath="/products">
      <section className="bg-gray-100 pb-8 w-[100vw] ml-[calc(50%-50vw)]">
        <div className="mx-auto max-w-6xl px-4 grid gap-10 lg:grid-cols-[280px_1fr]">
          <CollapsibleSidebar />

          <div className="space-y-6 pt-6 pl-4 lg:pl-6">
            {suppliers.length === 0 ? (
              <section className="rounded-lg border border-[#e2e8f0] bg-white p-6 text-sm text-[#64748b] shadow-sm">
                No suppliers found for this category.
              </section>
            ) : (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {suppliers.map((supplier: any) => {
                  const supplierName = supplier.companyName || supplier.name || "Supplier";
                  const href = `/suppliers/${encodeURIComponent(supplier.id)}?category=${encodeURIComponent(category ?? "")}&subCategory=${encodeURIComponent(subCategory ?? "")}`;

                  return (
                    <div
                      key={supplier.id}
                      className="group relative flex flex-col overflow-hidden rounded-lg border border-[#0b4f82] bg-white transition hover:shadow-md"
                    >
                      <Link href={href} aria-label={`View ${formatText(supplierName)}`}>
                        {supplier.profileImage ? (
                          <div className="relative h-32 w-full bg-slate-50">
                            <Image
                              src={getAzureSignedUrl(supplier.profileImage)}
                              alt={formatText(supplierName)}
                              fill
                              className="object-cover transition group-hover:scale-105"
                              sizes="(min-width: 1024px) 200px, (min-width: 640px) 150px, 100px"
                            />
                          </div>
                        ) : (
                          <div className="flex h-32 w-full items-center justify-center bg-slate-50">
                            <span className="text-2xl font-bold text-[#e2e8f0]">
                              {supplierName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </Link>
                      <SupplierWhatsAppLink
                        whatsappDigits={whatsapp.digits}
                        supplier={supplier}
                        products={products.filter((product: any) => product.supplierId === supplier.id)}
                        baseUrl={baseUrl}
                        className="absolute right-2 top-2 z-10"
                      />

                      {/* Supplier names remain hidden on this listing as previously requested. */}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
