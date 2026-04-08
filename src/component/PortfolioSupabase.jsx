import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  FolderGit2,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Img } from "./Img";
import { Intro } from "./Intro";
import Seo from "./Seo";
import ThemeToggleButton from "./ThemeToggleButton";
import { supabase } from "../lib/supabase";

const SKILL_CATEGORY_DETAILS = {
  frontend: {
    label: "Frontend",
    summary: "Interfaces, motion, and component thinking.",
  },
  backend: {
    label: "Backend",
    summary: "APIs, auth flows, and application logic.",
  },
  data: {
    label: "Data",
    summary: "Persistence, schema design, and query work.",
  },
  tooling: {
    label: "Tooling",
    summary: "Deployment, containers, and dev workflow support.",
  },
  core: {
    label: "Core",
    summary: "Foundational skills that support the rest of the stack.",
  },
};

const EMPTY_CONTACT_FORM = {
  name: "",
  email: "",
  message: "",
  botField: "",
};

function normalizeTechStack(techStack) {
  if (Array.isArray(techStack)) {
    return techStack.filter(Boolean);
  }

  if (typeof techStack === "string" && techStack.trim()) {
    if (techStack.includes("|")) {
      return techStack
        .split("|")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    if (techStack.includes(",")) {
      return techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [techStack.trim()];
  }

  return [];
}

function getStatusLabel(status) {
  if (status === "ongoing") {
    return "Ongoing";
  }

  if (status === "coming_soon") {
    return "Coming Soon";
  }

  return "";
}

function getSkillCategory(skill) {
  const normalizedSkill = skill.toLowerCase();

  if (
    ["javascript", "react", "next.js", "next", "html", "css", "tailwind css"].some(
      (item) => normalizedSkill.includes(item)
    )
  ) {
    return "frontend";
  }

  if (
    ["express", "expressjs", "node", "jwt", "auth"].some((item) =>
      normalizedSkill.includes(item)
    )
  ) {
    return "backend";
  }

  if (
    ["mongo", "mysql", "postgres", "drizzle", "sql"].some((item) =>
      normalizedSkill.includes(item)
    )
  ) {
    return "data";
  }

  if (["docker", "git", "vercel"].some((item) => normalizedSkill.includes(item))) {
    return "tooling";
  }

  return "core";
}

function needsDarkIconPlate(skill) {
  const normalizedSkill = skill.toLowerCase();
  return normalizedSkill.includes("next");
}

function getSkillTone(index, isDark) {
  const tones = isDark
    ? [
        {
          accent: "from-cyan-400/20 via-cyan-300/8 to-transparent",
          badge: "border-cyan-400/20 bg-cyan-400/12 text-cyan-100",
          iconShell: "border-cyan-400/20 bg-cyan-400/12",
        },
        {
          accent: "from-emerald-300/18 via-emerald-200/8 to-transparent",
          badge: "border-emerald-300/20 bg-emerald-300/12 text-emerald-100",
          iconShell: "border-emerald-300/20 bg-emerald-300/12",
        },
        {
          accent: "from-amber-300/18 via-orange-200/8 to-transparent",
          badge: "border-amber-300/20 bg-amber-300/12 text-amber-100",
          iconShell: "border-amber-300/20 bg-amber-300/12",
        },
        {
          accent: "from-violet-300/18 via-fuchsia-200/8 to-transparent",
          badge: "border-violet-300/20 bg-violet-300/12 text-violet-100",
          iconShell: "border-violet-300/20 bg-violet-300/12",
        },
      ]
    : [
        {
          accent: "from-sky-200 via-sky-100/30 to-transparent",
          badge: "border-sky-200 bg-sky-50 text-sky-700",
          iconShell: "border-sky-200 bg-sky-50",
        },
        {
          accent: "from-emerald-200 via-emerald-100/30 to-transparent",
          badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
          iconShell: "border-emerald-200 bg-emerald-50",
        },
        {
          accent: "from-amber-200 via-amber-100/30 to-transparent",
          badge: "border-amber-200 bg-amber-50 text-amber-700",
          iconShell: "border-amber-200 bg-amber-50",
        },
        {
          accent: "from-violet-200 via-fuchsia-100/30 to-transparent",
          badge: "border-violet-200 bg-violet-50 text-violet-700",
          iconShell: "border-violet-200 bg-violet-50",
        },
      ];

  return tones[index % tones.length];
}

function getProjectTone(index, isDark) {
  const tones = isDark
    ? [
        {
          accent: "from-cyan-300/80 via-emerald-300/45 to-transparent",
          chip: "border-cyan-400/20 bg-cyan-400/12 text-cyan-100",
          emblem: "border-cyan-400/20 bg-cyan-400/10 text-cyan-100",
        },
        {
          accent: "from-amber-300/75 via-orange-300/40 to-transparent",
          chip: "border-amber-300/20 bg-amber-300/12 text-amber-100",
          emblem: "border-amber-300/20 bg-amber-300/10 text-amber-100",
        },
        {
          accent: "from-violet-300/75 via-fuchsia-300/40 to-transparent",
          chip: "border-violet-300/20 bg-violet-300/12 text-violet-100",
          emblem: "border-violet-300/20 bg-violet-300/10 text-violet-100",
        },
      ]
    : [
        {
          accent: "from-sky-300 via-cyan-200 to-transparent",
          chip: "border-sky-200 bg-sky-50 text-sky-700",
          emblem: "border-sky-200 bg-sky-50 text-sky-700",
        },
        {
          accent: "from-amber-300 via-orange-200 to-transparent",
          chip: "border-amber-200 bg-amber-50 text-amber-700",
          emblem: "border-amber-200 bg-amber-50 text-amber-700",
        },
        {
          accent: "from-violet-300 via-fuchsia-200 to-transparent",
          chip: "border-violet-200 bg-violet-50 text-violet-700",
          emblem: "border-violet-200 bg-violet-50 text-violet-700",
        },
      ];

  return tones[index % tones.length];
}

function getInitials(title) {
  return title
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    if (typeof window === "undefined") {
      setVisible(true);
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry], currentObserver) => {
        if (!entry.isIntersecting) {
          return;
        }

        setVisible(true);
        currentObserver.unobserve(entry.target);
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ kicker, title, description, isDark }) {
  return (
    <div className="max-w-3xl">
      <p
        className={`section-kicker ${
          isDark ? "text-[#eef8b4]/80" : "text-slate-500"
        }`}
      >
        {kicker}
      </p>
      <h2 className="display-font mt-3 text-4xl font-semibold leading-tight md:text-5xl">
        {title}
      </h2>
      <p
        className={`mt-4 max-w-2xl text-base leading-7 md:text-lg ${
          isDark ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function SkillCard({ skill, icon, index, isDark }) {
  const category = getSkillCategory(skill);
  const details = SKILL_CATEGORY_DETAILS[category];
  const tone = getSkillTone(index, isDark);
  const useDarkIconPlate = !isDark && needsDarkIconPlate(skill);
  const shellClassName = isDark
    ? "border-white/10 bg-white/[0.05] shadow-[0_24px_80px_rgba(1,8,11,0.38)]"
    : "border-slate-900/10 bg-white/82 shadow-[0_20px_60px_rgba(82,65,43,0.12)]";

  return (
    <div
      className={`panel-noise group relative h-full overflow-hidden rounded-[28px] border p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${shellClassName}`}
    >
      <div
        className={`pointer-events-none absolute inset-x-5 top-0 h-24 rounded-full bg-gradient-to-r ${tone.accent} blur-2xl`}
      />
      <div className="relative flex h-full flex-col gap-5">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${
              useDarkIconPlate
                ? "border-slate-900/70 bg-slate-950"
                : tone.iconShell
            }`}
          >
            <img
              src={icon}
              alt={`${skill} logo`}
              className="h-7 w-7 object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="min-w-0 flex-1">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}
            >
              {details.label}
            </span>
            <h3 className="mt-4 text-xl font-semibold">{skill}</h3>
          </div>
        </div>

        <p className={`text-sm leading-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          {details.summary}
        </p>
      </div>
    </div>
  );
}

function ProjectCard({ item, index, isDark, featured = false }) {
  const {
    title,
    description,
    tech_stack,
    github_url,
    preview_url,
    status,
    item_type,
  } = item;
  const tone = getProjectTone(index, isDark);
  const techItems = normalizeTechStack(tech_stack);
  const statusLabel = getStatusLabel(status);
  const isInternalPreview =
    typeof preview_url === "string" &&
    preview_url.startsWith("/") &&
    !preview_url.startsWith("//");
  const shellClassName = isDark
    ? "border-white/10 bg-white/[0.05] shadow-[0_28px_90px_rgba(1,8,11,0.42)]"
    : "border-slate-900/10 bg-white/82 shadow-[0_24px_72px_rgba(82,65,43,0.12)]";
  const titleClassName = featured ? "text-3xl md:text-[2rem]" : "text-2xl";
  const itemLabel =
    item_type === "learning" ? "Learning Work" : featured ? "Featured Project" : "Project";

  return (
    <div
      className={`panel-noise relative h-full overflow-hidden rounded-[32px] border p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${shellClassName} ${
        featured ? "lg:p-8" : ""
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r ${tone.accent}`}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${tone.chip}`}
            >
              {itemLabel}
            </span>
            {statusLabel ? (
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${
                  isDark
                    ? "border-white/10 bg-white/5 text-slate-200"
                    : "border-slate-900/10 bg-slate-50 text-slate-600"
                }`}
              >
                {statusLabel}
              </span>
            ) : null}
          </div>

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-semibold ${tone.emblem}`}
          >
            {getInitials(title)}
          </div>
        </div>

        <div className="mt-6">
          <h3 className={`display-font font-semibold leading-tight ${titleClassName}`}>
            {title}
          </h3>
          <p className={`mt-4 text-sm leading-7 md:text-base ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {description}
          </p>
        </div>

        {techItems.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {techItems.map((techItem) => (
              <span
                key={`${title}-${techItem}`}
                className={`rounded-full border px-3 py-1 text-sm ${
                  isDark
                    ? "border-white/10 bg-white/5 text-slate-200"
                    : "border-slate-900/10 bg-slate-50 text-slate-600"
                }`}
              >
                {techItem}
              </span>
            ))}
          </div>
        ) : null}

        {github_url || preview_url ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {github_url ? (
              <a
                href={github_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isDark
                    ? "bg-[#d9f36f] text-slate-950 hover:bg-[#e8fa92]"
                    : "bg-slate-950 text-white hover:bg-slate-800"
                }`}
              >
                <FolderGit2 size={16} />
                GitHub
              </a>
            ) : null}

            {preview_url && isInternalPreview ? (
              <Link
                to={preview_url}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isDark
                    ? "border-white/10 bg-white/5 text-slate-100 hover:border-[#d9f36f]/40 hover:text-[#eef8b4]"
                    : "border-slate-900/10 bg-white/70 text-slate-700 hover:border-slate-900/20 hover:text-slate-950"
                }`}
              >
                Preview
                <ArrowRight size={16} />
              </Link>
            ) : null}

            {preview_url && !isInternalPreview ? (
              <a
                href={preview_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isDark
                    ? "border-white/10 bg-white/5 text-slate-100 hover:border-[#d9f36f]/40 hover:text-[#eef8b4]"
                    : "border-slate-900/10 bg-white/70 text-slate-700 hover:border-slate-900/20 hover:text-slate-950"
                }`}
              >
                Live Preview
                <ExternalLink size={16} />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function PortfolioSupabase({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [contentError, setContentError] = useState("");
  const [contactForm, setContactForm] = useState(EMPTY_CONTACT_FORM);
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSubmitError, setContactSubmitError] = useState("");
  const isDark = theme === "dark";
  const origin =
    typeof window === "undefined" ? "https://example.com" : window.location.origin;
  const homeJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Tapash Roy",
      jobTitle: "Full-Stack Web Developer",
      description:
        "Full-Stack Web Developer from India building modern, responsive, and user-friendly web applications.",
      email: "mailto:troykinger000@gmail.com",
      image: `${origin}/tps2.webp`,
      url: `${origin}/`,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Tapash Roy Portfolio",
      url: `${origin}/`,
      author: {
        "@type": "Person",
        name: "Tapash Roy",
      },
    },
  ];

  const pageClassName = isDark
    ? "min-h-screen overflow-hidden bg-[#05131a] text-slate-100 transition-colors duration-300"
    : "min-h-screen overflow-hidden bg-[#f6f0e7] text-slate-900 transition-colors duration-300";
  const headerClassName = isDark
    ? "sticky top-0 z-30 border-b border-white/10 bg-[#05131a]/78 backdrop-blur-xl"
    : "sticky top-0 z-30 border-b border-slate-900/10 bg-[#f6f0e7]/80 backdrop-blur-xl";
  const navLinkClassName = isDark
    ? "text-sm font-medium text-slate-300 transition hover:text-[#eef8b4]"
    : "text-sm font-medium text-slate-600 transition hover:text-slate-950";
  const surfaceClassName = isDark
    ? "border-white/10 bg-white/[0.05] shadow-[0_24px_80px_rgba(1,8,11,0.42)]"
    : "border-slate-900/10 bg-white/80 shadow-[0_24px_70px_rgba(82,65,43,0.12)]";
  const mutedTextClassName = isDark ? "text-slate-300" : "text-slate-600";
  const subtleTextClassName = isDark ? "text-slate-400" : "text-slate-500";
  const primaryButtonClassName = isDark
    ? "inline-flex items-center gap-2 rounded-full bg-[#d9f36f] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e8fa92]"
    : "inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800";
  const secondaryButtonClassName = isDark
    ? "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-[#d9f36f]/40 hover:text-[#eef8b4]"
    : "inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900/20 hover:text-slate-950";
  const inputClassName = isDark
    ? "w-full rounded-2xl border border-white/10 bg-[#08161c] px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#d9f36f]/40"
    : "w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400";

  function handleContactInputChange(event) {
    const { name, value } = event.target;

    setContactForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (contactSubmitError) {
      setContactSubmitError("");
    }
  }

  async function handleContactSubmit(event) {
    event.preventDefault();

    if (isContactSubmitting) {
      return;
    }

    if (contactForm.botField.trim()) {
      return;
    }

    const nextName = contactForm.name.trim();
    const nextEmail = contactForm.email.trim();
    const nextMessage = contactForm.message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nextName || !nextEmail || !nextMessage) {
      setContactSubmitError("Please fill out your name, email, and message.");
      return;
    }

    if (!emailPattern.test(nextEmail)) {
      setContactSubmitError("Please enter a valid email address.");
      return;
    }

    if (nextMessage.length < 10) {
      setContactSubmitError("Please write a slightly longer message.");
      return;
    }

    if (!supabase) {
      setContactSubmitError(
        "Contact storage is not available right now. Please email me directly."
      );
      return;
    }

    setIsContactSubmitting(true);
    setContactSubmitError("");

    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: nextName,
        email: nextEmail,
        message: nextMessage,
      });

      if (error) {
        throw error;
      }

      setContactForm(EMPTY_CONTACT_FORM);
      navigate("/success");
    } catch (error) {
      console.error("Unable to save the contact message.", error);
      setContactSubmitError(
        "Your message could not be saved right now. Please try again or email me directly."
      );
    } finally {
      setIsContactSubmitting(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadPortfolioContent() {
      if (!supabase) {
        if (isMounted) {
          setContentError(
            "Supabase configuration is missing, so live content cannot be loaded."
          );
          setIsContentLoading(false);
        }
        return;
      }

      try {
        const [skillsResult, portfolioResult] = await Promise.all([
          supabase
            .from("skills")
            .select("skill, icon, sort_order")
            .eq("is_active", true)
            .order("sort_order", { ascending: true }),
          supabase
            .from("portfolio_items")
            .select(
              "title, description, tech_stack, github_url, preview_url, status, sort_order, item_type"
            )
            .eq("is_active", true)
            .order("sort_order", { ascending: true }),
        ]);

        if (!isMounted) {
          return;
        }

        if (skillsResult.error || portfolioResult.error) {
          throw skillsResult.error || portfolioResult.error;
        }

        setSkills(
          skillsResult.data?.length
            ? skillsResult.data.map(({ skill, icon }) => ({ skill, icon }))
            : []
        );
        setPortfolioItems(
          portfolioResult.data?.length
            ? portfolioResult.data.map((item) => ({
                ...item,
                item_type: item.item_type || "project",
              }))
            : []
        );
        setContentError("");
      } catch (error) {
        console.error("Unable to load Supabase portfolio content.", error);
        if (!isMounted) {
          return;
        }

        setSkills([]);
        setPortfolioItems([]);
        setContentError(
          "Live portfolio data could not be loaded right now."
        );
      } finally {
        if (isMounted) {
          setIsContentLoading(false);
        }
      }
    }

    loadPortfolioContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const projectItems = portfolioItems.filter(({ item_type }) => item_type !== "learning");
  const learningItems = portfolioItems.filter(({ item_type }) => item_type === "learning");
  const featuredProjects = projectItems.slice(0, 2);
  const archiveProjects = projectItems.slice(2);
  const skillCategoryCards = ["frontend", "backend", "data", "tooling", "core"]
    .map((key) => ({
      key,
      count: skills.filter(({ skill }) => getSkillCategory(skill) === key).length,
      ...SKILL_CATEGORY_DETAILS[key],
    }))
    .filter(({ count }) => count > 0);
  const highlightStats = [
    {
      value: isContentLoading ? "--" : String(skills.length).padStart(2, "0"),
      label: "Tools in active rotation",
    },
    {
      value: isContentLoading ? "--" : String(projectItems.length).padStart(2, "0"),
      label: "Projects shipped or in progress",
    },
    {
      value: isContentLoading ? "--" : String(learningItems.length).padStart(2, "0"),
      label: "Practice builds and learning labs",
    },
  ];
  const aboutCards = [
    {
      icon: Code2,
      title: "Interface-first thinking",
      text: "I like turning ideas into layouts that feel clear, fast, and easy to use.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Practical full-stack work",
      text: "From UI to data models, I enjoy connecting the visible product with real logic.",
    },
    {
      icon: Sparkles,
      title: "Steady learning rhythm",
      text: "Each project helps me sharpen performance, structure, and polish a little more.",
    },
  ];

  return (
    <>
      <Seo
        title="Tapash Roy | Full-Stack Web Developer"
        description="Tapash Roy is a Full-Stack Web Developer from India building responsive web applications with React, JavaScript, Node.js, Express, PostgreSQL, and modern UI design."
        path="/"
        image="/tps2.webp"
        type="website"
        jsonLd={homeJsonLd}
      />
      <Intro />
      <div className={pageClassName}>
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div
            className={`absolute left-[-10rem] top-[-7rem] h-[24rem] w-[24rem] rounded-full blur-3xl ${
              isDark ? "bg-cyan-400/10" : "bg-[#eadcc9]"
            }`}
          />
          <div
            className={`absolute bottom-[-10rem] right-[-8rem] h-[26rem] w-[26rem] rounded-full blur-3xl ${
              isDark ? "bg-[#d9f36f]/10" : "bg-[#dbe5c0]"
            }`}
          />
          <div
            className={`absolute left-1/2 top-1/3 h-[18rem] w-[18rem] -translate-x-1/2 rounded-full blur-3xl ${
              isDark ? "bg-amber-200/8" : "bg-white/60"
            }`}
          />
        </div>

        <header className={headerClassName}>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <a href="/" className="flex flex-col">
              <span className="display-font text-2xl font-semibold tracking-tight">
                Tapash Roy
              </span>
              <span className={`text-xs uppercase tracking-[0.28em] ${subtleTextClassName}`}>
                Full-Stack Developer
              </span>
            </a>

            <div className="flex flex-wrap items-center justify-end gap-4">
              <nav className="flex flex-wrap justify-end gap-4 sm:gap-6">
                <a href="#about" className={navLinkClassName}>
                  About
                </a>
                <a href="#skills" className={navLinkClassName}>
                  Skills
                </a>
                <a href="#projects" className={navLinkClassName}>
                  Projects
                </a>
                <a href="#contact" className={navLinkClassName}>
                  Contact
                </a>
              </nav>
              <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </header>

        <main>
          <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 md:pb-24 md:pt-20">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <Reveal>
                <div>
                  <p
                    className={`section-kicker ${
                      isDark ? "text-[#eef8b4]/80" : "text-slate-500"
                    }`}
                  >
                    Building thoughtful web experiences
                  </p>
                  <h1 className="display-font mt-5 max-w-3xl text-5xl font-semibold leading-[0.98] md:text-7xl">
                    Full-stack work with a calm interface and clear structure.
                  </h1>
                  <p className={`mt-6 max-w-2xl text-lg leading-8 md:text-xl ${mutedTextClassName}`}>
                    I&apos;m Tapash Roy, a developer from India focused on responsive
                    frontend work, practical backend integration, and portfolio pieces
                    that keep getting sharper with every iteration.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="#projects" className={primaryButtonClassName}>
                      View Projects
                      <ArrowRight size={16} />
                    </a>
                    <a href="#contact" className={secondaryButtonClassName}>
                      <Mail size={16} />
                      Contact Me
                    </a>
                  </div>

                  <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {highlightStats.map(({ value, label }) => (
                      <div
                        key={label}
                        className={`rounded-[28px] border p-5 backdrop-blur-xl ${surfaceClassName}`}
                      >
                        <p className="display-font text-4xl font-semibold">{value}</p>
                        <p className={`mt-3 text-sm leading-6 ${subtleTextClassName}`}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal className="lg:pt-6">
                <aside
                  className={`panel-noise overflow-hidden rounded-[32px] border p-6 backdrop-blur-xl md:p-8 ${surfaceClassName}`}
                >
                  <div className="relative">
                    <div
                      className={`absolute inset-x-10 top-0 h-20 rounded-full blur-3xl ${
                        isDark ? "bg-cyan-300/12" : "bg-[#eadcc9]"
                      }`}
                    />
                    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/10 p-3">
                      <div
                        className={`aspect-[4/4.3] overflow-hidden rounded-[24px] ${
                          isDark ? "bg-slate-900/80" : "bg-[#f2ede5]"
                        }`}
                      >
                        <Img />
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${
                          isDark
                            ? "border-[#d9f36f]/20 bg-[#d9f36f]/10 text-[#eef8b4]"
                            : "border-slate-900/10 bg-white/80 text-slate-600"
                        }`}
                      >
                        Open to growth-focused work
                      </span>
                    </div>

                    <p className={`text-sm leading-7 ${mutedTextClassName}`}>
                      I enjoy building interfaces that feel composed, then wiring them
                      into real application data with tools like React, Express,
                      PostgreSQL, MongoDB, and Supabase.
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin size={18} className={isDark ? "text-[#d9f36f]" : "text-slate-700"} />
                        <span className={mutedTextClassName}>Based in India</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BadgeCheck
                          size={18}
                          className={isDark ? "text-[#d9f36f]" : "text-slate-700"}
                        />
                        <span className={mutedTextClassName}>
                          Focused on clean UI, responsive design, and reliable data flow
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Sparkles
                          size={18}
                          className={isDark ? "text-[#d9f36f]" : "text-slate-700"}
                        />
                        <span className={mutedTextClassName}>
                          Currently refining portfolio work and full-stack practice builds
                        </span>
                      </div>
                    </div>
                  </div>
                </aside>
              </Reveal>
            </div>
          </section>

          <section id="about" className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <Reveal>
                <SectionHeading
                  kicker="About"
                  title="A developer who keeps the product feel as important as the product logic."
                  description="I enjoy the space where UI polish meets backend structure. That usually means translating ideas into responsive layouts, then supporting them with real data, sensible schemas, and maintainable code."
                  isDark={isDark}
                />
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-2">
                {aboutCards.map(({ icon: Icon, title, text }, index) => (
                  <Reveal
                    key={title}
                    className={index === 0 ? "sm:col-span-2" : ""}
                  >
                    <div
                      className={`panel-noise h-full rounded-[28px] border p-6 backdrop-blur-xl ${surfaceClassName}`}
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                          isDark
                            ? "border-white/10 bg-white/5 text-[#eef8b4]"
                            : "border-slate-900/10 bg-slate-50 text-slate-800"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                      <p className={`mt-3 text-sm leading-7 ${mutedTextClassName}`}>{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section id="skills" className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <Reveal>
              <SectionHeading
                kicker="Skills"
                title="A stack that is growing in depth, not just in list length."
                description="These are the tools I use most often right now. I wanted this section to feel curated, so the skills are grouped by the kind of work they support rather than shown as a flat badge wall."
                isDark={isDark}
              />
            </Reveal>

            <Reveal className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                {skillCategoryCards.map(({ key, count, label, summary }, index) => {
                  const tone = getSkillTone(index, isDark);

                  return (
                    <div
                      key={key}
                      className={`rounded-full border px-4 py-3 text-sm backdrop-blur ${
                        isDark
                          ? "border-white/10 bg-white/[0.04]"
                          : "border-slate-900/10 bg-white/80"
                      }`}
                    >
                      <span
                        className={`mr-2 inline-flex rounded-full border px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] ${tone.badge}`}
                      >
                        {label}
                      </span>
                      <span className="font-semibold">{count}</span>
                      <span className={`ml-2 ${subtleTextClassName}`}>{summary}</span>
                    </div>
                  );
                })}

                {isContentLoading ? (
                  <span className={`text-sm ${subtleTextClassName}`}>Loading latest data...</span>
                ) : null}
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {skills.map(({ skill, icon }, index) => (
                <Reveal key={skill} className="h-full">
                  <SkillCard skill={skill} icon={icon} index={index} isDark={isDark} />
                </Reveal>
              ))}
            </div>

            {!isContentLoading && skills.length === 0 ? (
              <Reveal className="mt-6">
                <p className={`text-sm ${subtleTextClassName}`}>
                  No skills were found in the database yet.
                </p>
              </Reveal>
            ) : null}
          </section>

          <section id="projects" className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <Reveal>
              <SectionHeading
                kicker="Projects"
                title="Small builds, real experiments, and a clearer way to scan the work."
                description="I reorganized the portfolio to make the strongest projects easier to notice first, while still leaving room for learning work that shows how I practice and improve."
                isDark={isDark}
              />
            </Reveal>

            {contentError ? (
              <Reveal className="mt-6">
                <p className={`text-sm ${isDark ? "text-amber-300" : "text-amber-700"}`}>
                  {contentError}
                </p>
              </Reveal>
            ) : null}

            {featuredProjects.length ? (
              <>
                <Reveal className="mt-10">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold uppercase tracking-[0.26em] text-current/70">
                      Featured
                    </h3>
                    <span className={`text-sm ${subtleTextClassName}`}>
                      The projects I want people to understand first
                    </span>
                  </div>
                </Reveal>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  {featuredProjects.map((item, index) => (
                    <Reveal key={item.title} className="h-full">
                      <ProjectCard item={item} index={index} isDark={isDark} featured />
                    </Reveal>
                  ))}
                </div>
              </>
            ) : null}

            {archiveProjects.length ? (
              <>
                <Reveal className="mt-12">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold uppercase tracking-[0.26em] text-current/70">
                      Project Archive
                    </h3>
                    <span className={`text-sm ${subtleTextClassName}`}>
                      More pieces that show range and consistency
                    </span>
                  </div>
                </Reveal>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {archiveProjects.map((item, index) => (
                    <Reveal key={item.title} className="h-full">
                      <ProjectCard item={item} index={index + 2} isDark={isDark} />
                    </Reveal>
                  ))}
                </div>
              </>
            ) : null}

            {learningItems.length ? (
              <>
                <Reveal className="mt-12">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold uppercase tracking-[0.26em] text-current/70">
                      Learning Lab
                    </h3>
                    <span className={`text-sm ${subtleTextClassName}`}>
                      Practice work that strengthens fundamentals
                    </span>
                  </div>
                </Reveal>

                <div className="mt-6 grid gap-5 lg:grid-cols-3">
                  {learningItems.map((item, index) => (
                    <Reveal key={item.title} className="h-full">
                      <ProjectCard item={item} index={index} isDark={isDark} />
                    </Reveal>
                  ))}
                </div>
              </>
            ) : null}

            {!isContentLoading && portfolioItems.length === 0 ? (
              <Reveal className="mt-6">
                <p className={`text-sm ${subtleTextClassName}`}>
                  No project entries were found in the database yet.
                </p>
              </Reveal>
            ) : null}
          </section>

          <section id="contact" className="mx-auto max-w-6xl px-6 py-20 md:py-24">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <Reveal>
                <div
                  className={`panel-noise h-full rounded-[32px] border p-7 backdrop-blur-xl md:p-8 ${surfaceClassName}`}
                >
                  <p
                    className={`section-kicker ${
                      isDark ? "text-[#eef8b4]/80" : "text-slate-500"
                    }`}
                  >
                    Contact
                  </p>
                  <h2 className="display-font mt-4 text-4xl font-semibold leading-tight">
                    Let&apos;s build something clear, useful, and polished.
                  </h2>
                  <p className={`mt-5 text-base leading-7 ${mutedTextClassName}`}>
                    If you&apos;re hiring, collaborating, or just want to talk through
                    an idea, send a message here. It comes straight to my email.
                  </p>

                  <div className="mt-8 space-y-4">
                    <a
                      href="mailto:troykinger000@gmail.com"
                      className={`flex items-center gap-3 rounded-[22px] border px-4 py-4 transition ${
                        isDark
                          ? "border-white/10 bg-white/5 text-slate-100 hover:border-[#d9f36f]/40 hover:text-[#eef8b4]"
                          : "border-slate-900/10 bg-white/75 text-slate-700 hover:border-slate-900/20 hover:text-slate-950"
                      }`}
                    >
                      <Mail size={18} />
                      <span>troykinger000@gmail.com</span>
                    </a>

                    <div
                      className={`rounded-[22px] border px-4 py-4 ${
                        isDark
                          ? "border-white/10 bg-white/5 text-slate-300"
                          : "border-slate-900/10 bg-white/75 text-slate-600"
                      }`}
                    >
                      Available for portfolio sites, React UI work, and full-stack practice builds that need a cleaner front end.
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div
                  className={`panel-noise rounded-[32px] border p-7 backdrop-blur-xl md:p-8 ${surfaceClassName}`}
                >
                  <form
                    onSubmit={handleContactSubmit}
                    className="space-y-5"
                  >
                    <div className="hidden">
                      <label>
                        Don&apos;t fill this out:
                        <input
                          name="botField"
                          value={contactForm.botField}
                          onChange={handleContactInputChange}
                          autoComplete="off"
                          tabIndex="-1"
                        />
                      </label>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold">Your Name</label>
                        <input
                          name="name"
                          required
                          value={contactForm.name}
                          onChange={handleContactInputChange}
                          className={inputClassName}
                          placeholder="Enter your name"
                          disabled={isContactSubmitting}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold">Your Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={contactForm.email}
                          onChange={handleContactInputChange}
                          className={inputClassName}
                          placeholder="Enter your email"
                          disabled={isContactSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">Message</label>
                      <textarea
                        name="message"
                        required
                        rows="6"
                        value={contactForm.message}
                        onChange={handleContactInputChange}
                        className={inputClassName}
                        placeholder="Tell me a little about the work or idea you have in mind..."
                        disabled={isContactSubmitting}
                      />
                    </div>

                    {contactSubmitError ? (
                      <p className={`text-sm ${isDark ? "text-amber-300" : "text-amber-700"}`}>
                        {contactSubmitError}
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      className={`${primaryButtonClassName} ${
                        isContactSubmitting ? "cursor-not-allowed opacity-70" : ""
                      }`}
                      disabled={isContactSubmitting}
                    >
                      {isContactSubmitting ? "Saving Message..." : "Send Message"}
                      <ArrowRight size={16} />
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <footer
          className={`border-t ${
            isDark ? "border-white/10" : "border-slate-900/10"
          }`}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
            <p className={subtleTextClassName}>
              &copy; {new Date().getFullYear()} Tapash Roy. Designed to feel sharper and easier to scan.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#skills" className={navLinkClassName}>
                Skills
              </a>
              <a href="#projects" className={navLinkClassName}>
                Projects
              </a>
              <a href="#contact" className={navLinkClassName}>
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
