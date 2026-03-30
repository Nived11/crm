"use client";

import { Suspense } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image"; 

function LoginContent() {
  const {
    email, setEmail, password, setPassword,
    loading, authError, handleEmailLogin, handleGoogleLogin
  } = useAuth();

  return (
    <div className="flex w-full min-h-screen bg-black overflow-hidden">
      
      {/* LEFT SIDE: Branding - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-[50%] p-16 flex-col justify-between bg-[#0a0a0a] border-r border-zinc-900 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#259566_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        <div className="flex items-center gap-2 relative z-10">
          <Image 
            src="/viceversalogo.png" 
            alt="Logo" 
            width={40} 
            height={40} 
            priority
          />
          <span className="text-xl font-black tracking-tighter text-white">VICEVERSA</span>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 tracking-tighter">
            Crafting <br />
            <span className="text-brand">Digital Excellence.</span>
          </h2>
          <p className="text-zinc-500 text-base leading-relaxed max-w-sm">
            Welcome to the admin portal. Please log in to manage your projects and access exclusive features.
          </p>
        </div>

        <div className="flex items-center gap-4 relative z-10 text-zinc-600 text-xs font-bold uppercase tracking-widest">
          <ShieldCheck size={16} className="text-brand" />
           Secure Login 
        </div>
      </div>

      {/* RIGHT SIDE: Login Form - Full width on mobile */}
      <div className="w-full lg:w-[50%] p-6 md:p-12 lg:p-20 flex flex-col justify-center bg-black relative">
        
        <div className="lg:hidden flex items-center justify-center gap-2 mb-12">
          <Image src="/viceversalogo.png" alt="Logo" width={32} height={32} />
          <span className="text-lg font-black tracking-tighter text-white">VICEVERSA</span>
        </div>

        <div className="max-w-md mx-auto w-full">
          <div className="mb-8 lg:mb-10 text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-zinc-500 text-sm font-medium">Please enter your access credentials.</p>
          </div>

          {authError && (
            <div className="mb-6 p-4 bg-red-900/10 border border-red-900/30 rounded-xl text-red-400 text-xs font-medium animate-in fade-in slide-in-from-top-2">
              {authError}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 ml-1 uppercase tracking-widest">Email</label>
              <input
                type="email" 
                placeholder="admin@viceversa.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 text-white placeholder:text-zinc-700 outline-none focus:border-brand transition-all text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 ml-1 uppercase tracking-widest">Password</label>
              <input
                type="password" 
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 text-white placeholder:text-zinc-700 outline-none focus:border-brand transition-all text-sm"
                required
              />
            </div>

            <button
              type="submit" 
              disabled={loading}
              className="w-full bg-brand hover:bg-[#1e7a53] text-white p-4 rounded-xl font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 group shadow-xl shadow-emerald-950/20"
            >
              {loading ? "VERIFYING..." : (
                <>
                  Login <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-900"></span></div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-[0.2em] font-bold"><span className="bg-black px-4 text-zinc-700">OR</span></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="cursor-pointer w-full flex items-center justify-center gap-3 border border-zinc-800 p-4 rounded-xl hover:bg-zinc-900/50 text-zinc-400 hover:text-white transition-all font-bold text-xs"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black selection:bg-brand selection:text-white">
      <Suspense fallback={<div className="flex items-center justify-center h-screen text-brand font-black animate-pulse">VICEVERSA</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}