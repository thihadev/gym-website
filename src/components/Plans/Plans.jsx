import "./Plans.css";
import { useState, useEffect } from "react";
import axios from "../../axios.js";
import { Link } from "react-router-dom";

const Plans = () => {
  const [plans, setPlan] = useState([]);
  const [error, setError] = useState(false); // Error state

  useEffect(() => {
    axios
      .get("plans")
      .then((response) => {
        setPlan(response.data.data); // Set courses data
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setPlan(null);
        setError(true); // Set error state
        localStorage.removeItem("accessToken"); // Clear token
      });
  }, []); // Runs only once on component mount

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
      {/* header */}
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
        <span className="stroke-text">NOW WITHUS</span>
      </div>
      {/* plans card */}
      <div className="plans mb-5">
        {plans
          ? plans.map((plan, i) => (
              <div className="plan p-6" key={i}>
                {/* {plan.icon} */}
                <span>{plan.title}</span>
                <span>
                  {plan.month} - {plan.price} MMK
                </span>

                <div className="features">
                  {plan.short_description}
                  {/* {plan.features.map((feature, i) => (
                                <div className="feature" key={i} >
                                    <img src={whiteTick} alt="feature icon" />
                                    <span  >{feature}</span>
                                </div>
                            ))} */}
                </div>
                {/* <span>See more benefits &rarr;</span> */}

                <Link to="order" state={{ plan: plan }} className="btn">
                  Get Now
                </Link>
              </div>
            ))
          : "LOADING"}
      </div>
    </div>
  );
};
export default Plans;
