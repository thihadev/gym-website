import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from "./components/Hero/Hero";
import Programs from "./components/Programs/Programs";
import Reasons from "./components/Reasons/Reasons";
import Plans from "./components/Plans/Plans";
import Testimonials from "./components/Testimonials/Testimonials";
import Join from "./components/Join/Join";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile"; // Import the Profile page

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <>
              <Hero />
              <Programs />
              <Reasons />
              <Plans />
              <Testimonials />
              <Join />
              <Footer />
            </>
          } />

          {/* Protected route for the Profile page */}
          <Route path="/profile" element={<Profile />} />

          {/* Catch-all for unmatched routes */}
          <Route path="*" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
