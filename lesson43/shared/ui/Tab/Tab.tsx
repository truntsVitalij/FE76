import React from 'react';
import styles from './Tab.module.css';

export const Tab = ({ children, isActive, onClick }) => {
    return <button
        className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
        onClick={onClick}
    >
        {children}
    </button>
}