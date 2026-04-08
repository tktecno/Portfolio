import { ArrowLeft, ExternalLink, LayoutPanelTop, MonitorSmartphone } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../Seo";
import ThemeToggleButton from "../ThemeToggleButton";

export default function WorldEduhubPreview({ theme, toggleTheme }) {
  const isDark = theme === "dark";
  const origin =
    typeof window === "undefined" ? "https://example.com" : window.location.origin;
  const previewJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "World Eduhub Preview",
    description:
      "Preview page for the World Eduhub educational website UI project by Tapash Roy.",
    author: {
      "@type": "Person",
      name: "Tapash Roy",
    },
    url: `${origin}/world-eduhub`,
  };

  return (
    <div
      className={`min-h-screen overflow-hidden px-6 py-16 transition-colors duration-300 ${
        isDark ? "bg-[#05131a] text-slate-100" : "bg-[#f6f0e7] text-slate-900"
      }`}
    >
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute left-[-8rem] top-[-5rem] h-[22rem] w-[22rem] rounded-full blur-3xl ${
            isDark ? "bg-cyan-400/10" : "bg-[#eadcc9]"
          }`}
        />
        <div
          className={`absolute bottom-[-7rem] right-[-6rem] h-[24rem] w-[24rem] rounded-full blur-3xl ${
            isDark ? "bg-[#d9f36f]/10" : "bg-[#dbe5c0]"
          }`}
        />
      </div>
      <Seo
        title="World Eduhub Preview | Tapash Roy"
        description="Preview the World Eduhub educational website UI project built by Tapash Roy using HTML, CSS, and JavaScript."
        path="/world-eduhub"
        image="/tps2.webp"
        type="article"
        jsonLd={previewJsonLd}
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur transition ${
              isDark
                ? "border-white/10 bg-white/[0.05] text-slate-100 hover:border-[#d9f36f]/40 hover:text-[#eef8b4]"
                : "border-slate-900/10 bg-white/80 text-slate-700 hover:border-slate-900/20 hover:text-slate-950"
            }`}
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p
              className={`section-kicker ${
                isDark ? "text-[#eef8b4]/80" : "text-slate-500"
              }`}
            >
              Project Preview
            </p>
            <h1 className="display-font mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              World Eduhub in a cleaner presentation shell.
            </h1>
            <p className={`mt-5 max-w-2xl text-base leading-7 md:text-lg ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}>
              This page gives the project its own focused stage instead of treating it
              like a plain iframe. The goal is to make the work feel more deliberate,
              easier to read, and more consistent with the rest of the portfolio.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div
                className={`rounded-[28px] border p-5 backdrop-blur-xl ${
                  isDark
                    ? "border-white/10 bg-white/[0.05]"
                    : "border-slate-900/10 bg-white/80"
                }`}
              >
                <LayoutPanelTop
                  size={18}
                  className={isDark ? "text-[#d9f36f]" : "text-slate-700"}
                />
                <h2 className="mt-4 text-lg font-semibold">Stack</h2>
                <p className={`mt-2 text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  HTML, CSS, and JavaScript focused on layout clarity and section structure.
                </p>
              </div>

              <div
                className={`rounded-[28px] border p-5 backdrop-blur-xl ${
                  isDark
                    ? "border-white/10 bg-white/[0.05]"
                    : "border-slate-900/10 bg-white/80"
                }`}
              >
                <MonitorSmartphone
                  size={18}
                  className={isDark ? "text-[#d9f36f]" : "text-slate-700"}
                />
                <h2 className="mt-4 text-lg font-semibold">Focus</h2>
                <p className={`mt-2 text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  Practicing responsive composition, education-site hierarchy, and cleaner section pacing.
                </p>
              </div>
            </div>

            <a
              href="/World_Eduhub/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                isDark
                  ? "bg-[#d9f36f] text-slate-950 hover:bg-[#e8fa92]"
                  : "bg-slate-950 text-white hover:bg-slate-800"
              }`}
            >
              Open Full Preview
              <ExternalLink size={16} />
            </a>
          </div>

          <div
            className={`panel-noise overflow-hidden rounded-[32px] border p-4 backdrop-blur-xl md:p-5 ${
              isDark
                ? "border-white/10 bg-white/[0.05] shadow-[0_28px_90px_rgba(1,8,11,0.42)]"
                : "border-slate-900/10 bg-white/82 shadow-[0_24px_72px_rgba(82,65,43,0.12)]"
            }`}
          >
            <div
              className={`mb-4 flex items-center justify-between rounded-[22px] border px-4 py-3 text-sm ${
                isDark
                  ? "border-white/10 bg-white/5 text-slate-300"
                  : "border-slate-900/10 bg-slate-50 text-slate-600"
              }`}
            >
              <span>Embedded Preview</span>
              <span>World Eduhub</span>
            </div>

            <div
              className={`overflow-hidden rounded-[26px] border ${
                isDark ? "border-white/10 bg-slate-950/80" : "border-slate-900/10 bg-white"
              }`}
            >
              <iframe
                src="/World_Eduhub/index.html"
                title="World Eduhub"
                className="h-[560px] w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
