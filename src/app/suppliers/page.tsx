import Link from "next/link";
import Image from "next/image";
import SiteLayout from "@/components/SiteLayout";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import { db } from "@/lib/db";
import { formatText } from "@/lib/text";
import { getAzureSignedUrl } from "@/lib/azure";

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

  return (
    <SiteLayout activePath="/products">
      <section className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <CollapsibleSidebar />

        <div className="space-y-6 pt-6">
          {suppliers.length === 0 ? (
            <section className="rounded-lg border border-[#e2e8f0] bg-white p-6 text-sm text-[#64748b] shadow-sm">
              No suppliers found for this category.
            </section>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {suppliers.map((supplier: any) => {
                const supplierName = supplier.companyName || supplier.name || "Supplier";
                const href = `/suppliers/${encodeURIComponent(supplier.id)}?category=${encodeURIComponent(category ?? "")}&subCategory=${encodeURIComponent(subCategory ?? "")}`;

                return (
                  <Link
                    key={supplier.id}
                    href={href}
                    className="group flex items-center justify-center rounded-lg border border-[#e2e8f0] bg-white p-4 transition hover:border-[#0b4f82] hover:shadow-md"
                  >
                    {supplier.profileImage ? (
                      <div className="relative h-20 w-full">
                        <Image
                          src={getAzureSignedUrl(supplier.profileImage)}
                          alt={formatText(supplierName)}
                          fill
                          className="object-contain transition group-hover:scale-105"
                          sizes="(min-width: 1024px) 200px, (min-width: 640px) 150px, 100px"
                        />
                      </div>
                    ) : (
                      <div className="flex h-20 w-full items-center justify-center">
                        <span className="text-sm font-semibold text-[#0b4f82] text-center">
                          {formatText(supplierName)}
                        </span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
