import React from 'react';
import styles from './Input.module.css';
import type { InputProps } from './types';

export const Input: React.FC<InputProps> = ({ label, error, className, id, ...props }) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <input id={inputId} className={`${styles.input} ${error ? styles.inputError : ''} ${className || ''}`} {...props} />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};