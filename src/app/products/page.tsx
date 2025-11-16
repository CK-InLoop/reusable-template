import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import { getHomePage, getPageByUrl } from "@/lib/details";
import { formatText } from "@/lib/text";
import { getImagePath } from "@/lib/images";

const productsPage = getPageByUrl("products");
const homePage = getHomePage();

const productHighlights = productsPage?.text_blocks.slice(1, 3) ?? [];
const productMenu = productsPage?.text_blocks.filter((text) =>
  ["MAIN PAGE", "CORPORATE", "PRODUCTS", "ACCESSORIES Fabrications", "SERVICES"].includes(
    text
  )
) ?? [];
const galleryItems = (productsPage?.image_urls ?? []).map((image, index) => ({
  image: getImagePath(image),
  title:
    productHighlights[index % productHighlights.length] ??
    formatText(homePage.text_blocks[(index % 4) + 2] ?? "Process Equipment"),
}));

export default function ProductsPage() {
  return (
    <SiteLayout activePath="/products">
      <section className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm lg:p-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
          Product Portfolio
        </span>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="space-y-6 text-base leading-relaxed text-[#171717]">
            <h1 className="text-3xl font-bold tracking-tight text-[#0b4f82] md:text-4xl">
              {formatText(productHighlights[0] ?? "Process & Storage Systems")}
            </h1>
            <p className="text-[#64748b]">
              {formatText(
                productHighlights[1] ??
                  "Tailored equipment, treatment solutions, and turnkey systems designed for industrial excellence."
              )}
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-[#64748b]">
              {productMenu.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-[#e2e8f0] px-4 py-2 text-[#171717] transition hover:border-[#0b4f82] hover:text-[#0b4f82]"
                >
                  {formatText(item)}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0b4f82] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#0b4f82]/90"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#e2e8f0] px-6 py-3 text-sm font-semibold text-[#0b4f82] transition hover:border-[#0b4f82] hover:bg-[#0b4f82]/5"
              >
                Request Catalog
              </Link>
            </div>
          </div>
          <div className="relative h-72 overflow-hidden rounded-lg bg-[#f8fafc] shadow-sm sm:h-80">
            <Image
              src={galleryItems[0]?.image ?? getImagePath(homePage.image_urls[1])}
              alt={formatText(productHighlights[0] ?? "Industrial Products")}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              Featured Equipment
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#0b4f82] md:text-3xl">
              Stainless steel vessels, mixers, and turnkey treatment systems.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#64748b] md:text-base">
              {formatText(
                homePage.text_blocks.find((text) =>
                  text.startsWith("Wedesign and manufacture")
                ) ??
                  "We design and manufacture complex blending skids supported by advanced instrumentation and control."
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleryItems.slice(1).map((item, index) => (
            <article
              key={`${item.image}-${index}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-[#e2e8f0] bg-white shadow-sm transition hover:border-[#0b4f82] hover:shadow-md"
            >
              <div className="relative h-48 overflow-hidden bg-[#f8fafc]">
                <Image
                  src={item.image}
                  alt={formatText(item.title)}
                  fill
                  unoptimized
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col px-5 py-4">
                <h3 className="text-base font-semibold text-[#171717]">
                  {formatText(item.title)}
                </h3>
                <p className="mt-2 text-sm text-[#64748b]">
                  {formatText(
                    homePage.text_blocks[(index % 4) + 7] ??
                      "Engineered for precision and durability in demanding environments."
                  )}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b4f82]">
                  Learn More <span aria-hidden="true">›</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

