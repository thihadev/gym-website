import React, { createContext, useContext, useState } from "react";
import transactions from "../data/transactions";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState("1rem");
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const transaction = (key) => transactions[language]?.[key] || key;

  // Function to switch the language
  const switchLanguage = (lang) => {
    if (lang !== language) {
      setLanguage(lang);
      const size = (lang === "mm") ? "1rem" : "1rem";
      setFontSize(size);
      localStorage.setItem("language", lang); // Save preference
    }
  };

  

  // useEffect(() => {
  //   console.log(`Current language: ${language}`);
  //   // Optionally add side effects, such as loading translations
  // }, [language]);

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, fontSize, transaction }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook for consuming the Language Context
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
