import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";

type ServiceGroup = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  icon: "reliability" | "improvement" | "safety";
  services: string[];
};

const serviceGroups: ServiceGroup[] = [
  {
    id: "asset-reliability",
    eyebrow: "01 / Reliability",
    title: "Asset Reliability & Maintenance",
    description:
      "Practical maintenance support that helps identify equipment issues early and sustain dependable operations.",
    accent: "border-[#0b4f82] bg-blue-50 text-[#0b4f82]",
    icon: "reliability",
    services: [
      "AMC Contracts",
      "Fan Balancing and Monitoring",
      "Thermal Inspections",
      "Vibration Checks",
      "Central Lubrication Systems",
      "Tightening Checks",
    ],
  },
  {
    id: "operational-excellence",
    eyebrow: "02 / Improvement",
    title: "TPM & Continuous Improvement",
    description:
      "Structured improvement programs that strengthen maintenance ownership, planning, and operational performance.",
    accent: "border-amber-400 bg-amber-50 text-amber-700",
    icon: "improvement",
    services: [
      "6S Training",
      "Total Productive Maintenance (TPM)",
      "Focused Improvements",
      "Autonomous Maintenance",
      "Planned Maintenance",
      "Early Equipment Management",
      "Low-Cost Automation",
    ],
  },
  {
    id: "risk-efficiency",
    eyebrow: "03 / Performance",
    title: "Safety, Efficiency & Supply Chain",
    description:
      "Focused services for safer workplaces, controlled operating costs, energy performance, and material continuity.",
    accent: "border-emerald-500 bg-emerald-50 text-emerald-700",
    icon: "safety",
    services: [
      "Energy Savings & Risk Assessment",
      "Cost Reductions",
      "HSE Risk Assessments and Predictions",
      "Efficiency Monitoring (FOL)",
      "Supply Chain – Raw Materials",
    ],
  },
];

function GroupIcon({ icon }: { icon: ServiceGroup["icon"] }) {
  if (icon === "reliability") {
    return (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12h4l2.2-5 4.2 10 2.1-5H21" />
      </svg>
    );
  }

  if (icon === "improvement") {
    return (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 19V9m7 10V5m7 14v-7M3 19h18" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m4 7 5-4 4 3 7-4" />
      </svg>
    );
  }

  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3 5 6v5c0 4.7 2.9 8.4 7 10 4.1-1.6 7-5.3 7-10V6l-7-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m9 12 2 2 4-5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 10 3 3 7-7" />
    </svg>
  );
}

export default function ServicesPage() {
  const serviceCount = serviceGroups.reduce(
    (total, group) => total + group.services.length,
    0,
  );

  return (
    <SiteLayout activePath="/services">
      <section className="relative isolate overflow-hidden rounded-b-[2rem] bg-[#073b61] px-6 py-14 text-white shadow-xl shadow-slate-200/60 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <div className="absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full border-[48px] border-white/5" />
        <div className="absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-400">
              Industrial Services
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Reliable assets. Safer operations. Better performance.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
              Maintenance, operational excellence, safety, energy, and supply-chain services designed around the realities of industrial operations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-slate-950/20 transition duration-200 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#073b61] motion-reduce:transition-none"
              >
                Discuss Your Requirements
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h12m-4-4 4 4-4 4" />
                </svg>
              </Link>
              <a
                href="#service-portfolio"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#073b61] motion-reduce:transition-none"
              >
                Explore All Services
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:max-w-md lg:max-w-none">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <strong className="block text-3xl font-black text-amber-400">{serviceCount}</strong>
              <span className="mt-1 block text-sm leading-5 text-blue-100">Specialized services</span>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <strong className="block text-3xl font-black text-amber-400">03</strong>
              <span className="mt-1 block text-sm leading-5 text-blue-100">Core service areas</span>
            </div>
          </div>
        </div>
      </section>

      <section id="service-portfolio" className="scroll-mt-24 py-16 sm:py-20" aria-labelledby="services-heading">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0b4f82]">
            Complete Service Portfolio
          </p>
          <h2 id="services-heading" className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Support across the full operational lifecycle
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Choose a focused service or combine multiple disciplines into a coordinated improvement program for your facility.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {serviceGroups.map((group) => (
            <article
              key={group.id}
              id={group.id}
              className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/70 motion-reduce:transform-none motion-reduce:transition-none sm:p-7"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${group.accent}`}>
                <GroupIcon icon={group.icon} />
              </div>
              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                {group.eyebrow}
              </p>
              <h3 className="mt-2 text-xl font-bold leading-7 text-slate-950">
                {group.title}
              </h3>
              <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600">
                {group.description}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-6">
                {group.services.map((service) => (
                  <li key={service} className="flex items-start gap-3 rounded-xl bg-slate-50 px-3.5 py-3 text-sm font-medium leading-5 text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0b4f82] text-white">
                      <CheckIcon />
                    </span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0b4f82]">
            Tailored Support
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Need a service plan for your facility?
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Tell us about your equipment, maintenance priorities, or improvement targets, and our team will help define the right scope.
          </p>
        </div>
        <Link
          href="/contact"
          className="mt-7 inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#0b4f82] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition duration-200 hover:bg-[#083d66] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4f82] focus-visible:ring-offset-2 motion-reduce:transition-none lg:mt-0"
        >
          Contact Our Team
        </Link>
      </section>
    </SiteLayout>
  );
}
