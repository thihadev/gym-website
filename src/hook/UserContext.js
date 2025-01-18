import { createContext, useCallback, useEffect, useState } from "react";
import axios from "../axios";
import { disconnectPusher } from "../../src/pusher";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

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

  const fetchNotifications = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const response = await axios.get("notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedNotifications = response.data.data;
        setNotifications(fetchedNotifications);
        setNotificationCount(fetchedNotifications.filter((n) => !n.is_read).length);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    }
  }, []);

  const markNotificationAsRead = useCallback(async (id) => {
    console.log(`Marking notification ${id} as read`);
    try {
      // Assuming your API endpoint to mark a notification as read is "notifications/:id/read"
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update local state after successful API call
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.id === id ? { ...n, is_read: true } : n
        )
      );
      setNotificationCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error(`Failed to mark notification ${id} as read`, error);
    }
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
        setNotifications([]);
        setNotificationCount(0);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }, []);

  useEffect(() => {
    fetchUserProfile();
    fetchNotifications();
  }, [fetchUserProfile, fetchNotifications]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setUser,
        fetchUserProfile,
        logout,
        notifications,
        notificationCount,
        setNotificationCount,
        fetchNotifications,
        markNotificationAsRead,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
