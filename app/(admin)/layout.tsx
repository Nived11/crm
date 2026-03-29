"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "@/hooks/useLogout"; 
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X
} from "lucide-react";
import { header } from "framer-motion/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useLogout();
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isLoginPage = pathname === "/login";
  if (isLoginPage) return <>{children}</>;

  // 1. Extended Menu Items with Descriptions
  const menuItems = [
    { 
      name: "Dashboard",
      header: "Dashboard Overview", 
      href: "/admin", 
      icon: LayoutDashboard, 
      desc: "Get an overview of your admin panel." 
    },
    { 
      name: "Projects", 
      header: "Project Management",
      href: "/admin/projects", 
      icon: Briefcase, 
      desc: "Manage and track all your ongoing works." 
    },
    { 
      name: "Clients", 
      header: "Client Relations",
      href: "/admin/clients", 
      icon: Users, 
      desc: "Keep updated with your client base and relations." 
    },
    { 
      name: "Messages", 
      header: "Message Center",
      href: "/admin/messages", 
      icon: MessageSquare, 
      desc: "Check your latest inquiries and conversations." 
    },
    { 
      name: "Settings", 
      header: "Admin Settings",
      href: "/admin/settings", 
      icon: Settings, 
      desc: "Customize your admin panel and preferences." 
    },
  ];

  // Logic to find current page data
  const currentPage = menuItems.find(item => 
    pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
  );
  
  const pageTitle = currentPage ? currentPage.header : "Admin";
  const pageDesc = currentPage ? currentPage.desc : "Manage your workspace efficiently.";

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 w-full h-16 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 z-50">
        <img src="/viceversalogo.png" alt="Logo" className="w-10 h-10" /> <div className="border-b border-brand/30">VICEVERSA</div>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-zinc-500">
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:relative top-0 left-0 h-full bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 
          transition-all duration-300 ease-in-out z-50 flex flex-col
          ${isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-22" : "lg:w-60"}
        `}
      >
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="cursor-pointer hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full p-1.5 text-zinc-500 hover:text-brand transition-all shadow-md z-[60]"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        <div className="h-20 flex items-center px-6 border-b border-zinc-50 dark:border-zinc-900/50">
          <div className="flex items-center gap-3 justify-center">
            <img src="/viceversalogo.png" alt="Logo" className="w-10 h-10" />
             <span className={`text-md font-semibold border-b border-brand/30 tracking-tight text-zinc-900 dark:text-zinc-100 transition-opacity duration-200 ${(isCollapsed && "lg:hidden")}`}>
               VICEVERSA
             </span>
          </div>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.name}
                href={item.href} 
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-brand/10 text-brand font-bold shadow-sm" 
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <item.icon size={22} className="min-w-[22px]" />
                <span className={`text-sm tracking-wide transition-opacity duration-200 ${(isCollapsed && "lg:hidden")}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={logout}
            className={`bg-white dark:bg-red-500/5 dark:hover:bg-red-500/50 border border-red-200 dark:border-red-900/50  rounded-[15px]  dark:hover:bg-red-900/10 cursor-pointer flex items-center gap-4 w-full px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/10 transition-all ${isCollapsed ? "lg:justify-center" : "justify-start"}`}
          >
            <LogOut size={22} className="min-w-[22px]" />
            {!isCollapsed && <span className="font-bold text-sm tracking-wide">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto bg-background transition-all duration-300">
        
        {/* 🛠️ DYNAMIC TOP HEADER (Desktop Only) */}
        <header className="hidden lg:flex px-10  max-w-7xl mx-auto  w-full py-6 mt-6 bg-black dark:bg-black h-30 items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter dark:text-white">
              {pageTitle}
            </h1>
            <p className="ttext-gray-500 text-sm mt-1 font-medium dark:text-zinc-500">{pageDesc}</p>
          </div>

          <div className="flex items-center gap-4 px-5 py-2.5  rounded-2xl shadow-sm transition-all ">
             <div className="flex flex-col items-end">
               <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight uppercase">Admin</span>
                <span className="text-xs text-gray-500 dark:text-zinc-400">welcome back !</span>
             </div>
             {/* Cartoon Image Avatar */}
             <div className="w-15 h-15 rounded-full bg-brand/10 border-2 border-brand/20 overflow-hidden flex items-center justify-center">
               <img 
                  src="/adminico.png"
                 alt="Admin Avatar"
                 className="w-11 h-11 object-cover "
               />
             </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-10 pt-24 lg:pt-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}