import React, { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import axios from "../../axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setUser(null);
          setError("ERROR");
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) return <div> Loading..</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="p-6 bg-gray-50">
      <div
        className="flex flex-col md:flex-row items-center md:items-start gap-6 overflow-y-auto"
        style={{ maxHeight: "380px" }}
      >
        {/* User Avatar */}
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-gray-200"
        />

        {/* User Details or Edit Profile */}
        {editProfile ? (
          <EditProfile
            user={user}
            setUser={setUser}
            setEditProfile={setEditProfile}
          />
        ) : (
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">{user?.name || "N/A"}</p>
            <p className="text-md">Email: {user?.email || "N/A"}</p>
            <p className="text-md text-green-600 font-semibold">{user?.type}</p>
            <button
              onClick={() => setEditProfile(true)}
              className="text-white mt-4 text-sm rounded-lg px-3 py-1 bg-blue-500 hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
