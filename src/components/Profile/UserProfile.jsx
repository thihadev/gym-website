import React, { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import axios from "../../axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("Access token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data.data);
          setError(null); // Clear any previous errors
        } else {
          throw new Error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
        setUser(null);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return (
      <div className="text-red-600 text-center font-medium p-6">{error}</div>
    );
  }

  if (!loading && !user) {
    return (
      <div className="text-gray-500 text-center font-medium p-6">
        No user data available.
      </div>
    );
  }

  return (
    <>
    <section
      className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6 overflow-y-auto relative"
      style={{ maxHeight: "380px" }}
      >
      {/* Left Section - User Details */}
      <div className="flex flex-col items-center md:items-start w-full md:w-auto">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white">
          <div className="text-blue-600 font-medium text-lg">Loading...</div>
        </div>
      )}
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
      <div className="flex-grow flex w-full">
        <EditProfile user={user} setUser={setUser} />
      </div>
    </section>
    </>
  );
};

export default UserProfile;
