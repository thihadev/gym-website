import React, { useEffect, useRef, useCallback } from "react";
import { useLanguage } from "../context/LanguageProvider";
import { FaGlobe } from "react-icons/fa";

const LanguageSelector = ({ isMobile = false, isOpen, onToggle }) => {
  const dropdownRef = useRef(null);
  const { language, switchLanguage, fontSize } = useLanguage();

  const languages = [
    { code: "en", label: "English" },
    { code: "mm", label: "မြန်မာ" },
  ];

  const handleSelect = (code) => { switchLanguage(code); onToggle(false); };

  const handleOutside = useCallback((e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) onToggle(false);
  }, [onToggle]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [handleOutside]);

  useEffect(() => {
    const onKey = (e) => { if (isOpen && e.key === "Escape") onToggle(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => onToggle(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-slate-300 hover:text-lime-400 hover:border-lime-400/50 hover:bg-lime-400/5 transition text-sm font-semibold shadow-sm"
        style={{ fontSize }}
      >
        <FaGlobe size={14} className="text-slate-400 group-hover:text-lime-400" />
        <span>{language === "en" ? "EN" : "မြန်မာ"}</span>
        <span className="text-[10px] text-slate-500">▼</span>
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-32 bg-[#111827] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`px-4 py-2.5 text-base cursor-pointer transition ${
                language === lang.code
                  ? "text-lime-400 bg-lime-400/10 font-semibold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
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
