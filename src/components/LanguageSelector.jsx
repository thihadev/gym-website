import React, { useState } from "react";
import { useLanguage } from "../context/LanguageProvider"; // Make sure the path is correct
import { FaGlobe } from "react-icons/fa";

const LanguageSelector = (checkMobile) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { language, switchLanguage, fontSize } = useLanguage(); // Get current language and switch function
  const languages = [
    { code: "en", label: "English" },
    { code: "mm", label: "မြန်မာ" }, // Burmese
  ];

  const handleLanguageChange = (code) => {
    switchLanguage(code); // Use the switchLanguage function from the context
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 cursor-pointer hover:text-gray-400"
        style={{ fontSize }}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {
          checkMobile.isMobile ?
          (<FaGlobe size={22}/>)
          :
        (<span className="font-semibold">{language === 'en' ? "Language" : "ဘာသာစကား"}</span>)
        }
      </button>
      {dropdownOpen && (
        <ul className="absolute right-0 mt-2 w-32 border rounded shadow-lg">
          {languages.map((lang) => (
            <li
              key={lang.code}
              style={{ fontSize }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-700"
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
