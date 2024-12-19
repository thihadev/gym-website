import "./Programs.css";
import RightArrow from "../../assets/rightArrow2.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../axios.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Programs = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("categories")
      .then((response) => {
        setCategories(response.data.data); // Set courses data
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setCategories(null);
        localStorage.removeItem("accessToken"); // Clear token
      });
  }, []); // Runs only once on component mount

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
          1280: { slidesPerView: 4 },
        }}
        className="w-full "
      >
        <div className="program-categories">
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link
                to={`/courses/${category.slug}`}
                smooth={true}
                state={{ categoryName: category.name }}
              >
                <div className="category bg-white shadow-md rounded-lg flex flex-col justify-between p-4 hover:shadow-lg transition-shadow duration-300 h-full">
                  {/* Category Name */}
                  <span className="text-lg font-semibold text-gray-800 mb-2">
                    {category.name}
                  </span>

                  {/* Category Description */}
                  <span className="text-sm text-gray-600 mb-4 flex-grow">
                    {category.short_description}
                  </span>

                  {/* Join Now Button */}
                  <div className="join-now flex items-center mt-auto">
                    <span className="text-blue-500 font-bold">Join Now</span>
                    <img
                      src={RightArrow}
                      alt="arrow mark"
                      className="w-5 h-5 object-contain ml-2"
                    />
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
