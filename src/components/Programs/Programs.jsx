import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../axios.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { useLanguage } from "../../context/LanguageProvider";

const Programs = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    axios
      .get("categories")
      .then((r) => { setCategories(r.data.data || []); setError(false); })
      .catch(() => { setCategories([]); setError(true); })
      .finally(() => setLoading(false));
  }, []);

  const Header = () => (
    <div className="flex flex-wrap gap-2 font-black text-[clamp(1.6rem,4.5vw,3rem)] justify-center text-white uppercase tracking-wide text-center leading-tight">
      <span className="stroke-text">Explore our</span>
      <span> Programs</span>
      <span className="stroke-text"> to shape you</span>
    </div>
  );

  if (loading) return (
    <section className="w-full max-w-[1220px] mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(1.5rem,3vw,3rem)] flex flex-col gap-7">
      <Header />
      <LoadingSpinner />
    </section>
  );

  if (error || categories.length === 0) return (
    <section className="w-full max-w-[1220px] mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(1.5rem,3vw,3rem)] flex flex-col gap-7">
      <Header />
      <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
        <p className="text-2xl">🏋️</p>
        <p className="text-slate-300 font-medium">{error ? "Unable to load programs." : "No programs available yet."}</p>
        <p className="text-slate-400 text-base">Please check back later.</p>
      </div>
    </section>
  );

  return (
    <section className="w-full max-w-[1220px] mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(1.5rem,3vw,3rem)] flex flex-col gap-7">
      <Header />

      <Swiper
        spaceBetween={16}
        autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          0:    { slidesPerView: 1 },
          480:  { slidesPerView: 2 },
          768:  { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="w-full pb-6 pt-2"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <Link to={`/courses/${cat.slug}`} state={{ categoryName: cat.name_en, categoryNameMM: cat.name_mm }}>
              <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-card cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-light/60 hover:shadow-[0_16px_32px_-16px_rgba(132,204,22,0.45)]">
                <div className="relative w-full h-44 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat[`name_${language}`]}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617cc] to-transparent" />
                </div>
                <div className="px-4 py-3">
                  <span className="text-base font-semibold text-white">{cat[`name_${language}`]}</span>
                  <p className="text-xs text-accent mt-1 uppercase tracking-widest">View Courses →</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Programs;
