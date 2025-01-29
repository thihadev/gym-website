import { useState, useEffect, useContext } from "react";
import Logo from "../../assets/logo.png";
import Bars from "../../assets/bars.png";
import Modal from "../Modal";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import NavigationMenu from "./NavigationMenu";
import { useLanguage } from "../../context/LanguageProvider";
import { UserContext } from "../../context/UserContext";
import LanguageSelector from "../LanguageSelector";
import ProfileDropdown from "../Profile/ProfileDropdown";
import DefaultAvatar from "../../assets/default-avatar.png";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [showModal, setShowModal] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const { user, fetchUserProfile, loading, logout } = useContext(UserContext);
  const { fontSize, translation } = useLanguage();
  const [languageSelectorOpened, setLanguageSelectorOpened] = useState(false);

  const navLinks = [
    { labelKey: "home", section: "/" },
    { labelKey: "programs", section: "programs" },
    { labelKey: "aboutUs", section: "aboutus" },
    { labelKey: "reasons", section: "reasons" },
    { labelKey: "plans", section: "plans" },
  ];

  useEffect(() => {
    fetchUserProfile();
    const handleResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fetchUserProfile]);

  const openSignIn = () => {
    setIsSignUpPage(false);
    setShowModal(true);
  };

  const handleAuthSuccess = () => {
    fetchUserProfile();
    setShowModal(false);
  };

  return (
    <>
      <div className="flex justify-between relative bg-none w-full">
        <div className="left-h p-8 pt-6 flex-[3] flex flex-col gap-8">
          <div className="flex justify-between items-center p-4 text-white relative">
            {/* Logo */}
            <img src={Logo} alt="logo img" className="w-32" />

            <div className="flex items-center gap-4">
              <ul className="flex gap-4 items-center font-semibold">
                {/* Desktop Navigation */}
                {!mobile && (
                  <>
                    <NavigationMenu
                      links={navLinks}
                      translation={translation}
                      fontSize={fontSize}
                      user={user}
                      openSignIn={openSignIn}
                      logout={logout}
                    />

                    <li className="p-4">
                      <LanguageSelector
                        isMobile={false}
                        isOpen={languageSelectorOpened}
                        onToggle={(isOpen) => {
                          setLanguageSelectorOpened(isOpen);
                          if (isOpen) setMenuOpened(false);
                        }}
                      />
                    </li>

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
                  </>
                )}
              </ul>

              {/* Mobile Navigation */}
              {menuOpened && mobile && (
                <ul className="absolute top-16 left-0 w-full bg-gray-700 text-white flex flex-col items-center py-4 gap-4 z-50">
                  <NavigationMenu
                    links={navLinks}
                    translation={translation}
                    fontSize={fontSize}
                    user={user}
                    openSignIn={openSignIn}
                    logout={logout}
                    isMobile
                    onClose={() => setMenuOpened(false)}
                  />

                  {!user && (
                    <li className="p-4">
                      <button
                        onClick={() => {
                          setMenuOpened(false);
                          openSignIn();
                        }}
                        className="w-full text-center font-bold text-gray-800 bg-white border rounded-full px-4 py-2 hover:bg-gray-200"
                      >
                        {translation("login")}
                      </button>
                    </li>
                  )}
                </ul>
              )}

              {mobile && (
                <div className="flex items-center gap-4 md:hidden">
                  {/* Language Selector */}
                  <LanguageSelector
                    isMobile={true}
                    isOpen={languageSelectorOpened}
                    onToggle={(isOpen) => {
                      setLanguageSelectorOpened(isOpen); 
                      if (isOpen) setMenuOpened(false); 
                    }}
                  />

                  {/* Hamburger Menu */}
                  <div
                    className="flex items-center justify-center p-2 rounded cursor-pointer"
                    onClick={() => {
                      setMenuOpened((prev) => {
                        const newState = !prev;
                        setLanguageSelectorOpened(false); // Always close language dropdown
                        return newState; // Toggle menu state
                      });
                    }}
                  >
                    <img src={Bars} alt="menu icon" className="w-6 h-6" />
                  </div>
                </div>
              )}

              {/* Modal */}
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
      </div>
    </>
  );
};

export default Header;
