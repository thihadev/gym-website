import { useState, useCallback } from "react";
import axios from "../axios";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Fetch notifications from the API
  const fetchNotifications = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("Access token not found. Unable to fetch notifications.");
      return;
    }

    try {
      const response = await axios.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const fetchedNotifications = response.data.data || [];
        setNotifications(fetchedNotifications);
        const unreadCount = fetchedNotifications.filter((n) => !n.is_read).length;
        setNotificationCount(unreadCount);
      } else {
        console.error("Unexpected response while fetching notifications:", response);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, []);

  // Mark a single notification as read
  const markNotificationAsRead = useCallback(async (id) => {
    if (!id) {
      console.error("Notification ID is required to mark as read.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("Access token not found. Unable to mark notification as read.");
      return;
    }

    try {
      const response = await axios.patch(
        `/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((n) =>
            n.id === id ? { ...n, is_read: true } : n
          )
        );

        setNotificationCount((prevCount) => Math.max(prevCount - 1, 0));
      } else {
        console.error(`Unexpected response while marking notification ${id} as read:`, response);
      }
    } catch (error) {
      console.error(`Failed to mark notification ${id} as read:`, error);
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("Access token not found. Unable to mark all notifications as read.");
      return;
    }

    try {
      const response = await axios.post(
        "/notifications/mark-all-read",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) => ({ ...notification, is_read: true }))
        );
        setNotificationCount(0);
      } else {
        throw new Error(response.data.message || "Failed to mark all notifications as read");
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  }, []);

  return {
    notifications,
    notificationCount,
    fetchNotifications,
    markNotificationAsRead,
    markAllAsRead,
  };
};

export default useNotification;
