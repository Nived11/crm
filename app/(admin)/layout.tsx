"use client";

import { useState, useEffect } from "react";
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useLogout();
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const isLoginPage = pathname === "/login";
  if (isLoginPage) return <div className="dark bg-black min-h-screen">{children}</div>;

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

  const currentPage = menuItems.find(item => 
    pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
  );
  
  const pageTitle = currentPage ? currentPage.header : "Admin";
  const pageDesc = currentPage ? currentPage.desc : "Manage your workspace efficiently.";

  return (
    <div className="dark flex h-screen bg-black text-white overflow-hidden font-sans">
      
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 w-full h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <img src="/viceversalogo.png" alt="Logo" className="w-8 h-8" /> 
          <div className="border-b border-brand/30 text-xs font-bold">VICEVERSA</div>
        </div>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-zinc-400">
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:relative top-0 left-0 h-full bg-black border-r border-zinc-900 
          transition-all duration-300 ease-in-out z-50 flex flex-col
          ${isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-22" : "lg:w-60"}
        `}
      >
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="cursor-pointer hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-800 rounded-full p-1.5 text-zinc-400 hover:text-brand transition-all shadow-md z-[60]"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        <div className="h-20 flex items-center px-6 border-b border-zinc-900">
          <div className="flex items-center gap-3 justify-center">
            <img src="/viceversalogo.png" alt="Logo" className="w-10 h-10" />
             <span className={`text-md font-semibold border-b border-brand/30 tracking-tight text-white transition-opacity duration-200 ${(isCollapsed && "lg:hidden")}`}>
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
                    ? "bg-brand/10 text-brand font-bold" 
                    : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100"
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
            className={`bg-red-500/5 hover:bg-red-500/10 border border-red-900/30 cursor-pointer flex items-center gap-4 w-full px-4 py-4 rounded-2xl text-red-500 transition-all ${isCollapsed ? "lg:justify-center" : "justify-start"}`}
          >
            <LogOut size={22} className="min-w-[22px]" />
            {!isCollapsed && <span className="font-bold text-sm tracking-wide">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto bg-black transition-all duration-300">
        
        {/* HEADER */}
        <header className="hidden lg:flex px-10 max-w-7xl mx-auto w-full py-6 mt-6 h-30 items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter text-white">
              {pageTitle}
            </h1>
            <p className="text-zinc-500 text-sm mt-1 font-medium">{pageDesc}</p>
          </div>

          <div className="flex items-center gap-4 px-5 py-2.5 transition-all ">
             <div className="flex flex-col items-end">
               <span className="text-sm font-bold text-zinc-100 tracking-tight uppercase">Admin</span>
                <span className="text-xs text-zinc-500">welcome back !</span>
             </div>
             <div className="w-15 h-15 rounded-full bg-brand/10 border-2 border-brand/20 overflow-hidden flex items-center justify-center">
               <img 
                  src="/adminico.png"
                  alt="Admin Avatar"
                  className="w-11 h-11 object-cover"
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