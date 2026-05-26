import { Link } from "react-router-dom";

const NavigationMenu = ({
  links,
  translation,
  fontSize,
  isMobile = false,
  onClose = () => {},
  user,
  logout,
}) => {
  return (
    <>
      {links.map(({ labelKey, section }) => (
        <li key={section} className={isMobile ? "" : "p-2"}>
          <Link
            to="/"
            state={{ scrollToSection: section }}
            className={`cursor-pointer transition ${
              isMobile
                ? "block px-6 py-3 text-slate-300 hover:text-lime-400 hover:bg-white/5 text-base font-medium"
                : "px-3 py-2 rounded-lg text-slate-300 hover:text-lime-400 hover:bg-white/5"
            }`}
            style={{ fontSize }}
            onClick={isMobile ? onClose : undefined}
          >
            {translation(labelKey)}
          </Link>
        </li>
      ))}

      {isMobile && user && (
        <>
          <li>
            <Link
              onClick={onClose}
              to="/settings"
              state={{ scrollToSection: "profile" }}
              className="block px-6 py-3 text-slate-300 hover:text-lime-400 hover:bg-white/5 transition text-base font-medium"
            >
              {translation("profile")}
            </Link>
          </li>
          <li className="px-6 pt-3 pb-2 border-t border-white/10 mt-2">
            <button
              onClick={() => { onClose(); logout(); }}
              className="w-full py-2.5 rounded-full border border-red-500/50 text-red-400 font-bold text-base hover:bg-red-500/10 transition"
            >
              {translation("logout")}
            </button>
          </li>
        </>
      )}
    </>
  );
};

export default NavigationMenu;
