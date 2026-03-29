// app/(admin)/login/page.tsx
"use client";

import { Suspense } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/features/auth/hooks/useAuth";

function LoginContent() {
  const {
    email, setEmail, password, setPassword,
    loading, authError, handleEmailLogin, handleGoogleLogin
  } = useAuth();

  return (
    <div className="p-8 bg-white dark:bg-zinc-950 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 dark:border-zinc-900">
      <h1 className="text-3xl font-bold mb-2 text-center text-[#259566]">Welcome Back</h1>
      <p className="text-gray-500 text-center mb-8 text-sm">Secure Admin Access Only</p>

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
  );
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black p-4">
      <Suspense fallback={<div className="text-[#259566]">Loading...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}