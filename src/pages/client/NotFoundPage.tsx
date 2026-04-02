import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Cinematic Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#259566_1px,transparent_1px)] [background-size:40px_40px]"></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-brand/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <h1 className="text-[120px] md:text-[180px] font-black tracking-tighter leading-none mb-2 text-white drop-shadow-2xl">
          4<span className="text-brand">0</span>4
        </h1>
        
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Lost in Space.
        </h2>
        
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-12 font-medium max-w-md">
          The quadrant you are looking for has been erased from the digital archives. Navigate back to safety.
        </p>

        <Link 
          to="/" 
          className="group flex items-center justify-center gap-3 bg-brand/80 hover:bg-[#1e7a53] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-widest transition-all cursor-pointer shadow-xl shadow-brand/20 uppercase"
        >
          <MoveLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Return to Home
        </Link>
      </div>

      
    </div>
  );
}
