import React, { useState } from "react";
// import { supabase } from "../../SupabaseClient";
import "./SignIn.css";
import axios from '../../axios';

const SignIn = ({ switchToSignUp, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      const { access_token } = response.data;

      // Save the token in localStorage
      localStorage.setItem('accessToken', access_token);

      // Trigger parent callback to set the user profile and navigate
      onSuccess();
    } catch (error) {
      setError(error.response.data);
        console.error('Login Failed', error.response.data);
    }
};

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
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
        Don't have an account?{" "}
        <button onClick={switchToSignUp}>Sign Up</button>
      </p>
    </div>
  );
};

export default SignIn;
