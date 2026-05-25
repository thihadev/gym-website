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
  
  // ပြဿနာဖြေရှင်းချက်- SSR-Safe window check (🟢 Low)
  const [mobile, setMobile] = useState(() => 
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  
  const [showModal, setShowModal] = useState(false);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const { fontSize, translation } = useLanguage();
  const { user, logout, loading } = useContext(UserContext); // fetchUserProfile ကို ဖြုတ်လိုက်သည်
  const [languageSelectorOpened, setLanguageSelectorOpened] = useState(false);

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    
    // ပြဿနာဖြေရှင်းချက်- Event listener ဖြုတ်ရန် မေ့ကျန်ခဲ့မှုကို ဖြည့်စွက်ခြင်း (🟢 Low)
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openSignIn = () => {
    setIsSignUpPage(false);
    setShowModal(true);
  };

  const handleAuthSuccess = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-between items-center p-4 text-white relative">
      <img src={Logo} alt="logo img" className="w-48" />

      {!mobile && (
        <div className="flex items-center gap-4">
          <ul className="flex gap-4 items-center font-semibold">
            {["hero", "programs", "aboutus", "reasons", "plans"].map((sec) => (
              <li className="p-4" key={sec}>
                <Link to={sec} smooth={true} className="cursor-pointer hover:text-gray-400" style={{ fontSize }}>
                  {translation(sec === "aboutus" ? "aboutUs" : sec)}
                </Link>
              </li>
            ))}
            <li className="p-4">
              <LanguageSelector isMobile={false} isOpen={languageSelectorOpened} onToggle={(isOpen) => setLanguageSelectorOpened(isOpen)} />
            </li>
          </ul>

          {loading ? (
            <div className="relative">
              <img src={DefaultAvatar} alt="User Avatar" className="w-14 h-14 rounded-full border-1" />
            </div>
          ) : user ? (
            <ProfileDropdown user={user} handleLogout={logout} />
          ) : (
            <button onClick={openSignIn} style={{ fontSize }} className="cursor-pointer font-bold text-gray-800 bg-white border rounded-full px-4 py-2 hover:bg-gray-200">
              {translation("login")}
            </button>
          )}
        </div>
      )}

      {mobile && (
        <>
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSelector isMobile={true} isOpen={languageSelectorOpened} onToggle={(isOpen) => { setLanguageSelectorOpened(isOpen); if (isOpen) setMenuOpened(false); }} />
            <div className="flex items-center justify-center p-2 rounded cursor-pointer" onClick={() => setMenuOpened((prev) => { const newState = !prev; setLanguageSelectorOpened(false); return newState; })}>
              <img src={Bars} alt="menu icon" className="w-6 h-6" />
            </div>
          </div>
          <MobileNav translation={translation} menuOpened={menuOpened} setMenuOpened={setMenuOpened} user={user} logout={logout} openSignIn={openSignIn} />
        </>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {isSignUpPage ? (
            <SignUp switchToSignIn={() => setIsSignUpPage(false)} onSuccess={handleAuthSuccess} />
          ) : (
            <SignIn switchToSignUp={() => setIsSignUpPage(true)} onSuccess={handleAuthSuccess} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default HomeHeader;