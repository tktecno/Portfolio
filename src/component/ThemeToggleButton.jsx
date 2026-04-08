import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton({ theme, toggleTheme }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold shadow-sm backdrop-blur transition ${
        isDark
          ? "border-white/10 bg-white/[0.05] text-slate-100 hover:border-[#d9f36f]/40 hover:text-[#eef8b4]"
          : "border-slate-900/10 bg-white/80 text-slate-700 hover:border-slate-900/20 hover:text-slate-950"
      }`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden sm:inline">{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}
