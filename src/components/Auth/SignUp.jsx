import React, { useState } from "react";
import "./SignUp.css";
import axios from "../../axios";

const SignUp = ({ switchToSignIn, onSuccess }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({}); // Track errors for each field

  // Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      const response = await axios.post("/register", { 
        email, 
        password,
        first_name,
        last_name,
        gender,
      });
      const { access_token } = response.data;

      // Save the token in localStorage
      localStorage.setItem("accessToken", access_token);

      // Show success alert
      alert("Sign up successful! You can now log in.");

      // Trigger parent callback to set the user profile and navigate
      onSuccess();
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle validation errors from the backend
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({ general: "An unknown error occurred. Please try again." });
      }
      console.error("Sign Up Failed", error.response.data);
    }
  };

  // Helper function to determine if a field has an error
  const getFieldClass = (fieldName) => {
    return errors[fieldName] ? "input-error" : "";
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      {/* Display general error message */}
      {errors.general && <span className="error">{errors.general}</span>}

      <form onSubmit={handleSignUp}>
        {errors.first_name && <span className="error-text">{errors.first_name}</span>}
        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          className={getFieldClass('first_name')} // Apply error class if needed
        />
        {/* Show error for First Name */}

        {errors.last_name && <span className="error-text">{errors.last_name}</span>}
        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          className={getFieldClass('last_name')} // Apply error class if needed
        />
        {/* Show error for Last Name */}

        {errors.email && <span className="error-text">{errors.email}</span>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={getFieldClass('email')} // Apply error class if needed
        />

        {errors.password && <span className="error-text">{errors.password}</span>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={getFieldClass('password')} // Apply error class if needed
        />
        {/* Show error for Password */}

        {/* Gender Dropdown */}
        {errors.gender && <span className="error-text">{errors.gender}</span>}
        <select 
          value={gender} 
          onChange={(e) => setGender(e.target.value)} 
          className={getFieldClass('gender')} // Apply error class if needed
        >
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {/* Show error for Gender */}

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
