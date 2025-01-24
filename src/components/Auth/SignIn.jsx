import React, { useState, useContext } from "react";
// import { supabase } from "../../SupabaseClient";
import "./SignIn.css";
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
    setError(""); // Clear previous errors

    try {
      setLoading(true);
      const response = await axios.post("/login", { email, password });

      const { access_token, data } = response.data;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("userId", data.id);

      await fetchUserProfile();
      setLoading(false);

      // setPusherInstance(token);

      onSuccess();
      toast.success(`Welcome, ${data.name}`);
    } catch (error) {
      // If error.response exists, it means the server responded with an error
      if (error.response) {
        const { data } = error.response;
        if (data && data.message) {
          console.error("Login Failed", data);
          setError(data.message);
          setLoading(false);
        } else {
          setLoading(false);
          setError("Something went wrong. Please try again.");
        }
      }
      // If no response was received, error.request exists
      else if (error.request) {
        setError(
          "Network error: Unable to connect to the server. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (error) {
    return (
      <div className="error-message flex flex-col justify-center items-center text-center">
        <h2 className="text-xl text-red-600 font-semibold">
          {" "}
          Something went Wrong!{" "}
        </h2>
        <p className="text-gray-600 text-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {error && <span className="error global-error">{error}</span>}
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!loading ? (
          <button type="submit">Sign In</button>
        ) : (
          <button
            className="bg-gray-400 hover:bg-gray-500 active:bg-gray-600 disabled:bg-gray-300"
            disabled
          >
            Processing...
          </button>
        )}
      </form>
      <p>
        Don't have an account? <button onClick={switchToSignUp}>Sign Up</button>
      </p>
    </div>
  );
};

export default SignIn;
