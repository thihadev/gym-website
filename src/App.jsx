import "./App.css";
import React, { useEffect, lazy, Suspense, useContext } from "react"; // 💡 useContext ပါ ထည့်သွင်းထားသည်
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Programs from "./components/Programs/Programs";
import Reasons from "./components/Reasons/Reasons";
import Plans from "./components/Plans/Plans";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { scroller } from "react-scroll";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageProvider } from "./context/LanguageProvider";
import TransactionNotifications from "./components/TransactionNotifications";
import { UserContext, UserProvider } from "./context/UserContext"; // 💡 UserContext ပါ Import လုပ်ထားသည်
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import { isFreeMode } from "./config/features";

// Lazy load heavy/less-visited pages
const CoursesPage = lazy(() => import("./components/Course/Courses"));
const CourseDetailPage = lazy(() => import("./components/Course/CourseDetail"));
const Checkout = lazy(() => import("./components/Order/Checkout"));
const PlaceOrder = lazy(() => import("./components/Order/PlaceOrder"));
const Setting = lazy(() => import("./components/Setting/Setting"));

const ConditionalHeader = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  return !isRootPath && <Header />;
};

const AppContent = () => {
  const location = useLocation();
  
  const { loading: authLoading } = useContext(UserContext);

  useEffect(() => {
    if (authLoading) return;

    const scrollToSection = () => {
      let section = location.state?.scrollToSection;

      if (!section) {
        if (location.pathname === "/") {
          section = "/";
        }
      }
  
      if (section) {
        const headerHeight = document.querySelector("header")?.offsetHeight || 70;
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
  
    const timer = setTimeout(scrollToSection, 100);
    return () => clearTimeout(timer);
  }, [location, authLoading]);
  
  if (authLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-bg-base">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="App flex flex-col min-h-screen">
      <div className={`transition-opacity duration-300 flex-grow`}>
        <ConditionalHeader />
        <Routes>
          <Route
            path="/"
            element = {
              <>
                <div id="hero"><Hero /></div>
                <div id="programs"><Programs /></div>
                <div id="aboutus"><Testimonials /></div>
                <div id="reasons"><Reasons /></div>
                {!isFreeMode && <div id="plans"><Plans /></div>}
              </>
            }
          />
          <Route path="/courses/:category" element={<Suspense fallback={<LoadingSpinner />}><CoursesPage /></Suspense>} />
          <Route path="/course/:slug" element={<Suspense fallback={<LoadingSpinner />}><CourseDetailPage /></Suspense>} />
          {!isFreeMode && (
            <>
              <Route path="/checkout" element={<Suspense fallback={<LoadingSpinner />}><Checkout /></Suspense>} />
              <Route path="/order" element={<Suspense fallback={<LoadingSpinner />}><PlaceOrder /></Suspense>} />
            </>
          )}
          {isFreeMode && (
            <>
              <Route path="/checkout" element={<Navigate to="/" replace />} />
              <Route path="/order" element={<Navigate to="/" replace />} />
            </>
          )}
          <Route
            path="/settings"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProtectedRoute>
                  <Setting />
                </ProtectedRoute>
              </Suspense>
            }
          />
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
      <UserProvider>
        <LanguageProvider>
          <AppContent />
          <TransactionNotifications/>
          <ToastContainer />
        </LanguageProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
