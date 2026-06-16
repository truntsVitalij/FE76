import type { FC } from 'react';
import styles from './Card.module.css';
import { Text } from '../Text/Text';

interface ICardProps {
    className?: string;
    title: string;
    description: string;
    btnLabel?: string;
    onClick?: () => void;
}

export const Card: FC<ICardProps> = ({ className, title, description, btnLabel, onClick }) => {
    return (
        <div className={`${className} ${styles.card}`}>
            <Text type='title-3' className={styles.title}>{title}</Text>
            <div className={styles.content}>
                <Text type='label-m' className={styles.description}>{description}</Text>
                {btnLabel && <Button onClick={onClick}>{btnLabel}</Button>}
            </div>
        </div>
    );
}