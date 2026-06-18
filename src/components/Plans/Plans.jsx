import { useState, useEffect, useContext } from "react";
import axios from "../../axios.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLanguage } from "../../context/LanguageProvider";
import { UserContext } from "../../context/UserContext"; // 💡 သင့် Context လမ်းကြောင်းအတိုင်း သေချာစစ်ပေးပါ
import LoadingSpinner from "../LoadingSpinner.jsx";
import Modal from "../Modal";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true); // Plans API Loading
  const [error, setError] = useState(false);
  const { language, translation } = useLanguage();
  
  // 💡 Context ဆီက 'loading' ကို 'authLoading' အဖြစ် Alias လုပ်ပြီး ဆွဲယူလိုက်ခြင်း
  const { user, loading: authLoading, fetchUserProfile } = useContext(UserContext); 
  
  const [showModal, setShowModal] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("plans")
      .then((r) => setPlans(r.data.data))
      .catch(() => { setPlans([]); setError(true); })
      .finally(() => setLoading(false));
  }, []);

  const handleActionClick = (plan) => {
    if (!user) {
      setIsSignUpPage(false);
      setShowModal(true);
      return;
    }

    if (user.is_premium) {
      toast.info("You already have an active premium plan.");
      return;
    }
    
    // တကယ်လို့ Backend က 'has_pending' ပါ ပြန်ပေးလာရင် ဤနေရာတွင် စစ်နိုင်သည်
    if (user.has_pending) {
      toast.info("Your previous order is pending verification.");
      return;
    }

    navigate("/checkout", { state: { planId: plan.id, planData: plan } });
  };

  const Header = () => (
    <div className="flex flex-wrap gap-2 font-black text-[clamp(1.6rem,4.5vw,3rem)] justify-center text-white uppercase tracking-wide text-center leading-tight">
      <span className="stroke-text">READY TO START</span>
      <span> YOUR JOURNEY</span>
      <span className="stroke-text"> NOW WITH US</span>
    </div>
  );

  if (loading) return (
    <section className="w-full max-w-[1220px] mx-auto px-[clamp(0.75rem,3vw,1.5rem)] py-[clamp(1.5rem,3vw,3rem)] flex flex-col gap-7" id="plans">
      <Header />
      <LoadingSpinner />
    </section>
  );

  if (error || plans.length === 0) return (
    <section className="w-full max-w-[1220px] mx-auto px-[clamp(0.75rem,3vw,1.5rem)] py-[clamp(1.5rem,3vw,3rem)] flex flex-col gap-7" id="plans">
      <Header />
      <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
        <p className="text-2xl">💪</p>
        <p className="text-slate-300 font-medium">{error ? "Unable to load plans." : "No plans available yet."}</p>
        <p className="text-slate-400 text-base">Please check back later.</p>
      </div>
    </section>
  );

  return (
    <section className="w-full max-w-[1220px] mx-auto px-[clamp(0.75rem,3vw,1.5rem)] py-[clamp(1.5rem,3vw,3rem)] flex flex-col gap-7" id="plans">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {plans.map((plan, i) => {
          
          // 💡 Logic အဓိကအချက်- Auth profile API ကို တောင်းနေတုန်း (authLoading === true) ဆိုရင်လည်း 
          // ခလုတ်ကို ပိတ် (disabled) ထားမှာဖြစ်ပြီး၊ auth loading ပြီးသွားရင်တော့ premium user ဟုတ်မဟုတ်အပေါ် မူတည်ပြီး ဆုံးဖြတ်ပါမယ်။
          const isButtonDisabled = authLoading || (user && (user.is_premium || user.has_pending));

          return (
            <div
              key={plan.id || i}
              className={`group relative flex flex-col gap-4 p-7 rounded-2xl border border-white/10 bg-bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(132,204,22,0.3)] ${
                i === 1 ? "ring-1 ring-accent/50 scale-[1.02] bg-gradient-to-br from-accent-dim to-bg-card border-accent/35" : ""
              }`}
            >
              {i === 1 && (
                <span className="absolute top-3 right-3 bg-accent text-bg-base text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Popular
                </span>
              )}
              <div>
                <p className="text-[0.7rem] uppercase tracking-widest text-accent-light font-bold">{plan[`title_${language}`]}</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-3xl font-black text-white">{plan[`price_${language}`]}</span>
                  <span className="text-slate-300 text-base">/ {plan[`month_${language}`]}</span>
                </div>
              </div>
              <div className="text-slate-400 text-sm leading-relaxed flex-1">{plan[`short_description_${language}`]}</div>
              
              <button
                onClick={() => handleActionClick(plan)}
                className={`btn mt-2 font-bold text-center transition-all ${
                  isButtonDisabled ? "opacity-40 cursor-not-allowed bg-slate-700 text-slate-400 hover:transform-none" : ""
                }`}
                disabled={isButtonDisabled} // 💡 Auth Loading စစ်နေစဉ် နှိပ်ခွင့် ပိတ်ထားမည်
              >
                {authLoading 
                  ? "Checking..." // 💡 Refresh လုပ်လိုက်တဲ့ စက္ကန့်ပိုင်းအတွင်း ခလုတ်ထဲမှာ ပြသမည့်စာသား
                  : translation("getnow")
                }
              </button>
            </div>
          );
        })}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {isSignUpPage
            ? <SignUp switchToSignIn={() => setIsSignUpPage(false)} onSuccess={() => { fetchUserProfile(); setShowModal(false); }} />
            : <SignIn switchToSignUp={() => setIsSignUpPage(true)} onSuccess={() => { fetchUserProfile(); setShowModal(false); }} />
          }
        </Modal>
      )}
    </section>
  );
};

export default Plans;