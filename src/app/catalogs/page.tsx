import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";

type CatalogType = "gas" | "pressure";

const catalogConfig: Record<
  CatalogType,
  {
    category: string;
    title: string;
    description: string;
    pdfSrc: string;
    highlights: string[];
  }
> = {
  gas: {
    category: "Gas Engineering",
    title: "Pakmon Gas Systems Catalog",
    description:
      "Discover modular gas skids, precision storage vessels, and treatment systems crafted for safe handling of volatile applications. Explore design philosophies, performance benchmarks, and integrated automation that keeps operations efficient and reliable.",
    pdfSrc: "/Brochures/pakmonGas.pdf",
    highlights: [
      "Comprehensive flow schematics and component breakdowns",
      "Compliance-ready documentation with safety insights",
      "Application notes from energy, petrochemical, and utility sectors",
    ],
  },
  pressure: {
    category: "Pressure Systems",
    title: "Pakmon Pressure Vessels Catalog",
    description:
      "Explore engineered pressure vessels, mixing reactors, and storage tanks designed for critical mission environments. Review build materials, inspection regimes, and customizable options that help teams plan with precision.",
    pdfSrc: "/Brochures/pakmonPressure.pdf",
    highlights: [
      "Design calculations and certification-ready data sheets",
      "Material selection guidance for corrosive media",
      "Lifecycle support: installation, maintenance, and retrofits",
    ],
  },
};

type CatalogsPageProps = {
  searchParams: Promise<{
    type?: string;
  }>;
};

export default async function CatalogsPage({ searchParams }: CatalogsPageProps) {
  const resolvedParams = await searchParams;
  const queryType = resolvedParams?.type as CatalogType | undefined;
  const selectedType =
    queryType && queryType in catalogConfig ? queryType : "gas";
  const selectedCatalog = catalogConfig[selectedType];

  return (
    <SiteLayout activePath="/catalogs">
      <section className="space-y-6 rounded-2xl border border-[#e2e8f0] bg-white/70 p-6 shadow-sm lg:p-10">
        <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
              Digital Product Library
            </p>
            <h1 className="text-2xl font-bold text-[#0b4f82] sm:text-3xl">
              Explore Our Brochures
            </h1>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
            {(
              [
                { key: "gas", label: "Gas Systems" },
                { key: "pressure", label: "Pressure Vessels" },
              ] as { key: CatalogType; label: string }[]
            ).map((option) => {
              const isActive = option.key === selectedType;
              return (
                <Link
                  key={option.key}
                  href={`/catalogs?type=${option.key}`}
                  className={`rounded-full border px-6 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4f82] focus-visible:ring-offset-2 ${
                    isActive
                      ? "border-transparent bg-[#0b4f82] text-white"
                      : "border-[#e2e8f0] text-[#0b4f82] hover:border-[#0b4f82]"
                  }`}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <article className="grid gap-8 rounded-2xl border border-[#e2e8f0] bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div className="flex flex-col space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                {selectedCatalog.category}
              </p>
              <h2 className="text-2xl font-bold text-[#0b4f82]">
                {selectedCatalog.title}
              </h2>
            </div>
            <div className="flex-1 overflow-hidden rounded-xl border border-[#e2e8f0] bg-[#f8fafc] shadow-inner">
              <iframe
                src={selectedCatalog.pdfSrc}
                title={selectedCatalog.title}
                className="h-full min-h-[320px] w-full rounded-xl sm:min-h-[420px] lg:min-h-[520px]"
              />
            </div>
            <a
              href={selectedCatalog.pdfSrc}
              download
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0b4f82] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4f82]/90 sm:w-fit"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF
            </a>
          </div>

          <div className="flex flex-col justify-center space-y-5 rounded-2xl bg-gradient-to-b from-white via-white to-[#f8fafc] p-5 text-sm text-[#64748b] sm:p-6">
            <div>
              <h3 className="text-lg font-semibold text-[#0b4f82]">
                {selectedType === "gas"
                  ? "Breathe Innovation Into Gas Processing"
                  : "Confidence Under Pressure"}
              </h3>
              <p className="mt-3 leading-relaxed">{selectedCatalog.description}</p>
            </div>
            <ul className="space-y-3 text-[#171717]">
              {selectedCatalog.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#64748b]">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#0b4f82]/10 text-[#0b4f82]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </SiteLayout>
  );
}

