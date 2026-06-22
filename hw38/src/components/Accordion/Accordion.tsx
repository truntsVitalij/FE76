import { useState } from 'react';
import styles from './Accordion.module.css';

interface Props {
	title: string;
	children: React.ReactNode;
}

export const Accordion = ({ title, children }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.accordion}>
			<div className={styles.header} onClick={() => setIsOpen(prev => !prev)}>
				<span>{title}</span>
				<svg className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<polyline points="6 9 12 15 18 9"></polyline>
				</svg>
			</div>

			{isOpen && <div className={styles.content}>{children}</div>}
		</div>
	);
};

/* https://mui.com/material-ui/react-accordion/ */
