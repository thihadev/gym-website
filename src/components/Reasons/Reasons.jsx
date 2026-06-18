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
        <div className="w-full max-w-[1220px] mx-auto px-[clamp(0.75rem,3vw,1.5rem)] py-[clamp(1.5rem,3vw,3rem)] grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
            <div className="grid grid-cols-3 gap-2.5 min-h-[320px] md:min-h-[200px]">
                <img src={image1} alt="" className="w-full h-full object-cover rounded-xl brightness-90 hover:brightness-100 transition row-span-2" />
                <img src={image2} alt="" className="w-full h-full object-cover rounded-xl brightness-90 hover:brightness-100 transition col-span-2" />
                <img src={image3} alt="" className="w-full h-full object-cover rounded-xl brightness-90 hover:brightness-100 transition" />
                <img src={image4} alt="" className="w-full h-full object-cover rounded-xl brightness-90 hover:brightness-100 transition" />
            </div>
            <div className="flex flex-col justify-center gap-4">
                <div className="text-[clamp(1.8rem,4.5vw,3rem)] font-black uppercase leading-tight">
                    <span className="stroke-text">Why</span>
                    <span> choose us?</span>
                </div>
                <div className="flex flex-col gap-2.5">
                    {[translation("why_one"), translation("why_two"), translation("why_three"), translation("why_four")].map((text, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-200 text-sm">
                            <img src={tick} alt="tick" className="w-5 h-5 shrink-0" />
                            <span>{text}</span>
                        </div>
                    ))}
                </div>
                <span className="text-slate-400 font-normal">{translation("our_partner")}</span>
                <div className="flex gap-3 mt-1 flex-wrap">
                    {[nb, adidas, nike].map((brand, i) => (
                        <img key={i} src={brand} alt="" className="w-9 p-1.5 rounded-xl bg-white/10 brightness-0 invert opacity-60 hover:opacity-100 transition" />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Reasons
