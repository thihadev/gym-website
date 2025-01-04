import "./Programs.css";
import RightArrow from "../../assets/rightArrow2.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../axios.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import LoadingSpinner from "../LoadingSpinner.jsx";

const Programs = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(false); // Error state

  useEffect(() => {
    setLoading(true); // Start loading
    axios
      .get("categories")
      .then((response) => {
        setCategories(response.data.data); // Set categories data
        setError(false); // Reset error state
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]); // Reset categories
        setError(true); // Set error state
        localStorage.removeItem("accessToken"); // Clear token
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  }, []); // Runs only once on component mount

  if (loading )
  {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-message flex flex-col justify-center items-center h-screen text-center">
        <h2 className="text-xl text-red-600 font-semibold">Error Loading Programs</h2>
        <p className="text-gray-600">Please try refreshing the page or check your connection.</p>
      </div>
    );
  }

  return (
    <div className="programs m-10" id="programs">
      {/* header */}
      <div className="programs-header">
        <span className="stroke-text">Explore our</span>
        <span> Programs</span>
        <span className="stroke-text"> to shape you</span>
      </div>

      <Swiper
        spaceBetween={10}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // Pause autoplay when hovered
        }}
        pagination={false}
        loop={true}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 5 },
        }}
        className="w-full"
      >
        <div className="program-categories grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-black p-6">
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link
                to={`/courses/${category.slug}`}
                state={{ categoryName: category.name }}
              >
                <div className="category bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2">
                  {/* Category Image */}
                  <div className="relative w-full h-40">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Category Name */}
                  <div className="text-center pb-4 px-3">
                    <span className="text-lg font-semibold text-gray-800 transition-colors duration-200 hover:text-blue-600">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Programs;
