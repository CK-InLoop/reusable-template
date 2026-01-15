import Link from "next/link";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
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
            {/* Breadcrumb - Simplified for mobile */}
            <nav className="mb-4 md:mb-6 flex items-center gap-1 md:gap-2 text-xs md:text-sm text-[#64748b] overflow-x-auto whitespace-nowrap pb-2">
                <Link href="/suppliers" className="hover:text-[#0b4f82] transition flex-shrink-0">
                    Suppliers
                </Link>
                <span className="flex-shrink-0">›</span>
                {supplier && (
                    <>
                        <Link href={backHref} className="hover:text-[#0b4f82] transition truncate max-w-[100px] md:max-w-none">
                            {formatText((supplier as any).companyName || (supplier as any).name || "Supplier")}
                        </Link>
                        <span className="flex-shrink-0">›</span>
                    </>
                )}
                <span className="text-[#171717] font-medium truncate">
                    {formatText(product.title || product.name || "Product")}
                </span>
            </nav>

            {/* Single Product Details Card */}
            <section className="rounded-lg border-2 border-[#0b4f82] bg-white p-4 md:p-6 lg:p-8 shadow-sm">
                {/* Back to Supplier - Top Right, hidden on mobile (use breadcrumb instead) */}
                <div className="hidden md:flex justify-end mb-4">
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#64748b] transition hover:text-[#0b4f82]"
                    >
                        ← Back to Supplier
                    </Link>
                </div>

                {/* Product Hero */}
                <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
                    {/* Product Images */}
                    <div className="space-y-3 md:space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-white border border-slate-200">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={getAzureSignedUrl(product.images[0])}
                                    alt={formatText(product.title || product.name || "Product")}
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-[#94a3b8]">
                                    <svg
                                        className="h-16 w-16 md:h-24 md:w-24"
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
                            <div className="grid grid-cols-4 gap-2 md:gap-3">
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
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-semibold text-sm">
                                                +{product.images.length - 4}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                                Product
                            </span>
                            <h1 className="mt-1 md:mt-2 text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#0b4f82]">
                                {formatText(product.title || product.name || "Product")}
                            </h1>
                        </div>

                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {product.tags.map((tag: string, index: number) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-[#f8fafc] px-2.5 md:px-4 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[#64748b] border border-[#e2e8f0]"
                                    >
                                        {formatText(tag)}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Short Description */}
                        {product.shortDescription && (
                            <p className="text-sm md:text-base leading-relaxed text-[#64748b]">
                                {formatText(product.shortDescription)}
                            </p>
                        )}

                        {/* Key Details */}
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {product.priceRange && (
                                <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-3 md:p-4">
                                    <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                                        Price Range
                                    </p>
                                    <p className="mt-0.5 md:mt-1 text-base md:text-lg font-bold text-[#0b4f82]">
                                        {formatText(product.priceRange)}
                                    </p>
                                </div>
                            )}
                            {product.capacity && (
                                <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-3 md:p-4">
                                    <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                                        Capacity
                                    </p>
                                    <p className="mt-0.5 md:mt-1 text-base md:text-lg font-bold text-[#0b4f82]">
                                        {formatText(product.capacity)}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Inquiry Section */}
                        <div className="space-y-3 pt-2">
                            <textarea
                                id="product-inquiry"
                                placeholder="Have a question? Drop it here…"
                                className="w-full h-16 md:h-12 px-3 py-2 text-sm border border-slate-200 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-[#0b4f82] focus:border-[#0b4f82]"
                            />
                            <div className="flex flex-col gap-2 md:gap-3 md:flex-row">
                                <a
                                    href={`https://wa.me/971564332583?text=${encodeURIComponent(`Hello, can I get more details about this product: ${product.title || product.name || "Product"}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 md:px-6 py-2.5 md:py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#25D366]/90"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    Get Quote on WhatsApp
                                </a>
                                <a
                                    href={`mailto:sales@pakmon.com?subject=Inquiry about ${encodeURIComponent(product.title || product.name || "Product")}&body=${encodeURIComponent(`Hello, I would like more information about: ${product.title || product.name || "Product"}`)}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0b4f82] px-4 md:px-6 py-2.5 md:py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#0b4f82]/90"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Send Email Inquiry
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Description */}
                {product.fullDescription && (
                    <>
                        <hr className="my-6 md:my-8 border-[#e2e8f0]" />
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-[#0b4f82]">Description</h2>
                            <div className="mt-3 md:mt-4 text-sm md:text-base leading-relaxed text-[#171717] whitespace-pre-wrap">
                                {formatText(product.fullDescription)}
                            </div>
                        </div>
                    </>
                )}

                {/* Specifications */}
                {product.specifications && (
                    <>
                        <hr className="my-6 md:my-8 border-[#e2e8f0]" />
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-[#0b4f82]">Specifications</h2>
                            <div className="mt-3 md:mt-4 text-sm md:text-base leading-relaxed text-[#171717] whitespace-pre-wrap">
                                {formatText(product.specifications)}
                            </div>
                        </div>
                    </>
                )}

                {/* YouTube Video */}
                {product.youtubeUrl && (
                    <>
                        <hr className="my-6 md:my-8 border-[#e2e8f0]" />
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-[#0b4f82]">Product Video</h2>
                            <div className="mt-3 md:mt-4 aspect-video overflow-hidden rounded-lg bg-[#f8fafc]">
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

                {/* PDF Documents - Only shown if product has PDFs */}
                {product.pdfFiles && product.pdfFiles.length > 0 && (
                    <>
                        <hr className="my-6 md:my-8 border-[#e2e8f0]" />
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-[#0b4f82]">Product Documents</h2>
                            <p className="mt-1 text-xs md:text-sm text-[#64748b]">Download product specifications, datasheets, and brochures</p>
                            <div className="mt-3 md:mt-4 grid gap-2 md:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {product.pdfFiles.map((pdf: string, index: number) => (
                                    <a
                                        key={index}
                                        href={getAzureSignedUrl(pdf)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-3 md:p-4 transition hover:border-[#0b4f82] hover:shadow-sm"
                                    >
                                        <svg
                                            className="h-6 w-6 md:h-8 md:w-8 flex-shrink-0 text-[#0b4f82]"
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
                                            <p className="text-xs text-[#64748b]">PDF • Click to View</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Supplier Info */}
                {supplier && (
                    <>
                        <hr className="my-6 md:my-8 border-[#e2e8f0]" />
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-[#0b4f82]">Supplied By</h2>
                            <div className="mt-3 md:mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                                <div className="h-14 w-14 md:h-16 md:w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white border border-slate-200">
                                    {(supplier as any).profileImage ? (
                                        <img
                                            src={getAzureSignedUrl((supplier as any).profileImage)}
                                            alt={formatText((supplier as any).companyName || (supplier as any).name || "Supplier")}
                                            className="h-full w-full object-contain"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-[#94a3b8]">
                                            <svg
                                                className="h-6 w-6 md:h-8 md:w-8"
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
                                        <p className="text-xs md:text-sm text-[#64748b] truncate">{(supplier as any).email}</p>
                                    )}
                                </div>
                                <Link
                                    href={backHref}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b4f82] transition hover:text-[#0b4f82]/90 mt-2 sm:mt-0"
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
                        <hr className="my-6 md:my-8 border-[#e2e8f0]" />
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-[#0b4f82]">Similar Products</h2>
                            <div className="mt-4 md:mt-6 grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
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
                                            <div className="relative h-28 md:h-40 overflow-hidden bg-[#f8fafc]">
                                                {mainImage ? (
                                                    <img
                                                        src={getAzureSignedUrl(mainImage)}
                                                        alt={formatText(similarProduct.title || similarProduct.name || "Product")}
                                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-[#94a3b8]">
                                                        <svg
                                                            className="h-8 w-8 md:h-12 md:w-12"
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
                                            <div className="flex flex-1 flex-col p-3 md:p-4">
                                                <h3 className="text-xs md:text-sm font-semibold text-[#171717] line-clamp-2 group-hover:text-[#0b4f82]">
                                                    {formatText(similarProduct.title || similarProduct.name || "Product")}
                                                </h3>
                                                {similarProduct.category && (
                                                    <span className="mt-1.5 md:mt-2 text-[10px] md:text-xs text-[#64748b]">
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
