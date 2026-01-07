import Link from "next/link";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
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
      <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <CollapsibleSidebar />

        <div className="space-y-8">
          <section className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Supplier
                </p>
                <h1 className="mt-2 text-2xl font-bold text-[#0b4f82] md:text-3xl">
                  {formatText(
                    (supplier as any).companyName ||
                      (supplier as any).name ||
                      "Supplier"
                  )}
                </h1>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
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
                <div className="mt-4 space-y-1 text-sm text-[#64748b]">
                  {(supplier as any).email && <p>{(supplier as any).email}</p>}
                  {(supplier as any).phone && <p>{(supplier as any).phone}</p>}
                  {(supplier as any).address && (
                    <p className="line-clamp-2">{(supplier as any).address}</p>
                  )}
                </div>
              </div>

              <Link
                href={backHref}
                className="inline-flex items-center justify-center rounded-md border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#0b4f82] transition hover:border-[#0b4f82] hover:bg-[#0b4f82]/5"
              >
                Back to suppliers
              </Link>
            </div>
          </section>

          <section className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm lg:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              Products
            </p>
            <h2 className="mt-2 text-xl font-bold text-[#0b4f82] md:text-2xl">
              {(products as any[]).length} item{(products as any[]).length === 1 ? "" : "s"}
            </h2>

            {(products as any[]).length === 0 ? (
              <p className="mt-4 text-sm text-[#64748b]">
                This supplier has not added products yet.
              </p>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(products as any[]).map((product: any) => (
                  <article
                    key={product.id}
                    className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-5 shadow-sm transition hover:border-[#0b4f82] hover:bg-white"
                  >
                    <p className="text-base font-semibold text-[#171717]">
                      {formatText(product.title || product.name || "Product")}
                    </p>
                    {product.shortDescription && (
                      <p className="mt-2 text-sm text-[#64748b] line-clamp-3">
                        {formatText(product.shortDescription)}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
                      {product.category && (
                        <span className="rounded-full bg-white px-3 py-1 text-[#0b4f82] border border-[#e2e8f0]">
                          {formatText(product.category)}
                        </span>
                      )}
                      {product.priceRange && (
                        <span className="rounded-full bg-white px-3 py-1 text-[#171717] border border-[#e2e8f0]">
                          {formatText(product.priceRange)}
                        </span>
                      )}
                      {product.capacity && (
                        <span className="rounded-full bg-white px-3 py-1 text-[#171717] border border-[#e2e8f0]">
                          {formatText(product.capacity)}
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </SiteLayout>
  );
}
