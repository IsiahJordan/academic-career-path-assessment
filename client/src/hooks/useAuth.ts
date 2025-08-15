import { useEffect, useState } from "react";
import { verifyUser } from "@/services/AuthService"; 

export function useAuth({ verify = true } = {}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setLoading(false);
      return;
    }

    if (!verify) {
      setUser({ token });
      setLoading(false);
      return;
    }

    // Verify token via backend
    verifyUser(token)
      .then((res) => {
        if (res.status === 1) {
          setUser(res.user);
        } else {
          localStorage.removeItem("authToken");
          setUser(null);
        }
      })
      .catch(() => {
        localStorage.removeItem("authToken");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [verify]);

  return { user, loading, isAuth: !!user };
}

