import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Logo from "../../assets/logo.png";
import Bars from "../../assets/bars.png";
import { Link } from "react-scroll";
import Modal from "../Modal";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import axios from "../../axios";
import ProfileDropdown from "../ProfileDropdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LanguageSelector from "../LanguageSelector";
import transactions from "../../data/transactions";
import { useLanguage } from "../LanguageProvider";

const HomeHeader = () => {
  const token = localStorage.getItem("accessToken");
  const token_init = token ? token : null;
  const [menuOpened, setMenuOpened] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [showModal, setShowModal] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const [user, setUser] = useState(token_init);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const list = transactions;
  const lang = list[language];

  const fontSize = language === "mm" ? "1rem" : "1rem";

  const fetchUserProfile = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios
        .get("profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching profile", error);
        });
    }
  };

  useEffect(() => {
    fetchUserProfile();

    const handleResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [token]);

  // Logout user
  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      // Send logout request with the token in the Authorization header
      await axios.post(
        "logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in header
          },
        }
      );

      localStorage.removeItem("accessToken");
      setUser(null); // Reset the user state
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Open Sign-In modal
  const openSignIn = () => {
    setIsSignUpPage(false); // Open Sign-in page
    setShowModal(true);
  };

  const handleAuthSuccess = () => {
    fetchUserProfile(); 
    setShowModal(false);
  };

  return (
    <div className="flex justify-between items-center p-4 text-white relative">
      {/* Logo */}
      <img src={Logo} alt="logo img" className="w-32" />

      {/* Desktop Navigation and Profile */}
      {!mobile && (
        <div className="flex items-center gap-4">
          {/* Navigation Links */}
          <ul className="flex gap-4 items-center font-semibold">
            <li className="p-4">
              <Link
                to="hero"
                smooth={true}
                className="cursor-pointer hover:text-gray-400"
                style={{ fontSize }}
              >
                {lang.home}
              </Link>
            </li>
            <li className="p-4">
              <Link
                lango="programs"
                smooth={true}
                className="cursor-pointer hover:text-gray-400"
                style={{ fontSize }}
              >
                {lang.programs}
              </Link>
            </li>
            <li className="p-4">
              <Link
                to="aboutus"
                smooth={true}
                className="cursor-pointer hover:text-gray-400"
                style={{ fontSize }}
              >
                {lang.aboutUs}
              </Link>
            </li>
            <li className="p-4">
              <Link
                to="reasons"
                smooth={true}
                className="cursor-pointer hover:text-gray-400"
                style={{ fontSize }}
              >
                {lang.reasons}
              </Link>
            </li>
            <li className="p-4">
              <Link
                to="plans"
                smooth={true}
                className="cursor-pointer hover:text-gray-400"
                style={{ fontSize }}
              >
                {lang.plans}
              </Link>
            </li>
            <li className="p-4">
              <LanguageSelector isMobile={false}/>
            </li>
          </ul>

          {/* Profile or Login */}
          {user ? (
            <ProfileDropdown user={user} handleLogout={handleLogout} />
          ) : (
            <button
              onClick={openSignIn}
              style={{ fontSize }}
              className="cursor-pointer font-bold text-gray-800 bg-white border rounded-full px-4 py-2 hover:bg-gray-200"
            >
              {lang.login}
            </button>
          )}
        </div>
      )}

      {/* Mobile Hamburger Menu and Language Selector */}
      {mobile && (
        <div className="flex items-center gap-4 md:hidden">
          {/* Language Selector */}
          <LanguageSelector isMobile={true}/>

          {/* Hamburger Menu */}
          <div
            className="flex items-center justify-center p-2 rounded cursor-pointer"
            onClick={() => setMenuOpened(!menuOpened)}
          >
            <img src={Bars} alt="menu icon" className="w-6 h-6" />
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {menuOpened && mobile && (
        <ul className="absolute top-16 left-0 w-full bg-gray-700 text-white flex flex-col items-center py-4 gap-4 z-50">
          <li className="p-4">
            <Link
              onClick={() => setMenuOpened(false)}
              to="hero"
              smooth={true}
              className="cursor-pointer hover:text-gray-300"
            >
              {lang.home}
            </Link>
          </li>
          <li className="p-4">
            <Link
              onClick={() => setMenuOpened(false)}
              to="programs"
              smooth={true}
              className="cursor-pointer hover:text-gray-300"
            >
              {lang.programs}
            </Link>
          </li>
          <li className="p-4">
            <Link
              onClick={() => setMenuOpened(false)}
              to="aboutus"
              smooth={true}
              className="cursor-pointer hover:text-gray-300"
            >
              {lang.aboutUs}
            </Link>
          </li>
          <li className="p-4">
            <Link
              onClick={() => setMenuOpened(false)}
              to="reasons"
              smooth={true}
              className="cursor-pointer hover:text-gray-300"
            >
              {lang.reasons}
            </Link>
          </li>
          <li className="p-4">
            <Link
              onClick={() => setMenuOpened(false)}
              to="plans"
              smooth={true}
              className="cursor-pointer hover:text-gray-300"
            >
              {lang.plans}
            </Link>
          </li>

          {/* Mobile Login Button */}
          {!user && (
            <li className="p-4">
              <button
                onClick={() => {
                  setMenuOpened(false);
                  openSignIn();
                }}
                className="w-full text-center font-bold text-gray-800 bg-white border rounded-full px-4 py-2 hover:bg-gray-200"
              >
                {lang.login}
              </button>
            </li>
          )}

          {/* Mobile Profile Dropdown (Optional) */}
          {user && (
            <li className="p-4">
              <Link
                onClick={handleLogout}
                smooth={true}
                style={{ fontSize }}
                className="cursor-pointerw-full text-center font-bold text-gray-800 bg-white border rounded-full px-4 py-2 hover:bg-gray-200"
              >
                {lang.logout}
              </Link>
            </li>
          )}
        </ul>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {isSignUpPage ? (
            <SignUp
              switchToSignIn={() => setIsSignUpPage(false)}
              onSuccess={handleAuthSuccess}
            />
          ) : (
            <SignIn
              switchToSignUp={() => setIsSignUpPage(true)}
              onSuccess={handleAuthSuccess}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default HomeHeader;
