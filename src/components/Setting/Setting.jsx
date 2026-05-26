import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserProfile from "../Profile/UserProfile";
import Notification from "../Notification/Notification";
import useNotification from "../../hook/useNotification";
import { useLanguage } from "../../context/LanguageProvider";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { translation } = useLanguage();
  const { notificationCount, notifications, fetchNotifications, markNotificationAsRead, markAllAsRead, loading } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    if (location.state?.scrollToSection) setActiveTab(location.state.scrollToSection);
  }, [location.state?.scrollToSection, fetchNotifications]);

  const tabs = [
    { key: "profile", label: translation("profile") },
    { key: "notifications", label: translation("notifications"), badge: notificationCount },
  ];

  return (
    <div className="min-h-screen flex items-start justify-center p-4 pt-8">
      <div className="w-full max-w-2xl bg-[#111827] border border-white/8 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <h1 className="text-lg font-bold text-white">Settings</h1>
          <button
            onClick={() => navigate("/")}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition text-xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3.5 text-base font-semibold transition border-b-2 ${
                activeTab === tab.key
                  ? "border-lime-400 text-lime-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
              {tab.badge > 0 && (
                <span className="w-5 h-5 bg-red-500 text-white text-base rounded-full flex items-center justify-center font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "profile" && <UserProfile />}
          {activeTab === "notifications" && (
            <Notification
              notifications={notifications}
              notificationCount={notificationCount}
              markNotificationAsRead={markNotificationAsRead}
              markAllAsRead={markAllAsRead}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;
