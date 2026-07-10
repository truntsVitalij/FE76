import { Sun, Moon } from "lucide-react";
import type { FC } from "react";

interface IToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ToggleTheme: FC<IToggleProps> = ({ isDark = false, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      style={{
        background: "none",
        border: "1px solid currentColor",
        borderRadius: "8px",
        cursor: "pointer",
        padding: "6px 8px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "var(--text-color)", // уточнить
      }}
    >
      
      {isDark ? (
        <Sun size={20} color="#ffb300" />   //Солнце/Луна
      ) : (
        <Moon size={20} color="#5c6bc0" />
      )}
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
};
