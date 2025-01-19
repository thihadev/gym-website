import React, { useEffect, useState } from "react";
import DefaultAvatar from "../assets/default-avatar.png";
import { useLanguage } from "../context/LanguageProvider";
import { Link } from "react-router-dom";
import transactions from "../data/transactions";
import useNotification from "../hook/useNotification";

const ProfileDropdown = ({ user, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { notificationCount, fetchNotifications } = useNotification();
  const { language } = useLanguage();
  const list = transactions;
  const lang = list[language];

  useEffect(() => {
      fetchNotifications();
    }, [fetchNotifications]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
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
                    to="/settings"
                    onClick={closeDropdown}
                    state={{ scrollToSection: "profile" }}
                    className="w-full px-4 py-3 text-left text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition duration-200 flex items-center"
                  >
                    {lang.profile}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    onClick={closeDropdown}
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
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
