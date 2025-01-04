import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import Hero from "./components/Hero/Hero";
import Programs from "./components/Programs/Programs";
import Reasons from "./components/Reasons/Reasons";
import Plans from "./components/Plans/Plans";
import Testimonials from "./components/Testimonials/Testimonials";
import Join from "./components/Join/Join";
import Footer from "./components/Footer/Footer";
import CoursesPage from "./pages/Courses";
import Header from "./components/Header/Header";
import CourseDetailPage from "./pages/CourseDetail";
import { scroller } from "react-scroll";
import SubscriptionPage from "./pages/Order";
import ImageUploader from "./pages/ImageUploader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component for conditional rendering of the header
const ConditionalHeader = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  return !isRootPath && <Header />; // Render Header if not on the root path
};

const AppContent = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // useEffect(() => {
  //   setLoading(true);
  //   const timer = setTimeout(() => setLoading(false), 1000);
  //   return () => clearTimeout(timer);
  // }, [location]);

  useEffect(() => {
    if (location.state?.scrollToSection) {
      const section = location.state.scrollToSection;
      if (typeof section === "string") {
        scroller.scrollTo(section, {
          smooth: true,
          duration: 500,
          offset: -70,
        });
      }
    }

  }, [location]);

  return (
    
    <div className="App flex flex-col min-h-screen">
      {/* Loading Spinner */}
      {/* {loading && <LoadingSpinner />} */}

      {/* Content */}
      <div className={`${loading ? "opacity-50" : "opacity-100"} transition-opacity duration-300 flex-grow`}>
        <ConditionalHeader />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Programs />
                <Testimonials />
                <Reasons />
                <Plans />
                {/* <Join /> */}
              </>
            }
          />
          <Route path="/courses/:category" element={<CoursesPage />} />
          <Route path="/course/:slug" element={<CourseDetailPage />} />
          <Route path="/order" element={<SubscriptionPage />} />
          <Route path="/image-uploader" element={<ImageUploader />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Main App Component with Router
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <AppContent />
    </Router>
  );
};

export default App;
