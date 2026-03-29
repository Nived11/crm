// hooks/useLogout.ts
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      return;
    }
    router.refresh();
    router.push("/login");
  };

  return { logout };
};