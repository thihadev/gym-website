import React, { useState } from "react";
import "./SignUp.css";
import axios from "../../axios";
import { toast } from "react-toastify";
import { setPusherInstance } from "../../../src/pusher";
const SignUp = ({ switchToSignIn, onSuccess }) => {
  
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      setLoading(true);
      const response = await axios.post("/register", { 
        email, 
        password,
        first_name,
        last_name,
        gender,
      });
      const { access_token } = response.data;
      
      // Save the token in localStorage
      const token = localStorage.setItem("accessToken", access_token);
      setPusherInstance(token);

      setLoading(false);

      onSuccess();
      toast.success(`Welcome, ${response.data.data.name}`);
    } catch (error) {
      // If error.response exists, it means the server responded with an error
      if (error.response) {
        const { data } = error.response;
        if (data && data.message) {
          console.error("Login Failed", data);
          setError(data.message);
          setLoading(false);
        } else {
          console.error("Unexpected error response", error);
          setError("Something went wrong. Please try again.");
          setLoading(false);
        }
      }
      else if (error.request) {
        setError("Network error: Unable to connect to the server. Please try again.");
        setLoading(false);
      }
      else {
        setError("An unexpected error occurred. Please try again.");
        setLoading(false);
      }
    }
  };

  // Helper function to determine if a field has an error
  const getFieldClass = (fieldName) => {
    return errors[fieldName] ? "input-error" : "";
  };

  if (error) {
    return (
      <div className="error-message flex flex-col justify-center items-center text-center">
        <h2 className="text-xl text-red-600 font-semibold"> Something went Wrong! </h2>
        <p className="text-gray-600 text-md">{error}</p>
      </div>
    );
  }

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

        {!loading ? (
          <button type="submit">Sign Up</button>
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
        Already have an account?{" "}
        <button onClick={switchToSignIn}>Sign In</button>
      </p>
    </div>
  );
};

export default SignUp;
