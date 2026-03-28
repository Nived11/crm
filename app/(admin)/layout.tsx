  "use client";
  import Link from "next/link";
  import { usePathname, useRouter } from "next/navigation";
  import { supabase } from "@/lib/supabase"; // Supabase client import ചെയ്യുക

  export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    
    const isLoginPage = pathname === "/login";

    // 🚪 Professional Logout function
    const handleLogout = async () => {
      // 1. Supabase സെഷൻ സർവറിലും ക്ലയന്റിലും ക്ലിയർ ചെയ്യുന്നു
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error.message);
      } else {
        // 2. സെഷൻ പോയ കാര്യം മിഡിൽവെയറിനെ അറിയിക്കാൻ റിഫ്രഷ് ചെയ്യുക
        router.refresh();
        // 3. ലോഗിൻ പേജിലേക്ക് വിടുക
        router.push("/login");
      }
    };

    if (isLoginPage) return <>{children}</>;

    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-black">
        <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-gray-100 dark:border-zinc-900 p-6 flex flex-col">
          <div className="text-xl font-bold text-[#259566] mb-10 tracking-tight">VICEVERSA ADMIN</div>
          
          <nav className="space-y-4 flex-1">
            <Link 
              href="/admin" 
              className={`block text-sm font-medium transition-colors ${pathname === '/admin' ? 'text-[#259566]' : 'text-gray-500 hover:text-[#259566]'}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/projects" 
              className={`block text-sm font-medium transition-colors ${pathname.includes('/projects') ? 'text-[#259566]' : 'text-gray-500 hover:text-[#259566]'}`}
            >
              Projects
            </Link>
            <Link 
              href="/admin/messages" 
              className={`block text-sm font-medium transition-colors ${pathname.includes('/messages') ? 'text-[#259566]' : 'text-gray-500 hover:text-[#259566]'}`}
            >
              Messages
            </Link>
          </nav>

          {/* 🔑 Logout Button with Professional Logic */}
          <button 
            onClick={handleLogout}
            className="text-sm text-red-500 font-bold mt-auto text-left hover:bg-red-50 dark:hover:bg-red-950/20 p-2 rounded-lg transition-all"
          >
            Logout Session
          </button>
        </aside>

        <main className="flex-1 p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    );
  }