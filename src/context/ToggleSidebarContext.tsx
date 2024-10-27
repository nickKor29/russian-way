import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ToggleSidebarContextProps {
  isShrink: boolean;
  toggleSidebar: () => void;
}

const ToggleSidebarContext = createContext<
  ToggleSidebarContextProps | undefined
>(undefined);

interface ToggleSidebarProviderProps {
  children: ReactNode;
}

function ToggleSidebarProvider({ children }: ToggleSidebarProviderProps) {
  const [isShrink, setIsShrink] = useState<boolean>(false);

  function toggleSidebar() {
    setIsShrink((prevIsShrink) => !prevIsShrink);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsShrink(window.innerWidth <= 1100);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ToggleSidebarContext.Provider value={{ isShrink, toggleSidebar }}>
      {children}
    </ToggleSidebarContext.Provider>
  );
}

function useShrink() {
  const context = useContext(ToggleSidebarContext);
  if (!context) {
    throw new Error("useShrink must be used within a ToggleSidebarProvider");
  }
  return context;
}

export { ToggleSidebarProvider, useShrink };
