"use client";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center px-4"
    >
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-gray-900 dark:text-white leading-tight">
        Crafting <span className="text-[#259566]">Digital</span> Excellence.
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        Viceversa is a creative agency specializing in high-end MERN & Next.js solutions. 
        We turn your complex ideas into simple, high-performing products.
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button className="bg-[#259566] hover:bg-[#1d7a54] text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-[#259566]/20 transition-all active:scale-95">
          Start a Project
        </button>
        <button className="border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 text-gray-900 dark:text-white px-10 py-4 rounded-full font-bold transition-all">
          View Our Work
        </button>
      </div>
    </motion.div>
  );
};

export default HeroSection;