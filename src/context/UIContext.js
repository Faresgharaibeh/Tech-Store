import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export function UIProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(false); // ❌ نخليه دائمًا false
  };

  return (
    <UIContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}