import React, { createContext, useState, useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && <LoadingSpinner />}
            {children}
        </LoadingContext.Provider>
    );
};
