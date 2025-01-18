import { createContext, useCallback, useEffect, useState } from "react";
import axios from "../axios";
import { disconnectPusher } from "../../src/pusher";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const response = await axios.get("profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching profile", error);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .post(
        "logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("accessToken");
        disconnectPusher();
        setUser(null);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
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
