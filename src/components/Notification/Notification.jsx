import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../axios";
import LoadingSpinner from "../LoadingSpinner";
import EditProfile from "../Profile/EditProfile";

const Notification = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
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

    const fetchedNotifications = [
      { id: 1, message: "You have a new follower", read: false },
      { id: 2, message: "Your post received a comment", read: false },
      { id: 3, message: "Your profile was viewed", read: true },
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 4,
        message: `Notification ${i + 4}`,
        read: false,
      })),
    ];
    setNotifications(fetchedNotifications);
    setUnreadCount(fetchedNotifications.filter((n) => !n.read).length);

    if (scrollToSection) {
      setActiveTab(scrollToSection);
    }
  }, [scrollToSection]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => prev - 1);
  };

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

      const response = await axios.post(
        "/profile-update",
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
      return true; // Return true to indicate success
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
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
              activeTab === "profile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("profile")}
            
          >
            Profile
          </div>
          <div
            className={`text-lg font-semibold cursor-pointer flex items-center space-x-2 hover:text-blue-500 ${
              activeTab === "notifications" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div>
          {activeTab === "profile" && (
            <section>
              <div
                className="flex items-start gap-6 overflow-y-auto"
                style={{ maxHeight: "450px" }} // Fixed height and scroll for profile section
              >
                <img
                  src={user?.avatar || "/default-avatar.png"} // fallback to a default avatar
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border-4 border-gray-200"
                />
                {editProfile ? (
                  <EditProfile 
                    user={user}
                    handleProfileChange={handleProfileChange}
                    saveProfile={saveProfile}
                    closeProfile={closeProfile}
                  />
                ) : (
                  <div className="flex-grow space-y-2">
                    <p className="text-lg font-semibold text-gray-800">{user?.name}</p>
                    <p className="text-sm text-gray-600">DOB: {user?.dob || "N/A"}</p>
                    <p className="text-sm text-gray-600">Gender: {user?.gender || "N/A"}</p>
                    <p className="text-sm text-gray-600">Email: {user?.email}</p>
                    <button
                      onClick={() => setEditProfile(true)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {activeTab === "notifications" && (
            <section>
              <h2 className="text-xl font-bold mb-4 text-gray-700">Notifications</h2>
              <div
                className="space-y-2 overflow-y-auto"
                style={{ maxHeight: "394px" }}
              >
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-2 rounded-lg shadow ${
                      notification.read
                        ? "bg-gray-100"
                        : "bg-blue-100 border-l-4 border-blue-500"
                    }`}
                  >
                    <p className="text-gray-800">{notification.message}</p>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-sm text-blue-600 hover:underline mt-2"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
