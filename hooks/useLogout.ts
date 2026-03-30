// hooks/useLogout.ts
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const useLogout = () => {
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Logout error: " + error.message);
      return;
    }
    toast.success("Logged out successfully"); 
    
    window.location.href = "/login";
  };

  return { logout };
};