// import './Header.css';
import { useState, useEffect, useContext } from "react";
import Logo from "../../assets/logo.png";
import Bars from "../../assets/bars.png";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import ProfileDropdown from "../Profile/ProfileDropdown";
import "react-toastify/dist/ReactToastify.css";
import LanguageSelector from "../LanguageSelector";
import { useLanguage } from "../../context/LanguageProvider";
import { UserContext } from "../../context/UserContext.js";

const Header = () => {
  // const token = localStorage.getItem("accessToken");
  const [menuOpened, setMenuOpened] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [showModal, setShowModal] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const { user, fetchUserProfile, loading, logout } = useContext(UserContext);
  const { fontSize, transaction } = useLanguage();

  useEffect(() => {
    fetchUserProfile();

    const handleResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [fetchUserProfile]);

  // Open Sign-In modal
  const openSignIn = () => {
    setIsSignUpPage(false);
    setShowModal(true);
  };

  const handleAuthSuccess = () => {
    fetchUserProfile();
    setShowModal(false);
  };

  if (loading) {
    return <div>...</div>;
  }

  return (
    <div className="flex justify-between relative bg-none w-full">
      <div className="left-h p-8 pt-6 flex-[3] flex flex-col gap-8">
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
                    to="/"
                    state={{ scrollToSection: "/" }}
                    className="cursor-pointer hover:text-gray-400"
                    style={{ fontSize }}
                  >
                    {transaction("home")}
                  </Link>
                </li>
                <li className="p-4">
                  <Link
                    to="/"
                    state={{ scrollToSection: "programs" }}
                    className="cursor-pointer hover:text-gray-400"
                    style={{ fontSize }}
                  >
                    {transaction("programs")}
                  </Link>
                </li>
                <li className="p-4">
                  <Link
                    to="/"
                    state={{ scrollToSection: "aboutus" }}
                    className="cursor-pointer hover:text-gray-400"
                    style={{ fontSize }}
                  >
                    {transaction("aboutUs")}
                  </Link>
                </li>
                <li className="p-4">
                  <Link
                    to="/"
                    state={{ scrollToSection: "reasons" }}
                    className="cursor-pointer hover:text-gray-400"
                    style={{ fontSize }}
                  >
                    {transaction("reasons")}
                  </Link>
                </li>
                <li className="p-4">
                  <Link
                    to="/"
                    state={{ scrollToSection: "plans" }}
                    className="cursor-pointer hover:text-gray-400"
                    style={{ fontSize }}
                  >
                    {transaction("plans")}
                  </Link>
                </li>
                <li className="p-4">
                  <LanguageSelector isMobile={false} />
                </li>
              </ul>

              {/* Profile or Login */}
              {user ? (
                <ProfileDropdown user={user} handleLogout={logout} />
              ) : (
                <button
                  onClick={openSignIn}
                  className="cursor-pointer font-bold text-gray-800 bg-white border rounded-full px-4 py-2 hover:bg-gray-200"
                >
                  {transaction("login")}
                </button>
              )}
            </div>
          )}

          {/* Mobile Hamburger Menu */}
          {mobile && (
            <div className="flex items-center gap-4 md:hidden">
              {/* Language Selector */}
              <LanguageSelector isMobile={true} />

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
                  className="cursor-pointer hover:text-gray-300"
                >
                  {transaction("home")}
                </Link>
              </li>
              <li className="p-4">
                <Link
                  onClick={() => setMenuOpened(false)}
                  to="/programs"
                  className="cursor-pointer hover:text-gray-300"
                >
                  {transaction("programs")}
                </Link>
              </li>
              <li className="p-4">
                <Link
                  onClick={() => setMenuOpened(false)}
                  to="aboutus"
                  className="cursor-pointer hover:text-gray-300"
                >
                  {transaction("aboutUs")}
                </Link>
              </li>
              <li className="p-4">
                <Link
                  onClick={() => setMenuOpened(false)}
                  to="reasons"
                  className="cursor-pointer hover:text-gray-300"
                >
                  {transaction("reasons")}
                </Link>
              </li>
              <li className="p-4">
                <Link
                  onClick={() => setMenuOpened(false)}
                  to="plans"
                  className="cursor-pointer hover:text-gray-300"
                >
                  {transaction("plans")}
                </Link>
              </li>
              <li className="p-4">
                <Link
                  onClick={() => setMenuOpened(false)}
                  to="/settings"
                  state={{ scrollToSection: "profile" }}
                  className="cursor-pointer hover:text-gray-300"
                >
                  {transaction("profile")}
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
                    {transaction("login")}
                  </button>
                </li>
              )}

              {/* Mobile Profile Dropdown (Optional) */}
              {user && (
                <li className="p-4">
                  <Link
                    onClick={logout}
                    className="cursor-pointerw-full text-center font-bold text-gray-800 bg-white border rounded-full px-4 py-2 hover:bg-gray-200"
                  >
                    {transaction("logout")}
                  </Link>
                </li>
              )}

              <button
                onClick={() => setMenuOpened(false)}
                className="absolute top-4 right-4 text-gray-300 text-3xl"
                aria-label="Close menu"
              >
                &times;
              </button>
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
      </div>
    </div>
  );
};

export default Header;
