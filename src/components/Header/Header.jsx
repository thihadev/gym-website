import { useState, useEffect, useContext } from "react";
import Logo from "../../assets/logo.png";

import Modal from "../Modal";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import NavigationMenu from "./NavigationMenu";
import { useLanguage } from "../../context/LanguageProvider";
import { UserContext } from "../../context/UserContext";
import LanguageSelector from "../LanguageSelector";
import ProfileDropdown from "../Profile/ProfileDropdown";
import DefaultAvatar from "../../assets/default-avatar.png";
import { Link } from "react-router-dom";
import { isFreeMode } from "../../config/features";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [showModal, setShowModal] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const { user, loading, logout } = useContext(UserContext);
  const { fontSize, translation } = useLanguage();
  const [languageSelectorOpened, setLanguageSelectorOpened] = useState(false);

  const navLinks = [
    { labelKey: "home", section: "/" },
    { labelKey: "programs", section: "programs" },
    { labelKey: "aboutUs", section: "aboutus" },
    { labelKey: "reasons", section: "reasons" },
    { labelKey: "plans", section: "plans" },
  ].filter(({ section }) => !isFreeMode || section !== "plans");

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openSignIn = () => { setIsSignUpPage(false); setShowModal(true); };

  return (
    <header className="w-full relative z-40">
      <div className="max-w-[1200px] mx-auto px-3 md:px-3 py-3 flex items-center justify-between">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-36 md:w-40" />
        </Link>

        <div className="flex items-center gap-3">
          {/* Desktop Nav */}
          {!mobile && (
            <div className="flex items-center gap-4">
              <ul className="flex items-center gap-1 font-semibold">
                <NavigationMenu
                  links={navLinks}
                  translation={translation}
                  fontSize={fontSize}
                  user={user}
                  openSignIn={openSignIn}
                  logout={logout}
                />
              </ul>
              <LanguageSelector
                isMobile={false}
                isOpen={languageSelectorOpened}
                onToggle={(isOpen) => { setLanguageSelectorOpened(isOpen); if (isOpen) setMenuOpened(false); }}
              />
              {loading ? (
                <img src={DefaultAvatar} alt="avatar" className="w-9 h-9 rounded-full opacity-50 border border-white/10" />
              ) : user ? (
                <ProfileDropdown user={user} handleLogout={logout} />
              ) : (
                <button onClick={openSignIn} className="btn text-sm px-4 py-2">
                  {translation("login")}
                </button>
              )}
            </div>
          )}

          {/* Mobile controls */}
          {mobile && (
            <div className="flex items-center gap-2">
              <LanguageSelector
                isMobile={true}
                isOpen={languageSelectorOpened}
                onToggle={(isOpen) => { setLanguageSelectorOpened(isOpen); if (isOpen) setMenuOpened(false); }}
              />
              <button
                onClick={() => { setMenuOpened((p) => !p); setLanguageSelectorOpened(false); }}
                className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition"
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpened ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpened ? "opacity-0" : ""}`} />
                <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpened ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobile && menuOpened && (
        <div className="absolute top-full left-0 w-full bg-[#0f172a] border-t border-white/10 z-50 shadow-2xl animate-fade-in">
          <ul className="flex flex-col py-4">
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
              <li className="px-6 pt-3 pb-2 border-t border-white/10 mt-2">
                <button onClick={() => { setMenuOpened(false); openSignIn(); }} className="btn w-full text-center">
                  {translation("login")}
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {isSignUpPage ? (
            <SignUp switchToSignIn={() => setIsSignUpPage(false)} onSuccess={() => {setShowModal(false); window.location.reload();}} />
          ) : (
            <SignIn switchToSignUp={() => setIsSignUpPage(true)} onSuccess={() => {setShowModal(false); window.location.reload();}} />
          )}
        </Modal>
      )}
    </header>
  );
};

export default Header;
