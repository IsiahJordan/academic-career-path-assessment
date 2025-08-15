import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createAccountFromToken } from "@/services/AccountService"; 
export function useAuthToken() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      const params = new URLSearchParams(location.hash.substring(1)); // remove leading '#'
      const token = params.get("access_token");
      console.log("Token from URL:", token);

      if (token) {
        // Store token
        localStorage.setItem("authToken", token);

        // Call backend to create user in `user_accounts`
        createAccountFromToken(token)
          .then((res) => {
            console.log("Account creation response:", res);
          })
          .catch((err) => {
            console.error("Error creating account:", err);
          });

        // Clean the URL
        navigate(location.pathname, { replace: true });
      }
    }
  }, [location, navigate]);
}

