import { useContext } from "react";
import AppContext from "../context/AppContext";

export const ChangeTheme = () => {
    const { theme, updateTheme } = useContext(AppContext);

    return (
        <>
            <h2>Current theme: {theme}</h2>
            <button onClick={() => updateTheme(theme === "light" ? "dark" : "light")}>Change Theme</button>
        </>
    )
}