import Image from "next/image";
import SiteLayout from "@/components/SiteLayout";
import { getHomePage, getPageByUrl } from "@/lib/details";
import { formatText } from "@/lib/text";

const homePage = getHomePage();
const productsPage = getPageByUrl("products");

const accessoryHighlights = homePage.text_blocks
  .filter((text) => text.includes("Fabrication") || text.includes("CIP"))
  .slice(0, 6);

const accessoryGallery = (productsPage?.image_urls ?? [])
  .filter((image) => image.toLowerCase().includes("products"))
  .map((image, index) => ({
    image,
    title:
      accessoryHighlights[index % accessoryHighlights.length] ??
      formatText(homePage.text_blocks[(index % 4) + 2] ?? "Accessory"),
  }));

export default function AccessoriesPage() {
  return (
    <SiteLayout activePath="/accessories">
      <section className="rounded-3xl bg-white p-8 shadow-2xl shadow-slate-200/80 ring-1 ring-slate-100 lg:p-12">
        <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">
          Accessories & Fabrications
        </span>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="space-y-6 text-base leading-relaxed text-slate-600">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Custom stainless-steel fabrications built for long-term service.
            </h1>
            <p>
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
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-white hover:shadow-sm"
                >
                  {formatText(item)}
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-72 overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-200/80 ring-1 ring-slate-100 sm:h-80">
            <Image
              src={accessoryGallery[0]?.image ?? homePage.image_urls[5]}
              alt="Accessory Fabrication"
              fill
              unoptimized
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-slate-900/10 to-transparent mix-blend-multiply" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/60 bg-white/95 p-5 text-slate-800 shadow-lg">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Precision Welding
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed">
                {formatText("Intricate Pipework Design and Build Capabilities")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
              Fabrication Showcase
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
              Accessories engineered to integrate seamlessly with your systems.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
              {formatText(
                homePage.text_blocks.find((text) =>
                  text.includes("fabrication capabilities include")
                ) ??
                  "Orbital welding, TIG/MIG expertise, panel building, and final wet testing ensure clean integration."
              )}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accessoryGallery.slice(1).map((item, index) => (
            <article
              key={`${item.image}-${index}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm transition hover:border-emerald-300 hover:shadow-xl"
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
                    homePage.text_blocks[(index % 4) + 26] ??
                      "Custom-built to meet stringent project specifications."
                  )}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-500">
                  Request Details <span aria-hidden="true">›</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

