import React, { useEffect, useState } from "react";
import DefaultAvatar from "../../assets/default-avatar.png";
import { useLanguage } from "../../context/LanguageProvider";
import { Link } from "react-router-dom";
import useNotification from "../../hook/useNotification";

const ProfileDropdown = ({ user, handleLogout }) => {
  const [open, setOpen] = useState(false);
  const { notificationCount, fetchNotifications } = useNotification();
  const { translation } = useLanguage();

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  return (
    <div className="relative">
      <button onClick={() => setOpen((p) => !p)} className="focus:outline-none">
        <img
          src={user?.avatar || DefaultAvatar}
          alt="avatar"
          className="w-9 h-9 rounded-full border-2 border-lime-400/60 hover:border-lime-400 transition object-cover"
        />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-12 w-56 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
            {/* User info */}
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-base font-semibold text-white truncate">{user?.name || "User"}</p>
              <p className="text-base text-slate-400 truncate">{user?.email}</p>
            </div>

            <ul>
              <li>
                <Link
                  to="/settings"
                  state={{ scrollToSection: "profile" }}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3 text-base text-slate-300 hover:text-lime-400 hover:bg-white/5 transition"
                >
                  {translation("profile")}
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  state={{ scrollToSection: "notifications" }}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-base text-slate-300 hover:text-lime-400 hover:bg-white/5 transition"
                >
                  <span>{translation("notifications")}</span>
                  {notificationCount > 0 && (
                    <span className="w-5 h-5 bg-red-500 text-white text-base rounded-full flex items-center justify-center font-bold">
                      {notificationCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className="border-t border-white/10">
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="w-full text-left px-4 py-3 text-base text-red-400 hover:bg-red-500/10 transition"
                >
                  {translation("logout")}
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
