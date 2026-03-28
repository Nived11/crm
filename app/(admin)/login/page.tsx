"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FcGoogle } from "react-icons/fc";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "unauthorized") {
      setAuthError(" Please login with the correct admin account.");
      supabase.auth.signOut();
    }
  }, [searchParams]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAuthError(error.message);
      setLoading(false);
      return;
    }

    router.refresh();
    router.push("/admin");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setAuthError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black p-4">
      <div className="p-8 bg-white dark:bg-zinc-950 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 dark:border-zinc-900">
        <h1 className="text-3xl font-bold mb-2 text-center text-[#259566]">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-8 text-sm">Secure Admin Access Only</p>

        {/* 🛑 Professional Error Message (No Alerts!) */}
        {authError && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
            {authError}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email" placeholder="Admin Email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent outline-none focus:border-[#259566] transition-all"
            required
          />
          <input
            type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-transparent outline-none focus:border-[#259566] transition-all"
            required
          />
          <button
            type="submit" disabled={loading}
            className="w-full bg-[#259566] hover:bg-[#1e7a53] text-white p-4 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>

        <div className="my-6 text-center text-gray-400 text-sm">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 dark:border-zinc-800 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all font-medium"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}