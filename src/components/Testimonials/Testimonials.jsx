import About from "../../assets/about2.jpg";

const Testimonials = () => {
  return (
    <section className="w-full max-w-[1220px] mx-auto px-[clamp(0.75rem,3vw,1.5rem)] py-[clamp(1.5rem,3vw,3rem)] my-8" id="aboutus">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-bg-card/95 to-bg-card-alt/50 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-10">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src={About}
              alt="About us"
              className="rounded-2xl shadow-2xl w-full h-72 md:h-96 object-cover border border-white/10"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 space-y-4">
            <p className="text-xs text-accent uppercase tracking-widest font-semibold">Who We Are</p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Built for <span className="text-accent">Champions</span>,<br />
              Designed for <span className="text-accent">Everyone</span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              We are a passionate team of fitness professionals dedicated to helping you reach your peak performance.
              From beginners to elite athletes, our programs are crafted to push your limits, build strength,
              and transform your lifestyle — one rep at a time.
            </p>
            <div className="flex gap-6 pt-2">
              <div>
                <p className="text-2xl font-black text-accent">10+</p>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl font-black text-accent">500+</p>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Happy Members</p>
              </div>
              <div>
                <p className="text-2xl font-black text-accent">50+</p>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Programs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
