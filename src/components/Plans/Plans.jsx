import './Plans.css'
import { plansData } from '../../data/plansData'
import whiteTick from '../../assets/tick.png'
const Plans = () => {
    return (
        <div className="plans-container" id="plans">
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
            <div className="plans">
                {plansData.map((plan, i) => (
                    <div className="plan" key={i}>
                        {plan.icon}
                        <span>{plan.name}</span>
                        <span>$ {plan.price}</span>

                        <div className="features">
                            {plan.features.map((feature, i) => (
                                <div className="feature" key={i} >
                                    <img src={whiteTick} alt="feature icon" />
                                    <span  >{feature}</span>
                                </div>
                            ))}
                        </div>
                        <span>See more benefits &rarr;</span>

                        <button className="btn">Join Now</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Plans