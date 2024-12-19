import React, { useState, useEffect } from "react";
import axios from "../axios";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const { category } = useParams(); // Access the dynamic category parameter
  const location = useLocation();
  const { categoryName } = location.state || {};

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    axios
      .get(`courses?keyword=${category}`)
      .then((response) => {
        setCourses(response.data.data || []); // Ensure data is an array
        setLoading(false); // Set loading to false after fetching
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setCourses([]); // Set an empty array on error
        setLoading(false); // Set loading to false even if there's an error
        localStorage.removeItem("accessToken");
      });
  }, [category]);

  // Handle loading state
  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 mb-6">
      {/* Breadcrumb/Header */}
      <div className="text-white">
        <h3 className="text-center text-2xl md:text-3xl font-bold tracking-wide">
          <Link to={'/'}>
          Home 
          </Link>
          <span className="text-gray-400"> /</span> {categoryName || "Category"}
        </h3>
      </div>

      {/* Courses Section */}
      <div className="courses-area pt-8 pb-2 rounded-lg shadow-inner">
        {/* Check if courses are empty */}
        {courses.length === 0 ? (
          <div className="text-center text-white py-6">
            <h4 className="text-xl font-semibold">No Training Found</h4>
            <p className="text-gray-400">
              It seems there are no training available for this category. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Course Image */}
                <Link to={`/course/${course.slug}`}>
                  <div className="w-full h-52">
                    <img
                      src={course.cover_image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Course Content */}
                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-2">{course.title}</h4>
                    <p className="text-gray-600">{course.short_description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;