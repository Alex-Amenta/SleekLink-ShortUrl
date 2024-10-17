"use client";

import { useEffect, useState } from "react";
import { useThemeToggle, ThemeIcon } from "@/hooks/useThemeToggle";

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { handleToggleTheme } = useThemeToggle();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={handleToggleTheme}
      className={`hover:bg-black/10 dark:hover:bg-white/10 transition rounded-md group ${className}`}
    >
      <ThemeIcon />
    </button>
  );
};

export default ThemeSwitcher;
