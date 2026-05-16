import { Link } from "react-router-dom";
import { Mail, ArrowUpRight, Phone } from "lucide-react";
import { 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube, 
  FaWhatsapp 
} from "react-icons/fa6";

export const Footer = () => {
  const services = [
    "Web Applications",
    "Custom Business Website",
    "E-commerce Website",
    "CMS-Based Development",
    "Landing Pages & Portfolios",
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Projects", href: "/projects" },
    { name: "Contact Us", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: FaInstagram, href: "#" },
    { name: "LinkedIn", icon: FaLinkedinIn, href: "#" },
    { name: "WhatsApp", icon: FaWhatsapp, href: "https://wa.me/91XXXXXXXXXX" }, 
    { name: "YouTube", icon: FaYoutube, href: "#" },
  ];

  return (
    <footer className="relative bg-black text-zinc-400 pt-16 pb-6 border-t border-zinc-900 transition-colors duration-300 overflow-hidden">
      
      {/* 1. The Big Background Text (Antigravity Style) */}
      <div className="absolute bottom-[-15%] left-0 w-full overflow-hidden pointer-events-none select-none z-0">
        <h1 className="text-[18vw] font-black text-zinc-900/40 tracking-widest leading-none text-center">
          COSMOS
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          
          {/* Branding Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <img 
                src="crm.png" 
                alt="Logo" 
                className="w-8 h-8 object-contain" 
              />
              <h2 className="text-white text-lg font-black tracking-tighter uppercase">
                COSMOS<span className="text-brand">.</span>
              </h2>
            </div>
            <p className="text-[11px] sm:text-[12px] leading-relaxed max-w-[220px] font-medium opacity-70">
              Crafting digital excellence with creativity and precision. 
              Transforming startups from Kerala to the world.
            </p>
            
            {/* Contact Details */}
            <div className="space-y-2.5">
              <a href="mailto:cosmos.in@gmail.com" className="flex items-center gap-2 text-[12px] font-bold text-white hover:text-brand transition-all">
                <Mail size={14} className="text-brand" />
                cosmos.in@gmail.com
              </a>
              <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-2 text-[12px] font-bold text-white hover:text-brand transition-all">
                <Phone size={14} className="text-brand" />
                +91 XXXXX XXXXX
              </a>
            </div>
          </div>

          {/* 2. Services Column */}
          <div className="lg:flex lg:justify-center">
            <div className="space-y-5">
              <h3 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="text-[12px] font-medium opacity-70 hover:text-brand cursor-default transition-all">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Navigation Column */}
          <div className="lg:flex lg:justify-center">
            <div className="space-y-5">
              <h3 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Explore</h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-[12px] font-bold hover:text-brand transition-all flex items-center gap-1 group">
                      {link.name}
                      <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. Social Presence */}
          <div className="lg:text-right space-y-6">
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Connect with Us</h3>
            <div className="flex gap-2 lg:justify-end">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-full hover:border-brand hover:text-brand transition-all group"
                  title={social.name}
                >
                  <social.icon size={14} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
            <p className="text-[10px] font-bold text-zinc-500 italic">
              "Let's build something <br className="hidden lg:block" /> exceptional together."
            </p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-16 pt-6 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-black tracking-widest text-zinc-500 uppercase">
          <div className="opacity-60">© {new Date().getFullYear()} Cosmos. All Rights Reserved</div>
          <div className="flex items-center gap-4">
             <span className="flex items-center gap-1.5"><div className="w-1 h-1 bg-brand rounded-full animate-pulse"></div> Team Brandname </span>
          </div>
        </div>
      </div>
    </footer>
  );
};