import { type FC, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

const Input: FC<IInputProps> = ({ label, id, error, ...props }) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;