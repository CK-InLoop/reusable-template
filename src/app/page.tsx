import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { getHomePage, getPageByUrl } from "@/lib/details";
import { formatText } from "@/lib/text";
import { getImagePath } from "@/lib/images";

const homePage = getHomePage();
const corporatePage = getPageByUrl("corporate");
const productsPage = getPageByUrl("products");

// page content
const companyName = homePage.text_blocks[0] ?? "PAKMON";
const heroTagline = homePage.text_blocks[1] ?? "";
const heroSummary =
  homePage.text_blocks.find((text) =>
    text.startsWith("Wedesign and manufacture")
  ) ?? "";

const heroHighlights = Array.from(
  new Set(homePage.text_blocks.slice(2, 7))
).slice(0, 4);

const turnkeyIndex = homePage.text_blocks.indexOf("Turnkey Projects on");
const turnkeyPrograms =
  turnkeyIndex >= 0
    ? homePage.text_blocks.slice(turnkeyIndex + 1, turnkeyIndex + 7)
    : [];
const capabilityHighlights =
  turnkeyIndex >= 0
    ? homePage.text_blocks.slice(turnkeyIndex + 7)
    : homePage.text_blocks.slice(7, 14);

const corporateIntro = corporatePage?.text_blocks.slice(1, 4) ?? [];
const corporateSupportIndex = corporatePage
  ? corporatePage.text_blocks.indexOf("Highly skilled technical team support")
  : -1;
const corporateSupportList =
  corporateSupportIndex >= 0 && corporatePage
    ? corporatePage.text_blocks.slice(corporateSupportIndex)
    : [];

const productHighlights = productsPage?.text_blocks.slice(1, 3) ?? [];
const productGallery = (productsPage?.image_urls ?? []).slice(1, 7).map(
  (image, index) => ({
    image: getImagePath(image),
    title:
      turnkeyPrograms[index % (turnkeyPrograms.length || 1)] ??
      heroHighlights[index % heroHighlights.length] ??
      companyName,
  })
);

export default function Home() {
  const heroImage = getImagePath(homePage.image_urls[1]);

  return (
    <SiteLayout activePath="/">
      <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Desktop sidebar - rendered by CollapsibleSidebar */}
        <CollapsibleSidebar />

        <div className="space-y-8">
          <FeaturedCarousel />
          {/* Hero Section - Text Left, Image Right */}
          <div className="grid gap-8 rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm lg:grid-cols-2 lg:items-center lg:p-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-[#0b4f82] md:text-4xl">
                {formatText(companyName)}
              </h1>
              <p className="text-lg font-semibold text-[#171717]">
                {formatText(heroTagline)}
              </p>
              <p className="text-base leading-relaxed text-[#64748b]">
                {formatText(heroSummary)}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-md bg-[#ffb400] px-6 py-3 text-sm font-semibold text-[#171717] shadow-md transition hover:bg-[#ffb400]/90"
                >
                  {formatText("PRODUCTS")}
                </Link>
                <Link
                  href="/corporate"
                  className="inline-flex items-center justify-center rounded-md border border-[#e2e8f0] px-6 py-3 text-sm font-semibold text-[#0b4f82] transition hover:border-[#0b4f82] hover:bg-[#0b4f82]/5"
                >
                  {formatText("CORPORATE")}
                </Link>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg bg-[#f8fafc] sm:h-80">
              <Image
                src={heroImage}
                alt={formatText(companyName)}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {heroHighlights.map((highlight) => (
              <div
                key={highlight}
                className="group rounded-lg border border-[#e2e8f0] bg-white p-4 shadow-sm transition hover:border-[#0b4f82] hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0b4f82]/10 text-[#0b4f82] transition group-hover:bg-[#0b4f82] group-hover:text-white">
                  <span className="text-lg font-semibold">★</span>
                </div>
                <p className="mt-3 text-sm font-medium leading-relaxed text-[#171717]">
                  {formatText(highlight)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="corporate" className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            Vision & Mission
          </p>
          <div className="mt-4 space-y-4">
            {corporateIntro.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-[#171717]"
              >
                {formatText(paragraph)}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-6 shadow-sm lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0b4f82]">
            Corporate Support
          </p>
          <ul className="mt-4 space-y-3">
            {corporateSupportList.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-[#171717]">
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0b4f82] text-[10px] font-bold text-white">
                  ✓
                </span>
                <span className="leading-relaxed">{formatText(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="products"
        className="mt-12 rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm lg:p-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              Product Focus
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#0b4f82] md:text-3xl">
              {formatText(productHighlights[0] ?? "Product Portfolio")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#64748b] md:text-base">
              {formatText(
                productHighlights[1] ??
                  "Water Traetment and Air Treatment solutions"
              )}
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-md bg-[#0b4f82] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#0b4f82]/90"
          >
            {formatText("SERVICES")}
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productGallery.map((item, index) => (
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
                  {formatText(heroSummary)}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0b4f82]">
                  {formatText("ACCESSORIES Fabrications")}
                  <span aria-hidden="true">›</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="rounded-lg bg-[#0b4f82] p-6 text-white shadow-md lg:col-span-1 lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
            Fabrication Capabilities
          </p>
          <h3 className="mt-4 text-2xl font-bold">
            {formatText("High Quality Craftmanship")}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/90">
            {formatText(heroSummary)}
          </p>
        </div>
        <div className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {capabilityHighlights.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-[#e2e8f0] bg-white p-4 text-sm font-medium text-[#171717] shadow-sm transition hover:border-[#0b4f82] hover:shadow-md"
              >
                {formatText(item)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mt-12 rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm lg:mt-16 lg:p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              Connect
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#0b4f82]">
              {formatText("CONTACT US")}
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-[#64748b] md:text-base">
              {formatText(
                corporateIntro[0] ??
                  "Our Highly skilled technical based hands on experienced people drive our innovation gear."
              )}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 text-sm">
                <p className="font-semibold text-[#171717]">
                  {formatText("SERVICES")}
                </p>
                <p className="mt-2 text-[#64748b]">
                  {formatText("ZERO loss in the operations")}
                </p>
              </div>
              <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4 text-sm">
                <p className="font-semibold text-[#171717]">
                  {formatText("On time delivery")}
                </p>
                <p className="mt-2 text-[#64748b]">
                  {formatText("Clarification of the budget")}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-6">
            <form className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition focus:border-[#0b4f82] focus:ring-2 focus:ring-[#0b4f82]/20"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-md border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition focus:border-[#0b4f82] focus:ring-2 focus:ring-[#0b4f82]/20"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="mt-2 w-full rounded-md border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition focus:border-[#0b4f82] focus:ring-2 focus:ring-[#0b4f82]/20"
                  placeholder="Tell us about your project"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-[#0b4f82] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#0b4f82]/90"
              >
                {formatText("CONTACT US")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
