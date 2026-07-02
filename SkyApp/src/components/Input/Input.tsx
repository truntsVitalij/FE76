import type { FC } from "react";
import styles from "./Input.module.css";

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export const Input: FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <label className={styles.label}>
      <span> {label} </span>

      <input
        className={styles.label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};
