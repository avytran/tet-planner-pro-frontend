import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("apricot");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
