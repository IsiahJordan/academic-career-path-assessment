import { useState, useEffect } from "react";
import { getUserAccount } from "@/services/AccountService";

export function useFetchUserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    getUserAccount(token)
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user account:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { userData, loading, error };
}

