import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../hook/UserContext";

const Notification = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();
  const { scrollToSection } = location.state || {};
    const { user } = useContext(UserContext);
  console.log(user);

  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
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
    // const { name, value } = e.target;
    // setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    setEditProfile(false);
    // console.log("Profile saved:", profile);
  };

  return (
    <div className="flex justify-center items-center p-4 max-h-screen">
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
              <h2 className="text-xl font-bold mb-4 text-gray-700">Profile</h2>
              <div
                className="flex items-start gap-6 overflow-y-auto"
                style={{ maxHeight: "300px" }} // Fixed height and scroll for profile section
              >
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border-4 border-gray-200"
                />
                {editProfile ? (
                  <div className="flex-grow space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstname"
                        value={user.firstname || ""}
                        onChange={handleProfileChange}
                        className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastname"
                        value={user.lastname || ""}
                        onChange={handleProfileChange}
                        className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        value={user.dob || ""}
                        onChange={handleProfileChange}
                        className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Gender</label>
                      <select
                        name="gender"
                        value={user.gender || ""}
                        onChange={handleProfileChange}
                        className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <button
                      onClick={saveProfile}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex-grow space-y-2">
                    <p className="text-lg font-semibold text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-600">DOB: {user.dob || "N/A"}</p>
                    <p className="text-sm text-gray-600">Gender: {user.gender || "N/A"}</p>
                    <p className="text-sm text-gray-600">Email: {user.email}</p>
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
                className="space-y-3 overflow-y-auto"
                style={{ maxHeight: "300px" }} // Fixed height and scroll for notifications
              >
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg shadow ${
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
