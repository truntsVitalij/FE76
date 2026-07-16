import { createContext } from "react";

type Theme = "light" | "dark";

type AppContextType = {
  theme: Theme;
  updateTheme: (theme: Theme) => void;
};

const AppContext = createContext<AppContextType>({
  theme: "light",
  updateTheme: () => {},
});

export default AppContext;
