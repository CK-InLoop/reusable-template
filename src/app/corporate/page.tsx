import Image from "next/image";
import SiteLayout from "@/components/SiteLayout";
import { getHomePage, getPageByUrl } from "@/lib/details";
import { formatText } from "@/lib/text";
import { getImagePath } from "@/lib/images";

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

const leadershipImages = (corporatePage?.image_urls ?? [])
  .slice(1)
  .map((img) => getImagePath(img));

export default function CorporatePage() {
  return (
    <SiteLayout activePath="/corporate">
      <section className="bg-gray-100 pb-12 pt-8 w-[100vw] ml-[calc(50%-50vw)] px-[calc(50vw-50%)]">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 lg:grid-cols-[1.2fr_1fr] w-full">
          <div className="rounded-lg border border-[#e2e8f0] bg-white p-6 shadow-sm lg:p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              Corporate Profile
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#0b4f82] md:text-4xl">
              {formatText(homePage.text_blocks[0] ?? "PAKMON")}
            </h1>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#171717]">
              {corporateIntro.map((paragraph) => (
                <p key={paragraph} className="text-[#64748b]">
                  {formatText(paragraph)}
                </p>
              ))}
            </div>
          </div>

          <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-[#e2e8f0] bg-white text-[#171717] shadow-sm">
            <div className="relative h-72 w-full flex-1 bg-[#f8fafc]">
              <Image
                src={leadershipImages[0] ?? getImagePath(homePage.image_urls[0])}
                alt={formatText(homePage.text_blocks[0] ?? "Corporate")}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="space-y-4 px-6 py-8">
              <p className="text-xs uppercase tracking-wider text-[#64748b]">
                Vision & Mission
              </p>
              <p className="text-sm leading-relaxed text-[#64748b]">
                {formatText(corporateIntro[1] ?? "")}
              </p>
              <p className="text-sm leading-relaxed text-[#64748b]">
                {formatText(corporateIntro[2] ?? "")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-6 shadow-sm lg:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#0b4f82]">
          Strategic Commitments
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {supportItems.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-[#e2e8f0] bg-white p-4 text-sm font-medium text-[#171717] shadow-sm transition hover:border-[#0b4f82] hover:shadow-md"
            >
              {formatText(item)}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              Leadership In Action
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#0b4f82] md:text-3xl">
              Our team drives innovation, safety, and excellence.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#64748b] md:text-base">
              {formatText(
                corporateIntro[0] ??
                "Our experienced people keep the innovation engine running for engineering and environmental good practices."
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leadershipImages.slice(1).map((image, index) => (
            <figure
              key={`${image}-${index}`}
              className="group overflow-hidden rounded-lg border border-[#e2e8f0] bg-white shadow-sm transition hover:border-[#0b4f82] hover:shadow-md"
            >
              <div className="relative h-56 w-full bg-[#f8fafc]">
                <Image
                  src={image}
                  alt="Corporate team"
                  fill
                  unoptimized
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <figcaption className="space-y-2 px-5 py-4 text-sm text-[#64748b]">
                <p className="text-base font-semibold text-[#171717]">
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

