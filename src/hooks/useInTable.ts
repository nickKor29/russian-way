import { useEffect, useState } from "react";

export function useInTable() {
  const [isInTable, setIsInTable] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setIsInTable(window.innerWidth > 1100);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isInTable;
}
