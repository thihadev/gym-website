import { createContext, useCallback, useEffect, useState } from "react";
import axios from "../axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Security Tip: Token ကို localStorage အစား HTTP-Only Cookie သုံးရန် အပြင်းအထန် အကြံပြုပါသည် (XSS ဘေးမှ ကာကွယ်ရန်)
  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("profile");
      setUser(response.data.data);
    } catch (error) {
      // ပြဿနာဖြေရှင်းချက်- Production-safe logging (🔴 High)
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        console.warn("Session expired or unauthorized. Logging out...");
      } else {
        console.error("Failed to fetch user profile safely:", error.message);
      }

      localStorage.removeItem("accessToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    // Client-side state ကို အရင်ရှင်းခြင်းဖြင့် ပိုမိုမြန်ဆန်ချောမွေ့စေသည်
    localStorage.removeItem("accessToken");
    setUser(null);

    try {
      await axios.post("logout", {});
    } catch (error) {
      console.error("Server-side logout failed:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <UserContext.Provider value={{ user, loading, setUser, fetchUserProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
};