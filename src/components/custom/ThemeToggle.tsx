import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  function toggleTheme() {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  }

  return (
    <Button onClick={toggleTheme} variant={"outline"} className="my-auto">
      {theme === "dark" ? (
        <>
          <Sun className="w-4 h-4 mr-2" /> Light
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 mr-2" /> Dark
        </>
      )}
    </Button>
  );
}
