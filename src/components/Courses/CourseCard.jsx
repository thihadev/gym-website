import React from "react";
import Header from "../Header/Header";

const Courses = () => {
  return (
    <>
    <Header/>
    <div className="container mx-auto px-4">
      

      {/* Shape */}
      <div className="shape9">
        <img src="https://via.placeholder.com/40" alt="shape" className="mx-auto my-6" />
      </div>

      {/* Courses Section */}
      <div className="courses-area pt-12 pb-24">
        {/* Sorting */}
        <div className="jogi-grid-sorting mb-6 flex justify-between items-center">
          <div className="ordering w-full max-w-sm mx-auto">
            <select
              className="form-select w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              name="sort"
            >
              <option value="" selected>Sort By</option>
              <option value="ASC">Price: low to high</option>
              <option value="DESC">Price: high to low</option>
            </select>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Skeleton Placeholder Cards */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="single-courses-box bg-white shadow-lg rounded-lg p-4">
              <div className="courses-image relative w-full h-48 bg-gray-200 rounded-md animate-pulse">
                {/* Placeholder */}
              </div>
              <div className="courses-content mt-4">
                <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Courses;
