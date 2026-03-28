import Link from "next/link";

export default function Footer() {
  return (
    /* bg-gray-50 maatti variable use cheyyunnu */
    <footer className="bg-[var(--background)] text-gray-600 dark:text-gray-400 py-16 border-t border-gray-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* 1. Branding */}
        <div>
          <h2 className="text-gray-900 dark:text-white text-2xl font-bold tracking-tighter mb-4">
            VICEVERSA<span className="text-[#259566]">.</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 max-w-xs">
            High-end digital solutions crafted with MERN & Next.js. 
            Transforming startups from Kerala to the world.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold mb-5">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-[#259566] transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-[#259566] transition-colors">Services</Link></li>
            <li><Link href="/projects" className="hover:text-[#259566] transition-colors">Projects</Link></li>
            <li><Link href="/contact" className="hover:text-[#259566] transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* 3. Social Presence */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold mb-5">Social Presence</h3>
          <p className="text-sm mb-4 font-medium dark:text-gray-300">hello@viceversa.agency</p>
          <div className="flex space-x-3">
            <span className="text-xs font-bold border border-gray-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg hover:bg-white dark:hover:bg-zinc-900 hover:border-[#259566] transition-all cursor-pointer">
              Instagram
            </span>
            <span className="text-xs font-bold border border-gray-200 dark:border-zinc-800 px-3 py-1.5 rounded-lg hover:bg-white dark:hover:bg-zinc-900 hover:border-[#259566] transition-all cursor-pointer">
              LinkedIn
            </span>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-16 text-[10px] uppercase tracking-widest text-gray-400 dark:text-zinc-600 font-bold">
        © {new Date().getFullYear()} Viceversa Agency — Kerala, India.
      </div>
    </footer>
  );
}