import HomeHeader from "../Header/HomeHeader";
import CountUp from 'react-countup';
import { useLanguage } from "../../context/LanguageProvider";

const Hero = () => {
  const { translation } = useLanguage();

  return (
    <section className="relative min-h-svh flex isolation-auto overflow-hidden">
      <img src="/fitness-men-abs.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 18% 22%, rgba(163,230,53,0.18), transparent 44%),
            linear-gradient(115deg, rgba(10,15,30,0.88) 30%, rgba(10,15,30,0.55) 100%)
          `
        }}
      />
      <div className="absolute -right-24 -top-12 w-[clamp(14rem,45vw,26rem)] h-[clamp(14rem,45vw,26rem)] rounded-full bg-lime-400/20 blur-[80px] pointer-events-none" />

      <div className="relative w-full flex flex-col">
        <HomeHeader />

        <div className="max-w-[1200px] mx-4 md:ml-32 md:mr-auto my-10 md:my-20 px-4 md:px-8 pb-12 flex flex-col gap-5">

        {/* Badge */}
        <div className="inline-flex gap-1.5 border border-white/20 rounded-full bg-black/60 backdrop-blur-md text-lime-200 text-[0.72rem] tracking-widest uppercase px-4 py-2 w-fit">
          <span>🔥 #1 Fitness Training Platform</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-1.5 uppercase font-black text-[clamp(2.4rem,7vw,5.5rem)] leading-none text-white max-w-[14ch]">
          <div>
            <span className="stroke-text">Shape </span>
            <span>Your</span>
          </div>
          <div><span>Ideal Body</span></div>
          <div className="mt-3 text-[clamp(0.9rem,1.6vw,1.05rem)] font-normal leading-relaxed normal-case max-w-[52ch] text-slate-300">
            {translation('hero_body')}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[clamp(0.6rem,1.5vw,1rem)] w-full max-w-[680px] mt-2">
          {[
            { end: 140, start: 100, label: translation("hero_fig_1") },
            { end: 978, start: 800, label: translation("hero_fig_2") },
            { end: 50, start: 0, label: translation("hero_fig_3") },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1 p-4 rounded-xl border border-white/10 bg-black/55 backdrop-blur-md">
              <span className="text-accent-light text-[clamp(1.4rem,2.5vw,2.1rem)] font-black leading-none">
                <CountUp end={stat.end} start={stat.start} duration={4} />+
              </span>
              <span className="text-slate-400 text-[0.72rem] uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
