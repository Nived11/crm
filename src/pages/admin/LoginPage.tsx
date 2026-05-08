import { Suspense } from "react";
import { LoginForm } from "@/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black">
      <Suspense fallback={<div className="flex items-center justify-center h-screen text-brand font-black animate-pulse">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
