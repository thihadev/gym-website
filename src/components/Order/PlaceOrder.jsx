import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useLanguage } from "../../context/LanguageProvider";

export default function PlaceOrder() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderDetail = location.state || {};
  const [file, setFile] = useState(null);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language, translation } = useLanguage();

  useEffect(() => {
    if (!orderDetail.orderId || !orderDetail.amount) {
      navigate("/");
      toast.error("Check Order & Amount");
    }
  }, [orderDetail.orderId, orderDetail.amount, navigate]);

  if (!orderDetail.orderId || !orderDetail.amount) {
    return null;
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (!file) {
      toast.error("Please select a payslip to upload.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please log in first.");
      navigate("/");
      return;
    }

    const formData = new FormData();
    formData.append("package", orderDetail.orderId);
    formData.append("amount", orderDetail.amount);
    formData.append("payment_channel", orderDetail.paymentMethod);
    formData.append("phone", phone);
    formData.append("payslip", file);

    try {
      setIsSubmitting(true);

      await axios.post("/upload-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Order successfully!");
      navigate("/");
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data && data.message) {
          toast.info(data.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
      else if (error.request) {
        toast.error(
          "Cannot connect to server.",
        );
      }
      else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-4 pt-8">
      <div className="w-full max-w-lg bg-bg-card border border-white/10 rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          {translation("order")}
        </h1>

        {/* Order Details */}
        <div className="mb-6">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center px-4 py-3 bg-bg-card-alt border border-white/10 rounded-xl">
              <span className="text-slate-400 font-medium">Package :</span>
              <span className="text-accent font-semibold text-right">
                {language === "en"
                  ? orderDetail.planName
                  : orderDetail.planNameMM}
              </span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-bg-card-alt border border-white/10 rounded-xl">
              <span className="text-slate-400 font-medium">Amount :</span>
              <span className="text-white font-bold">
                {language === "en" ? orderDetail.amount : orderDetail.amountMM}
              </span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-bg-card-alt border border-white/10 rounded-xl">
              <span className="text-slate-400 font-medium">Payment :</span>
              <span className="text-emerald-400 font-medium">
                {orderDetail.paymentMethod}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">
                {translation("phone")}
              </label>
              <input
                type="text"
                required
                placeholder={translation("phone_placeholder")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-bg-card-alt text-white placeholder-slate-500 focus:outline-none focus:border-accent transition text-sm"
              />
            </div>

            <div>
              <h2 className="text-sm font-medium text-slate-400 mb-2">
                {translation("upload")}
              </h2>
              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-white/15 rounded-xl cursor-pointer hover:border-accent/50 transition bg-bg-card-alt">
                <span className="text-3xl mb-2">📄</span>
                <span className="text-slate-400 text-sm text-center px-4">
                  {file ? file.name : "Click to select payslip image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl bg-accent text-bg-base font-bold text-base hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed transition"
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
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl border border-white/10 text-slate-300 font-semibold text-base hover:bg-white/5 transition"
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
