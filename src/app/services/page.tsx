import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import { getHomePage, getPageByUrl } from "@/lib/details";
import { formatText } from "@/lib/text";

const homePage = getHomePage();
const corporatePage = getPageByUrl("corporate");

const turnkeyIndex = homePage.text_blocks.indexOf("Turnkey Projects on");
const turnkeyPrograms =
  turnkeyIndex >= 0
    ? homePage.text_blocks.slice(turnkeyIndex + 1, turnkeyIndex + 7)
    : [];
const capabilityHighlights =
  turnkeyIndex >= 0
    ? homePage.text_blocks.slice(turnkeyIndex + 7)
    : homePage.text_blocks.slice(7, 14);

const corporateSupportIndex = corporatePage
  ? corporatePage.text_blocks.indexOf("Highly skilled technical team support")
  : -1;
const corporateSupportList =
  corporateSupportIndex >= 0 && corporatePage
    ? corporatePage.text_blocks.slice(corporateSupportIndex)
    : [];

export default function ServicesPage() {
  return (
    <SiteLayout activePath="/services">
      <section className="rounded-3xl bg-white p-8 shadow-2xl shadow-slate-200/80 ring-1 ring-slate-100 lg:p-12">
        <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">
          Turnkey Expertise
        </span>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="space-y-6 text-base leading-relaxed text-slate-600">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Industrial services engineered for reliability and efficiency.
            </h1>
            <p>
              {formatText(
                homePage.text_blocks.find((text) =>
                  text.startsWith("Wedesign and manufacture")
                ) ??
                  "We partner with you from design to commissioning, delivering advanced blending systems, piping, automation, and complete turnkey plants."
              )}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {turnkeyPrograms.map((program) => (
                <div
                  key={program}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-white hover:shadow-sm"
                >
                  {formatText(program)}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/70 transition hover:bg-emerald-400"
              >
                View Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-7 py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-400 hover:text-amber-500"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-100 via-white to-white p-8 shadow-inner shadow-emerald-100/60 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Quality Assured
            </p>
            <ul className="mt-6 space-y-4 text-sm text-slate-700">
              {corporateSupportList.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl border border-transparent px-4 py-3 transition hover:border-emerald-300 hover:bg-white"
                >
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-amber-400 text-[11px] font-bold text-white">
                    ✓
                  </span>
                  <span className="leading-relaxed">{formatText(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
              Execution Capabilities
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
              From precision fabrication to on-site commissioning.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
              {formatText(
                homePage.text_blocks[1] ??
                  "Process equipment design, manufacture, installations, and commissioning."
              )}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityHighlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-emerald-300 hover:shadow-lg"
            >
              {formatText(item)}
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

