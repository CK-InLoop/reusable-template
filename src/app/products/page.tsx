import Link from "next/link";
import Image from "next/image";
import SiteLayout from "@/components/SiteLayout";
import SearchInput from "@/components/SearchInput";
import { db } from "@/lib/db";
import { formatText } from "@/lib/text";
import { getAzureSignedUrl } from "@/lib/azure";

export const dynamic = "force-dynamic";

type ProductsPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams?.q;

  const products = await db.getAllProducts({ search: searchTerm });

  return (
    <SiteLayout activePath="/products">
      <section className="bg-gray-50 pb-12 pt-8 w-[100vw] ml-[calc(50%-50vw)]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-[#0b4f82] md:text-4xl">
                Our Products
              </h1>
              <p className="max-w-3xl text-[#64748b]">
                Explore our comprehensive range of industrial equipment and solutions.
              </p>
            </div>
            <div className="w-full md:w-72">
              <SearchInput placeholder="Search all products..." />
            </div>
          </div>

          {products.length === 0 ? (
            <div className="rounded-lg border border-[#e2e8f0] bg-white p-6 text-sm text-[#64748b] shadow-sm">
              {searchTerm ? "No products found matching your search." : "No products found."}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product: any) => {
                const mainImage = Array.isArray(product.images)
                  ? product.images[0]
                  : (typeof product.images === 'string' ? product.images : null);

                return (
                  <article
                    key={product.id}
                    className="group flex flex-col overflow-hidden rounded-lg border border-[#e2e8f0] bg-white shadow-sm transition hover:border-[#0b4f82] hover:shadow-md"
                  >
                    <div className="relative h-48 overflow-hidden bg-[#f8fafc]">
                      {mainImage ? (
                        <Image
                          src={getAzureSignedUrl(mainImage)}
                          alt={formatText(product.name ?? "Product")}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400 text-sm">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-lg font-semibold text-[#171717] line-clamp-1" title={product.name}>
                        {formatText(product.name ?? "Unnamed Product")}
                      </h3>
                      <p className="mt-2 text-sm text-[#64748b] line-clamp-2 flex-1" title={product.description}>
                        {formatText(product.description || "No description available.")}
                      </p>

                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <Link
                          href={`/suppliers/${product.supplierId}`}
                          className="inline-flex items-center text-sm font-semibold text-[#0b4f82] hover:text-[#0a3d6b]"
                        >
                          View Supplier <span className="ml-1">→</span>
                        </Link>
                      </div>
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

