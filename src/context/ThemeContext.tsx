import { createContext, useContext } from "react";

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create context (initially undefined for safety)
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook to consume context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
