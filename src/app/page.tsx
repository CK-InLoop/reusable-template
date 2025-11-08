import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import { getHomePage, getPageByUrl } from "@/lib/details";
import { formatText } from "@/lib/text";
const homePage = getHomePage();
const corporatePage = getPageByUrl("corporate");
const productsPage = getPageByUrl("products");

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
    image,
    title:
      turnkeyPrograms[index % (turnkeyPrograms.length || 1)] ??
      heroHighlights[index % heroHighlights.length] ??
      companyName,
  })
);

export default function Home() {
  return (
    <SiteLayout activePath="/">
        <section className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <aside className="hidden lg:flex flex-col rounded-3xl bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-100">
            <div className="space-y-3 border-b border-slate-100 px-7 py-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                {formatText("Turnkey Portfolio")}
              </h2>
              <p className="text-2xl font-semibold tracking-tight text-slate-900">
                {formatText(companyName)}
              </p>
              <p className="text-sm leading-relaxed text-slate-500">
                {formatText(heroTagline)}
              </p>
            </div>
            <div className="px-7 py-8">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">
                {formatText("Turnkey Projects on")}
              </h3>
              <ul className="mt-6 space-y-3 text-sm font-medium text-slate-700">
              {turnkeyPrograms.map((item) => (
                <li
                  key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:border-amber-200 hover:bg-amber-50"
                >
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{formatText(item)}</span>
                </li>
              ))}
            </ul>
              <div className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 px-5 py-6 text-white shadow-lg shadow-emerald-200/80">
                <p className="text-[10px] uppercase tracking-[0.45em] text-white/80">
                  Expertise
                </p>
                <p className="mt-4 text-base font-semibold leading-relaxed text-white">
                  {formatText(productHighlights[0] ?? heroTagline)}
                </p>
              </div>
            </div>
          </aside>

          <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-2xl shadow-slate-200/80 ring-1 ring-slate-100 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600">
                  {formatText("Process Equipment Excellence")}
                </span>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                  <span className="block">{formatText(companyName)}</span>
                  <span
                    className="mt-2 block bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 bg-clip-text text-4xl text-transparent md:text-5xl"
                  >
                    {formatText("Easy, Fast, and Powerful")}
                  </span>
                </h1>
                <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                  {formatText(heroSummary)}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#products"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-200/70 transition hover:bg-amber-300"
                  >
                    {formatText("PRODUCTS")}
                  </Link>
                  <Link
                    href="#corporate"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-7 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-600"
                  >
                    {formatText("CORPORATE")}
                  </Link>
                </div>
              </div>
              <div className="relative h-72 overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-200/80 ring-1 ring-slate-100 sm:h-80">
                <Image
                  src={homePage.image_urls[1] ?? "/assets/main-page-1-2.jpg"}
                  alt={formatText(companyName)}
                  fill
                  unoptimized
                  className="object-cover object-center mix-blend-luminosity opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-slate-900/10 to-transparent mix-blend-multiply" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/60 bg-white/95 p-5 text-slate-800 shadow-lg">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    Innovation
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed">
                    {formatText(corporateIntro[0] ?? heroHighlights[0] ?? "")}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {heroHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="group rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-amber-400 group-hover:text-white">
                    <span className="text-lg font-semibold">★</span>
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-700">
                    {formatText(highlight)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="corporate" className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/80 ring-1 ring-slate-100 lg:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">
              Vision & Mission
            </p>
            <div className="mt-6 space-y-6">
              {corporateIntro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-slate-600"
                >
                  {formatText(paragraph)}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-emerald-100 via-white to-white p-8 shadow-xl shadow-emerald-100/70 ring-1 ring-emerald-100 lg:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Corporate Support
            </p>
            <ul className="mt-6 space-y-4">
              {corporateSupportList.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 text-[11px] font-bold text-white shadow-sm shadow-emerald-300/60">
                    ✓
                  </span>
                  <span className="leading-relaxed">
                    {formatText(item)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="products"
          className="mt-16 rounded-3xl bg-white p-8 shadow-2xl shadow-slate-200/80 ring-1 ring-slate-100 lg:p-12"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">
                Product Focus
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
                {formatText(productHighlights[0] ?? "Product Portfolio")}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
                {formatText(
                  productHighlights[1] ??
                    "Water Traetment and Air Treatment solutions"
                )}
              </p>
            </div>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/70 transition hover:bg-emerald-400"
            >
              {formatText("SERVICES")}
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {productGallery.map((item) => (
              <article
                key={`${item.image}-${item.title}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm transition hover:border-emerald-200 hover:shadow-2xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={formatText(item.title)}
                    fill
                    unoptimized
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/10 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col px-6 py-5">
                  <h3 className="text-base font-semibold text-slate-900">
                    {formatText(item.title)}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {formatText(heroSummary)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-500">
                    {formatText("ACCESSORIES Fabrications")}
                    <span aria-hidden="true">›</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-3">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-400 p-8 text-white shadow-2xl shadow-emerald-200/70 lg:col-span-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/80">
              Fabrication Capabilities
            </p>
            <h3 className="mt-4 text-2xl font-semibold">
              {formatText("High Quality Craftmanship")}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/85">
              {formatText(heroSummary)}
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {capabilityHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-emerald-300 hover:shadow-lg"
                >
                  {formatText(item)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mt-16 rounded-3xl bg-white p-8 shadow-2xl shadow-slate-200/80 ring-1 ring-slate-100 lg:mt-20 lg:p-12"
        >
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">
                Connect
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                {formatText("CONTACT US")}
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-slate-600 md:text-base">
                {formatText(
                  corporateIntro[0] ??
                    "Our Highly skilled technical based hands on experienced people drive our innovation gear."
                )}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm">
                  <p className="font-semibold text-slate-900">
                    {formatText("SERVICES")}
                  </p>
                  <p className="mt-2 text-slate-600">
                    {formatText("ZERO loss in the operations")}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm">
                  <p className="font-semibold text-slate-900">
                    {formatText("On time delivery")}
                  </p>
                  <p className="mt-2 text-slate-600">
                    {formatText("Clarification of the budget")}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-6 shadow-inner">
              <form className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                    placeholder="Tell us about your project"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-slate-900/30"
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
