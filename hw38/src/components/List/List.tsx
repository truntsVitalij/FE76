import { Accordion } from '../Accordion';
import styles from './List.module.css';

interface AccordionItem {
	title: string;
	text: string;
}

interface Props {
	list: AccordionItem[];
}

export const List = ({ list }: Props) => {
	return (
		<div className={styles.listWrapper}>
			{list.map((item, index) => (
				<Accordion key={index} title={item.title}>
					{item.text}
				</Accordion>
			))}
		</div>
	);
};
