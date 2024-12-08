import React, { useState } from "react";
import { supabase } from "../../SupabaseClient"; // Make sure this is pointing to your Supabase client file
import "./SignUp.css";

const SignUp = ({ switchToSignIn, onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      onSuccess(); // Call the success callback to redirect or open login
    }
  };

//   // Subscription Setup (for example, real-time subscription to table changes)
//   useEffect(() => {
//     const channel = supabase
//       .from('your_table') // Replace 'your_table' with your actual table name
//       .on('INSERT', (payload) => {
//         console.log("New record inserted:", payload);
//       })
//       .subscribe();

//     // Store subscription object in state
//     setSubscription(channel);

//     // Cleanup: unsubscribe when the component unmounts
//     return () => {
//       if (subscription) {
//         // Correct method to unsubscribe in Supabase v2
//         supabase.removeSubscription(subscription); // Remove subscription properly
//       }
//     };
//   }, [subscription]);

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={switchToSignIn}>Sign In</button>
      </p>
    </div>
  );
};

export default SignUp;
