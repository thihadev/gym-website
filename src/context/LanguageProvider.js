import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  // Function to switch the language
  const switchLanguage = (lang) => {
    if (lang !== language) {
      setLanguage(lang);
      localStorage.setItem("language", lang); // Save preference
    }
  };

  // useEffect(() => {
  //   console.log(`Current language: ${language}`);
  //   // Optionally add side effects, such as loading translations
  // }, [language]);

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
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
