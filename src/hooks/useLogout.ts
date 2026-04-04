import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import api from "@/api/axios"; 
import { useNavigate } from "react-router-dom"; 

export const useLogout = () => {
  const { logout: clearSession } = useAuthStore();
  const navigate = useNavigate(); 

  const logout = async () => {
    try {
      // 1. 🚀 ബാക്ക് എൻഡ് കുക്കികൾ ഡിലീറ്റ് ചെയ്യാൻ പറയുന്നു
      await api.post("/auth/logout/"); 
      
      // 2. ലോക്കൽ സ്റ്റേറ്റ് ക്ലിയർ ചെയ്ത് നാവിഗേറ്റ് ചെയ്യുന്നു
      clearSession();
      navigate("/login", { replace: true }); 
      toast.success("Logged out successfully");
      
    } catch (error: any) {
      console.error("Logout Error:", error);
      // API ഫെയിൽ ആയാലും ലോക്കൽ സ്റ്റേറ്റ് ക്ലിയർ ചെയ്യുക
      clearSession();
      toast.info("Session ended");
      navigate("/login", { replace: true });
    }
  };

  return { logout };
};