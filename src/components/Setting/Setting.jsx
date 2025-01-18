import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import UserProfile from "../Profile/UserProfile";
import { UserContext } from "../../hook/UserContext";
import Notification from "../Notification/Notification";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { notificationCount } = useContext(UserContext);
  const location = useLocation();
  const { scrollToSection } = location.state || {};

  useEffect(() => {
    if (scrollToSection) {
      setActiveTab(scrollToSection);
    }
  }, [scrollToSection]);


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
            <UserProfile />
          )}

          {activeTab === "notifications" && (
            <Notification />
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;
