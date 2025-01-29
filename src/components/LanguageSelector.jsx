import React, { useEffect, useRef, useCallback } from "react";
import { useLanguage } from "../context/LanguageProvider"; // Update path if needed
import { FaGlobe } from "react-icons/fa";

const LanguageSelector = ({ isMobile = false, isOpen, onToggle }) => {
  const dropdownRef = useRef(null);
  const { language, switchLanguage, fontSize } = useLanguage();
  const languages = [
    { code: "en", label: "English" },
    { code: "mm", label: "မြန်မာ" }, // Burmese
  ];

  const handleLanguageChange = (code) => {
    switchLanguage(code);
    onToggle(false);
  };

  const handleOutsideClick = useCallback(
    (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onToggle(false);
      }
    },
    [onToggle]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleOutsideClick]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === "Escape") onToggle(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 cursor-pointer hover:text-gray-400"
        style={{ fontSize }}
        onClick={() => onToggle(!isOpen)} // Toggle dropdown state
      >
        {isMobile ? <FaGlobe size={22} /> : <span className="font-semibold">{language === "en" ? "Language" : "ဘာသာစကား"}</span>}
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-32 border bg-[#041228] rounded shadow-lg z-20">
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
