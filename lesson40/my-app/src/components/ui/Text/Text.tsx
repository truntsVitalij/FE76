import type React from "react";

import styles from './Text.module.css';

// API компонента
interface TextProps {
    children: React.ReactNode;
    className?: string;
    // type: 'small' | 'medium'

}

export const Text = ({ children }: TextProps) => {
    return <h2 style={{ marginBottom: '40px' }}>{children}</h2>;
};

export const Text1 = ({ children, className }: TextProps) => {
    return <h2 className={`${styles.text} ${className}`}> {children}</ h2>;
};



