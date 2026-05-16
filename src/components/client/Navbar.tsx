import { Link } from "react-router-dom";
import { Home, Briefcase, Info, Mail, LayoutGrid, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export const Navbar = () => {

  const leftLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About Us", href: "/about", icon: Info },
    { name: "Services", href: "/services", icon: LayoutGrid },
  ];

  const rightLinks = [
    { name: "Careers", href: "/careers", icon: Terminal },
    { name: "Projects", href: "/projects", icon: Briefcase },
    { name: "Contact Us", href: "/contact", icon: Mail },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-6 w-full z-50 flex justify-between items-center px-6 py-5 md:px-12 pointer-events-none"
      >
        {/* Placeholder to balance the flex-between alongside the right theme toggle */}
        <div className="w-10"></div> 

        {/* --- CENTER PILL --- */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          <div className="hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-zinc-200/50 px-6 py-2 rounded-full shadow-lg shadow-zinc-200/50 transition-all duration-500">
            {leftLinks.map((link) => (
              <Link key={link.name} to={link.href} className="px-4 py-2 text-[11px] uppercase font-bold text-zinc-900 hover:text-brand transition-all  tracking-wider">
                {link.name}
              </Link>
            ))}

            <div className="px-4 mx-2 flex flex-col items-center justify-center min-w-[80px]">
              <Link to="/">
                <img src="crm.png" alt="Logo" className="w-10 h-10 object-contain hover:scale-110 transition-transform" />
              </Link>
              {/* <div className="text-[10px] font-black tracking-[0.2em] text-brand uppercase -mt-1"></div> */}
            </div>

            {rightLinks.map((link) => (
              <Link key={link.name} to={link.href} className="px-4 py-2 text-[11px] uppercase font-bold text-zinc-900 hover:text-brand transition-all  tracking-wider">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Top Branding */}
          <div className="flex md:hidden flex-col    items-center justify-center bg-white/80 backdrop-blur-xl border border-zinc-200/50 px-2 py-0.5  rounded-full shadow-lg shadow-zinc-200/50 min-w-[120px]">
            <Link to="/">
              <img src="crm.png" alt="Logo" className="w-9 h-9 object-contain active:scale-95 transition-transform" />
            </Link>
            {/* <div className="text-[8px] font-black tracking-[0.2em] text-brand uppercase mt-1">App name</div> */}
          </div>
        </div>

        {/* --- THEME TOGGLE REMOVED --- */}
      </motion.nav>

      {/* Mobile Bottom Nav */}
      <motion.div 
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] z-50 pointer-events-none"
      >
        <div className="pointer-events-auto bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-[2.5rem] px-4 py-2.5 shadow-2xl flex justify-between items-center transition-all">
          {[...leftLinks, ...rightLinks].filter(link => link.name !== "Careers").map((link) => (
            <Link key={link.name} to={link.href} className="flex flex-col items-center gap-1 text-zinc-500 dark:text-zinc-400 hover:text-brand transition-all active:scale-90">
              <link.icon size={18} />
              <span className="text-[7px] font-bold uppercase tracking-widest">{link.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
};
