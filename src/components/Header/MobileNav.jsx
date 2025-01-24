import React from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

const MobileNav = ({
  transaction,
  menuOpened,
  setMenuOpened,
  user,
  logout,
  openSignIn,
}) => {
  return (
    <>
      {/* Mobile Dropdown Menu */}
      {menuOpened && (
        <ul className="absolute top-16 left-0 w-full bg-gray-700 text-white flex flex-col items-center py-4 gap-4 z-50">
          <li className="p-4">
            <Link
              onClick={() => setMenuOpened(false)}
              to="hero"
              smooth={true}
              className="cursor-pointer hover:text-gray-300"
            >
              {transaction("home")}
            </Link>
          </li>
          <li className="p-4">
            <Link
              onClick={() => setMenuOpened(false)}
              to="programs"
              smooth={true}
              className="cursor-pointer hover:text-gray-300"
            >
              {transaction("programs")}
            </Link>
          </li>
          <li className="p-4">
            <Link
              onClick={() => setMenuOpened(false)}
              to="aboutus"
              smooth={true}
              className="cursor-pointer hover:text-gray-300"
            >
              {transaction("aboutUs")}
            </Link>
          </li>
          <li className="p-4">
            <Link
              onClick={() => setMenuOpened(false)}
              to="reasons"
              smooth={true}
              className="cursor-pointer hover:text-gray-300"
            >
              {transaction("reasons")}
            </Link>
          </li>
          <li className="p-4">
            <Link
              onClick={() => setMenuOpened(false)}
              to="plans"
              smooth={true}
              className="cursor-pointer hover:text-gray-300"
            >
              {transaction("plans")}
            </Link>
          </li>

          {user && (
            <li className="p-4">
              <RouterLink
                onClick={() => setMenuOpened(false)}
                to="settings"
                state={{ scrollToSection: "profile" }}
                className="cursor-pointer hover:text-gray-300"
              >
                {transaction("profile")}
              </RouterLink>
            </li>
          )}

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

          {/* Mobile Profile Dropdown */}
          {user && (
            <>
              <li className="p-4">
                <Link
                  onClick={logout}
                  smooth={true}
                  className="cursor-pointer w-full text-center font-bold text-gray-800 bg-white border rounded-full px-4 py-2 hover:bg-gray-200"
                >
                  {transaction("logout")}
                </Link>
              </li>
              <button
                onClick={() => setMenuOpened(false)}
                className="absolute top-4 right-4 text-gray-300 text-3xl"
                aria-label="Close menu"
              >
                &times;
              </button>
            </>
          )}
        </ul>
      )}
    </>
  );
};

export default MobileNav;
