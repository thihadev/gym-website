import React, { useState, useEffect, useContext } from "react";
import QR from "../../assets/kpay-logo.png";
import QR2 from "../../assets/wave.png";
import { useLocation } from "react-router-dom";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import { toast } from 'react-toastify';
// import transactions from '../data/transactions.js'
import { useLanguage } from '../LanguageProvider'
import { UserContext } from "../../hook/UserContext";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan } = location.state || {};
  const { user, fetchUserProfile } = useContext(UserContext);

  const [plans, setPlan] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(plan);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const { language } = useLanguage();
  // const list = transactions;
  // const lang = list[language];

  const paymentMethods = [
    { id: "Kpay", name: "Kpay", icon: QR },
    { id: "WavePay", name: "WavePay", icon: QR2 },
  ];

  useEffect(() => {
    axios
      .get("/plans")
      .then((response) => {
        setPlan(response.data.data);
      })
      .catch((error) => {
        setPlan(null);
      });
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowQRCode(false);
  };

  const handlePaymentSelect = (method) => {
    setSelectedPaymentMethod(method);
    setShowQRCode(true);
  };

  const placeOrder = () => {
    if (!selectedPlan) {
      toast.error("Please select a subscription plan.");
      return;
    }
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    console.log(user);
    if (!user) {
      setShowModal(true);
      return;
    }

    const orderDetails = {
      orderId : selectedPlan.id,
      planName: selectedPlan.title_en,
      amount: selectedPlan.price_en,
      paymentMethod: selectedPaymentMethod,
      planNameMM: selectedPlan.title_mm,
      amountMM: selectedPlan.price_mm,
    };

    navigate("/order", { state: orderDetails });
  };

  const handleAuthSuccess = () => {
    if (!user) {
      fetchUserProfile();
    }
    setShowModal(false);
};

  const getQRCode = () => {
    const selectedMethod = paymentMethods.find(
      (method) => method.id === selectedPaymentMethod
    );
    return selectedMethod?.icon || null;
  };

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Subscribe to a Plan</h1>

        {/* Subscription Plans */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Choose a Plan</h2>
          <div className="flex flex-col gap-2">
            {plans.map((plan) => (
              <label
                key={plan.id}
                className={`p-3 border rounded-lg flex justify-between items-center cursor-pointer ${
                  selectedPlan?.id === plan.id ? "border-blue-500 bg-blue-100" : "border-gray-300"
                }`}
                onClick={() => handlePlanSelect(plan)}
              >
                <span className="font-semibold">{plan[`title_${language}`]}</span>
                <span className="font-semibold">{plan[`price_${language}`]} / Month</span>
              </label>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Select a Payment Method</h2>
          <div className="flex flex-col gap-2">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`p-3 border rounded-lg flex items-center gap-4 cursor-pointer ${
                  selectedPaymentMethod === method.id ? "border-blue-500 bg-blue-100" : "border-gray-300"
                }`}
                onClick={() => handlePaymentSelect(method.id)}
              >
                <img src={method.icon} alt={method.name} className="w-6 h-6" />
                <span>{method.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dynamic QR Code Display */}
        {showQRCode && selectedPlan && selectedPaymentMethod && (
          <div className="mb-4 p-4 bg-gray-100 rounded-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Scan to Pay</h2>
            <img
              src={getQRCode()}
              alt={`${selectedPaymentMethod} QR Code`}
              className="mx-auto w-40 h-40"
            />
            {/* <p className="text-sm text-gray-500 mt-2">
              This QR code is for the {selectedPlan.name} - {selectedPlan.price} mmk/month
            </p> */}
          </div>
        )}

        {/* Place Order Button */}
        <button
          onClick={placeOrder}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
        >
          Checkout
        </button>
      </div>

      {/* Modal for Login */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {isSignUpPage ? (
            <SignUp
              switchToSignIn={() => setIsSignUpPage(false)}
              onSuccess={handleAuthSuccess}
            />
          ) : (
            <SignIn
              switchToSignUp={() => setIsSignUpPage(true)}
              onSuccess={handleAuthSuccess}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Checkout;
