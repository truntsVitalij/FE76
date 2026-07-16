import { useState, type FC, type PropsWithChildren } from "react";

import AppContext from "./AppContext";

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [clientList, setClientList] = useState<Client[]>([]);
    const handleThemeChange = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    const fetchClientList = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setClientList(data);
    }

    return (
        <AppContext.Provider value={{ clientList, fetchClientList, theme, updateTheme: handleThemeChange }}>
            {children}
        </AppContext.Provider>
    )
}

