"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const useThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return { theme, handleToggleTheme };
};

const ThemeIcon = () => {
  const { theme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <span>
          <Moon className="group-hover:rotate-12" />
        </span>
      ) : (
        <span>
          <Sun className="group-hover:rotate-12" />
        </span>
      )}
    </>
  );
};

export { useThemeToggle, ThemeIcon };
