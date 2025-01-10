import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import transactions from '../data/transactions.js'
import { useLanguage } from '../components/LanguageProvider'

const CourseDetailPage = () => {
  const { slug } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { language } = useLanguage();
  const list = transactions;
  const lang = list[language];

  useEffect(() => {
    if (!slug) return;

    axios
      .get(`/course/${slug}`)
      .then((response) => {
        setCourseData(response.data.data);
        setCurrentVideo(response.data.data.videos?.[0]?.videoId);
        setLoading(false);
      })
      .catch((error) => {
        setCourseData(null);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  const opts = {
    height: "450",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-message flex flex-col justify-center items-center h-screen text-center">
        <h2 className="text-xl text-red-600 font-semibold">
          Error Loading Programs
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
        <h1 className="text-3xl md:text-4xl font-bold">{courseData[`title_${language}`]}</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section: Video Player and Details */}
        <div className="flex-1 space-y-10">
          {/* Video Player */}
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            {currentVideo && <YouTube videoId={currentVideo} opts={opts} />}
          </div>

          {/* Course Overview */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">{lang.overview}</h2>
            <p className="text-white leading-relaxed">
              {courseData[`description_${language}`]}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">{lang.requirements}</h2>
            <ul className="space-y-2">{courseData[`requirement_${language}`]}</ul>
          </div>
        </div>

        {/* Left Section: Fixed Sidebar */}
        <div className="w-full lg:w-1/4 sticky top-0 self-start overflow-y-auto h-screen bg-[#0e1217] p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{lang.videoList}</h2>
          <ul className="space-y-1">
            {courseData.videos.map((video) => (
              <li
                key={video.videoId}
                className={`p-3 border border-slate-700 rounded-md cursor-pointer transition duration-300 ${
                  video.videoId === currentVideo
                    ? "bg-[#293249] text-white border-blue-500"
                    : "hover:bg-[#293249] hover:text-white"
                }`}
                onClick={() => setCurrentVideo(video.videoId)}
              >
                <span className="text-sm font-medium">{video.video_title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
