import { useCallback } from "react";
import { logoutUser } from "@/services/AuthService";

export function useLogout() {
  return useCallback(async () => {
    try {
      await logoutUser(); // API logout (optional)
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      localStorage.removeItem("authToken"); // Remove auth token
      window.location.href = "/sign?form=in"; // Redirect to login
    }
  }, []);
}

