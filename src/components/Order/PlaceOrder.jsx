import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useLanguage } from "../../context/LanguageProvider";

export default function ImageUploader() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve state from navigation
  const orderDetail = location.state || {};
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language, translation } = useLanguage();
  // const list = translations;
  // const lang = list[language];

  // Redirect if no data is available
  useEffect(() => {
    if (!orderDetail.orderId || !orderDetail.amount) {
      navigate("/"); // Redirect to the home page
      toast.error("Check Order & Amount");
    }
  }, [orderDetail.orderId, orderDetail.amount, navigate]);

  if (!orderDetail.orderId || !orderDetail.amount) {
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
      toast.error("Please select an payslip to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("package", orderDetail.orderId);
    formData.append("amount", orderDetail.amount);
    formData.append("payment_channel", orderDetail.paymentMethod);
    formData.append("payslip", file); // Only one image, so append it as "payslip"

    // Get the token from localStorage or sessionStorage
    const token = localStorage.getItem("accessToken");

    try {
      setIsSubmitting(true);

      // Make the POST request with the Bearer token
      await axios.post("/upload-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Add Bearer token here
        },
      });

      toast.success("Order successfully!");
      // console.log("Server Response:", response.data);

      // Optionally, navigate to a success page or reset the form
      navigate("/");
    } catch (error) {
      const { data } = error.response;
      if (data && data.message) {
        toast.info(data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          {translation("order")}
        </h1>

        {/* Order Details */}
        <div className="mb-4">
          <div className="flex flex-col gap-2">
            <label className="p-3 border rounded-lg flex justify-between items-center">
              <span className="font-semibold">
                Package ID :{" "}
                {language === "en"
                  ? orderDetail.planName
                  : orderDetail.planNameMM}
              </span>
            </label>
            <label className="p-3 border rounded-lg flex justify-between items-center">
              <span className="font-semibold">
                Amount :{" "}
                {language === "en" ? orderDetail.amount : orderDetail.amountMM}
              </span>
            </label>
            <label className="p-3 border rounded-lg flex justify-between items-center">
              <span className="font-semibold">
                Payment Method : {orderDetail.paymentMethod}
              </span>
            </label>
          </div>
        </div>

        {/* Upload Image */}
        <div className="container mx-auto p-4">
          <h1 className="text-xl font-bold mb-4">{translation("upload")}</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              className="block w-full mb-4"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? translation("process")
                  : translation("placeorder")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  navigate(-1);
                }}
                className="w-full mt-4 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-700"
              >
                {translation("cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
