import React, { useState, useEffect, useContext } from "react";
import Logo from "../../assets/logo.png";
import { Link as RouterLink } from "react-router-dom";
import Modal from "../Modal";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import ProfileDropdown from "../Profile/ProfileDropdown";
import LanguageSelector from "../LanguageSelector";
import { useLanguage } from "../../context/LanguageProvider";
import { UserContext } from "../../context/UserContext";
import MobileNav from "./MobileNav";
import DefaultAvatar from "../../assets/default-avatar.png";
import NavigationMenu from "./NavigationMenu";
import { isFreeMode } from "../../config/features";

const HomeHeader = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [showModal, setShowModal] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { fontSize, translation } = useLanguage();
  const { user, logout, loading } = useContext(UserContext);

    const navLinks = [
    { labelKey: "home", section: "/" },
    { labelKey: "programs", section: "programs" },
    { labelKey: "aboutUs", section: "aboutus" },
    { labelKey: "reasons", section: "reasons" },
    { labelKey: "plans", section: "plans" },
  ].filter(({ section }) => !isFreeMode || section !== "plans");

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openSignIn = () => { setIsSignUpPage(false); setShowModal(true); };

  return (
    <header className="w-full relative z-40">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <RouterLink to="/">
          <img src={Logo} alt="logo" className="w-36 md:w-40" />
        </RouterLink>

        <div className="flex items-center gap-3">
          {/* Desktop */}
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
              <LanguageSelector isMobile={false} isOpen={langOpen} onToggle={setLangOpen} />
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

          {/* Mobile */}
          {mobile && (
            <div className="flex items-center gap-2">
              <LanguageSelector isMobile={true} isOpen={langOpen} onToggle={(v) => { setLangOpen(v); if (v) setMenuOpened(false); }} />
              <button
                onClick={() => { setMenuOpened((p) => !p); setLangOpen(false); }}
                className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition"
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpened ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpened ? "opacity-0" : ""}`} />
                <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpened ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          )}

          {mobile && (
            <MobileNav
              translation={translation}
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
              user={user}
              logout={logout}
              openSignIn={openSignIn}
            />
          )}
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {isSignUpPage ? (
            <SignUp switchToSignIn={() => setIsSignUpPage(false)} onSuccess={() => setShowModal(false)} />
          ) : (
            <SignIn switchToSignUp={() => setIsSignUpPage(true)} onSuccess={() => setShowModal(false)} />
          )}
        </Modal>
      )}
    </header>
  );
};

export default HomeHeader;
