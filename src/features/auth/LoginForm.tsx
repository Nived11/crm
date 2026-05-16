import { useState } from "react";
import { useLogin } from "@/features/auth/useLogin";
import { ShieldCheck, ArrowRight, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    email, setEmail, password, setPassword,
    loading, authError, handleEmailLogin
  } = useLogin();

  return (
    <div className="flex w-full min-h-screen bg-black overflow-hidden selection:bg-brand selection:text-white">
      {/* Left Panel: Branding */}
      <div className="hidden lg:flex lg:w-[50%] p-16 flex-col justify-between bg-[#0a0a0a] border-r border-zinc-900 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#259566_1px,transparent_1px)] [background-size:32px_32px]"></div>
        <div className="flex items-center gap-2 relative z-10">
          <img src="crm.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-md" />
          <span className="text-xl font-black tracking-tighter text-white uppercase">COSMOS</span>
        </div>
        <div className="relative z-10">
          <h2 className="text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 tracking-tighter">
            Crafting <br /> <span className="text-brand">Digital Excellence.</span>
          </h2>
          <p className="text-zinc-500 text-base leading-relaxed max-w-sm">Welcome to the secure admin portal.</p>
        </div>
        <div className="flex items-center gap-4 relative z-10 text-zinc-600 text-xs font-bold uppercase tracking-widest">
          <ShieldCheck size={16} className="text-brand" /> Multi-Layered Security Active
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="w-full lg:w-[50%] p-6 md:p-12 lg:p-20 flex flex-col justify-center bg-black relative">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-2xl lg:text-4xl font-bold text-white mb-3">Admin Login</h1>
            <p className="text-zinc-500 text-sm font-medium">Please enter your administrative credentials.</p>
          </div>

          {authError && (
            <div className="mb-6 p-4 bg-red-900/10 border border-red-900/30 rounded-xl text-red-400 text-xs font-medium animate-in fade-in slide-in-from-top-2">
              {authError}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-zinc-500 ml-1 uppercase tracking-widest">Admin Email</label>
               <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 text-white placeholder:text-zinc-700 outline-none focus:border-brand transition-all text-sm"
                required
              />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold text-zinc-500 ml-1 uppercase tracking-widest">Security Password</label>
               <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pr-12 rounded-xl border border-zinc-800 bg-zinc-900/20 text-white outline-none focus:border-brand transition-all text-sm"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-brand transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-brand text-white p-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-brand/10"
            >
              {loading ? "AUTHENTICATING..." : <>Access Dashboard <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-zinc-700 text-[10px] uppercase font-bold tracking-[0.2em]">
              Authorized Personnel Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}