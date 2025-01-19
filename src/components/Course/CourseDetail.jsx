import React, { useState, useEffect, useContext } from "react";
import YouTube from "react-youtube";
import axios from "../../axios";
import { Link, useLocation } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import transactions from "../../data/transactions.js";
import { useLanguage } from "../../components/LanguageProvider";
import { FaLock, FaPlayCircle } from "react-icons/fa";
import Modal from "../../components/Modal";
import SignIn from "../../components/Auth/SignIn";
import SignUp from "../../components/Auth/SignUp";
import { UserContext } from "../../context/UserContext.js";

const CourseDetailPage = () => {
  const { user, fetchUserProfile } = useContext(UserContext);
  const location = useLocation();
  const { courseId } = location.state || {};
  const [courseData, setCourseData] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const { language } = useLanguage();
  const list = transactions;
  const lang = list[language];

  useEffect(() => {
    if (!courseId) return;
    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchUserProfile();
    }

    const url = token ? `/course/${courseId}/private` : `/course/${courseId}`;

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

        const firstUnlockedVideo = course.videos.find(
          (video) => !video.is_locked
        );
        setCurrentVideo(firstUnlockedVideo ? firstUnlockedVideo.videoId : null);
      })
      .catch((err) => {
        console.error("Failed to fetch course data:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [fetchUserProfile, courseId]);

  const handleVideoClick = (video) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (video.is_locked) {
      setShowPurchaseModal(true);
      return;
    }

    setCurrentVideo(video.videoId);
  };

  const handleAuthSuccess = () => {
    fetchUserProfile();
    setShowLoginModal(false);
  };

  const opts = {
    height: "450",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
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
    <div className="container mx-auto px-4 text-white">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          {courseData[`title_${language}`]}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1 space-y-10">
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            {currentVideo && user ? (
              <YouTube videoId={currentVideo} opts={opts} />
            ) : (
              <div className="text-center text-gray-600 py-20">
                {user ? lang.videoLockedMessage || "This video is locked." : lang.loginRequiredMessage || "Please log in to watch the video."}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{lang.overview}</h2>
            <p className="text-white leading-relaxed">
              {courseData[`description_${language}`]}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{lang.requirements}</h2>
            <ul className="space-y-2">
              {courseData[`requirement_${language}`]}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/4 sticky top-0 self-start overflow-y-auto h-screen bg-[#0e1217] p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{lang.videoList}</h2>
          <ul className="space-y-1">
            {courseData.videos.map((video, index) => (
              <li
                key={video.videoId || `locked-${index}`}
                className={`p-3 border border-slate-700 rounded-md cursor-pointer transition duration-300 flex items-center ${
                  video.videoId === currentVideo
                    ? "bg-[#293249] text-white border-blue-500"
                    : video.is_locked
                    ? "text-white cursor-not-allowed"
                    : "hover:bg-[#293249] hover:text-white"
                }`}
                onClick={() => handleVideoClick(video)}
              >
                <span className="text-sm font-medium flex-1">
                  {video.video_title}
                </span>
                {video.is_locked ? (
                  <FaLock className="ml-2 text-red-500" />
                ) : (
                  <FaPlayCircle className="ml-2 text-gray-400" />
                )}
              </li>
            ))}
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
          <div className="text-center">
            <h2 className="text-xl font-semibold">{lang.purchaseRequired || "Purchase Required"}</h2>
            <p className="my-4">
              {lang.purchaseMessage || "This video is premium. Do you want to purchase?"}
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/"
                state={{ scrollToSection: "plans" }}
                className="cursor-pointer font-bold text-white bg-gray-900 border rounded-full px-4 py-2 hover:bg-gray-700"
              >
                Yes
              </Link>
              <button
                className="cursor-pointer font-bold text-white bg-gray-900 border rounded-full px-4 py-2 hover:bg-gray-700"
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
