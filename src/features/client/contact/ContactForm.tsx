"use client";
import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-10 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900 shadow-2xl rounded-3xl"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-white mb-2">Let's work together</h2>
        <p className="text-gray-500 dark:text-gray-400">Ivide message ayakkuka, namukk ninte project start cheyyaam.</p>
      </div>

      <form className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
            <input 
              type="text" 
              className="w-full p-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 dark:text-white rounded-xl focus:ring-2 focus:ring-[#259566] outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 dark:text-white rounded-xl focus:ring-2 focus:ring-[#259566] outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Message</label>
          <textarea 
            rows={4} 
            className="w-full p-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 dark:text-white rounded-xl focus:ring-2 focus:ring-[#259566] outline-none transition-all"
          />
        </div>

        <button type="submit" className="w-full bg-[#259566] hover:bg-[#1d7a54] text-white p-4 rounded-xl font-bold shadow-lg shadow-[#259566]/20 transition-all transform active:scale-95">
          Send Message
        </button>
      </form>
    </motion.div>
  );
}