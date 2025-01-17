import React, { useState, useEffect } from "react";
import DefaultAvatar from "../assets/default-avatar.png";
import transactions from "../data/transactions";
import { useLanguage } from "../components/LanguageProvider";

const ProfileDropdown = ({ user, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); // state to store notifications
  const [notificationCount, setNotificationCount] = useState(0); // state to store notification count
  const { language } = useLanguage();
  const list = transactions;
  const lang = list[language];

  useEffect(() => {
    // Example of fetching notifications from an API or using static data
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
    setNotificationCount((prevCount) => prevCount - 1); // Decrease unread notification count
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
        <div className="absolute right-0 top-16 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b">
            <p className="text-sm font-semibold text-gray-700">{user?.name || "User Name"}</p>
            <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
          </div>
          <ul className="py-2">
            <li>
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100"
                onClick={() => console.log("Go to Profile")}
              >
                {lang.profile}
              </button>
            </li>
            <li>
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100"
                onClick={() => console.log("Notifications")}
              >
                <div className="flex justify-between items-center">
                  <span>{lang.notifications}</span>
                  {notificationCount > 0 && (
                    <span className="w-5 h-5 bg-red-500 text-white text-sm rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                  )}
                </div>
              </button>
            </li>
            <li>
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100"
                onClick={() => console.log("Account Settings")}
              >
                {lang.settings}
              </button>
            </li>
            
            <li>
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                {lang.logout}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
