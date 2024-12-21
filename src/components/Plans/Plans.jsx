import './Plans.css'
import { useState, useEffect } from "react";
import axios from "../../axios.js";

const Plans = () => {
    const [plans, setPlan] = useState([]);

    useEffect(() => {
        axios
        .get("plans")
        .then((response) => {
            setPlan(response.data.data); // Set courses data
        })
        .catch((error) => {
            console.error("Error fetching courses:", error);
            setPlan(null);
            localStorage.removeItem("accessToken"); // Clear token
        });
    }, []); // Runs only once on component mount


    
    return (
        <div className="plans-container my-5" id="plans">
            {/* header */}
            <div className="blur plans-blur-1"></div>
            <div className="blur plans-blur-2"></div>
            <div className="programs-header" style={{
                gap: '2rem',
            }}>
                <span className="stroke-text" >READY TO START</span>
                <span>YOUR JOURNEY</span>
                <span className="stroke-text">NOW WITHUS</span>
            </div>
            {/* plans card */}
            <div className="plans mb-5">
                {plans.map((plan, i) => (
                    <div className="plan p-6" key={i}>
                        {/* {plan.icon} */}
                        <span>{plan.title}</span>
                        <span>{plan.month} - {plan.price} MMK</span>

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

                        <button className="btn">Get Now</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Plans