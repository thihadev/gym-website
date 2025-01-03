
import HomeHeader from "../Header/HomeHeader";
import './Hero.css';
import NumberCounter from 'number-counter'

const Hero = () => {
    return (
        <div className="hero" id="hero">
            <div className="blur hero-blur"></div>
            <div className="left-h">
                <HomeHeader />
                {/* the best add */}
                <div className="the-best-add">

                </div>
                {/* hero heading */}
                <div className="hero-text">
                    <div>
                        <span className="stroke-text">shape</span>
                        <span> your</span>
                    </div>
                    <div>
                        <span>ideal body</span>
                    </div>
                    <div>
                        <span>
                            In here we will help you to shape and build your ideal body and live up your life to fullest
                        </span>
                    </div>
                </div>
                {/* figures */}
                <div className="figures">
                    <div>
                        <span>
                            <NumberCounter end={140} start={100} delay='4' preFix='+' />
                        </span>
                        <span> expert coaches </span>
                    </div>
                    <div>
                        <span>
                            <NumberCounter end={978} start={800} delay='4' preFix='+' />
                        </span>
                        <span>members joined</span>
                    </div>
                    <div>
                        <span>
                            <NumberCounter end={50} start={0} delay='4' preFix='+' />
                        </span>
                        <span>fitness programs</span>
                    </div>
                </div>
                {/* hero buttons */}
                {/* <div className="hero-buttons">
                    <button className="btn">Get Started</button><button className="btn">Learn More</button>
                </div> */}
            </div>
        </div>
    )
}
export default Hero