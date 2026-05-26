import React, { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import axios from "../../axios";
import DefaultAvatar from "../../assets/default-avatar.png";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) { setError("Please log in to view your profile."); setLoading(false); return; }

    axios.get("profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => { setUser(r.data.data); })
      .catch(() => setError("Failed to load profile. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center py-16">
      <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="text-center py-10">
      <p className="text-red-400 text-base">{error}</p>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Avatar + info */}
      <div className="flex flex-col items-center gap-3 md:w-40 shrink-0">
        <img
          src={user?.avatar || DefaultAvatar}
          alt="avatar"
          className="w-24 h-24 rounded-full border-2 border-lime-400/50 object-cover"
        />
        <div className="text-center">
          <p className="text-base font-semibold text-white">{user?.name || "—"}</p>
          <p className="text-base text-slate-300 mt-0.5">{user?.email}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-lime-400/15 text-lime-400 text-base font-medium">
            {user?.type || "Member"}
          </span>
        </div>
      </div>

      {/* Edit form */}
      <div className="flex-1 min-w-0">
        <EditProfile user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default UserProfile;
