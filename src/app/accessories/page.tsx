import Image from "next/image";
import SiteLayout from "@/components/SiteLayout";
import { getHomePage, getPageByUrl } from "@/lib/details";
import { formatText } from "@/lib/text";
import { getImagePath } from "@/lib/images";

const homePage = getHomePage();
const productsPage = getPageByUrl("products");

const accessoryHighlights = homePage.text_blocks
  .filter((text) => text.includes("Fabrication") || text.includes("CIP"))
  .slice(0, 6);

const accessoryGallery = (productsPage?.image_urls ?? [])
  .filter((image) => image.toLowerCase().includes("products"))
  .map((image, index) => ({
    image: getImagePath(image),
    title:
      accessoryHighlights[index % accessoryHighlights.length] ??
      formatText(homePage.text_blocks[(index % 4) + 2] ?? "Accessory"),
  }));

export default function AccessoriesPage() {
  return (
    <SiteLayout activePath="/accessories">
      <section className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm lg:p-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
          Accessories & Fabrications
        </span>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="space-y-6 text-base leading-relaxed text-[#171717]">
            <h1 className="text-3xl font-bold tracking-tight text-[#0b4f82] md:text-4xl">
              Custom stainless-steel fabrications built for long-term service.
            </h1>
            <p className="text-[#64748b]">
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
                  className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 text-sm font-semibold text-[#171717] transition hover:border-[#0b4f82] hover:bg-white hover:shadow-sm"
                >
                  {formatText(item)}
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-72 overflow-hidden rounded-lg bg-[#f8fafc] shadow-sm sm:h-80">
            <Image
              src={accessoryGallery[0]?.image ?? getImagePath(homePage.image_urls[5])}
              alt="Accessory Fabrication"
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
              Fabrication Showcase
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#0b4f82] md:text-3xl">
              Accessories engineered to integrate seamlessly with your systems.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#64748b] md:text-base">
              {formatText(
                homePage.text_blocks.find((text) =>
                  text.includes("fabrication capabilities include")
                ) ??
                  "Orbital welding, TIG/MIG expertise, panel building, and final wet testing ensure clean integration."
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accessoryGallery.slice(1).map((item, index) => (
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
                    homePage.text_blocks[(index % 4) + 26] ??
                      "Custom-built to meet stringent project specifications."
                  )}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b4f82]">
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

