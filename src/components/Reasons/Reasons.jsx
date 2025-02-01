import './Reasons.css'
import image1 from '../../assets/image1.png'
import image2 from '../../assets/image2.png'
import image3 from '../../assets/image3.png'
import image4 from '../../assets/image4.png'
import nb from '../../assets/nb.png'
import adidas from '../../assets/adidas.png'
import nike from '../../assets/nike.png'
import tick from '../../assets/tick.png'
import { useLanguage } from "../../context/LanguageProvider";

const Reasons = () => {
    const { translation } = useLanguage();
    return (
        <div className="reasons">
            <div className="left-r">
                <img src={image1} alt="image1" />
                <img src={image2} alt="image2" />
                <img src={image3} alt="image3" />
                <img src={image4} alt="image4" />
            </div>
            <div className="right-r">
                {/* <span>some reasons</span> */}
                <div>
                    <span className="stroke-text">Why</span>
                    <span> choose us?</span>
                </div>
                <div className="details-r" >
                    <div>
                        <img src={tick} alt="tick" />
                        <span>{translation("why_one")}</span>
                    </div>
                    <div>
                        <img src={tick} alt="tick" />
                        <span>{translation("why_two")}</span>
                    </div>
                    <div>
                        <img src={tick} alt="tick" />
                        <span>{translation("why_three")}</span>
                    </div>
                    <div>
                        <img src={tick} alt="tick" />
                        <span>{translation("why_four")}</span>
                    </div>
                </div>
                <span
                    style={
                        { color: 'var(--gray)', fontWeight: 'normal' }
                    }
                >{translation("our_partner")}</span>
                <div className="partners">
                    <img src={nb} alt="nb" />
                    <img src={adidas} alt="adidas" />
                    <img src={nike} alt="nike" />
                   
                </div>
            </div>
        </div>

    )
}
export default Reasons