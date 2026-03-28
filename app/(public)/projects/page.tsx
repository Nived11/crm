"use client";
import { motion } from "framer-motion";

const projects = [
  { title: "School Management System", category: "Full Stack Development", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800" },
  { title: "Viceversa Creative Agency", category: "Branding & Web", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800" },
  { title: "E-commerce Textile Hub", category: "E-commerce", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800" },
];

export default function ProjectsPage() {
  return (
    <div className="text-gray-900 dark:text-white min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-16">
          Featured <span className="text-[#259566]">Works</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div key={index} whileHover={{ y: -10 }} className="group">
              <div className="overflow-hidden rounded-3xl bg-gray-100 dark:bg-zinc-900 aspect-video mb-6 shadow-sm border border-gray-100 dark:border-zinc-800">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
              </div>
              <p className="text-[#259566] text-xs font-bold uppercase tracking-widest mb-2">{project.category}</p>
              <h3 className="text-2xl font-bold hover:text-[#259566] dark:text-zinc-100 transition-colors">{project.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}