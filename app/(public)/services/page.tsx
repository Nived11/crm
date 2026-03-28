"use client";
import { motion } from "framer-motion";
import { Code2, Palette, Globe, Smartphone, BarChart3, Rocket } from "lucide-react";

const services = [
  { title: "Web Development", icon: <Code2 /> },
  { title: "UI/UX Design", icon: <Palette /> },
  { title: "E-commerce Solutions", icon: <Globe /> },
  { title: "Mobile App Dev", icon: <Smartphone /> },
  { title: "SEO Optimization", icon: <BarChart3 /> },
  { title: "Digital Strategy", icon: <Rocket /> },
];

export default function ServicesPage() {
  return (
    <div className="text-gray-900 dark:text-white min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">Our <span className="text-[#259566]">Services</span></h1>
          <p className="text-gray-500 dark:text-gray-400">End-to-end digital solutions for modern businesses.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="p-10 border border-gray-100 dark:border-zinc-900 rounded-3xl bg-white dark:bg-zinc-900/50 hover:shadow-2xl dark:hover:shadow-emerald-900/10 transition-all group">
              <div className="mb-4 text-[#259566] group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 className="text-xl font-bold">{s.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}