import React, { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import axios from "../../axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
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
    <>
      <section
        className="p-6 bg-gray-50 flex flex-col md:flex-row items-center md:items-start gap-6 overflow-y-auto"
        style={{ maxHeight: "380px" }}
      >
        {/* Left Section - User Details */}
        <div className="flex flex-col items-center md:items-start w-full md:w-auto">
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-200"
          />
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">{user?.name || "N/A"}</p>
            <p className="text-md">{user?.email || "N/A"}</p>
            <p className="text-md text-green-600 font-semibold">
              {user?.type || "User"}
            </p>
          </div>
        </div>

        {/* Right Section - Edit Profile */}
        <div className="flex-grow flex w-2/3">
          <EditProfile user={user} setUser={setUser} />
        </div>
      </section>
    </>
  );
};

export default UserProfile;
