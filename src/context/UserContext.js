import { createContext, useCallback, useEffect, useState } from "react";
import axios from "../axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      console.error("Error fetching profile", error);
      localStorage.removeItem("accessToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    axios.post("logout", {}).then(() => {
      localStorage.removeItem("accessToken");
      setUser(null);
    }).catch(console.error);
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
