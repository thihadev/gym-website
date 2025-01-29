import React, { useState, useEffect, useContext } from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-scroll";
import Modal from "../Modal";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import ProfileDropdown from "../Profile/ProfileDropdown";
import "react-toastify/dist/ReactToastify.css";
import LanguageSelector from "../LanguageSelector";
import { useLanguage } from "../../context/LanguageProvider";
import { UserContext } from "../../context/UserContext";
import MobileNav from "./MobileNav";
import Bars from "../../assets/bars.png";
import DefaultAvatar from "../../assets/default-avatar.png";

const HomeHeader = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [showModal, setShowModal] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const { fontSize, translation } = useLanguage();
  const { user, fetchUserProfile, logout, loading } = useContext(UserContext);
  const [languageSelectorOpened, setLanguageSelectorOpened] = useState(false);

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openSignIn = () => {
    setIsSignUpPage(false);
    setShowModal(true);
  };

  const handleAuthSuccess = () => {
    fetchUserProfile();
    setShowModal(false);
  };

  // if (loading) {
  //   return <div>...</div>;
  // }

  return (
    <div className="flex justify-between items-center p-4 text-white relative">
      {/* Logo */}
      <img src={Logo} alt="logo img" className="w-32" />

      {/* Desktop Navigation and Profile */}
      {!mobile && (
        <div className="flex items-center gap-4">
          <ul className="flex gap-4 items-center font-semibold">
            <li className="p-4">
              <Link
                to="hero"
                smooth={true}
                className="cursor-pointer hover:text-gray-400"
                style={{ fontSize }}
              >
                {translation("home")}
              </Link>
            </li>
            <li className="p-4">
              <Link
                to="programs"
                smooth={true}
                className="cursor-pointer hover:text-gray-400"
                style={{ fontSize }}
              >
                {translation("programs")}
              </Link>
            </li>
            <li className="p-4">
              <Link
                to="aboutus"
                smooth={true}
                className="cursor-pointer hover:text-gray-400"
                style={{ fontSize }}
              >
                {translation("aboutUs")}
              </Link>
            </li>
            <li className="p-4">
              <Link
                to="reasons"
                smooth={true}
                className="cursor-pointer hover:text-gray-400"
                style={{ fontSize }}
              >
                {translation("reasons")}
              </Link>
            </li>
            <li className="p-4">
              <Link
                to="plans"
                smooth={true}
                className="cursor-pointer hover:text-gray-400"
                style={{ fontSize }}
              >
                {translation("plans")}
              </Link>
            </li>

            <li className="p-4">
              <LanguageSelector
                isMobile={false}
                isOpen={languageSelectorOpened}
                onToggle={(isOpen) => setLanguageSelectorOpened(isOpen)}
              />
            </li>
          </ul>

          {loading ? (
            <div className="relative">
              <div className="flex items-center focus:outline-none">
                <img
                  src={DefaultAvatar}
                  alt="User Avatar"
                  className="w-14 h-14 rounded-full border-1"
                />
              </div>
            </div>
          ) : user ? (
            <ProfileDropdown user={user} handleLogout={logout} />
          ) : (
            <button
              onClick={openSignIn}
              style={{ fontSize }}
              className="cursor-pointer font-bold text-gray-800 bg-white border rounded-full px-4 py-2 hover:bg-gray-200"
            >
              {translation("login")}
            </button>
          )}
        </div>
      )}

      {/* Mobile Navigation */}
      {mobile && (
        <>
          {/* Mobile Hamburger Menu and Language Selector */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Language Selector */}
            <LanguageSelector
              isMobile={true}
              isOpen={languageSelectorOpened} // Control state from the parent
              onToggle={(isOpen) => {
                setLanguageSelectorOpened(isOpen); // Update state
                if (isOpen) setMenuOpened(false); // Close menu if language selector opens
              }}
            />

            {/* Hamburger Menu */}
            <div
              className="flex items-center justify-center p-2 rounded cursor-pointer"
              onClick={() => {
                setMenuOpened((prev) => {
                  const newState = !prev;
                  setLanguageSelectorOpened(false);
                  return newState;
                });
              }}
            >
              <img src={Bars} alt="menu icon" className="w-6 h-6" />
            </div>
          </div>

          <MobileNav
            translation={translation}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
            user={user}
            logout={logout}
            openSignIn={openSignIn}
          />
        </>
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
