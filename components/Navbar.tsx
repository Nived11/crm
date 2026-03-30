  "use client";
  import Link from "next/link";
  import { useTheme } from "next-themes";
  import { useEffect, useState } from "react";
  import { Moon, Sun, Home, Briefcase, Info, Mail, LayoutGrid, Terminal } from "lucide-react";

  export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return null;

    const leftLinks = [
      { name: "Home", href: "/", icon: Home },
      { name: "About", href: "/about", icon: Info },
      { name: "Services", href: "/services", icon: LayoutGrid },
    ];

    const rightLinks = [
      { name: "Careers", href: "/careers", icon: Terminal },
      { name: "Projects", href: "/projects", icon: Briefcase },
      { name: "Contact", href: "/contact", icon: Mail },
    ];

    return (
      <>
        <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-5 md:px-12 pointer-events-none">
          <div className="hidden md:block w-12"></div>

          {/* --- CENTER PILL --- */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <div className="hidden md:flex items-center gap-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-6 py-2 rounded-full shadow-2xl transition-all duration-500">
              {leftLinks.map((link) => (
                <Link key={link.name} href={link.href} className="px-4 py-2 text-[11px] font-bold text-zinc-900 dark:text-zinc-300 hover:text-brand transition-all uppercase tracking-wider">
                  {link.name}
                </Link>
              ))}

              <div className="px-4 mx-2 flex flex-col items-center justify-center min-w-[80px]">
                <Link href="/">
                  <img src="/viceversalogo.png" alt="Logo" className="w-12 h-8 object-contain hover:scale-110 transition-transform" />
                </Link>
                <div className="text-[10px] font-black tracking-[0.2em] text-brand uppercase -mt-1">viceversa</div>
              </div>

              {rightLinks.map((link) => (
                <Link key={link.name} href={link.href} className="px-4 py-2 text-[11px] font-bold text-zinc-900 dark:text-zinc-300 hover:text-brand transition-all uppercase tracking-wider">
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Top Branding */}
            <div className="flex md:hidden items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-5 py-2.5 rounded-full shadow-xl">
              <img src="/viceversalogo.png" alt="Logo" className="w-8 h-8 object-contain" />
              <span className="text-sm font-black tracking-tighter text-zinc-900 dark:text-white uppercase">ViceVersa</span>
            </div>
          </div>

          {/* --- SIMPLE THEME TOGGLE --- */}
          <div className="pointer-events-auto">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-3 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-300 hover:text-brand transition-all border border-zinc-200 dark:border-zinc-800 shadow-xl"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] z-50">
          <div className="bg-white dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-800/50 rounded-[2.5rem] px-6 py-4 shadow-2xl flex justify-between items-center transition-all">
            {[...leftLinks, ...rightLinks].map((link) => (
              <Link key={link.name} href={link.href} className="flex flex-col items-center gap-1.5 text-zinc-500 dark:text-zinc-400 hover:text-brand transition-all active:scale-90">
                <link.icon size={20} />
                <span className="text-[8px] font-bold uppercase tracking-widest">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }