import React from "react";
import axios from "../../axios";

const EditProfile = ({ user, setUser, setEditProfile }) => {
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const updateUserProfile = async (updatedFields) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post("/profile-update", updatedFields, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setUser(response.data.data);
      return true;
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      return false;
    }
  };

  const saveProfile = async () => {
    setEditProfile(false);

    const success = await updateUserProfile(user);

    if (success) {
      console.log("Profile saved locally and on the server.");
    } else {
      console.error("Failed to save profile to the server.");
    }
  };

  const closeProfile = () => setEditProfile(false);

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Profile</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
          <input
            type="text"
            name="firstname"
            value={user?.firstname || ""}
            onChange={handleProfileChange}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={user?.lastname || ""}
            onChange={handleProfileChange}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={user?.phone || ""}
            onChange={handleProfileChange}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={user?.dob || ""}
            onChange={handleProfileChange}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
          <select
            name="gender"
            value={user?.gender || ""}
            onChange={handleProfileChange}
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={saveProfile}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Update
        </button>
        <button
          onClick={closeProfile}
          className="px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
