import HomeHeader from "../Header/HomeHeader";
import './Hero.css';
import NumberCounter from 'number-counter'
import { useLanguage } from "../../context/LanguageProvider";

const Hero = () => {
const { translation } = useLanguage();

    return (
        <div className="hero">
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
                            {translation('hero_body')}
                        </span>
                    </div>
                </div>
                
                {/* figures */}
                <div className="figures text-center">
                    <div>
                        <span>
                            <NumberCounter end={140} start={100} delay='4' preFix='' />
                        </span>
                        <span> {translation("hero_fig_1")} </span>
                    </div>
                    <div>
                        <span>
                            <NumberCounter end={978} start={800} delay='4' preFix='' />
                        </span>
                        <span>{translation("hero_fig_2")}</span>
                    </div>
                    <div>
                        <span>
                            <NumberCounter end={50} start={0} delay='4' preFix='' />
                        </span>
                        <span>{translation("hero_fig_3")}</span>
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