import React from 'react';
import { LayoutDashboard, Timer, ChevronRight } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className=" bg-black flex items-center justify-center ">
      <div className="w-full max-w-7xl">
        
        {/* Main Card */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          <div className="relative z-10 flex flex-col items-start gap-6">
            
            {/* Minimal Badge */}
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
              <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">v0.1.0 Alpha</span>
            </div>

            {/* Compact Heading */}
            <div className="space-y-2">
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase italic flex items-center gap-3">
                <LayoutDashboard size={28} className="text-zinc-500" />
                Dashboard <span className="text-zinc-700">Studio</span>
              </h1>
              <p className="text-zinc-500 text-sm max-w-sm leading-relaxed font-medium">
                We're crafting a refined space for your data. The full experience will be live soon.
              </p>
            </div>

            {/* Simple Status Row */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-900 w-full">
              <div className="flex items-center gap-2 text-zinc-400">
                <Timer size={14} />
                <span className="text-xs font-semibold">Deploying soon</span>
              </div>
              <div className="flex items-center gap-1 text-zinc-600 hover:text-zinc-400 transition-colors cursor-default">
                <span className="text-xs font-semibold">View Roadmap</span>
                <ChevronRight size={14} />
              </div>
            </div>

          </div>

          {/* Minimal Corner Decoration */}
          <div className="absolute top-0 right-0 p-8 hidden md:block">
            <div className="flex flex-col items-end gap-1">
              <div className="h-1 w-12 bg-zinc-800 rounded-full" />
              <div className="h-1 w-8 bg-zinc-900 rounded-full" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;