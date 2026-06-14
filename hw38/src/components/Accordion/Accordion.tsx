import { useState } from 'react';
import './Accordion.css';

interface Props {
	title: string;
	children: React.ReactNode;
}

export const Accordion = ({ title, children }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="accordion">
			<div className="accordion__header" onClick={() => setIsOpen(!isOpen)}>
				<span>{title}</span>

				<svg className={`accordion__arrow ${isOpen ? 'open' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<polyline points="6 9 12 15 18 9"></polyline>
				</svg>
			</div>

			{isOpen && <div className="accordion__content">{children}</div>}
		</div>
	);
};

/* https://mui.com/material-ui/react-accordion/ */
