import React from 'react';
import styles from './Input.module.css';
import type { InputProps } from './types';

export const Input: React.FC<InputProps> = ({ label, error, className, id, noWrapper, ...props }) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const inputElement = (
    <input id={inputId} className={`${styles.input} ${error ? styles.inputError : ''} ${className || ''}`} {...props} />
  );

  if (noWrapper) {
    return inputElement;
  }

  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      {inputElement}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};