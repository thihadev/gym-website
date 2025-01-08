import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Programs from "./components/Programs/Programs";
import Reasons from "./components/Reasons/Reasons";
import Plans from "./components/Plans/Plans";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import CoursesPage from "./pages/Courses";
import Header from "./components/Header/Header";
import CourseDetailPage from "./pages/CourseDetail";
import { scroller } from "react-scroll";
import SubscriptionPage from "./pages/Order";
import ImageUploader from "./pages/ImageUploader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageProvider } from "./components/LanguageProvider";


// Component for conditional rendering of the header
const ConditionalHeader = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  return !isRootPath && <Header />; // Render Header if not on the root path
};

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollToSection = () => {
      let section = location.state?.scrollToSection;

      // Default to "hero" if no scrollToSection in state (e.g., after refresh)
      if (!section) {
        if (location.pathname === "/") {
          section = "hero";
        }
      }
  
      // Scroll to the determined section
      if (section) {
        const headerHeight = document.querySelector("header")?.offsetHeight || 70; // Adjust offset dynamically
        const targetElement = document.getElementById(section);
  
        if (targetElement) {
          scroller.scrollTo(section, {
            smooth: true,
            duration: 500,
            offset: -headerHeight,
          });
        } else {
          console.warn(`Section with ID '${section}' not found.`);
        }
      }
    };
  
    const timer = setTimeout(scrollToSection, 100); // Retry after 100ms
    return () => clearTimeout(timer);
  }, [location]);
  
  

  return (
    <div className="App flex flex-col min-h-screen">
      <div className={`transition-opacity duration-300 flex-grow`}>
        <ConditionalHeader />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div id="hero">
                  <Hero />
                </div>
                <div id="programs">
                  <Programs />
                </div>
                <div id="aboutus">
                  <Testimonials />
                </div>
                <div id="reasons">
                  <Reasons />
                </div>
                <div id="plans">
                  <Plans />
                </div>
              </>
            }
          />
          <Route path="/courses/:category" element={<CoursesPage />} />
          <Route path="/course/:slug" element={<CourseDetailPage />} />
          <Route path="/order" element={<SubscriptionPage />} />
          <Route path="/image-uploader" element={<ImageUploader />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};


// Main App Component with Router
const App = () => {
  return (
    <Router>
      <LanguageProvider>
      <AppContent />
      <ToastContainer />
      </LanguageProvider>
    </Router>
  );
};

export default App;
