import React from "react";

const EditProfile = ({ user, handleProfileChange, saveProfile, closeProfile }) => {
  return (
    <div className="flex-grow space-y-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">First Name</label>
        <input
          type="text"
          name="firstname"
          value={user?.firstname || ""}
          onChange={handleProfileChange}
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Last Name</label>
        <input
          type="text"
          name="lastname"
          value={user?.lastname || ""}
          onChange={handleProfileChange}
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={user?.phone || ""}
          onChange={handleProfileChange}
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Date of Birth
        </label>
        <input
          type="date"
          name="dob"
          value={user?.dob || ""}
          onChange={handleProfileChange}
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Gender</label>
        <select
          name="gender"
          value={user?.gender || ""}
          onChange={handleProfileChange}
          className="w-full p-2 border border-gray-300 rounded text-sm text-gray-800"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        onClick={saveProfile}
        className="px-4 py-2 m-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Update
      </button>
      <button
        onClick={closeProfile}
        className="px-4 py-2 m-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Close
      </button>
    </div>
  );
};

export default EditProfile;
