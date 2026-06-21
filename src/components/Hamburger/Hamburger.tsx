import { useState } from 'react';
import styles from './Hamburger.module.css';

const Hamburger = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <button
        className={styles.button}
        onClick={toggleMenu}
        >
        {isOpen ? '✕' : '☰'}
        </button>
    );
};

export default Hamburger;