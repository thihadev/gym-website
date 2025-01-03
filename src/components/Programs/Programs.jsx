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
        setCategories(response.data.data); // Set categories data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
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
          1280: { slidesPerView: 5 },
        }}
        className="w-full"
      >
        <div className="program-categories hover:bg-gray-300 ">
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link
                to={`/courses/${category.slug}`}
                state={{ categoryName: category.name }}
              >
                <div className="category p-2 hover:bg-gray-300 bg-white shadow-md rounded-lg flex flex-col justify-between h-full">
                  {/* Category Image */}
                  <div className="relative w-full h-40">
                    <img
                      src={category.image} // Assuming image is the field in the API response
                      alt={category.name}
                      className="w-full bg-cover h-full"
                    />
                  </div>

                  {/* Category Name */}
                  <div className="text-center py-3 hover:text-blue-700">
                    <span className="text-lg font-semibold">
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
