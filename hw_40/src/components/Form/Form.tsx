import React from 'react';
import styles from './Form.module.css';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
};