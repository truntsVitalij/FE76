import React from 'react';
import styles from './Button.module.css';
import type { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth = false, className, ...props }) => {
  const classNames = [styles.button, styles[variant], fullWidth ? styles.fullWidth : '', className || ''].filter(Boolean).join(' ');
  return <button className={classNames} {...props}>{children}</button>;
};