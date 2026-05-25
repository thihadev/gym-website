import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useLanguage } from "../../context/LanguageProvider";

export default function ImageUploader() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderDetail = location.state || {};
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { translation } = useLanguage();

  useEffect(() => {
    if (!orderDetail.orderId || !orderDetail.amount) {
      navigate("/");
      toast.error("Invalid Order Details.");
    }

    // Component Memory Cleanup Effect
    return () => {
      setFile(null);
    };
  }, [orderDetail.orderId, orderDetail.amount, navigate]);

  if (!orderDetail.orderId || !orderDetail.amount) {
    return null;
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a payslip to upload.");
      return;
    }

    if (isSubmitting) return; // Prevent Double Submission Performance Bug

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("package", orderDetail.orderId);
    formData.append("image", file);

    try {
      const response = await axios.post("/payslips", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 21) {
        toast.success("Payslip uploaded successfully! Waiting for approval.");
        navigate("/");
      }
    } catch (error) {
      console.error("Payslip upload failed:", error.message);
      toast.error(error.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-6 text-white">
      <div className="max-w-md w-full bg-gray-900 p-6 rounded-lg shadow-xl space-y-6">
        <h1 className="text-2xl font-bold text-center text-orange-500 border-b border-gray-800 pb-3">
          {translation("order_details") || "Order Confirmation"}
        </h1>

        <div className="space-y-3 bg-gray-800 p-4 rounded-lg text-sm">
          <div className="flex justify-between"><span className="text-gray-400">Order ID:</span><span className="font-mono font-bold text-orange-400">{orderDetail.orderId}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Amount:</span><span className="font-bold">{orderDetail.amount} MMK</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Payment Method:</span><span className="text-green-400 font-medium">{orderDetail.paymentMethod}</span></div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">{translation("upload") || "Upload Payslip Screenshot"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="file"
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
              accept="image/*"
              onChange={handleFileChange}
            />
            
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold py-2.5 rounded-lg transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? translation("process") || "Processing..." : translation("placeorder") || "Submit Order"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 rounded-lg transition"
                disabled={isSubmitting}
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