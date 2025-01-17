import React, { useState, useEffect } from "react";
import DefaultAvatar from "../assets/default-avatar.png";
import transactions from "../data/transactions";
import { useLanguage } from "../components/LanguageProvider";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ user, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false); // Toggle for notifications view
  const { language } = useLanguage();
  const list = transactions;
  const lang = list[language];

  useEffect(() => {
    // Example notifications
    const fetchedNotifications = [
      { id: 1, message: "Your subscription is about to expire", read: false },
      { id: 2, message: "You have a new message", read: false },
    ];

    setNotifications(fetchedNotifications);
    setNotificationCount(fetchedNotifications.filter((n) => !n.read).length);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
    setNotificationCount((prevCount) => prevCount - 1);
  };

  const handleBack = () => {
    setShowNotifications(false);
  };

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        className="flex items-center focus:outline-none"
        onClick={toggleDropdown}
      >
        <img
          src={user?.avatar || DefaultAvatar}
          alt="User Avatar"
          className="w-14 h-14 rounded-full border-2 border-gray-200 hover:border-gray-400"
        />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 top-16 w-60 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {!showNotifications ? (
            <>
              {/* Main Menu */}
              <div className="p-4 border-b">
                <p className="text-md font-semibold text-gray-700">
                  {user?.name || "User Name"}
                </p>
                <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
              </div>
              <ul className="">
                <li>
                  <Link
                    to="/notifications"
                    state={{ scrollToSection: "profile" }}
                    className="w-full px-4 py-3 text-left text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition duration-200 flex items-center"
                  >
                    {lang.profile}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/notifications"
                    state={{ scrollToSection: "notifications" }}
                    className="w-full px-4 py-3 text-left text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition duration-200 flex items-center"
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>{lang.notifications}</span>
                      {notificationCount > 0 && (
                        <span className="w-5 h-5 bg-red-500 text-white text-sm rounded-full flex items-center justify-center">
                          {notificationCount}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="#"
                    className="w-full px-4 py-3 text-left text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition duration-200 flex items-center"
                    onClick={() => console.log("Account Settings")}
                  >
                    {lang.settings}
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="#"
                    className="w-full px-4 py-3 text-left text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition duration-200 flex items-center"
                    onClick={handleLogout}
                  >
                    {lang.logout}
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              {/* Notification List */}
              <div className="p-4 border-b flex items-center">
                <button
                  className="text-sm text-gray-600 hover:text-gray-800 mr-2"
                  onClick={handleBack}
                >
                  &larr; Back
                </button>
                <p className="text-sm font-semibold text-gray-700">
                  Notifications
                </p>
              </div>
              <ul className="py-2">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`px-4 py-2 text-sm ${
                      notification.read ? "text-gray-500" : "text-gray-700"
                    } hover:bg-indigo-100 flex justify-between items-center transition duration-200`}
                  >
                    <span>{notification.message}</span>
                    {!notification.read && (
                      <button
                        className="text-xs text-blue-500 hover:underline"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </button>
                    )}
                  </li>
                ))}
                {notifications.length === 0 && (
                  <li className="px-4 py-2 text-sm text-gray-500 text-center">
                    No notifications
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
