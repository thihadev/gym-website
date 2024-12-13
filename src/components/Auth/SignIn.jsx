import React, { useState } from "react";
// import { supabase } from "../../SupabaseClient";
import "./SignIn.css";
import axios from '../../axios';


const SignIn = ({ switchToSignUp, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      console.log('Login Successful', response);
      localStorage.setItem('token', response.data.token);
  } catch (error) {
      console.error('Login Failed', error);
  }
};


  // // Handle Sign-In
  // const handleSignIn = async (e) => {
  //   e.preventDefault();
    
    
  //   // Call Supabase signIn method
  //   const { error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) {
  //     setError(error.message); // Show error message
  //   } else {
  //     onSuccess(); // Trigger onSuccess callback to close modal and navigate
  //   }
  // };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {/* {error && <p className="error">{error}</p>} */}
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
