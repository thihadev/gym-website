import React, { useState, useContext } from "react";
import axios from "../../axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const SignIn = ({ switchToSignUp, onSuccess }) => {
  const { fetchUserProfile } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const response = await axios.post("/login", { email, password });
      const { access_token } = response.data;
      localStorage.setItem("accessToken", access_token);
      await fetchUserProfile();
      setLoading(false);
      onSuccess();
      toast.success(`Welcome back!`);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const { data } = error.response;
        setError(data?.message || "Something went wrong. Please try again.");
      } else if (error.request) {
        setError("Network error: Unable to connect to the server.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  if (error && !email && !password) {
    return (
      <div className="flex flex-col justify-center items-center text-center py-8">
        <h2 className="text-xl text-red-400 font-semibold">Something went wrong!</h2>
        <p className="text-slate-300 text-base mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold text-white text-center mb-3">Sign In</h2>
      {error && <span className="text-red-400 text-sm text-center mb-2">{error}</span>}
      <form onSubmit={handleSignIn} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-bg-card-alt border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-accent transition"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-bg-card-alt border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-accent transition"
          required
        />
        {!loading ? (
          <button type="submit" className="btn mt-1 w-full">
            Sign In
          </button>
        ) : (
          <button disabled className="w-full py-3 rounded-xl bg-slate-600 text-slate-400 font-bold cursor-not-allowed">
            Processing...
          </button>
        )}
      </form>
      <p className="mt-3 text-slate-400 text-sm text-center">
        Don't have an account?{" "}
        <button onClick={switchToSignUp} className="text-accent-light font-semibold underline bg-none border-none cursor-pointer text-sm">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default SignIn;
