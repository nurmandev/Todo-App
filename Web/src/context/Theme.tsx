import React, { createContext, useState, ReactNode } from "react";

// Define the context types
interface ThemeContextType {
  setIsDarkMode: (value: boolean) => void;
  isDarkMode: boolean;
}

// Create the context with a default value of null
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider Component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
