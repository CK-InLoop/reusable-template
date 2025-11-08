import SiteLayout from "@/components/SiteLayout";
import { getHomePage, getPageByUrl } from "@/lib/details";
import { formatText } from "@/lib/text";

const homePage = getHomePage();
const corporatePage = getPageByUrl("corporate");

const corporateIntro = corporatePage?.text_blocks.slice(1, 3) ?? [];
const supportIndex = corporatePage
  ? corporatePage.text_blocks.indexOf("Highly skilled technical team support")
  : -1;
const supportItems =
  supportIndex >= 0 && corporatePage
    ? corporatePage.text_blocks.slice(supportIndex, supportIndex + 4)
    : [];

export default function ContactPage() {
  return (
    <SiteLayout activePath="/contact">
      <section className="rounded-3xl bg-white p-8 shadow-2xl shadow-slate-200/80 ring-1 ring-slate-100 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">
              Contact Us
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              {formatText(homePage.text_blocks[0] ?? "PAKMON")}
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-600 md:text-base">
              {formatText(
                corporateIntro[0] ??
                  "Our highly skilled technical team is ready to support your engineering initiatives."
              )}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {supportItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700"
                >
                  <p className="font-semibold text-slate-900">
                    {formatText(item)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-1 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">
                {formatText("PROCESS EQUIPMENTS DESIGN,MANUFACTURE INSTALLATIONS AND COMMISSIONING")}
              </p>
              <p>{formatText("On time delivery")}</p>
              <p>{formatText("Clarification of the budget")}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-inner">
            <form className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Tell us about your project"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-emerald-200/70"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

