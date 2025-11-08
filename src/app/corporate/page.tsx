import Image from "next/image";
import SiteLayout from "@/components/SiteLayout";
import { getHomePage, getPageByUrl } from "@/lib/details";
import { formatText } from "@/lib/text";

const corporatePage = getPageByUrl("corporate");
const homePage = getHomePage();

const corporateIntro = corporatePage?.text_blocks.slice(1, 4) ?? [];
const supportIndex = corporatePage
  ? corporatePage.text_blocks.indexOf("Highly skilled technical team support")
  : -1;
const supportItems =
  supportIndex >= 0 && corporatePage
    ? corporatePage.text_blocks.slice(supportIndex)
    : [];

const leadershipImages = (corporatePage?.image_urls ?? []).slice(1);

export default function CorporatePage() {
  return (
    <SiteLayout activePath="/corporate">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl bg-white p-8 shadow-2xl shadow-slate-200/80 ring-1 ring-slate-100 lg:p-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">
            Corporate Profile
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            {formatText(homePage.text_blocks[0] ?? "PAKMON")}
          </h1>
          <div className="mt-6 space-y-6 text-base leading-relaxed text-slate-600">
            {corporateIntro.map((paragraph) => (
              <p key={paragraph}>{formatText(paragraph)}</p>
            ))}
          </div>
        </div>

        <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl shadow-slate-200/80 ring-1 ring-slate-100">
          <div className="relative h-72 w-full flex-1">
            <Image
              src={leadershipImages[0] ?? homePage.image_urls[0]}
              alt={formatText(homePage.text_blocks[0] ?? "Corporate")}
              fill
              unoptimized
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent" />
          </div>
          <div className="space-y-4 px-8 py-10">
            <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400">
              Vision & Mission
            </p>
            <p className="text-sm leading-relaxed text-slate-600">
              {formatText(corporateIntro[1] ?? "")}
            </p>
            <p className="text-sm leading-relaxed text-slate-600">
              {formatText(corporateIntro[2] ?? "")}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-gradient-to-br from-emerald-100 via-white to-white p-8 shadow-2xl shadow-emerald-100/70 ring-1 ring-emerald-100 lg:p-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-emerald-500">
          Strategic Commitments
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {supportItems.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-sm font-medium text-slate-700 shadow-sm transition hover:border-emerald-300 hover:shadow-lg"
            >
              {formatText(item)}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">
              Leadership In Action
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
              Our team drives innovation, safety, and excellence.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
              {formatText(
                corporateIntro[0] ??
                  "Our experienced people keep the innovation engine running for engineering and environmental good practices."
              )}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leadershipImages.slice(1).map((image, index) => (
            <figure
              key={`${image}-${index}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 transition hover:border-emerald-300 hover:shadow-2xl"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={image}
                  alt="Corporate team"
                  fill
                  unoptimized
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
              </div>
              <figcaption className="space-y-2 px-6 py-5 text-sm text-slate-600">
                <p className="text-base font-semibold text-slate-900">
                  {formatText(supportItems[index] ?? "Expertise & Support")}
                </p>
                <p>{formatText(corporateIntro[index % corporateIntro.length] ?? "")}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

