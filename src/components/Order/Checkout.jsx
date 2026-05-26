import React, { useState, useEffect, useContext } from "react";
import QR from "../../assets/kpay-logo.png";
import QR2 from "../../assets/wave.png";
import QR3 from "../../assets/aya.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios";
import Modal from "../Modal";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import { toast } from "react-toastify";
import { useLanguage } from "../../context/LanguageProvider";
import { UserContext } from "../../context/UserContext";

const paymentMethods = [
  { id: "Kpay",    name: "KPay",    icon: QR  },
  { id: "WavePay", name: "WavePay", icon: QR2 },
  { id: "AyaPay",  name: "AyaPay",  icon: QR3 },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { plan: initialPlan } = useLocation().state || {};
  const { user, fetchUserProfile } = useContext(UserContext);
  const { language, translation } = useLanguage();

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);

  useEffect(() => {
    axios.get("/plans").then((r) => setPlans(r.data.data)).catch(() => {});
  }, []);

  const placeOrder = () => {
    if (!selectedPlan)    { toast.error("Please select a plan.");           return; }
    if (!selectedPayment) { toast.error("Please select a payment method."); return; }
    if (!user)            { setShowModal(true);                             return; }
    navigate("/order", {
      state: {
        orderId: selectedPlan.id,
        planName: selectedPlan.title_en,
        planNameMM: selectedPlan.title_mm,
        amount: selectedPlan.price_en,
        amountMM: selectedPlan.price_mm,
        paymentMethod: selectedPayment,
      },
    });
  };

  const qrIcon = paymentMethods.find((m) => m.id === selectedPayment)?.icon;

  return (
    <div className="min-h-screen flex items-start justify-center p-4 pt-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-white text-center mb-8">{translation("order")}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ── LEFT COLUMN: Plan Selection + Payment ── */}
          <div className="space-y-6">
            {/* Plans */}
            <div className="bg-bg-card border border-white/10 rounded-2xl p-6">
              <h2 className="text-base font-semibold text-slate-400 uppercase tracking-widest mb-4">{translation("choose")}</h2>
              <div className="space-y-2">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full flex justify-between items-center px-4 py-3 rounded-xl border text-base font-medium transition ${
                      selectedPlan?.id === plan.id
                        ? "border-accent bg-accent-dim text-white"
                        : "border-white/10 bg-bg-card-alt text-slate-300 hover:border-white/20"
                    }`}
                  >
                    <span>{plan[`title_${language}`]}</span>
                    <span className="text-accent font-bold">{plan[`price_${language}`]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-bg-card border border-white/10 rounded-2xl p-6">
              <h2 className="text-base font-semibold text-slate-400 uppercase tracking-widest mb-4">{translation("payment_method")}</h2>
              <div className="space-y-2">
                {paymentMethods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedPayment(m.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-base font-medium transition ${
                      selectedPayment === m.id
                        ? "border-accent bg-accent-dim text-white"
                        : "border-white/10 bg-bg-card-alt text-slate-300 hover:border-white/20"
                    }`}
                  >
                    <img src={m.icon} alt={m.name} className="w-7 h-7 object-contain rounded" />
                    <span>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: QR + Actions ── */}
          <div className="space-y-6">
            {/* QR Code */}
            {qrIcon && selectedPlan ? (
              <div className="bg-bg-card border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-5">
                <p className="text-base text-slate-400">{translation("scan")}</p>
                <img src={qrIcon} alt="QR" className="w-44 h-44 object-contain rounded-lg" />
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{selectedPlan[`title_${language}`]}</p>
                  <p className="text-2xl font-black text-accent mt-1">{selectedPlan[`price_${language}`]}</p>
                </div>
              </div>
            ) : (
              <div className="bg-bg-card border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 min-h-[250px]">
                <p className="text-4xl">💳</p>
                <p className="text-slate-400 text-base text-center">Select a plan and payment method to proceed</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={placeOrder} className="flex-1 py-3 rounded-xl bg-accent text-bg-base font-bold text-base hover:bg-accent-light transition">
                {translation("checkout")}
              </button>
              <button onClick={() => navigate(-1)} className="flex-1 py-3 rounded-xl border border-white/10 text-slate-300 font-semibold text-base hover:bg-white/5 transition">
                {translation("cancel")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {isSignUpPage
            ? <SignUp switchToSignIn={() => setIsSignUpPage(false)} onSuccess={() => { fetchUserProfile(); setShowModal(false); }} />
            : <SignIn switchToSignUp={() => setIsSignUpPage(true)} onSuccess={() => { fetchUserProfile(); setShowModal(false); }} />
          }
        </Modal>
      )}
    </div>
  );
};

export default Checkout;
