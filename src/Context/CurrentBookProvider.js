import React, { useContext, useState, useEffect } from "react";

const CurrentBookContext = React.createContext();

export function useCurrentBook() {
    return useContext(CurrentBookContext);
}

export function CurrentBookProvider({ children }) {
    const [currentBook, setCurrentBook] = useState();
    const value = {
        currentBook,
        setCurrentBook,
    };

    return (
        <CurrentBookContext.Provider value={value}>
            {children}
        </CurrentBookContext.Provider>
    );
}
