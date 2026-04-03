import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import api from "@/api/axios"; 
import { useNavigate } from "react-router-dom"; 

export const useLogout = () => {
  const { logout: clearSession } = useAuthStore();
  const navigate = useNavigate(); 

  const logout = async () => {
    try {
      await api.post("/auth/logout/"); 
      setTimeout(() => {
        clearSession();
        navigate("/login", { replace: true }); 
      }, 2000);
      toast.success("Logged out successfully");
      
    } catch (error: any) {
      console.error("Logout Error:", error);
      clearSession();
      toast.info("Session ended");
      navigate("/login", { replace: true });
    }
  };

  return { logout };
};