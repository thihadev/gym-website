import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../axios";
import LoadingSpinner from "../LoadingSpinner";
import UserProfile from "../Profile/UserProfile";
import { UserContext } from "../../hook/UserContext";

const Notification = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { notifications, notificationCount, markNotificationAsRead } =
    useContext(UserContext);
  const location = useLocation();
  const { scrollToSection } = location.state || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
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
          setError("ERROR");
        }
      }
      setLoading(false);
    };

    fetchUserData();

    if (scrollToSection) {
      setActiveTab(scrollToSection);
    }
  }, [scrollToSection]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const updateUserProfile = async (updatedFields) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post("/profile-update", updatedFields, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Profile updated successfully:", response.data);
      return true; // Return true to indicate success
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      return false; // Return false to indicate failure
    }
  };

  const saveProfile = async () => {
    setEditProfile(false);

    // Use the current `user` state for the API payload
    const success = await updateUserProfile(user);

    if (success) {
      console.log("Profile saved locally and on the server.");
    } else {
      console.error("Failed to save profile to the server.");
    }
  };

  const closeProfile = async () => {
    setEditProfile(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-message flex flex-col justify-center items-center h-screen text-center">
        <h2 className="text-xl text-red-600 font-semibold">
          Error Loading Notifications
        </h2>
        <p className="text-gray-600">
          Please try refreshing the page or check your connection.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4 h-vh">
      <div className="w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 bg-white shadow-lg rounded-lg p-6">
        {/* Tabs */}
        <div className="flex justify-center space-x-8 mb-6">
          <div
            className={`text-lg font-semibold cursor-pointer hover:text-blue-500 ${
              activeTab === "profile"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </div>
          <div
            className={`text-lg font-semibold cursor-pointer flex items-center space-x-2 hover:text-blue-500 ${
              activeTab === "notifications"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <span>Notifications</span>
            {notificationCount > 0 && (
              <span className="bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div>
          {activeTab === "profile" && (
            <UserProfile 
              edit={editProfile}
              // user={user}
            />
          )}

          {activeTab === "notifications" && (
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                Notifications
              </h2>
              <div
                className="space-y-2 overflow-y-auto p-3"
                style={{ maxHeight: "400px" }}
              >
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg shadow ${
                      notification.is_read
                        ? "bg-gray-100"
                        : "bg-blue-100 border-l-4 border-blue-500"
                    }`}
                  >
                    <p className="text-gray-800 text-sm font-semibold md:text-base">
                      {notification.message}
                    </p>

                    <p className="text-gray-500 text-xs md:text-sm mt-1">
                      {notification.date_time}
                    </p>

                    {!notification.is_read && (
                      <button
                        onClick={() => markNotificationAsRead(notification.id)}
                        className="text-sm md:text-base text-blue-600 hover:underline mt-2"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                ))}

                {/* Empty State */}
                {notifications.length === 0 && (
                  <div className="text-center text-gray-500 py-5">
                    No notifications available.
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
