import "./Plans.css";
import { useState, useEffect } from "react";
import axios from "../../axios.js";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";
import transactions from "../../data/transactions";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(false);
  const { language } = useLanguage();
  const list = transactions;
  const lang = list[language];

  useEffect(() => {
    axios
      .get("plans")
      .then((response) => {
        setPlans(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching plans:", error);
        setPlans([]);
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <div className="error-message flex flex-col justify-center items-center text-center">
        <h2 className="text-xl text-red-600 font-semibold">
          Error Loading Plans
        </h2>
        <p className="text-gray-600">
          Please try refreshing the page or check your connection.
        </p>
      </div>
    );
  }

  return (
    <div className="plans-container my-5">
      {/* Header */}
      <div className="blur plans-blur-1"></div>
      <div className="blur plans-blur-2"></div>
      <div
        className="programs-header"
        style={{
          gap: "2rem",
        }}
      >
        <span className="stroke-text">READY TO START</span>
        <span>YOUR JOURNEY</span>
        <span className="stroke-text">NOW WITH US</span>
      </div>

      {/* Plans Cards */}
      <div className="plans mb-5">
        {plans.length > 0 ? (
          plans.map((plan, i) => (
            <div className="plan p-6" key={i}>
              <span>{plan[`title_${language}`]}</span>
              <p><span className="">{plan[`month_${language}`]} </span>
                 - 
              <span> {plan[`price_${language}`]}</span></p>

              <div className="features">
                { plan[`short_description_${language}`]}
              </div>

              <Link to="checkout" state={{ plan: plan }} className="btn">
                {lang.getnow}
              </Link>
            </div>
          ))
        ) : (
          "LOADING"
        )}
      </div>
    </div>
  );
};

export default Plans;
