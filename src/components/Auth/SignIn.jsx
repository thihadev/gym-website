import React, { useState } from "react";
// import { supabase } from "../../SupabaseClient";
import "./SignIn.css";
import axios from "../../axios";
import { toast } from "react-toastify";

const SignIn = ({ switchToSignUp, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Single error for global messages

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("/login", { email, password });
      const { access_token } = response.data;
      // Save the token in localStorage

      localStorage.setItem("accessToken", access_token);

      // Trigger parent callback to set the user profile and navigate
      onSuccess();
      toast.success(`Welcome, ${response.data.data.name}`);
    } catch (error) {
      const { data } = error.response;
      console.error("Login Failed", data);
      // toast.error(`Error, ${data}`)

      // Set global error message
      if (data.message) {
        setError(data.message); // Set global error message for invalid credentials
      }
    }
  };

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
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <button onClick={switchToSignUp}>Sign Up</button>
      </p>
    </div>
  );
};

export default SignIn;
