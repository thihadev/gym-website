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

const CourseDetailPage = () => {
  // fetchUserProfile ကို မလိုအပ်ဘဲ dependency loop မဖြစ်စေရန် Context ထံမှ တိုက်ရိုက်မခေါ်တော့ပါ
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { courseId } = location.state || {};
  const storedCourseId = localStorage.getItem('courseId'); 
  const [courseData, setCourseData] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const { language } = useLanguage();
  const list = translations;
  const lang = list[language];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const activeCourseId = courseId || storedCourseId;

    if (!activeCourseId) {
      setError(true);
      setLoading(false);
      return;
    }

    if (courseId) {
      localStorage.setItem('courseId', courseId);
    }

    // သင့်ရဲ့ မူရင်း Private / Public URL Routing Logic အမှန်ကို ပြန်လည်ထိန်းသိမ်းထားပါသည်
    const url = token ? `/course/${activeCourseId}/private` : `/course/${activeCourseId}`;

    axios
      .get(url, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      })
      .then((response) => {
        const course = response.data.data;
        setCourseData(course);

        // ပထမဆုံး လော့ခ်မကျနေတဲ့ ဗီဒီယိုလင့်ခ်ကို ရှာဖွေပြီး Default ဖွင့်ပေးရန်
        const firstUnlockedVideo = course.videos?.find(
          (video) => !video.is_locked
        );
        setCurrentVideo(firstUnlockedVideo ? firstUnlockedVideo.video_link : null);
      })
      .catch((err) => {
        console.error("Failed to fetch course data:", err);
        setError(true);
        // Security Check: အကယ်၍ Token သက်တမ်းကုန်ဆုံးမှုကြောင့် Error တက်ပါက Token ရှင်းပစ်ရန်
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("accessToken");
        }
      })
      .finally(() => setLoading(false));
  }, [courseId, storedCourseId]); // fetchUserProfile ကို Dependency ထဲမှ ဖယ်ထုတ်ထား၍ Loop မပတ်တော့ပါ

  const handleVideoClick = (video) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (video.is_locked) {
      setShowPurchaseModal(true);
      return;
    }

    setCurrentVideo(video.video_link);
  };

  const handleAuthSuccess = () => {
    // UserContext ရဲ့ global profile loader က အလုပ်လုပ်ပေးမည်ဖြစ်၍ ဒီမှာ ထပ်ခေါ်စရာမလိုပါ
    setShowLoginModal(false);
    // Login အောင်မြင်ပြီးနောက် Private Data အသစ်ပြန်ဆွဲနိုင်ရန် Page ကို တစ်ချက် reload လုပ်ပေးနိုင်သည်
    window.location.reload(); 
  };

  if (loading) return <LoadingSpinner />;

  if (error || !courseData) {
    return (
      <div className="error-message flex flex-col justify-center items-center h-screen text-center">
        <h2 className="text-xl text-red-600 font-semibold">
          Error Loading Course
        </h2>
        <p className="text-gray-600">
          Please try refreshing the page or check your connection.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 text-white">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500">
          {courseData[`title_${language}`] || courseData.title_en}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section - Video & Descriptions */}
        <div className="flex-1 space-y-10">
          <div className="bg-black rounded-lg overflow-hidden shadow-lg aspect-video max-h-[500px]">
            {currentVideo && user ? (
              <ReactPlayer 
                url={currentVideo} 
                controls={true}
                width="100%"
                height="100%"
                config={{ file: { attributes: { controlsList: 'nodownload' } } }} // Security: Prevent easy video download
               />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-500 py-24 px-4 text-center">
                <FaLock className="text-4xl mb-4 text-gray-600" />
                <p className="text-lg">
                  {user ? lang.videoLockedMessage || "This video is locked. Purchase a plan to unlock." : lang.loginRequiredMessage || "Please log in to watch the video."}
                </p>
              </div>
            )}
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-orange-500">{lang.overview || "Overview"}</h2>
            <p className="text-gray-300 leading-relaxed">
              {courseData[`description_${language}`] || courseData.description_en}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-orange-500">{lang.requirements || "Requirements"}</h2>
            <div className="text-gray-300 leading-relaxed space-y-2">
              {courseData[`requirement_${language}`] || courseData.requirement_en || "No specific requirements."}
            </div>
          </div>
        </div>

        {/* Right Section - Playlist Sidebar */}
        <div className="w-full lg:w-1/4 sticky top-0 self-start overflow-y-auto max-h-[calc(100vh-4rem)] bg-[#0e1217] p-4 rounded-lg shadow-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-800">{lang.videoList || "Video List"}</h2>
          <ul className="space-y-2">
            {courseData.videos && courseData.videos.length > 0 ? (
              courseData.videos.map((video, index) => (
                <li
                  key={video.id || video.videoId || index}
                  className={`p-3 border border-slate-800 rounded-md cursor-pointer transition duration-300 flex items-center justify-between ${
                    video.video_link === currentVideo
                      ? "bg-orange-600 text-white border-orange-500 font-medium"
                      : video.is_locked
                      ? "bg-gray-900/50 text-gray-500 hover:bg-gray-800"
                      : "bg-gray-900 hover:bg-[#293249] text-gray-300"
                  }`}
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="flex items-center space-x-3 truncate flex-1">
                    <span className="text-xs text-gray-500 font-mono">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-sm truncate">
                      {video.video_title}
                    </span>
                  </div>
                  <div>
                    {video.is_locked ? (
                      <FaLock className="ml-2 text-red-500 text-xs" />
                    ) : (
                      <FaPlayCircle className="ml-2 text-green-400 text-sm" />
                    )}
                  </div>
                </li>
              ))
            ) : (
              <div className="text-center p-6 text-gray-500">
                <h2 className="text-sm font-semibold">{lang.noData || "There is no video data."}</h2>
              </div>
            )}
          </ul>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          {isSignUpPage ? (
            <SignUp
              switchToSignIn={() => setIsSignUpPage(false)}
              onSuccess={handleAuthSuccess}
            />
          ) : (
            <SignIn
              switchToSignUp={() => setIsSignUpPage(true)}
              onSuccess={handleAuthSuccess}
            />
          )}
        </Modal>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <Modal onClose={() => setShowPurchaseModal(false)}>
          <div className="text-center p-4">
            <h2 className="text-xl text-black font-semibold">{lang.purchaseRequired || "Purchase Required"}</h2>
            <p className="my-4 text-gray-700">
              {lang.purchaseMessage || "This video is premium. Do you want to purchase a plan?"}
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <Link
                to="/"
                state={{ scrollToSection: "plans" }}
                className="cursor-pointer font-bold text-white bg-orange-500 rounded-full px-6 py-2 hover:bg-orange-600 transition"
              >
                Yes
              </Link>
              <button
                className="cursor-pointer font-bold text-gray-700 bg-gray-200 rounded-full px-6 py-2 hover:bg-gray-300 transition"
                onClick={() => setShowPurchaseModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CourseDetailPage;