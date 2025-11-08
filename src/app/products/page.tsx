import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import { getHomePage, getPageByUrl } from "@/lib/details";
import { formatText } from "@/lib/text";

const productsPage = getPageByUrl("products");
const homePage = getHomePage();

const productHighlights = productsPage?.text_blocks.slice(1, 3) ?? [];
const productMenu = productsPage?.text_blocks.filter((text) =>
  ["MAIN PAGE", "CORPORATE", "PRODUCTS", "ACCESSORIES Fabrications", "SERVICES"].includes(
    text
  )
) ?? [];
const galleryItems = (productsPage?.image_urls ?? []).map((image, index) => ({
  image,
  title:
    productHighlights[index % productHighlights.length] ??
    formatText(homePage.text_blocks[(index % 4) + 2] ?? "Process Equipment"),
}));

export default function ProductsPage() {
  return (
    <SiteLayout activePath="/products">
      <section className="rounded-3xl bg-white p-8 shadow-2xl shadow-slate-200/80 ring-1 ring-slate-100 lg:p-12">
        <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">
          Product Portfolio
        </span>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="space-y-6 text-base leading-relaxed text-slate-600">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              {formatText(productHighlights[0] ?? "Process & Storage Systems")}
            </h1>
            <p>
              {formatText(
                productHighlights[1] ??
                  "Tailored equipment, treatment solutions, and turnkey systems designed for industrial excellence."
              )}
            </p>
            <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.35em] text-slate-500">
              {productMenu.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:border-emerald-300 hover:text-emerald-600"
                >
                  {formatText(item)}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/70 transition hover:bg-emerald-400"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-7 py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-400 hover:text-amber-500"
              >
                Request Catalog
              </Link>
            </div>
          </div>
          <div className="relative h-72 overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-200/80 ring-1 ring-slate-100 sm:h-80">
            <Image
              src={galleryItems[0]?.image ?? homePage.image_urls[1]}
              alt={formatText(productHighlights[0] ?? "Industrial Products")}
              fill
              unoptimized
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-slate-900/10 to-transparent mix-blend-multiply" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/60 bg-white/95 p-5 text-slate-800 shadow-lg">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Engineered Solutions
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed">
                {formatText(productHighlights[1] ?? "Tailored to your process requirements.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">
              Featured Equipment
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
              Stainless steel vessels, mixers, and turnkey treatment systems.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
              {formatText(
                homePage.text_blocks.find((text) =>
                  text.startsWith("Wedesign and manufacture")
                ) ??
                  "We design and manufacture complex blending skids supported by advanced instrumentation and control."
              )}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleryItems.slice(1).map((item, index) => (
            <article
              key={`${item.image}-${index}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-lg shadow-slate-200/70 transition hover:border-emerald-300 hover:shadow-2xl"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={formatText(item.title)}
                  fill
                  unoptimized
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
              </div>
              <div className="flex flex-1 flex-col px-6 py-5">
                <h3 className="text-base font-semibold text-slate-900">
                  {formatText(item.title)}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {formatText(
                    homePage.text_blocks[(index % 4) + 7] ??
                      "Engineered for precision and durability in demanding environments."
                  )}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-500">
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

