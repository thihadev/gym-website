import React, { useState, useEffect, useContext } from "react";
import axios from "../../axios";
import { Link, useLocation } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import translations from "../../data/translations.js";
import { useLanguage } from "../../context/LanguageProvider";
import { FaLock, FaPlayCircle } from "react-icons/fa";
import Modal from "../../components/Modal";
import SignIn from "../../components/Auth/SignIn";
import SignUp from "../../components/Auth/SignUp";
import { UserContext } from "../../context/UserContext.js";
import ReactPlayer from "react-player";

const getAccessToken = () => localStorage.getItem("accessToken");

const CourseDetailPage = () => {
  const { user } = useContext(UserContext);
  const { courseId } = useLocation().state || {};
  const [courseData, setCourseData] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const { language } = useLanguage();
  const lang = translations[language];

  useEffect(() => {
    const activeCourseId = courseId || localStorage.getItem("courseId");
    if (!activeCourseId) { 
      setError(true); 
      setLoading(false); 
      return; 
    }
    if (courseId) localStorage.setItem("courseId", courseId);

    const token = getAccessToken();
    const url = token ? `/course/${activeCourseId}/private` : `/course/${activeCourseId}`;
    const controller = new AbortController();

    setLoading(true);
    setError(false);

    axios.get(url, { signal: controller.signal })
      .then((r) => {
        const course = r.data.data;
        setCourseData(course);
        // ပထမဆုံး လော့ခ်မကျထားတဲ့ ဗီဒီယို Object တစ်ခုလုံးကို ရှာပြီး သိမ်းမည်
        const first = course.videos?.find((v) => !v.is_locked);
        setCurrentVideo(first || null);
      })
      .catch((err) => {
        if (err.code !== "ERR_CANCELED") {
          setError(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [courseId]);

  const handleVideoClick = (video) => {
    if (!user)          { setShowLoginModal(true);    return; }
    if (video.is_locked){ setShowPurchaseModal(true); return; }
    setCurrentVideo(video); // Video Object တစ်ခုလုံးကို state ထဲထည့်မည်
  };

  // Right-click နှိပ်ပြီး inspect element လုပ်ခြင်းကို တားဆီးရန်
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  if (loading || (!courseData && !error)) {
    return <LoadingSpinner />;
  }

  if (error || !courseData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-xl text-red-400 font-semibold">Error Loading Course</h2>
        <p className="text-slate-300 text-base mt-2">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mb-8">
      {/* Breadcrumb Title */}
      <div className="mb-6">
        <p className="text-base text-slate-400 uppercase tracking-widest mb-1">
          <Link to="/" className="hover:text-lime-400 transition">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-lime-400">{courseData[`title_${language}`]}</span>
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {courseData[`title_${language}`]}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Left: Video + Info ── */}
        <div className="flex-1 space-y-5 min-w-0">
          {/* Player Container */}
          <div 
            className="bg-black rounded-xl overflow-hidden border border-white/8 aspect-video select-none"
            onContextMenu={handleContextMenu}
          >
            {currentVideo && user ? (
              currentVideo.video_type === "file" ? (
                /* 🔒 Vimeo Secure Embed Player */
                <iframe
                  src={`https://player.vimeo.com/video/${currentVideo.videoId}?badge=0&autopause=0&player_id=0&app_id=58473&pip=0`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  style={{ width: "100%", height: "100%" }}
                  title={currentVideo.video_title}
                ></iframe>
              ) : (
                /* 📺 YouTube standard ReactPlayer */
                <ReactPlayer
                  url={currentVideo.video_link}
                  controls
                  width="100%"
                  height="100%"
                  config={{ file: { attributes: { controlsList: "nodownload" } } }}
                />
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center px-6">
                <FaLock className="text-3xl text-slate-600" />
                <p className="text-base text-slate-300">
                  {user
                    ? lang.videoLockedMessage || "This video is locked. Purchase a plan to unlock."
                    : lang.loginRequiredMessage || "Please log in to watch the video."}
                </p>
                {!user && (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="mt-1 px-5 py-2 rounded-full bg-lime-400 text-black text-base font-bold hover:bg-lime-300 transition"
                  >
                    Log In
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Overview */}
          <div className="bg-[#111827] border border-white/8 rounded-xl p-5">
            <h2 className="text-base font-bold text-lime-400 uppercase tracking-wide mb-3">
              {lang.overview || "Overview"}
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              {courseData[`description_${language}`]}
            </p>
          </div>

          {/* Requirements */}
          <div className="bg-[#111827] border border-white/8 rounded-xl p-5">
            <h2 className="text-base font-bold text-lime-400 uppercase tracking-wide mb-3">
              {lang.requirements || "Requirements"}
            </h2>
            <div className="text-slate-300 text-base leading-relaxed">
              {courseData[`requirement_${language}`] || "No specific requirements."}
            </div>
          </div>
        </div>

        {/* ── Right: Playlist ── */}
        <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-4 self-start">
          <div className="bg-[#111827] border border-white/8 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/8">
              <h2 className="text-base font-bold text-white">{lang.videoList || "Video List"}</h2>
            </div>
            <ul className="divide-y divide-white/5 max-h-[70vh] overflow-y-auto">
              {courseData.videos?.length > 0 ? courseData.videos.map((video, i) => (
                <li
                  key={video.id || i}
                  onClick={() => handleVideoClick(video)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition text-base ${
                    currentVideo && video.video_title === currentVideo.video_title
                      ? "bg-lime-400/15 text-lime-400"
                      : video.is_locked
                      ? "text-slate-600 cursor-not-allowed"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-base font-mono text-slate-600 w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 truncate">{video.video_title}</span>
                  {video.is_locked
                    ? <FaLock className="shrink-0 text-base text-slate-600" />
                    : <FaPlayCircle className={`shrink-0 text-base ${currentVideo && video.video_title === currentVideo.video_title ? "text-lime-400" : "text-slate-400"}`} />
                  }
                </li>
              )) : (
                <li className="px-4 py-8 text-center text-slate-400 text-base">
                  {lang.noData || "No videos available."}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          {isSignUpPage
            ? <SignUp switchToSignIn={() => setIsSignUpPage(false)} onSuccess={() => { setShowLoginModal(false); window.location.reload(); }} />
            : <SignIn switchToSignUp={() => setIsSignUpPage(true)} onSuccess={() => { setShowLoginModal(false); window.location.reload(); }} />
          }
        </Modal>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <Modal onClose={() => setShowPurchaseModal(false)}>
          <div className="text-center p-2">
            <div className="w-12 h-12 bg-lime-400/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-lime-400 text-lg" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              {lang.purchaseRequired || "Purchase Required"}
            </h2>
            <p className="text-slate-300 text-base mb-6">
              {lang.purchaseMessage || "This video is premium. Purchase a plan to unlock all content."}
            </p>
            <div className="flex gap-3">
              <Link
                to="/"
                state={{ scrollToSection: "plans" }}
                className="flex-1 py-2.5 rounded-full bg-lime-400 text-black font-bold text-base hover:bg-lime-300 transition text-center"
              >
                View Plans
              </Link>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 py-2.5 rounded-full border border-white/10 text-slate-300 font-semibold text-base hover:bg-white/5 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CourseDetailPage;