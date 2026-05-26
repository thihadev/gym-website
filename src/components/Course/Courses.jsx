import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Link, useParams, useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import { useLanguage } from '../../context/LanguageProvider';
const getApiErrorMessage = (err, fallback) => err?.response?.data?.message || fallback;

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { category } = useParams();
  const { categoryName, categoryNameMM } = useLocation().state || {};
  const { language, translation } = useLanguage();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios.get(`courses?keyword=${category}`, { signal: controller.signal })
      .then((r) => setCourses(r.data.data || []))
      .catch((err) => { if (err.code !== "ERR_CANCELED") { setCourses([]); setError(getApiErrorMessage(err, "Unable to load courses.")); } })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [category]);

  if (loading) return <LoadingSpinner />;

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h2 className="text-xl text-red-400 font-semibold">Error Loading Courses</h2>
      <p className="text-slate-300 mt-2 text-base">{error}</p>
    </div>
  );

  const displayName = (language === 'en' ? categoryName : categoryNameMM) || "Category";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mb-6">
      {/* Breadcrumb */}
      <div className="mb-8 text-center">
        <p className="text-base text-slate-400 uppercase tracking-widest mb-1">
          <Link to="/" className="hover:text-lime-400 transition">{translation("home")}</Link>
          <span className="mx-2">/</span>
          <span className="text-lime-400">{displayName}</span>
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-white">{displayName}</h1>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl mb-2">🏋️</p>
          <h4 className="text-lg font-semibold text-white">No courses found</h4>
          <p className="text-slate-300 text-base mt-1">Check back later for new content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/course/${course.slug}`}
              state={{ courseId: course.id }}
              onClick={() => localStorage.setItem('courseId', course.id)}
              className="group bg-[#111827] border border-white/8 rounded-xl overflow-hidden hover:border-lime-400/50 hover:shadow-[0_8px_32px_-8px_rgba(132,204,22,0.3)] transition duration-300"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={course.cover_image}
                  alt={course[`title_${language}`]}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-4">
                <h4 className="text-base font-semibold text-white mb-1 line-clamp-2">
                  {course[`title_${language}`]}
                </h4>
                <p className="text-base text-slate-300 line-clamp-2">
                  {course[`short_description_${language}`]}
                </p>
                <p className="text-base text-lime-400 font-semibold mt-3 uppercase tracking-wide">
                  View Course →
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
