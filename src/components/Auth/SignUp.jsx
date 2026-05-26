import React, { useState, useContext } from "react";
import axios from "../../axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const SignUp = ({ switchToSignIn, onSuccess }) => {
  const { fetchUserProfile } = useContext(UserContext);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", password: "", gender: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const response = await axios.post("/register", form);
      const { access_token } = response.data;
      localStorage.setItem("accessToken", access_token);
      await fetchUserProfile();
      setLoading(false);
      onSuccess();
      toast.success(`Welcome!`);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data?.message || "Something went wrong.");
      } else if (error.request) {
        setError("Network error: Unable to connect to the server.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const inputCls = "w-full px-4 py-3 bg-bg-card-alt border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-accent transition";

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-bold text-white text-center mb-3">Sign Up</h2>
      {error && <span className="text-red-400 text-sm text-center mb-2">{error}</span>}
      <form onSubmit={handleSignUp} className="flex flex-col gap-3">
        <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} className={inputCls} required />
        <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} className={inputCls} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className={inputCls} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className={inputCls} required />
        <select name="gender" value={form.gender} onChange={handleChange} className={inputCls} required>
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {!loading ? (
          <button type="submit" className="btn mt-1 w-full">Sign Up</button>
        ) : (
          <button disabled className="w-full py-3 rounded-xl bg-slate-600 text-slate-400 font-bold cursor-not-allowed">
            Processing...
          </button>
        )}
      </form>
      <p className="mt-3 text-slate-400 text-sm text-center">
        Already have an account?{" "}
        <button onClick={switchToSignIn} className="text-accent-light font-semibold underline bg-none border-none cursor-pointer text-sm">
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUp;
