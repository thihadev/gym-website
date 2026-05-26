import React from "react";
import axios from "../../axios";
import { toast } from "react-toastify";

const FIELDS = [
  { name: "firstname", label: "First Name",    type: "text",  placeholder: "First name" },
  { name: "lastname",  label: "Last Name",     type: "text",  placeholder: "Last name" },
  { name: "phone",     label: "Phone",         type: "text",  placeholder: "Phone number" },
  { name: "dob",       label: "Date of Birth", type: "date",  placeholder: "" },
];

const EditProfile = ({ user, setUser }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    try {
      const res = await axios.post("/profile-update", user);
      setUser(res.data.data);
      toast.success("Profile updated.");
    } catch {
      toast.error("Failed to save profile.");
    }
  };

  const inputCls = "w-full px-3 py-2.5 bg-[#1f2937] border border-white/10 rounded-lg text-base text-white placeholder-slate-400 focus:outline-none focus:border-lime-400 transition";
  const labelCls = "block text-base font-medium text-slate-300 mb-1";

  return (
    <div className="space-y-4">
      {FIELDS.map(({ name, label, type, placeholder }) => (
        <div key={name}>
          <label className={labelCls}>{label}</label>
          <input
            type={type}
            name={name}
            value={user?.[name] || ""}
            onChange={handleChange}
            placeholder={placeholder}
            className={inputCls}
          />
        </div>
      ))}

      <div>
        <label className={labelCls}>Gender</label>
        <select
          name="gender"
          value={user?.gender || ""}
          onChange={handleChange}
          className={inputCls}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        onClick={saveProfile}
        className="w-full py-2.5 rounded-lg bg-lime-400 text-black font-bold text-base hover:bg-lime-300 transition mt-2"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;
