import type { FC } from "react";
import styles from "./Input.module.css";

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  
};

export const Input: FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error
}) => {
  return (
    <div className={styles.wrapper}>
    <label className={styles.label}>
      <span> {label} </span>

      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
    </div>
  );
};
