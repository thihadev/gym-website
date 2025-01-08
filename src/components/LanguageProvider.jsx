import React, { createContext, useContext, useState } from "react";

// Create Context
const LanguageContext = createContext();

// Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang); // Save preference
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook
export const useLanguage = () => useContext(LanguageContext);
