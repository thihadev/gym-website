import React from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { isFreeMode } from "../../config/features";

const NAV_LINKS = ["home", "programs", "aboutus", "reasons", "plans"].filter(
  (section) => !isFreeMode || section !== "plans"
);

const MobileNav = ({ translation, menuOpened, setMenuOpened, user, logout, openSignIn }) => {
  if (!menuOpened) return null;

  return (
    <div className="absolute top-full left-0 w-full text-center bg-[#0f172a] border-t border-white/10 z-50 shadow-2xl animate-fade-in">
      <ul className="flex flex-col py-4">
        {NAV_LINKS.map((sec) => (
          <li key={sec}>
            <Link
              to={sec}
              smooth={true}
              offset={-70}
              onClick={() => setMenuOpened(false)}
              className="block px-6 py-3 text-slate-300 hover:text-lime-400 hover:bg-white/5 cursor-pointer transition text-base font-medium"
            >
              {translation(sec === "aboutus" ? "aboutUs" : sec)}
            </Link>
          </li>
        ))}

        {user && (
          <li>
            <RouterLink
              to="/settings"
              state={{ scrollToSection: "profile" }}
              onClick={() => setMenuOpened(false)}
              className="block px-6 py-3 text-slate-300 hover:text-lime-400 hover:bg-white/5 transition text-base font-medium"
            >
              {translation("profile")}
            </RouterLink>
          </li>
        )}

        <li className="px-6 pt-3 pb-2 border-t border-white/10 mt-2">
          {user ? (
            <button
              onClick={() => { logout(); setMenuOpened(false); }}
              className="w-full py-2.5 rounded-full border border-red-500/50 text-red-400 font-bold text-base hover:bg-red-500/10 transition"
            >
              {translation("logout")}
            </button>
          ) : (
            <button
              onClick={() => { setMenuOpened(false); openSignIn(); }}
              className="w-full py-2.5 rounded-full bg-lime-400 text-black font-bold text-base hover:bg-lime-300 transition"
            >
              {translation("login")}
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
