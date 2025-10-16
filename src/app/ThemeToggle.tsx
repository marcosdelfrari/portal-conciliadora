"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Alternar tema"
      onClick={toggleTheme}
      className="px-3 py-2 rounded-md border text-sm transition-colors bg-background text-foreground border-black/10 dark:border-white/20 hover:bg-black/[.04] dark:hover:bg-white/[.06] flex items-center justify-center"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
