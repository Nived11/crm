"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration mismatch ozhivakkan
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="flex justify-between items-center p-5 bg-[var(--background)]/80 backdrop-blur-md text-[var(--foreground)] border-b border-gray-100 dark:border-zinc-900 sticky top-0 z-50 transition-all duration-300">
      
      {/* 1. Branding */}
      <div className="text-xl font-bold tracking-tighter text-[#259566]">
        <Link href="/">VICEVERSA</Link>
      </div>

      {/* 2. Navigation Links (Contact included here) */}
      <div className="space-x-8 hidden md:flex items-center">
        <Link href="/" className="text-sm font-semibold hover:text-[#259566] transition-colors">
          Home
        </Link>
        <Link href="/services" className="text-sm font-semibold hover:text-[#259566] transition-colors">
          Services
        </Link>
        <Link href="/projects" className="text-sm font-semibold hover:text-[#259566] transition-colors">
          Projects
        </Link>
        <Link href="/about" className="text-sm font-semibold hover:text-[#259566] transition-colors">
          About
        </Link>
        <Link href="/contact" className="text-sm font-semibold hover:text-[#259566] transition-colors">
          Contact
        </Link>
      </div>

      {/* 3. Theme Toggle Button (Right Side) */}
      <div className="flex items-center">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:text-[#259566] dark:hover:text-[#259566] transition-all border border-transparent dark:border-zinc-800"
          aria-label="Toggle Dark Mode"
        >
          {mounted ? (
            theme === "dark" ? <Sun size={18} /> : <Moon size={18} />
          ) : (
            <div className="w-[18px] h-[18px]" /> 
          )}
        </button>
      </div>
    </nav>
  );
}