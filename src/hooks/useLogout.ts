// hooks/useLogout.ts
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

export const useLogout = () => {
  const { logout: clearSession } = useAuthStore();

  const logout = () => {
    try {
      clearSession();
      toast.success("Logged out successfully"); 
      window.location.replace("/");
    } catch (error: any) {
      toast.error("Logout error: " + error.message);
    }
  };

  return { logout };
};