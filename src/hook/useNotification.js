import { useState, useCallback } from "react";
import axios from "../axios";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/notifications");
      const fetched = response.data.data || [];
      setNotifications(fetched);
      setNotificationCount(fetched.filter((n) => !n.is_read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const markNotificationAsRead = useCallback(async (id) => {
    try {
      await axios.patch(`/notifications/${id}/read`, {});
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
      setNotificationCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error(`Failed to mark notification ${id} as read:`, error);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await axios.post("/notifications/mark-all-read", {});
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setNotificationCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  }, []);

  return { notifications, notificationCount, fetchNotifications, markNotificationAsRead, markAllAsRead, loading };
};

export default useNotification;
