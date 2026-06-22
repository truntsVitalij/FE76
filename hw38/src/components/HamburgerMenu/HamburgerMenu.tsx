import { useState } from 'react';
import styles from './HamburgerMenu.module.css';

export const HamburgerMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(prev => !prev);
	};

	return (
		<div className={styles.hamburgerWrapper}>
			<button className={styles.hamburgerBtn} onClick={toggleMenu}>
				{isOpen ? (
					/* Крестик */
					<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				) : (
					/* Гамбургер */
					<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<line x1="3" y1="12" x2="21" y2="12"></line>
						<line x1="3" y1="18" x2="21" y2="18"></line>
					</svg>
				)}
			</button>
		</div>
	);
};
