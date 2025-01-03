import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios"; // Ensure you have configured axios to point to your Laravel backend

export default function ImageUploader() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve state from navigation
  const { orderId, amount, paymentMethod } = location.state || {};
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if no data is available
  useEffect(() => {
    if (!orderId || !amount) {
      navigate("/"); // Redirect to the home page
    }
  }, [orderId, amount, navigate]);

  if (!orderId || !amount) {
    // Return null to prevent rendering while redirecting
    return null;
  }

  const handleFileChange = (e) => {
    // Only set the first file (if any) to allow a single file upload
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("package", orderId);
    formData.append("amount", amount);
    formData.append("payment_channel", paymentMethod);
    formData.append("payslip", file); // Only one image, so append it as "payslip"

    // Get the token from localStorage or sessionStorage
    const token = localStorage.getItem("accessToken");

    try {
      setIsSubmitting(true);

      // Make the POST request with the Bearer token
      const response = await axios.post("/upload-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`, // Add Bearer token here
        },
      });

      alert("Order successfully!");
      console.log("Server Response:", response.data);

      // Optionally, navigate to a success page or reset the form
      navigate("/");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Order Summary</h1>

        {/* Order Details */}
        <div className="mb-4">
          <div className="flex flex-col gap-2">
            <label className="p-3 border rounded-lg flex justify-between items-center">
              <span className="font-semibold">Package ID : {orderId}</span>
            </label>
            <label className="p-3 border rounded-lg flex justify-between items-center">
              <span className="font-semibold">Amount : {amount} mmk</span>
            </label>
            <label className="p-3 border rounded-lg flex justify-between items-center">
              <span className="font-semibold">Payment Method : {paymentMethod}</span>
            </label>
          </div>
        </div>

        {/* Upload Image */}
        <div className="container mx-auto p-4">
          <h1 className="text-xl font-bold mb-4">Upload Your Payslip</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              className="block w-full mb-4"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
