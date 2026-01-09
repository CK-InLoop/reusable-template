import Link from "next/link";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import ProductInquiry from "@/components/ProductInquiry";
import { db } from "@/lib/db";
import { formatText } from "@/lib/text";
import { getAzureSignedUrl } from "@/lib/azure";

export const dynamic = "force-dynamic";

type ProductPageProps = {
    params: Promise<{
        id: string;
        productId: string;
    }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
    const resolvedParams = await params;
    const supplierId = resolvedParams.id;
    const productId = resolvedParams.productId;

    const product = await db.getProductById(productId);
    if (!product) {
        notFound();
    }

    const supplier = await db.getSupplierById(supplierId);

    // Fetch similar products (same category or same supplier)
    const similarProducts = await db.getSimilarProducts(
        productId,
        product.category,
        supplierId,
        4
    );

    const backHref = `/suppliers/${supplierId}`;

    return (
        <SiteLayout activePath="/products">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-[#64748b]">
                <Link href="/suppliers" className="hover:text-[#0b4f82] transition">
                    Suppliers
                </Link>
                <span>›</span>
                {supplier && (
                    <>
                        <Link href={backHref} className="hover:text-[#0b4f82] transition">
                            {formatText((supplier as any).companyName || (supplier as any).name || "Supplier")}
                        </Link>
                        <span>›</span>
                    </>
                )}
                <span className="text-[#171717] font-medium">
                    {formatText(product.title || product.name || "Product")}
                </span>
            </nav>

            {/* Single Product Details Card */}
            <section className="rounded-lg border-2 border-[#0b4f82] bg-white p-6 shadow-sm lg:p-8">
                {/* Back to Supplier - Top Right */}
                <div className="flex justify-end mb-4">
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#64748b] transition hover:text-[#0b4f82]"
                    >
                        ← Back to Supplier
                    </Link>
                </div>

                {/* Product Hero */}
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative h-64 w-full overflow-hidden rounded-lg bg-[#f8fafc]">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={getAzureSignedUrl(product.images[0])}
                                    alt={formatText(product.title || product.name || "Product")}
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
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-3">
                                {product.images.slice(0, 4).map((image: string, index: number) => (
                                    <div
                                        key={index}
                                        className="relative aspect-square overflow-hidden rounded-md bg-[#f8fafc] border border-[#e2e8f0]"
                                    >
                                        <img
                                            src={getAzureSignedUrl(image)}
                                            alt={`${formatText(product.title || product.name || "Product")} - ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                        {index === 3 && product.images.length > 4 && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-semibold">
                                                +{product.images.length - 4}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                                Product
                            </span>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0b4f82] md:text-4xl">
                                {formatText(product.title || product.name || "Product")}
                            </h1>
                        </div>

                        {/* Category & Tags */}
                        <div className="flex flex-wrap gap-2">
                            {product.category && (
                                <span className="rounded-full bg-[#0b4f82]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0b4f82]">
                                    {formatText(product.category)}
                                </span>
                            )}
                            {product.tags && product.tags.length > 0 && product.tags.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-[#f8fafc] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#64748b] border border-[#e2e8f0]"
                                >
                                    {formatText(tag)}
                                </span>
                            ))}
                        </div>

                        {/* Short Description */}
                        {product.shortDescription && (
                            <p className="text-base leading-relaxed text-[#64748b]">
                                {formatText(product.shortDescription)}
                            </p>
                        )}

                        {/* Key Details */}
                        <div className="grid grid-cols-2 gap-4">
                            {product.priceRange && (
                                <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                                        Price Range
                                    </p>
                                    <p className="mt-1 text-lg font-bold text-[#0b4f82]">
                                        {formatText(product.priceRange)}
                                    </p>
                                </div>
                            )}
                            {product.capacity && (
                                <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                                        Capacity
                                    </p>
                                    <p className="mt-1 text-lg font-bold text-[#0b4f82]">
                                        {formatText(product.capacity)}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Inquiry Section */}
                        <ProductInquiry productName={product.title || product.name || "Product"} />
                    </div>
                </div>

                {/* Full Description */}
                {product.fullDescription && (
                    <>
                        <hr className="my-8 border-[#e2e8f0]" />
                        <div>
                            <h2 className="text-xl font-bold text-[#0b4f82]">Description</h2>
                            <div className="mt-4 text-base leading-relaxed text-[#171717] whitespace-pre-wrap">
                                {formatText(product.fullDescription)}
                            </div>
                        </div>
                    </>
                )}

                {/* Specifications */}
                {product.specifications && (
                    <>
                        <hr className="my-8 border-[#e2e8f0]" />
                        <div>
                            <h2 className="text-xl font-bold text-[#0b4f82]">Specifications</h2>
                            <div className="mt-4 text-base leading-relaxed text-[#171717] whitespace-pre-wrap">
                                {formatText(product.specifications)}
                            </div>
                        </div>
                    </>
                )}

                {/* PDF Documents */}
                {product.pdfFiles && product.pdfFiles.length > 0 && (
                    <>
                        <hr className="my-8 border-[#e2e8f0]" />
                        <div>
                            <h2 className="text-xl font-bold text-[#0b4f82]">Documents</h2>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {product.pdfFiles.map((pdf: string, index: number) => (
                                    <a
                                        key={index}
                                        href={getAzureSignedUrl(pdf)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 transition hover:border-[#0b4f82] hover:shadow-sm"
                                    >
                                        <svg
                                            className="h-8 w-8 flex-shrink-0 text-[#0b4f82]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M12 3v6a1 1 0 001 1h6"
                                            />
                                        </svg>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-[#171717] truncate">
                                                Document {index + 1}
                                            </p>
                                            <p className="text-xs text-[#64748b]">PDF • Click to view</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* YouTube Video */}
                {product.youtubeUrl && (
                    <>
                        <hr className="my-8 border-[#e2e8f0]" />
                        <div>
                            <h2 className="text-xl font-bold text-[#0b4f82]">Product Video</h2>
                            <div className="mt-4 aspect-video overflow-hidden rounded-lg bg-[#f8fafc]">
                                <iframe
                                    src={product.youtubeUrl.replace("watch?v=", "embed/")}
                                    title="Product Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* Supplier Info */}
                {supplier && (
                    <>
                        <hr className="my-8 border-[#e2e8f0]" />
                        <div>
                            <h2 className="text-xl font-bold text-[#0b4f82]">Supplied By</h2>
                            <div className="mt-4 flex items-center gap-4">
                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#f8fafc]">
                                    {(supplier as any).profileImage ? (
                                        <img
                                            src={getAzureSignedUrl((supplier as any).profileImage)}
                                            alt={formatText((supplier as any).companyName || (supplier as any).name || "Supplier")}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-[#94a3b8]">
                                            <svg
                                                className="h-8 w-8"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-[#171717]">
                                        {formatText((supplier as any).companyName || (supplier as any).name || "Supplier")}
                                    </h3>
                                    {(supplier as any).email && (
                                        <p className="text-sm text-[#64748b]">{(supplier as any).email}</p>
                                    )}
                                </div>
                                <Link
                                    href={backHref}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b4f82] transition hover:text-[#0b4f82]/90"
                                >
                                    View Supplier
                                    <span aria-hidden="true">›</span>
                                </Link>
                            </div>
                        </div>
                    </>
                )}

                {/* Similar Products */}
                {similarProducts && similarProducts.length > 0 && (
                    <>
                        <hr className="my-8 border-[#e2e8f0]" />
                        <div>
                            <h2 className="text-xl font-bold text-[#0b4f82]">Similar Products</h2>
                            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {similarProducts.map((similarProduct: any) => {
                                    const mainImage = Array.isArray(similarProduct.images)
                                        ? similarProduct.images[0]
                                        : (typeof similarProduct.images === 'string' ? similarProduct.images : null);

                                    return (
                                        <Link
                                            key={similarProduct.id}
                                            href={`/suppliers/${similarProduct.supplierId}/products/${similarProduct.id}`}
                                            className="group flex flex-col overflow-hidden rounded-lg border border-[#e2e8f0] bg-white transition hover:border-[#0b4f82] hover:shadow-md"
                                        >
                                            <div className="relative h-40 overflow-hidden bg-[#f8fafc]">
                                                {mainImage ? (
                                                    <img
                                                        src={getAzureSignedUrl(mainImage)}
                                                        alt={formatText(similarProduct.title || similarProduct.name || "Product")}
                                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
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
                                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-1 flex-col p-4">
                                                <h3 className="text-sm font-semibold text-[#171717] line-clamp-2 group-hover:text-[#0b4f82]">
                                                    {formatText(similarProduct.title || similarProduct.name || "Product")}
                                                </h3>
                                                {similarProduct.category && (
                                                    <span className="mt-2 text-xs text-[#64748b]">
                                                        {formatText(similarProduct.category)}
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </section>
        </SiteLayout>
    );
}
