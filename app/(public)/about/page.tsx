"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="text-gray-900 dark:text-white min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-5xl md:text-6xl font-bold mb-8 tracking-tighter"
        >
          About <span className="text-[#259566]">Viceversa</span>
        </motion.h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed mb-16">
          We are a team of dedicated developers and designers specialized in 
          building high-performance web applications using the MERN stack and Next.js. 
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { title: "Our Vision", desc: "To be the most trusted creative partner for startups in Kerala." },
            { title: "Our Mission", desc: "Delivering scalable, secure, and user-centric digital products." },
            { title: "Our Values", desc: "Transparency, innovation, and client-first approach." }
          ].map((item, i) => (
            <div key={i} className="border border-gray-100 dark:border-zinc-900 p-8 rounded-3xl bg-gray-50/50 dark:bg-zinc-900/30 hover:shadow-xl transition-all">
              <h3 className="text-[#259566] font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}