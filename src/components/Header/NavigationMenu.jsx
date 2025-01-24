import { Link } from "react-router-dom";
import LanguageSelector from "../LanguageSelector";
import ProfileDropdown from "../Profile/ProfileDropdown";

const NavigationMenu = ({
  links,
  transaction,
  fontSize,
  isMobile = false,
  onClose = () => {},
  user,
  openSignIn,
  logout,
}) => {
  return (
    <>
      {links.map(({ labelKey, section }) => (
        <li key={section} className="p-4">
          <Link
            to="/"
            state={{ scrollToSection: section }}
            className="cursor-pointer hover:text-gray-400"
            style={{ fontSize }}
            onClick={isMobile ? onClose : undefined}
          >
            {transaction(labelKey)}
          </Link>
        </li>
      ))}

      {isMobile && user && (
        <>
          <li className="p-4">
            <Link
              onClick={isMobile ? onClose : undefined}
              to="settings"
              state={{ scrollToSection: "profile" }}
              className="cursor-pointer hover:text-gray-300"
            >
              {transaction("profile")}
            </Link>
          </li>

          <li className="p-4">
            <button
              onClick={() => {
                if (isMobile) onClose();
                logout();
              }}
              className={`text-center font-bold text-gray-800 bg-white border rounded-full px-4 py-2 hover:bg-gray-200 ${
                isMobile ? "" : "cursor-pointer"
              }`}
            >
              {transaction("logout")}
            </button>
          </li>

          <button
            onClick={isMobile ? onClose : undefined}
            className="absolute top-4 right-4 text-gray-300 text-3xl"
            aria-label="Close menu"
          >
            &times;
          </button>
        </>
      )}
      </>
  );
};

export default NavigationMenu;
